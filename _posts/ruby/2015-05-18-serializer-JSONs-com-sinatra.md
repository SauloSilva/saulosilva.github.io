---
layout: post
title: Serializer JSONs com Sinatra
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 4 minutos
description: Aprenda a manipular suas reposta JSON.

long_description: Aprenda a manipular suas reposta JSON utilizando Rails ou Sinatra ambos de maneiras automaticas. Basicamente você precisa da gem <a href='https://github.com/SauloSilva/sinatra-active-model-serializers/https://github.com/rails-api/active_model_serializers' target='_blank'>active-model-serializers</a> para o Rails e da gem <a href='https://github.com/SauloSilva/sinatra-active-model-serializers/' target='_blank'>sinatra-active-model-serializers.</a> para o sinatra.

has_preview: true
category: [ruby, highlights]
tags: [API, Ruby, Sinatra, JSON, Serializer, ActiveModel Serializer, ActiveModelSerializer]
comments: true
image_big: posts/ruby/serializer-jsons-com-sinatra-big.png
image_thumb: posts/ruby/serializer-jsons-com-sinatra-thumb.png
permalink: ruby/serializer-jsons-com-sinatra
---

Serializar objetos JSONs nunca foi tão fácil depois que a [`gem ActiveModel::Serializers`](https://github.com/rails-api/active_model_serializers) passou a existir. 

A gem **facilita a manipulação de objetos para respostas do tipo JSON.**

Com isso podemos dedicar um lugar para personalizar totalmente a saída do `JSON`. Para cada objeto que queremos serializar devemos criar um arquivo que contenha uma classe que estende da classe `ActiveModel::Serializer`.

Imagine que seu `controller` recebe um objeto com a seguinte estrutura:

```ruby
#<Foo id: 1, foo: "foo", bar: "bar", baz: "baz">
```

Mas você não esta satisfeito em devolver todos atributos como resposta na `request`. Qual a solução para isto?

A solução é manipular este objeto usando uma classe de serializer. Tomando o objeto acima como exemplo, desejo que apenas o atributo `bar` esteja presente. Para que isto seja possível dexei o serializer da seguinte maneira:

```ruby
class FooSerializer < ActiveModel::Serializer
  attributes :bar
end
```

Se estiver utilizando o **framework [Rails](https://github.com/rails/rails)** basta fazer um `render` do tipo json:

```ruby
def show
  render json: Foo.find(params[:id])
end
```

Que teremos o retorno desejado:

```json
{
  "foo": {
    "bar": "bar"
  }  
}
```

Perfeito, era isto que queriamos.

#### Conhecendo a magia da Gem

Você deve ter achado esquisito (**automatico**) em fazer apenas um `render` e ele trazer um objeto serializado sem precisar especificar nada de onde pegar.

Pois bem esta magia acontece dentro da `gem`, como podemos ver aqui, ele intercepta todos os [renders](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/action_controller/serialization.rb#L48) do tipo json, depois [procura pelo serializer](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/action_controller/serialization.rb#L71) que tenha o mesmo nome do objeto e finaliza devolvendo a [instância desta classe](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/action_controller/serialization.rb#L95) já no formato JSON.

Genial, não? 

Se sua resposta foi sim, concordo plenamente contigo. Mas pena que isto só funciona para o Rails. 

Mas calma que para quase tudo tem solução.

## Solução para o Sinatra

Meses atras passei por esta dificuldade. Precisei utilizar o `ActiveModel::Serializers` mas tive problemas em deixar tudo automatico como ocorre no Rails.

O problema é que no Sinatra não oferece suporte para a classe `ActionController`, sendo assim a gem lança o seguinte erro `cannot load such file -- action_controller (LoadError)` ao tentar carregar, mas este erro é [tratado](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/active_model_serializers.rb#L18-L20) para que nossa aplicação não pare de funcionar.

Sendo assim o `render` não tem mais aquela magia toda de identificar o serializer e retornar o objeto serializado automaticamente, e para os serializer funcionar você deve fazer esse trabalho da seguinte forma:

```ruby
get '/foo/:id' do
  foo = Foo.find(params[:id])
  json FooSerializer.new(foo).to_json
end
```

Não podemos dizer que isto não seja uma solução válida, mas se você achou que da pra melhorar, eu concordo contigo.

Vendo a necessidade de melhorias, criei esta [`gem sinatra-active-model-serializers`](https://github.com/SauloSilva/sinatra-active-model-serializers/) para deixar tudo isso automatico no Sinatra assim como é no Rails.

E o resultado disto ficou:

```ruby
get '/foo/:id' do
  json Foo.find(params[:id])
end
```

Para que tudo funcione como mencionei acima basta instalar a gem: `gem install sinatra-active-model-serializers` ou adicionar em seu Gemfile: `gem 'sinatra-active-model-serializers'`.

Essa `gem` basicamente aplica toda a lógica de controller feita para o Rails no módulo [`JSON`](https://github.com/SauloSilva/sinatra-active-model-serializers/blob/v0.0.3/lib/sinatra-active-model-serializers/json.rb#L4) do Sinatra com algumas opções caso queira personalizar mais ainda suas respostas.

Maiores detalhes você encontrará [aqui nas espeficicações da gem.](https://github.com/SauloSilva/sinatra-active-model-serializers#requirements)