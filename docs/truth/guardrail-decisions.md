# Guardrail decision seeds

Five candidates from source HEAD `1e6f005c6e44596338b3d4d7cc16319b8356487f`, compared with `af86fa2`. Source paths and line numbers refer to `C:\Users\hp\Desktop\guardrail-dapp`; see portfolio `docs/truth/guardrail.md:1` for scope and deployment limits.

**These are not finished decision records.** A previous implementation is an evidenced alternative, not proof of every option the owner considered. Reasons come from source comments where stated; otherwise `reason: owner to supply`. Status describes the observed implementation/history, pending owner review. All seeds remain `verified: false` (portfolio `AGENTS.md:5`). Publication requires the anatomy, specificity and count rules in portfolio `PRD.md:430` (§16.2), not just enough draft bullets.

**Deferred with the project (owner, 2026-10-02).** Guardrail is deferred because the contract source is unrecoverable, so no enforcement rule can be evidenced (`docs/truth/guardrail.md:61`, portfolio `PRD.md:1278`, §38; `docs/phase-1-exit.md:85`). These five seeds are neither promotable nor needed, and they count toward no minimum. They are kept as evidence in case the source is ever recovered. Nothing below has been withdrawn.

## 1. Read the guardrail through the wallet, one getter at a time

- Commit: `1e6f005`.
- Choice: use the connected `BrowserProvider` for seven sequential contract getters, with 300 ms gaps.
- Alternatives in the diff: `af86fa2` created a separate `JsonRpcProvider(ARC_RPC_URL)` and used `Promise.all` for reads.
- Reason: the comment says to fetch one at a time to avoid rate limits (`app/page.tsx:171`). Why the wallet provider was preferred to other RPC configurations: reason: owner to supply.
- Trade-off: six intentional gaps add 1.8 seconds before network/retry time; read access still depends on wallet connection. This is a code-derived cost, not a measured latency result.
- Status: kept.
- Theme: data.
- Evidence: `app/page.tsx:124`, `app/page.tsx:164`; diff `af86fa2..1e6f005`.
- verified: false

## 2. Retry ambiguous read failures before suggesting an ABI mismatch

- Commit: `1e6f005`.
- Choice: retry rate-limit and call-exception/empty-response errors up to three times after the first attempt, using exponential delays starting at 500 ms; then show a qualified RPC error.
- Alternatives in the diff: the original fetch catch only logged an error, without per-getter retry or a visible banner.
- Reason: the source comment says throttling can resemble missing revert data, so it retries before diagnosing the failure (`app/page.tsx:129`). The historical RPC incident itself is unverified.
- Trade-off: exhausted retries add waiting time, and `CALL_EXCEPTION` can still represent a real contract failure. Which errors the owner observed: reason: owner to supply.
- Status: kept.
- Theme: data.
- Evidence: `app/page.tsx:135`, `app/page.tsx:251`, `app/page.tsx:502`; diff `af86fa2..1e6f005`.
- verified: false

## 3. Retire five-second polling in favor of connection/action refreshes

- Commits: `af86fa2`, then `1e6f005`.
- Choice: remove the recurring fetch interval; guard the connection fetch with a ref and reread after successful local writes.
- Alternatives in the diff: call `fetchContractData` immediately on connection and every 5,000 ms thereafter.
- Reason: the new ref is commented "Prevent duplicate fetches" (`app/page.tsx:46`). Why all periodic refresh was dropped: reason: owner to supply.
- Trade-off: external writes and elapsed spending windows do not trigger that former periodic update. Whether this was accepted or intended as a temporary workaround: reason: owner to supply.
- Status: reversed, referring to the earlier polling strategy; the replacement remains in the inspected source.
- Theme: data.
- Evidence: `app/page.tsx:46`, `app/page.tsx:273`, `app/page.tsx:312`; diff `af86fa2..1e6f005`; stale claim in `README.md:10`.
- verified: false

## 4. Check the active chain before marking the wallet connected

- Commit: `1e6f005`.
- Choice: call `getNetwork()` after the switch/add attempt and reject an unexpected chain before storing the connection state.
- Alternatives in the diff: assume that the switch attempt succeeded, even when a non-`4902` switch error was swallowed.
- Reason: the added comment says an unsuccessful switch can make subsequent reads look like an ABI mismatch (`app/page.tsx:88`).
- Trade-off: the explicit mismatch path asks the user to switch manually and reconnect rather than completing the connection. Actual wallet behavior across failure codes is unverified.
- Status: kept.
- Theme: security.
- Evidence: `app/page.tsx:66`, `app/page.tsx:88`; diff `af86fa2..1e6f005`.
- verified: false

## 5. Align dashboard calls with the replacement ABI

- Commit: `1e6f005`.
- Choice: read `spent_in_window`, `usdc_balance` and `window_start`; dispatch `pause` or `unpause` according to fetched state.
- Alternatives in the diff: `spent_today`, `contract_balance`, `last_reset` and `toggle_pause` from the earlier assumed interface.
- Reason: source comments identify the corrected getters and separate pause functions (`app/page.tsx:184`, `app/page.tsx:191`, `app/page.tsx:204`, `app/page.tsx:348`). On-chain parity remains unverified without the contract.
- Trade-off: the frontend now depends on these exact ABI names and the stored pause state. Owner's verification method and migration cost: reason: owner to supply.
- Status: kept.
- Theme: architecture.
- Evidence: `app/page.tsx:184`, `app/page.tsx:348`, `AgentExpenseGuardrail_abi.json:246`; diff `af86fa2..1e6f005`.
- verified: false

## Review and evidence still needed

- Seed 3 is a source-backed reversal candidate, not an approved reversed record. The portfolio-wide minimum still requires two completed `reversed` or `open` records, alongside the other count rules (portfolio `PRD.md:432`, §16.2; Phase 1 seed rule at `PRD.md:1343`, §39).
- Do not turn the serial-read change into a confirmed JSON-RPC batching diagnosis without an issue, captured error or owner account tied to the incident. Contract enforcement and actual revert outcomes also remain unverified (portfolio `docs/truth/guardrail.md:1`, `PRD.md:1311`, §38).
- Before promotion, the owner supplies actual options considered, missing rationale and accepted costs; each visible record is edited to the 120-word limit and reviewed for specificity (portfolio `PRD.md:430`, §16.2).
