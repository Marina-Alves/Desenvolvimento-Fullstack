import { Request, Response } from "express";
import httpStatus from "http-status";
import addressService from "../services/addressService";

async function createAddress(req: Request, res: Response) {
	const { street, number, neighborhood, cep, city, state, addressDetail, peopleId } = req.body;

	try {
		const result = await addressService.createAddress(street, number, neighborhood, cep, city, state, addressDetail, peopleId);
		return res.status(httpStatus.CREATED).send(result);
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		if (error.name === 'CannotCreatingAddress') {
			return res.status(httpStatus.CONFLICT).send(error.message);
		}
		return res.sendStatus(httpStatus.BAD_REQUEST);
	}
}

async function listAddresses(req: Request, res: Response) {
	try {
		const result = await addressService.getAddresses();
		return res.status(httpStatus.OK).send(result);
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		return res.sendStatus(httpStatus.BAD_REQUEST);
	}
}

async function listAddressById(req: Request, res: Response) {
	try {
		const { addressId } = req.params;
		const result = await addressService.getAddressById(Number(addressId));
		return res.status(httpStatus.OK).send(result);
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		return res.sendStatus(httpStatus.BAD_REQUEST);
	}
}

export default { createAddress, listAddresses, listAddressById };