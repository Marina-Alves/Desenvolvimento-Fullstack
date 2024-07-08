import { Phone, Address } from "@prisma/client";
import peopleRepository from "../repositories/peopleRepository";
import { PeopleType } from "../utils/protocols";

async function createPeople(name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean, phones: Phone[], addresses: Address[]): Promise<PeopleType> {
	const result = await peopleRepository.createPeople(name, cpfCnpj, dtNascimento, email, pessoaJuridicacode, phones, addresses);

	return result;
}

async function getPeople() {
	const result = await peopleRepository.findPeople();
	return result;
}

export default { createPeople, getPeople };