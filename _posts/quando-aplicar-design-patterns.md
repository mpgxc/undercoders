---
title: "Quando aplicar design patterns (e quando não)"
excerpt: "Padrão de projeto é resposta a um problema recorrente — não enfeite arquitetural. O erro mais comum não é usar o padrão errado, é aplicar o certo cedo demais, resolvendo uma dor que ainda não existe."
coverImage: "/assets/blog/design-patterns/cover.svg"
date: "2026-07-14T10:00:00.000Z"
author:
  name: "mpgxc"
  picture: "/assets/blog/authors/mpgxc.svg"
ogImage:
  url: "/assets/blog/design-patterns/cover.svg"
tags:
  - "Padrões de Projeto"
  - "Boas Práticas"
---

Todo mundo aprende design patterns pela definição: Factory, Strategy, Observer,
Adapter. O problema é que a definição vem sem a parte mais importante — **o
problema que o padrão existe para resolver**. Sem essa metade, o padrão vira
decoração, e código decorado é código difícil de mudar.

## Padrão é resposta, não pergunta

Um padrão só faz sentido quando existe uma **força** empurrando por ele:

- **Strategy** aparece quando há mais de uma forma de fazer a mesma coisa e a
  escolha muda em runtime — não quando existe uma única implementação.
- **Adapter** aparece quando você precisa encaixar uma interface externa na sua
  — não como camada preventiva "para o caso de".
- **Observer / eventos** aparecem quando o emissor não pode conhecer os
  interessados — não para desacoplar dois métodos da mesma classe.

Se você não consegue nomear a força que justifica o padrão, provavelmente ele
ainda não é necessário.

## O custo invisível de abstrair cedo

Toda abstração cobra um pedágio: um nível a mais de indireção, um arquivo a
mais para navegar, uma interface a mais para manter em sincronia. Esse custo se
paga **quando a variação realmente chega**. Antes disso, é só imposto.

> Duplicação é mais barata que a abstração errada.

Repetir um trecho duas vezes e esperar a terceira ocorrência revelar o padrão
certo costuma sair muito mais barato do que abstrair na primeira e descobrir,
na terceira, que a abstração não serve.

## Um roteiro pragmático

1. **Escreva a versão concreta primeiro.** Resolva o problema real, sem padrão.
2. **Espere a repetição ou a variação.** Uma segunda implementação, um teste que
   pede um _fake_, uma regra que muda em runtime.
3. **Aí sim extraia o padrão** — agora você conhece a forma exata da variação, e
   a abstração nasce ajustada, não adivinhada.

Foi exatamente esse raciocínio que apliquei ao decidir onde criar _ports_ em
[Como eu penso arquitetura e design dos meus projetos backend](/posts/como-eu-penso-arquitetura-e-design-backend):
abstração só onde há I/O externa de verdade, classe concreta no resto.

## O ponto

Conhecer os padrões é pré-requisito; saber **adiar** o uso deles é maturidade.
O objetivo nunca é ter mais padrões no código — é ter o mínimo de estrutura que
resolve o problema de hoje sem travar a mudança de amanhã.
