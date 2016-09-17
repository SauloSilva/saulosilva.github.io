---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 1 minutos e meio
title: Git fixup com autosquash
description: Git fixup com autosquash irá te ajudar a manter sua árvore de commit mais limpa e organizada
long_description: Quem nunca fez algum commit com as descrição fix bug, Fix a typo, Fix whatever e minutos ou horas depois precisou limpar estas mensagens? A pouco tempo atrás eu aprendi a utilizar dois comandos muito úteis para resolver essa situação, são eles git fixup com autosquash
has_preview: true
category: git
tags: [git, fixup, autosquash, commit]
comments: true
image_big: posts/git/git-fixup-com-autosquash-big.png
image_thumb: posts/git/git-fixup-com-autosquash-thumb.png
permalink: git/git-fixup-com-autosquash
---

> **Dica importante:** Mantenha sua árvore de commit limpa usando `git fixup com autosquash`

Quem nunca fez algum commit com as seguinte descrições: "fix bug",
"Fix a typo", "Fix whatever" e minutos você precisou limpar estas mensagens.

Tempos atrás eu aprendi a utilizar dois comandos muito úteis para resolver essa situação, são eles: [`git commit --fixup`](https://git-scm.com/docs/git-commit) e [`git rebase --autosquash`](https://git-scm.com/docs/git-rebase).

Com estes dois comandos fica fácil juntar vários commits de `fixup` ao commit original e manter o seu histórico de commits limpo e organizado.

#### Como utilizar **`--fixup`** e **`--autosquash`**

- `git add .` adicina todos os arquivos a serem commitados
- `git commit --fixup <id-do-commit>` indica para qual commit de `fixup` irá se direcionar
- `git rebase -i -autosquash <id-do-commit-anterior>` reorganiza a arvóre de commit, associando os `fixup` com o commits originais

#### Exemplo

Imagine um respositório qualquer que tenha um branch nomeada como `dev`. Neste branch temos dois commits em nossa arvóre:

```bash
$ (dev) git add feature1
$ (dev) git commit -m "Feature 1 is done"

[dev 1111111] Feature 1 is done

$ (dev) git add feature2
$ (dev) git commit -m "Feature 2 is done"

[dev 2222222] Feature 2 is done
```

Ao continuar o nosso trabalho encontramos alguns erros feitos nos arquivos que foram commitados como `feature1`: então chegou a hora de usar a opção `--fixup`

```bash
$ (dev) git add feature1
$ (dev) git commit --fixup 1111111

[dev 3333333] fixup! Feature 1 is done
```

Aqui podemos observar que o GIT recuperou a mensagem de commit do feature1 e aplicou um prefixo `fixup!`

Vamos dar uma olhada no nosso histórico de commits:

```bash
$ (dev) git log --oneline

3333333 fixup! Feature 1 is done
2222222 Feature 2 is done
1111111 Feature 1 is done
0000000 Previous commit
```

Agora precisamos juntar o commit de fixup com o commit original. Chegou a hora de usar o `autosquash`.

```bash
$ (dev) git rebase -i --autosquash 0000000

pick 1111111 Feature 1 is done
pick 2222222 Feature 2 is done
fixup 333333 fixup! Feature 1 is done
```

O comando acima abre o seu editor padrão com as linhas acima. Apenas salve e saia sem alterar nada.

Feito isto, vamos ver como a árvore de commits ficou:

```bash
$ (dev) git log --oneline

2222222 Feature 2 is done
1111111 Feature 1 is done
0000000 Previous commit
```

Perfeito! Agora todos aqueles commits de fixup foram mesclados juntos com os commits originais, sem demandar muito esforço.

É claro que existe outras maneiras de obter o mesmo resultado como mostrado aqui, mas de todas as maneiras que conheço este é o fluxo mais fácil e correto de se fazer.
