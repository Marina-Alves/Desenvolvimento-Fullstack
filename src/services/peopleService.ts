import { People } from "@prisma/client";
import peopleRepository from "../repositories/peopleRepository";

async function createPeople(name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean) {
	await peopleRepository.createPeople(name, cpfCnpj, dtNascimento, email, pessoaJuridicacode);
}

async function getPeople() {
	return;
}

export default { createPeople, getPeople };