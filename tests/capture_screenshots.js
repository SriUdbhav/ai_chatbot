const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9227;

const viewports = [
  { w: 320, h: 640, file: 'scratch/screenshot_320x640.png' },
  { w: 375, h: 812, file: 'scratch/screenshot_375x812.png' },
  { w: 768, h: 1024, file: 'scratch/screenshot_768x1024.png' },
  { w: 1366, h: 768, file: 'scratch/screenshot_1366x768.png' }
];

async function run() {
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }

  const chrome = spawn(CHROME_PATH, ['--headless=new', '--remote-debugging-port=' + PORT, 'about:blank']);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((res, rej) => {
    http.get('http://127.0.0.1:' + PORT + '/json', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
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
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 1500));

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', { width: vp.w, height: vp.h, deviceScaleFactor: 1, mobile: vp.w < 900 });
    await new Promise(r => setTimeout(r, 400));
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(vp.file, Buffer.from(ss.data, 'base64'));
    console.log(`Saved: ${vp.file} (${vp.w}x${vp.h})`);
  }

  ws.close();
  chrome.kill();
  console.log('All screenshots captured successfully.');
}

run().catch(console.error);
