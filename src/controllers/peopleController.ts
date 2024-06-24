import { Request, Response } from "express";
import peopleService from "../services/peopleService";

async function createPeople(req: Request, res: Response) {
	const { name, cpfCnpj, dtNascimento, email, pessoaJuridica } = req.body;
	await peopleService.createPeople(name, cpfCnpj, dtNascimento, email, pessoaJuridica);

	res.sendStatus(201);
}

async function listPeople(req: Request, res: Response) {
	res.sendStatus(200);
}

export default { createPeople, listPeople };