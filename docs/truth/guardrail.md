# Guardrail truth sheet

Source repository: `C:\Users\hp\Desktop\guardrail-dapp`
Inspected at HEAD `1e6f005` (`1e6f005c6e44596338b3d4d7cc16319b8356487f`, 2026-07-20, "page modification").
Origin: `https://github.com/Olamilekan-oluwayomi/guardrail-dapp.git` (source repository `.git/config`, read with `git config remote.origin.url`). Repository visibility: public. Verified 2026-10-02 by loading the repository page, which returns a repository view and not a 404 and reports 2 commits, matching the two inspected commits at line 13.

Read-only source and history inspection. Source paths and line numbers below refer to that repository at this commit; explicitly identified portfolio paths refer to this repository. This is draft evidence, not approved public copy. `verified: false`; only the owner changes verification (portfolio `AGENTS.md:5`).

## 1. Identity and scope

- The application calls itself "Agent Expense Guardrail"; the package name is `guardrail-dapp` (`app/layout.tsx:3`, `app/page.tsx:448`, `package.json:2`).
- The README describes a dashboard for a Vyper contract on Arc, but the inspected tracked tree contains an ABI, not the contract implementation. Contract language, authorship, deployed bytecode and enforcement are unverified (`README.md:3`, `AgentExpenseGuardrail_abi.json:1`, tracked tree at `1e6f005`).
- The two inspected commits are `af86fa2` and `1e6f005`. Their dates are repository history, not owner confirmation of the public project year. Year, project origin, individual contribution and permission to publish contract details: unverified.

## 2. Live URL and reachability evidence

Owner-supplied URL: `https://guardrail-dapp.vercel.app/`. The owner supplied this address in the audit conversation. Its association with the inspected commit is unverified; neither the local source nor an HTTP success establishes the deployed commit.

Read-only observation recorded for this sheet with `Invoke-WebRequest -UseBasicParsing -Method Get`:

```text
checkedUtc: 2026-10-01T12:26:40Z
requestedUrl: https://guardrail-dapp.vercel.app/
status: 200
finalUrl: https://guardrail-dapp.vercel.app/
title: Agent Expense Guardrail
```

This records document reachability only. Wallet connection, RPC availability, contract deployment, transactions and live failure states remain unverified. The returned title matches the title authored in `app/layout.tsx:4`, not proof of source/deployment parity. A later fetch on 2026-10-02 rendered the dashboard, and its footer names the contract as `0x56b6...c22d` on Arc Testnet with chain ID 5042002, matching the hardcoded values at line 51 and line 53. That corroborates the contract address in the deployed app, which the audit could not establish. It is still not a commit-level parity check, and enforcement remains unverified at line 59.

## 3. Stack and application entry points

Declared versions, not installed or deployed versions (`package.json:11`, `package.json:17`):

| Technology | Declaration | Source evidence |
| --- | --- | --- |
| Next.js | `14.2.0` | `package.json:12` |
| React / React DOM | `^18.3.0` | `package.json:13` |
| ethers | `^6.13.0` | `package.json:15` |
| TypeScript | `^5.4.0` | `package.json:24`; strict mode in `tsconfig.json:11` |
| Tailwind CSS | `^3.4.0` | `package.json:23`, `app/globals.css:1` |

The dashboard is a client component at `/`, wrapped by the root layout. Next is configured for static export into `dist`. The declared scripts are `dev`, `build`, `start` and `lint`; none was run in this audit (`app/page.tsx:1`, `app/layout.tsx:8`, `next.config.js:2`, `package.json:5`).

## 4. Network and contract evidence boundary

The source hardcodes these configuration values (`app/page.tsx:10`):

| Setting | Source value |
| --- | --- |
| Contract address | `0x56b69422f196bfb49188764cc6afb6e9b750c22d` |
| RPC URL | `https://rpc.testnet.arc.network` |
| Chain ID | `5042002` |

The wallet setup names Arc Testnet and its native currency USDC with 18 decimals; contract amount entry instead uses six decimal places. These are separate source settings, not proof of the contract token's actual decimals (`app/page.tsx:72`, `app/page.tsx:306`, `app/page.tsx:394`).

The ABI includes `spend`, `deposit`, `withdraw`, owner-setting functions, `pause`, `unpause`, `transfer_ownership`, balance/window getters and events. It does not contain contract bodies or custom-error entries. An ABI signature cannot prove that a memo, role, daily limit or pause is enforced on-chain (`AgentExpenseGuardrail_abi.json:1`, `AgentExpenseGuardrail_abi.json:158`, `AgentExpenseGuardrail_abi.json:184`, `AgentExpenseGuardrail_abi.json:246`, commit `1e6f005`).

No Vyper/Solidity source, contract test suite or deployment artifact was found in the tracked tree at `1e6f005`. The deployed contract, exact revert reasons, window-reset rules and token handling are unverified. This leaves the contract-evidence requirement open in portfolio `PRD.md:1311` (§38).

**Explorer check (2026-10-02).** The configured address was queried against Arcscan, Arc's Blockscout explorer for testnet (`https://testnet.arcscan.app` redirects to `https://explorer.testnet.arc.io`), using the read-only JSON API rather than the rendered page. `GET /api/v2/addresses/0x56b69422f196bfb49188764cc6afb6e9b750c22d` returns `is_contract: true`, `creation_status: "success"`, `is_verified: false` and `name: null`. `GET /api/v2/smart-contracts/{address}` returns creation and deployed bytecode with `implementations: []` and `proxy_type: null` (so it is not a proxy), and returns no `language`, `name`, `compiler_version` or `source_code` field.

Two consequences. A contract does exist and deployed successfully at the address the dashboard hardcodes, which the truth sheet previously could not establish. But it is not verified, so no source is published on chain, the contract language remains unconfirmed, and the explorer cannot recover the Vyper source. Combined with the owner's statement that the source cannot now be located, the contract-source route is closed by evidence rather than by assumption. The owner's remaining options are a local recovery of the source or the project decision at line 99.

## 5. Features that exist in code

- **Wallet connection:** requests accounts from an injected provider, attempts a switch to Arc Testnet, requests chain addition for error `4902`, then checks the network before storing the connected state (`app/page.tsx:50`).
- **Role display:** compares the connected address against the fetched owner and agent, case-insensitively. Owner comparison takes precedence if the addresses coincide (`app/page.tsx:241`). This is UI gating, not an on-chain permission audit.
- **Reads:** fetches owner, agent, daily limit, spent-in-window, USDC balance, pause state and window start sequentially. There are 300 ms gaps between getters and up to three retries after the initial attempt for selected error classes (`app/page.tsx:135`, `app/page.tsx:171`).
- **Owner controls:** set the daily limit, set the agent, and call `pause` or `unpause`. Each waits for a transaction receipt before reporting success and rereading state (`app/page.tsx:295`, `app/page.tsx:322`, `app/page.tsx:350`).
- **Agent payment:** requires the agent role and a nonblank trimmed memo in the handler, parses the amount with six decimal places, calls `spend`, and waits for a receipt. The button additionally disables for paused state, loading and empty fields (`app/page.tsx:378`, `app/page.tsx:795`).
- **Recent transactions:** stores successful payments made through the current mounted page in React state. Entries include the entered amount, recipient, memo and a local timestamp, not a saved transaction hash or a queried on-chain history (`app/page.tsx:44`, `app/page.tsx:400`, `app/page.tsx:867`).

## 6. Actual UI states

These states are source-backed, not captured browser evidence.

| State | Implemented behavior | Evidence |
| --- | --- | --- |
| Disconnected | Connect button; contract values begin at zero and paused begins false | `app/page.tsx:16`, `app/page.tsx:24`, `app/page.tsx:489` |
| Missing wallet / failed connection | Browser alert, with generic connection error logging | `app/page.tsx:50`, `app/page.tsx:108` |
| Wrong network | Explicit network comparison and an alert/early return | `app/page.tsx:88` |
| Read failure | Retry logic, then an RPC error banner | `app/page.tsx:135`, `app/page.tsx:251`, `app/page.tsx:502` |
| Wrong role / paused | Disabled controls and explanatory role/pause text | `app/page.tsx:601`, `app/page.tsx:701`, `app/page.tsx:798`, `app/page.tsx:852` |
| Transaction pending | Shared loading state and wallet/confirmation status strings | `app/page.tsx:295`, `app/page.tsx:385` |
| Transaction success / error | Success after `tx.wait()`; errors use `err.reason` or `err.message`; status later clears | `app/page.tsx:307`, `app/page.tsx:395`, `app/page.tsx:416` |
| Empty history | "No transactions yet" message | `app/page.tsx:872` |

## 7. Contradictions and limits to preserve in the case study

1. **Five-second refresh was removed.** `README.md:10` still claims automatic refresh every five seconds. Commit `1e6f005` removes the interval from `af86fa2`; current code fetches once after connection and after successful local actions (`app/page.tsx:273`, `app/page.tsx:312`). Do not describe continuous live monitoring.
2. **The README's contract interface is stale.** It lists `toggle_pause` and `deposit`; the UI now calls separate `pause`/`unpause` and has no deposit control. The ABI includes deposit, which is not evidence of a shipped deposit interface (`README.md:34`, `app/page.tsx:348`, `AgentExpenseGuardrail_abi.json:184`).
3. **The batching story needs narrower wording.** The history proves replacement of a separate `JsonRpcProvider` plus concurrent reads with serial wallet-provider reads and retries. Comments mention rate limiting and ambiguous empty responses. No issue, captured RPC response or explicit batching configuration was found in the two-commit history; the exact JSON-RPC batching diagnosis in the PRD remains unverified (`af86fa2`, `1e6f005`, `app/page.tsx:129`, portfolio `PRD.md:1311`, §38).
4. **Displayed allowance is not a verified spend simulation.** "Available today" uses `dailyLimit - spentToday`, not the ABI's `available_now`; it does not incorporate the fetched balance or use `seconds_until_reset`. Window start is stored without a reset/countdown calculation. No explicit preflight simulation or client-side balance/limit check appears in the spend handler (`app/page.tsx:205`, `app/page.tsx:378`, `app/page.tsx:424`, `app/page.tsx:765`, `AgentExpenseGuardrail_abi.json:274`, `AgentExpenseGuardrail_abi.json:302`).
5. **Initial and stale values are not labeled as such.** Values start at zero; disconnected state does not clear contract values or history. No account-change or chain-change subscription appears in the page. Behavior after external wallet changes or external transactions is unverified (`app/page.tsx:21`, `app/page.tsx:114`, `app/page.tsx:273`, commit `1e6f005`).
6. **Formatting is not a precision guarantee.** Submission uses `parseUnits(..., 6)`, while display converts bigint to `Number`, divides by `1e6` and calls `toFixed(2)`. Large-value precision and amount/address validation boundaries were not tested (`app/page.tsx:285`, `app/page.tsx:306`, `app/page.tsx:394`).
7. **Accessibility is not established by disabled controls.** Form labels are not associated through `htmlFor`/input IDs, and the RPC banner is a plain `div`. A keyboard or screen-reader pass is unverified (`app/page.tsx:504`, `app/page.tsx:592`, `app/page.tsx:735`).

## 8. Tests, assets and owner follow-up

- No test script or tracked automated test suite was found (`package.json:5`, tracked tree at `1e6f005`). Build, lint, browser interaction, wallet signing, contract reads and transactions were not run; outcomes are unverified.
- No dashboard, configuration or error-state captures were produced by this audit. The figure requirements remain open (portfolio `PRD.md:1284`, `PRD.md:1299`, §38).
- Owner to supply: the contract source/repository, deployment-to-source evidence, token details and actual revert/test evidence before any enforced-rule simulation is authored (portfolio `PRD.md:1311`, §38).
- Owner to supply: public year/origin/contribution wording, source visibility or private-source explanation, and rationale/trade-offs for the seeds in portfolio `docs/truth/guardrail-decisions.md:1`.
- Publication readiness remains unverified. These notes do not satisfy the approved decisions, figures, stack rationale, copy and fallback requirements in portfolio `PRD.md:1280` (§38), or the Phase 1 owner-review exit in `PRD.md:1327` (§39).
