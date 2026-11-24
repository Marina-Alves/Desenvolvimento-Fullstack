import { CannotCreatingAddress, CannotUpdatingAddress, notFoundError } from "../errors";
import addressRepository from "../repositories/addressRepository";
import { AddressType } from "../utils/protocols";
import peopleService from "./peopleService";

async function createAddress(street: string, number: string, neighborhood: string, cep: string, city: string, state: string, addressDetail: string, peopleId: number): Promise<AddressType> {
	await peopleService.getPeopleById(peopleId);

	const checkAddress = await addressRepository.checkAddressesEquals(street, number, neighborhood, cep, city, state, addressDetail);

	if (checkAddress) {
		throw CannotCreatingAddress();
	}

	return await addressRepository.create(street, number, neighborhood, cep, city, state, addressDetail, peopleId);
}

async function getAddresses() {
	return await addressRepository.listOfAddresses();
}

async function getAddressById(addressId: number) {
	const result = await addressRepository.findAddressById(addressId);

	if (!result) {
		throw notFoundError();
	}

	return result;
}

async function updateAddress(addressId: number, street: string, number: string, neighborhood: string, cep: string, city: string, state: string, addressDetail: string, peopleId: number): Promise<AddressType> {
	await getAddressById(addressId);
	await peopleService.getPeopleById(peopleId);
	const checkAddress = await addressRepository.checkAddressesEquals(street, number, neighborhood, cep, city, state, addressDetail);
	
	if (checkAddress) {
		throw CannotUpdatingAddress();
	}

	return await addressRepository.update(addressId, street, number, neighborhood, cep, city, state, addressDetail, peopleId);
}

async function deleteAddressById(addressId: number) {
	await getAddressById(addressId);

	return await addressRepository.deleteAddressById(addressId);
}

export default { createAddress, getAddresses, getAddressById, updateAddress, deleteAddressById };