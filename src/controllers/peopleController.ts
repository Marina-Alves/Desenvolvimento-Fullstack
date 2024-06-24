import { Request, Response } from "express";

async function createPeople(req: Request, res: Response) {
	const { name, cpfCnpj, dtNascimento, email, pessoaJuridica } = req.body;

	res.sendStatus(201);
}

async function listPeople(req: Request, res: Response) {
	res.sendStatus(200);
}

export default { createPeople, listPeople }