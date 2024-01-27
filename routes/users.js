const { Router } = require("express");

const { postSeller } = require("../controllers/users");

const { validateFields } = require("../middlewares/field-validations");
const {
  validateCompany,
  validateEmail,
  validatePassword,
  validateNit,
  validateTelephone,
} = require("../middlewares/register-validations");

const router = Router();

/**
 * {{url}}/api/users
 */

// Registrate a seller
router.post(
  "/registrate-seller",
  [
    // Seller register validations
    validateEmail,
    validatePassword,
    validateTelephone,
    validateNit,
    validateCompany,

    // Express-validator
    validateFields,
  ],
  postSeller
);

module.exports = router;
