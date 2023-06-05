const admin_modules = require("../../../../models/admin_modules");
const staff_modules = require("../../../../models/staff_modules");

var xss = require("xss");

let updateadminmodule = async (id, adminmodule, admincurriculum) => {
  let modules = [],
    positions = [],
    schoollevel,
    yearlevel,
    section,
    accessibility;

  let adminmodulearr;
  let admincurriculumarr;

  adminmodulearr = adminmodule;
  admincurriculumarr = admincurriculum;

  if (Array.isArray(adminmodulearr) && Array.isArray(admincurriculumarr)) {
    for (let i = 0; i < adminmodulearr.length; i++) {
      if (i === 0 && adminmodulearr[i] === true) {
        modules.push("addstaff");
      }
      if (i === 1 && adminmodulearr[i] === true) {
        modules.push("audittrail");
      }
      if (i === 2 && adminmodulearr[i] === true) {
        modules.push("managestudent");
      }
      if (i === 3 && adminmodulearr[i] === true) {
        modules.push("curriculum");
      }
      if (i === 4 && adminmodulearr[i] === true) {
        modules.push("manageuseraccess");
      }
      if (i === 5 && adminmodulearr[i] === true) {
        positions.push("registrar");
      }
      if (i === 6 && adminmodulearr[i] === true) {
        positions.push("accounting");
      }
      if (i === 7 && adminmodulearr[i] === true) {
        positions.push("cashier");
      }
      if (i === 8 && adminmodulearr[i] === true) {
        positions.push("enlistment");
      }
      if (i === 9 && adminmodulearr[i] === true) {
        modules.push("reports");
      }
      if (i === 10 && adminmodulearr[i] === true) {
        modules.push("logyearspan");
      }
    }

    for (let i = 0; i < admincurriculumarr.length; i++) {
      if (i === 0 && typeof admincurriculumarr[i] === "string") {
        schoollevel = xss(admincurriculumarr[i]);
      }
      if (i === 1 && typeof admincurriculumarr[i] === "string") {
        yearlevel = xss(admincurriculumarr[i]);
      }
      if (i === 2 && typeof admincurriculumarr[i] === "string") {
        section = xss(admincurriculumarr[i]);
      }
      if (i === 3 && typeof admincurriculumarr[i] === "string") {
        accessibility = xss(admincurriculumarr[i]);
      }
    }

    let user;
    user = await admin_modules.findOne({ id: id });
    user.modules = modules;
    user.positions = positions;
    user.schoollevel = schoollevel;
    user.yearlevel = yearlevel;
    user.section = section;
    user.accessibility = accessibility;

    let results = await user.save();
    if (results) {
      console.log("Update Admin Module Successfully");
    }
  }
};

let updatestaffmodule = async (id, staffmodule, staffcurriculum) => {
  let modules = [],
    positions = [],
    schoollevel,
    yearlevel,
    section,
    accessibility;

  let staffmodulearr;
  let staffcurriculumarr;

  staffmodulearr = staffmodule;
  staffcurriculumarr = staffcurriculum;
  if (Array.isArray(staffmodulearr) && Array.isArray(staffcurriculumarr)) {
    for (let i = 0; i < staffmodulearr.length; i++) {
      if (i === 0 && staffmodulearr[i] === true) {
        positions.push("registrar");
      }
      if (i === 1 && staffmodulearr[i] === true) {
        positions.push("accounting");
      }
      if (i === 2 && staffmodulearr[i] === true) {
        positions.push("cashier");
      }
      if (i === 3 && staffmodulearr[i] === true) {
        positions.push("enlistment");
      }
      if (i === 4 && staffmodulearr[i] === true) {
        modules.push("audittrail");
      }
      if (i === 5 && staffmodulearr[i] === true) {
        modules.push("managestudent");
      }
      if (i === 6 && staffmodulearr[i] === true) {
        modules.push("reports");
      }
    }

    for (let i = 0; i < staffcurriculumarr.length; i++) {
      if (i === 0 && typeof staffcurriculumarr[i] === "string") {
        schoollevel = xss(staffcurriculumarr[i]);
      }
      if (i === 1 && typeof staffcurriculumarr[i] === "string") {
        yearlevel = xss(staffcurriculumarr[i]);
      }
      if (i === 2 && typeof staffcurriculumarr[i] === "string") {
        section = xss(staffcurriculumarr[i]);
      }
      if (i === 3 && typeof staffcurriculumarr[i] === "string") {
        accessibility = xss(staffcurriculumarr[i]);
      }
    }

    let user;
    user = await staff_modules.findOne({ id: id });
    user.modules = modules;
    user.positions = positions;
    user.schoollevel = schoollevel;
    user.yearlevel = yearlevel;
    user.section = section;
    user.accessibility = accessibility;

    let results = await user.save();
    if (results) {
      console.log("Update Staff Module Successfully");
    }
  }
};

module.exports = {
  updatestaffmodule: updatestaffmodule,
  updateadminmodule: updateadminmodule,
};
