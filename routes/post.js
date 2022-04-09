const express = require("express");
const postController = require("../controllers/postController");
const validator = require("../validator");
const verfifyJwtToken = require("../helpers/verifyJwtToken");

const router = express.Router();

router.get("/", verfifyJwtToken, postController.getPosts);
router.post(
  "/create",
  validator.createPostValidator,
  verfifyJwtToken,
  postController.createPost
);

module.exports = router;
