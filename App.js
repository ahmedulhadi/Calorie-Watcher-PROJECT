const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

//routing modules
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const homeRoute = require("./routes/home");

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//session
app.use(
  session({
    secret: "asdf789687sddfgge8u7328t83",
    resave: true,
    saveUninitialized: true,
  })
);

//set static contents
app.use(express.static("static"));

//set up views and pug
app.set("views", "./views");
app.set("view engine", "pug");

//Routing
app.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/home", homeRoute);

//terms route
app.get("/terms", (req, res) => {
  //session destroy
  res.render("terms");
});

//FIXME: remove this route before deploy
// app.get("/test", (req, res) => {
//   //session destroy
//   res.render("./old_pug/index1");
// });

//logout route
app.get("/logout", (req, res) => {
  //session destroy
  req.session = null;
  let msg = "Logged out successfully!";
  res.render("login", { msg });
});

app.get("*", function (req, res) {
  res.status(404).send(`The page you are looking for doesn\'t exists!
  <br> <a href="/login">Click here to login</a>`);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
