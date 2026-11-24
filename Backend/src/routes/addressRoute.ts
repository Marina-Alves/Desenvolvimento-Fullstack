import addressController from "../controllers/addressController";
import { Router } from "express";

const addressRoute = Router();
const ADDRESS_BY_ID_PATH = '/address/:addressId';

addressRoute
    .get('/address', addressController.listAddresses)
    .get(ADDRESS_BY_ID_PATH, addressController.listAddressById)
    .post('/address', addressController.createAddress)
    .put(ADDRESS_BY_ID_PATH, addressController.updateAddressById)
    .delete(ADDRESS_BY_ID_PATH, addressController.deleteAddressById);

export default addressRoute;