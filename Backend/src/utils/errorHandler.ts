import { Request, Response } from "express";
import httpStatus from "http-status";

// Status HTTP de cada erro de aplicação. Qualquer outro erro vira 400.
const STATUS_BY_ERROR: Record<string, number> = {
	NotFoundError: httpStatus.NOT_FOUND,
	CannotCreatingPeople: httpStatus.CONFLICT,
	CannotUpdatingPeople: httpStatus.CONFLICT,
	CannotCreatingAddress: httpStatus.CONFLICT,
	// Mantém o comportamento atual da API (404), embora 409 fosse mais coerente com os demais conflitos.
	CannotUpdatingAddress: httpStatus.NOT_FOUND,
	CannotUpdatingWithoutPhoneId: httpStatus.NOT_FOUND,
	CannotUpdatingWithoutAddressId: httpStatus.NOT_FOUND,
};

export function sendError(res: Response, error: { name?: string; message?: string }) {
	const status = STATUS_BY_ERROR[error?.name];
	if (status) {
		return res.status(status).send(error.message);
	}
	return res.sendStatus(httpStatus.BAD_REQUEST);
}

type Handler = (req: Request, res: Response) => Promise<Response>;

export function withErrorHandling(handler: Handler): Handler {
	return async (req, res) => {
		try {
			return await handler(req, res);
		} catch (error) {
			return sendError(res, error);
		}
	};
}
