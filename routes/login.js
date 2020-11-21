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
router.post("/", async (req, res) => {
  let msg = "";
  const { email, password } = req.body;
  if (uservices.validateEmail(email)) {
    uservices
      .authenticateUser({ email, password })
      .then((result) => {
        if (result) {
          setSessionAndRespond(req, res);
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

async function setSessionAndRespond(req, res) {
  const { email } = req.body;
  let name = await uservices.getUserNameByEmail(email);
  console.log("Logged in:" + JSON.stringify(name));
  req.session.isLoggedIn = true;
  req.session.email = email;
  req.session.fname = name.fname;
  res.redirect("/home");
}

module.exports = router;
