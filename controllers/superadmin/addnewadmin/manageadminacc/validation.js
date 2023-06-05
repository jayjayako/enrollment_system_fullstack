const Joi = require("joi");

const {
  checknumbers,
  checkuppercase,
  checklowercase,
  checkspecialchar,
} = require("../../../modulelibrary/checkstring");

var xss = require("xss");

const superadmin_tbl = require("../../../../models/superadmin_tbl");
const admin_tbl = require("../../../../models/admin_tbl");
const staff_tbl = require("../../../../models/staff_tbl");

var firstvalidation = async (req, res, next) => {
  const { username, password, lastname, firstname, email } = req.body;
  var schema = Joi.object().keys({
    username: Joi.string().invalid("undefined").min(1).required(),
    password: Joi.string().invalid("undefined").min(1).required(),
    lastname: Joi.string().invalid("undefined").min(1).required(),
    firstname: Joi.string().invalid("undefined").min(1).required(),
    email: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
    username: username,
    password: password,
    lastname: lastname,
    firstname: firstname,
    email: email,
  };
  const validationresult = await schema.validate(dataToValidate);
  if (validationresult.error == null) {
    next();
  } else {
    res.json({ status: "invalid" });
  }
};

var passwordvalidation = async (req, res, next) => {
  const { password } = req.body;
  if (
    checknumbers(password) &&
    checkuppercase(password) &&
    checklowercase(password) &&
    checkspecialchar(password)
  ) {
    next();
  } else {
    if (!checknumbers(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain number" });
    }
    if (checkuppercase(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain uppercase" });
    }
    if (checklowercase(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain lowercase" });
    }
    if (checkspecialchar(password) == false) {
      res.json({
        status: "invalid",
        passwordauth: "must contain special character",
      });
    }
  }
};

////////////////// check all users then validate ////////////////
let checkallusernames = async (req, res, next) => {
  let user1, user2, user3, username;
  username = await xss(req.body.username);
  user1 = await superadmin_tbl.exists({ username: username });
  user2 = await admin_tbl.exists({ username: username });
  user3 = await staff_tbl.exists({ username: username });
  if (user1 && user2 == null && user3 == null) {
    res.locals.status = "exist";
    res.locals.position = "superadmin";
    next();
  } else if (user1 == null && user2 && user3 == null) {
    res.locals.status = "exist";
    res.locals.position = "admin";
    next();
  } else if (user1 == null && user2 == null && user3) {
    res.locals.status = "exist";
    res.locals.position = "staff";
    next();
  } else if (user1 == null && user2 == null && user3 == null) {
    res.locals.status = "dontexist";
    next();
  } else {
    res.locals.status = "invalid";
    next();
  }
};
////////////////////////////////////////////////////////////////

//////////////////// check admin if exist first ////////////////
var checkdeleteadmin = async (req, res, next) => {
  let user;
  user = await admin_tbl.findOne({ id: xss(req.params.userid) });
  if (user) {
    res.locals.status = "exist";
    next();
  } else {
    res.locals.status = "dontexist";
    next();
  }
};
//////////////////////////////////////////////////////////////////

module.exports = {
  firstvalidation: firstvalidation,
  passwordvalidation: passwordvalidation,
  checkallusernames: checkallusernames,
  checkdeleteadmin: checkdeleteadmin,
};
