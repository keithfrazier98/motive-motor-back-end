require("dotenv").config();
const path = require("path");

const {
    DATABASE_URL,
    DATABASE_URL_DEVELOPMENT,
    DATABASE_URL_TEST, 
    DEBUG
} = process.env

module.exports = {
    development: {
      client: "postgresql",
      pool: { min: 1, max: 5 },
      connection: DATABASE_URL_DEVELOPMENT,
      migrations: {
        directory: path.join(__dirname, "src", "db", "migrations"),
      },
      seeds: {
        directory: path.join(__dirname, "src", "db", "seeds"),
      },
      debug: !!DEBUG,
    },
    test: {
      client: "postgresql",
      pool: { min: 1, max: 5 },
      connection: DATABASE_URL_TEST,
      migrations: {
        directory: path.join(__dirname, "src", "db", "migrations"),
      },
      seeds: {
        directory: path.join(__dirname, "src", "db", "seeds"),
      },
      debug: !!DEBUG,
    },
    production: {
      client: "postgresql",
      pool: { min: 1, max: 5 },
      connection: DATABASE_URL,
      migrations: {
        directory: path.join(__dirname, "src", "db", "migrations"),
      },
      seeds: {
        directory: path.join(__dirname, "src", "db", "seeds"),
      },
      debug: !!DEBUG,
      ssl: {
        require: true,
        rejectUnauthorized : false
      },
    },
  };
  