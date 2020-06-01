import { Router } from "express";
import profileController from "../controller/profileController";


const router = Router()


// @test profile route

// router.get('/', profileController.test)
// To view all Profiles
router.get('/', profileController.allProfiles);

// add profile details
router.get('/:uid', profileController.getForm)
router.post('/:uid', profileController.create)

//To view single user Profile
router.get('/user/:uid',profileController.singleProfile)

// add Experience route
router.get('/experience/:uid', profileController.expForm);
router.post('/experience/:uid', profileController.profileExp)

// Add Education
router.get('/education/:uid',profileController.eduForm)
router.post('/education/:uid', profileController.profileEdu)

//Delete experience
router.post(
	'/experience/:uid/:profileid/:id',
	profileController.delProfileExp,
);

//Delete education
  router.post(
		'/education/:uid/:profileid/:id',
		profileController.delProfileEdu,
	);


export default router