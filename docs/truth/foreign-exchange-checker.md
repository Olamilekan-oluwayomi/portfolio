# Foreign Exchange Checker truth sheet

Source repository: `C:\Users\hp\Desktop\Frontend-mentor\foreign-exchange-checker`
Inspected at HEAD `3a73025` (`3a73025a88261a197c76718f1dec3fdcc41fadff`, 2026-07-14, "Refactor: migrate from context to feature-based architecture").
Origin: `https://github.com/Olamilekan-oluwayomi/foreign-exchange-checker.git` (source repository `.git/config`, read with `git config remote.origin.url`). Repository visibility: public. Verified 2026-10-02 by loading the repository page, which returns a repository view and not a 404, reports 33 commits, and names the same live demo as the owner-supplied URL.

Read-only source and history inspection. Source paths and line numbers below refer to that repository at this commit; explicitly identified portfolio paths refer to this repository. This is draft evidence, not approved public copy. `verified: false`; only the owner changes verification (portfolio `AGENTS.md:5`).

## 1. Identity, origin and application root

- The README calls the project "FX Checker" and identifies it as a Frontend Mentor challenge solution using the provided design system and assets. The header renders `FX_CHECKER`. Do not attribute the supplied design to the owner (`README.md:1`, `README.md:7`, `README.md:133`, `starter-code/src/components/Header.jsx:9`).
- The application is under `starter-code/`: its manifest declares Vite scripts and its entry point mounts React. The root manifest only declares `date-fns`; it is not a second application (`README.md:78`, `package.json:1`, `starter-code/package.json:6`, `starter-code/src/main.jsx:9`).
- Public project year, exact individual contribution and any changes beyond the provided design are unverified. Commit dates are not a substitute for owner confirmation (`3a73025`, portfolio `PRD.md:1484`, Appendix A).

## 2. Live URL and reachability evidence

Owner-supplied URL: `https://foreign-exchange-checker-eight.vercel.app/`. The owner supplied this address in the audit conversation. Its association with the inspected commit is unverified.

Read-only observation recorded for this sheet with `Invoke-WebRequest -UseBasicParsing -Method Get`:

```text
checkedUtc: 2026-10-01T12:26:42Z
requestedUrl: https://foreign-exchange-checker-eight.vercel.app/
status: 200
finalUrl: https://foreign-exchange-checker-eight.vercel.app/
title: starter-code
```

This is an HTML reachability check, not a successful conversion or browser test. The returned title matches `starter-code/index.html:11`; deployed API behavior, viewport rendering, local storage and source/deployment parity remain unverified.

## 3. Stack and state ownership

Declared versions, not installed or deployed versions (`starter-code/package.json:12`, `starter-code/package.json:20`):

| Technology | Declaration | Evidence |
| --- | --- | --- |
| React / React DOM | `^19.2.7` | `starter-code/package.json:15` |
| Vite | `^8.1.1` | `starter-code/package.json:31` |
| Tailwind CSS / Vite integration | `^4.3.2` | `starter-code/package.json:22`, `starter-code/package.json:30` |
| Redux Toolkit / React Redux | `^2.12.0` / `^9.3.0` | `starter-code/package.json:13`, `starter-code/package.json:17` |
| Recharts | `^3.9.1` | `starter-code/package.json:18` |
| date-fns | `^4.4.0` | `starter-code/package.json:14` |

The active app uses JavaScript/JSX. Vite registers React and Tailwind plugins. Scripts are `dev`, `build`, `lint` and `preview`; none was run (`starter-code/src/main.jsx:1`, `starter-code/vite.config.js:1`, `starter-code/package.json:6`).

Currency state now lives in a Redux slice. Favorites and conversion logs still use `FavoritesContext` and local storage; active tab and chart range remain local to `App`. This is a mixed state architecture, not a complete migration to Redux (`starter-code/src/main.jsx:11`, `starter-code/src/app/store.js:4`, `starter-code/src/features/currency/currencySlice.js:33`, `starter-code/src/context/FavoritesContext.jsx:6`, `starter-code/src/App.jsx:24`, commit `3a73025`).

## 4. Actual data sources and persistence

| Data | Source behavior | Evidence |
| --- | --- | --- |
| Conversion | Browser fetch to `https://api.frankfurter.dev/v1/latest` with amount/from/to; stores the returned amount and derives the unit rate by division | `starter-code/src/features/currency/currencySlice.js:4` |
| Currency names/list | Browser fetch to `https://api.frankfurter.dev/v1/currencies` | `starter-code/src/components/CurrencyPicker.jsx:12` |
| History | Date-range endpoint with 1, 7, 30, 90, 365 or 1,825 days selected by the range label | `starter-code/src/components/History.jsx:7`, `starter-code/src/components/History.jsx:44` |
| Stats | Separate latest and previous-calendar-date requests; computes open, last, absolute change and percentage change | `starter-code/src/components/StatCards.jsx:12` |
| Ticker | Latest and previous-date requests with USD as the base, fetched in a mount effect | `starter-code/src/components/Ticker.jsx:24` |
| Compare | Amount-based request for a fixed candidate list excluding the current base, plus currency names | `starter-code/src/components/Compare.jsx:6`, `starter-code/src/components/Compare.jsx:30` |
| Favorites | Separate latest/previous-date requests per saved pair | `starter-code/src/components/Favorites.jsx:10` |
| Flags | Local currency-to-country mapping and bundled WebP paths, not flag images from Frankfurter | `starter-code/src/utils/currencyMeta.js:1`, `starter-code/src/utils/currencyMeta.js:34` |
| Saved pairs/log | `fx-favorites` and `fx-log` keys in browser local storage | `starter-code/src/context/FavoritesContext.jsx:7`, `starter-code/src/hooks/useLocalStorage.js:3` |

The shown fetch calls do not send an API key. "55 CURRENCIES - EOD - ECB DATA" is hardcoded header copy, not a count derived from the fetched list or independent proof of upstream data provenance. Exact current currency coverage, upstream guarantees and update cadence are unverified (`starter-code/src/components/Header.jsx:14`, `starter-code/src/components/CurrencyPicker.jsx:15`).

Log entries are user-triggered snapshots of current converter fields with a local timestamp and generated ID. They do not preserve the provider's rate date. The local-storage hook does not catch invalid JSON or storage exceptions (`starter-code/src/components/Converter.jsx:36`, `starter-code/src/context/FavoritesContext.jsx:24`, `starter-code/src/hooks/useLocalStorage.js:4`).

No rate-data cache, offline mode, stale-rate indicator or dated gallery fixture was found in the tracked source at `3a73025`. Favorites/log persistence is not an offline rate cache; browser-managed HTTP caching was not audited. The README itself lists offline fallback as a possible improvement (`README.md:122`, `starter-code/src/features/currency/currencySlice.js:4`, `starter-code/src/hooks/useLocalStorage.js:3`).

## 5. Views and interactions that exist

There is one mounted app with in-page view state, not URL routes for History, Compare, Favorites and Log. The default view is History with range `1M` (`starter-code/src/main.jsx:9`, `starter-code/src/App.jsx:24`, `starter-code/src/components/Tabs.jsx:10`).

- The converter fetches when amount or currencies change, swaps the pair, toggles a favorite and manually saves a conversion. Its effect passes cancellation through the dispatched thunk (`starter-code/src/components/Converter.jsx:22`, `starter-code/src/components/Converter.jsx:32`, `starter-code/src/components/Converter.jsx:65`).
- The picker searches names/codes, groups USD/EUR/GBP as popular, highlights the current code, closes on Escape/backdrop/selection, and changes from a mobile bottom sheet to a desktop anchored dropdown (`starter-code/src/components/CurrencyPicker.jsx:6`, `starter-code/src/components/CurrencyPicker.jsx:26`, `starter-code/src/components/CurrencyPicker.jsx:34`, `starter-code/src/components/CurrencyPicker.jsx:77`).
- History uses a Recharts area chart and six range controls. Summary stats do not receive the selected range, so their "open" value is not the opening value of the selected chart period (`starter-code/src/components/RateChart.jsx:54`, `starter-code/src/components/RangeSelector.jsx:1`, `starter-code/src/components/History.jsx:74`, `starter-code/src/components/StatCards.jsx:14`).
- A favorite row loads its pair into the converter and switches back to History. The log supports deletion and clearing all entries (`starter-code/src/App.jsx:27`, `starter-code/src/components/Favorites.jsx:91`, `starter-code/src/components/Log.jsx:46`, `starter-code/src/components/Log.jsx:80`).

## 6. State inventory: internal versus visible

| State | What actually exists | Evidence |
| --- | --- | --- |
| Converter idle/loading/succeeded/failed | Redux status values exist, but `Converter` does not select or render status/error | `starter-code/src/features/currency/currencySlice.js:35`, `starter-code/src/features/currency/currencySlice.js:60`, `starter-code/src/components/Converter.jsx:16` |
| Converter result / missing result | Formatted received amount and rate, otherwise a dash | `starter-code/src/components/Converter.jsx:81`, `starter-code/src/components/Converter.jsx:94` |
| History loading | Explicit `LOADING...` panel | `starter-code/src/components/RateChart.jsx:39` |
| History empty / failed | A fetch failure and an empty dataset both lead to "No chart data available" | `starter-code/src/components/History.jsx:60`, `starter-code/src/components/RateChart.jsx:43` |
| Search with no matches | `NO RESULTS` | `starter-code/src/components/CurrencyPicker.jsx:103` |
| No favorites / no log | Dedicated empty copy | `starter-code/src/components/Favorites.jsx:58`, `starter-code/src/components/Log.jsx:22` |
| Missing comparison amount | `NO COMPARISON AVAILABLE` for a falsy amount | `starter-code/src/components/Compare.jsx:57` |
| Ticker or stat fetch failure | Console logging and placeholders, not a dedicated offline/error state | `starter-code/src/components/Ticker.jsx:61`, `starter-code/src/components/StatCards.jsx:40` |

Do not create stale/offline screenshots and label them as existing product states. The portfolio must use only evidenced states, label any recreation, and label any future snapshot dataset with its date (portfolio `PRD.md:1312`, §38). No state screenshots were captured in this audit.

## 7. Formatting, contradictions and risks

1. **Rounding is display formatting, not a financial-precision model.** Receive amounts use `Number(...).toLocaleString(undefined, { maximumFractionDigits: 2 })`; unit quotes use four decimals. Compare and log values use default `toLocaleString()` settings, so formatting is not uniform. No currency-specific minor-unit policy or decimal-arithmetic library is established (`starter-code/src/components/CurrencyPanel.jsx:5`, `starter-code/src/components/Converter.jsx:94`, `starter-code/src/components/Compare.jsx:116`, `starter-code/src/components/Log.jsx:74`, `starter-code/package.json:12`).
2. **Old results can outlive the input that produced them.** The pending reducer does not clear result/rate, and the converter returns early for an empty input without clearing either. `3a73025` removed the earlier context's clearing branch. Log conversion has no ready-result guard. Reproduction and the owner's intended behavior are unverified; this is not an intentional "stale data" feature (`starter-code/src/features/currency/currencySlice.js:62`, `starter-code/src/components/Converter.jsx:22`, `starter-code/src/components/Converter.jsx:36`, diff `3a73025^..3a73025`).
3. **A ticker label disagrees with its query direction.** The first label is `EUR/USD`, but its value is taken from the EUR quote in a `from=USD` response without inversion (`starter-code/src/components/Ticker.jsx:3`, `starter-code/src/components/Ticker.jsx:30`, `starter-code/src/components/Ticker.jsx:48`).
4. **"Live" is not a stream or a demonstrated 24-hour market feed.** Ticker requests run on mount; comparisons use a previous calendar date. Chart copy appends `CET` without selecting that timezone in its formatter. Exact freshness and timezone correctness are unverified (`README.md:29`, `starter-code/src/components/Ticker.jsx:12`, `starter-code/src/components/Ticker.jsx:67`, `starter-code/src/components/RateChart.jsx:29`).
5. **Session copy conflicts with persistence.** Empty-log copy says the log is private to "this session and this browser", but `fx-log` is stored in local storage and reloaded on subsequent mounts. This is browser-local persistence, not a demonstrated session boundary (`starter-code/src/components/Log.jsx:29`, `starter-code/src/context/FavoritesContext.jsx:8`, `starter-code/src/hooks/useLocalStorage.js:4`).
6. **Keyboard work in older commits is not all present now.** `ae307a9` added Escape dismissal and `682ad41` added outside-click dismissal to mobile tabs; `a88b805` removed both from `Tabs`. The currency picker still handles Escape. Do not cite those old commits as proof of current tab behavior (`starter-code/src/components/Tabs.jsx:17`, `starter-code/src/components/CurrencyPicker.jsx:26`, diff `a88b805^..a88b805`).
7. **Accessibility remains unverified.** The app defines focus-visible styles, but view buttons have no tab/tabpanel selection semantics or arrow-key handler, the picker has no dialog/focus-return implementation, amount labels are plain paragraphs, and the favorite-removal star is a clickable span inside the row button (`starter-code/src/index.css:88`, `starter-code/src/components/Tabs.jsx:20`, `starter-code/src/components/CurrencyPicker.jsx:77`, `starter-code/src/components/CurrencyPanel.jsx:35`, `starter-code/src/components/Favorites.jsx:120`).

## 8. Tests, assets and owner follow-up

- No test script or tracked automated test suite/report was found (`starter-code/package.json:6`, tracked tree at `3a73025`). No build, lint, conversion, API-failure simulation, keyboard or screen-reader test was run; outcomes are unverified.
- `preview.jpg` and the files under `starter-code/src/assets/` are source assets, not newly captured proof of the deployed UI. Screenshot provenance and the required figure set remain unverified (tracked tree at `3a73025`, portfolio `PRD.md:1284`, `PRD.md:1300`, §38).
- Owner to supply: project year/contribution wording, repository visibility, deployment revision, actual options/rationale and intended numeric/freshness behavior (portfolio `docs/truth/foreign-exchange-checker-decisions.md:1`, `PRD.md:1342`, §39).
- Owner review should distinguish accidental regressions from deliberate reversals before any removal becomes a decision story. The tab-dismissal and result-clearing changes are evidence to discuss, not invented explanations (`a88b805`, `3a73025`, portfolio `PRD.md:434`, §16.2).
- Publication readiness and Phase 1 completion remain unverified. Decisions, captures, owner answers and public-copy approval are still needed (portfolio `PRD.md:1280`, §38; `PRD.md:1327`, §39).
