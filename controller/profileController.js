import Profile from "../model/profile"
import User from "../model/user"


const test = async (req,res) => {
  res.json({ msg: "This is the test route" })

}
const getForm = async (req, res) => {
  const uid = req.params.uid
  const user = await User.findById(uid);
  res.render('profile',{user})
}
const expForm = async (req, res) => {
  const uid = req.params.uid
  const user = await User.findById(uid)
 res.render('add-experience',{user})
}
const eduForm = async (req,res) => {
  const uid = req.params.uid
  const user = await User.findById(uid)
  res.render('add-education',{user})
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
    const profile = await Profile.findOneAndUpdate({user : uid},{$set: profileData},{new: true, upsert:ture})
    await profile.save()
    // res.json({msg:'the profile is saved'})
    res.redirect(`/dashboard/${uid}`,)

  } catch (error) {
    res.json({error})
  }
}

const allProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate('User', ['firstName', 'avatar']);
    res.json(profiles)
  } catch (error) {
    res.json({ error });
  }
}

const singleProfile = async (req,res) => {
  const uid = req.params.uid
  try {
    // const uid = User._id
    const profile = await Profile.findOne({ user: uid }).populate('users',['firstName','avatar'])
    res.render('singleProfile',{profile: profile})
    // res.json(profile)
  } catch (error) {
    res.json(error)
  }
}

const profileExp = async (req, res) => {
  try {
    const uid = req.params.uid
    const { title, company, location, from, to, current, description } = req.body
    const newExp = { title, company, location, from, to, current, description };
    const profile = await Profile.findOne({ user: uid })
    profile.experience.unshift(newExp)
   await profile.save()
    // res.json(profile)
    res.redirect(`/dashboard/${uid}`);
  } catch (error) {
    res.json(error)
  }
}

const profileEdu = async (req, res) => {
  try {
    const uid = req.params.uid
    const newEdu = req.body
    const profile = await Profile.findOne({ user: uid })
    profile.education.unshift(newEdu)
    await profile.save()
    res.redirect(`/dashboard/${uid}`);
    // res.json(profile)
  } catch (error) {
    res.json(error)
  }
}

const delProfileExp = async (req, res) => {
  const { id, profileid, uid } = req.params

  try {
    await Profile.updateOne({ _id: profileid }, { $pull: { experience: { _id: id } } }, { multi: true })

    res.redirect(`/dashboard/${uid}`)

  } catch (error) {
    res.json(error)
  }
}

const delProfileEdu = async (req,res) => {
  const { id, profileid, uid } = req.params
  console.log(req.params.id);
  try {
    await Profile.updateOne(
			{ _id: profileid },
			{ $pull: { education: { _id: id } } },
			{ multi: true },
		);
    res.redirect(`/dashboard/${uid}`);
  } catch (error) {
    res.json(error)
  }
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
  getForm,
  expForm,
  eduForm
};