import { Request, Response } from "express";
import httpStatus from "http-status";
import phoneService from "../services/phoneService";

async function createPhone(req: Request, res: Response) {
	const { numero, tipo_telefone, peopleId } = req.body;

	try {
		const result = 	await phoneService.createPhone(numero, tipo_telefone, peopleId);
		return res.status(httpStatus.CREATED).send(result);
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		return res.sendStatus(httpStatus.BAD_REQUEST);
	}
}

async function listPhone(req: Request, res: Response) {
	try {
		const result = await phoneService.getPhones();
		return res.status(httpStatus.OK).send(result);
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		return res.sendStatus(httpStatus.BAD_REQUEST);
	}
}

async function listPhoneById(req: Request, res: Response) {
	try {
		const { phoneId } = req.params;
		const result = await phoneService.getPhoneById(Number(phoneId));
		return res.status(httpStatus.OK).send(result);
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		return res.sendStatus(httpStatus.BAD_REQUEST);
	}
}

export default { createPhone, listPhone, listPhoneById };