const admin_tbl = require("../../../../models/admin_tbl");
const staff_tbl = require("../../../../models/staff_tbl");

const adminlist = async (req, res, next) => {
  try {
    const usersdata = await admin_tbl
      .aggregate([
        {
          $lookup: {
            from: "admin_info",
            localField: "id",
            foreignField: "id",
            as: "admin_info",
          },
        },
        { $unwind: "$admin_info" },
        { $match: {} },
        {
          $project: {
            "_id": 0,
            "id": 1,
            "lastname": 1,
            "firstname": 1,
            "username": 1,
            "admin_info.picture": 1,
            "admin_info.birthdate": 1,
            "admin_info.phone": 1,
            "admin_info.email": 1,
            "admin_info.address": 1,
          },
        },
      ])
      .exec();
    if (usersdata) {
      res.locals.results = usersdata;
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const stafflist = async (req, res, next) => {
  try {
    const usersdata = await staff_tbl
      .aggregate([
        {
          $lookup: {
            from: "staff_info",
            localField: "id",
            foreignField: "id",
            as: "staff_info",
          },
        },
        { $unwind: "$staff_info" },
        { $match: {} },
        {
          $project: {
            "_id": 0,
            "id": 1,
            "lastname": 1,
            "firstname": 1,
            "username": 1,
            "staff_info.picture": 1,
            "staff_info.birthdate": 1,
            "staff_info.phone": 1,
            "staff_info.email": 1,
            "staff_info.address": 1,
          },
        },
      ])
      .exec();
    if (usersdata) {
      res.locals.results = usersdata;
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  adminlist: adminlist,
  stafflist: stafflist,
};
