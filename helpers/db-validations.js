const db = require("../database/config.js");

function emailExists(email) {
  try {
    const query = "SELECT * FROM users WHERE email = ?";

    const row = db.prepare(query).get(email);

    return !!row;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar el email en la base de datos.");
  }
}

function nitExists(nit) {
  try {
    const query = "SELECT * FROM users WHERE seller_nit = ?";

    const row = db.prepare(query).get(nit);

    return !!row;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar el nit en la base de datos.");
  }
}

module.exports = {
  emailExists,
  nitExists,
};
