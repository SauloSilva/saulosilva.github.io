---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 30 minutos
title: SEO para SPA - parte 2 - Saulo Santiago
description: Resolva o problema de SEO em seu SPA.

long_description: Single-page Application (SPA), trouxe muitos benefícios, no quisito experiência do usuário podemos destacar a rapidez e o carregamento do conteúdo por demanda, mas existe um grande problema, a parte de SEO fica bastante comprometida. Para resolver este problema, existe uma técnica chamada de "fallback page". Este paradigma é totalmente modular, podendo ser utilizado em várias aplicações diferente. Neste post irei ensinar como desenvolver esta técnica para resolver este problema.

has_preview: true
category: [seo, javascript]
tags: [Search Engine Optimization, SEO, Single-Page Application, SPA, Framework JS, Node, PhantomJS, Nginx]
comments: true
image_big: posts/seo/seo-para-spa-parte-2-big.png
image_thumb: posts/seo/seo-para-spa-parte-2-thumb.png
permalink: seo/seo-para-spa-parte-2
---

Como falei no post ([SEO para SPA](/seo/seo-para-spa/)), neste irei explicar uma solução para resolver o problema de SEO em SPAs, implementando uma técnica simples sem precisar alterar nada so seu site.

#### Ferramentas

- [Nginx](http://nginx.org/)  (Gerenciar o destino das requests de acordo com o user-agent)
- [Express](http://expressjs.com/) (Spawn do script phantom e devolução do html gerado como response da request)
- [Phantom](http://phantomjs.org/) (Processar a url enviada e capturar todo o HTML da página)

#### Vamos Codar

Primeiro é preciso criar uma APP básica com o express:

- Instale o `express-generator` com o seguinte comando:

```
npm install express-generator -g
```

- Execute este comando para criar sua aplicação:

```
express seo_server
```

- Vamos alterar o `app.js` deixando-o mais simples possível:

```js
// app.js

var express = require('express')
    , path = require('path')
    , logger = require('morgan')
    , routes = require('./routes/index')
    , app = express();

app.use(logger('dev'));
app.use('/', routes);

module.exports = app;
```

Sendo assim, o `app.js` tem a responsabilidade de: requerer o express, requerer um arquivo de configuração para rota, requerer o `path` para lidar com os caminhos de diretórios, requerer o `morgan` para gerar logs.

- Para configurar nossa rota principal (`/`) vamos criar um novo arquivo em `routes/index.js` com o seguinte conteúdo:

```js
var express = require('express')
    , router = express.Router()
    , SeoServer = require('../lib/seo_server');

router.get(/(.*)/, function(req, res, next) {
    SeoServer.init(req, res, next)
});

module.exports = router;
```

A configuração da routa `GET /` requer de um módulo `SeoServer` com uma função exportada que espera receber os três parâmetros da request.

- Para definir o nosso modulo `SeoServer`, vamos criar um novo arquivo em `lib/seo_server.js` com o seguinte conteúdo:

```js
var childProcess = require('child_process')

/*
  ------------------
  Função construtura
  ------------------

  Responsabilidade:

  1 - Receber os parâmetros (req, res, next) da request e
      armazenar cada um sendo um atributo do objeto SeoServer
*/

function SeoServer(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
}

/*
  ------------------
  Função init
  ------------------

  Responsabilidades:

  1 - Ler o atributo `x-forwarded-host` do header da request.
  2 - Ler o atributo `x-loading-class` do header da request.
  3 - Formar a url que será processada pelo phantom.
  4 - Verificar a existência do conteúdo armazenado nas variáveis `host` e `loadingClass`.
      Caso a condição seja satisfeita o função `getContent` é chamada com envio
      de três parâmetros (url, loadingClass e uma função de `callback`
      que fará o send da request enviando o conteúdo processado).
      Caso a condição não seja satisfeita a request é finalizada.
*/

SeoServer.prototype.init = function() {
    var host = this.req.headers['x-forwarded-host'],
        loadingClass = this.req.headers['x-loading-class'],
        url = 'http://' + host + this.req.params[0];

    if (host && loadingClass) {
        this.getContent(url, loadingClass, function(content) {
            this.res.send(content);
        }.bind(this));
    } else {
        this.res.end()
    }
}

/*
  ------------------
  Função getContent
  ------------------

  Responsabilidades:

  1 - Receber a url, loadingClass e uma funcão callback de parâmetro.
  2 - Fazer o spawn do arquivo `phantom_server.js` passando a url e o loadingClass como argumentos.
  3 - Fazer o encode para `utf-8` de qualquer saída do objeto `phantom`.
  4 - Registrar um output dos dados convertendo o resultado para uma `String`
  5 - Registrar um `listerner` no objeto `phantom` para o evento de `exit`.
      Se o code recebido no `callback` do `listener` for diferente de 0,
      significa que algo deu errado, então uma excessão é lançada.
      Se o code recebido no `callback` do `listener` for igual a 0,
      o `callback` que foi enviado como terceiro parâmetro em `getContent`
      é executado passando o conteúdo processado pelo objeto `phantom`.
*/

SeoServer.prototype.getContent = function(url, loadingClass, callback) {
    var content = '';
    phantom = childProcess.spawn('phantomjs', ['./lib/phantom_server.js', url, loadingClass]);
    phantom.stdout.setEncoding('utf8');

    phantom.stdout.on('data', function(data) {
        content += data.toString();
    });

    phantom.on('exit', function(code) {
        if (code !== 0) {
            throw new Error('Seoserver crashed!');
        } else {
            callback(content);
        }
    });
}

/*
  ------------------
  Export da função init no módulo
  ------------------

  Responsabilidades:

  1 - Instânciar do objeto SeoServer enviando todos os parâmetros recebido.
  2 - Utilizar o objeto instânciado para executa a função init.
*/

module.exports = {
    init: function(req, res, next) {
        seoServer = new SeoServer(req, res, next);
        seoServer.init();
    }
};
```

O arquivo que acabamos de criar requer um arquivo `phantom_server.js` em `lib`, sendo assim vamos criar este arquivo `lib/phantom_server.js` e inserir o seguinte conteúdo:

```js
/*
  1 - Requerer o `system` e o `webpage`.
  2 - Criar um `webpage`
  3 - Leitura e armazenamento do argumento 1 (url)
  4 - Leitura e armazenamento do argumento 2 (loadingClass)
  5 - Definir timeout (15 segundos)
  6 = Definir a variável startTime
  6 = Definir a variável isLoaded
*/

var system = require('system'),
    page = require('webpage').create(),
    url = system.args[1],
    loadingClass = system.args[2]
    timeout = 15000,
    startTime,
    isLoaded;

/*
  1 - Desabilitar `webSecurityEnabled`
  2 - Desabilitar `loadImages`
  3 - Habilitar `localToRemoteUrlAccessEnabled`
*/

page.settings.webSecurityEnabled = false;
page.settings.loadImages = false;
page.settings.localToRemoteUrlAccessEnabled = true;


/*
  ------------------
  Função onLoadStarted
  ------------------

  Responsabilidades:

  1 - Registrar a hora que o load da página iniciou
  2 - Inserir false como valor da variável isLoaded
*/

page.onLoadStarted = function(request) {
    startTime = new Date().getTime();
    isLoaded = false;
};

/*
  ------------------
  Função onLoadFinished
  ------------------

  Responsabilidades:

  1 - Verificar se o DOM da página carregada não possui nenhum elemento com uma classe de load.
  2 - Armazenar o resultado da verificação (true ou false) na variável isLoaded.
*/

page.onLoadFinished = function(response) {
    isLoaded = page.evaluate(function(loadingClass) {
        return document.getElementsByClassName(loadingClass).length == 0;
    });
};

/*
  ------------------
  Função checkComplete
  ------------------

  Responsabilidades:

  1 - Verificar se isLoaded é true ou se tempo de processamento
      é maior que o timeout definido no início deste arquivo.
  2 - Caso ambas partes do condinal seja satisfeita, é feito
      uma limpeza do registrador de `setInterval`, o conteúdo
      da página (HTML) é imprimido por console.log
      e processo do phantom é finalizado.

*/

var checkComplete = function() {
    if (isLoaded || new Date().getTime() - startTime > timeout) {
        clearInterval(checkCompleteInterval);
        console.log(page.content);
        phantom.exit();
    }
}

// Registra um setInterval a cada 1 milisegundo para executar o método checkComplete
var checkCompleteInterval = setInterval(checkComplete, 1);

// Abre a url que foi requisitada
page.open(url, function(status) {});
```

Agora que nossa a aplicação express e o arquivo do phantom para parsear o HTML estão configurados, precisamos fazer a configuração de um `proxy` reverso para redicionar as requests ou para o aplicação do SPA ou para aplicação SeoServer que acabamos de criar.

O que diferencia uma `request` feita por um `crawler` de uma `request` feita por usuários é o `user-agent`. Sendo assim o trabalho de redirecionamento será feito em cima do `user-agent`.

Primeiro vamos criar um arquivo de base para configurar o Nginx da nossa aplicação:

```nginx
worker_processes 1;

events {
  worker_connections 1024;
}

http {
  types_hash_max_size 2048;
  server_names_hash_bucket_size 64;

  sendfile on;
  keepalive_timeout 65;

  access_log /home/server-config/www/shared/log/nginx.access.log;
  error_log  /home/server-config/www/shared/log/nginx.error.log debug;

  gzip                    on;
  gzip_static             on;
  gzip_http_version       1.1;
  gzip_proxied            expired no-cache no-store private auth;
  gzip_disable            "MSIE [1-6]\.";
  gzip_vary               on;
  gzip_comp_level         6;
  gzip_types              text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

  proxy_set_header        X-Real-IP  $remote_addr;
  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header        X-Forwarded-Port $server_port;
  proxy_set_header        X-Forwarded-Host $host;

  map $http_upgrade $connection_upgrade {
      default upgrade;
      '' close;
  }

  include                 conf/upstreams/app.conf;
  include                 conf/servers/app.conf;
}
```

Depois que definimos o arquivo de configuração base do Nginx, vamos criar os arquivos que estão sendo feito os includes (`upstreams` e os `servers`).

Vamos iniciar pelo `upstream`, que basicamente vai referenciar em quais portas nossas aplicações estam rodando.

```nginx
upstream seo_server {
  server localhost:6666;
}

upstream app {
  server localhost:3000;
}
```

E para finalizar nossa configuração no nginx vamos definir os nossos `servers`.

```nginx
server {
  server_name app.com.br;
  listen 80;

  # Defini onde será salvo os logs

  access_log /home/app/www/shared/log/nginx.access.log;
  error_log  /home/app/www/shared/log/nginx.error.log debug;
  root       /home/app/www/current/public;

  # Adiciona os headers que será utilizado pelo SeoServer

  proxy_set_header  X-Forwarded-Port $server_port;
  proxy_set_header  x-Loading-Class  spinner;
  proxy_set_header  X-Forwarded-Host $host;

  # Verifica o user-agent da request
  # caso o user-agent seja de um crawler
  # a variável bot recebe o valor true.

  if ($http_user_agent ~ (facebookexternalhit|Googlebot|bingbot|Screaming|rogerbot)) {
    set $bot true;
  }

  # Rewrite para servir os assets

  location ~* ^.+.(jpg|jpeg|gif|png|ico|css|tgz|gz|js|swf|html)$ {
    expires max;
    rewrite (.*) $uri break;
  }

  location / {

    # Caso a variável `bot` tenha seu valor como false
    # é feito o proxy pass para a aplicação normal

    if ($bot = false) {
      proxy_pass http://app.localhost;
    }

    # Caso a variável `bot` tenha seu valor como false
    # é feito o proxy pass para a aplicação SeoServer
    # que construímos a pouco.

    if ($bot != false) {
      proxy_pass http://seoserver.localhost;
    }
  }
}
```

#### Definição do server para a aplicação.

```nginx
server {
  server_name   app.localhost;
  root          /home/app/www/current/public;

  location / {
    proxy_pass http://app;
  }
}
```

#### Definição do server para o SeoServer.

```nginx
server {
  server_name   seoserver.localhost;
  root          /home/seoserver/www/current/public;

  location / {
    proxy_pass http://seoserver;
  }
}
```

Agora é preciso testar se as configurações do `Nginx` que escrevemos não possui nenhum erro e após este teste fazer o start dele.

```
$ nginx -t
$ nginx
```

E finalmente colocar nosso servidor express para funcionar.

```
$ bin/www
```

Para realizar um teste que verifica se implementação feita devolve o HTML diretamente do servidor, basta fazer um curl com o user-agent de um crawler (neste exemplo irei utilizar o user-agent do google bot). Veja o seguinte exemplo:

```
curl -A 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' http://url-seu-site.com.br
```

Se a resposta do `curl` retornar todo o conteúdo de sua página HTML parseado seu site esta pronto para ser indexado pelos search engines.

Para saber mais sobre boas práticas de SEO [clique aqui](/seo/otimizacoes-para-motores-de-busca/) para ler mais.
