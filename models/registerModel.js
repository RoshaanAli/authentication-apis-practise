const mongoose = require("mongoose");

const registerModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  gender: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 10,
    default: "male",
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  number: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  dp: {
    type: String,
  },
});

module.exports = mongoose.model("Users", registerModel);
