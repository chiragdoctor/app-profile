import { Router } from "express";
import userController from "../controller/userController";
import register from "../validator/register";



const router = Router()

// user Get route 
router.get('/', async (rea,res) => {
  res.send('this is the user router')
})
// user register route 
router.post('/', register.registerRules(),register.validate , userController.create)

// user login route 
router.post('/login',register.loginRules(),register.validate, userController.login)

export default router

