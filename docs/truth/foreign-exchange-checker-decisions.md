# Foreign Exchange Checker decision seeds

Six candidates from source HEAD `3a73025a88261a197c76718f1dec3fdcc41fadff`. Source paths and line numbers refer to `C:\Users\hp\Desktop\Frontend-mentor\foreign-exchange-checker`; see portfolio `docs/truth/foreign-exchange-checker.md:1` for scope and deployment limits.

**These are not finished decision records.** An earlier implementation is an evidenced alternative, not proof of every option considered. Missing rationale stays `reason: owner to supply`; status describes the current code pending owner review. All seeds remain `verified: false` (portfolio `AGENTS.md:5`). Final records must meet portfolio `PRD.md:430` (§16.2), including actual context/options, accepted costs, specificity and the visible 120-word limit.

## 1. Move converter state to Redux without moving favorites and logs

- Commit: `3a73025`.
- Choice: replace `CurrencyContext` with a `currency` slice/store and Redux consumers, while retaining `FavoritesProvider` around the app.
- Alternatives in the diff: currency and favorites/log were both context-backed before this change.
- Reason: the subject states a migration to a feature-based architecture. Why Redux was needed for currency but not the saved data: reason: owner to supply.
- Trade-off: the application now uses Redux, context and local component state together. The benefit and accepted maintenance cost are unverified.
- Status: kept.
- Theme: architecture.
- Evidence: `starter-code/src/main.jsx:11`, `starter-code/src/app/store.js:4`, `starter-code/src/features/currency/currencySlice.js:33`, `starter-code/src/context/FavoritesContext.jsx:6`; diff `3a73025^..3a73025`.
- verified: false

## 2. Cancel converter requests through the dispatched thunk

- Commit: `3a73025`.
- Choice: the converter effect dispatches `fetchExchangeRate` and calls `promise.abort()` on cleanup; the thunk forwards its signal to `fetch`.
- Alternatives in the diff: a manually created `AbortController` lived inside `CurrencyContext`'s effect.
- Reason: reason: owner to supply. The diff proves the cancellation mechanism changed, not why that API was preferred.
- Trade-off: abort behavior now also depends on thunk rejection handling. The reducer checks for payload `aborted`; exact aborted-action behavior and UI transitions were not tested. Other views retain separate fetch effects.
- Status: kept.
- Theme: data.
- Evidence: `starter-code/src/components/Converter.jsx:22`, `starter-code/src/features/currency/currencySlice.js:6`, `starter-code/src/features/currency/currencySlice.js:70`; diff `3a73025^..3a73025`.
- verified: false

## 3. Persist saved pairs and manual conversion snapshots in the browser

- Commits: `bc10bb6`, `f68cf2b`.
- Choice: keep pairs under `fx-favorites` and log entries under `fx-log`, with JSON local-storage reads/writes and user-triggered log snapshots.
- Alternatives in the evidence: `bc10bb6` introduces the storage hook; a server-synced account or IndexedDB design is not evidenced as an option considered. Owner to supply the actual alternatives.
- Reason: the commit subject names save/delete/persist functionality. Why browser-local storage was chosen: reason: owner to supply.
- Trade-off: persistence is tied to the browser origin; the hook has no parsing/storage exception recovery. Provider rate dates are not included in saved snapshots.
- Status: kept.
- Theme: state.
- Evidence: `starter-code/src/hooks/useLocalStorage.js:3`, `starter-code/src/context/FavoritesContext.jsx:7`, `starter-code/src/components/Converter.jsx:36`; commits `bc10bb6`, `f68cf2b`.
- verified: false

## 4. Anchor each desktop picker to its currency button

- Commit: `a88b805`.
- Choice: move picker-open state into `CurrencyPanel`, render the picker inside the button's positioned wrapper, and retain a fixed bottom sheet on mobile.
- Alternatives in the diff: a shared picker controlled through `onOpenPicker`, rendered as a centered desktop overlay.
- Reason: the commit body says the selector should remain inside its intended layout.
- Trade-off: each panel owns its picker state and each mounted picker fetches the currency list. The replacement does not establish dialog semantics or focus restoration; those are unverified.
- Status: kept.
- Theme: ux.
- Evidence: `starter-code/src/components/CurrencyPanel.jsx:23`, `starter-code/src/components/CurrencyPanel.jsx:56`, `starter-code/src/components/CurrencyPicker.jsx:12`, `starter-code/src/components/CurrencyPicker.jsx:85`; diff `a88b805^..a88b805`.
- verified: false

## 5. Format received amounts separately from editable input

- Commit: `a88b805`.
- Choice: use a controlled input for both panels, leave editable SEND text as entered, and format RECEIVE with locale grouping and at most two fraction digits.
- Alternatives in the diff: SEND used `defaultValue`; RECEIVE rendered the raw amount in a span.
- Reason: reason: owner to supply. The commit's general UI-polish description does not explain the two-decimal policy.
- Trade-off: the rendered result can hide smaller fractional differences, while compare/log formatting uses other defaults. Currency-specific rounding and numeric correctness remain unverified.
- Status: kept.
- Theme: data.
- Evidence: `starter-code/src/components/CurrencyPanel.jsx:5`, `starter-code/src/components/CurrencyPanel.jsx:26`, `starter-code/src/components/CurrencyPanel.jsx:41`, `starter-code/src/components/Compare.jsx:116`, `starter-code/src/components/Log.jsx:74`; diff `a88b805^..a88b805`.
- verified: false

## 6. Load a saved pair back into the converter and its History view

- Commits: `778969b`, with current Redux wiring in `3a73025`.
- Choice: selecting a favorite sets both currencies and switches the active view to History, without changing the entered amount.
- Alternatives in the diff: the earlier favorites list displayed rates and removal controls but had no load-pair action. `778969b` adds a LOAD button; current source makes the row the load button.
- Reason: the subject explicitly names loading a favorite pair into the converter. Why loading also selects History: reason: owner to supply.
- Trade-off: loading a pair leaves the favorites view. The current removal star stops click propagation but is a span, not an independently keyboard-operable button.
- Status: kept.
- Theme: ux.
- Evidence: `starter-code/src/App.jsx:27`, `starter-code/src/components/Favorites.jsx:91`, `starter-code/src/components/Favorites.jsx:120`; commits `778969b`, `3a73025`.
- verified: false

## Reversal evidence that needs an owner explanation

The tab Escape/outside-click handlers added in `ae307a9` and `682ad41` are removed by `a88b805`. `3a73025` also removes the old converter context's clearing branch for empty input. These are observable removals, not proof of deliberate product decisions. Do not invent an accessibility or stale-data rationale, or count either as an approved `reversed` record without owner testimony (diffs `a88b805^..a88b805`, `3a73025^..3a73025`; portfolio `PRD.md:434`, §16.2).

The six drafts do not satisfy any verified-record minimum. Owner review, actual alternatives, missing reasons, accepted costs and source-backed results are still required (portfolio `PRD.md:430`, `PRD.md:432`, §16.2; `PRD.md:1327`, §39).
