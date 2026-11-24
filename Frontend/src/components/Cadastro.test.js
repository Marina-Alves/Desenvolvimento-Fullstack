import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Cadastro from "./Cadastro";

jest.mock("axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
}));

beforeEach(() => {
  axios.get.mockReset();
});

test("mostra mensagem quando não há pessoas cadastradas", async () => {
  axios.get.mockResolvedValue({ data: [] });
  render(<Cadastro />);
  expect(screen.getByText("Cadastro de pessoa")).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText("Não há dados cadastrados")).toBeInTheDocument());
});

test("lista as pessoas retornadas pela API", async () => {
  axios.get.mockResolvedValue({
    data: [{ id: 1, nome: "Maria", cpf_cnpj: "12345678901", email: "maria@exemplo.com", Phone: [] }],
  });
  render(<Cadastro />);
  await waitFor(() => expect(screen.getByText("Maria")).toBeInTheDocument());
  expect(screen.getByText("maria@exemplo.com")).toBeInTheDocument();
});
