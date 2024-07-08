import { Address, Phone } from "@prisma/client";
import prisma from "../config/database";

function createPeople(name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean, phones: Phone[], addresses: Address[]) {
	let data: any = {
		nome: name,
		cpf_cnpj: cpfCnpj,
		dtnascimento: new Date(dtNascimento),
		email,
		pessoa_juridica: pessoaJuridicacode,
		ativo: true
	};

	if (phones) {
		data.Phone = {
			createMany: {
				data: phones
			}
		};
	}

	if (addresses) {
		data.Address = {
			createMany: {
				data: addresses
			}
		};
	}

	return prisma.people.create({
		data,
		include: {
			Phone: true,
			Address: true
		}
    });
}

function findPeople() {
	return prisma.people.findMany();
}

async function findPeopleById(peopleId: number) {
	return prisma.people.findFirst({
		where: {
			id: peopleId
		}
	});
  }

export default { createPeople, findPeople, findPeopleById };