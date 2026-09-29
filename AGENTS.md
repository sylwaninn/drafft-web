# Instructions for AI agents

drafft marketing site (getdrafft.com): static HTML, CSS and JS in `public/`, served by a Cloudflare
Worker (see [README.md](README.md)). The app is the `drafft` repository, the backend `drafft-backend`.

## User-facing text: WORDING.md first (priority rule)

Before writing or changing any text people see (page copy in `public/i18n.js` and
`public/index.html`, all 7 languages, the in-phone mockup profiles and chats, meta tags, store
badges, social copy), read and apply [WORDING.md](WORDING.md), then run its review checklist
(section 10). The `wording` skill (`.agents/skills/wording/`) walks through it. Never write "plan" in
any sense or language, and never present a match as turning into something. WORDING.md here is a
synced copy: edit it in the `drafft` repository only, then run `drafft/scripts/sync-wording.sh`.

## Rules for every agent

Read these before committing or opening a pull request. They live in `.agents/` so any agent can use
them; Claude Code loads them through `CLAUDE.md`.

- Commits and branches: [.agents/rules/commits.md](.agents/rules/commits.md)
- GitHub (pull requests, comments): [.agents/rules/github.md](.agents/rules/github.md)
- Skills: `.agents/skills/` (`create-pr`, `technical-writer`, `wording`)
- Git hooks that enforce them for everyone, agents and humans (`.agents/git-hooks/`): `commit-msg`
  (format, one line, no Co-Authored-By) and `pre-push` (no push to `main`). Enable once per clone:
  `git config core.hooksPath .agents/git-hooks`

`main` deploys to production on every push: work on a branch, open a pull request. "Verify" in these
rules (`pnpm verify`) means, in this repository:

```sh
pnpm check && pnpm wording
```

`pnpm wording` (`scripts/ci/wording.mjs`) fails on any wording WORDING.md forbids (its
`wording-forbidden` block) in `public/i18n.js` and `public/index.html`; CI runs it on every pull
request.
