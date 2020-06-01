var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");

router.get("/:profileid", (req, res) => {
  const pid = req.params.profileid;
  res.render("add-education", { profileid: pid });
});

router.post("/save/:profileid", async (req, res) => {
  const pid = req.params.profileid;
  try {
    const profile = await Profile.findById(pid);
    const current = req.body.current === 'on' ? true : false;
    profile.education.push({...req.body, current});
    await profile.save();
    res.redirect(`/dashboard/${profile.user}`);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;