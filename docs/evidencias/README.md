# Evidências da análise estática

Baseline medido na tag `1.0.0` (commit `b2a08c1`) com a configuração versionada neste repositório
(`.eslintrc.json` e `.jscpd.json`), via `npm run lint:report` e `npm run dup`.

| Métrica | Baseline (1.0.0) |
|---|---|
| Alertas ESLint (regras do `.eslintrc.json`) | **148** |
| `prefer-const` / `no-mixed-spaces-and-tabs` | 60 / 59 |
| `sonarjs/prefer-immediate-return` / `max-params` | 12 / 11 |
| `sonarjs/no-duplicate-string` | 3 |
| `max-lines-per-function` / `max-lines` / variável não usada | 1 / 1 / 1 |
| Clones (jscpd, mín. 5 linhas e 40 tokens) | 15 |
| Linhas duplicadas | 133 de 1571 (**8,47%**; 10,13% por tokens) |

Arquivos: `baseline-eslint.json` e `baseline-jscpd.json`.
Os testes (`*.test.js`) ficam fora da medição para que antes e depois sejam comparáveis.
