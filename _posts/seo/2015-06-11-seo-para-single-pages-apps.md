---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 3 minutos
title: SEO para SPA - Saulo Santiago
description: Entenda o problema de SEO em SPA.

long_description: Single-page Application (SPA), trouxe muitos benefícios, no quisito experiência do usuário podemos destacar a rapidez e o carregamento do conteúdo por demanda, mas existe um grande problema, a parte de SEO fica bastante comprometida. Para resolver este problema, existe uma técnica chamada de "fallback page". Este paradigma é totalmente modular, podendo ser utilizado em várias aplicações diferente.

has_preview: true
category: [seo, javascript]
tags: [Search Engine Optimization, SEO, Single-Page Application, SPA, Framework JS, Node, PhantomJS, Nginx]
comments: true
image_big: posts/seo/seo-para-spa-big.png
image_thumb: posts/seo/seo-para-spa-thumb.png
permalink: seo/seo-para-spa
---

> It’s going to depend on what your particular area is, what the topic is, and what kind of layout you come out with. But if it works for you and for users to have that all on one page, for the most part, it should work for Google as well.

> [What does Google think of single-page websites?](https://www.youtube.com/watch?v=Mibrj2bOFCU#t=73) - Google Webmasters

O surgimento de bibliotecas e frameworks Javascript trouxe um novo formato para sites e aplicações web, o Single-Page Application (SPA).

Por conta de seus inúmeros benefícios, muitos desenvolvedores têm optado por utilizá-lo. O grande problema é que a parte de Search Engine Optimization (SEO) fica bastante comprometida.

Apesar dos benefícios serem a chave principal para uma boa escolha, existe um grande problema, a parte de SEO fica bastante comprometida.

### O problema

Os Search engines se evoluem mas ainda não conseguem analisar e tampouco indexar o conteúdo que se encontra dentro de um arquivo Javascript.
Sendo assim o conteúdo do seu site não estará visível na [busca orgânica](http://pt.wikipedia.org/wiki/Busca_org%C3%A2nica).

### A Solução

A "fallback page" (termo que utilizo para nomear esta técnica) é a solução para este problema.

A responsabilidade disto é fornecer ao Search Engine o principal atributo - o conteúdo. Para que isto seja possível precisamos construir uma página dinâmica que tem a mesma funcionalidade e conteúdo da aplicação web via Javascript, vindo diretamente do servidor.

Esta página não é destinada aos usuários, ela so é servida quando a "request" estiver vindo de um crawler.

Para desenvolver esta solução teremos que implementar uma nova aplicação utilizando, Node, PhantomJS e Nginx. Isto elimina todas as necessidades de alterações em nosso SPA.

Esta aplicação não tem limite de utilização, no entanto podemos ter vários sites se utilizando da mesma aplicação a fim de SEO.

### Finalizando

Atualmente aplico este conceito para todos os SPA que desenvolvo e o resultado é muito satisfatório.

Para este post não ficar extenso, irei fazer a implementação do código em um post a parte.
Aguarde, logo terei novidades para você...

Aproveite e leia algumas dicas importantes sobre otimização de sua página para os motores de busca [aqui](http://saulosantiago.js.org/seo/otimizacoes-para-motores-de-busca/).
