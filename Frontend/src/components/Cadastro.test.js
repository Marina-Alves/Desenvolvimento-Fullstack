import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

const pessoa = {
  id: 1,
  nome: "Maria",
  cpf_cnpj: "12345678901",
  email: "maria@exemplo.com",
  dtnascimento: "2000-01-31T00:00:00.000Z",
  Phone: [{ id: 9, peopleId: 1, numero: "(62) 99999-9999", tipo_telefone: "celular" }],
  Address: [{ id: 2, cep: "74000-000", street: "Rua A", number: "10", neighborhood: "Centro", city: "Goiânia", state: "GO", addressDetail: "Casa" }],
};

function preencherFormulario(container) {
  const campo = (nome, valor) => fireEvent.change(container.querySelector(`[name="${nome}"]`), { target: { value: valor } });
  campo("nome", "Maria");
  campo("cpf", "123.456.789-01");
  campo("email", "maria@exemplo.com");
  campo("date", "2000-01-31");
  campo("cep", "74000-000");
  campo("logradouro", "Rua A");
  campo("houseNumber", "10");
  campo("complemento", "Casa");
  campo("setor", "Centro");
  campo("cidade", "Goiânia");
}

describe("envio do formulário", () => {
  let alertSpy;
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
    alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  });
  afterEach(() => alertSpy.mockRestore());

  test("aguarda a exclusão dos telefones esvaziados antes de atualizar a pessoa", async () => {
    const ordem = [];
    axios.get.mockImplementation((url) => Promise.resolve({ data: url.endsWith("/people") ? [pessoa] : pessoa }));
    axios.delete.mockImplementation(() => new Promise((resolve) => setTimeout(() => { ordem.push("delete"); resolve({}); }, 30)));
    axios.put.mockImplementation(() => { ordem.push("put"); return Promise.resolve({ data: pessoa }); });

    const { container } = render(<Cadastro />);
    await waitFor(() => expect(screen.getByText("Maria")).toBeInTheDocument());
    fireEvent.click(container.querySelector("tbody button"));
    await waitFor(() => expect(container.querySelector('[name="nome"]').value).toBe("Maria"));

    fireEvent.change(container.querySelector('[name="tipo_telefone"]'), { target: { value: "" } });
    fireEvent.submit(container.querySelector("form"));

    await waitFor(() => expect(axios.put).toHaveBeenCalled());
    expect(ordem).toEqual(["delete", "put"]);
  });

  test("mostra aviso de CPF duplicado quando a API responde 409", async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockRejectedValue({ response: { status: 409 } });
    const { container } = render(<Cadastro />);
    preencherFormulario(container);
    fireEvent.submit(container.querySelector("form"));
    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith("CPF já cadastrado por favor informe um novo CPF"));
  });

  test("mostra mensagem genérica (e não a de CPF) para outros erros", async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockRejectedValue({ response: { status: 500 } });
    const { container } = render(<Cadastro />);
    preencherFormulario(container);
    fireEvent.submit(container.querySelector("form"));
    await waitFor(() => expect(alertSpy).toHaveBeenCalledTimes(1));
    expect(alertSpy.mock.calls[0][0]).not.toMatch(/CPF/);
  });

  test("o botão Deletar não envia o formulário", () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<Cadastro />);
    expect(screen.getByText("Deletar")).toHaveAttribute("type", "button");
  });
});
