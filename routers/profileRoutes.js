import { Router } from "express";
import profileController from "../controller/profileController";

const router = Router()


// @test profile route
router.get('/',profileController.test)



export default router