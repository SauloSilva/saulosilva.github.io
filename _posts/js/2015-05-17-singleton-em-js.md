---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 6 minutos
title: Singleton Design Patterns com Javascript
description: Singleton diz que você terá apenas uma instância de classe.

long_description: Singleton diz que você terá apenas uma instância de classe (se estiver utilizando ES6) ou de uma função construtora (se estiver utilizando ES5).

has_preview: true
category: [js]
tags: [JS, Javascript, Singleton, Design Pattern, ES5, ES6]
comments: true
image_big: posts/js/sigleton-design-patterns-com-javascript-big.png
image_thumb: posts/js/sigleton-design-patterns-com-javascript-thumb.png
permalink: js/sigleton-design-patterns-com-javascript
---

_Singleton_ é um _Design Patterns_. 

Este padrão fica responsável por criar um objeto e garantir uma única instância de sua classe ou função construtora. 

Para implementação de um objeto _Singleton_, precisamos pensar em uma forma de disponibilizarmos uma propriedade no objeto, de maneira que possamos acessá-lo direto sem a necessidade de uma instância.

#### Implementação no ECMAScript 5

Vou mostrar uma implementação básica em javascript na versão do ECMAScript 5:

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

De início declarei uma variável interna chamada de `_instance`. A função desta variável é guardar o estado atual da instância.

Logo após foi definido uma propriedade chamada de `getInstance` dentro do objeto `Foo`, essa função implementa nossa regra de _Singleton_.

A primeira e única instrução que encontramos dentro da nossa propriedade `getInstance` é um ternário que verifica o estado da variável `_instance`. 

Quando a variável for nula, significa que estamos passando ali pela primeira vez, então o seguinte trecho de código é executado: `_instance = new Foo()`. 

Das próximas **n vezes** já teremos a instância do objeto armazenada na variável `_instance` então apenas o retorno é feito.

#### Implementação no ECMAScript 6

Para finalizar irei mostrar um exemplo de _Singleton_ utilizando o ECMAScript 6:

```js
let _instance = Symbol();
let _singletonEnforcer = Symbol();

class Foo {
  constructor(enforce) {
    console.log('new instance');
    if (enforce !== _singletonEnforcer) {
      throw('Cannot constructor singleton')
    }
  }

  static get getInstance() {
    if(!this[_instance]) {
      this[_instance] = new Foo(_singletonEnforcer);
    }

    return this[_instance];
  }
}

Foo.getInstance // => new instance
Foo.getInstance // => return object instantied
```

Esta lógica é quase parecida com a anterior.

Neste caso criei duas variável fora do escopo da classe, com o nome de `_instance` e uma outra chamada de `_singletonEnforcer` ambas definidas como símbolo. 

Ao criar a classe `Foo` defini um método estático chamado `getInstance` que será acessado através da class `Foo` sem necessidade de instância.

Quando o método `getInstance` é chamado pela primeira vez, ele verifica se existe uma propriedade definida que não esteja nula `!this[_instance]`. Caso a propriedade ainda não esteja definida ele criar e atribui a instância como valor: `this[_instance] = new Foo(_singletonEnforcer);`, caso haja a propriedade ele apenas retorna `return this[_instance]`.

Para finalizar, na função construtora da classe eu envio `_singletonEnforcer` como uma forma de garantir que a nova instância esteja sendo chamada sempre de dentro da função `getInstance`, caso o valor seja diferente uma excessão é lançada `throw('Cannot constructor singleton')`, impedindo que a classe seja inicializada. 

#### Finalizando

Imagine um objeto que tem a função de abrir uma conexão com o banco de dados antes de executar qualquer operação.

Se a cada operação abrirmos uma conexão, com certeza perderemos muito a qualidade de processamento, podendo até travar as conexões.

Mas se utilizarmos uma classe _Singleton_ para fazer as conexões, evitaremos essa sobrecarga pois estaremos utilizando da mesma instância para todas as operações.

O conceito de _Singleton_ pode ser aplicado em várias outras lógicas de programação sempre que quiser garantir a existência de apenas uma instância de uma classe (se estiver usando ES6) ou de uma função construtura (se estiver usando ES5).