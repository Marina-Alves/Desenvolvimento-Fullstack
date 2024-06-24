import prisma from "../config/database";

function createPeople(name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean) {
    return prisma.people.create({
      data: {
			nome: name, 
			cpf_cnpj: cpfCnpj, 
			dtnascimento: new Date(dtNascimento), 
			email, 
			pessoa_juridica: pessoaJuridicacode,
			ativo: true
		}
    });
}

function findPeople() {
	return prisma.people.findMany();
}

export default { createPeople, findPeople };