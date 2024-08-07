import prisma from "../config/database";

function create(street: string, number: string, neighborhood: string, cep: string, city: string, state: string, addressDetail: string, peopleId: number) {
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

function checkAddressesEquals(street: string, number: string, neighborhood: string, cep: string, city: string, state: string, addressDetail: string) {
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

function update(addressId: number, street: string, number: string, neighborhood: string, cep: string, city: string, state: string, addressDetail: string, peopleId: number) {
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