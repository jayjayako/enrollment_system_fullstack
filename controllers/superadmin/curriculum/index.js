var express = require("express");
var router = express.Router();

const {
  schoollevelvalidation,
  yearlevelvalidation,
  sectionvalidation,
} = require("./validation");

const {
  getschoollevel,
  getyearlevel,
  getsection,
  insertschoollevel,
  insertyearlevel,
  insertsection,
  deleteschoollevel,
  deleteyearlevel,
  deletesection,
} = require("./managecurriculum");

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

///////////////////// manage school level /////////////////////
router.post(
  "/insertschoollevel",
  schoollevelvalidation,
  insertschoollevel,
  async (req, res) => {
    res.json({
      status: "success",
    });
  }
);

router.post(
  "/deleteschoollevel",
  schoollevelvalidation,
  deleteschoollevel,
  async (req, res) => {
    res.json({
      status: "success",
    });
  }
);
///////////////////////////////////////////////////////////////
///////////////////// manage year level ///////////////////////
router.post(
  "/insertyearlevel",
  yearlevelvalidation,
  insertyearlevel,
  async (req, res) => {
    res.json({
      status: "success",
    });
  }
);

router.post(
  "/deleteyearlevel",
  yearlevelvalidation,
  deleteyearlevel,
  async (req, res) => {
    res.json({
      status: "success",
    });
  }
);
///////////////////////////////////////////////////////////////
////////////////////////// manage section /////////////////////
router.post(
  "/insertsection",
  sectionvalidation,
  insertsection,
  async (req, res) => {
    res.json({
      status: "success",
    });
  }
);

router.post(
  "/deletesection",
  sectionvalidation,
  deletesection,
  async (req, res) => {
    res.json({
      status: "success",
    });
  }
);
///////////////////////////////////////////////////////////////

module.exports = router;
