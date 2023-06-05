const enrollment_sched = require("../../../../models/enrollment_sched");

const getenrollmentsched = async (req, res, next) => {
  try {
    let transaction;
    transaction = await enrollment_sched.findOne(
      { id: "1" },
      { projection: { _id: 0 } }
    );
    if (transaction.length != 0) {
      let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      res.locals.fromyear = transaction.fromyear;
      res.locals.allmonth = month;
      res.locals.frommonth = month[parseInt(transaction.frommonth)];
      res.locals.fromday = transaction.fromday;
      res.locals.fromhour = transaction.fromhour;
      res.locals.fromminute = transaction.fromminute;
      res.locals.toyear = transaction.toyear;
      res.locals.tomonth = month[parseInt(transaction.tomonth)];
      res.locals.today = transaction.today;
      res.locals.tohour = transaction.tohour;
      res.locals.tominute = transaction.tominute;
      next();
    } else {
      res.locals.fromyear = "empty";
      res.locals.allmonth = "empty";
      res.locals.frommonth = "empty";
      res.locals.fromday = "empty";
      res.locals.fromhour = "empty";
      res.locals.fromminute = "empty";
      res.locals.toyear = "empty";
      res.locals.tomonth = "empty";
      res.locals.today = "empty";
      res.locals.tohour = "empty";
      res.locals.tominute = "empty";
      // palitan mo to ng empty array pag string di talaga mag didisplay yan sa client
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const updateenrollmentsched = async (req, res, next) => {
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let transaction;
  transaction = await enrollment_sched.findOne({ id: "1" });
  transaction.fromyear = req.body.fromyear;
  transaction.frommonth = month.indexOf(req.body.frommonth);
  transaction.fromday = req.body.fromday;
  transaction.fromhour = req.body.fromhour;
  transaction.fromminute = req.body.fromminute;
  transaction.toyear = req.body.toyear;
  transaction.tomonth = month.indexOf(req.body.tomonth);
  transaction.today = req.body.today;
  transaction.tohour = req.body.tohour;
  transaction.tominute = req.body.tominute;

  let results = await transaction.save();
  if (results) {
    console.log("Update Enrollment Schedule Successfully");
    next();
  }
};

module.exports = {
  getenrollmentsched: getenrollmentsched,
  updateenrollmentsched: updateenrollmentsched,
};
