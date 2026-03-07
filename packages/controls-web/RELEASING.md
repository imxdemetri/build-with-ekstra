# Releasing `@ekstraai/controls-web`

This package is published from `build-with-ekstra` using the GitHub workflow in `.github/workflows/npm-controls-web.yml`.

The workflow supports two publish modes:

- npm trusted publishing with GitHub Actions OIDC
- `NPM_TOKEN` fallback for the first publish or for account-side recovery

## Release Shape

- prerelease versions such as `0.1.0-preview.2` publish to npm dist-tag `preview`
- stable versions such as `0.1.0` publish to npm dist-tag `latest`
- the Git tag must match the package version exactly:
  - `controls-web-v<version>`

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
git tag controls-web-v<version>
git push origin controls-web-v<version>
```

5. GitHub Actions publishes the package with provenance.

If trusted publishing is not configured yet, add a repository secret named `NPM_TOKEN` from the `ekstraai` npm account and rerun the release tag.

## Verification

After publish:

```bash
npm view @ekstraai/controls-web version
npm view @ekstraai/controls-web dist-tags
```

For stable releases:

```bash
npm install @ekstraai/controls-web
```

For preview releases:

```bash
npm install @ekstraai/controls-web@preview
```

