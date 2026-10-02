<!--
Title: type(scope): lowercase description, no final period. It becomes the squash commit on main.
  types: feat, fix, docs, style, refactor, test, chore. `type!:` for a breaking change.
Base: main (this repository has no staging; a merge deploys getdrafft.com).
No AI attribution line in the description or in any commit (CI refuses it, scripts/ci/pr_check.sh).
Delete these comments and any section that doesn't apply.
-->

## Summary

<!-- What changes for the person using drafft, in two or three sentences. Then why. -->

## Changes

<!-- The main changes, one line each, with the types or files that carry them. -->

-

## Testing

<!-- What you ran and what you saw. Say what you did not run. -->

- [ ] `pnpm check && pnpm wording && pnpm test`
- [ ] Looked at the page locally, steps:
  1.

## Screenshots

<!-- UI changes: before / after, light and dark, the longest language (FR, DE or NL) when a label moved. -->

## Notes

- **Telemetry:** <!-- page views or events counted (docs/analytics.md), or "none, because ..." -->
- **Wording:** <!-- strings added or changed in the 7 languages after WORDING.md section 10, or "no user-facing text" -->
- **Privacy:** <!-- new personal data, third party or retention change (legal pages in drafft-web), or "none" -->
- **Companion pull requests:** <!-- the other drafft repositories, or "none" -->
- **Breaking change:** <!-- what a client or the backend must do, or "none" -->
