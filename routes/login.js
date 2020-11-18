var express = require("express");
var router = express.Router();

//custom modules
const UserServices = require("../services/userServices");
const db = require("../services/database");

const uservices = new UserServices(db);

router.get("/", (req, res) => {
  res.render("login");
});

// authenticate login details
router.post("/", (req, res, next) => {
  let msg = "";
  const { email, password } = req.body;
  if (uservices.validateEmail(email)) {
    uservices
      .authenticateUser({ email, password })
      .then((result) => {
        if (result) {
          req.session.isLoggedIn = true;
          req.session.userID = email;
          res.redirect("/home");
        } else {
          msg = "Login details are invalid/incorrect!";
          res.render("login", { msg });
        }
      })
      .catch((err) => {
        msg = err;
        res.render("login", { msg });
      });
  } else {
    msg = "Enter valid email!";
    res.render("login", { msg });
  }
});

module.exports = router;
