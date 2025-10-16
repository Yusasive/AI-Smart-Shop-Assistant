/**
 * Service worker (TypeScript) for background tasks, context menu, and calling Chrome AI APIs.
 * NOTE: This file contains placeholder pseudo-code for Chrome AI API calls. Replace with actual API calls.
 */

declare const chrome: any;

// Context menu to summarize current product
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'summarize-product',
    title: 'Summarize Product (AI)',
    contexts: ['page', 'selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'summarize-product' && tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // trigger content script scraping by sending a message to the page
        (window as any).postMessage({ type: 'TRIGGER_SCRAPE' }, '*');
      }
    });
    // also request product data via message
    chrome.tabs.sendMessage(tab.id, { type: 'REQUEST_SCRAPE' });
  }
});

// receive messages from content script
chrome.runtime.onMessage.addListener(async (msg: any, sender: any, sendResponse: any) => {
  if (msg?.type === 'SCRAPED_PRODUCT') {
    const product = msg.product;
    // Use Chrome AI built-in APIs here.
    // PSEUDOCODE:
    // const summary = await chrome.ai.summarizer.summarize(product.description + product.reviews.join('\n'));
    // const prosCons = await chrome.ai.writer.prosCons(product.reviews.join('\n'));
    // const language = await chrome.ai.lang.detect(product.description);
    // const trust = await chrome.ai.geminiNano.classifyScamSignals(product);

    // For now produce simple heuristic placeholders:
    const summary = product.description?.slice(0, 600) || product.title || 'No summary available';
    const pros = product.reviews?.slice(0,3).join(' | ') || 'No pros detected';
    const cons = product.reviews?.slice(3,6).join(' | ') || 'No cons detected';
    const trust = computeSimpleTrustScore(product);

    // store latest product summary in chrome.storage
    chrome.storage.local.set({ latestProduct: { url: product.url, summary, pros, cons, trust } });

    // broadcast to side panel via clients (postMessage to service worker clients)
    const clients = await (globalThis as any).clients.matchAll();
    for (const client of clients) {
      client.postMessage({ type: 'PRODUCT_DATA', url: product.url, summary, pros, cons, trust });
    }
    sendResponse({ status: 'ok' });
  } else if (msg?.type === 'REQUEST_PRODUCT_DATA') {
    const state = await new Promise(resolve => chrome.storage.local.get('latestProduct', resolve));
    sendResponse(state.latestProduct || null);
  }
  return true;
});

// Simple heuristic trust score (placeholder)
function computeSimpleTrustScore(product: any) {
  let score = 100;
  if (!product.reviews || product.reviews.length < 2) score -= 40;
  if (!product.description || product.description.length < 80) score -= 20;
  // suspicious keywords
  const text = (product.title + ' ' + product.description).toLowerCase();
  const suspicious = ['guarantee', 'click here', 'contact us', 'discount code', 'limited offer'];
  suspicious.forEach(k => { if (text.includes(k)) score -= 10; });
  return score >= 0 ? score : 0;
}
