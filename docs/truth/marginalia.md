# Marginalia truth sheet

Source repository: `C:\Users\hp\Desktop\ai-research-assistant`
Repository name on GitHub: `Marginalia` (`git config remote.origin.url` gives `https://github.com/Olamilekan-oluwayomi/Marginalia.git`)
Inspected at HEAD `0d71954` (`0d719541f013f62f575641860a57819b4161c293`, 2026-09-29, "Correct the README's test counts")
103 commits on `main`, plus a local `wip-snapshot` branch. Read-only inspection. Nothing in the repository was modified.
Every claim below cites a file path or a commit hash. Anything I could not confirm from the repository is marked "unverified".

The PRD asked for the facts of the AI integration to come from the repository and not from the pitch. The two open questions on this project are the AI integration and repository visibility. Both are answered below from code and git.

## The name mismatch, resolved

The directory is `ai-research-assistant` and `package.json` has `"name": "ai-research-assistant"`, but the git remote, the README title, and the Vercel project are all Marginalia. The README heading is "# Marginalia - AI Research Assistant". Use the product name in any public copy; cite the directory only when pointing at files.

## Live URL

unverified, and there is a drafted URL in the PRD that must not be reused.

- PRD line 494 and line 1486 draft `https://marginalia-u6x8.vercel.app/`. Neither the repository nor a successful request to it confirms this is the current deployment.
- `.vercel/repo.json` records a project link: id `prj_9AK5lodUU3rF5tgA1NOTXL1lRBH5`, name `ai-research-assistant`, orgId `team_CyQAZKPvvNHZJppXpyGeZiJi`. That is evidence the repo has been connected to a Vercel project. It carries no deployment URL. The `.vercel` directory is gitignored (`.gitignore`, the `# vercel` block), so this file is local machine state, not repository evidence.
- Commits `1204e81` and `270ad59`, both titled "Trigger initial deployment", are the only deployment evidence in the history.

The owner must supply the confirmed URL from the Vercel dashboard. Until then status cannot be `live` and no "Open live" button appears.

## Repository visibility

**Private, and confirmed as such.** The GitHub API returns HTTP 404 for `https://api.github.com/repos/Olamilekan-oluwayomi/Marginalia`, which is what GitHub returns for a private repository to an unauthenticated caller. A repository that did not exist, or one owned by a different account, would produce the same 404, so this is strong but not absolute evidence. Combined with `remote.origin.url` resolving to that path and the local clone having `origin/main`, treat "private" as verified enough to plan around, and confirm it from the GitHub UI before it is published.

This clears the `[CONFIRM repo visibility]` marker at PRD line 1212 and line 494. PRD line 1313 allows "the repository (or a written reason it is private)", so a private repo is workable, but the project page cannot carry a Source link to a repo no visitor can open. The decision on what the Source affordance becomes is the owner's.

## Stack with versions

Declared from `package.json`, installed from `node_modules`.

| Package | Declared | Installed here |
| --- | --- | --- |
| next | `16.3.0` (exact) | 16.3.0 |
| react | `19.2.8` (exact) | 19.2.8 |
| react-dom | `19.2.8` (exact) | 19.2.8 |
| @google/genai | `^2.16.0` | 2.16.0 |
| @supabase/supabase-js | `^2.112.2` | 2.112.2 |
| @supabase/ssr | `^0.12.4` | 0.12.4 |
| unpdf | `^1.8.1` | 1.8.1 |
| lucide-react | `^1.31.0` | not read separately |
| server-only | `^0.0.1` | not read separately |
| vitest | `^4.1.10` | 4.1.10 |
| typescript | `^5` | not read separately |
| eslint | `^9` | not read separately |
| prettier | `^3.9.9` | not read separately |
| tailwindcss | `^4` | 4.3.3 |
| react-compiler | `1.0.0` (exact, as `babel-plugin-react-compiler`) | not read separately |

Next.js, React and React DOM are pinned exactly rather than by caret, which is why the installed and declared versions match. `next.config.ts` sets `reactCompiler: true`.

## The AI integration, from the code

This is the part PRD line 1313 requires. Everything below is from source, not from the README's description.

### Providers, and what falls back to what

- Primary answer generation is Google Gemini through `@google/genai`, default model `gemini-3.5-flash-lite` (`src/lib/ai/index.ts` line 23). A comment at lines 19 to 22 records that `gemini-2.5-flash` was retired for new API keys and that `gemini-3.5-flash` was also considered, so the literal is deliberate, not a typo.
- The fallback provider is Groq, OpenAI compatible, default model `openai/gpt-oss-120b` (`src/lib/research/providers/groq.ts`, and `GROQ_MODEL` in `.env.example`).
- Web search is Tavily (`src/lib/search/providers/tavily.ts`), behind a provider interface in `src/lib/search/`.
- `GeminiAnswerProvider` and `GroqAnswerProvider` both implement `AnswerGenerationProvider` (`src/lib/research/providers/types.ts`), and `generation.ts` holds two instances: `answerGenerationProvider` and `fallbackAnswerGenerationProvider`. The generation layer is provider independent.
- PDF text extraction is `unpdf`, server side.

### Why the fallback fires, and what it does not redo

`isLlmFallbackEligible` (`src/lib/research/providers/fallback.ts`) retries on the fallback provider only for transient conditions: HTTP 429, 500, 502, 503, 504, and RPC codes `RESOURCE_EXHAUSTED`, `RATE_LIMITED`, `UNAVAILABLE`, `INTERNAL`. Anything else, including an app error, a missing key, or a malformed response, is permanent and is not retried, because it would fail identically on the second provider. The comment in that file states this reasoning directly.

The fallback is deliberately narrow. The comment on `fallbackAnswerGenerationProvider` in `generation.ts` says the same assembled prompt, context, and budget are retried, and that research, relevance checks, and web search are never re-run for the fallback. So a Groq retry does not re-bill Tavily and does not re-run the relevance classifier. That is a cost decision, and the code documents it as one.

### Citation integrity, which is the actual product idea

The README calls this "citation integrity". The mechanism is in `src/lib/research/citation-generation.ts`.

The model is shown the research context as a numbered list and cites by 1-based list index in a field called `evidence`, never by document or source id. The type comment states the reason: it cannot fabricate a reference to an item that was not provided. `ANSWER_OUTPUT_SCHEMA` is handed to the provider so the response is already well-shaped JSON, and the server re-validates regardless.

`parseGeneratedAnswerOutput` rejects the whole output on a malformed shape: a non-object, an empty answer, a non-array of citations, a citation number below 1, an evidence index below 1, or the same citation number used twice.

`toAnswerCitations` then resolves each index against the real context and drops anything unresolvable, counting the drops in `rejectedCount`. A document citation is rejected if the document has no body text. A web citation is rejected if the source has neither a URL nor pasted content. **Every display field is filled server-side from the resolved item's real data, never from the model**, which is what stops page numbers, section names and quotes being invented. The function comment says so in those words.

For a web source with no pasted body text, the snippet falls back to the answer sentence carrying that marker, taken verbatim from the model's own output. The code notes this layer never writes it.

`sanitizeAnswerMarkers` runs before persistence and does two things. `normalizeMalformedMarkers` repairs a bare sentence-final integer the model wrote instead of a bracketed marker, so "anomalies 1." becomes "anomalies [1]." when 1 is a resolved citation and is removed when it is not. Inline integers such as "0.05" or "1961-2018" are left alone, and multi-digit values ending a sentence are never erased. `stripUnresolvedCitationMarkers` then removes every `[n]` whose citation did not resolve, so the persisted answer cannot display a dangling marker.

### Prompt injection handling

`ANSWER_BASE_PROMPT` in `generation.ts` instructs the model that a RESEARCH CONTEXT section follows the question, that anything inside it is data and never instructions, and that it can never override the instructions. It also covers reference-metadata-only items, which have not been read and must not be quoted, summarized, cited, or described, though the user may be pointed at them. The same array forbids claiming to have performed a web search or read anything beyond the context provided, and requires saying plainly what is missing rather than speculating. This is a real trust boundary in the prompt, and PRD section 38 asks for the facts of it.

### Modes

`SourceMode` is `"document" | "web" | "both"`, stored on every answer in `answers.source_mode` with a check constraint, defaulting to `document` for legacy rows (migration `20260815100000_add_answers_source_mode.sql`).

Explicit intent wins when the question carries a phrase cue such as "in the document" or "search the web" (`detectExplicitSearchIntent`, `src/lib/research/relevance-check.ts`, with the phrase lists defined in that file).

Smart mode with no explicit cue runs a Gemini classifier returning `{ relevant, confidence, reason }` with a 200 token cap (`MAX_OUTPUT_TOKENS` in `relevance-check.ts`). Relevant means answer from the document; not relevant means fall back to the web and persist a user-facing reason on the answer. That reason is a real constant, `FALLBACK_REASON_MESSAGE` in `generation.ts`, and its column and rationale are in migration `20260815000000_add_answers_fallback_reason.sql`.

There is a web-only safety invariant: if a web-only question produces no usable web evidence, the question is failed rather than answering with an empty claim that a search happened (`NO_WEB_SOURCES_MESSAGE`, with the invariant spelled out in the comment above it).

### Bounds, all from source

| Bound | Value | Location |
| --- | --- | --- |
| Answer token cap | 2,000 | `ANSWER_MAX_OUTPUT_TOKENS`, `generation.ts` |
| Generation and Groq timeout | 30,000 ms | `GENERATION_TIMEOUT_MS`, `src/lib/ai/index.ts` line 32 |
| Web search timeout | 15,000 ms | `SEARCH_TIMEOUT_MS`, `src/lib/search/index.ts` line 18, and `TAVILY_TIMEOUT_MS` in the Tavily provider |
| Relevance classifier token cap | 200 | `relevance-check.ts` |
| Relevance input per document | 4,000 chars | `MAX_RELEVANCE_DOCUMENT_CHARS`, `generation.ts` line 289 |
| Relevance input total | 12,000 chars | `MAX_RELEVANCE_SUMMARY_CHARS`, `generation.ts` line 290 |
| Passages per document | 6 | `MAX_CONTEXT_ITEMS`, `context.ts` line 11. Despite the name, this bounds the per-document passage selection in `selectRelevantPassages` (line 1406 documents it as "Bounded at MAX_CONTEXT_ITEMS passages") and is also reused as a cap on value candidates in `collectValueCandidates` (line 914). It is not a cap on the total number of context items. |
| Context content per item | 2,000 chars | `MAX_CONTENT_CHARS`, `context.ts` line 14, applied by `truncate` at line 493 |
| Question length | 1,000 chars | `QUESTION_MAX_LENGTH`, `context.ts` line 8 |
| Extracted document text | 200,000 chars | `MAX_CONTENT_CHARS`, `document-parse.ts` line 6 |
| New sources per web search | 5 | `MAX_NEW_SOURCES`, `web-research.ts` |
| PDF upload | 10 MB | storage bucket `file_size_limit` 10485760, migration `20260813000000_add_document_content_and_storage.sql` |
| Question rate limit | 20 per 5 minutes, global per user | `QUESTION_WINDOW_LIMIT` and `QUESTION_WINDOW_MINUTES`, `src/app/research/[id]/actions.ts` lines 33 and 34, enforced by `getRecentUserQuestionCount`. Commit `04031c6`. |
| Stale answer recovery | 5 minutes | `STALE_ANSWER_MS`, `src/components/research/StuckAnswerRecovery.tsx` line 18 |
| Server action body limit | 12 MB | `next.config.ts`, with a comment explaining it is above the 10 MB per-file limit to leave room for multipart overhead |

The rate limit is worth one line of copy because of its shape: `getRecentUserQuestionCount` counts across all of the user's workspaces, and its comment says the cap is global per user rather than per research, so a user cannot bypass it by spreading questions across many workspaces.

## Evidence retrieval

`src/lib/research/context.ts` is the retrieval layer, 500 lines plus tests. What is in it:

- **Keyword expansion.** `CONCEPT_TERMS` maps concept synonyms, and `WORD_FORMS` maps word form variants. A document that says "assessed" matches a question about "evaluated". `wordFormSource` is the lookup.
- **Stopwords**, `STOPWORDS`, excluded from matching.
- **Value-seeking detection.** `isValueSeeking` and `VALUE_MARKERS` with a `VALUE_WINDOW` of 25 handle questions that want numbers. `VALUE_CONCEPTS` and `activeValueConcepts` identify which value concepts are in play.
- **Scoring margin.** `VALUE_CANDIDATE_SCORE_RATIO = 0.45` decides when a secondary passage is close enough to the best one to surface.
- **Dedupe by URL.** `dedupeSources` keys on normalized URL via `normalizeUrl`.
- **Reference metadata only.** Items with no text snippet are marked so the citation protocol will not cite them. `web-research.ts` documents that items with no snippet are reference metadata only and never citable.

The behavior change here is commit `970f5f2`, "Surface multiple value-bearing passages instead of suppressing secondaries when primary cluster covers all concepts". Before it, a primary cluster that already touched every question concept suppressed the secondaries. After it, other strong passages still surface, so a multi-section document contributes complementary evidence. It is 154 lines of change plus 55 lines of regression test, and the README names the regression test as the coverage that locks the behavior in. This is a good candidate for the PRD's evidence requirement of a visible correction.

## Routes

App Router, server rendered. Page routes under `src/app`:

| Path | File | Guard |
| --- | --- | --- |
| `/` | `page.tsx` | none, redirects when signed in per `login/page.tsx` and `register/page.tsx` behavior |
| `/documents` | `documents/page.tsx` | `redirect("/login")` per the smoke test, item 4 |
| `/research` | `research/page.tsx` | same |
| `/research/new` | `research/new/page.tsx` | same |
| `/research/[id]` | `research/[id]/page.tsx` | same |
| `/settings` | `settings/page.tsx` | `redirect("/login")` in the page, line 29 |
| `/login` | `login/page.tsx` | redirects away when signed in |
| `/register` | `register/page.tsx` | redirects away when signed in |

Route handlers: `src/app/api/health/route.ts`, `src/app/api/ai/health/route.ts` (development only per the README), `src/app/auth/callback/route.ts`.

`src/app/sitemap.ts` lists only `/login` and `/register`. `src/app/robots.ts` allows those two and disallows `/research/`, `/documents`, `/settings`, `/api/`, `/auth/`. That is a deliberate choice for a single-user private app, and it is the honest SEO story: nothing here is indexable except the two entry pages.

## Auth and database

### Tables, all with RLS

Six application tables from migration `20260811120000_create_research_schema.sql`: `research`, `research_questions`, `documents`, `sources`, `answers`, `citations`. `profiles` predates the migrations in this repository and was secured separately in `20260929000000_secure_profiles.sql`.

This is the opposite of RentIt. Every table here has RLS enabled in a versioned migration, so the Permission map for Marginalia can be built from the repository. Only `profiles` needed a late fix, which is its own decision (seed 2 below).

Ownership rules are enforced at the database, not in application code, and the migration header says so in those terms: user_id values supplied by clients are never trusted.

- `research`: four policies keyed on `user_id = auth.uid()`.
- `research_questions`, `documents`, `sources`: read and write requires `user_id = auth.uid()` **and** an `exists` check that the referenced research belongs to the same user. Two conditions, because the tables carry a denormalized `user_id` alongside `research_id`.
- `answers`: no `user_id` column. Policies go through `exists` on the parent research, and additionally require the question to belong to that same research.
- `citations`: no `user_id` column. Policies join `answers` to `research`, and the INSERT and UPDATE policies additionally require any `document_id` or `source_id` to belong to the same research as the answer. That is what stops a citation pointing at evidence from a different workspace.

### Database triggers that enforce structure

- `enforce_child_ownership`, attached to `research_questions`, `documents`, `sources`. Before insert or update, it looks up the owner of the referenced research and raises `23503` if `user_id` does not match. `SECURITY DEFINER`, `search_path = public`.
- `enforce_answer_research_match`, attached to `answers`. Raises `23503` if the question's `research_id` differs from the answer's.
- `set_updated_at` on `research` and `documents`.
- `citations_exactly_one_evidence`, a check constraint: `(document_id is null) <> (source_id is null)`. A citation must point at exactly one of a document or a source, enforced by the database.

The migration header states the reference design: every reference to `profiles` is `ON DELETE RESTRICT` so research data cannot disappear through an unrelated account operation, while every reference down the research subtree cascades so deleting a workspace removes its dependents. That is a deliberate asymmetry and it is documented.

### Storage

Private bucket `documents`, `public: false`, 10 MB limit. Four policies on `storage.objects` scoping select, insert, update and delete to `(storage.foldername(name))[1] = auth.uid()::text`, so objects live under a `{user_id}/{document_id}/` prefix and ownership is derived from `auth.uid()`, never from a client-supplied path. The migration says this mirrors the table RLS.

### Keys

`git grep -n service_role` across the repository returns exactly one hit, and it is a comment in `.env.example` line 8 telling the reader never to use the service role key. No service role key is committed. `GEMINI_API_KEY`, `TAVILY_API_KEY`, and `GROQ_API_KEY` are read from `process.env` inside modules that start with `import "server-only"`, which is the build-time guarantee they cannot reach a client bundle. `.env*` is gitignored with `!.env.example` as the only exception.

## Real states

- Documents: `pending` -> `processing` -> `ready` or `failed`, enforced by the `documents_status_check` constraint and driven by an atomic claim in the processing module. Only `ready` documents are eligible as evidence.
- Questions: `pending` -> `generating` -> `complete` or `failed`, enforced by `research_questions_answer_status_check`.
- Stale recovery: if a background task is killed mid-flight the question is left `generating` or `pending`, and after 5 minutes `StuckAnswerRecovery` renders a reset control. `background.ts` states the invariant in its header: the task must never be the source of truth, the database status is.
- Failed answers render a Retry control and never a raw provider error.
- Empty states: workspace empty states for no questions, no documents, no sources, listed as smoke test item 7.
- Streaming: the ask action returns immediately, generation runs in `after()`, and `QuestionStatusPoller` polls the status. The UI updates without a reload.
- Citation interaction: clicking a `[n]` marker scrolls to the margin note and flashes it for 1500 ms (`FLASH_DURATION_MS` in `Citation.tsx`), with a `scrollend` listener and a scroll-settle fallback.

## Tests

README claims 474 tests across 36 files, corrected in commit `0d71954` from a stale 478 across 33.

My count: **36 test files, 446 `it(`/`test(` call sites.** The file count matches the README exactly. The test count does not. The difference is most likely parameterized cases, `it.each` or `describe.each` loops, which my grep counts once per declaration rather than once per generated case, so my figure is a floor rather than a contradiction. I did not run the suite. Treat "474 across 36" as owner verified via `npm test` (the commit body says it was verified against `npm test`, not recounted by hand) and my 446 as an independent lower bound.

Highest-value coverage per the README, in `src/lib/research/`: `context.test.ts` for passage selection and the value-redundancy regression, `citation-generation.test.ts` for the citation protocol and marker sanitization, and the provider contracts in `providers/__tests__/`.

Vitest is split into two projects selected by file extension, `.test.ts` in node and `.test.tsx` in jsdom, so environment follows from extension instead of a per-file docblock (commit `ba2d4cd`). Scripts: `test`, `test:node`, `test:dom`, `lint`, `format`, `format:check`, `typecheck`, `dev`, `build`, `start`.

## Testing and security documentation

`SMOKE-TEST.md` is a 24 item manual pass/fail checklist for a deployed environment, including a cross-account isolation section that needs two accounts. This is unusual and worth knowing about: it is the owner's own verification artifact, not generated filler.

`design-system.md` is 184 lines. `AGENTS.md` in this repo is 5 lines and contains only a Next.js agent-rules block that `next dev` writes and re-adds automatically; `CLAUDE.md` is a single `@AGENTS.md` include. So this repository's own agent guardrails are effectively the Next.js block. That is a fact about this repo, and it does not conflict with the portfolio `AGENTS.md`, which governs sessions run from the portfolio directory.

## Open uncertainties

1. Live URL. Vercel project link exists, deployment URL not in the repository, and the PRD's drafted URL is unconfirmed. Owner action.
2. Repository visibility is private, inferred from a 404 on the unauthenticated GitHub API. Confirm in the GitHub UI before publishing. PRD line 494's `[CONFIRM repo visibility]` and line 1212's repository name can both be closed once confirmed.
3. Whether the 474 test figure is current. Owner verified at `0d71954`; I did not run the suite.
4. Whether a production deployment exists at all beyond the two "Trigger initial deployment" commits. unverified.
5. Tavily free tier is capped at 1,000 credits per month per `.env.example`. Whether the live deployment is on that tier and what happens at the cap is unverified. This is a real product limitation if the portfolio implies "live web research" without qualification.
6. `GROQ_API_KEY` is optional. If it is unset in the deployment, the fallback path never runs in production, which would make the resilience story unverified rather than shipped.
7. Project year. The first commit is 2026-07-22 and the history runs to 2026-09-29. Whether the project is 2026 is not stated anywhere in the repository. unverified.
8. Whether this is the project's original name or a rename. The directory, `package.json`, Vercel project, and git remote disagree. No commit records a rename. unverified.