import { Router } from "express";
import profileController from "../controller/profileController";

const router = Router()


// @test profile route

// router.get('/', profileController.test)
// To view all Profiles
router.get('/', profileController.allProfiles);

// add profile details
router.post('/', profileController.create)

//To view single user Profile
router.get('/user/:userId',profileController.singleProfile)

// Experience route 



export default router