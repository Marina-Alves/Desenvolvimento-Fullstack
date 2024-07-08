import { ApplicationError } from "utils/protocols";

export function CannotCreatingPeople(): ApplicationError {
	return {
		name: 'CannotCreatingPeople',
		message: 'Unable to create person, cpf/cnpj already exists!',
	};
}