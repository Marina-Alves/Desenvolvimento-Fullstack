import { Router } from "express";
import peopleController from "../controllers/peopleController";

const peopleRoute = Router();

peopleRoute
	.get('/people', peopleController.listPeople)
	.post('/people', peopleController.createPeople);

export default peopleRoute;