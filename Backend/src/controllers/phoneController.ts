import { Request, Response } from "express";
import httpStatus from "http-status";
import phoneService from "../services/phoneService";
import { withErrorHandling } from "../utils/errorHandler";

const createPhone = withErrorHandling(async (req: Request, res: Response) => {
	const { numero, tipo_telefone, peopleId } = req.body;
	const result = await phoneService.createPhone(numero, tipo_telefone, peopleId);
	return res.status(httpStatus.CREATED).send(result);
});

const listPhones = withErrorHandling(async (req: Request, res: Response) => {
	const result = await phoneService.getPhones();
	return res.status(httpStatus.OK).send(result);
});

const listPhoneById = withErrorHandling(async (req: Request, res: Response) => {
	const { phoneId } = req.params;
	const result = await phoneService.getPhoneById(Number(phoneId));
	return res.status(httpStatus.OK).send(result);
});

const updatePhoneById = withErrorHandling(async (req: Request, res: Response) => {
	const { phoneId } = req.params;
	const { numero, tipo_telefone, peopleId } = req.body;
	const result = await phoneService.updatePhone(Number(phoneId), numero, tipo_telefone, peopleId);
	return res.status(httpStatus.OK).send(result);
});

const deletePhoneById = withErrorHandling(async (req: Request, res: Response) => {
	const { phoneId } = req.params;
	await phoneService.deletePhoneById(Number(phoneId));
	return res.sendStatus(httpStatus.NO_CONTENT);
});

export default { createPhone, listPhones, listPhoneById, updatePhoneById, deletePhoneById };
