const fs = require("fs");
const { db } = require("../../db");

const mediaService = require("./mediaService");
const userService = require("./userService");
const commentService = require("./commentService");

const HttpError = require("../../errorTypes/HttpError");
const { getLocationFromAddress } = require("../../helpers/locationHelper");

const productService = {
  async createProduct(data, files, user_id) {
    const { category_id, product_name, description, address } = data;

    const user = await userService.getUserById(user_id);
    if (!user) {
      throw new HttpError("This user does not exist", 422);
    }

    const location = await getLocationFromAddress(data.address);

    const product = (
      await db()
        .insert({
          user_id,
          category_id,
          product_name,
          description,
          address,
          latitude: location[0].latitude,
          longitude: location[0].longitude,
        })
        .into("products_to_give")
        .returning("*")
    )[0];

    if (files.length > 0) {
      files.map(async (file) => {
        await mediaService.insertMedia(file, product.id, "product");
      });
    }

    return product;
  },

  async getAllProducts(data, user_id) {
    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);

    data = Object.assign(
      {
        rows: 10,
        page: 1,
      },
      data
    );
    let products;
    if (user) {
      const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      products = db()
        .select("products_to_give.*", "media.id as media_id", "media.title")
        .from("products_to_give")
        .leftJoin("media", "media.model_id", "products_to_give.id")
        .where("products_to_give.status", "!=", "taken")
        .where("products_to_give.created_at", "<=", date)
        .returning("*");
    } else {
      products = db()
        .select("products_to_give.*", "media.id as media_id", "media.title")
        .from("products_to_give")
        .leftJoin("media", "media.model_id", "products_to_give.id")
        .where("products_to_give.status", "!=", "taken")
        .returning("*");
    }

    if (data.search) {
      products.where(function () {
        this.where(
          "products_to_give.product_name",
          "ilike",
          `%${data.search}%`
        ).orWhere("products_to_give.description", "ilike", `%${data.search}%`);
      });
    }

    if (data.category_id) {
      products.where(
        "products_to_give.category_id",
        "=",
        `${data.category_id}`
      );
    }

    products = await products.paginate({
      perPage: data.rows,
      currentPage: data.page,
      isLengthAware: true,
    });
    const lastPage = products.pagination.lastPage;
    const hasMore =
      products.pagination.total -
        products.pagination.perPage * products.pagination.currentPage >
      0;

    const productsWithImages = [];

    products.data.map(
      ({
        id,
        user_id,
        category_id,
        product_name,
        description,
        status,
        address,
        latitude,
        longitude,
        created_at,
        updated_at,
        title,
        media_id,
      }) => {
        const productExists = productsWithImages.findIndex(
          (obj) => obj.id == id
        );
        if (productExists >= 0) {
          productsWithImages[productExists].pictures.push({
            media_id,
            title,
          });
          return;
        }
        let productObj = {
          id,
          user_id,
          category_id,
          product_name,
          description,
          status,
          address,
          latitude,
          longitude,
          created_at,
          updated_at,
          pictures: [],
        };
        if (title != null) {
          productObj.pictures.push({ media_id, title });
        }
        productsWithImages.push(productObj);
      }
    );
    return {
      productsWithImages,
      hasMore,
      lastPage,
    };
  },

  async getOneById(id) {
    const product = await db()
      .select("products_to_give.*", "users.first_name", "users.phone_number")
      .from("products_to_give")
      .innerJoin("users", "users.id", "products_to_give.user_id")
      .where("products_to_give.id", id)
      .first();

    if (!product) {
      throw new HttpError("This product does not exist!", 422);
    }

    const medias = await db()
      .select("id as media_id", "title")
      .from("media")
      .where({ model_id: product.id })
      .returning("*");

    const comments = await commentService.getAllCommentsPerPost(id);

    return { ...product, medias, comments };
  },

  async deleteProduct(product_id) {
    const product = await productService.getOneById(product_id);
    const medias = await db()
      .select("*")
      .from("media")
      .where({ model_id: product_id })
      .returning("*");

    medias.map(async (media) => {
      const image = media.title.split("/")[1];

      fs.unlink(`uploads/${image}`, function (err) {
        if (err) throw err;
      });
    });

    await db()
      .delete()
      .from("products_to_give")
      .where({ id: product_id })
      .returning("*");

    await db()
      .delete()
      .from("media")
      .where({ model_id: product_id })
      .returning("*");

    return product;
  },

  async updateProduct(product_id, data, files, user_id) {
    const { product_name, description, address } = data;
    await productService.getOneById(product_id);

    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }

    const product = (
      await db()
        .update({ product_name, description, address })
        .from("products_to_give")
        .where({ id: product_id })
        .returning("*")
    )[0];

    if (files.length > 0) {
      files.map(async (file) => {
        await mediaService.insertMedia(file, product.id, "product");
      });
    }

    return product;
  },

  async deleteMultiplePicturesPerProduct(product_id, medias) {
    await productService.getOneById(product_id);

    medias.map(async (media) => {
      const mediaFound = await db()
        .select("*")
        .from("media")
        .where({ id: media })
        .first();
      const deleted = await db()
        .delete()
        .from("media")
        .where({ id: media, model_id: product_id });

      if (deleted) {
        const image = mediaFound.title.split("/")[1];

        fs.unlink(`uploads/${image}`, function (err) {
          if (err) throw err;
        });
      }
    });

    return await productService.getOneById(product_id);
  },
};

module.exports = productService;
