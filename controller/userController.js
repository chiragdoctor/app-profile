import User from "../model/user";
import { genSalt, hash } from "bcrypt";
import { url } from "gravatar";
import validateRegisterInput from "../validator/register";

const create = async (req,res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const {firstName,lastName,email,mobile} = req.body
    const salt = await genSalt(12)
    const password = await hash(req.body.password, salt)
    const avatar = await url(req.body.email, { s: '200', r: 'pg', d: '404' });
    const isRegister = await User.findOne({ email: email })
    const userData = new User({ firstName, lastName, email, password, avatar, mobile })
    if (!isRegister) {
      await userData.save()
      res.send(`The user is registered ✊ 🤦‍♂`)
    } else {
      res.send(`You need to log in `)
    }
    
    res.send(userData)
  } catch (error) {
    res.send(error)
  }
}

export default {create}


