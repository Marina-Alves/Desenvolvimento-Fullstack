import addressController from "../controllers/addressController";
import { Router } from "express";

const addressRoute = Router();

addressRoute
    .get('/address', addressController.listAddresses)
    .get('/address/:addressId', addressController.listAddressById)
    .post('/address', addressController.createAddress)
    .put('/address/:addressId')
    .delete('/address/:addressId');

export default addressRoute;