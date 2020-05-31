import Profile from "../model/profile"
import User from "../model/user"


const test = async (req,res) => {
  res.json({ msg: "This is the test route" })
  
}

const create = async (req, res) => {
  try {
    const uid = req.params.uid
    const {
      company,
      website, location,
      status, skills,
      bio, githubusername,
      youtube,twitter,instagram,linkedin,facebook
    } = req.body 
    const skillsData = Array.isArray(skills) ? skills : skills.split(',').map((skill) => ' ' + skill.trim())
    const socialData = {youtube,twitter,instagram,linkedin,facebook}
    const profileData = {
      user: uid ,
      company, website,location,skills: skillsData,bio,status,githubusername,social: socialData
    }
    const profile = new Profile(profileData)
    await profile.save()
    res.json({msg:'the profile is saved'})
    
  } catch (error) {
    res.json({error})
  }
}

const allProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('User', ['firstName', 'avatar']);
    res.json(profiles)    
  } catch (error) {
    res.json({ error });
  }
}

const singleProfile = async (req,res) => {
  try {
    const userId = req.params.userId
    const sinProfile = await Profile.findOne({ user: userId }).populate('User', ['firstName', 'avatar'])
    res.json(sinProfile)
  } catch (error) {
    res.json(error)
  }
}


export default {test,create,allProfiles,singleProfile}