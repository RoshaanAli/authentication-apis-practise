const express = require("express");
const multer = require("multer");
const authenController = require("../controllers/authenController");
const authValidator = require("../validator/joi_validator");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// multer strt
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination");
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post(
  "/register",
  // authValidator.registerValidator, //doing with joi
  // authValidator.validationRegister,
  upload.single("dp"),
  authenController.register
);

router.post(
  "/upload-img",
  upload.single("dp"),
  authenController.uploadSingleImg
);

router.get("/all-images", authenController.getAllImages);

router.post("/login", authValidator.loginValidation, authenController.login);

module.exports = router;
