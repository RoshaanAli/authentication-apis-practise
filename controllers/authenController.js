const bcrypt = require("bcryptjs");
const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

const AuthenModel = require("../models/registerModel");

exports.register = async (req, res) => {
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

  const user = new AuthenModel({
    ...req.body,
    password: cryptoPass,
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
  const user = await AuthenModel.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ status: false, msg: "Email is not found." });

  const cryptoPass = JSON.stringify(SHA256(req.body.password).words);
  if (cryptoPass !== user.password)
    return res.status(400).send({ msg: "Invalid password" });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  user.password = undefined;
  user["token"]='asdda'
  res
    .status(200)
    .header("auth-token", token)
    .send({
      status: true,
      msg: "Successfully logged in.",
      data: { user,token },
    });
};
