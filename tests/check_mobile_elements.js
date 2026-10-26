const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9224;

async function run() {
  const chrome = spawn(CHROME_PATH, ['--headless=new', '--remote-debugging-port=' + PORT, 'http://localhost:3000']);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + PORT + '/json', res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));

  let id = 1;
  function send(method, params = {}) {
    return new Promise(r => {
      const cur = id++;
      const handler = m => {
        const res = JSON.parse(m);
        if (res.id === cur) {
          ws.off('message', handler);
          r(res.result);
        }
      };
      ws.on('message', handler);
      ws.send(JSON.stringify({ id: cur, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 1500));
  const info = await send('Runtime.evaluate', { expression: '({ url: location.href, title: document.title, topbar: !!document.querySelector(".topbar-actions") })', returnByValue: true });
  console.log('Page info:', info.result.value);

  for (const w of [320, 375, 390, 768]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 700, deviceScaleFactor: 1, mobile: w < 900 });
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const els = Array.from(document.querySelectorAll('.topbar-left, .topbar-left > *, .topbar-actions > *'));
        return els.map(el => {
          const r = el.getBoundingClientRect();
          return {
            id: el.id || el.className,
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            isOffscreen: r.right > ${w}
          };
        });
      })()`,
      returnByValue: true
    });
    console.log(`\n=== Viewport width: ${w}px ===`);
    console.table(res.result.value);
  }

  ws.close();
  chrome.kill();
}

run().catch(console.error);
