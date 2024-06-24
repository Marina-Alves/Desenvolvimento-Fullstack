import { Router } from "express";
import peopleRoute from "./peopleRoute";

const router = Router();

router.use(peopleRoute);

export default router;