// Funções puras que convertem entre o estado do formulário e o formato da API.

export const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const MIN_TELEFONES = 5;

export function telefoneVazio() {
  return { id: 0, numero: "", tipo_telefone: "" };
}

export function telefonesVazios(quantidade = MIN_TELEFONES) {
  return Array.from({ length: quantidade }, telefoneVazio);
}

export function novoFormulario() {
  return {
    id: 0,
    idAdress: 0,
    nome: "",
    cpf: "",
    email: "",
    startDate: "",
    cep: "",
    logradouro: "",
    houseNumber: "",
    complemento: "",
    setor: "",
    cidade: "",
    selectedUF: "AC",
    telefones: telefonesVazios(),
  };
}

const telefonePreenchido = (t) => t.numero !== "" && t.tipo_telefone !== "";

export const telefonesPreenchidos = (telefones) => telefones.filter(telefonePreenchido);

export const telefonesParaExcluir = (telefones) =>
  telefones.filter((t) => t.id !== 0 && !telefonePreenchido(t));

const apenasData = (valor) => new Date(valor).toISOString().split("T")[0];

function montarEndereco(form) {
  return {
    cep: form.cep,
    street: form.logradouro,
    number: form.houseNumber,
    neighborhood: form.setor,
    city: form.cidade,
    state: form.selectedUF,
    addressDetail: form.complemento,
  };
}

function montarPayloadBase(form, phones, addresses) {
  return {
    name: form.nome,
    cpfCnpj: form.cpf.replace(/[.-]/g, ""),
    email: form.email,
    dtNascimento: apenasData(form.startDate),
    pessoaJuridica: false,
    phones,
    addresses,
  };
}

export function montarPayloadCriacao(form) {
  const phones = telefonesPreenchidos(form.telefones).map((t) => {
    const { id, ...semId } = t;
    return id === 0 ? semId : t;
  });
  return montarPayloadBase(form, phones, [montarEndereco(form)]);
}

export function montarPayloadAtualizacao(form) {
  const preenchidos = telefonesPreenchidos(form.telefones);
  const phones = preenchidos.length === 0 ? null : preenchidos;
  const addresses = [{ ...montarEndereco(form), id: form.idAdress }];
  return montarPayloadBase(form, phones, addresses);
}

export function formularioDaPessoa(pessoa) {
  const telefones = pessoa.Phone;
  const quantidade = Math.max(MIN_TELEFONES, telefones.length);
  const endereco = pessoa.Address[0];

  return {
    id: Number(pessoa.id),
    idAdress: endereco?.id,
    nome: pessoa.nome,
    cpf: pessoa.cpf_cnpj,
    email: pessoa.email,
    startDate: apenasData(pessoa.dtnascimento),
    cep: endereco?.cep,
    logradouro: endereco?.street,
    houseNumber: endereco?.number,
    complemento: endereco?.addressDetail,
    setor: endereco?.neighborhood,
    cidade: endereco?.city,
    selectedUF: endereco?.state,
    telefones: Array.from({ length: quantidade }, (_, i) => ({
      id: telefones[i]?.id ?? 0,
      idPessoa: telefones[i]?.peopleId ?? "",
      numero: telefones[i]?.numero ?? "",
      tipo_telefone: telefones[i]?.tipo_telefone ?? "",
    })),
  };
}
