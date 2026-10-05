---
title: Sistema de Gestão de Escalas
description: API REST que substitui planilhas na montagem de escalas de serviço, com regras de rodízio, afastamentos e trocas.
weight: 1
destaque: true
contexto: Projeto de extensão, PUC Minas, 2026
stack: ["C#", ".NET 8", "ASP.NET Core", "EF Core", "PostgreSQL", "Docker", "Linux"]
repo: ""
status: Versão pública com dados fictícios em preparação
imagem: ""
---

## O problema

A escala de serviço de uma empresa parceira era montada em planilhas. A regra de quem trabalha em cada dia dependia de quanto tempo cada pessoa estava sem serviço, de afastamentos, de dias permitidos e de trocas, e tudo isso era conferido à mão.

## O que eu fiz

Fui o responsável pelo desenvolvimento numa equipe de seis pessoas, dos requisitos aos testes.

- **Requisitos**: entrevista com o usuário do processo e análise das planilhas da operação.
- **API REST** em C# com .NET 8 e ASP.NET Core, documentada com Swagger.
- **Banco PostgreSQL** modelado com Entity Framework Core, com migrations, chaves estrangeiras e índices únicos.
- **Regras de negócio**: lista de prioridade com contagem separada para dias úteis e fins de semana, bloqueio de serviços em dias seguidos, afastamentos, dias permitidos por pessoa e trocas com histórico.
- **Interface web** com 5 telas em HTML, CSS e JavaScript, com proteção contra XSS.
- **Ambiente**: servidor Linux acessado por SSH, PostgreSQL em Docker Compose e credenciais fora do repositório.
- **Testes**: gerador de dados fictícios que simulou mais de 260 serviços e roteiro com 34 casos de teste. O defeito encontrado foi corrigido e retestado.
- **Documentação**: registro de mais de 50 decisões técnicas.

## Situação

O MVP está pronto e em validação com o usuário. Uma versão pública, com nomes e dados fictícios, está em preparação.
