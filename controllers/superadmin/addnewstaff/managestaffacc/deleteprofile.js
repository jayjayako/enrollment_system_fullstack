const staff_tbl = require("../../../../models/staff_tbl");
const staff_info = require("../../../../models/staff_info");
const { deletepicture } = require("./managepicture");

let deletestaffprofile = async (id) => {
  try {
    await staff_tbl.deleteOne({
      id: id,
    });
    console.log("Staff Profile Deleted");
  } catch (err) {
    console.log("error");
  }
};

let deletestaffinfo = async (id) => {
  try {
    let user, picture;
    user = await staff_info.findOne({ id: id });
    picture = user.picture;
    await staff_info.deleteOne({
      id: id,
    });
    console.log("Staff Info Deleted");
    if (picture != "default") {
      deletepicture(picture);
    }
  } catch (err) {
    console.log("error");
  }
};

module.exports = {
  deletestaffprofile: deletestaffprofile,
  deletestaffinfo: deletestaffinfo,
};
