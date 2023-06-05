const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  schoollvl: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("school_lvl", userSchema, "school_lvl");
