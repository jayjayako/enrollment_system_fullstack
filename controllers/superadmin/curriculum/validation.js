const school_lvl = require("../../../models/school_lvl");
const year_lvl = require("../../../models/year_lvl");
const section = require("../../../models/section");

var xss = require("xss");

let schoollevelvalidation = async (req, res, next) => {
  let user;
  user = await school_lvl.findOne({ schoollvl: xss(req.body.schoollevel) });
  if (user) {
    res.locals.schoollevelval = "exist";
    next();
  } else {
    res.locals.schoollevelval = "empty";
    next();
  }
};

let yearlevelvalidation = async (req, res, next) => {
  let user;
  user = await year_lvl.findOne({ yearlvl: xss(req.body.yearlevel) });
  if (user) {
    res.locals.yearlevelval = "exist";
    next();
  } else {
    res.locals.yearlevelval = "empty";
    next();
  }
};

let sectionvalidation = async (req, res, next) => {
  let user;
  user = await section.findOne({ section: xss(req.body.section) });
  if (user) {
    res.locals.sectionval = "exist";
    next();
  } else {
    res.locals.sectionval = "empty";
    next();
  }
};

module.exports = {
  schoollevelvalidation: schoollevelvalidation,
  yearlevelvalidation: yearlevelvalidation,
  sectionvalidation: sectionvalidation,
};
