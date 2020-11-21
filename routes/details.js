var express = require("express");
var router = express.Router();

//custom modules
const WatcherServices = require("../services/WatcherServices");
const db = require("../services/database");

//calorie watch service
const wcservices = new WatcherServices(db);

router.use("/", (req, res, next) => {
  email = req.session.email;
  wcservices
    .isUserDetailsExists(email)
    .then((result) => {
      if (result) {
        next();
      } else {
        res.redirect("/home");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", async (req, res) => {
  let email = req.session.email;
  let fname = req.session.fname;
  let userDetails = await wcservices.getUserDetails(email);
  let weightLogs = await wcservices.getWeightLogs(email);
  let maxWeight = await wcservices.getMaxWeightByEmail(email);
  let data = {
    fname,
    email,
    maxWeight,
    userDetails,
    weightLogs,
  };
  res.render("details", data);
});

module.exports = router;
