import { Address, Phone } from "@prisma/client";

export type PeopleInput = {
	name: string,
	cpfCnpj: string,
	dtNascimento: string,
	email: string,
	pessoaJuridica: boolean,
	phones?: Phone[],
	addresses?: Address[]
}

export type PeopleUpdateInput = PeopleInput & {
	ativo: boolean
}

export type AddressInput = {
	street: string,
	number: string,
	neighborhood: string,
	cep: string,
	city: string,
	state: string,
	addressDetail: string
}

export type PeopleType = {
	id: number,
	nome: string,
	cpf_cnpj: string,
	dtnascimento: Date,
	email: string,
	pessoa_juridica: boolean,
	ativo: boolean,
	createdAt: Date,
	updatedAt: Date
}

export type PhoneType = {
	id: number,
	numero: string,
	tipo_telefone: string,
	peopleId: number,
	createdAt: Date,
	updatedAt: Date
}

export type AddressType = {
	id: number,
	street: string, 
	number: string, 
	neighborhood: string, 
	cep: string, 
	city: string, 
	state: string, 
	addressDetail: string, 
	peopleId: number,
	createdAt: Date,
	updatedAt: Date
}

export type ApplicationError = {
	name: string;
	message: string;
};

export const WithoutPhoneId = 1;

export const WithoutAddressId = 2;