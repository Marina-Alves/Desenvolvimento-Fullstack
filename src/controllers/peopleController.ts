import { Request, Response } from "express";
import peopleService from "../services/peopleService";
import httpStatus from "http-status";

async function createPeople(req: Request, res: Response) {
	const { name, cpfCnpj, dtNascimento, email, pessoaJuridica, phones, addresses } = req.body;
	try {
		const result = 	await peopleService.createPeople(name, cpfCnpj, dtNascimento, email, pessoaJuridica, phones, addresses);
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

async function listPeopleById(req: Request, res: Response) {
	try {
		const { peopleId } = req.params;
		const result = await peopleService.getPeopleById(Number(peopleId));
		return res.status(httpStatus.OK).send(result);
	} catch (error) {
		if (error.name === 'NotFoundError') {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		return res.sendStatus(httpStatus.BAD_REQUEST);
	}
}

export default { createPeople, listPeople, listPeopleById };