# Instructions for AI agents

drafft marketing site (getdrafft.com): static HTML, CSS and JS in `public/`, served by a Cloudflare
Worker (see [README.md](README.md)). The apps are `drafft-ios` and `drafft-android`, the backend
`drafft-backend`.

## User-facing text: WORDING.md first (priority rule)

Before writing or changing any text people see (page copy in `public/i18n.js` and `public/index.html`,
all 7 languages, the in-phone mockup profiles and chats, meta tags, store badges, social copy), read and
apply [WORDING.md](WORDING.md), then run its review checklist (section 10). The `wording` skill
(workspace `.claude/skills/wording/`) walks through it. Never write "plan" in any sense or language, and
never present a match as turning into something. `../drafft-ios/WORDING.md` is the source: this copy is
synced by the workspace's `scripts/sync-docs.sh`, never edited here.

## Workspace rules

This repository lives in the drafft workspace (the parent folder, see `../AGENTS.md`), which holds what
every repository shares: commit and GitHub rules (`../.claude/rules/`), the `create-pr` and `wording`
skills (`../.claude/skills/`), and the Claude Code settings and git guard (`../.claude/`). Start agents
there. In short: work on a branch, one-line commits `type(scope): description` without any
Co-Authored-By, a pull request into `staging`, verify first. The git hooks in `.agents/git-hooks/`
enforce it for agents and humans (`git config core.hooksPath .agents/git-hooks`, set by the
workspace's `scripts/bootstrap.sh`).

`staging` (the default branch) takes every pull request; `main` is production and only moves through
the release workflow (Actions > release: staging's new commits onto `main`, a `vX.Y.Z` tag and a GitHub
release, see `scripts/ci/release.sh`). The release deploys its tag to getdrafft.com. "Verify" in these
rules (`pnpm verify`) means, in this repository:

```sh
pnpm check && pnpm wording
```

`pnpm wording` (`scripts/ci/wording.mjs`) fails on any wording WORDING.md forbids (its
`wording-forbidden` block) in `public/i18n.js` and `public/index.html`; CI runs it on every pull
request.
