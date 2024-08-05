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

export type ApplicationError = {
	name: string;
	message: string;
};

export const WithoutPhoneId = 1;

export const WithoutAddressId = 2;