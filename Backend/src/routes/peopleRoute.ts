import { Router } from "express";
import peopleController from "../controllers/peopleController";

const peopleRoute = Router();

peopleRoute
	.get('/people', peopleController.listPeople)
	.get('/people/:peopleId', peopleController.listPeopleById)
	.post('/people', peopleController.createPeople)
	.put('/people/:peopleId', peopleController.changePeopleById)
	.delete('/people/:peopleId', peopleController.deletePeopleById);

export default peopleRoute;