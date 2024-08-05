import { Router } from "express";
import phoneController from "../controllers/phoneController";

const phoneRoute = Router();

phoneRoute
	.get('/phone', phoneController.listPhone)
	.get('/phone/:phoneId', phoneController.listPhoneById)
	.post('/phone', phoneController.createPhone)
	.put('/phone/:phoneId', phoneController.updatePhoneById)
	.delete('/phone/:phoneId', phoneController.deletePhoneById);

export default phoneRoute;