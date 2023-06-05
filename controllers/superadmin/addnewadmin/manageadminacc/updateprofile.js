const admin_tbl = require("../../../../models/admin_tbl");
const admin_info = require("../../../../models/admin_info");
const bcrypt = require("bcrypt");

const updateuserdbinfo = async (id, email) => {
  let user;
  user = await admin_info.findOne({ id: id });
  user.email = email;
  let results = await user.save();
  if (results) {
    console.log("Update Admin Info Successfully");
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
    console.log("Update Admin Successfully");
  }
};

module.exports = {
  updateusertbl: updateusertbl,
};
