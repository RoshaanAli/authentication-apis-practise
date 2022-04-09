const PostModel = require("../models/postModel");
const verifyJwtToken = require("../helpers/verifyJwtToken");

exports.getPosts = (req, res) => {
  const posts = PostModel.find()
    .select("_id title body")
    .then((posts) => {
      res.json({
        data: posts,
      });
    })
    .catch((err) => console.log(err));
};

exports.createPost = (req, res) => {
  const post = new PostModel(req.body);
  post.save().then((result) => {
    res.status(200).json({
      post: result,
    });
  });
};
