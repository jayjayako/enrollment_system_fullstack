let express = require("express");
let router = express.Router();

const {
  getenrollmentsched,
  updateenrollmentsched,
} = require("./enrollmentsched");

const {
  getschoollevel,
  getyearlevel,
  getsection,
} = require("./getschoolmodule");

/////////////////////// for registrar page ///////////////////
router.get("/getenrollmentsched", getenrollmentsched, async (req, res) => {
  try {
    res.json({
      status: "success",
      fromyear: res.locals.fromyear,
      allmonth: res.locals.allmonth,
      frommonth: res.locals.frommonth,
      fromday: res.locals.fromday,
      fromhour: res.locals.fromhour,
      fromminute: res.locals.fromminute,
      toyear: res.locals.toyear,
      tomonth: res.locals.tomonth,
      today: res.locals.today,
      tohour: res.locals.tohour,
      tominute: res.locals.tominute,
    });
  } catch (error) {
    res.json({ status: "invalid" });
  }
});

router.post(
  "/updateenrollmentsched",
  updateenrollmentsched,
  async (req, res) => {
    try {
      res.json({
        status: "success",
        fromyear: res.locals.fromyear,
        frommonth: res.locals.frommonth,
        fromday: res.locals.fromday,
        fromhour: res.locals.fromhour,
        fromminute: res.locals.fromminute,
        toyear: res.locals.toyear,
        tomonth: res.locals.tomonth,
        today: res.locals.today,
        tohour: res.locals.tohour,
        tominute: res.locals.tominute,
      });
    } catch (error) {
      res.json({ status: "invalid" });
    }
  }
);

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
//////////////////////////////////////////////////////////////

module.exports = router;
