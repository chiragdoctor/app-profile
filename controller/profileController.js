import Profile from "../model/profile"
import User from "../model/user"


const test = async (req,res) => {
  res.json({ msg: "This is the test route" })
  
}
const getForm = async (req, res) => {
  const uid = req.params.uid
  const user = await User.findById(uid)
  res.render('profile',{user})
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
    // res.json({msg:'the profile is saved'})
    res.redirect(`/dashboard/${uid}`,)
    
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
    // const uid = User._id
    const sinProfile = await Profile.findOne({ user: userId }).populate('User', ['firstName', 'avatar'])
    res.json(sinProfile)
  } catch (error) {
    res.json(error)
  }
}


const profileExp = async (req, res) => {
  try {
    const userId = req.params.userId
    const { title, company, location, from, to, current, description } = req.body
    const newExp = { title, company, location, from, to, current, description };
    const profile = await Profile.findOne({ user: userId })
    profile.experience.unshift(newExp)
   await profile.save()
    res.json(profile)
  } catch (error) {
    res.json(error)
  }
}

const profileEdu = async (req, res) => {
  try {
    const userId = req.params.userId
    const newEdu = req.body
    const profile = await Profile.findOne({ user: userId })
    profile.education.unshift(newEdu)
    await profile.save()
    res.json(profile)
  } catch (error) {
    res.json(error)
  }
}

const delProfileExp = async (req,res) => {
  try {
    // const expId = req.params.expId 
    // const foundProfile = await Profile.findOne({user: req.user.id})

    // need guidance to delete id 
    res.json({ msg: 'need to check with prashant' });
  } catch (error) {
    res.json(error)
  }
}

const delProfileEdu = async (req,res) => {
  res.json({msg: "need to check with prashant"})
}

export default {
	test,
	create,
	allProfiles,
	singleProfile,
	profileExp,
	profileEdu,
  delProfileExp,
  delProfileEdu,
  getForm
};