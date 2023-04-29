const country = require("./dumpData/countries.json");
const state = require("./dumpData/states.json");
const city = require("./dumpData/cities.json");

const generate_uuidv4 = () => {
  var id_str = [];
  var hxDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    id_str[i] = hxDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  id_str[14] = "4"; // bits 12-15 is for time_hi_and_version field, set to to 0010

  id_str[19] = hxDigits.substr((id_str[19] & 0x3) | 0x8, 1); // bits 6-7 for the clock_seq_hi_and_reserved to 01

  id_str[8] = id_str[13] = id_str[18] = id_str[23] = "-";

  var guid = id_str.join("");
  return guid;
};

const generateCountryQuery = () => {
  let query = `INSERT INTO country (id, country_id, name, phone_code, currency, created_at, updated_at) VALUES `;
  const values = country.map((element) => {
    return `('${generate_uuidv4()}', ${element.id}, '${element.name.replace(
      new RegExp(`'`, "g"),
      ``
    )}','${element.phone_code}', '${element.currency}', NOW(), NOW())`;
  });
  return `${query} ${values.join(",")};`;
};

const generateStateQuery = () => {
  let query = `INSERT INTO state (id, state_id, name, country_id, created_at, updated_at) VALUES `;

  const values = state.map((element) => {
    return `('${generate_uuidv4()}', ${element.id}, '${element.name.replace(
      new RegExp(`'`, "g"),
      ``
    )}','${element.country_id}', NOW(), NOW())`;
  });
  return `${query} ${values.join(",")};`;
};

const generateCityQuery = () => {
  let query = `INSERT INTO city (id, city_id, name, state_id, country_id, created_at, updated_at) VALUES `;
  const values = city.map((element) => {
    return `('${generate_uuidv4()}', ${element.id}, '${element.name.replace(
      new RegExp(`'`, "g"),
      ``
    )}','${element.state_id}', '${element.country_id}', NOW(), NOW())`;
  });
  return `${query} ${values.join(",")};`;
};

// generateCountryQuery();

module.exports = {
  generateCountryQuery,
  generateStateQuery,
  generateCityQuery,
  generate_uuidv4,
};
