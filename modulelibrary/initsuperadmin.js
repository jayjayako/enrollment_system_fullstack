require("dotenv").config();
const superadmin_tbl = require("../models/superadmin_tbl");

const bcrypt = require("bcrypt");

var xss = require("xss");

const userregisterinsert = async (username, pass) => {
  let user,
    id = "1";
  try {
    user = await superadmin_tbl.findOne({ id: id });
    user.username = username;
    user.password = pass;
    let results = await user.save();
    if (results) {
      console.log("Update SuperAdmin Password Successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

const initializesuperadmin = async () => {
  let username = await xss(process.env.SUPERADMINUSER);
  let password = await xss(process.env.SUPERADMINPASS);
  let pass = await bcrypt.hash(password, 10);
  userregisterinsert(username, pass);
};

module.exports = initializesuperadmin;
