# Pacote FS - Controle de Filiais/Vendedores (GitHub Pages)

## Arquivos (V2)
- fs_access_v2.html  -> tela de acesso/ativação (usuário final)
- fs_auth_v2.json    -> base de filiais/vendedores (você controla: bloquear filial/vendedor)
- fs_admin_v2.html   -> painel local para gerar/editar a base e links
- index.html         -> seu sistema principal (já existe no repo)

## Recomendação IMPORTANTÍSSIMA (evita 404)
Renomeie o repositório para **SEM ACENTOS**.
Ex.: `fs-contingencia-zenir` (sem "ê" e sem "ç").

Se você mantiver acento, copie a URL oficial em **Settings → Pages** e cole no campo “URL base do site” no fs_admin_v2.html.

## Como publicar
1) Suba estes arquivos na **raiz** do repositório (mesma pasta do `index.html`):
   - fs_access_v2.html
   - fs_auth_v2.json
   - (opcional) fs_admin_v2.html

2) Em **Settings → Pages**:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /(root)

3) Copie a URL que o GitHub mostra em “Your site is live at …” e use ela.

## Como cadastrar e gerar links
1) Abra `fs_admin_v2.html` no seu PC.
2) Cole a **URL base do seu site** no campo “URL base do site”.
3) Cadastre Filial + Vendedores (um por linha).
4) Clique “Baixar fs_auth_v2.json”.
5) Faça upload desse JSON no GitHub (substituindo o anterior).

## Links de ativação (envie para cada vendedor)
Exemplo:
`.../fs_access_v2.html?filial=28&user=flavio&key=ABC123`

Primeiro clique ativa o dispositivo.
Depois disso, ele entra só com filial + nome (sem senha).

## Bloquear / Desbloquear
- Para travar uma filial: status "INATIVA"
- Para travar um vendedor: status "INATIVO"

Atualizou o JSON no GitHub → regra vale pra todos.
