require("dotenv").config();
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const admin_info = require("../../../../models/admin_info");

const { insertusertbl } = require("./insertprofile");
const { insertmodule } = require("./insertmodule");
const { updatemodule } = require("./updatemodule");
const { deletemodule } = require("./deletemodule");
const { updateusertbl } = require("./updateprofile");
const { updatepicture } = require("./managepicture");
const { deleteadminprofile, deleteadmininfo } = require("./deleteprofile");

const {
  firstvalidation,
  passwordvalidation,
  checkallusernames,
  checkdeleteadmin,
} = require("./validation");

var xss = require("xss");

var uniqid = require("uniqid");

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

/////////////////////// input validation ///////////////////////
let validateinput = [firstvalidation, passwordvalidation, checkallusernames];
////////////////////////////////////////////////////////////////

///////////////////////// insert profile ///////////////////////
router.post("/insertprofile", validateinput, async (req, res) => {
  if (res.locals.status == "dontexist") {
    try {
      let mynewid = uniqid();
      const {
        username,
        password,
        lastname,
        firstname,
        email,
        adminmodule,
        admincurriculum,
      } = req.body;
      if (req.files != null) {
        console.log("with picture");
        insertusertbl(
          mynewid,
          xss(username),
          xss(password),
          xss(lastname),
          xss(firstname),
          xss(email),
          res.locals.absolutepath,
          "default",
          "withfile",
          req.files.profilepic
        );
        insertmodule(mynewid, adminmodule, admincurriculum);
      } else {
        console.log("without picture");
        insertusertbl(
          mynewid,
          xss(username),
          xss(password),
          xss(lastname),
          xss(firstname),
          xss(email),
          res.locals.absolutepath,
          "default",
          "nofile",
          "emptyfile"
        );
        insertmodule(mynewid, adminmodule, admincurriculum);
      }
      res.json({
        status: "success",
      });
    } catch (error) {
      res.json({
        status: "invalid",
      });
    }
  } else {
    res.json({
      status: "invalid",
      message: "already exist",
    });
  }
});
////////////////////////////////////////////////////////////////

///////////////////////// update profile ///////////////////////
router.post("/updateprofile/:userid", validateinput, async (req, res) => {
  if (res.locals.status == "exist" && res.locals.position == "admin") {
    try {
      let user;
      user = await admin_info.findOne({ id: xss(req.params.userid) });
      if (user) {
        const {
          username,
          password,
          lastname,
          firstname,
          email,
          adminmodule,
          admincurriculum,
        } = req.body;
        if (req.files != null) {
          console.log("with picture");
          updatepicture(
            xss(req.params.userid),
            res.locals.absolutepath,
            user.picture,
            req.files.profilepic
          );
          updateusertbl(
            xss(req.params.userid),
            xss(username),
            xss(password),
            xss(lastname),
            xss(firstname),
            xss(email)
          );
          updatemodule(xss(req.params.userid), adminmodule, admincurriculum);
        } else {
          console.log("without picture");
          updateusertbl(
            xss(req.params.userid),
            xss(username),
            xss(password),
            xss(lastname),
            xss(firstname),
            xss(email)
          );
          updatemodule(xss(req.params.userid), adminmodule, admincurriculum);
        }
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
  } else {
    res.json({
      status: "invalid",
      message: "already exist",
    });
  }
});
//////////////////////////////////////////////////////////////////

///////////////////////// delete profile /////////////////////////
router.get("/deleteprofile/:userid", checkdeleteadmin, async (req, res) => {
  if (res.locals.status == "exist") {
    try {
      deleteadminprofile(xss(req.params.userid));
      deleteadmininfo(xss(req.params.userid));
      deletemodule(xss(req.params.userid));
      res.json({
        status: "success",
      });
    } catch (error) {
      res.json({
        status: "invalid",
      });
    }
  } else {
    res.json({
      status: "invalid",
      message: "dont exist",
    });
  }
});
//////////////////////////////////////////////////////////////////
module.exports = router;
