const { db } = require("../../db");
const HttpError = require("../../errorTypes/HttpError");
const userService = require("./userService");

const dealService = {
  async createDeal(data, user_id) {
    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }

    const product = await db()
      .select("*")
      .from("products_to_give")
      .where("id", data.post_id)
      .first();
    const need = await db()
      .select("*")
      .from("needs")
      .where("id", data.post_id)
      .first();

    if (!product && !need) {
      throw new HttpError("This post does not exis!", 422);
    }

    if (product) {
      if (product.status == "taken") {
        throw new Error("This product is already taken");
      }

      await db()
        .update({ status: "taken", updated_at: new Date() })
        .from("products_to_give")
        .where({ id: data.post_id })
        .returning("*");
    }
    if (need) {
      if (need.status == "taken") {
        throw new Error("This need is already finished");
      }

      await db()
        .update({ status: "taken", updated_at: new Date() })
        .from("needs")
        .where({ id: data.post_id })
        .returning("*");
    }
    return (
      await db()
        .insert({ deal_id: data.post_id, user_id })
        .into("deals")
        .returning("*")
    )[0];
  },

  async getDeals(data) {
    data = Object.assign(
      {
        rows: 10,
        page: 1,
      },
      data
    );

    let deals = db()
      .select(
        "deals.*",
        "users.first_name as first_name",
        // "special_users.name as name",
        "products_to_give.product_name as product_name",
        "products_to_give.description as description",
        "media_product.title as product_img",
        "media_product.id as product_img_id",
        "product_user.first_name as product_user_first_name",
        "products_to_give.status as product_status",
        // "special_product_user.name as special_product_user_name",
        "needs.product_name as need_name",
        "needs.status as need_status",
        "needs.description as need_description",
        "media_need.title as need_img",
        "media_need.id as need_img_id",
        "need_user.first_name as need_user_first_name"
        // "special_need_user.name as special_need_name"
      )
      .from("deals")
      .leftJoin("users", "users.id", "deals.user_id")
      // .leftJoin("special_users", "deals.user_id", "special_users.id")
      .leftJoin("products_to_give", "deals.deal_id", "products_to_give.id")
      .leftJoin(
        "media as media_product",
        "media_product.model_id",
        "products_to_give.id"
      )
      .leftJoin(
        "users as product_user",
        "products_to_give.user_id",
        "product_user.id"
      )
      // .leftJoin(
      //   "special_users as special_product_user",
      //   "products_to_give.user_id",
      //   "special_users.id"
      // )
      .leftJoin("needs", "deals.deal_id", "needs.id")
      .leftJoin("media as media_need", "media_need.model_id", "needs.id")
      .leftJoin("users as need_user", "needs.user_id", "need_user.id")
      // .leftJoin(
      //   "special_users as special_need_user",
      //   "needs.user_id",
      //   "special_users.id"
      // )

      .returning("*");

    deals = await deals.paginate({
      perPage: data.rows,
      currentPage: data.page,
      isLengthAware: true,
    });

    const lastPage = deals.pagination.lastPage;
    const hasMore =
      deals.pagination.total -
        deals.pagination.perPage * deals.pagination.currentPage >
      0;

    const dealsWithImages = [];

    const fixedDeals = await Promise.all(
      deals.data.map(
        ({
          id,
          user_id,
          deal_id,
          created_at,
          first_name,
          name,
          product_name,
          description,
          product_img,
          product_img_id,
          product_user_first_name,
          product_status,
          need_name,
          need_description,
          need_img,
          need_img_id,
          need_user_first_name,
          need_status,
        }) => {
          const obj = { id, created_at };

          if (first_name) {
            obj.dealer_name = first_name;
          } else {
            obj.dealer_name = name;
          }
          if (product_name) {
            obj.deal_post_name = product_name;
            obj.deal_img = product_img;
            obj.deal_img_id = product_img_id;
            obj.description = description;
            obj.product_status = product_status;
            if (product_user_first_name) {
              obj.post_user_name = product_user_first_name;
            }
            const proExists = dealsWithImages.findIndex((a) => a.id == id);

            if (proExists >= 0) {
              dealsWithImages[proExists].pictures.push({
                deal_img: obj.deal_img,
                deal_img_id: obj.deal_img_id,
              });
              return;
            }

            let proObj = {
              id,
              user_id,
              deal_id,
              created_at,
              deal_post_name: first_name,
              name,
              deal_name: product_name,
              deal_description: description,
              dealer_name: product_user_first_name,
              deal_status: product_status,
              pictures: [],
            };

            if (obj.deal_img != null) {
              proObj.pictures.push({
                deal_img_id: obj.deal_img_id,
                deal_img: obj.deal_img,
              });
            }
            dealsWithImages.push(proObj);
          } else {
            obj.deal_post_name = need_name;
            obj.deal_img = need_img;
            obj.description = need_description;
            obj.deal_img_id = need_img_id;
            obj.need_status = need_status;
            if (need_user_first_name) {
              obj.post_user_name = need_user_first_name;
            }

            const needExists = dealsWithImages.findIndex((a) => a.id == id);
            if (needExists >= 0) {
              dealsWithImages[needExists].pictures.push({
                deal_img: obj.deal_img,
                deal_img_id: obj.deal_img_id,
              });
              return;
            }
            let needObj = {
              id,
              user_id,
              deal_id,
              created_at,
              deal_post_name: first_name,
              name,
              deal_name: need_name,
              deal_description: need_description,
              dealer_name: need_user_first_name,
              deal_status: need_status,
              pictures: [],
            };

            if (obj.deal_img != null) {
              needObj.pictures.push({
                deal_img_id: obj.deal_img_id,
                deal_img: obj.deal_img,
              });
            }
            dealsWithImages.push(needObj);
          }
        }
      )
    );
    return { dealsWithImages, hasMore, lastPage };
  },
};

module.exports = dealService;
