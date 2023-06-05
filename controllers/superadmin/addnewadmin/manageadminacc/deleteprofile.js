const admin_tbl = require("../../../../models/admin_tbl");
const admin_info = require("../../../../models/admin_info");
const { deletepicture } = require("./managepicture");

let deleteadminprofile = async (id) => {
  try {
    await admin_tbl.deleteOne({
      id: id,
    });
    console.log("Admin Profile Deleted");
  } catch (err) {
    console.log("error");
  }
};

let deleteadmininfo = async (id) => {
  try {
    let user, picture;
    user = await admin_info.findOne({ id: id });
    picture = user.picture;
    await admin_info.deleteOne({
      id: id,
    });
    console.log("Admin Info Deleted");
    if (picture != "default") {
      deletepicture(picture);
    }
  } catch (err) {
    console.log("error");
  }
};

module.exports = {
  deleteadminprofile: deleteadminprofile,
  deleteadmininfo: deleteadmininfo,
};
