import request from "supertest";

const mockPrisma = {
	people: {
		create: jest.fn(),
		findMany: jest.fn(),
		findFirst: jest.fn(),
		findUnique: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
};

jest.mock("../src/config/database", () => ({ __esModule: true, default: mockPrisma }));

import app from "../src/app";

const pessoa = {
	id: 1,
	nome: "Maria",
	cpf_cnpj: "12345678901",
	dtnascimento: "2000-01-01T00:00:00.000Z",
	email: "maria@exemplo.com",
	pessoa_juridica: false,
	ativo: true,
	Phone: [],
	Address: [],
};

const body = {
	name: "Maria",
	cpfCnpj: "12345678901",
	dtNascimento: "2000-01-01",
	email: "maria@exemplo.com",
	pessoaJuridica: false,
};

beforeEach(() => jest.resetAllMocks());

describe("GET /people", () => {
	it("lista as pessoas cadastradas", async () => {
		mockPrisma.people.findMany.mockResolvedValue([pessoa]);
		const res = await request(app).get("/people");
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
	});
});

describe("GET /people/:id", () => {
	it("retorna 200 quando a pessoa existe", async () => {
		mockPrisma.people.findFirst.mockResolvedValue(pessoa);
		const res = await request(app).get("/people/1");
		expect(res.status).toBe(200);
		expect(res.body.nome).toBe("Maria");
	});

	it("retorna 404 quando a pessoa não existe", async () => {
		mockPrisma.people.findFirst.mockResolvedValue(null);
		const res = await request(app).get("/people/99");
		expect(res.status).toBe(404);
	});
});

describe("POST /people", () => {
	it("cria uma pessoa e retorna 201", async () => {
		mockPrisma.people.findUnique.mockResolvedValue(null);
		mockPrisma.people.create.mockResolvedValue(pessoa);
		const res = await request(app).post("/people").send(body);
		expect(res.status).toBe(201);
		expect(mockPrisma.people.create).toHaveBeenCalledTimes(1);
	});

	it("retorna 409 quando o CPF já está cadastrado", async () => {
		mockPrisma.people.findUnique.mockResolvedValue(pessoa);
		const res = await request(app).post("/people").send(body);
		expect(res.status).toBe(409);
		expect(mockPrisma.people.create).not.toHaveBeenCalled();
	});
});

describe("PUT /people/:id", () => {
	it("atualiza a pessoa e retorna 200", async () => {
		mockPrisma.people.findFirst.mockResolvedValue(pessoa);
		mockPrisma.people.update.mockResolvedValue({ ...pessoa, nome: "Maria Silva" });
		const res = await request(app).put("/people/1").send({ ...body, name: "Maria Silva", ativo: true });
		expect(res.status).toBe(200);
		expect(res.body.nome).toBe("Maria Silva");
	});

	it("retorna 404 quando a pessoa não existe", async () => {
		mockPrisma.people.findFirst.mockResolvedValue(null);
		const res = await request(app).put("/people/99").send({ ...body, ativo: true });
		expect(res.status).toBe(404);
	});

	it("retorna 404 quando um telefone vem sem id", async () => {
		mockPrisma.people.findFirst.mockResolvedValue(pessoa);
		const res = await request(app)
			.put("/people/1")
			.send({ ...body, ativo: true, phones: [{ numero: "62999999999", tipo_telefone: "celular" }] });
		expect(res.status).toBe(404);
	});
});

describe("DELETE /people/:id", () => {
	it("remove a pessoa e retorna 204", async () => {
		mockPrisma.people.findFirst.mockResolvedValue(pessoa);
		mockPrisma.people.delete.mockResolvedValue(pessoa);
		const res = await request(app).delete("/people/1");
		expect(res.status).toBe(204);
	});

	it("retorna 404 quando a pessoa não existe", async () => {
		mockPrisma.people.findFirst.mockResolvedValue(null);
		const res = await request(app).delete("/people/99");
		expect(res.status).toBe(404);
	});
});
