exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 50 chars").isLength({
    min: 4,
    max: 50,
  });
  // body
  req.check("body", "Write a body").notEmpty();
  req.check("body", "Body must be between 4 to 100 chars").isLength({
    min: 4,
    max: 100,
  });

  //   check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.registerValidator = (req, res, next) => {
  // username
  req.check("username", "Username is required").notEmpty();
  req
    .check("username", "username must be between 2 to 30 characters long.")
    .isLength({
      min: 4,
      max: 50,
    });
  // email
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Email is not valid.").isEmail();
  // password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password", "Password must be between 3 to 30 characters long.")
    .isLength({
      min: 3,
    });
  // number
  req.check("number", "Number is required").notEmpty();
  // check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({
      status: false,
      msg: firstError,
    });
  }
  next();
};
