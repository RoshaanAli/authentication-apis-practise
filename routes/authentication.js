const express = require("express");
const authenController = require("../controllers/authenController");
const authValidator = require("../validator/joi_validator");
const router = express.Router();

router.post(
  "/register",
  // authValidator.registerValidator, //doing with joi
  authValidator.validationRegister,
  authenController.register
);

router.post(
  "/login",
  authValidator.loginValidation,
  authenController.login
);

module.exports = router;
