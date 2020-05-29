import { Router } from "express";
import userController from "../controller/userController";


const router = Router()

// user Get route 
router.get('/', async (rea,res) => {
  res.send('this is the user router')
})
// user register route 
router.post('/', userController.create)

// user login route 


export default router

