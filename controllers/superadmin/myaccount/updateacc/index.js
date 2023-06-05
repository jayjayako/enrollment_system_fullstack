require("dotenv").config();
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const superadmin_tbl = require("../../../../models/superadmin_tbl");
const admin_tbl = require("../../../../models/admin_tbl");
const staff_tbl = require("../../../../models/staff_tbl");

const superadmin_info = require("../../../../models/superadmin_info");

const { updateusertbl } = require("./updateprofile");
const { updatepicture } = require("./managepicture");

const { validateinput } = require("./inputvalidation");

const {
  checknumbers,
  checkuppercase,
  checklowercase,
  checkspecialchar,
} = require("../../../modulelibrary/checkstring");

var xss = require("xss");

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

////////////////// check all users then validate ////////////////
router.use(async (req, res, next) => {
  let user1, user2, user3, username;
  username = await xss(req.body.username);
  user1 = await superadmin_tbl.exists({ username: username });
  user2 = await admin_tbl.exists({ username: username });
  user3 = await staff_tbl.exists({ username: username });
  if (user1 && user2 == null && user3 == null) {
    res.locals.status = "exist";
    res.locals.position = "superadmin";
    next();
  } else {
    res.locals.status = "exist";
    res.locals.position = "manyusers";
    next();
  }
});
////////////////////////////////////////////////////////////////

/////////////////////// get all info first /////////////////////
router.use(async (req, res, next) => {
  if (res.locals.status == "exist" && res.locals.position == "superadmin") {
    let user;
    user = await superadmin_info.findOne({ id: req.session.userid });
    if (user) {
      res.locals.mypicture = user.picture;
      next();
    }
  } else {
    res.json({
      status: "invalid",
      message: "already exist",
    });
  }
});
////////////////////////////////////////////////////////////////

/////////////////////// input validation /////////////////////
router.use(validateinput, (req, res, next) => {
  const { password } = req.body;
  if (
    checknumbers(password) &&
    checkuppercase(password) &&
    checklowercase(password) &&
    checkspecialchar(password)
  ) {
    next();
  } else {
    if (!checknumbers(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain number" });
    }
    if (checkuppercase(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain uppercase" });
    }
    if (checklowercase(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain lowercase" });
    }
    if (checkspecialchar(password) == false) {
      res.json({
        status: "invalid",
        passwordauth: "must contain special character",
      });
    }
  }
});
//////////////////////////////////////////////////////////////

///////////////////////// update profile ///////////////////////
router.post("/updateprofile", async (req, res) => {
  try {
    const {
      username,
      password,
      lastname,
      firstname,
      birthdate,
      email,
      phone,
      address,
    } = req.body;
    if (req.files != null) {
      console.log("with picture");
      updatepicture(
        req.session.userid,
        res.locals.absolutepath,
        res.locals.mypicture,
        req.files.profilepic
      );
      updateusertbl(
        req.session.userid,
        xss(username),
        xss(password),
        xss(lastname),
        xss(firstname),
        xss(birthdate),
        xss(email),
        xss(phone),
        xss(address)
      );
    } else {
      console.log("without picture");
      updateusertbl(
        req.session.userid,
        xss(username),
        xss(password),
        xss(lastname),
        xss(firstname),
        xss(birthdate),
        xss(email),
        xss(phone),
        xss(address)
      );
    }
    req.session.password = xss(password);
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "invalid",
    });
  }
});
//////////////////////////////////////////////////////////////////
module.exports = router;
