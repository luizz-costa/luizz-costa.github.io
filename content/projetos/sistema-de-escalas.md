---
title: "Rodizio: gestão de escalas de serviço"
description: API REST que substitui planilhas na montagem de escalas de serviço, com lista de prioridade automática, impedimentos e trocas.
weight: 1
destaque: true
contexto: Projeto de extensão, PUC Minas, 2026
stack: ["C#", ".NET 8", "ASP.NET Core", "EF Core", "PostgreSQL", "Docker", "Linux"]
repo: https://github.com/luizz-costa/rodizio-escalas
status: ""
imagem: /img/projetos/rodizio-card.png
---

## O problema

A escala de serviço de uma equipe de segurança patrimonial era montada em planilhas. Quem trabalha em cada dia dependia de quanto tempo cada pessoa estava sem serviço, de impedimentos, de dias permitidos e de trocas, e tudo isso era conferido à mão.

## O que eu fiz

Desenvolvi o sistema sozinho, numa equipe de 6, num projeto de extensão da PUC Minas com uma empresa parceira, dos requisitos aos testes.

- **Requisitos**: entrevista com o usuário do processo e análise das planilhas da operação.
- **API REST** em C# com .NET 8 e ASP.NET Core, documentada com Swagger.
- **Banco PostgreSQL** modelado com Entity Framework Core (code-first), com migrations aplicadas ao iniciar, chaves estrangeiras e índices únicos.
- **Interface web** com 5 telas em HTML, CSS e JavaScript puro, servidas pela própria API, com proteção contra XSS.
- **Testes**: gerador de dados de demonstração que preenche a escala desde uma data inicial até o dia atual, e roteiro com 34 casos de teste. O defeito encontrado foi corrigido e retestado.
- **Documentação**: 74 decisões técnicas registradas, com data e motivo.

## Como funciona a lista de prioridade

Para cada escala e cada data, o sistema calcula quem deve cumprir o próximo serviço:

1. **Duas filas separadas.** Dias úteis formam uma fila; fins de semana e feriados formam outra, e cada uma tem sua própria contagem. Assim, quem cumpriu um domingo não perde a vez nos dias úteis, e o contrário também. A regra de descanso continua valendo entre as duas: ninguém cumpre serviço em dias seguidos.
2. **Quem está há mais tempo sem serviço vem primeiro**, contando só os dias da mesma fila.
3. **Empate se resolve pela antiguidade**: o número menor vem antes.
4. **Algumas pessoas ficam fora da lista naquela data**, cada uma com o motivo na tela:
   - cumpriu serviço no dia anterior, ou já tem serviço no dia seguinte (descanso mínimo);
   - está impedida, por atestado ou viagem a serviço, por exemplo;
   - aquele dia da semana não é permitido para ela;
   - já foi escalada nessa data.
5. **Trocas e cancelamentos não apagam registros**: a troca guarda quem estava escalado antes, e o histórico continua valendo para as próximas contagens.

No exemplo abaixo, na Escala F: o Func. 047 está há 3 dias úteis sem serviço e fica em primeiro. Os Func. 041, 044 e 048 estão empatados com 2 dias e são ordenados pela antiguidade. O Func. 042 cumpriu serviço no dia anterior, o Func. 051 tem serviço no dia seguinte e o Func. 043 está em viagem a serviço; os três ficam fora da lista.

![Tela Montar escala, com a lista de prioridade e os escalados do dia](/img/projetos/rodizio-montar-escala.png)

A escala do dia resume quem está de serviço e quem está impedido em cada escala.

![Tela Escala do dia, com o resumo de cada escala](/img/projetos/rodizio-escala-do-dia.png)

## Destaques técnicos

- Tudo sobe com um comando, com Docker Compose: API, banco do sistema e Data Warehouse, criado automaticamente na primeira subida.
- Dockerfile multi-stage, com a API rodando com usuário sem privilégios.
- Healthcheck no banco: a API só sobe quando ele está pronto, e as migrations são aplicadas ao iniciar.
- Portas presas em `127.0.0.1` e configuráveis pelo `.env`; credenciais fora do repositório.
- O sistema inteiro usa menos de 100 MB de memória rodando no meu servidor Linux.
- Modelo dimensional de Data Warehouse em esquema estrela, com 2 tabelas fato e 5 dimensões, grão mensal, para indicadores de absenteísmo e efetivo, e metadados documentados no próprio banco com `COMMENT ON`.

## Código

A versão pública usa uma organização fictícia e só dados fictícios: [github.com/luizz-costa/rodizio-escalas](https://github.com/luizz-costa/rodizio-escalas).

O sistema original continua em validação com o usuário na empresa parceira.