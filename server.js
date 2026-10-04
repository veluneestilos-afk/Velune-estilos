// Servidor da loja VELUNE: serve o site e guarda os produtos no servidor.
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 3000;
const DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const FILE = path.join(DIR, 'data.json');
const PW = process.env.ADMIN_PASSWORD || '';
fs.mkdirSync(DIR, { recursive: true });

const send = (res, code, body, type) => { res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(body); };

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/api/data') {
    if (req.method === 'GET') return fs.readFile(FILE, (e, b) => send(res, 200, e ? '{}' : b, 'application/json'));
    if (req.method === 'POST') {
      if (!PW || req.headers['x-admin-password'] !== PW) return send(res, 401, 'senha incorreta');
      const chunks = []; let n = 0;
      req.on('data', c => { n += c.length; if (n > 90e6) { send(res, 413, 'grande demais'); req.destroy(); } else chunks.push(c); });
      req.on('end', () => {
        try {
          const j = JSON.parse(Buffer.concat(chunks).toString());
          if (!Array.isArray(j.p)) throw new Error('formato');
          fs.writeFileSync(FILE + '.tmp', JSON.stringify(j));
          fs.renameSync(FILE + '.tmp', FILE);
          send(res, 200, 'ok');
        } catch (e) { send(res, 400, 'dados invalidos'); }
      });
      return;
    }
    return send(res, 405, '');
  }
  if (url === '/' || url === '/index.html') return fs.readFile(path.join(__dirname, 'index.html'), (e, b) => e ? send(res, 500, 'erro') : send(res, 200, b, 'text/html; charset=utf-8'));
  if (url === '/assets/logo.png') return fs.readFile(path.join(__dirname, 'assets', 'logo.png'), (e, b) => e ? send(res, 404, '') : send(res, 200, b, 'image/png'));
  send(res, 404, '<meta http-equiv="refresh" content="0; url=/"><p>Página não encontrada. <a href="/">Voltar para a loja</a></p>', 'text/html; charset=utf-8');
}).listen(PORT, () => console.log('VELUNE no ar na porta ' + PORT + (PW ? '' : ' (ATENCAO: defina ADMIN_PASSWORD)')));
