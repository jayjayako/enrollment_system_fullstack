const admin_modules = require("../../../../models/admin_modules");

let deletemodule = async (id) => {
  try {
    await admin_modules.deleteOne({
      id: id,
    });
    console.log("Admin Module Deleted");
  } catch (err) {
    console.log("error");
  }
};

module.exports = {
  deletemodule: deletemodule,
};
