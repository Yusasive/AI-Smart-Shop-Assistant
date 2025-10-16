/**
 * Content script (TypeScript)
 * Runs on supported e-commerce pages, scrapes basic product info and sends to service worker.
 * Keep scraping rules minimal and respectful; for production, add robust selectors per site.
 */

function getProductInfo() {
  try {
    const title = (document.querySelector('h1')?.textContent || '') .trim();
    // basic attempt to get price
    const price = (document.querySelector('[id*=price], [class*=price]')?.textContent || '').trim();
    const description = (document.querySelector('#productDescription, #feature-bullets, .product-description')?.textContent || '').trim();
    // Collect first few visible reviews
    const reviews = Array.from(document.querySelectorAll('.review-text, .review-content, .a-size-base.review-text'))
      .slice(0, 6)
      .map(el => el.textContent?.trim() || '')
      .filter(Boolean);

    return { title, price, description, reviews, url: location.href };
  } catch (e) {
    return { title: '', price: '', description: '', reviews: [], url: location.href };
  }
}

const product = getProductInfo();
// send to background/service worker
if ((window as any).chrome?.runtime) {
  (window as any).chrome.runtime.sendMessage({ type: 'SCRAPED_PRODUCT', product });
}
