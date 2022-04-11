const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

const AuthenModel = require("../models/registerModel");
const SingleImgSchema = require("../models/singleImgModel");

exports.register = async (req, res) => {
  console.log(req.body);
  const email_found = await AuthenModel.findOne({ email: req.body.email });
  const num_found = await AuthenModel.findOne({ number: req.body.number });
  if (email_found)
    return res.status(500).send({ status: false, msg: "Email already exist." });
  if (num_found)
    return res
      .status(500)
      .send({ status: false, msg: "Number already exist." });

  // hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(req.body.password, salt);
  const cryptoPass = JSON.stringify(SHA256(req.body.password).words);
  console.log("resgister", req.file.filename);
  const user = new AuthenModel({
    ...req.body,
    password: cryptoPass,
    dp: req.file.filename,
  });

  try {
    const savedUser = await user.save();
    savedUser.password = undefined;
    console.log({ savedUser });
    res.status(200).json({
      status: true,
      data: savedUser,
    });
  } catch (error) {
    console.log(error, "eeeorrr");
  }
};

exports.login = async (req, res) => {
  const user = await AuthenModel.findOne({ email: req.body.email }).lean();
  if (!user)
    return res.status(400).send({ status: false, msg: "Email is not found." });

  const cryptoPass = JSON.stringify(SHA256(req.body.password).words);
  if (cryptoPass !== user.password)
    return res.status(400).send({ msg: "Invalid password" });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  user.password = undefined;
  user["token"] = token;
  res.status(200).header("auth-token", token).send({
    status: true,
    msg: "Successfully logged in.",
    data: user,
  });
};

exports.uploadSingleImg = async (req, res) => {
  const photo = req.file.filename;
  console.log(photo);
  try {
    const img = new SingleImgSchema({
      dp: photo,
    });
    const saved_img = await img.save();
    console.log({ saved_img });
    res.status(200).send({ msg: "Image uploaded" });
  } catch (error) {
    console.log(error);
  }
  console.log("test", req.body, req.file);
};

exports.getAllImages = async (req, res) => {
  try {
    const result = await SingleImgSchema.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
