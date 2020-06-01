var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");

router.get("/:profileid", (req, res) => {
  const pid = req.params.profileid;
  res.render("add-experience", { profileid: pid });
});

router.post("/save/:profileid", async (req, res) => {
  const pid = req.params.profileid;
  try {
    const profile = await Profile.findById(pid);
    const current = req.body.current === 'on' ? true : false;
    profile.experience.push({...req.body, current});
    await profile.save();
    res.redirect(`/dashboard/${profile.user}`);
  } catch (err) {
    res.send(err);
  }
});

router.post('/delete/:userid/:profileid/:id', async (req, res) => {
    const {id, profileid,userid} = req.params;
    console.log(req.params.id);
    try {
        await Profile.updateOne({_id:profileid}, { $pull: {experience: { _id: id }}}, {multi: true});
        res.redirect(`/dashboard/${userid}`);
    } catch(err) {
        res.send(err);
    }
    
});

module.exports = router;
