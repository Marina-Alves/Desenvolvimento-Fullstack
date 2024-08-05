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
	return prisma.people.findMany({
		include: {
			Phone: true,
			Address: true
		}
	});
}

function findPeopleById(peopleId: number) {
	return prisma.people.findFirst({
		where: {
			id: peopleId
		},
		include: {
			Phone: true,
			Address: true
		}
	});
}

function getPeopleByCpfCnpj(cpfCnpj: string) {
	return prisma.people.findUnique({
		where: { 
			cpf_cnpj: cpfCnpj
		}
	});
}

function updatePeople(peopleId: number, name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean, ativo: boolean, phones?: Phone[], addresses?: Address[]) {
	let data: any = {
		nome: name,
		cpf_cnpj: cpfCnpj,
		email,
		pessoa_juridica: pessoaJuridicacode,
		ativo
	};

	if (dtNascimento) {
		data.dtnascimento = new Date(dtNascimento);
	}

	if (phones) {
		data.Phone = {
		  upsert: phones.map(phone => ({
			where: {
				id: phone.id
			},
			update: {
			  numero: phone.numero,
			  tipo_telefone: phone.tipo_telefone,
			},
			create: {
			  numero: phone.numero,
			  tipo_telefone: phone.tipo_telefone,
			},
		  })),
		};
	}

	if (addresses) {
		data.Address = {
		  upsert: addresses.map(address => ({
			where: { 
				id: address.id
			},
			update: {
			  street: address.street,
			  number: address.number,
			  neighborhood: address.neighborhood,
			  cep: address.cep,
			  city: address.city,
			  state: address.state,
			  addressDetail: address.addressDetail,
			},
			create: {
			  street: address.street,
			  number: address.number,
			  neighborhood: address.neighborhood,
			  cep: address.cep,
			  city: address.city,
			  state: address.state,
			  addressDetail: address.addressDetail,
			},
		  })),
		};
	}

	return prisma.people.update({
		where: {
			id: peopleId,
		},
		data,
		include: {
			Phone: true,
			Address: true
		}
	});
}

function deletePeople(peopleId: number) {
	return prisma.people.delete({
		where: {
			id: peopleId
		},
		include: {
			Phone: true,
			Address: true
		}
	})
}

export default { createPeople, findPeople, findPeopleById, getPeopleByCpfCnpj, updatePeople, deletePeople };