import { CannotCreatingAddress, CannotUpdatingAddress, notFoundError } from "../errors";
import addressRepository from "../repositories/addressRepository";
import { AddressInput, AddressType } from "../utils/protocols";
import peopleService from "./peopleService";

async function createAddress(input: AddressInput, peopleId: number): Promise<AddressType> {
	await peopleService.getPeopleById(peopleId);

	const checkAddress = await addressRepository.checkAddressesEquals(input);

	if (checkAddress) {
		throw CannotCreatingAddress();
	}

	return await addressRepository.create(input, peopleId);
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

async function updateAddress(addressId: number, input: AddressInput, peopleId: number): Promise<AddressType> {
	await getAddressById(addressId);
	await peopleService.getPeopleById(peopleId);
	const checkAddress = await addressRepository.checkAddressesEquals(input);
	
	if (checkAddress) {
		throw CannotUpdatingAddress();
	}

	return await addressRepository.update(addressId, input, peopleId);
}

async function deleteAddressById(addressId: number) {
	await getAddressById(addressId);

	return await addressRepository.deleteAddressById(addressId);
}

export default { createAddress, getAddresses, getAddressById, updateAddress, deleteAddressById };