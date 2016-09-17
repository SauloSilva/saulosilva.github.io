---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 2 minutos
title: Git clean up - Saulo Santiago
description: Saiba como limpar seus branchs obsoletos usando git  clean up.
long_description: Depois de um certo tempo trabalhando com branchs em um repositório Git, os branchs torna-se desatualizados e confusos. Sendo assim irei mostrar a vocês como manter as branchs organizadas de uma forma simples e fácil.

has_preview: true
category: git
tags: [git, clean-up, cleaner, limpeza]
comments: true
image_big: posts/git/git-clean-up-big.png
image_thumb: posts/git/git-clean-up-thumb.png
permalink: git/git-clean-up
---

Depois de um certo tempo trabalhando com `branchs` em um repositório **Git**, os `branchs` tornam-se desatualizados e confusos. Sendo assim temos três tipos de `branchs` para verificarmos:

- **Branchs locais:** Muito utilizadas no dia a dia
- **Referências para branchs remotas:** Itens como `origin/branch-name`
- **Branchs remotas:** Branchs no servidor remoto (Ex: Github, Bitbucket, Gitorius)

Neste tutorial vou supor que sua `branch` principal seja a `master`.
Todos as `branchs` (`develop`, `release` entre outras) são mescladas na `branch` principal.

## Branchs locais

Vamos listar todas as `branchs` locais:

```
git branch
```

Nós podemos listar todas as `branchs` que já foram mescladas com a `branch` principal da seguinte maneira:

```
git checkout master
git branch --merged
```

E para remover as `branchs` locais que já foram mescladas, basta executar este comando:

```
git branch -d name-your-branch-merged
```

Em seguida podemos listar todas as `branchs` que ainda não foram mescladas com a `branch` principal:

```
git branch --no-merged
```

Caso alguma `branch` listada tenha sido abandonada, você pode simplemente deletá-la com a opção `-D`:

```
git branch -D name-your-branch-abandoned
```

## Referências para branchs remotas

Após executar `git pull` ou `git fetch` o **Git** cria referências das `branchs` remotas no repositório local, mas as referências que já foram deletadas remotamente não são removidas localmente, sendo assim, há possibilidades das `branchs` locais ficarem obsoletas.

Liste todas as `branchs` remotas:

```
git branch -r
```

Para limpar todas as referências antigas, basta executar:

```
git remote prune origin
```

## Dicas

É sempre bom se manter atualizado com o repositório online:

```
git fetch -p
```

Mas não se esqueça de inserir a opção `-p`, ela resolve os problemas das `branchs` que ficaram obsoletas ao atualizar as referencias remotas com as locais.
E para remover todas as `branchs` locais que já foram mergeadas, com apenas um comando, execute:

```
git branch --merged | grep -v "\*" | grep -v master | grep -v dev | xargs -n 1 git branch -d
```

Este comando é grande para memorizar ou ficar digitando sempre. Para facilitar basta criar um arquivo binário da seguinte maneira:

**Se estiver em um OSx**

```bash
sudo wget -O /bin/git-clean-up https://gist.githubusercontent.com/SauloSilva/4b13902db1135849a8c9/raw/8febb88a14fc9f09c9235e4f1749301e8fd81e33/git-clean-up
sudo chmod +x /bin/git-clean-up
```

**Se estiver no Linux**

```bash
sudo wget -O /usr/bin/git-clean-up https://gist.githubusercontent.com/SauloSilva/4b13902db1135849a8c9/raw/8febb88a14fc9f09c9235e4f1749301e8fd81e33/git-clean-up
sudo chmod +x /usr/bin/git-clean-up
```

Da próxima vez que precisar fazer uma limpeza é so executar:

```
git clean-up
```

ou

```
git clean-up name-your-main-branch
```

Sendo assim ficou simples manter as `branchs` organizadas.
