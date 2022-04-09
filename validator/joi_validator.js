const Joi = require("joi");

exports.validationRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    //   gender: Joi.string(),
    password: Joi.string().min(3),
    number: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  next();
};

exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  next();
};
