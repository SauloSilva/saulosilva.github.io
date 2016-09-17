---
layout: post
title: Operadores em Ruby e seus métodos
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 11 minutos
description: Veja como funciona os operadores no Ruby.

long_description: Ruby esta se tornando uma línguagem popularmente conhecida na web. Neste post tentarei mostrar a fundo o que são os operadores no Ruby, e por que eles são tão diferentes de qualquer coisa que já viu antes.

has_preview: true
category: ruby
tags: [Operadores Ruby, Operadores aritméticos, Operadores de comparações, Operador de set e get, Operadores binários, Operadores lógicos, Operadores de atribuições, Operador ternário, Operadores de alcance, contruindo nossos próprios operadores]
comments: true
image_big: posts/ruby/operadores-em-ruby-e-seus-metodos-big.png
image_thumb: posts/ruby/operadores-em-ruby-e-seus-metodos-thumb.png
permalink: ruby/operadores-em-ruby-e-seus-metodos
---

Ruby esta se tornando uma línguagem popularmente conhecida na web. Neste post tentarei mostrar a fundo o que são os operadores no Ruby, e por que eles são tão diferentes de qualquer coisa que já viu antes.

## Operadores

O exemplo abaixo mostra dois operadores familiares.

```ruby
1 + 2 # 3

person[:name] = "Joe"
```

Nas expressões acima denominamos dois operadores, um com o sinal de mais (operador aritmético) e outro com um sinal de igual (operador de atribuição).
Essa maneira não é diferente do que você já esta acostumado a utilizar em outras liguagens como: Javascript, Java, C#.
Mas no Ruby os operadores são realmente chamados de métodos.

Vamos tentar executar o seguinte comando no ruby:

```ruby
1.+(2)

# 3
```

Na execução, o operador `+`, fez uma chamada de método no objeto `1`, passando o objeto `2` de parâmetro.

```ruby
name = 'Saulo'

name.+(' Santiago') # O retorno será "Saulo Santiago", mas a variável `name` continua armazenando 'Saulo'

name += " Santiago" # Agora a variável `name` armazena 'Saulo Santiago'
```

Ficou claro que podemos fazer concatenação com o método `+`. Como bônus o Ruby define o operador `+=` com base no operador `+` (note que você não pode utilizar o `+= ` como um método), sendo assim conseguimos uma sintaxe mais enxuta.

Isso nos dá um poder incrível. Nós podemos personalizar o significado de adição, subtração e atribuir objetos em nossas classes personalizadas.

Vamos tomar um passo adiante.


## Construindo nossos próprios métodos de operação

Vamos tentar estabelecer e criar um método.

Para este exemplo, vamos pensar em um objeto chamado Geladeira, que pode adicionar as coisas via o operador `+` e retirar as coisas via o operador `-`. Vamos iniciar nossa classe:

```ruby
class Fridge
  def initialize (beverages=[], foods=[])
    @beverages = beverages
    @foods = foods
  end

  def + (item)
  end

  def - (item)
  end
end
```

Nossa função do `initialize` é bem simples: nós tomamos dois parâmetros (ambos por padrão retornam matrizes vazias, se nada for enviado), que são atribuidos a variáveis ​​de instância.

```ruby
def + (item)
  if item.is_a? Beverage
    @beverages.push item
  else
    @foods.push item
  end
end
```

Isso é muito simples. Cada objeto tem um método `is_a?` que leva um único parâmetro: a classe. Se o objeto é uma instância dessa classe, ele irá retornar `true`, caso contrário, retornará `false`.

Assim, este diz que se o item que estamos adicionando na Geladeira é uma bebida, nós vamos adicioná-lo à matriz `@beverages`. Caso contrário, nós vamos adicioná-lo à matriz `@foods`.

Agora, que tal levarmos as coisas para fora da geladeira? Este método ficará um pouco mais complexo.

```ruby
def - (item)
  ret = @beverages.find do |beverage|
    beverage.name.downcase == item.downcase
  end

  return @beverages.delete ret unless ret.nil?

  ret = @foods.find do |food|
    food.name.downcase == item.downcase
  end

  @foods.delete ret
end
```

No código acima recebemos uma `string` de parâmetro, que representará o nome do objeto que queremos remover.

Usamos o método `find` para interar sobre a matriz e buscar um ou mais objetos que tenham o mesmo valor que o parâmetro que foi enviado.

Se houver algum item que corresponde na matriz, ele será armazenadas no variável `ret`, a seguir será removido com `@beverages.delete ret` e retornado, caso contrário, `ret` será nula.

Você deve estar pensando, por que usamos o `return` no meio do método?
Se não estivessemos utilizando o `return` o código continuaria sendo executado, e neste caso não queriamos este comportamento.

Então para parar a execução de um bloco de código em um determinado lugar no método que não seja a última instrução, colocamos um `return`.

Caso nada seja retornado, isso significa que o item não foi encontrado no `@beverages`. Portanto, nós assumimos que ele está em `@foods`. Nós fizemos a mesma coisa para encontrar o item em `@foods` e em seguida, devolvemos.

Note que nas duas verificações estamos convertendo as `strings` todas para minúsculas, isso garante uma verificação mais segura.

Antes de testarmos isso, vamos precisar de duas classes: `Food` e `Beverage`:

```ruby
class Beverage
  attr_accessor :name

  def initialize name
    @name = name
    @time = Time.now
  end
end

class Food
  attr_accessor :name

  def initialize name
    @name = name
    @time = Time.now
  end
end
```

Depois de ter criado as classes; vamos testa-ló no `IRB`.

```ruby
2.2.2 :001 > f = Fridge.new

 => #<Fridge:0x007fa9d305d140 @beverages=[], @foods=[]>

2.2.2 :002 > f + Beverage.new("water")
 => [#<Beverage:0x007fa9d3054158 @name="water", @time=2015-07-20 01:01:04 -0300>]

2.2.2 :003 > f + Beverage.new("beer")
 => [#<Beverage:0x007fa9d3054158 @name="water", @time=2015-07-20 01:01:04 -0300>, #<Beverage:0x007fa9d3046aa8 @name="beer", @time=2015-07-20 01:01:18 -0300>]

2.2.2 :004 > f + Food.new("bread")
 => [#<Food:0x007fa9d303e1c8 @name="bread", @time=2015-07-20 01:01:27 -0300>]

2.2.2 :005 > f + Food.new("eggs")
 => [#<Food:0x007fa9d303e1c8 @name="bread", @time=2015-07-20 01:01:27 -0300>, #<Food:0x007fa9d3034ba0 @name="eggs", @time=2015-07-20 01:01:30 -0300>]

2.2.2 :006 > f
 => #<Fridge:0x007fa9d305d140 @beverages=[#<Beverage:0x007fa9d3054158 @name="water", @time=2015-07-20 01:01:04 -0300>, #<Beverage:0x007fa9d3046aa8 @name="beer", @time=2015-07-20 01:01:18 -0300>], @foods=[#<Food:0x007fa9d303e1c8 @name="bread", @time=2015-07-20 01:01:27 -0300>, #<Food:0x007fa9d3034ba0 @name="eggs", @time=2015-07-20 01:01:30 -0300>]>

2.2.2 :007 > f - 'water'
 => #<Beverage:0x007fa9d3054158 @name="water", @time=2015-07-20 01:01:04 -0300>

2.2.2 :008 > f
 => #<Fridge:0x007fa9d305d140 @beverages=[#<Beverage:0x007fa9d3046aa8 @name="beer", @time=2015-07-20 01:01:18 -0300>], @foods=[#<Food:0x007fa9d303e1c8 @name="bread", @time=2015-07-20 01:01:27 -0300>, #<Food:0x007fa9d3034ba0 @name="eggs", @time=2015-07-20 01:01:30 -0300>]>
2.2.2 :053 >
```

Como você observou, criei o objeto `Fridge` e adicionei nele várias classes de `Beverage` e `Food`, e no final retirei um objeto pelo nome (`water`).

Pronto, conseguimos personalizar os operadores de adição e subtração para nossa classe `Fridge`.

## Operadores de Get e Set

Agora vamos escrever métodos para a definir e obter operadores utilizando os `hashes`. Mas antes iremos analisarmos o seguinte trecho de código:

```ruby
person = {}

person[:name] = "Saulo"
```

Mas uma vez que os operadores são métodos, podemos fazê-lo desta maneira:

```ruby
person.[]=(:age, 24) # to set

person.[](:name) # to get
```

Tudo isto funciona perfeitamente pois estes são métodos normais, tendo apenas uma sintaxe especial.

Vamos fazermos uma classe chamada `Club`. Nosso clube tem diferentes membros com diferentes funções. No entanto, a gente pode querer ter mais do que um membro com uma determinada função.

Então, o nosso exemplo irá ser composto por um `hash` de membros e seus papéis. Se atribuirmos um segundo membro a uma função, em vez de substituir o primeiro, iremos adicioná-lo.

```ruby
class Club
  def initialize
    @members = {}
  end

  def [] (role)
    @members[role]
  end

  def []= (role, member)
  end
end
```

O método responsável por trazer um membro da matriz é simples. Mas o método para adicionar um novo membro é mais complexo:

```ruby
def []= (role, member)
  if @members[role].nil?
    @members[role] = member
  elsif @members[role].is_a? String
    @members[role] = [ @members[role], member ]
  else
    @members[role].push member
  end
end
```

Se não houver membros com função definida, o membro é atribuido para uma nova função dentro do `hash` `members`.

Se a função esta definido como uma `string`, é feito uma conversão em uma nova matriz com os membros originais e o novo membro.

Finalmente, se nenhuma dessas opções forem verdadeiras, significa que a função já existe na matriz, e por isso, o novo membro é apenas adicionado.

Podemos testar isto da seguinte maneira:

```ruby
c = Club.new

c[:developer] = "Saulo"

c[:engineer] = "Foo"

c[:engineer] = "Bar"

c[:developer] # "Saulo"

c[:engingeer] # [ "Foo", "Bar" ]
```

## Listando todos os Operadores

Assumindo que a variável `a` seja `10` e a `b` seja `20`. Segue a lista completa dos operadores:

### Operadores aritiméticos

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| +         | Adiciona valores da esquerda com o da direita | `a + b` irá retornar 30          | Sim |
| -         | Subtrai os valores da esquerda com o da direita | `b - a` irá retornar 10      | Sim |
| *         | Multiplica os valores            | `a * b` irá retornar 200   | Sim |
| /         | Divide o valor da esquerda com o da direita | `b / a` irá retornar 2 | Sim |
| %         | Divide o valor da esquerda com o da direita e retorna a sobra da divisão | `b % a` irá retornar 0 | Sim |

### Operadores de comparações

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| == | Verifica se o valor dos dois operandos são iguais ou não, se sim, então a condição se torna verdadeira. |  `a == b` não é verdadeiro  |Sim |
| != | Verifica se o valor dos dois operandos são diferentes ou não, se sim, então a condição se torna verdadeira. | `a != b` é verdadeiro |Sim |
| > | verifica se o valor da esquerda é maior que o da direita, se sim retorna verdadeiro | `a > b` não é verdadeiro |Sim |
| < | verifica se o valor da esquerda é menor que o da direita, se sim retorna verdadeiro | `a > b` é verdadeiro |Sim |
| >= | verifica se o valor da esquerda é maior ou igual ao da direita, se sim retorna verdadeiro | `a >= b` não é verdadeiro |Sim |
| <= | verifica se o valor da esquerda é menor ou igual ao da direita, se sim retorna verdadeiro | `a <= b` é verdadeiro |Sim |
| <=> | Operador de comparação combinada. Retorna `0` se primeiro operando é igual ao segundo, retorna 1 se o primeiro operando for maior que o segundo e retorna `-1` se o primeiro operando for menor que o segundo. | `a <=> b` retorna -1 |Sim |
| === | Usado para testar a igualdade dentro de uma cláusula que contenha instruções. | `(1...10) === 5` é verdadeiro |Sim |
| .eql? | Verdadeiro se o receptor e o argumento têm o mesmo tipo e valor. |   `1 == 1.0` retorna verdadeiro, mas em `1.eql?(1.0)` não é verdadeiro |Sim |
| .equal? | Verdadeiro se o receptor e o argumento tem a mesma identificação do objeto. | se `foo_obj` é duplicado para `bar_obj` então `foo_obj == bar_obj` é verdade, `a.equal? bar_obj` é falso, mas `a.equal? foo_obj` é verdade. |Sim |

### Operador de Set e Get

Assumimos que a variável `y = {}` sempre esta inicializada com um `hash` vazio.

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| []= | Operador de Set | `y[]=(:red, '#ff0000')` irá atribuir um hash que contém a chave `red` com o valor `#ff0000` | Sim |
| [] | Operador de Get | `y[:red]` irá retornar o valor da chave `red` | Sim |


### Operadores binários

Imagine que que `x = 18` e `y = 20`, em binário os valores são:

```ruby
(x = 18).to_s(2)     #=> "10010"
(y = 20).to_s(2)     #=> "10100"
```

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| & | Operador AND | `(x & y).to_s(2)` irá retornar "10000" | Sim |
| pipe | Operador OR | `(x pipe y).to_s(2)` irá retornar "10110" | Sim |
| ^ | Operador XOR | `(x ^ y).to_s(2)` irá retornar "110" (zeros à esquerda são omitidos) | Sim |
| ~ | Operador NOT | `(~x).to_s(2)` irá retornar "-10011" | Sim |
| << | Operador com desvio a esquerda | `(x << 2).to_s(2)` irá retornar "1001000"  | Sim |
| >> | Operador com desvio a direita | `(x >> 2).to_s(2)` irá retornar "100" | Sim |

### Operadores lógicos

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| and ou && | Se ambas condições forem verdadeiras, então é retornado `true` | `(a && b)` é verdadeiro | Não |
| or ou double pipe | Se algumas das condições forem diferente de zero, o retorno é `true` | `(a or b)` é verdadeiro | Não |
| not ou ! | Inverte o estado da lógica do operando | `!(a && b)` é falso | Não |

### Operadores de atribuições

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| = | Operador de atribuição simples, atribui valores da direita para o lado esquerdo | `c = a + b` é atribuido o valor da soma de `a + b` em `c` | Não |
| += | Adiciona e faz a atribuição | `c += a` é equivalente a `c = c + a` | Não |
| -= | Subtrai e faz a atribuição | `c -= a` é equivalente a `c = c - a` | Não |
| \*= | Multiplica e faz a atribuição | `c *= a` é equivalente a `c = c * a`  | Não |
| /= | Divide e faz a atribuição | `c /= a` é equivalente a `c = c / a` | Não |
| %= | Divide e faz a atribuição do resto | `c %= a` é equivalente a `c = c % a` | Não |
| **= | Exponencia e faz a atribuição | `c **= a` é equivalente a `c = c ** a` | Não |

### Operador ternário

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| ? : | Expressão condicional | Se a condição é verdadeira? então o valor é `x` caso contrário o valor é `y` | Não |

### Operadores de alcance

| Operador  | O que faz?  | Exemplo | Método? |
| :--:  | :--  | :-- | :--: |
| .. | Cria um alcance do ponto de partida até o ponto final inclusivo | `1..10` cria um intervalo de 1 a 10 | Não |
| ... | Cria um alcance do ponto de partida até o ponto final exclusivo  | `1..10` cria um intervalo de 1 a 9 | Não |

**Nota:** Operadores com um **Sim** na coluna `Método?`, na verdade, são métodos que podem serem subscritos.
