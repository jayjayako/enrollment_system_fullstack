var express = require("express");
var router = express.Router();

const { stafflist } = require("./getallstaff");
const { getstaff, getstaffinfo, getmodule } = require("./getspecificstaff");
const {
  getschoollevel,
  getyearlevel,
  getsection,
} = require("./getschoolmodule");
const managestaffaccount = require("./managestaffacc");

const {
  generatenewpassword,
} = require("../../modulelibrary/generatenewpassword");
/////////////////////// for addnewstaff page ///////////////////
router.get("/", stafflist, async (req, res) => {
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
router.get("/getnewpassword", async (req, res) => {
  try {
    res.json({
      status: "success",
      password: await generatenewpassword(10),
    });
  } catch (error) {
    res.json({ status: "invalid" });
  }
});
router.get(
  "/displayspecificstaff/:userid",
  getstaff,
  getstaffinfo,
  getmodule,
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
///////////////////// manage staff account ////////////////////
router.use("/managestaffaccount", managestaffaccount);
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
