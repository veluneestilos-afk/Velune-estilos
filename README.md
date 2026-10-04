# VELUNE | Contemporary Essentials

Loja virtual da VELUNE. Estilo. Presença. Identidade.

O site roda em um pequeno servidor Node (sem dependências). Os produtos cadastrados no painel ficam salvos no servidor, então **não precisa mais enviar arquivo pro GitHub a cada mudança**.

## Arquivos

- `index.html`: o site completo
- `server.js`: servidor que serve o site e guarda os produtos
- `package.json`: diz ao Railway como iniciar

## Configurar no Railway (uma única vez)

1. Envie `index.html`, `server.js` e `package.json` para o repositório.
2. No Railway, abra o serviço e vá em **Variables**. Crie:
   - `ADMIN_PASSWORD` = a senha que você quiser para publicar
   - `DATA_DIR` = `/data`
3. Em **Volumes** (ou clique direito no serviço > Add Volume), crie um volume com o caminho de montagem `/data`. Sem o volume, os produtos somem quando o Railway reiniciar.
4. Aguarde o deploy terminar.

## Usar o painel

1. Abra o site com `?admin` no final do endereço.
2. Toque em **Painel do dono**, cadastre os produtos e toque em **Publicar**.
3. Digite a senha. Pronto: os clientes já veem as mudanças.

Tinha produtos em um `index.html` baixado antes? No painel, use **Importar produtos de um index.html baixado antes** e depois toque em **Publicar**.
