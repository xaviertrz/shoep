const { request, response } = require("express");
const { emailExists, nitExists } = require("../helpers/db-validations.js");
const { getCompany } = require("../helpers/gov-api.js");

async function validateCompany(req = request, res = response, next) {
  try {
    const { nit } = req.body;
    const company = await getCompany(nit);

    // Check if company exists
    if (!company) {
      return res.status(400).json({
        error: `La empresa con NIT ${nit} no está registrada en la base de datos de empresas de la cámara de comercio de Bucaramanga.`,
      });
    }

    const {
      razon_social,
      estado,
      ciudad,
      desc_ciiu1: descripcion_empresa,
      tama_o_empresa,
    } = company;

    // Check if company operates in Bucaramanga
    const allowedCities = ["BUCARAMANGA"];
    if (!allowedCities.includes(ciudad.toUpperCase())) {
      return res.status(400).json({
        error: `La empresa ${razon_social} no se encuentra en Bucaramanga.`,
      });
    }

    // Check if company is a micro or small company
    const allowedCompanySizes = ["PEQUEÑA EMPRESA", "MICROEMPRESA"];
    if (!allowedCompanySizes.includes(tama_o_empresa.toUpperCase())) {
      return res.status(400).json({
        error: `La empresa ${razon_social} no es una microempresa o pequeña empresa.`,
      });
    }

    // Check if company belongs to the footwear sector
    const allowedSector = "CALZADO";
    const companyDescriptionArray = descripcion_empresa
      .toUpperCase()
      .split(" ");
    if (!companyDescriptionArray.includes(allowedSector)) {
      console.log(companyDescriptionArray);
      return res.status(400).json({
        eror: `La empresa ${razon_social} no pertenece al sector calzado.`,
      });
    }

    // Check if company is active
    const allowedCompanyStatus = ["ACTIVO"];
    if (!allowedCompanyStatus.includes(estado.toUpperCase())) {
      return res.status(400).json({
        error: `La empresa ${razon_social} no se encuentra activa.`,
      });
    }

    // Set company name in request body
    req.body.razon_social = razon_social;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      messages: ["El NIT ingresado no es válido."],
    });
  }
}

async function validateEmail(req = request, res = response, next) {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      error: "El email es obligatorio.",
    });
  }

  // Check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "El email ingresado no es válido.",
    });
  }

  // Check if email already exists
  if (emailExists(email))
    return res.status(400).json({
      error: `El email ${email} ya está registrado.`,
    });

  next();
}

function validatePassword(req = request, res = response, next) {
  const { password } = req.body;

  // Check if password is provided
  if (!password) {
    return res.status(400).json({
      error: "La contraseña es obligatoria.",
    });
  }

  // Check if password is strong
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.",
    });
  }

  next();
}

function validateNit(req = request, res = response, next) {
  const { nit } = req.body;

  // Check if nit is provided
  if (!nit) {
    return res.status(400).json({
      error: "El NIT es obligatorio.",
    });
  }

  // Check if nit is a number
  if (isNaN(nit)) {
    return res.status(400).json({
      error: "El NIT debe ser un número.",
    });
  }

  // Check if nit has between 8 and 12 digits
  if (nit.length < 8 || nit.length > 12) {
    return res.status(400).json({
      error: "El NIT debe tener entre 8 y 12 dígitos.",
    });
  }

  // Check if nit already exists
  if (nitExists(nit))
    return res.status(400).json({
      error: `El NIT ${nit} ya está registrado.`,
    });

  next();
}

function validateTelephone(req = request, res = response, next) {
  const { telephone } = req.body;

  // Check if telephone is provided
  if (!telephone) {
    return res.status(400).json({
      error: "El número de teléfono es obligatorio.",
    });
  }

  // Check if telephone is valid
  const telephoneRegex = /^3\d{9}$/;
  if (!telephone.match(telephoneRegex))
    return res.status(400).json({
      error: "El número de teléfono debe tener 10 dígitos y empezar por 3.",
    });

  next();
}

module.exports = {
  validateCompany,
  validateEmail,
  validatePassword,
  validateNit,
  validateTelephone,
};
