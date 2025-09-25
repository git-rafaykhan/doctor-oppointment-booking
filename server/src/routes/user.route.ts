import { Router } from "express";
import { bookOppointment, myOppointments, signin, signup } from "../controllers/user.controller.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/bookOppointment',userMiddleware, bookOppointment)

router.get("/myOppointments",userMiddleware,  myOppointments)

export default router;
