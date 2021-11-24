const { db } = require("../../db");
const HttpError = require("../../errorTypes/HttpError");

const categoryService = {
  async createCategory(data) {
    await categoryService.categoryExistsByName(data.name);

    return await db().insert(data).into("categories").returning("*");
  },

  async categoryExistsByName(name) {
    const category = await db()
      .select("*")
      .from("categories")
      .where({ name })
      .first();

    if (category) {
      throw new HttpError("This category already exists!", 422);
    }
  },

  async updateCategory(category_id, category_name) {
    await categoryService.categoryExist(category_id);
    await categoryService.categoryExistsByName(category_name);

    return (
      await db()
        .update({ name: category_name })
        .from("categories")
        .where({ id: category_id })
        .returning("*")
    )[0];
  },

  async deleteCategory(category_id) {
    const category = await categoryService.categoryExist(category_id);
    await db()
      .delete()
      .from("categories")
      .where({ id: category_id })
      .returning("*");

    return category;
  },

  async categoryExist(id) {
    const category = await db()
      .select("*")
      .from("categories")
      .where({ id })
      .first();

    if (!category) {
      throw new HttpError("This category does not exist!", 422);
    }
    return category;
  },

  async getAllCategories() {
    return await db().select("*").from("categories").returning("*");
  },
};

module.exports = categoryService;
