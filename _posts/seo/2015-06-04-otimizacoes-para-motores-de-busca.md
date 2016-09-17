---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 7 minutos
title: Otimizações para motores de busca
description: Aprenda técnicas importantes de otimização de SEO para o seu site.

long_description: Quando publicamos um site na Web, na maioria das vezes, queremos que ele tenha uma grande audiência. Para conquista-la, devemos pensar em como estruturar o conteúdo para obter um bom posicionamento nas buscas orgânicas. Aprenda técnicas importantes de SEO neste post e alavanque seu número de audiência.

has_preview: true
category: seo
tags: [Aplicações Web, Sites, Site, Dicas, SEO, Searches engines, Search engines, otimizações, otimização, motores de busca]
comments: true
image_big: posts/seo/otimizacoes-para-motores-de-busca-big.png
image_thumb: posts/seo/otimizacoes-para-motores-de-busca-thumb.png
permalink: seo/otimizacoes-para-motores-de-busca
---

Ame-os ou odeie-os.
Você não pode vencê-los? Então se junte a eles.
Estou, naturalmente, referindo-se a questão de SEO.

Quando publicamos um site na Web, na maioria das vezes, queremos que ele tenha uma grande audiência. Para conquista-la, devemos pensar em como estruturar o conteúdo para obter um bom posicionamento nas buscas orgânicas.

A busca orgânica tem um potencial enorme para encontrar novos usuários que estejam realmente interessados no conteúdo que seu site tem para oferecer.
Sendo assim, este processo, torna-se uma ótima opção para quem não quer pagar por publicidade.
Mas para que isto tenha efeito é necessário ter alguns cuidados.

### Conteúdo

O algoritmo dos motores de busca, procura em uma página conteúdo relevante. Isso quer dizer que temos que ter palavras-chave e dividir o contéudo em sub-temas com termos que possam ser classificados de uma maneira fácil.

### Headings

Utilize os `headings`, eles possuem uma grande relevância sobre o seu conteúdo. Existem vários níveis de importância, veja alguns exemplos:

```html
<h1>Insira valores que são destaque em sua página</h1>
<h2>Insira valores que são destaque em sessões da página</h2>
<h3>Insira valores que tenham maior destaque sobre algum texto de sua página</h3>
```

### Metas e title

Insira uma tag `title`, use as palavras-chave para dar um título para a página.

A `meta description` é tão importante quanto o `title`. Utilize uma descrição que resume o que o usuário encontrará ao visitar sua página.

Ambas as tags ficam dentro da sessão `header` e devem serem únicas.

```html
<head>
  <title>Inseria as palavras-chave de sua página aqui!</title>
  <meta content='Insira a descrição do que sua página faz aqui!' name='description'>
</head>
```

### Palavras-chave

Seja criativo e utilize palavras-chave para cada elemento do site como: títulos, conteúdo, URLs e descrição das imagens.

A minha dica é: criar palavras-chave que tenha alta demanda na busca e que seja de baixa concorrência. O ["keyword planner" do Google](https://adwords.google.com/ko/KeywordPlanner) auxilia na escolha das melhores.

### Links internos

Não há estratégia mais básica de SEO do que as ligações internas. Isto torna-se uma maneira fácil de aumentar o tráfego para as páginas individuais.

Mas não se esqueça de tornar padrão a ligação de volta para a página anterior. Desta forma a maioria das páginas teram um vínculo e facilitará a interação do crawler.

```html
<!-- foo > bar > baz -->

<section class='breadcrumb'>
  <ul>
    <li>
      <a href='/foo/'>foo</a>
    </li>

    <li class='separator'> > </li>

    <li>
      <a href='/foo/bar/'>bar</a>
    </li>

    <li class='separator'> > </li>

    <li>
      <a href='/foo/bar/baz/'>baz</a>
    </li>
  </ul>
</section>
```

### Sitemap

Disponibilize um sitemap, isso facilita o trabalho do crawler na busca por urls há serem indexadas.

```xml
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>http://saulosantiago.js.org/foo/</loc>
    <lastmod>2015-05-18T00:00:00+00:00</lastmod>
  </url>
  <url>
    <loc>http://saulosantiago.js.org/foo/</loc>
    <lastmod>2015-05-18T00:00:00+00:00</lastmod>
  </url>
</urlset>
```

### URLs amigáveis

Ao invés de utilizar números, combinações de letras que não fazem sentido ou carregar todo o conteúdo em uma única URL.
Faça uma URL que tenha o mesmo nome da tag `title` (remova os caractéres especiais e substitua espaço por hífen) para cada tipo de conteúdo. Assim você estará mostrando para o usuário e para os motores de busca, que para cada tipo de conteúdo existe um identificador, isso possibilita o compartilhamento de conteúdos separadamente.

```html
<head>
  <title>Foo em bar</title>
</head>
```

```bash
www.xyz.com/foo-em-bar/
```

### Descrição nas imagens

Crawlers so procuram por textos. Quando for necessário adicionar uma imagem não esqueça de atribuir uma descrição no atributo `alt` da tag `img`.

Sugiro que adicione legendas (`figcaption`) para todas as imagens.
Esta técnica é super valiosa para questões de SEO também.

```html
<figure>
    <img src='image.jpg' alt='Coloque uma descrição para imagem aqui.' />
    <figcaption>Coloque uma descrição para imagem aqui.</figcaption>
</figure>
```

### Social

Se o seu site já utiliza a estrutura de URLs amigáveis, de a possibilidade do seu usuário compartilhar ela nas redes sociais. Várias redes sociais já fornecem os botões e até mesmo `meta tags` para que os links sejam compartilhados de uma forma mais amigável.

### Nome do domínio

Ter um domínio com o mesmo nome do site é algo que reforça a marca; é possível obter o primeiro lugar nas pesquisas por palavras que tenham relação com o nome do domínio.

### Finalizando

Todos motores de busca tentam fazer o melhor possível para mostrar ao usuário qual website tem o melhor conteúdo disponível para entregar.
Respeite todas as regras e conquiste novos usuários interessados pelo seu conteúdo através da busca orgânica.
E pode ter certeza que ao longo do tempo irá perceber que o seu website terá um número maior em audiência.
