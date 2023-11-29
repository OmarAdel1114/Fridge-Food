const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name Is required")
      .isLength({ min: 2 })
      .withMessage("At least 2 Characters"),
    body("price").notEmpty().withMessage("Price is required"),
  ];
};

module.exports = {
  validationSchema,
};
