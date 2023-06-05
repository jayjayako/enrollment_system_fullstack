const school_lvl = require("../../../models/school_lvl");
const year_lvl = require("../../../models/year_lvl");
const section = require("../../../models/section");

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

///////////////////// insert school level /////////////////////
let insertschoollevel = async (req, res, next) => {
  if (res.locals.schoollevelval == "empty") {
    let post = {
      schoollvl: xss(req.body.schoollevel),
    };
    let transaction = new school_lvl(post);
    let results = await transaction.save();

    if (results) {
      console.log("Inserted School Level");
      next();
    }
  } else {
    res.json({ status: "invalid", message: "already exist" });
  }
};
///////////////////////////////////////////////////////////////
///////////////////// insert year level ///////////////////////
let insertyearlevel = async (req, res, next) => {
  if (res.locals.yearlevelval == "empty") {
    let post = {
      schoollvl: xss(req.body.schoollevel),
      yearlvl: xss(req.body.yearlevel),
    };
    let transaction = new year_lvl(post);
    let results = await transaction.save();

    if (results) {
      console.log("Inserted Year Level");
      next();
    }
  } else {
    res.json({ status: "invalid", message: "already exist" });
  }
};
///////////////////////////////////////////////////////////////
//////////////////////// insert section ///////////////////////
let insertsection = async (req, res, next) => {
  if (res.locals.sectionval == "empty") {
    let post = {
      schoollvl: xss(req.body.schoollevel),
      yearlvl: xss(req.body.yearlevel),
      section: xss(req.body.section),
    };
    let transaction = new section(post);
    let results = await transaction.save();

    if (results) {
      console.log("Inserted Section");
      next();
    }
  } else {
    res.json({ status: "invalid", message: "already exist" });
  }
};
///////////////////////////////////////////////////////////////
////////////////////// delete school level ////////////////////
let deleteschoollevel = async (req, res, next) => {
  if (res.locals.schoollevelval == "exist") {
    try {
      await school_lvl.deleteMany({
        schoollvl: xss(req.body.schoollevel), // deleteOne deleteMany
      });
      await year_lvl.deleteMany({
        schoollvl: xss(req.body.schoollevel),
      });
      await section.deleteMany({
        schoollvl: xss(req.body.schoollevel),
      });
      console.log("School level Deleted");
      next();
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ status: "invalid", message: "doest exist" });
  }
};
///////////////////////////////////////////////////////////////
////////////////////// delete year level //////////////////////
let deleteyearlevel = async (req, res, next) => {
  if (res.locals.yearlevelval == "exist") {
    try {
      await year_lvl.deleteMany({
        yearlvl: xss(req.body.yearlevel),
      });
      await section.deleteMany({
        yearlvl: xss(req.body.yearlevel),
      });
      console.log("Year level Deleted");
      next();
    } catch (err) {
      console.log("error");
    }
  } else {
    res.json({ status: "invalid", message: "doest exist" });
  }
};
///////////////////////////////////////////////////////////////
//////////////////////// delete section ////////////////////////
let deletesection = async (req, res, next) => {
  if (res.locals.sectionval == "exist") {
    try {
      await section.deleteMany({
        section: xss(req.body.section),
      });
      console.log("Section Deleted");
      next();
    } catch (err) {
      console.log("error");
    }
  } else {
    res.json({ status: "invalid", message: "doest exist" });
  }
};
///////////////////////////////////////////////////////////////

module.exports = {
  getschoollevel: getschoollevel,
  getyearlevel: getyearlevel,
  getsection: getsection,
  insertschoollevel: insertschoollevel,
  insertyearlevel: insertyearlevel,
  insertsection: insertsection,
  deleteschoollevel: deleteschoollevel,
  deleteyearlevel: deleteyearlevel,
  deletesection: deletesection,
};
