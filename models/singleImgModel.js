const mongoose = require("mongoose");

const singleImgSchema = new mongoose.Schema({
  dp: {
    type: String,
  },
});

module.exports = mongoose.model("SingleImgs", singleImgSchema);
