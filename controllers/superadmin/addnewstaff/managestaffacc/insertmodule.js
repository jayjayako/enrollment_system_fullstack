const staff_modules = require("../../../../models/staff_modules");
const xss = require("xss");

let insertmodule = async (id, staffmodule, staffcurriculum) => {
  let modules = [];
  let positions = [];
  let schoollevel;
  let yearlevel;
  let section;
  let accessibility;

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

    let post = {
      id: id,
      modules: modules,
      positions: positions,
      schoollevel: schoollevel,
      yearlevel: yearlevel,
      section: section,
      accessibility: accessibility,
    };

    let user = new staff_modules(post);
    let results = await user.save();

    if (results) {
      console.log("Insert Staff Module Successfully");
    }
  } else {
    console.log("Invalid Input");
  }
};

module.exports = {
  insertmodule: insertmodule,
};
