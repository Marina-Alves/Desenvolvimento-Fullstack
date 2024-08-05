import { Router } from "express";
import peopleRoute from "./peopleRoute";
import phoneRoute from "./phoneRoute";

const router = Router();

router.use(peopleRoute);
router.use(phoneRoute);

export default router;