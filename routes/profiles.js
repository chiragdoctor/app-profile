var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");
const User = require('../models/user');

router.get('/all/:userid', async (req, res) => {
    const userid = req.params.userid;
    try {
        const user = await User.findById(userid);
        const profiles = await Profile.find({}).populate('user');
        res.render('profiles', {profiles: profiles, user: user});
    } catch(err) {
        res.send(err);
    }
});

router.get('/:profileid', async (req, res) => {
    const pid = req.params.profileid;
    const profile = await Profile.findById(pid).populate('user');
    console.log('proile', profile);
    res.render('profile', {profile, user: profile.user})
});

router.get("/save/:userid", (req, res) => {
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

router.get('/edit/:profileid', async (req, res) => {
    const pid = req.params.profileid;
    try {
        const profile = await Profile.findById(pid).populate('user');
        res.render('edit-profile', { profile, user: profile.user });
    } catch(err) {
        res.send(err);
    }
});

router.post('/edit/:profileid', async (req, res) => {
    const pid = req.params.profileid;
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

    const profile = await Profile.findOneAndUpdate({_id: pid}, {$set: {
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
    }}, {useFindAndModify: false});
    res.redirect(`/dashboard/${profile.user}`);
});

module.exports = router;
