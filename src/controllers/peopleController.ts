import { Request, Response } from "express";
import peopleService from "../services/peopleService";
import httpStatus from "http-status";

async function createPeople(req: Request, res: Response) {
	const { name, cpfCnpj, dtNascimento, email, pessoaJuridica } = req.body;
	try {
		const result = 	await peopleService.createPeople(name, cpfCnpj, dtNascimento, email, pessoaJuridica);
		return res.status(httpStatus.CREATED).send(result);
	} catch (error) {
		return res.sendStatus(httpStatus.NOT_FOUND);
	}
}

async function listPeople(req: Request, res: Response) {
	try {
		const result = await peopleService.getPeople();
		return res.status(httpStatus.OK).send(result);
	} catch (error) {
		return res.sendStatus(httpStatus.NOT_FOUND);
	}
}

export default { createPeople, listPeople };