import peopleRepository from "../repositories/peopleRepository";
import { PeopleInput, PeopleType, PeopleUpdateInput, WithoutAddressId, WithoutPhoneId } from "../utils/protocols";
import { notFoundError, CannotCreatingPeople, CannotUpdatingPeople, CannotUpdatingWithout } from "../errors";

async function createPeople(input: PeopleInput): Promise<PeopleType> {
	const resultOfPeople = await peopleRepository.getPeopleByCpfCnpj(input.cpfCnpj);
	if (resultOfPeople) {
		throw CannotCreatingPeople();
	}
	
	return await peopleRepository.createPeople(input);
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

async function updatePeople(peopleId: number, input: PeopleUpdateInput): Promise<PeopleType> {
	const { cpfCnpj, phones, addresses } = input;
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

	return await peopleRepository.updatePeople(peopleId, input);
}

async function deletePeopleById(peopleId: number) {
	await getPeopleById(peopleId);

	return await peopleRepository.deletePeople(peopleId);
}

export default { createPeople, getPeoples, getPeopleById, updatePeople, deletePeopleById };