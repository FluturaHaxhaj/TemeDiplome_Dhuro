const {
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
  NODE_ENV,
} = require("./config");
console.log({
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
  NODE_ENV,
});

module.exports = {
  development: {
    client: "pg",
    connection: {
      password: DB_PASSWORD,
      user: DB_USER,
      host: DB_HOSTNAME,
      database: DB_NAME,
    },
    pool: {
      min: 0,
      max: 120,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
  },
  production: {
    client: "pg",
    connection: DATABASE_URL,
    ssl: { require: true, rejectUnauthorized: false },
  },
  staging: {
    client: "pg",
    connection: {
      password: DB_PASSWORD,
      user: DB_USER,
      host: DB_HOSTNAME,
      database: DB_NAME,
    },
    pool: {
      min: 0,
      max: 120,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
  },
};
