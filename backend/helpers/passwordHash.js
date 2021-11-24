const bcrypt = require("bcryptjs");

module.exports = {
  async hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },

  async checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
};
