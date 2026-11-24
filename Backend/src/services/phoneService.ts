import { notFoundError } from "../errors";
import phoneRepository from "../repositories/phoneRepository";
import { PhoneType } from "../utils/protocols";
import peopleService from "./peopleService";

async function createPhone(numero: string, tipoTelefone: string, peopleId: number): Promise<PhoneType> {
	await peopleService.getPeopleById(peopleId);

	return await phoneRepository.create(numero, tipoTelefone, peopleId);
}

async function getPhones() {
	return await phoneRepository.listOfPhones();
}

async function getPhoneById(phoneId: number) {
	const result = await phoneRepository.findPhoneById(phoneId);

	if (!result) {
		throw notFoundError();
	}

	return result;
}

async function updatePhone(phoneId: number, numero: string, tipoTelefone: string, peopleId: number): Promise<PhoneType> {
	await getPhoneById(phoneId);
	await peopleService.getPeopleById(peopleId);

	return await phoneRepository.update(phoneId, numero, tipoTelefone, peopleId);
}

async function deletePhoneById(phoneId: number) {
	await getPhoneById(phoneId);

	return await phoneRepository.deletePhoneById(phoneId);
}

export default { createPhone, getPhones, getPhoneById, updatePhone, deletePhoneById };