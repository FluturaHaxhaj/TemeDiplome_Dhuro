require("dotenv").config();

global.__basedir = __dirname;

module.exports = {
  RANDOM_TOKEN_SECRET: "secret",
  URL: process.env.URL,
  MAXSIZE: process.env.MAXSIZE,
  PORT: process.env.PORT,
  statusTypes: ["in_progress", "finished"],
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_NAME: process.env.DB_NAME,
  API_URL: process.env.API_URL,
};
