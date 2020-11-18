var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  let email = req.session.userID;
  res.render("exercise", { email });
});

module.exports = router;
