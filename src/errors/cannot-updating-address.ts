import { ApplicationError } from "utils/protocols";

export function CannotUpdatingAddress(): ApplicationError {
	return {
		name: 'CannotUpdatingAddress',
		message: 'Unable to update address, already exists another address with this data!',
	};
}