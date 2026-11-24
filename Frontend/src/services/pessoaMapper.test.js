import {
  novoFormulario,
  telefonesVazios,
  telefonesPreenchidos,
  telefonesParaExcluir,
  montarPayloadCriacao,
  montarPayloadAtualizacao,
  formularioDaPessoa,
} from "./pessoaMapper";

const preenchido = () => ({
  ...novoFormulario(),
  nome: "Maria",
  cpf: "123.456.789-01",
  email: "maria@exemplo.com",
  startDate: "2000-01-31",
  cep: "74000-000",
  logradouro: "Rua A",
  houseNumber: "10",
  complemento: "Casa",
  setor: "Centro",
  cidade: "Goiânia",
  selectedUF: "GO",
});

test("novoFormulario começa vazio com 5 telefones e UF AC", () => {
  const f = novoFormulario();
  expect(f.id).toBe(0);
  expect(f.selectedUF).toBe("AC");
  expect(f.telefones).toHaveLength(5);
  expect(telefonesVazios(2)).toHaveLength(2);
});

test("telefonesPreenchidos e telefonesParaExcluir", () => {
  const tels = [
    { id: 0, numero: "1", tipo_telefone: "a" },
    { id: 5, numero: "", tipo_telefone: "b" },
    { id: 0, numero: "", tipo_telefone: "" },
  ];
  expect(telefonesPreenchidos(tels)).toHaveLength(1);
  expect(telefonesParaExcluir(tels)).toEqual([tels[1]]);
});

test("montarPayloadCriacao limpa o CPF, remove id 0 e monta o endereço", () => {
  const f = preenchido();
  f.telefones[0] = { id: 0, numero: "(62) 99999-9999", tipo_telefone: "celular" };
  const p = montarPayloadCriacao(f);
  expect(p.cpfCnpj).toBe("12345678901");
  expect(p.dtNascimento).toBe("2000-01-31");
  expect(p.pessoaJuridica).toBe(false);
  expect(p.phones).toEqual([{ numero: "(62) 99999-9999", tipo_telefone: "celular" }]);
  expect(p.addresses).toEqual([
    { cep: "74000-000", street: "Rua A", number: "10", neighborhood: "Centro", city: "Goiânia", state: "GO", addressDetail: "Casa" },
  ]);
});

test("montarPayloadAtualizacao envia phones null sem telefones e inclui o id do endereço", () => {
  const f = { ...preenchido(), id: 3, idAdress: 8 };
  const p = montarPayloadAtualizacao(f);
  expect(p.phones).toBeNull();
  expect(p.addresses[0].id).toBe(8);
});

test("formularioDaPessoa converte a resposta da API e completa até 5 telefones", () => {
  const pessoa = {
    id: "4",
    nome: "Maria",
    cpf_cnpj: "12345678901",
    email: "m@e.com",
    dtnascimento: "2000-01-31T00:00:00.000Z",
    Phone: [{ id: 9, peopleId: 4, numero: "1", tipo_telefone: "a" }],
    Address: [{ id: 2, cep: "1", street: "R", number: "2", neighborhood: "S", city: "C", state: "GO", addressDetail: "D" }],
  };
  const f = formularioDaPessoa(pessoa);
  expect(f.id).toBe(4);
  expect(f.startDate).toBe("2000-01-31");
  expect(f.idAdress).toBe(2);
  expect(f.telefones).toHaveLength(5);
  expect(f.telefones[0]).toMatchObject({ id: 9, numero: "1" });
  expect(f.telefones[1]).toMatchObject({ id: 0, numero: "" });
});
