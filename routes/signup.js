var express = require("express");
var router = express.Router();

//custom modules
const UserServices = require("../services/userServices");
const db = require("../services/database");

const uservices = new UserServices(db);

router.get("/", (req, res) => {
  let msg = "";
  res.render("signup", { msg });
});

//validate the signup details
router.post("/", (req, res, next) => {
  //response message
  let msg = "";
  const { email, psw, psw_repeat } = req.body;
  if (uservices.validateEmail(email)) {
    if (uservices.validatePassword(psw)) {
      if (psw != psw_repeat) {
        msg = "Repeat password must match password!";
      }
    } else {
      msg = "Password length must be greater than 4!";
    }
  } else {
    msg = "Enter valid email!";
  }
  if (msg == "") {
    uservices
      .isUserExists(email)
      .then((result) => {
        if (result) {
          msg = "Email id already registered!";
          res.render("signup", { msg });
        } else {
          next();
        }
      })
      .catch((err) => {
        msg = err;
        res.render("signup", { msg });
      });
  } else {
    res.render("signup", { msg });
  }
});

//register user and send back response
router.use("/", (req, res) => {
  let msg = "";
  const { fname, lname, email, psw, psw_repeat } = req.body;
  // console.log(`1>>>> ${email} >>>>>>>>> ${psw}`);
  uservices
    .createUser({ fname, lname, email, password: psw })
    .then((result) => {
      if (result) {
        msg = "Account created successfully! Login to continue.";
        res.render("login", { msg });
      }
    })
    .catch((err) => {
      msg = err;
      res.render("signup", { msg });
    });
});
module.exports = router;
