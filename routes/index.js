var bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
const User = require("../models/user");

router.get("/", function (req, res) {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login", { displayAlert: false });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  console.log('user', user)
  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.redirect(`/dashboard/${user._id}`);
    } else {
      res.render("login", {
        displayAlert: true,
        message: "Invalid Password!!",
      });
    }
  } else {
    console.log('hello world')
    res.render("login", {
      displayAlert: true,
      message: "Email not registered!!",
    });
  }
});

module.exports = router;
