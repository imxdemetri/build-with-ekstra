# Releasing `@ekstra/controls-web`

This package is published from `build-with-ekstra` using the GitHub workflow in `.github/workflows/npm-controls-web.yml`.

## Release Shape

- prerelease versions such as `0.1.0-preview.1` publish to npm dist-tag `preview`
- stable versions such as `0.1.0` publish to npm dist-tag `latest`
- the Git tag must match the package version exactly:
  - `controls-web-v0.1.0-preview.1`
  - `controls-web-v0.1.0`

## Before Tagging

Run these commands from `packages/controls-web`:

```bash
npm ci
npm run build
npm run typecheck
npm run release:check
npm pack --dry-run
```

## Publish Flow

1. Update `package.json` version.
2. Update `CHANGELOG.md`.
3. Commit the release prep.
4. Create and push the matching tag:

```bash
git tag controls-web-v0.1.0-preview.1
git push origin controls-web-v0.1.0-preview.1
```

5. GitHub Actions publishes the package with provenance.

## Verification

After publish:

```bash
npm view @ekstra/controls-web version
npm view @ekstra/controls-web dist-tags
```

For preview releases:

```bash
npm install @ekstra/controls-web@preview
```
