# Instructions for AI agents

drafft marketing site (getdrafft.com): static HTML, CSS and JS in `public/`, served by a Cloudflare
Worker (see [README.md](README.md)). The apps are `drafft-ios` and `drafft-android`, the backend
`drafft-backend`.

## User-facing text: WORDING.md first (priority rule)

Before writing or changing any text people see (page copy in `public/i18n.js` and `public/index.html`,
all 7 languages, the in-phone mockup profiles and chats, meta tags, store badges, social copy), read and
apply [WORDING.md](WORDING.md), then run its review checklist (section 10). The `wording` skill
(`.claude/skills/wording/`) walks through it. Never write "plan" in any sense or language, and
never present a match as turning into something. This file is shared with drafft-ios (the
reference), drafft-android and drafft-backend: see "Shared docs" before changing it.

## Working with the user

- **Rules live in this repository, never in an agent's memory.** A rule the user gives (design, copy,
  product, way of working) goes into the document it belongs to, in the same change: PRODUCT.md, this file, or WORDING.md (in drafft-ios, its source). Never save it to Claude Code's auto
  memory: a cloud session, another machine or another agent would never see it.
- **Who drafft is for stays in PRODUCT.md.** The audience (age above all, city, how often people train) is
  never written in a README or any other doc. A README never details what a session proposal holds.
- **Industry-grade solutions.** Every fix or feature takes the robust, secure, scalable solution the
  industry already uses (proven libraries and patterns: idempotency keys, retries with backoff,
  dead-letter queues and redrive, circuit breakers, stale-while-revalidate), never a quick patch.
  Challenge it before presenting it: name the pattern, its failure modes and how they are covered.
- **Design calls are yours.** On design and build tasks, decide the structure, the call to action and the
  wording (within WORDING.md) and say what you chose in the summary, instead of a round of questions.
  Lean modern: rich motion and micro-interactions.
- **Never check screens yourself**: no screenshots, no visual review by a subagent.
  Start the local server and give the address, then hand over.
  The user checks the result themselves.
- **Reviews run in depth, never trimmed.** A review (`/pr-review-toolkit:review-pr`, a pull request
  audit) uses every applicable specialist agent on each pull request (code-reviewer,
  silent-failure-hunter, pr-test-analyzer, comment-analyzer, type-design-analyzer, then code-simplifier).
  Batch by repository if needed; never drop an aspect to save agents.
- **Don't wait for CI or deploys.** Start the run, look at its status once if useful, report and move on.
  Never block on `gh run watch`.

## Repository rules

Everything an agent needs is in this repository: this file, the docs it links, and `.claude/` (settings,
git guard, skills). Claude Code loads the same files on this machine and on the web.

### Branches and commits

- Never commit on `main`. Branch from a fresh `origin/main` (`git fetch origin` first), named
  `feat/`, `fix/`, `chore/`, `docs/` or `hotfix/` + a short kebab-case name.
- Commit messages: `type(scope): description`, one line, no body, no trailers. Types: feat, fix, docs,
  style, refactor, test, chore. Scope (required): `web` (`ci`, `deps`). The description is lowercase,
  imperative, starts with a verb and has no final period. Example: `chore(web): bump wrangler`.
- Commits are authored by the user only: never a `Co-Authored-By` or any AI attribution line
  (`.claude/settings.json` turns Claude Code's off; the `commit-msg` hook and CI refuse them).
- One logical change per commit; every commit passes verify. Never `--no-verify`.
- Enforcement: the git hooks in `.agents/git-hooks/` (`git config core.hooksPath .agents/git-hooks`,
  which `.claude/settings.json` runs at the start of every session) and, for Claude Code,
  `.claude/hooks/guard-git.py` (commits and pushes to `main`, deleting them, `--no-verify`). If a hook
  refuses, change the approach; never work around it.

### Pull requests and releases

- Open them with the `create-pr` skill (`.claude/skills/create-pr/`), into `main`. Title in
  conventional commit format, English, 70 characters at most (it becomes the squash commit and feeds
  the release version: `type!:` major, any `feat` minor, else patch). Every section of the body filled,
  no AI attribution. Squash-merge.
- Never merge a pull request whose checks are red or still running, never with admin rights.
- There is no `staging` and no release workflow: pull requests go straight into `main`, and every merge deploys getdrafft.com (`ci.yml`).
- Agents never start a release or a deploy unless the user asks for it in the current request, and
  never tag by hand.

### Secrets

Never open, print, copy, search or summarize `.env*` files (`.env.example` is safe), `.dev.vars`
(`.dev.vars.example` is safe), keys, `google-services.json` or anything in `~/Secrets/`, by any means.
Run the CLI that consumes them without showing them, and only when the user asks: it writes to a remote
project. Never write, regenerate or overwrite a user's `.env.local`. `.claude/settings.json` denies the
reads.

### Environments

Apps an agent installs or launches always target the local Supabase. Never build, install, deploy or run
mutations against staging or production unless the user asks for that environment in the current
request. Compile-only checks are the exception.

### Work that spans repositories

A product feature usually runs backend, then the two apps (then the website for legal or marketing
copy): one session and one pull request per repository, backend first since the apps call its RPCs and
functions. Both apps ship it with the same names, behaviour and strings. The first
pull request states the contract (RPCs, payloads, event names) and the next ones link it. Another
repository is read on GitHub (`gh repo clone sylwaninn/<repo>` into a temporary folder), never edited
from here, except the shared docs below when the user agrees.

### Shared docs

`WORDING.md` (in drafft-ios, drafft-android, drafft-backend and drafft-web) and `DESIGN.md` (in drafft-ios
and drafft-android) are one document kept identical in each repository; drafft-ios holds the reference.
**After changing either one here, ask the user whether the change goes to the other repositories' copies.**
If yes, make the identical change in each, one pull request per repository (`gh repo clone
sylwaninn/<repo>` into a temporary folder, a branch from its base, the `create-pr` skill), and link the
pull requests to each other. Locally, drafft-ios's `scripts/sync-shared.sh` writes the copies from
drafft-ios, and `--check` lists those that differ.

### This repository

`main` deploys to production on every push: work on a branch, open a pull request. "Verify" in these
rules (`pnpm verify`) means, in this repository:

```sh
pnpm check && pnpm wording && pnpm test
```

`pnpm wording` (`scripts/ci/wording.mjs`) fails on any wording WORDING.md forbids (its
`wording-forbidden` block) in `public/i18n.js` and `public/index.html`; CI runs it on every pull
request.

## Audience measurement (PostHog Web analytics)

[docs/analytics.md](docs/analytics.md): `public/analytics.js` counts page views with PostHog (EU cloud),
without a cookie or any storage, through the Worker's `/ingest` relay (`worker/index.js`), so the CSP
stays `'self'` and the page contacts no other site. The privacy policy says so (`legal/pages/*/privacy.html`):
change what is measured, and its text changes with it, in all 7 languages. The project key is public
and goes in `analytics.js`; empty, nothing is sent. Bump the `?v=` of `analytics.js` (`index.html`,
`ANALYTICS_VERSION` in `scripts/legal.mjs`) when it changes.

**Every change to the site finishes with an audience measurement pass** (the pull request's "Notes" says
what was done, or "Measurement: none, because ..."):

1. A new page gets `analytics.js` (the legal pages through `scripts/legal.mjs`, the home page by hand) so
   its views are counted; nothing else to add.
2. A new thing to measure (a click on a store badge, a form) is a new event, and it changes the legal
   basis: first the privacy policy (7 languages) and the decision on consent, then the event, with
   `app_environment` (set for you in `before_send`) and a code-only property set.
3. Stay cookieless and first party: no cookie, no storage, no request to another site, no replay,
   autocapture or flag. The relay's allow list (`worker/index.js`) and its tests change with it.
4. PostHog is the apps' project too: filter `$host = getdrafft.com` for the site and
   `app_environment = production` everywhere; the project's test-account filter already does the latter.
