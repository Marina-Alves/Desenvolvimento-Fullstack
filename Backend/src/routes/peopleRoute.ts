import { Router } from "express";
import peopleController from "../controllers/peopleController";

const peopleRoute = Router();
const PEOPLE_BY_ID_PATH = '/people/:peopleId';

peopleRoute
	.get('/people', peopleController.listPeople)
	.get(PEOPLE_BY_ID_PATH, peopleController.listPeopleById)
	.post('/people', peopleController.createPeople)
	.put(PEOPLE_BY_ID_PATH, peopleController.changePeopleById)
	.delete(PEOPLE_BY_ID_PATH, peopleController.deletePeopleById);

export default peopleRoute;