const admin_tbl = require("../../../../models/admin_tbl");
const admin_info = require("../../../../models/admin_info");
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
  let user = new admin_info(post);
  let results = await user.save();
  if (results) {
    console.log("Insert Admin Info Successfully");
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
  let user = new admin_tbl(post);
  let results = await user.save();

  if (results) {
    console.log("Insert Admin Table Successfully");
  }
  insertuserdbinfo(id, email, absolutepath, fileid, fileflag, actualfile);
};

module.exports = {
  insertusertbl: insertusertbl,
};
