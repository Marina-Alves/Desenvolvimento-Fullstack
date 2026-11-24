import { Router } from "express";
import phoneController from "../controllers/phoneController";

const phoneRoute = Router();
const PHONE_BY_ID_PATH = '/phone/:phoneId';

phoneRoute
	.get('/phone', phoneController.listPhones)
	.get(PHONE_BY_ID_PATH, phoneController.listPhoneById)
	.post('/phone', phoneController.createPhone)
	.put(PHONE_BY_ID_PATH, phoneController.updatePhoneById)
	.delete(PHONE_BY_ID_PATH, phoneController.deletePhoneById);

export default phoneRoute;