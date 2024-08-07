import prisma from "../config/database";

function create(numero: string, tipo_telefone:string, peopleId: number) {
	return prisma.phone.create({
		data: {
			numero,
			tipo_telefone,
			peopleId, 
		},
	});
}

function listOfPhones() {
	return prisma.phone.findMany({});
}

function findPhoneById(phoneId: number) {
	return prisma.phone.findFirst({
		where: {
			id: phoneId
		}
	});
}

function update(phoneId: number, numero: string, tipo_telefone: string, peopleId: number) {
	return prisma.phone.update({
		where: {
			id: phoneId,
		},
		data: {
			numero,
			tipo_telefone,
			peopleId,
		}
	});
}

function deletePhoneById(phoneId: number) {
	return prisma.phone.delete({
		where: {
			id: phoneId,
		},
	});
}

export default { create, listOfPhones, findPhoneById, update, deletePhoneById };