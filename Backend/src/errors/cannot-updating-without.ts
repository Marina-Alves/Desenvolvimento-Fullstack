import { ApplicationError, WithoutAddressId, WithoutPhoneId } from "../utils/protocols";

export function CannotUpdatingWithout(type: number): ApplicationError {
	if (type === WithoutPhoneId) {
		return {
			name: 'CannotUpdatingWithoutPhoneId',
			message: 'Unable to update person, the phone ID was not provided!',
		};
	} else if (type === WithoutAddressId) {
		return {
			name: 'CannotUpdatingWithoutAddressId',
			message: 'Unable to update person, the address ID was not provided!',
		};
	}
}