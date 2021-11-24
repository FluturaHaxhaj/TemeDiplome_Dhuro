const { db } = require("../../db");
const { API_URL } = require("../../config");
const mediaService = {
  async insertMedia(file, model_id, model_type) {
    const { filename, mimetype, size } = file;
    // backslash ja kom hek
    const media = await db()
      .insert({
        title: `${API_URL}/${filename}`,
        mime: mimetype,
        size,
        model_id,
        model_type,
      })
      .into("media")
      .returning("*");
    console.log({ media });

    return media[0];
  },
  async updateMedia(file, model_id, model_type) {
    const { filename, mimetype, size } = file;
    const media = await db()
      .update({
        title: `${API_URL}/${filename}`,
        mime: mimetype,
        size,
        model_id,
        model_type,
      })
      .where({ model_id })
      .from("media")
      .returning("*");
    return media[0];
  },

  async getMedia(model_id) {
    return await db().select("*").from("media").where({ model_id }).first();
  },
};
module.exports = mediaService;
