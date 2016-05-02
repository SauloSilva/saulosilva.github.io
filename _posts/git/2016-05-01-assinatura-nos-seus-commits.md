---
layout: post
author_name: Saulo Santiago
author_email: saulodasilvasantiago@gmail.com
read_time: 4 minutos
title: Assinatura no seus commits
description: Assine seus commits e garanta a autenticidade deles.
long_description: Git é seguramente criptografado, mas não é infalível. Se vocês estiver submetendo seus commits de uma rede de internet não confiável e quer ter a certeza de que seus commits esta vindo de uma fonte confiável, o Git tem a opção de assinar e verificar seus commits utilizando-se de chave GPG.
has_preview: true
category: git
tags: [git, signing, GPG, commits, tags, Github]
comments: true
image_big: posts/git/assinatura-nos-seus-commits-big.png
image_thumb: posts/git/assinatura-nos-seus-commits-thumb.png
permalink: git/assinatura-nos-seus-commits
---

Git é seguramente criptografado, mas não é infalível. Se tu estiver submetendo seus commits de uma rede de internet não confiável e quer ter a certeza de que seus commits esta vindo de uma fonte confiável, o Git tem a opção de assinar e verificar seus commits utilizando-se de chave GPG.

## O que é GPG ou GnuPG

[GnuPG](https://www.gnupg.org/index.html) é uma implementação completa e gratuíta do padrão OpenPGP definido por [RFC4880 (conhecido também como PGP)](http://www.ietf.org/rfc/rfc4880.txt).

GnuPG permite criptografar e assinar seus dados e comunicações, possui um sistema de gerenciamento de chaves versáteis, bem como módulos de acessos para todos os tipos de diretórios de chave pública. **GnuPG é conhecido também como GPG** e possui uma linha de comando para facilitar a integração com outras aplicações.

[GPG possui uma GUI](https://www.gnupg.org/download/index.html) para quem não se sente confortável utilizando linhas de comandos.

## Gerando uma nova chave GPG

Irei mostrar passo a passo de como gerar uma chave GPG utilizando o terminal, isso é bem fácil, então vamos lá:

- Primeiro instale o pacote do GPG em seu sistema operacional, se estiver no OSx e utiliza o Homebrew, execute `brew install gpg`. Se estiver no Linux utilize o `apt-get install gnupg`

- Execute `gpg --gen-key` em seu terminal para começar o processo de criação da chave GPG

- Depois de rodar o comando listado acima, você começará a receber várias perguntas a fim de customizar sua configuração de sua chave, recomendo deixar tudo no padrão.

- Pressione `ENTER` para aceitar o padrão `RSA and RSA`

- Pressione `ENTER` para aceitar o padrão do tamanho da chave `4096`

- Pressione `ENTER` para aceitar que a chave não tenha data de expiração

- Coloque o nome que você utiliza em seus commits. **Digite o mesmo nome que está no seu `~/.gitconfig`**

- Coloque o e-mail que você utiliza em seus commits. **Digite o mesmo nome que está no seu `~/.gitconfig`**

- Digite uma frase de segurança ou apenas pressione `ENTER`

- Confirme a geração da chave

- Com a chave gerada agora é preciso listar utilizando este comando `gpg --list-keys`. Algo parecido com o exemplo abaixo aparecerá para você. Toda chave possui um ID, e este ID é importante para requisitarmos o valor da chave. O ID pode ser identificado na linha que inicia com `pub` (que significa pública), no caso deste exemplo o ID é **`A8F99211`**

```
/Users/hubot/.gnupg/pubring.gpg
------------------------------------
pub   4096R/A8F99211   2016-04-05
uid                  Hubot
sub   4096R/Z832QR89 2016-04-05
```

- Cole o ID de sua chave no seguinte comando `gpg --armor --export A8F99211`, lembre-se que no seu computador este ID sempre será diferente. Este comando mostrará o conteúdo de sua chave

- Copie o valor de sua chave GPG pública que começa com `-----BEGIN PGP PUBLIC KEY BLOCK-----` e termina com `-----END PGP PUBLIC KEY BLOCK-----`

### Adicionando sua chave pública GPG no Github

O [Github](https://github.com/) a algum tempo suporta assinar os commits. Para que isto seja possível tu tem que adicionar o coneúdo desta chave nas configurações de seu perfil no Github.
Isto é relativamente fácil.

- Na lado direito de cima da página do Github, clique em sua foto do perfil e depois clique em [`Settings`](https://github.com/settings/profile).

<img data-original="{{ 'posts/git/assinatura-nos-seus-commits/github-account-settings.png' | asset_path }}" alt="print do menu de configurações do Github" class='lazy' height='400px'/>

- Nas configurações de usuário na barra lateral, clique em [`SSH and GPG keys`](https://github.com/settings/keys)

<img data-original="{{ 'posts/git/assinatura-nos-seus-commits/github-settings-sidebar-ssh-keys.png' | asset_path }}" alt="print do sidebar da tela de configurações do Github" class='lazy'/>

- Clique em [`New GPG key`](https://github.com/settings/keys)

<img data-original="{{ 'posts/git/assinatura-nos-seus-commits/github-gpg-add-gpg-key.png' | asset_path }}" alt="print do sidebar da tela de configurações do Github" class='lazy'/>

- No campo `key` cole o valor copiado de sua chave GPG

<img data-original="{{ 'posts/git/assinatura-nos-seus-commits/github-gpg-key-paste.png' | asset_path }}" alt="print do sidebar da tela de configurações do Github" class='lazy' width='500px'/>

- Clique em `Add GPG key` e confirme sua senha so Github para finalizar a adição

<img data-original="{{ 'posts/git/assinatura-nos-seus-commits/github-gpg-add-key.png' | asset_path }}" alt="print do sidebar da tela de configurações do Github" class='lazy'/>

### Configurando seu Git global

Agora é preciso atualizar seu `~/.gitconfig` para utilizar o ID da sua chave GPG também.

Isto é muito simples, basta executar `git config --global user.signingkey <seu ID>`

### Assinando seus commits

Agora que tu tens sua chave GPG criado, adicionada ao Github e configurado no `~/.gitconfig`, então basta utiliza-lá na geração de seus commits ou tags.

**Criando commits com assinatura**

```
git add .
git commit -a -S -m 'my commit'
git push
```

Note que é preciso apenas adicionar o parâmetro `-S` no comando de commit para isto funcionar.

**Criando tags com assinatura**

```
git tag -s v1.5 -m 'my signed 1.5 tag'
```

Note que é preciso apenas adicionar o parâmetro `-s` (em minúsculo) no comando para criar tags assinadas.

Para ter certeza de que tudo funcionou basta ir no histórico de commits no seu repositório no Github e notar que seus commits agora ficaram com um indicador de que esta verificado.

<img data-original="{{ 'posts/git/assinatura-nos-seus-commits/commit-with-gpg.png' | asset_path }}" alt="commit assinado no histórico do Github" class='lazy'/>

<img data-original="{{ 'posts/git/assinatura-nos-seus-commits/commit-with-gpg-detail.png' | asset_path }}" alt="detalhe da assinatura do commit no Github" class='lazy' width='300px'/>
