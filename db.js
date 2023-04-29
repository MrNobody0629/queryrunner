const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://dev_dbuser:Bcjy3D659k5@mamastop-dev.cm6dukh7jovd.af-south-1.rds.amazonaws.com:5432/mamastop_demo"
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const db = { sequelize, Sequelize };

module.exports = { db, connect };
