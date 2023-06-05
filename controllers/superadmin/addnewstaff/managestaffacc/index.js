require("dotenv").config();
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const staff_info = require("../../../../models/staff_info");

const { insertusertbl } = require("./insertprofile");
const { insertmodule } = require("./insertmodule");
const { updatemodule } = require("./updatemodule");
const { deletemodule } = require("./deletemodule");
const { updateusertbl } = require("./updateprofile");
const { updatepicture } = require("./managepicture");
const { deletestaffprofile, deletestaffinfo } = require("./deleteprofile");

const {
  firstvalidation,
  passwordvalidation,
  checkallusernames,
  checkdeletestaff,
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
        staffmodule,
        staffcurriculum,
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
        insertmodule(mynewid, staffmodule, staffcurriculum);
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
        insertmodule(mynewid, staffmodule, staffcurriculum);
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
  if (res.locals.status == "exist" && res.locals.position == "staff") {
    try {
      let user;
      user = await staff_info.findOne({ id: xss(req.params.userid) });
      if (user) {
        const {
          username,
          password,
          lastname,
          firstname,
          email,
          staffmodule,
          staffcurriculum,
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
          updatemodule(xss(req.params.userid), staffmodule, staffcurriculum);
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
          updatemodule(xss(req.params.userid), staffmodule, staffcurriculum);
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
router.get("/deleteprofile/:userid", checkdeletestaff, async (req, res) => {
  if (res.locals.status == "exist") {
    try {
      deletestaffprofile(xss(req.params.userid));
      deletestaffinfo(xss(req.params.userid));
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
