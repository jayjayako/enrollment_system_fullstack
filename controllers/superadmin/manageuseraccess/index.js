var express = require("express");
var router = express.Router();

const { adminlist, stafflist } = require("./getallusers");

const {
  getadmin,
  getadmininfo,
  getadminmodule,
} = require("./getspecificadmin");
const {
  getstaff,
  getstaffinfo,
  getstaffmodule,
} = require("./getspecificstaff");
const {
  getschoollevel,
  getyearlevel,
  getsection,
} = require("./getschoolmodule");
const manageuseraccount = require("./manageuseracc");

///////////////////// for manageuseraccess page /////////////////
router.get("/getadmin", adminlist, async (req, res) => {
  try {
    let results = res.locals.results;
    res.json({
      status: "success",
      allresults: results,
    });
  } catch (error) {
    res.json({ status: "invalid" });
  }
});

router.get("/getstaff", stafflist, async (req, res) => {
  try {
    let results = res.locals.results;
    res.json({
      status: "success",
      allresults: results,
    });
  } catch (error) {
    res.json({ status: "invalid" });
  }
});

router.get(
  "/displayspecificadmin/:userid",
  getadmin,
  getadmininfo,
  getadminmodule,
  async (req, res) => {
    try {
      res.json({
        status: "success",
        username: res.locals.username,
        lastname: res.locals.lastname,
        firstname: res.locals.firstname,
        email: res.locals.email,
        modules: res.locals.modules,
        positions: res.locals.positions,
        schoollevel: res.locals.schoollevel,
        yearlevel: res.locals.yearlevel,
        section: res.locals.section,
        accessibility: res.locals.accessibility,
      });
    } catch (error) {
      res.json({ status: "invalid" });
    }
  }
);
router.get(
  "/displayspecificstaff/:userid",
  getstaff,
  getstaffinfo,
  getstaffmodule,
  async (req, res) => {
    try {
      res.json({
        status: "success",
        username: res.locals.username,
        lastname: res.locals.lastname,
        firstname: res.locals.firstname,
        email: res.locals.email,
        modules: res.locals.modules,
        positions: res.locals.positions,
        schoollevel: res.locals.schoollevel,
        yearlevel: res.locals.yearlevel,
        section: res.locals.section,
        accessibility: res.locals.accessibility,
      });
    } catch (error) {
      res.json({ status: "invalid" });
    }
  }
);
///////////////////////////////////////////////////////////////

///////////////////// manage user account ////////////////////
router.use("/manageuseraccount", manageuseraccount);
///////////////////////////////////////////////////////////////
///////////////////// get curriculum //////////////////////////
router.get(
  "/getallcurriculum",
  getschoollevel,
  getyearlevel,
  getsection,
  async (req, res) => {
    try {
      res.json({
        status: "success",
        schoollevel: res.locals.schoollevel,
        yearlevel: res.locals.yearlevel,
        section: res.locals.section,
      });
    } catch (error) {
      res.json({ status: "invalid" });
    }
  }
);

router.post(
  "/getallspecificcurriculum",
  getschoollevel,
  getyearlevel,
  getsection,
  async (req, res) => {
    try {
      res.json({
        status: "success",
        schoollevel: res.locals.schoollevel,
        yearlevel: res.locals.yearlevel,
        section: res.locals.section,
      });
    } catch (error) {
      res.json({ status: "invalid" });
    }
  }
);
///////////////////////////////////////////////////////////////

module.exports = router;
