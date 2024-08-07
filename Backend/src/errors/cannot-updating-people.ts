import { ApplicationError } from "utils/protocols";

export function CannotUpdatingPeople(): ApplicationError {
	return {
		name: 'CannotUpdatingPeople',
		message: 'Unable to update person, cpf/cnpj already exists!',
	};
}