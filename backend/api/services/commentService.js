const { db } = require("../../db");
const userService = require("./userService");

const HttpError = require("../../errorTypes/HttpError");

const commentService = {
  async createComment(user_id, data) {
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

    return (
      await db()
        .insert({
          user_id,
          post_id: data.post_id,
          comment: data.comment,
        })
        .into("comments")
        .returning("*")
    )[0];
  },

  async getAllCommentsPerPost(post_id) {
    const product = await db()
      .select("*")
      .from("products_to_give")
      .where("id", post_id)
      .first();
    const need = await db()
      .select("*")
      .from("needs")
      .where("id", post_id)
      .first();
    if (!product && !need) {
      throw new HttpError("This post does not exis!", 422);
    }

    return db()
      .select(
        "comments.id",
        "comments.post_id",
        "comments.user_id",
        "comments.comment",
        "users.first_name"
      )
      .from("comments")
      .innerJoin("users", "users.id", "comments.user_id")
      .where({ post_id })
      .returning("*");
  },

  async getComment(comment_id) {
    const comment = await db()
      .select("*")
      .from("comments")
      .where({ id: comment_id })
      .first();

    if (!comment) {
      throw new HttpError("This comment does not exist!", 422);
    }
    return comment;
  },

  async updateComment(user_id, comment_id, comment) {
    const commentMadeByUser = await db()
      .select("*")
      .from("comments")
      .where({ id: comment_id })
      .andWhere({ user_id })
      .first();
    if (!commentMadeByUser) {
      throw new HttpError("There is no comment made by this user", 422);
    }

    return (
      await db()
        .update({ comment })
        .from("comments")
        .where({ id: comment_id })
        .returning("*")
    )[0];
  },

  async deleteComment(comment_id) {
    const comment = await commentService.getComment(comment_id);

    await db().delete().from("comments").where({ id: comment_id });

    return comment;
  },
};

module.exports = commentService;
