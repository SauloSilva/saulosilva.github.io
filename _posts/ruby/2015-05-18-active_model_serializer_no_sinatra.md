---
layout: post
title: ActiveModel Serializer no sinatra
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 8 minutos
description: Adaptando o active model serializer para o Sinatra.

long_description: Atualmente o ActiveModelSerializer so fornece suporte para Rails. Neste post irei dar uma dica de como solucionar este problema para quando estiver utilizando o Sinatra. Esta solução é simples e rápida. Basta adicionar ao seu Gemfile a gem <a href='https://github.com/SauloSilva/sinatra-active-model-serializers/' target='_blank'>sinatra-active-model-serializers.</a>

category: [ruby, highlights]
tags: [ruby]
comments: true
image_big: posts/ruby/active-model-serializer-no-sinatra-big.png
image_thumb: posts/ruby/active-model-serializer-no-sinatra-thumb.png
permalink: ruby/active-model-serializer-no-sinatra
---


A [`gem ActiveModel::Serializers`](https://github.com/rails-api/active_model_serializers) pode ajudá-lo a construir **APIs JSON** através de objetos serializados. 

Isso fornece um lugar dedicado para personalizar totalmente a saída do `JSON`. Para cada objeto que queremos serializar devemos criar um serializer que estende da classe `ActiveModel::Serializer`.

Imagine que seu `controller` recebe um objeto com a seguinte estrutura:

```ruby
#<Foo id: 1, foo: "foo", bar: "bar", baz: "baz">
```

Mas você não esta satisfeito em devolver todos atributos como resposta na `request`. Qual a solução para isto?

A solução é criar um serializer com o nome do objeto adicionando o sufixo `Serializer` no final. No nosso caso irei definir que somente atributo `bar` será retornado. Nosso serializer ficará assim:

```ruby
class FooSerializer < ActiveModel::Serializer
  attributes :bar
end
```

Temos nosso objeto, temos o serializer mas como faremos para que isto funcione?

Pois bem, se estiver utilizando o **framework Rails** basta fazer um retorno do tipo json:

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

Perfeito, era isto que queriamos. Mas você pode esta se perguntando como isso funcionou? Mágia? Algum tipo de bruxaria?

Não, não existe mágia nem mesmo bruxaria para isto. A `gem` define que todos os [renders](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/action_controller/serialization.rb#L48) do tipo json [procure pelo serializer](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/action_controller/serialization.rb#L71) que tenha o mesmo nome do objeto e logo após encontrar faz a [instância desta classe](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/action_controller/serialization.rb#L95).

Genial, não? 

Se sua resposta foi sim, concordo plenamente contigo. Mas pena que isto só funciona para o Rails. 

Mas calma que para quase tudo tem solução.

## Solução para o Sinatra

Meses atras passei por esta dificuldade. Precisei utilizar o `ActiveModel::Serializers` mas tive problemas em deixar tudo automatico como ocorre no Rails.

O problema esta que no Sinatra não suporta a classe `ActionController`, sendo assim é lançado um erro `cannot load such file -- action_controller (LoadError)` ao tentar carregar, porém este erro é [tratado](https://github.com/rails-api/active_model_serializers/blob/v0.9.3/lib/active_model_serializers.rb#L18-L20) para que nossa aplicação não pare de funcionar.

Isso faz com que o `render` não funcione de forma automatica, mas não impede a funcionalidade dos serializers, sendo assim devemos utilizar da seguinte forma:

```ruby
get '/foo/:id' do
  foo = Foo.find(params[:id])
  json FooSerializer.new(foo).to_json
end
```

Não podemos dizer que isto não seja uma solução, mas se você achou que da pra melhorar, concordo contigo.

Vendo a necessidade de melhoras, criei esta [`gem sinatra-active-model-serializers`](https://github.com/SauloSilva/sinatra-active-model-serializers/) para deixar tudo isso automatico no Sinatra assim como é no Rails.

E o resultado disto ficou:

```ruby
get '/foo/:id' do
  json Foo.find(params[:id])
end
```

Esta `gem` aplica a lógica de controller feita pro Rails no módulo [`JSON`](https://github.com/SauloSilva/sinatra-active-model-serializers/blob/v0.0.3/lib/sinatra-active-model-serializers/json.rb#L4) do Sinatra.

#### Quer saber mais sobre a `gem`? 

[Leia as espeficicações.](https://github.com/SauloSilva/sinatra-active-model-serializers#requirements)

#### Quer contribuir com melhorias?

Abra uma [Issue com ou sem Pull Request](https://github.com/SauloSilva/sinatra-active-model-serializers/issues/new), comentando qual é a melhoria a ser feita. Ficarei muito grato pela sua contribuição.