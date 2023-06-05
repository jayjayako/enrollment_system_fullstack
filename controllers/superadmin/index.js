var express = require("express");
var router = express.Router();

var myaccount = require("./myaccount");
var dashboard = require("./dashboard");
var addnewadmin = require("./addnewadmin");
var addnewstaff = require("./addnewstaff");
var curriculum = require("./curriculum");
var manageuseraccess = require("./manageuseraccess");
var registrar = require("./registrar");

var auth = require("../modulelibrary/authsession");

router.use(auth);

router.use((req, res, next) => {
  if (req.session.position == "superadmin" && res.locals.status == "loggedin") {
    next();
  } else {
    res.json({ status: "invalid" });
  }
});

//////////// user account /////////
router.use("/myaccount", myaccount);
///////////////////////////////////
//////////// user dashboard ///////
router.use("/dashboard", dashboard);
router.use("/addnewadmin", addnewadmin);
router.use("/addnewstaff", addnewstaff);
router.use("/curriculum", curriculum);
router.use("/manageuseraccess", manageuseraccess);
router.use("/registrar", registrar);
///////////////////////////////////

module.exports = router;
