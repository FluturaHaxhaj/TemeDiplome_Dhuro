const fs = require("fs");
const { db } = require("../../db");

const mediaService = require("./mediaService");
const userService = require("./userService");
const commentService = require("./commentService");

const HttpError = require("../../errorTypes/HttpError");
const { getLocationFromAddress } = require("../../helpers/locationHelper");

const needService = {
  async createNeed(data, files, user_id) {
    const { category_id, product_name, description, date_until, address } =
      data;

    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }

    const location = await getLocationFromAddress(data.address);

    const need = (
      await db()
        .insert({
          user_id,
          category_id,
          product_name,
          description,
          date_until,
          address,
          latitude: location[0].latitude,
          longitude: location[0].longitude,
        })
        .into("needs")
        .returning("*")
    )[0];

    if (files.length > 0) {
      files.map(async (file) => {
        await mediaService.insertMedia(file, need.id, "need");
      });
    }
    return need;
  },

  async getAllNeeds(data) {
    data = Object.assign(
      {
        rows: 10,
        page: 1,
      },
      data
    );

    let needs = db()
      .select("needs.*", "media.id as media_id", "media.title")
      .from("needs")
      .leftJoin("media", "media.model_id", "needs.id")
      .where("needs.status", "!=", "taken")
      .returning("*");

    if (data.search) {
      needs.where(function () {
        this.where("needs.product_name", "ilike", `%${data.search}%`).orWhere(
          "needs.description",
          "ilike",
          `%${data.search}%`
        );
      });
    }

    if (data.category_id) {
      needs.where("needs.category_id", "=", `${data.category_id}`);
    }

    needs = await needs.paginate({
      perPage: data.rows,
      currentPage: data.page,
      isLengthAware: true,
    });
    const lastPage = needs.pagination.lastPage;
    const hasMore =
      needs.pagination.total -
        needs.pagination.perPage * needs.pagination.currentPage >
      0;

    const needsWithImages = [];

    needs.data.map(
      ({
        id,
        user_id,
        category_id,
        product_name,
        description,
        status,
        date_until,
        address,
        latitude,
        longitude,
        created_at,
        updated_at,
        title,
        media_id,
      }) => {
        const needExists = needsWithImages.findIndex((obj) => obj.id == id);
        if (needExists >= 0) {
          needsWithImages[needExists].pictures.push({
            media_id,
            title,
          });
          return;
        }
        let needObj = {
          id,
          user_id,
          category_id,
          product_name,
          description,
          status,
          address,
          date_until,
          latitude,
          longitude,
          created_at,
          updated_at,
          pictures: [],
        };
        if (title != null) {
          needObj.pictures.push({ media_id, title });
        }
        needsWithImages.push(needObj);
      }
    );
    return {
      needsWithImages,
      hasMore,
      lastPage,
    };
  },

  async getOneById(id) {
    const need = await db()
      .select("needs.*", "users.first_name", "users.phone_number")
      .from("needs")
      .innerJoin("users", "users.id", "needs.user_id")
      .where("needs.id", id)
      .first();

    if (!need) {
      throw new HttpError("This need does not exist!", 422);
    }

    const latitude = parseFloat(need.latitude);
    const longitude = parseFloat(need.longitude);

    const medias = await db()
      .select("id as media_id", "title")
      .from("media")
      .where({ model_id: need.id })
      .returning("*");

    const comments = await commentService.getAllCommentsPerPost(id);
    return { ...need, latitude, longitude, medias, comments };
  },

  async deleteNeed(need_id) {
    const need = await needService.getOneById(need_id);
    const medias = await db()
      .select("*")
      .from("media")
      .where({ model_id: need_id })
      .returning("*");

    medias.map(async (media) => {
      const image = media.title.split("/")[1];

      fs.unlink(`uploads/${image}`, function (err) {
        if (err) throw err;
      });
    });

    await db().delete().from("needs").where({ id: need_id }).returning("*");

    await db()
      .delete()
      .from("media")
      .where({ model_id: need_id })
      .returning("*");

    return need;
  },

  async updateNeed(need_id, data, files, user_id) {
    const { product_name, description, date_until } = data;
    await needService.getOneById(need_id);

    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }
    const need = (
      await db()
        .update({
          product_name,
          description,
          date_until,
          updated_at: new Date(),
        })
        .from("needs")
        .where({ id: need_id })
        .returning("*")
    )[0];

    if (files.length > 0) {
      files.map(async (file) => {
        await mediaService.insertMedia(file, need.id, "need");
      });
    }
    return need;
  },

  async deleteMultiplePicturesPerNeed(need_id, medias) {
    await needService.getOneById(need_id);

    medias.map(async (media) => {
      const mediaFound = await db()
        .select("*")
        .from("media")
        .where({ id: media })
        .first();
      const deleted = await db()
        .delete()
        .from("media")
        .where({ id: media, model_id: need_id });
      if (deleted) {
        const image = mediaFound.title.split("/")[1];

        fs.unlink(`uploads/${image}`, function (err) {
          if (err) throw err;
        });
      }
    });

    return await needService.getOneById(need_id);
  },
};

module.exports = needService;
