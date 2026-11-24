import axios from "axios";
import * as api from "./api";

jest.mock("axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
}));

beforeEach(() => jest.resetAllMocks());

test("listPessoas faz GET em /people", () => {
  api.listPessoas();
  expect(axios.get).toHaveBeenCalledWith(`${api.BASE_URL}/people`);
});

test("getPessoa faz GET em /people/:id", () => {
  api.getPessoa(7);
  expect(axios.get).toHaveBeenCalledWith(`${api.BASE_URL}/people/7`);
});

test("createPessoa faz POST com o corpo informado", () => {
  api.createPessoa({ name: "Maria" });
  expect(axios.post).toHaveBeenCalledWith(`${api.BASE_URL}/people`, { name: "Maria" });
});

test("updatePessoa faz PUT em /people/:id", () => {
  api.updatePessoa(3, { name: "Maria" });
  expect(axios.put).toHaveBeenCalledWith(`${api.BASE_URL}/people/3`, { name: "Maria" });
});

test("deletePessoa e deleteTelefone fazem DELETE nos caminhos corretos", () => {
  api.deletePessoa(3);
  api.deleteTelefone(9);
  expect(axios.delete).toHaveBeenCalledWith(`${api.BASE_URL}/people/3`);
  expect(axios.delete).toHaveBeenCalledWith(`${api.BASE_URL}/phone/9`);
});
