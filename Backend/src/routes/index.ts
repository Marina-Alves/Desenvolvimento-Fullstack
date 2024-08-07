import { Router } from "express";
import peopleRoute from "./peopleRoute";
import phoneRoute from "./phoneRoute";
import addressRoute from "./addressRoute";

const router = Router();

router.use(peopleRoute);
router.use(phoneRoute);
router.use(addressRoute);

export default router;