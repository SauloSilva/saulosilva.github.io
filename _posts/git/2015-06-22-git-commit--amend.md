---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 2 minutos
title: Git commit --amend - Saulo Santiago
description: Git commit --amend é um comando para reescrever a história de um commit

long_description: É bem comum esquecer de adicionar alguma informação/arquivo no commit ou submeter um commit com uma mensagem errada. A flag --amend é o jeito mais conveniente de voltar atrás e corrigir isto sem precisar de muito esforço.

has_preview: true
category: git
tags: [git, commit, amend, reescrever história]
comments: true
image_big: posts/git/git-commit--amend-big.png
image_thumb: posts/git/git-commit--amend-thumb.png
permalink: git/git-commit--amend
---

O trabalho principal do **Git** é garantir que nenhuma informação seja perdida.
Ele foi projetado para fornecer total liberdade no fluxo de trabalho. Isso significa que podemos ter a liberdade para definir o que queremos em nosso histórico de _commits_.

Para que isto seja possível o Git oferece um comando para reescrever os _commits_ anteriores.
Neste tutorial irei discutir o principal motivo para se reescrever a história de um _commit_, juntamente com algumas dicas.

#### Discussão

É bem comum esquecer de adicionar alguma informação/arquivo no _commit_ ou submeter um _commit_ com uma mensagem errada. A _flag_ `--amend` é o jeito mais conveniente de voltar atrás e corrigir isto sem muito esforço.

#### Reescrevendo a história

```
git add .
git commit --amend
git push origin -f <your_branch>
```

Essa técnica combina o envio de conteúdos que ainda não foram adicionados ao Git utilizando o último _commit_ ao invés de criar uma nova _snapshot_, tendo a possibilidade de alteração da messagem do _commit_ anterior.

#### Exemplo

Vejamos o exemplo abaixo, o cenário onde ocorre é em development. Suponhamos que foi criado dois arquivos, mas na hora de adicionar ao Git um dos arquivos foram esquecidos.

A solução foi utilizar a _flag_ `--amend`.

```
# Criou foo.rb e bar.rb mas adicionou somente o foo.rb e commitou
touch foo.rb bar.rb

git add foo.rb
git commit

# Adicionou as mudanças esquecidas de bar.rb fez o amend e commitou
git add bar.rb
git commit --amend --no-edit
git push origin -f any_branch
```

O resultado disso é fazer com que as alterações atuais façam parte do _commit_ anterior.

A _flag_ `--no-edit` tira a possilidade de editar da mensagem do _commit_; caso ao contrário o editor padrão é aberto com a mensagem do _commit_ anterior. Nesta etapa existe a possilidade de alteração da mensagem.

#### Dica

Estes três comandos de: adicionar, amend e commit, podem serem resumidos em apenas um comando.
Para que isto seja possível é necessário inserir um [arquivo de bash](https://gist.github.com/SauloSilva/372f77fecfce995715d6) que fiz dentro da pasta binária de seu sistema:

**Se for Mac**

```bash
sudo wget -O /bin/git-amend https://gist.githubusercontent.com/SauloSilva/372f77fecfce995715d6/raw/25b4da0cbbf4a81cd30aa40e9adb24678f23fbdc/git-amend
sudo chmod +x /bin/git-amend
```

**Se for Linux**

```bash
sudo wget -O /usr/bin/git-amend https://gist.githubusercontent.com/SauloSilva/372f77fecfce995715d6/raw/25b4da0cbbf4a81cd30aa40e9adb24678f23fbdc/git-amend
sudo chmod +x /usr/bin/git-amend
```

Da próxima vez que precisar fazer um _amend_ é so executar:

```
git amend
```

ou

```
git amend --no-edit
```

Simples não!?

#### Não use o `amend` para commits públicos

Não podemos utililizar o `amend` para resetar _commits_ de outros desenvolvedores.

_Commit_ alterado é considerado um _commit_ novo.
Por isso tome cuidado antes de executar este comando, pois você pode estar prejudicando outros desenvolvedores que estam se baseando no _commit_ alterado. Isto pode gerar confusões e vários problemas difíceis de se reverterem.
