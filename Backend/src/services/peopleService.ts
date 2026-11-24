import { Phone, Address } from "@prisma/client";
import peopleRepository from "../repositories/peopleRepository";
import { PeopleType, WithoutAddressId, WithoutPhoneId } from "../utils/protocols";
import { notFoundError, CannotCreatingPeople, CannotUpdatingPeople, CannotUpdatingWithout } from "../errors";

async function createPeople(name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean, phones: Phone[], addresses: Address[]): Promise<PeopleType> {
	const resultOfPeople = await peopleRepository.getPeopleByCpfCnpj(cpfCnpj);
	if (resultOfPeople) {
		throw CannotCreatingPeople();
	}
	
	return await peopleRepository.createPeople(name, cpfCnpj, dtNascimento, email, pessoaJuridicacode, phones, addresses);
}

async function getPeoples() {
	return await peopleRepository.findPeople();
}

async function getPeopleById(peopleId: number) {
	const result = await peopleRepository.findPeopleById(peopleId);

	if (!result) {
		throw notFoundError();
	}
	return result;
}

async function updatePeople(peopleId: number, name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean, ativo: boolean, phones: Phone[], addresses: Address[]): Promise<PeopleType> {
	const { cpf_cnpj } = await getPeopleById(peopleId);
	
	if (cpfCnpj && cpfCnpj !== cpf_cnpj) {
		const resultOfPeople = await peopleRepository.getPeopleByCpfCnpj(cpfCnpj);
		
		if (resultOfPeople) {
			throw CannotUpdatingPeople();
		}
	}

	if (phones) {
		phones.map(phone => {
			if (phone.id === undefined) throw CannotUpdatingWithout(WithoutPhoneId);
		});
	}

	if (addresses) {
		addresses.map(address => {
			if (address.id === undefined) throw CannotUpdatingWithout(WithoutAddressId);
		});
	}

	return await peopleRepository.updatePeople(peopleId, name, cpfCnpj, dtNascimento, email, pessoaJuridicacode, ativo, phones, addresses);
}

async function deletePeopleById(peopleId: number) {
	await getPeopleById(peopleId);

	return await peopleRepository.deletePeople(peopleId);
}

export default { createPeople, getPeoples, getPeopleById, updatePeople, deletePeopleById };