import { Request, Response } from "express";
import { withErrorHandling } from "../src/utils/errorHandler";

function fakeRes() {
	const res: any = {};
	res.status = jest.fn().mockReturnValue(res);
	res.send = jest.fn().mockReturnValue(res);
	res.sendStatus = jest.fn().mockReturnValue(res);
	return res as Response & { status: jest.Mock; send: jest.Mock; sendStatus: jest.Mock };
}

const run = (error: unknown) => {
	const res = fakeRes();
	return withErrorHandling(async () => { throw error; })({} as Request, res).then(() => res);
};

describe("withErrorHandling", () => {
	it("devolve o retorno do handler quando não há erro", async () => {
		const res = fakeRes();
		const out = await withErrorHandling(async () => res.sendStatus(204))({} as Request, res);
		expect(out).toBe(res);
		expect(res.sendStatus).toHaveBeenCalledWith(204);
	});

	it.each([
		["NotFoundError", 404],
		["CannotCreatingPeople", 409],
		["CannotUpdatingPeople", 409],
		["CannotCreatingAddress", 409],
		["CannotUpdatingAddress", 404],
		["CannotUpdatingWithoutPhoneId", 404],
		["CannotUpdatingWithoutAddressId", 404],
	])("mapeia %s para %i com a mensagem do erro", async (name, status) => {
		const res = await run({ name, message: "msg" });
		expect(res.status).toHaveBeenCalledWith(status);
		expect(res.send).toHaveBeenCalledWith("msg");
	});

	it("retorna 400 para erros desconhecidos", async () => {
		const res = await run(new Error("boom"));
		expect(res.sendStatus).toHaveBeenCalledWith(400);
	});

	it("retorna 400 quando o erro lançado é undefined", async () => {
		const res = await run(undefined);
		expect(res.sendStatus).toHaveBeenCalledWith(400);
	});
});
