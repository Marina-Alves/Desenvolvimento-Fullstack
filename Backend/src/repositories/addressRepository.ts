import prisma from "../config/database";
import { AddressInput } from "../utils/protocols";

function create({ street, number, neighborhood, cep, city, state, addressDetail }: AddressInput, peopleId: number) {
	return prisma.address.create({
		data: {
			street,
			number,
			neighborhood, 
			cep,
			city,
			state,
			addressDetail,
			peopleId
		},
	});
}

function listOfAddresses() {
	return prisma.address.findMany({});
}

function findAddressById(addressId: number) {
	return prisma.address.findFirst({
		where: {
			id: addressId,
		}
	});
}

function checkAddressesEquals({ street, number, neighborhood, cep, city, state, addressDetail }: AddressInput) {
	return prisma.address.findFirst({
		where: {
			street,
			number,
			neighborhood, 
			cep,
			city,
			state,
			addressDetail
		}
	});
}

function update(addressId: number, { street, number, neighborhood, cep, city, state, addressDetail }: AddressInput, peopleId: number) {
	return prisma.address.update({
		where: {
			id: addressId,
		},
		data: {
			street,
			number,
			neighborhood, 
			cep,
			city,
			state,
			addressDetail,
			peopleId
		}
	});
}

function deleteAddressById(addressId: number) {
	return prisma.address.delete({
		where: {
			id: addressId,
		},
	});
}

export default { create, listOfAddresses, findAddressById, checkAddressesEquals, update, deleteAddressById };