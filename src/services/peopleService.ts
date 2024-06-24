import { People } from "@prisma/client";

async function createPeople(name: string, cpfCnpj: string, dtNascimento: string, email: string, pessoaJuridicacode: boolean) {

}

async function getPeople() {
	return;
}

export default { createPeople, getPeople };