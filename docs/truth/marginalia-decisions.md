# Marginalia decision seeds

Eight candidates, the same cap as RentIt. Pulled from `C:\Users\hp\Desktop\ai-research-assistant` at HEAD `0d71954`.

**Nothing here is a decision record yet.** Reasons were filled in only where a commit message or a code comment stated one. Everything else reads `reason: owner to supply`. Never set `verified: true`.

This project is a much better source of records than RentIt. Reasons here are long, specific, and often state the failure that motivated the change, which is exactly what PRD section 16.2 asks for.

**Seed 1 is the best candidate in the portfolio so far**, and seed 2 is the cleanest security record. Between them, plus seeds 3 to 5, RentIt is no longer the only project that can carry records.

---

## 1. Close the token in the citation protocol, not in the model

- Commits: `ac8984b` ("Add mode-specific prompts and wire citations into all four search flow branches"), with the mechanism visible in `src/lib/research/citation-generation.ts`
- Choice: the model cites by 1-based index into a numbered evidence list (`evidence` field), never by document or source id. The server resolves each index to real data and drops anything unresolvable.
- Alternatives in the code: the removed parallel implementation `resolveCitations`, which had its own numbering logic, deleted in `c42ed06` as dead code with the note "the answer path resolves citations inline, so this was a parallel copy".
- Reason: stated in the type comment on `GeneratedCitation` in `citation-generation.ts`. The model is shown the research context as a numbered list and cites by 1-based list index, never by document or source id, so it cannot fabricate a reference to an item that was not actually provided. `toAnswerCitations` fills every display field from the resolved item's real data, never from the model, so page numbers, section names and quotes cannot be fabricated.
- Trade-off: the model can only ever cite what was retrieved, so a correct answer that depends on a passage the retrieval layer missed becomes uncitable and the marker is stripped. The failure mode moves from fabricated sources to missing ones, which is the intended trade, but it is a real cost.
- Status: kept
- Theme: data
- Evidence: `src/lib/research/citation-generation.ts` (`GeneratedCitation`, `ANSWER_OUTPUT_SCHEMA`, `parseGeneratedAnswerOutput`, `toAnswerCitations`, `sanitizeAnswerMarkers`); commit `c42ed06` for the deleted duplicate; `src/lib/research/__tests__/citation-generation.test.ts`
- verified: false

---

## 2. Enable RLS on the one table that had none

- Commit: `8e11342`, migration `20260929000000_secure_profiles.sql`
- Choice: RLS enabled on `profiles`, with SELECT and UPDATE scoped to `auth.uid()`. Insert deliberately **not** granted.
- Alternatives in the diff: leaving profiles without RLS, which is what the repository shipped until this commit.
- Reason: fully stated in the commit body. Every other table had RLS but profiles did not, and that table is read and updated through the browser's authenticated client, with `ProfileProvider` and `ProfileForm` both talking to it directly. With RLS off, any authenticated request that could name a user id could read or overwrite another user's profile row, and the authorization relied entirely on the app never issuing that query. The commit also states why insert is excluded: profiles are created by the sign-up trigger, which runs `SECURITY DEFINER` as the table owner and is not subject to the policies.
- Trade-off: none visible in the diff. This was a straight fix with no cost recorded. If there is a cost, reason: owner to supply.
- Status: kept
- Theme: security
- Evidence: commit `8e11342`; `supabase/migrations/20260929000000_secure_profiles.sql` lines 7, 9, 15 (no INSERT grant and no INSERT policy); `src/components/profile/ProfileProvider.tsx` and `src/components/profile/ProfileForm.tsx` for the browser-client access path
- verified: false

---

## 3. Retry a failed answer on a second provider, but never re-run the research

- Commit: `a46a6dc` ("feat(research): route answer generation through providers with Groq fallback")
- Choice: on a transient provider failure, retry the identical assembled prompt, context and budget against Groq. Research, relevance checks and web search are never re-run for the fallback.
- Alternatives in the diff: no fallback at all, which is what the code did before. The earlier `589ddd9` ("feat(ai): retry transient provider failures") added single-provider retry logic before the provider abstraction existed, so that commit is the immediate predecessor this one generalizes.
- Reason: stated in the comment on `fallbackAnswerGenerationProvider` in `generation.ts`: the same assembled prompt, context and budget are retried, and research, relevance checks and web search are never re-run for the fallback. `isLlmFallbackEligible` in `providers/fallback.ts` gives the eligibility rule and its reasoning: only transient conditions qualify, because a permanent failure such as an invalid request, a configuration gap or a malformed response will fail identically on the fallback.
- Trade-off: a fallback that re-ran research would be more robust when the research itself was the problem, and would also re-bill the search provider. The code accepts that gap deliberately. Whether that was weighed against cost or overlooked is reason: owner to supply.
- Status: kept
- Theme: architecture
- Evidence: commit `a46a6dc`; `src/lib/research/providers/fallback.ts` (`TRANSIENT_HTTP_STATUS`, `TRANSIENT_RPC_CODES`, `isLlmFallbackEligible`); `src/lib/research/generation.ts` comment on `fallbackAnswerGenerationProvider`; `src/lib/research/providers/__tests__/fallback.test.ts`
- verified: false

---

## 4. Swap pdf-parse for unpdf for serverless compatibility

- Commit: `179c217`
- Choice: `unpdf` for PDF text extraction, with `pdf-parse`, `pdfjs-dist`'s canvas paths, and a hand-written DOMMatrix polyfill all removed. `serverExternalPackages: ["unpdf"]` in `next.config.ts`.
- Alternatives in the diff: `pdf-parse` with a DOMMatrix polyfill, which is what the code did before. The polyfill was added in `13d832f` ("Fix DOMMatrix polyfill for pdf-parse in production") and deleted by this commit.
- Reason: fully stated in the commit body. `pdf-parse` bundles `pdfjs-dist`'s canvas-dependent code paths, which break in Vercel's serverless environment even with a DOMMatrix polyfill, and some PDFs with embedded figures and charts still fail extraction. `unpdf` extracts text with no canvas or native dependencies. The commit also notes the input and output shape and the user-safe error handling were preserved.
- Trade-off: the diff shows 301 lines removed against 51 added, so dependency weight went down. Whether extraction fidelity on chart-heavy PDFs was measured or only observed is reason: owner to supply.
- Status: kept
- Theme: architecture
- Evidence: commit `179c217` (6 files, 51 insertions, 301 deletions); `src/lib/research/document-parse.ts`; `next.config.ts` `serverExternalPackages`; `src/lib/research/__tests__/document-parse.test.ts`
- verified: false

---

## 5. Fail a web-only question rather than answer it with nothing

- Commit: `3c8530f`
- Choice: if a web-only question produces no usable web evidence, the question is marked failed with `NO_WEB_SOURCES_MESSAGE` instead of generating an answer that claims a search happened.
- Alternatives in the diff: the previous behavior, which generated an answer anyway, fixed by `3c8530f` after `e39c03d` ("fix(research): surface web search provider failures") made provider failures visible.
- Reason: stated in the comment above `NO_WEB_SOURCES_MESSAGE` in `generation.ts`. The invariant "sourceMode is web only when web results are the actual evidence" cannot hold, so the question is failed instead of generating a misleading empty answer that claims a web search was performed.
- Trade-off: a user gets a failure where a thin answer would have been something. reason: owner to supply
- Status: kept
- Theme: data
- Evidence: commit `3c8530f` (642 lines of new tests, 213 changed in `generation.ts`); `NO_WEB_SOURCES_MESSAGE` and its comment in `src/lib/research/generation.ts`; `src/lib/research/__tests__/generation.test.ts`
- verified: false

---

## 6. Stop suppressing secondary passages once the primary covers every concept

- Commit: `970f5f2`
- Choice: surface multiple value-bearing passages per document, even when the primary cluster already touches every question concept. Adds a secondaries pass with a score margin (`VALUE_CANDIDATE_SCORE_RATIO = 0.45`) and overlap rejection.
- Alternatives in the diff: the previous behavior, where a primary cluster covering all concepts suppressed the secondaries. The commit subject names both: "Surface multiple value-bearing passages instead of suppressing secondaries when primary cluster covers all concepts".
- Reason: stated in the README's evidence retrieval section and implied by the commit subject: a multi-section document should contribute complementary evidence rather than being reduced to one region. The exact failure is not spelled out in the commit body. reason: owner to supply
- Trade-off: more passages per document means more tokens per request and a noisier citation set. The bound is `MAX_CONTEXT_ITEMS`. reason: owner to supply
- Status: kept
- Theme: data
- Evidence: commit `970f5f2` (154 lines in `context.ts`, 55 lines of regression test); `collectValueCandidates` at `src/lib/research/context.ts` line 901; `selectRelevantPassages` doc comment at line 1399; `VALUE_CANDIDATE_SCORE_RATIO` at line 21
- verified: false

---

## 7. Make the README's security claims true instead of narrowing them

- Commit: `b5be603`, paired with `8e11342`
- Choice: keep "Row Level Security on application data" as the claim and add the migration that makes it true, rather than keeping the broader claim and adding a caveat.
- Alternatives in the diff: the commit body states three claims did not match the code, and for the RLS one says the wording is narrowed to "on application data" and the row-level guarantee is now real rather than aspirational. So the alternative was either narrow the claim or fix the code.
- Reason: stated in the commit body. "Row Level Security everywhere" was not true, because profiles had RLS disabled while being read and written through the authenticated browser client. The accompanying migration is what makes it true.
- Trade-off: none recorded. Note this record is really about documentation integrity, which is a meta-decision. PRD section 16.2 requires specificity, and this one is specific: it names the exact false claim and the fix. Worth the owner's judgment whether it belongs on a project page at all.
- Status: kept
- Theme: security
- Evidence: commit `b5be603`; commit `0d71954` ("Correct the README's test counts", verified against `npm test` rather than recounted by hand) shows the same habit applied to numbers
- verified: false

---

## 8. Restrict the app to existing users: reject unknown OAuth identities

- Commits: `8b2b5c8` then `5b0e7ae`, and the second one reverses the first
- Choice: status `reversed`, and this is the cleanest `reversed` record in the portfolio so far. `8b2b5c8` made the OAuth callback self-heal a missing profile by upserting one server-side. `5b0e7ae` removed that self-healing: unknown Google identities are now rejected with `account_not_found`, signed out, and have session cookies cleared instead of being silently provisioned.
- Alternatives in the diff: both behaviors are in the history, and `5b0e7ae` explicitly says the callback "no longer self-heals a missing profile".
- Reason: fully stated in `5b0e7ae`: harden auth so the app is restricted to existing users, and signup-blocked OAuth exchange errors surface the "no account / registration required" message. Note that `5b0e7ae` states the goal but does not say what was wrong with self-healing specifically, beyond implying silent provisioning of unknown identities was the problem. The rationale for self-healing in `8b2b5c8` is that the earlier `app_registered` metadata flag "did not survive repeat OAuth sign-ins on the same Google account", which is a real problem the reversal reintroduces a different answer to.
- Trade-off: rejecting unknown identities means a legitimate new Google user cannot get in through OAuth and must register by email first. That is a deliberate narrowing for a private single-user app and would be wrong for a public one. reason: owner to supply
- Status: reversed
- Theme: security
- Evidence: commits `8b2b5c8` and `5b0e7ae`; `src/app/auth/callback/route.ts`; `src/app/auth/__tests__/callback-route.test.ts` covering admission, rejection, and no-silent-provisioning
- verified: false

---

## On the reversed and open minimum

PRD section 16.2 requires at least 2 decisions across the portfolio with status `reversed` or `open`. Seed 8 here is `reversed` and has a fully stated reason, which means **the portfolio-wide minimum can be met from this project alone** without depending on RentIt seed 8, whose reason does not exist in the history. That resolves the problem I flagged on the RentIt pass.

One `open` candidate exists here if a second record is needed: the Tavily free tier cap of 1,000 credits per month. Whether that is a product limitation to document or an implementation detail to fix is undecided, and no commit addresses it. That is honest as an open record, but it is thin.

## What I could not find

- No commit in this history is a `revert`. The reversals here, seed 8 and part of seed 5, are forward commits that reversed earlier behavior, which is why they carry reasons.
- No performance measurement is recorded, same as RentIt. Commits `e80bb1c` ("Defer Supabase imports and pin font weights to reduce bundle") and `4d8ef59` ("exclude extracted content from document library payloads") are titled as performance work and change real code, but neither records a bundle size before or after. They cannot support a performance claim.
- `c1e6152` converted Sidebar and Header to server components and extracted tiny client hooks, with no stated reason and no measured client bundle change. Real change, no rationale. Dropped for the same reason RentIt seed 9 was.
- Four commits carry a `Co-Authored-By: Codebuff` trailer: `5b0e7ae`, `179c217`, `13d832f`, and `af0a11f`. Two of them, `5b0e7ae` and `179c217`, are seeds 8 and 4. Both still carry full owner-authored rationale in the commit body, so both remain usable, and both name the owner as author in git. Noted for provenance, since the portfolio will not link to this repository publicly.