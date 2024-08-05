import prisma from "../config/database";

function create(numero: string, tipoTelefone:string, peopleId: number) {
	return prisma.phone.create({
		data: {
			numero,
			tipo_telefone: tipoTelefone,
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

export default { create, listOfPhones, findPhoneById };