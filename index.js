const { db, connect } = require("./db");
const {
  generateCountryQuery,
  generateStateQuery,
  generateCityQuery,
} = require("./helper");
const { writeIntoFile } = require("./file-handler");
const country = require("./json/country.json");
const state = require("./json/state.json");
const city = require("./json/city.json");

const generateQueryAndInsertIntoFile = async () => {
  try {
    let query = generateCountryQuery();
    await writeIntoFile({
      fileName: "country.json",
      content: `{"query":"` + query + `"}`,
    });
    query = generateStateQuery();
    await writeIntoFile({
      fileName: "state.json",
      content: `{"query":"` + query + `"}`,
    });
    query = generateCityQuery();
    await writeIntoFile({
      fileName: "city.json",
      content: `{"query":"` + query + `"}`,
    });
    return query;
  } catch (error) {
    console.log(error);
  }
};
const insertIntoDataBase = async () => {
  try {
    await connect();
    console.log("Executing country........................");
    let data = await db.sequelize.query(country.query);
    console.log("Success country........................", data);
    console.log("Executing state........................");
    data = await db.sequelize.query(state.query);
    console.log("Success state........................", data);
    console.log("Executing city........................");
    data = await db.sequelize.query(city.query);
    console.log("Success city........................", data);
  } catch (error) {
    console.log(error);
  }
};
console.log("File running");
insertIntoDataBase();
