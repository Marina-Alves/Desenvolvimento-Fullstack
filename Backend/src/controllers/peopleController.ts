import { Request, Response } from "express";
import peopleService from "../services/peopleService";
import httpStatus from "http-status";
import { withErrorHandling } from "../utils/errorHandler";

const createPeople = withErrorHandling(async (req: Request, res: Response) => {
	const { name, cpfCnpj, dtNascimento, email, pessoaJuridica, phones, addresses } = req.body;
	const result = await peopleService.createPeople({ name, cpfCnpj, dtNascimento, email, pessoaJuridica, phones, addresses });
	return res.status(httpStatus.CREATED).send(result);
});

const listPeople = withErrorHandling(async (req: Request, res: Response) => {
	const result = await peopleService.getPeoples();
	return res.status(httpStatus.OK).send(result);
});

const listPeopleById = withErrorHandling(async (req: Request, res: Response) => {
	const { peopleId } = req.params;
	const result = await peopleService.getPeopleById(Number(peopleId));
	return res.status(httpStatus.OK).send(result);
});

const changePeopleById = withErrorHandling(async (req: Request, res: Response) => {
	const { peopleId } = req.params;
	const { name, cpfCnpj, dtNascimento, email, pessoaJuridica, ativo, phones, addresses } = req.body;
	const result = await peopleService.updatePeople(Number(peopleId), { name, cpfCnpj, dtNascimento, email, pessoaJuridica, ativo, phones, addresses });
	return res.status(httpStatus.OK).send(result);
});

const deletePeopleById = withErrorHandling(async (req: Request, res: Response) => {
	const { peopleId } = req.params;
	await peopleService.deletePeopleById(Number(peopleId));
	return res.sendStatus(httpStatus.NO_CONTENT);
});

export default { createPeople, listPeople, listPeopleById, changePeopleById, deletePeopleById };
