# TRD: AI Smart Shopping Assistant

## Architecture
- Chrome Extension (Manifest V3)
  - Content Script: Scrapes product page content
  - Service Worker: Background tasks, context menu, AI calls
  - Side Panel: UI for displaying results

## APIs / Integrations
- Chrome built-in AI APIs:
  - Summarizer API
  - Writer / Rewriter API
  - Language Detector
  - Gemini Nano (on-device classifier)
- Chrome Extension APIs:
  - chrome.storage, chrome.contextMenus, chrome.scripting, chrome.runtime, chrome.sidePanel

## Data Flow
1. Content script scrapes product info and sends to service worker.
2. Service worker calls Chrome AI APIs to summarize, create pros/cons, and compute trust score.
3. Results are stored locally and posted to the side panel via postMessage.

## Security & Privacy
- All core AI processing is intended to run with Chrome built-in APIs (on-device or browser-provided) — avoids sending sensitive page content to external servers.
- If adding a backend, ensure user consent and anonymization; store minimal necessary data.
- Clearly state in README/PRD what data (if any) is uploaded externally.

## Extensibility
- Add translators for multilingual pages.
- Price tracking / alerts (requires storage + optional backend).
- More advanced scam detection models or heuristics.

