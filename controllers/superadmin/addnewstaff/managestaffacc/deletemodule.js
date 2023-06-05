const staff_modules = require("../../../../models/staff_modules");

let deletemodule = async (id) => {
  try {
    await staff_modules.deleteOne({
      id: id,
    });
    console.log("Staff Module Deleted");
  } catch (err) {
    console.log("error");
  }
};

module.exports = {
  deletemodule: deletemodule,
};
