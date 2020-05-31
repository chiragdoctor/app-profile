var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");

router.get("/:userid", (req, res) => {
  res.render("create-profile", { userid: req.params.userid });
});

router.post("/save/:userid", async (req, res) => {
    const uid = req.params.userid;
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = req.body;

  const profile = new Profile({
      user: uid,
      company,
      website,
      location,
      status,
      skills: skills.trim(),
      bio,
      githubusername,
      social: {
          twitter,
          facebook,
          instagram,
          youtube,
          linkedin
      }
  });

    const profile_data =  await profile.save();
    res.redirect(`/dashboard/${uid}`);
});

module.exports = router;
