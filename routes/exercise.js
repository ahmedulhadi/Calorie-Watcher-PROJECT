var express = require("express");
var router = express.Router();

const db = require("../services/database");
const WatcherServices = require("../services/WatcherServices");
const wcservices = new WatcherServices(db);

const overweight = {
  MON: "Full body + walk 10000steps",
  TUE: "Cardio + walk 10000steps ",
  WED: "Full body + walk 10000steps",
  THU: "Cardio + walk 10000steps ",
  FRI: "Cardio + walk 10000steps ",
  SAT: "Cardio + walk 10000steps ",
  SUN: "Active Recovery",
};
const normal = {
  MON: "Full body",
  TUE: "Cardio and abs ",
  WED: "leg and butt",
  THU: "Active Recovery ",
  FRI: "Full body ",
  SAT: "Cardio and abs ",
  SUN: "Active Recovery/Full-on rest",
};
const underweight = {
  MON: "Chest & Back",
  TUE: "Legs, Calves & Abs",
  WED: "Shoulders & Traps",
  THU: "Triceps, Biceps & Abs",
  FRI: "Full-on rest",
  SAT: "Active Recovery",
  SUN: "Full-on rest",
};

router.get("/", async (req, res) => {
  const fname = req.session.fname;
  const email = req.session.email;
  let data = { fname, email };
  const wtLog = await wcservices.getLastWeightLogs(email);
  data.bmiClass = wtLog.bmiClass;
  const bmi = parseFloat(wtLog.bmi);
  if (bmi < 18.5) {
    data.st = "UnderWeight";
    data.ex = underweight;
  } else if (bmi <= 25) {
    data.st = "Normal";
    data.ex = normal;
  } else {
    data.st = "Overweight";
    data.ex = overweight;
  }
  res.render("exercise", data);
});

module.exports = router;
