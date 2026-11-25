import { Request, Response } from "express";
import httpStatus from "http-status";
import addressService from "../services/addressService";
import { withErrorHandling } from "../utils/errorHandler";

const createAddress = withErrorHandling(async (req: Request, res: Response) => {
	const { street, number, neighborhood, cep, city, state, addressDetail, peopleId } = req.body;
	const result = await addressService.createAddress({ street, number, neighborhood, cep, city, state, addressDetail }, peopleId);
	return res.status(httpStatus.CREATED).send(result);
});

const listAddresses = withErrorHandling(async (req: Request, res: Response) => {
	const result = await addressService.getAddresses();
	return res.status(httpStatus.OK).send(result);
});

const listAddressById = withErrorHandling(async (req: Request, res: Response) => {
	const { addressId } = req.params;
	const result = await addressService.getAddressById(Number(addressId));
	return res.status(httpStatus.OK).send(result);
});

const updateAddressById = withErrorHandling(async (req: Request, res: Response) => {
	const { addressId } = req.params;
	const { street, number, neighborhood, cep, city, state, addressDetail, peopleId } = req.body;
	const result = await addressService.updateAddress(Number(addressId), { street, number, neighborhood, cep, city, state, addressDetail }, peopleId);
	return res.status(httpStatus.OK).send(result);
});

const deleteAddressById = withErrorHandling(async (req: Request, res: Response) => {
	const { addressId } = req.params;
	await addressService.deleteAddressById(Number(addressId));
	return res.sendStatus(httpStatus.NO_CONTENT);
});

export default { createAddress, listAddresses, listAddressById, updateAddressById, deleteAddressById };
