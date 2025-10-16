# AI Smart Shopping Assistant (Chrome Extension)

**Language**: TypeScript  
**UI**: Tailwind CSS  
**Purpose**: Summarize product pages, extract pros/cons, and flag suspicious sellers using Chrome built-in AI APIs (Gemini Nano + Summarizer, Writer, Language Detector).

## What's included
- Chrome Extension scaffold (Manifest V3)
- Content script, service worker and side panel (TypeScript)
- Tailwind + Vite build placeholders
- `PRD.md` (Product Requirements Document)
- `TRD.md` (Technical Requirements Document)

## Notes
- The code contains **placeholder** calls for Chrome built-in AI APIs — replace comments with the actual API calls when integrating.
- This scaffold is focused on a **client-only** extension using Chrome's built-in AI. A backend is **not required** for the core functionality because Gemini Nano and the Chrome AI APIs are designed for on-device or browser-provided processing.
- A backend could be useful if you want:
  - Persisted cross-device user data / account sync
  - Aggregated analytics or anonymized telemetry
  - Heavy server-side computation that you intentionally avoid on-device
  - Integration with external 3rd-party services (payment, price history providers)

## How to run (development)
1. Install dependencies:
```bash
npm install
```
2. Build the project:
```bash
npm run build
```
3. Load the extension in Chrome (Developer mode):
- Open `chrome://extensions`
- Click "Load unpacked" and select the `dist` folder (after build)
4. Open an Amazon/eBay product page and use the context menu "Summarize Product (AI)".

## Structure
See `PRD.md` and `TRD.md` for product and technical requirements.

## Submission
For the Google Chrome Built-in AI Challenge 2025, prepare:
- GitHub repository with your source
- ZIP of built extension (contents of `dist`)
- Demo video (≤ 3 minutes)
- Devpost submission

