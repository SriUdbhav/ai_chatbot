const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

const viewports = [
  { width: 320, height: 640, name: '320x640' },
  { width: 375, height: 812, name: '375x812' },
  { width: 390, height: 844, name: '390x844' },
  { width: 768, height: 1024, name: '768x1024' },
  { width: 1024, height: 768, name: '1024x768' },
  { width: 1366, height: 768, name: '1366x768' },
  { width: 1920, height: 1080, name: '1920x1080' }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Launching headless Chrome with remote debugging on port ' + PORT + '...');
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=' + PORT,
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  let connected = false;
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      targets = await getJson(`http://127.0.0.1:${PORT}/json`);
      if (targets && targets.length > 0) {
        connected = true;
        break;
      }
    } catch (e) {}
  }

  if (!connected) {
    console.error('Failed to connect to Chrome CDP.');
    chromeProcess.kill();
    process.exit(1);
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  console.log('Target found:', pageTarget.title, pageTarget.webSocketDebuggerUrl);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(res => ws.on('open', res));

  let msgId = 1;
  const pending = new Map();

  ws.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  });

  function send(method, params = {}) {
    const id = msgId++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Enable Page and Runtime
  await send('Page.enable');
  await send('Runtime.enable');

  console.log('Navigating to http://localhost:3000...');
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await sleep(1500);

  const results = [];

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 900
    });
    await sleep(400);

    // Evaluate layout metrics
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        const bodyW = document.body.scrollWidth;
        const topbar = document.querySelector('.chat-topbar');
        const topbarW = topbar ? topbar.scrollWidth : 0;
        const topbarActions = document.querySelector('.topbar-actions');
        const topbarActionsW = topbarActions ? topbarActions.scrollWidth : 0;
        const sidebar = document.querySelector('.sidebar');
        const sidebarDisplay = sidebar ? window.getComputedStyle(sidebar).display : 'none';
        const sidebarTransform = sidebar ? window.getComputedStyle(sidebar).transform : '';
        const studyPanel = document.querySelector('.study-panel');
        const studyPanelTransform = studyPanel ? window.getComputedStyle(studyPanel).transform : '';
        const composer = document.querySelector('.composer-area');
        const composerBottom = composer ? composer.getBoundingClientRect().bottom : 0;
        const composerH = composer ? composer.offsetHeight : 0;
        const titleEl = document.getElementById('topbarTitle');
        const titleW = titleEl ? titleEl.offsetWidth : 0;
        const titleH = titleEl ? titleEl.offsetHeight : 0;

        return {
          winW,
          docW,
          bodyW,
          hasHOverflow: docW > winW || bodyW > winW,
          overflowAmount: Math.max(docW - winW, bodyW - winW),
          topbarW,
          topbarActionsW,
          sidebarDisplay,
          sidebarTransform,
          studyPanelTransform,
          composerBottom,
          composerH,
          titleW,
          titleH
        };
      })()`,
      returnByValue: true
    });

    const metrics = evalRes.result.value;
    results.push({ ...vp, ...metrics });
    console.log(`Viewport ${vp.name}: innerWidth=${metrics.winW}, docScrollWidth=${metrics.docW}, overflow=${metrics.hasHOverflow ? '+' + metrics.overflowAmount + 'px OVERFLOW!' : 'None (OK)'}, topbarActionsW=${metrics.topbarActionsW}px`);
  }

  ws.close();
  chromeProcess.kill();
  console.log('\n--- Summary Table ---');
  console.table(results.map(r => ({
    Viewport: r.name,
    Width: r.winW,
    ScrollWidth: r.docW,
    H_Overflow: r.hasHOverflow ? `YES (+${r.overflowAmount}px)` : 'NO',
    TopbarActionsW: r.topbarActionsW,
    ComposerH: r.composerH,
    TitleH: r.titleH
  })));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
