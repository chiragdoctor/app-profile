var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");
const User = require('../models/user');

router.get("/:userid", async (req, res) => {
  const uid = req.params.userid;
  try {
    const userProfile = await Profile.findOne({ user: uid }).populate('user');
    console.log('userProfile', userProfile);
    const user = await User.findById(uid);
    console.log('user ', user);
    res.render("dashboard", { profile: userProfile, user: user });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
