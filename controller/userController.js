import User from "../model/user";
import { genSalt, hash } from "bcrypt";
import { url } from "gravatar";


const create = async (req,res) => {
  try {
  
    const {firstName,lastName,email,mobile} = req.body
    const salt = await genSalt(12)
    const password = await hash(req.body.password, salt)
    const avatar = await url(req.body.email, { s: '200', r: 'pg', d: '404' });
    const isRegister = await User.findOne({ email: email })
    const userData = new User({ firstName, lastName, email, password, avatar, mobile })

    res.send(userData)
    if (!isRegister) {
      await userData.save()
      res.json(userData)
      res.send(`The user is registered ✊ 🤦‍♂`)
    } else {
      errors.email = 'Email Already Exists'
      res.json(errors)
    }    
    res.send(userData)
  } catch (error) {
    res.send(error)
  }
}

export default {create}


