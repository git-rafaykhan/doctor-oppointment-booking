import express, { Router } from "express";
import { doctorAppointments, signin } from "../controllers/doctor.controller.js";
import { doctorMiddleware } from "../middlewares/doctorMiddleware.js";

const router:Router = express.Router()

router.post("/signin", signin)
router.get("/getAppointments", doctorMiddleware, doctorAppointments)

export default router