const staff_tbl = require("../../../../models/staff_tbl");
const staff_info = require("../../../../models/staff_info");
const bcrypt = require("bcrypt");

const updateuserdbinfo = async (id, email) => {
  let user;
  user = await staff_info.findOne({ id: id });
  user.email = email;
  let results = await user.save();
  if (results) {
    console.log("Update Staff Info Successfully");
  }
};

const updateusertbl = async (
  id,
  username,
  password,
  lastname,
  firstname,
  email
) => {
  let user;
  user = await admin_tbl.findOne({ id: id });
  user.username = username;
  user.password = await bcrypt.hash(password, 10);
  user.lastname = lastname;
  user.firstname = firstname;
  updateuserdbinfo(id, email);
  let results = await user.save();
  if (results) {
    console.log("Update Staff Successfully");
  }
};

module.exports = {
  updateusertbl: updateusertbl,
};
