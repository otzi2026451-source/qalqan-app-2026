const http = require('http');
const handler = require('./chat.js');

const port = Number(process.env.PORT || process.env.BACKEND_PORT || 3001);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (url.pathname === '/api/chat' && req.method === 'POST') {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });

    req.on('end', async () => {
      try {
        const payload = raw ? JSON.parse(raw) : {};
        const fakeReq = { method: req.method, body: payload };
        const fakeRes = {
          statusCode: 200,
          headers: {},
          status(code) {
            this.statusCode = code;
            return this;
          },
          setHeader(name, value) {
            this.headers[name] = value;
            return this;
          },
          json(payload) {
            res.writeHead(this.statusCode || 200, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(JSON.stringify(payload));
            return this;
          }
        };

        await handler(fakeReq, fakeRes);
      } catch (error) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ error: 'Invalid JSON', details: String(error) }));
      }
    });
    return;
  }

  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ ok: true, service: 'qalqan-ai-backend' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, () => {
  console.log(`QALQAN AI backend running on http://localhost:${port}`);
});
