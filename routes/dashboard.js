var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");

router.get("/:userid", async (req, res) => {
  const uid = req.params.userid;
  try {
    const userProfile = await Profile.findOne({ user: uid }).populate('user');
    console.log("profiles", userProfile);
    res.render("dashboard", { profile: userProfile });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
