import { notFoundError } from "../errors";
import phoneRepository from "../repositories/phoneRepository";
import { PhoneType } from "../utils/protocols";
import peopleService from "./peopleService";

async function createPhone(numero: string, tipoTelefone: string, peopleId: number): Promise<PhoneType> {
	await peopleService.getPeopleById(peopleId);

	const result = await phoneRepository.create(numero, tipoTelefone, peopleId);
	
	return result;
}

async function getPhones() {
	const result = await phoneRepository.listOfPhones();
	return result;
}

async function getPhoneById(phoneId: number) {
	const result = await phoneRepository.findPhoneById(phoneId);

	if (!result) {
		throw notFoundError();
	}

	return result;
}

export default { createPhone, getPhones, getPhoneById };