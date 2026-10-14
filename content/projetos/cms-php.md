---
title: Portfólio dinâmico com painel CMS
description: Meu portfólio anterior, em PHP e MySQL, com painel administrativo para gerenciar todo o conteúdo do site sem editar código.
weight: 2
contexto: Projeto pessoal, 2025
stack: ["PHP 8", "MySQL", "JavaScript", "Tailwind CSS"]
repo: https://github.com/luizz-costa/meu-blog-portfolio
imagem: /img/projetos/cms-painel-lista.png
---

## O problema

Meu primeiro portfólio era um tema estático. Cada projeto novo, experiência ou post exigia abrir o código, editar o HTML e publicar de novo. Eu queria atualizar o site como se usa um sistema: entrar num painel, preencher um formulário e salvar.

## O que eu fiz

Transformei um tema estático do Hugo (Hugo Noir, licença MIT) numa aplicação PHP com banco de dados e escrevi todo o back-end:

- **Banco MySQL** com seis tabelas (sobre, experiências, projetos, blog, contato e usuários), e o site público montado a partir delas.
- **Painel administrativo** com login, para cadastrar, editar e excluir experiências, projetos e posts, e editar "Sobre mim" e contato.
- **Upload de imagens** restrito a JPG e PNG de até 2 MB, salvas com nome aleatório; ao trocar uma imagem, o arquivo antigo é apagado.
- **URLs amigáveis** com `.htaccess`: `/blog/nome-do-post` e páginas sem `.php` no endereço.
- **Publicação** em hospedagem compartilhada, com domínio próprio.

![Painel administrativo: lista de projetos com editar e excluir](/img/projetos/cms-painel-lista.png)

## Segurança, e a revisão um ano depois

A versão original já guardava as senhas com hash e escapava a saída na maior parte das páginas públicas. Em outubro de 2026, revisando o código para este portfólio, encontrei duas falhas sérias e corrigi:

1. **O painel gravava antes de conferir o login.** As páginas processavam o formulário antes de verificar a sessão, então uma requisição enviada direto para a página criava ou apagava conteúdo sem senha. Agora a verificação é a primeira linha de cada página.
2. **O SQL era montado juntando o texto digitado.** Um simples apóstrofo quebrava a consulta, e era uma porta aberta para SQL Injection. Agora todas as gravações e buscas usam consultas parametrizadas (`prepare` + `bind_param`).

Na mesma revisão, completei o escape de saída nas páginas que faltavam e no painel. O login passou a trocar o ID de sessão e a dar a mesma mensagem para e-mail ou senha errados, a conexão passou a usar UTF-8 e os caminhos passaram a funcionar tanto na raiz de um domínio quanto numa subpasta. Testei cada correção localmente: um título com apóstrofo é salvo normalmente, e as páginas do painel redirecionam para o login quando não há sessão.

Ficou registrado no README o que ainda falta, como o token contra CSRF nos formulários.

![Formulário de edição de projeto no painel](/img/projetos/cms-painel-editar.png)

O resultado no site público:

![Página inicial do site, montada com o conteúdo do banco](/img/projetos/cms-site-publico.png)

![Página experiencias do site, montada com o conteúdo do banco](/img/projetos/cms-site-publico-experiencias.png)

## Vídeo e código

- **Demonstração em vídeo** do site e do painel funcionando: [assistir no YouTube](https://www.youtube.com/watch?v=ZfFr2-FqC6A).
- **Código**, com o passo a passo para rodar localmente: [github.com/luizz-costa/meu-blog-portfolio](https://github.com/luizz-costa/meu-blog-portfolio).

## O que aprendi

- **Como uma aplicação web funciona por dentro:** sessão, banco, upload e rotas, sem um framework fazendo isso por mim.
- **Revisar o próprio código vale a pena.** As duas falhas passaram despercebidas porque o sistema "funcionava". Testar o caso errado (sem login, com apóstrofo) é o que mostra o problema.
- **Manter um back-end no ar tem custo de hospedagem e de segurança.** Para um portfólio, que muda poucas vezes por mês, um site estático resolve o mesmo problema sem servidor. Por isso este site agora é gerado com Hugo e publicado pelo GitHub Actions.
