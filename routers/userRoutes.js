import { Router } from "express";
import userController from "../controller/userController";
import register from "../validator/register";



const router = Router()

// user Get route 
router.get('/', userController.allUser)

router.get('/register',userController.regiForm)
// user register route 
router.post('/register', register.registerRules(),register.validate , userController.create)

router.get('/login', userController.loginForm);

// user login route 
router.post('/login',register.loginRules(),register.validate, userController.login)

export default router

