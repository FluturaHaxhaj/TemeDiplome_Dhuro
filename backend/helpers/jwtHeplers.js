const jwt = require('jsonwebtoken');

const {RANDOM_TOKEN_SECRET} = require('../config');

const verifyToken = (token) => {
  return jwt.verify(token, RANDOM_TOKEN_SECRET);
};

const createJwtToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      RANDOM_TOKEN_SECRET,
      {
        expiresIn: 8640000,
      },
      (err, token) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(token);
      },
    );
  });
};

module.exports = {
  verifyToken,
  createJwtToken,
};
