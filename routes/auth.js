const { Router } = require("express");

const { postSeller } = require("../controllers/users");

const router = Router();

/**
 * {{url}}/api/users
 */

// Registrate a seller
router.post(
  "/login",
  [
    // Seller login validations
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
