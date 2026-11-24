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

	it("GET /address/:id retorna 404 quando não existe", async () => {
		mockPrisma.address.findFirst.mockResolvedValue(null);
		const res = await request(app).get("/address/99");
		expect(res.status).toBe(404);
	});
});
