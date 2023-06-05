const staff_modules = require("../../../../models/staff_modules");

var xss = require("xss");

let updatemodule = async (id, staffmodule, staffcurriculum) => {
  let modules = [],
    positions = [],
    schoollevel,
    yearlevel,
    section,
    accessibility;

  let staffmodulearr;
  let staffcurriculumarr;

  staffmodulearr = staffmodule.split(",").map((item) => {
    return xss(item);
  });

  staffcurriculumarr = staffcurriculum.split(",").map((item) => {
    return xss(item);
  });

  if (Array.isArray(staffmodulearr) && Array.isArray(staffcurriculumarr)) {
    for (let i = 0; i < staffmodulearr.length; i++) {
      if (i === 0 && staffmodulearr[i] === "true") {
        positions.push("registrar");
      }
      if (i === 1 && staffmodulearr[i] === "true") {
        positions.push("accounting");
      }
      if (i === 2 && staffmodulearr[i] === "true") {
        positions.push("cashier");
      }
      if (i === 3 && staffmodulearr[i] === "true") {
        positions.push("enlistment");
      }
      if (i === 4 && staffmodulearr[i] === "true") {
        modules.push("audittrail");
      }
      if (i === 5 && staffmodulearr[i] === "true") {
        modules.push("managestudent");
      }
      if (i === 6 && staffmodulearr[i] === "true") {
        modules.push("reports");
      }
    }

    for (let i = 0; i < staffcurriculumarr.length; i++) {
      if (i === 0 && typeof staffcurriculumarr[i] === "string") {
        schoollevel = staffcurriculumarr[i];
      }
      if (i === 1 && typeof staffcurriculumarr[i] === "string") {
        yearlevel = staffcurriculumarr[i];
      }
      if (i === 2 && typeof staffcurriculumarr[i] === "string") {
        section = staffcurriculumarr[i];
      }
      if (i === 3 && typeof staffcurriculumarr[i] === "string") {
        accessibility = staffcurriculumarr[i];
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
  updatemodule: updatemodule,
};
