var express = require("express");
var router = express.Router();

//custom modules
const WatcherServices = require("../services/WatcherServices");
const db = require("../services/database");
const bmi = require("../services/bmi");

//routes
const detailsRoute = require("../routes/details");
const exerciseRoute = require("../routes/exercise");

//calorie watch service
const wcservices = new WatcherServices(db);

//check if user logged in
router.use("/", (req, res, next) => {
  //FIXME: remove these session vars (two lines) before deploying
  // req.session.isLoggedIn = true;
  // req.session.userID = `email@test.com`;

  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.use("/details", detailsRoute);
router.use("/exercise", exerciseRoute);

router.get("/", (req, res, next) => {
  email = req.session.userID;
  wcservices
    .isUserDetailsExists(email)
    .then((result) => {
      if (result) {
        next();
      } else {
        res.render("index_start", { email });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res) => {
  email = req.session.userID;
  wcservices
    .getUserDetails(email)
    .then((userDetails) => {
      res.render("index_with_details", userDetails);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  email = req.session.userID;
  wcservices.isUserDetailsExists(email).then((result) => {
    if (result) {
      updateDetailsAndRespond(req, res);
    } else {
      addDetailsAndRespond(req, res);
    }
  });
});

function addDetailsAndRespond(req, res) {
  req.body.email = req.session.userID;
  req.body.initialBMI = bmi.calculateBMI(
    req.body.initialWeight,
    req.body.initialHeight
  );
  wcservices
    .addPersonalDetails(req.body)
    .then((result) => {
      details = null;
      if (result) {
        logIntialWeight(req, res);
      } else {
        res.redirect("/home");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/home");
    });
}

async function updateDetailsAndRespond(req, res) {
  req.body.email = req.session.userID;
  req.body.initialBMI = bmi.calculateBMI(
    req.body.initialWeight,
    req.body.initialHeight
  );
  wcservices.updatePersonalDetails(req.body).then((result) => {
    console.log("1>>" + result);
    if (result) {
      logIntialWeight(req, res);
    } else {
      res.redirect("/home");
    }
  });
}

function logIntialWeight(req, res) {
  req.body.email = req.session.userID;
  req.body.date = new Date().toISOString().slice(0, 10);
  req.body.weight = req.body.initialWeight;
  req.body.height = req.body.initialHeight;
  req.body.bmi = bmi.calculateBMI(req.body.weight, req.body.height);
  wcservices
    .addWeightLog(req.body)
    .then(() => {
      res.redirect("/home/details");
    })
    .catch((err) => {
      console.log(`logIntialWeight fn(): ${err}`);
    });
}

router.post("/logweight", (req, res) => {
  req.body.email = req.session.userID;
  req.body.date = new Date().toISOString().slice(0, 10);
  req.body.bmi = bmi.calculateBMI(req.body.weight, req.body.height);
  wcservices
    .addWeightLog(req.body)
    .then(() => {
      res.redirect("/home/details");
    })
    .catch((err) => {
      console.log(`logweight Route: ${err}`);
    });
});

router.get("/reset", (req, res, next) => {
  if (req.session.isLoggedIn) {
    let email = req.session.userID;
    wcservices.deleteWeightLogs(email).then(() => {
      console.log(`all the logs deleted for ${email}`);
      next();
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/reset", (req, res) => {
  if (req.session.isLoggedIn) {
    let email = req.session.userID;
    wcservices.deleteUserDetails(email).then(() => {
      console.log(`all the initial details deleted for ${email}`);
      res.redirect("/home");
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
