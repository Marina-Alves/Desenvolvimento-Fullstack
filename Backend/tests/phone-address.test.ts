import request from "supertest";

const mockPrisma = {
	people: { findFirst: jest.fn() },
	phone: {
		create: jest.fn(),
		findMany: jest.fn(),
		findFirst: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
	address: {
		create: jest.fn(),
		findMany: jest.fn(),
		findFirst: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
};

jest.mock("../src/config/database", () => ({ __esModule: true, default: mockPrisma }));

import app from "../src/app";

beforeEach(() => jest.resetAllMocks());

describe("phones", () => {
	it("GET /phone lista telefones", async () => {
		mockPrisma.phone.findMany.mockResolvedValue([{ id: 1, numero: "62999999999", tipo_telefone: "celular", peopleId: 1 }]);
		const res = await request(app).get("/phone");
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
	});

	it("GET /phone/:id retorna 404 quando não existe", async () => {
		mockPrisma.phone.findFirst.mockResolvedValue(null);
		const res = await request(app).get("/phone/99");
		expect(res.status).toBe(404);
	});
});

describe("addresses", () => {
	it("GET /address lista endereços", async () => {
		mockPrisma.address.findMany.mockResolvedValue([{ id: 1, street: "Rua A", peopleId: 1 }]);
		const res = await request(app).get("/address");
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
	});

	const endereco = { street: "Rua A", number: "10", neighborhood: "Centro", cep: "74000000", city: "Goiânia", state: "GO", addressDetail: "Casa", peopleId: 1 };

	it("POST /address cria o endereço e retorna 201", async () => {
		mockPrisma.people.findFirst.mockResolvedValue({ id: 1 });
		mockPrisma.address.findFirst.mockResolvedValue(null);
		mockPrisma.address.create.mockResolvedValue({ id: 1, ...endereco });
		const res = await request(app).post("/address").send(endereco);
		expect(res.status).toBe(201);
		expect(mockPrisma.address.create).toHaveBeenCalledWith({ data: endereco });
	});

	it("POST /address retorna 409 quando o endereço já existe", async () => {
		mockPrisma.people.findFirst.mockResolvedValue({ id: 1 });
		mockPrisma.address.findFirst.mockResolvedValue({ id: 5, ...endereco });
		const res = await request(app).post("/address").send(endereco);
		expect(res.status).toBe(409);
		expect(mockPrisma.address.create).not.toHaveBeenCalled();
	});

	it("PUT /address/:id atualiza o endereço e retorna 200", async () => {
		mockPrisma.people.findFirst.mockResolvedValue({ id: 1 });
		mockPrisma.address.findFirst.mockResolvedValueOnce({ id: 1, ...endereco }).mockResolvedValueOnce(null);
		mockPrisma.address.update.mockResolvedValue({ id: 1, ...endereco, city: "Anápolis" });
		const res = await request(app).put("/address/1").send({ ...endereco, city: "Anápolis" });
		expect(res.status).toBe(200);
		expect(mockPrisma.address.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { ...endereco, city: "Anápolis" } });
	});

	it("PUT /address/:id com endereço já existente retorna 404 (comportamento atual preservado)", async () => {
		mockPrisma.people.findFirst.mockResolvedValue({ id: 1 });
		mockPrisma.address.findFirst.mockResolvedValue({ id: 1, ...endereco });
		const res = await request(app).put("/address/1").send(endereco);
		expect(res.status).toBe(404);
		expect(mockPrisma.address.update).not.toHaveBeenCalled();
	});

	it("GET /address/:id retorna 404 quando não existe", async () => {
		mockPrisma.address.findFirst.mockResolvedValue(null);
		const res = await request(app).get("/address/99");
		expect(res.status).toBe(404);
	});
});
