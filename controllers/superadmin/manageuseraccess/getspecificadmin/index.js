const admin_tbl = require("../../../../models/admin_tbl");
const admin_info = require("../../../../models/admin_info");
const admin_modules = require("../../../../models/admin_modules");

let getadmin = async (req, res, next) => {
  let transaction;
  transaction = await admin_tbl.findOne(
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

let getadmininfo = async (req, res, next) => {
  let transaction;
  transaction = await admin_info.findOne(
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

let getadminmodule = async (req, res, next) => {
  let transaction;
  transaction = await admin_modules.findOne(
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
  getadmin: getadmin,
  getadmininfo: getadmininfo,
  getadminmodule: getadminmodule,
};
