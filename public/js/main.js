/**
 * AI Study Assistant - Client Application JavaScript
 * Proves static asset serving and asynchronous client-to-server communication.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎓 [AI Study Assistant] Client JS initialized successfully.');

  const pingBtn = document.getElementById('ping-btn');
  const pingResult = document.getElementById('ping-result');

  if (pingBtn && pingResult) {
    pingBtn.addEventListener('click', async () => {
      const startTime = performance.now();
      pingBtn.disabled = true;
      pingResult.innerHTML = '<span style="color: #a5b4fc;">Pinging server...</span>';

      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        const duration = Math.round(performance.now() - startTime);

        if (response.ok) {
          pingResult.innerHTML = `
            <span style="color: #10b981; font-weight: 600;">
              ✓ Connected (${duration}ms) &mdash; Uptime: ${data.uptime}s &mdash; ${data.message}
            </span>
          `;
        } else {
          pingResult.innerHTML = `
            <span style="color: #f43f5e;">
              Server returned error (${response.status})
            </span>
          `;
        }
      } catch (err) {
        console.error('Ping error:', err);
        pingResult.innerHTML = `
          <span style="color: #f43f5e;">
            Failed to connect to /api/status (${err.message})
          </span>
        `;
      } finally {
        pingBtn.disabled = false;
      }
    });
  }
});
