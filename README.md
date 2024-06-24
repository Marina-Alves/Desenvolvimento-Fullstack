# Desenvolvimento-Fullstack

Trabalho para a Disciplina de Desenvolvimento Full Stack. 

- O projeto foi desenvolvido com Node.js e TypeScript para o back-end com banco relacional PostgreSQL 

Professores:
```
- Sofia Larissa da Costa Paiva
- Hugo Marciano de Melo
```

Alunos:
```
- André Ribeiro Rafael
- Marina Pereira Alves
- Matheus Naves Amorim
- Matheus Lima Oliveira e Souza
```

## Como rodar o projeto
1. Clone o repositório
2. Instale todas as dependências

```bash
npm i
```
3. Configure o arquivo `.env` usando o arquivo de exemplo `.env.example`
4. Rodar o comando para criar o banco de dados e todas suas tabelas

```bash
npx prisma db push
```

5. Subir o back-end com o comando:
   
```bash
npx nodemon .\src\app.ts
```
