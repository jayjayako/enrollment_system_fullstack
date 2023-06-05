require("dotenv").config();
const express = require("express");
const router = express.Router();

const admin_info = require("../../../../models/admin_info");
const staff_info = require("../../../../models/staff_info");

const { updateadminmodule, updatestaffmodule } = require("./updatemodule");

let xss = require("xss");

///////////////////////// update profile ///////////////////////
router.post("/updateadminmodule/:userid", async (req, res) => {
  try {
    let user;
    user = await admin_info.findOne({ id: xss(req.params.userid) });
    if (user) {
      const { adminmodule, admincurriculum } = req.body;
      updateadminmodule(xss(req.params.userid), adminmodule, admincurriculum);
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "invalid",
      });
    }
  } catch (error) {
    res.json({
      status: "invalid",
    });
  }
});

router.post("/updatestaffmodule/:userid", async (req, res) => {
  try {
    let user;
    user = await staff_info.findOne({ id: xss(req.params.userid) });
    if (user) {
      const { staffmodule, staffcurriculum } = req.body;
      updatestaffmodule(xss(req.params.userid), staffmodule, staffcurriculum);
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "invalid",
      });
    }
  } catch (error) {
    res.json({
      status: "invalid",
    });
  }
});
//////////////////////////////////////////////////////////////////

module.exports = router;
