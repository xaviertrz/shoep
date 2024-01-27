const { validateFields } = require("../middlewares/field-validations");
const { validateTelephone } = require("../middlewares/syntax-validations");
const { validateCompany } = require("../middlewares/register-validations");

module.exports = {
  ...validateCompany,
  ...validateFields,
  ...validateTelephone,
};
