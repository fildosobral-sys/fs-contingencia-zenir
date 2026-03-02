# FS • Controle de Filiais/Vendedores (estático)

## O que subir no GitHub (raiz do repositório)
- index.html            (seu sistema principal)
- fs_access.html        (tela de ativação/entrada do vendedor)
- fs_auth.json          (base de filiais/vendedores)
- (opcional) fs_admin.html (painel local do gerente – pode ficar só no seu PC)

## IMPORTANTÍSSIMO (erro 404 do GitHub Pages)
No seu repo o branch padrão aparece como **principal** (não "main").
Então, em **Settings → Pages**, selecione:
- Source: Deploy from a branch
- Branch: principal
- Folder: /(root)

Se estiver apontando para main, vai dar 404 mesmo com arquivos corretos.

## Como administrar
1) Abra fs_admin.html no seu PC
2) Cole a URL oficial do Pages (Settings → Pages) no campo "URL base do site"
3) Cadastre filial + vendedores
4) Baixe fs_auth.json
5) Suba o fs_auth.json no GitHub (substituindo)

## Como enviar link
O fs_admin.html gera link assim:
.../fs_access.html?filial=28&user=flavio&key=ABC123

Primeiro clique ativa o dispositivo.
Depois entra só com Filial + Nome (sem senha).

## Bloquear
- Filial: status INATIVA
- Vendedor: status INATIVO
