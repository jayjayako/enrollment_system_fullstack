const admin_modules = require("../../../../models/admin_modules");
const xss = require("xss");

let insertmodule = async (id, adminmodule, admincurriculum) => {
  let modules = [];
  let positions = [];
  let schoollevel;
  let yearlevel;
  let section;
  let accessibility;

  let adminmodulearr;
  let admincurriculumarr;

  adminmodulearr = adminmodule.split(",").map((item) => {
    return xss(item);
  });

  admincurriculumarr = admincurriculum.split(",").map((item) => {
    return xss(item);
  });

  if (Array.isArray(adminmodulearr) && Array.isArray(admincurriculumarr)) {
    for (let i = 0; i < adminmodulearr.length; i++) {
      if (i === 0 && adminmodulearr[i] === "true") {
        modules.push("addstaff");
      }
      if (i === 1 && adminmodulearr[i] === "true") {
        modules.push("audittrail");
      }
      if (i === 2 && adminmodulearr[i] === "true") {
        modules.push("managestudent");
      }
      if (i === 3 && adminmodulearr[i] === "true") {
        modules.push("curriculum");
      }
      if (i === 4 && adminmodulearr[i] === "true") {
        modules.push("manageuseraccess");
      }
      if (i === 5 && adminmodulearr[i] === "true") {
        positions.push("registrar");
      }
      if (i === 6 && adminmodulearr[i] === "true") {
        positions.push("accounting");
      }
      if (i === 7 && adminmodulearr[i] === "true") {
        positions.push("cashier");
      }
      if (i === 8 && adminmodulearr[i] === "true") {
        positions.push("enlistment");
      }
      if (i === 9 && adminmodulearr[i] === "true") {
        modules.push("reports");
      }
      if (i === 10 && adminmodulearr[i] === "true") {
        modules.push("logyearspan");
      }
    }

    for (let i = 0; i < admincurriculumarr.length; i++) {
      if (i === 0 && typeof admincurriculumarr[i] === "string") {
        schoollevel = admincurriculumarr[i];
      }
      if (i === 1 && typeof admincurriculumarr[i] === "string") {
        yearlevel = admincurriculumarr[i];
      }
      if (i === 2 && typeof admincurriculumarr[i] === "string") {
        section = admincurriculumarr[i];
      }
      if (i === 3 && typeof admincurriculumarr[i] === "string") {
        accessibility = admincurriculumarr[i];
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

    let user = new admin_modules(post);
    let results = await user.save();

    if (results) {
      console.log("Insert Admin Module Successfully");
    }
  } else {
    console.log("Invalid Input");
  }
};

module.exports = {
  insertmodule: insertmodule,
};
