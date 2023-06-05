const staff_tbl = require("../../../../models/staff_tbl");
const staff_info = require("../../../../models/staff_info");
const staff_modules = require("../../../../models/staff_modules");

let getstaff = async (req, res, next) => {
  let transaction;
  transaction = await staff_tbl.findOne(
    { id: req.params.userid },
    { projection: { _id: 0 } }
  );
  if (transaction.length != 0) {
    res.locals.username = transaction.username;
    res.locals.password = transaction.password;
    res.locals.lastname = transaction.lastname;
    res.locals.firstname = transaction.firstname;
    next();
  } else {
    res.locals.username = "empty";
    res.locals.password = "empty";
    res.locals.lastname = "empty";
    res.locals.firstname = "empty";
    next();
  }
};

let getstaffinfo = async (req, res, next) => {
  let transaction;
  transaction = await staff_info.findOne(
    { id: req.params.userid },
    { projection: { _id: 0 } }
  );
  if (transaction.length != 0) {
    res.locals.email = transaction.email;
    next();
  } else {
    res.locals.email = "empty";
    next();
  }
};

let getstaffmodule = async (req, res, next) => {
  let transaction;
  transaction = await staff_modules.findOne(
    { id: req.params.userid },
    { projection: { _id: 0 } }
  );
  if (transaction.length != 0) {
    res.locals.modules = transaction.modules;
    res.locals.positions = transaction.positions;
    res.locals.schoollevel = transaction.schoollevel;
    res.locals.yearlevel = transaction.yearlevel;
    res.locals.section = transaction.section;
    res.locals.accessibility = transaction.accessibility;
    next();
  } else {
    res.locals.modules = "empty";
    res.locals.positions = "empty";
    res.locals.schoollevel = "empty";
    res.locals.yearlevel = "empty";
    res.locals.section = "empty";
    res.locals.accessibility = "empty";
    next();
  }
};

module.exports = {
  getstaff: getstaff,
  getstaffinfo: getstaffinfo,
  getstaffmodule: getstaffmodule,
};
