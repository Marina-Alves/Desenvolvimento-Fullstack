import { People } from "@prisma/client";
import peopleRepository from "../repositories/peopleRepository";
import { PeopleType } from "../utils/protocols";

async function createPeople(name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean): Promise<PeopleType> {
	const result = await peopleRepository.createPeople(name, cpfCnpj, dtNascimento, email, pessoaJuridicacode);
	return result;
}

async function getPeople() {
	const result = await peopleRepository.findPeople();
	return result;
}

export default { createPeople, getPeople };