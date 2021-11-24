const { db } = require("../../db");
const HttpError = require("../../errorTypes/HttpError");

const userService = require("./userService");

const appReviewService = {
  async createReview(data, user_id) {
    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }
    // await appReviewService.getReviewByUser(user_id);
    const review = await db()
      .insert({
        review_score: data.review_score,
        review_description: data.review_description,
        user_id,
      })
      .into("app_review")
      .returning("*");
    if (user) {
      return await db()
        .select(
          "app_review.*",
          "users.id as user_id",
          "users.first_name",
          "users.last_name"
        )
        .from("app_review")
        .innerJoin("users", "app_review.user_id", "users.id")
        .where("app_review.id", review[0].id)
        .first();
    }

    return await db()
      .select(
        "app_review.*",
        "special_users.id as user_id",
        "special_users.name",
        "special_users.function"
      )
      .from("app_review")
      .innerJoin("special_users", "app_review.user_id", "special_users.id")
      .where("app_review.id", review[0].id)
      .first();
  },

  async getReviewByUser(user_id) {
    const userReview = await db()
      .select("app_review.*")
      .from("app_review")
      .where("app_review.user_id", user_id)
      .first();

    if (userReview) {
      throw new HttpError("You already did one review!", 422);
    }
  },

  async updateReview(review_id, data, user_id) {
    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }

    const reviewMadeByUser = await db()
      .select("*")
      .from("app_review")
      .where({ id: review_id, user_id })
      .first();

    if (!reviewMadeByUser) {
      throw new HttpError("This review is not published by this user!", 422);
    }

    let datasToUpdate = {};

    if (data.review_description) {
      datasToUpdate.review_description = data.review_description;
    }
    if (data.review_score) {
      datasToUpdate.review_score = data.review_score;
    }
    return (
      await db()
        .update(datasToUpdate)
        .from("app_review")
        .where({ id: review_id })
        .returning("*")
    )[0];
  },

  async getAllReviews() {
    const reviews = await db()
      .select(
        "app_review.*",
        "users.first_name",
        "users.last_name",
        "special_users.name",
        "special_users.function"
      )
      .from("app_review")
      .leftJoin("users", "app_review.user_id", "users.id")
      .leftJoin("special_users", "app_review.user_id", "special_users.id")
      .returning("*");

    reviews.map((review) => {
      if (review.first_name == null) {
        delete review.first_name;
        delete review.last_name;
      }
      if (review.name == null) {
        delete review.name;
        delete review.function;
      }
    });

    return reviews;
  },
  //todo: tofixed
  async getAverageReview() {
    return await db().from("app_review").avg("review_score").first();
  },

  async deleteReview(user_id, review_id) {
    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }

    const reviewMadeByUser = await db()
      .select("*")
      .from("app_review")
      .where({ id: review_id, user_id })
      .first();

    if (!reviewMadeByUser) {
      throw new HttpError("This review is not published by this user!", 422);
    }

    await db()
      .delete()
      .from("app_review")
      .where({ id: review_id })
      .returning("*");

    return reviewMadeByUser;
  },
};

module.exports = appReviewService;
