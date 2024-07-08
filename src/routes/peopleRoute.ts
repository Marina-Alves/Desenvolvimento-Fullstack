import { Router } from "express";
import peopleController from "../controllers/peopleController";

const peopleRoute = Router();

peopleRoute
	.get('/people', peopleController.listPeople)
	.get('/people/:peopleId', peopleController.listPeopleById)
	.post('/people', peopleController.createPeople);

export default peopleRoute;