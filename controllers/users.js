const bcryptjs = require("bcryptjs");
const { randomUUID } = require("crypto");
const { response } = require("express");

const db = require("../database/config.js");

const postSeller = async (req, res = response) => {
  let { email, telephone, password, nit, razon_social } = req.body;

  // Generate a user id
  const uuid = randomUUID();

  // Encrypt the password
  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password, salt);

  try {
    const query = `
    INSERT INTO users (id, role_id, username, email, telephone, seller_nit, password, created_at) 
    VALUES (?,?,?,?,?,?,?,?)
    `;

    db.prepare(query).run(
      uuid,
      process.env.SELLER_ROLE_DATABASE_ID,
      razon_social,
      email,
      telephone,
      nit,
      password,
      new Date().toISOString()
    );

    res.json({
      status: "success",
      data: {
        username: razon_social,
        email,
        telephone,
        password,
      },
      messages: [`La empresa ${razon_social} ha sido registrada.`],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      messages: ["Error al registrar la empresa. Hable con el administrador."],
    });
  }
};

module.exports = {
  postSeller,
};
