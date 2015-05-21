---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 4 minutos
title: Singleton em JS
description: Passo a passo de um objeto singleton.

long_description: Singleton é um padrão de design pattern. Este padrão fica responsável por criar um objeto e garantir uma única instância de sua classe.

has_preview: true
category: [js]
tags: [js]
comments: true
image_big: posts/js/singleton-em-js-big.png
image_thumb: posts/js/singleton-em-js-thumb.png
permalink: js/singleton-em-js
---

_Singleton_ é um _design pattern_. 

Este padrão fica responsável por criar um objeto e garantir uma única instância de sua classe. 

Um conceito principal para implementação de um objeto _singleton_ é que precisamos pensar em um forma de disponibilizarmos uma propriedade no objeto de maneira que possamos acessa-lo direto sem a necessidade de instancia-lo.

#### Implementação no ES5

Vou mostrar uma implementação básica em javascript na versão do ecma 5:

```js
window.Foo = (function() {
  var _instance = void 0;

  Foo.getInstance = function() {
    return !!_instance ? _instance : _instance = new Foo();
  };

  function Foo() {
    console.log('new instance');
  }

  return Foo;
})();

Foo.getInstance() // => new instance
Foo.getInstance() // => return object instantied
```

De início declarei uma variável interna chamada `_instance`. A função desta variável é guardar o estado da instância enquanto nosso script estiver sendo executado.

Logo após foi definido uma propriedade chamada de `getInstance` em `Foo` que tem como valor uma função. Esta função executa nossa regra do _singleton_. 

A primeira e única instrução que encontramos dentro da nossa propriedade `getInstance` é um ternário que verifica o estado da variável `_instance`. 

Quando a variável estiver nula significa que estamos chamando a propriedade `getInstance` pela primeira vez, então o seguinte trecho de código é executado: `_instance = new Foo()`. 

Das próximas **n vezes** que chamarmos a propriedade `getInstance` através do objeto `Foo` ja teremos a instância do objeto armazenada na variável `getInstance` então basta fazer o retorno da variável que guarda nossa instância.

#### Implementação no ES6

Para finalizar irei mostrar um exemplo de _singleton_ utilizando o ecma 6:

```js
let _instance = Symbol();

class Foo {
  constructor() {
    console.log('new instance');
  }

  static get getInstance() {
    if(!this[_instance]) {
      this[_instance] = new Foo();
    }

    return this[_instance];
  }
}

Foo.getInstance // => new instance
Foo.getInstance // => return object instantied
```

Analisando os dois exemplos podemos notar que a lógica continua sendo a mesma.

#### Exemplo de uso

Imagine um objeto que tem a função de abrir um conexão com o banco de dados antes de executar qualquer operação.

Se a cada operação abrirmos uma conexão, com certeza perderemos muito a qualidade de processamente.

Mas se utilizarmos uma classe _singleton_ para fazer esta conexão, evitaremos essa sobrecarga pois estaremos utilizando da mesma instância para todas as operações.

O conceito de _singleton_ pode ser aplicado em várias outras lógicas de programação.