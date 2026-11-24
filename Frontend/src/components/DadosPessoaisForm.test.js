import { render, screen, fireEvent } from "@testing-library/react";
import DadosPessoaisForm from "./DadosPessoaisForm";

function setup(overrides = {}) {
  const props = {
    nome: "", setNome: jest.fn(),
    cpf: "", setCPF: jest.fn(),
    email: "", setEmail: jest.fn(),
    startDate: "", setStartDate: jest.fn(),
    ...overrides,
  };
  const { container } = render(<DadosPessoaisForm {...props} />);
  return { props, container };
}

test("exibe os campos de dados pessoais", () => {
  setup();
  expect(screen.getByText("Nome:")).toBeInTheDocument();
  expect(screen.getByText("CPF:")).toBeInTheDocument();
  expect(screen.getByText("E-mail:")).toBeInTheDocument();
  expect(screen.getByText("Data de nascimento:")).toBeInTheDocument();
});

test("chama setNome ao digitar o nome", () => {
  const { props, container } = setup();
  fireEvent.change(container.querySelector('input[name="nome"]'), { target: { value: "Maria" } });
  expect(props.setNome).toHaveBeenCalledWith("Maria");
});

test("chama setEmail ao digitar o e-mail", () => {
  const { props, container } = setup();
  fireEvent.change(container.querySelector('input[name="email"]'), { target: { value: "a@b.com" } });
  expect(props.setEmail).toHaveBeenCalledWith("a@b.com");
});
