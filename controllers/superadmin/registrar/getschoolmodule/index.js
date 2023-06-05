const school_lvl = require("../../../../models/school_lvl");
const year_lvl = require("../../../../models/year_lvl");
const section = require("../../../../models/section");

var xss = require("xss");

let getschoollevel = async (req, res, next) => {
  if (req.body.schoollevel) {
    // skip
    res.locals.schoollevel = xss(req.body.schoollevel);
    next();
  } else {
    // initial data
    let transaction;
    transaction = await school_lvl.find({}, { projection: { _id: 0 } });
    if (transaction.length != 0) {
      res.locals.schoollevel = transaction;
      next();
    } else {
      res.locals.schoollevel = "empty"; // palitan mo to ng empty array pag string di talaga mag didisplay yan sa client
      next();
    }
  }
};
let getyearlevel = async (req, res, next) => {
  if (req.body.yearlevel) {
    //skip
    res.locals.yearlevel = xss(req.body.yearlevel);
    next();
  } else {
    // initial data
    let transaction, schoollevelvalue;
    if (Array.isArray(res.locals.schoollevel)) {
      schoollevelvalue = res.locals.schoollevel[0].schoollvl;
    } else {
      schoollevelvalue = res.locals.schoollevel;
    }
    transaction = await year_lvl.find(
      { schoollvl: schoollevelvalue },
      { projection: { _id: 0 } }
    );
    if (transaction.length != 0) {
      res.locals.yearlevel = transaction;
      next();
    } else {
      res.locals.yearlevel = "empty";
      next();
    }
  }
};
let getsection = async (req, res, next) => {
  let transaction, schoollevelvalue, yearlevelvalue;
  if (Array.isArray(res.locals.schoollevel)) {
    schoollevelvalue = res.locals.schoollevel[0].schoollvl;
  } else {
    schoollevelvalue = res.locals.schoollevel;
  }
  if (Array.isArray(res.locals.yearlevel)) {
    yearlevelvalue = res.locals.yearlevel[0].yearlvl;
  } else {
    yearlevelvalue = res.locals.yearlevel;
  }
  transaction = await section.find(
    {
      schoollvl: schoollevelvalue,
      yearlvl: yearlevelvalue,
    },
    { projection: { _id: 0 } }
  );
  if (transaction.length != 0) {
    res.locals.section = transaction;
    next();
  } else {
    res.locals.section = "empty";
    next();
  }
};

module.exports = {
  getschoollevel: getschoollevel,
  getyearlevel: getyearlevel,
  getsection: getsection,
};
