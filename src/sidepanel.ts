/**
 * Side panel entry script (TypeScript)
 * This file is compiled/bundled to dist/sidepanel.js
 *
 * Note: Chrome built-in AI APIs usage is represented with placeholders and comments.
 * Replace placeholder calls with the actual Chrome AI APIs when available.
 */

async function init() {
  const siteUrlEl = document.getElementById('site-url')!;
  const summaryTextEl = document.getElementById('summary-text')!;
  const prosEl = document.getElementById('pros')!;
  const consEl = document.getElementById('cons')!;
  const trustBadgeEl = document.getElementById('trust-badge')!;

  // Listen for messages from the service worker / content script
  navigator.serviceWorker?.addEventListener('message', (evt) => {
    const msg = evt.data;
    if (msg?.type === 'PRODUCT_DATA') {
      siteUrlEl.textContent = msg.url || 'Unknown';
      summaryTextEl.textContent = msg.summary || 'No summary yet';
      prosEl.textContent = 'Pros: ' + (msg.pros || '—');
      consEl.textContent = 'Cons: ' + (msg.cons || '—');
      trustBadgeEl.textContent = msg.trust || '—';
    }
  });

  // Request product data from the background/service worker
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'REQUEST_PRODUCT_DATA' });
  } else {
    // fallback to chrome.runtime messaging
    if ((window as any).chrome?.runtime) {
      (window as any).chrome.runtime.sendMessage({ type: 'REQUEST_PRODUCT_DATA' });
    }
  }
}

init();
