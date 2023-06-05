const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  schoollvl: {
    type: String,
    required: true,
    min: 1,
  },
  yearlvl: {
    type: String,
    required: true,
    min: 1,
  },
  section: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("section", userSchema, "section");
