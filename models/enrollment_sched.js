const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  fromyear: {
    type: String,
    min: 1,
  },
  frommonth: {
    type: String,
    min: 1,
  },
  fromday: {
    type: String,
    min: 1,
  },
  fromhour: {
    type: String,
    min: 1,
  },
  fromminute: {
    type: String,
    min: 1,
  },
  toyear: {
    type: String,
    min: 1,
  },
  tomonth: {
    type: String,
    min: 1,
  },
  today: {
    type: String,
    min: 1,
  },
  tohour: {
    type: String,
    min: 1,
  },
  tominute: {
    type: String,
    min: 1,
  },
});

module.exports = mongoose.model(
  "enrollment_sched",
  userSchema,
  "enrollment_sched"
);
