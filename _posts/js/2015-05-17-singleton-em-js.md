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
tags: [js, singleton, design pattern, es5, es6]
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

Esta lógica é um pouco diferente da anterior.

Neste caso criei duas variável fora do escopo da classe, com o nome de `_instance` e uma outra chamada de `_singletonEnforcer` ambas definidas como símbolo pois a principal característica dele é ser único e imutável, e isto é o suficiente para criamos propriedades na nossa classe que seja única. 

Ao criar a classe `Foo` defini um método estático chamado `getInstance` que será responsável por controlar se há necessidade de uma nova instância ou se simplesmente devolve a instância ja criada.

Note que quando chamamos o método `getInstance` a primeira coisa que é verificada é se existe uma propriedade definida que não esteja nula `!this[_instance]`. Caso o valor seja `null` ele criar esta propriedade na classe `Foo` e atribui como valor a instância da própria classe `Foo`: `this[_instance] = new Foo(_singletonEnforcer);`.

Logo abaixo ele retorna essa propriedade `return this[_instance]`.

Perceba que ao instanciar a classe `Foo` eu mando de parâmetro no construtor a váriavel `_singletonEnforcer` e dentro do construtor da classe eu verifico se o parâmetro que chega é o mesmo valor de `_singletonEnforcer`, caso seja um valor diferente eu disparo uma `exception` pois terei certeza de que a instância não foi definida de dentro da função `getInstance`. 

#### Exemplo de uso

Imagine um objeto que tem a função de abrir um conexão com o banco de dados antes de executar qualquer operação.

Se a cada operação abrirmos uma conexão, com certeza perderemos muito a qualidade de processamente, podendo até dar um `lock` no banco.

Mas se utilizarmos uma classe _singleton_ para fazer esta conexão, evitaremos essa sobrecarga pois estaremos utilizando da mesma instância para todas as operações.

O conceito de _singleton_ pode ser aplicado em várias outras lógicas de programação.