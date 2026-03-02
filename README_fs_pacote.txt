# Pacote FS - Controle de Filiais/Vendedores (estático)

## Arquivos
- fs_access.html  -> tela de acesso/ativação (usuário final)
- fs_auth.json    -> base de filiais/vendedores (você edita no GitHub)
- fs_admin.html   -> painel local para gerar/editar o fs_auth.json (rodar no seu PC)

## Como publicar
1) No seu repositório do GitHub Pages, coloque estes arquivos na MESMA pasta:
   - fs_access.html
   - fs_auth.json
   - (se quiser) fs_admin.html (recomendado manter fora do público; mas pode deixar também)

2) Defina o app principal no fs_auth.json:
   - "appUrl": "index.html"
   Coloque seu sistema principal com esse nome (ou ajuste para o nome real).

## Como enviar o link para o vendedor
Use o fs_admin.html para gerar links.
O link fica assim:
  .../fs_access.html?filial=28&user=flavio&key=ABC123

Primeiro clique ativa o dispositivo.
Depois disso, ele entra só com filial + nome (sem senha).

## Bloquear/Desbloquear
- Para travar uma filial: status "INATIVA"
- Para travar um vendedor: status "INATIVO"
Após atualizar o fs_auth.json no GitHub, todo mundo pega a nova regra.

## Observação de segurança
É um controle prático para operação (não é segurança bancária).
Como é estático, o controle real vem do fato de você gerenciar a base e revogar quando precisar.
