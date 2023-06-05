const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  modules: {
    type: [String],
    min: 1,
  },
  positions: {
    type: [String],
    min: 1,
  },
  schoollevel: {
    type: String,
    min: 1,
  },
  yearlevel: {
    type: String,
    min: 1,
  },
  section: {
    type: String,
    min: 1,
  },
  accessibility: {
    type: String,
    min: 1,
  },
});

module.exports = mongoose.model("staff_modules", userSchema, "staff_modules");
