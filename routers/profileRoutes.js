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
router.get('/user',profileController.singleProfile)

// add Experience route 
router.put('/experience/:userId', profileController.profileExp)

// Add Education 
router.put('/education/:userId', profileController.profileEdu)

//Delete experience
router.delete('/experience/:expId',
  profileController.delProfileExp)
  
//Delete education
  router.delete('/education/:eduId',profileController.delProfileEdu)


export default router