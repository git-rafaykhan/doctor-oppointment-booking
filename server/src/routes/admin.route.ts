import { Router } from "express";
import {
  signin,
  addDoctor,
  oppointmentsAdmin,
  cancelOppointment,
  alldoctors,
  deleteDoctor,
} from "../controllers/admin.controller.js";
import { upload } from "../utils/multer.js";

const router: Router = Router();

router.post("/signin", signin);

router.post("/add-doctor", upload.single("image"), addDoctor);
router.get("/doctors", alldoctors);
router.delete("/delete-doctor", deleteDoctor);

router.get("/appointments", oppointmentsAdmin);
router.delete("/cancel-appointment", cancelOppointment);

export default router;

