import User from "../model/user";
import { genSalt, hash, compare } from "bcrypt";
import { url } from "gravatar";


const create = async (req,res) => {
  try {
  if (req.body.password == req.body.confirmPass ) {
    const {firstName,lastName,email,mobile} = req.body
    const salt = await genSalt(12)
    const password = await hash(req.body.password, salt)
    const avatar = await url(req.body.email, { s: '200', r: 'pg', d: '404' });
    const isRegister = await User.findOne({ email: email })
    const userData = new User({ firstName, lastName, email, password, avatar, mobile })
    res.send(userData)
    if (!isRegister) {
      await userData.save()
      res.redirect('/user/login')
      res.send(`The user is registered ✊ 🤦‍♂`)
    } else {
      errors.email = 'Email Already Exists'
      res.json(errors)
    }    
    res.send(userData)    
  } else {
    res.json({err: " please check your password"})
  }
  } catch (error) {
    res.send(error)
  }
}

const login = async (req,res) => {
  try {
    if (req.body.password === req.body.confirmPass) {
      const salt = await genSalt(12)
      const password = await hash(req.body.password, salt)
      const isUser = await User.findOne({ email: req.body.email })
      if (!isUser) {
        // redirect to the registration page
        // res.redirect('')
        res.json({err: "Please go to the registration"})
      } else {
        await compare(password, isUser.password)
        const {firstName,lastName,email,mobile,avatar} = isUser
        res.json({ firstName, lastName, email, mobile, avatar })  
        // To do Send the data to the view
      }
    } else {
      res.json({err: "Please check your password "})
    }
  } catch (error) {
    res.json(error)
  }
}
export default {create,login}


