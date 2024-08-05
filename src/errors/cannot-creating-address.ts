import { ApplicationError } from "utils/protocols";

export function CannotCreatingAddress(): ApplicationError {
	return {
		name: 'CannotCreatingAddress',
		message: 'Unable to create address, already exists another address with this data!',
	};
}