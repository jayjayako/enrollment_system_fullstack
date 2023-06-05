const staff_tbl = require("../../../../models/staff_tbl");
const staff_info = require("../../../../models/staff_info");
const bcrypt = require("bcrypt");
const { updatepicture } = require("./managepicture");

const insertuserdbinfo = async (
  id,
  email,
  absolutepath,
  fileid,
  fileflag,
  actualfile
) => {
  let post = {
    id: id,
    picture: fileid,
    email: email,
  };
  let user = new staff_info(post);
  let results = await user.save();
  if (results) {
    console.log("Insert Staff Info Successfully");
    if (fileflag == "withfile") {
      updatepicture(id, absolutepath, fileid, actualfile);
    }
  }
};

const insertusertbl = async (
  id,
  username,
  password,
  lastname,
  firstname,
  email,
  absolutepath,
  fileid,
  fileflag,
  actualfile
) => {
  let post = {
    id: id,
    username: username,
    password: await bcrypt.hash(password, 10),
    lastname: lastname,
    firstname: firstname,
  };
  let user = new staff_tbl(post);
  let results = await user.save();

  if (results) {
    console.log("Insert Staff Table Successfully");
  }
  insertuserdbinfo(id, email, absolutepath, fileid, fileflag, actualfile);
};

module.exports = {
  insertusertbl: insertusertbl,
};
