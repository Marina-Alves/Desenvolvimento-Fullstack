# Leitura de código e dívida técnica (Etapa 2)

**Técnica:** inspeção de código com checklist (leitura individual seguida de consolidação).
**Escopo:** fluxo crítico de cadastro de pessoas, do formulário ao banco:
`Frontend/src/components/Cadastro.js` → `Backend/src/controllers/peopleController.ts` →
`services/peopleService.ts` → `repositories/peopleRepository.ts` → Prisma/PostgreSQL.
**Versão analisada:** `b2a08c1` (tag `1.0.0`).

## Checklist aplicado
Nomes · tamanho de função · número de parâmetros · duplicação · tratamento de erro · validação de entrada · acoplamento · testabilidade · segurança básica.

## Achados

| # | Local | Achado | Tipo de dívida | Gravidade |
|---|---|---|---|---|
| 1 | `Cadastro.js:286` e `:376` | `handleSubmit` recebe 18 parâmetros e `handleClick` recebe 16, quase todos setters de estado | Código (Long Parameter List) | Alta |
| 2 | `Cadastro.js` (606 linhas) | Um único componente mistura estado, chamadas HTTP e layout | Projeto (God Component) | Alta |
| 3 | `Cadastro.js:60,309,323,346,365,378` | URL `http://${HOST}:${PORT}` repetida em 6 pontos | Código (duplicação) | Média |
| 4 | `Cadastro.js:321-325` | `telefones.map(async ...)` dispara `DELETE` sem `await` nem tratamento de erro; a tela pode atualizar antes de a exclusão terminar | Defeito | Alta |
| 5 | `Cadastro.js:313-314` | Qualquer erro do `POST` exibe "CPF já cadastrado" | Defeito / UX | Média |
| 6 | `Cadastro.js:132` | Botão "Deletar" dentro do `form` sem `type="button"` | Defeito | Média |
| 7 | `Cadastro.js:238` | Fragmento dentro de `map` sem `key` | Código (React) | Baixa |
| 8 | `peopleRepository.ts:5,69` | `let data: any` desativa a checagem de tipos | Código (tipagem) | Média |
| 9 | `peopleRepository.ts:83-120` | Blocos `upsert` de telefones e endereços repetem a mesma estrutura campo a campo | Código (duplicação) | Média |
| 10 | `peopleRepository.ts`, `peopleService.ts`, `addressService.ts` | Funções com 7 a 9 parâmetros posicionais | Código (Long Parameter List) | Média |
| 11 | `controllers/*.ts` | 15 blocos `try/catch` com o mesmo mapeamento de erro para status HTTP | Código (duplicação) | Média |
| 12 | `controllers/*.ts` | Nenhuma validação de entrada: `req.body` é repassado direto ao serviço e qualquer falha vira `400` | Segurança / robustez | Alta |
| 13 | Projeto inteiro | Sem testes automatizados (`npm test` é placeholder) e sem CI | Teste / processo | Alta |
| 14 | `Frontend/package.json` | Nome do pacote `react_php`, que não corresponde ao projeto | Documentação | Baixa |
| 15 | `Backend/package.json` | `prisma`, `@prisma/client` e `ts-node` em `devDependencies` embora sejam necessários em execução | Build / implantação | Média |

## Priorização para as refatorações
1. Achados 1, 2, 3 (PRs R2 e R3).
2. Achados 4, 5, 6 (PR R4).
3. Achados 8, 9, 10 (PRs R5 e R6).
4. Achado 11 (PR R6).
5. Achado 13 (PR do pipeline, etapa 4).
6. Achados 12, 14 e 15 ficam registrados como dívida remanescente, se não houver tempo.
