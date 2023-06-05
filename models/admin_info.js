const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  picture: {
    type: String,
    required: true,
    min: 1,
  },
  birthdate: {
    type: String,
    min: 1,
  },
  phone: {
    type: String,
    min: 1,
  },
  email: {
    type: String,
    required: true,
    min: 1,
  },
  address: {
    type: String,
    min: 1,
  },
});

module.exports = mongoose.model("admin_info", userSchema, "admin_info");
