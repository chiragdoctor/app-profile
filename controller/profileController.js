import Profile from "../model/profile"
import User from "../model/user"


const test = async (req,res) => {
  res.json({ msg: "This is the test route" })
  
}

export default {test}