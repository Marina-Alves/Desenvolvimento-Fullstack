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

	const result = await addressRepository.create(street, number, neighborhood, cep, city, state, addressDetail, peopleId);

	return result;
}

async function getAddresses() {
	const result = await addressRepository.listOfAddresses();
	return result;
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

	const result = await addressRepository.update(addressId, street, number, neighborhood, cep, city, state, addressDetail, peopleId);

	return result;
}

async function deleteAddressById(addressId: number) {
	await getAddressById(addressId);

	const result = await addressRepository.deleteAddressById(addressId);

	return result;
}

export default { createAddress, getAddresses, getAddressById, updateAddress, deleteAddressById };