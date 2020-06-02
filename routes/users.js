var express = require("express");
var router = express.Router();
var gravatar = require("gravatar");
var bcrypt = require("bcrypt");
const config = require("config");

var User = require("../models/user");
const Profile = require('../models/profile');

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, mobile } = req.body;

  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  const salt = await bcrypt.genSalt(config.get("encrypt.rounds"));
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    firstname,
    lastname,
    email,
    password,
    mobile,
    avatar,
  });
  await user.save();
  res.redirect('/login');
});

router.post('/delete/:userid', async (req, res) => {
  const uid = req.params.userid;
  try {
    await Profile.findOneAndDelete({user: uid});
    await User.findOneAndDelete({_id: uid});
    res.redirect('/login');
  } catch(err) {
    res.send(err);
  }
  
});

module.exports = router;
