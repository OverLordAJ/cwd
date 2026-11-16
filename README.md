# NetWatch for GitHub Pages

A static, responsive news dashboard with scheduled feed updates. GitHub Actions retrieves the allowlisted RSS/Atom feeds and writes `news.json`; GitHub Pages serves the HTML, CSS, JavaScript, and latest snapshot. No browser CORS proxy or separate backend is used.

## Publish

1. Create a GitHub repository and upload **all files in this folder**, including `.github/workflows/update-news.yml`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select **main / (root)** and save.
4. Open **Actions → Update NetWatch headlines → Run workflow** whenever you want an immediate update.
5. The included workflow also runs every 30 minutes. GitHub scheduled workflows can start late, and GitHub may disable schedules on inactive repositories.

The included `news.json` is a real initial snapshot, so the site has content before the first Action run. Publisher availability varies; failed sources appear under **Publisher connection status**, and unrelated stories are never substituted for an empty region.

## Local use

Node.js 22 or newer is required for feed updates.

```sh
npm ci
npm run check
npm run update-news
npm run serve
```

Open `http://localhost:8080`. Opening `index.html` directly with `file://` will not load `news.json` in most browsers.

## Main files

- `index.html` — accessible page structure and inline SVG symbols
- `styles.css` — responsive editorial layout, light/dark themes, reduced-motion support
- `app.js` — hash routes, search, filters, mobile menu, cards, and direct publisher links
- `news.json` — generated headline snapshot
- `scripts/update-news.ts` — generates all section and regional snapshots
- `api/feeds.ts` — fixed publisher allowlist; edit this file to add or remove feeds
- `api/newsService.ts` — RSS/RDF/Atom parsing, normalization, deduplication, and timeouts
- `.github/workflows/update-news.yml` — scheduled update and commit workflow

The workflow needs **Contents: read and write** permission. This is declared in the workflow; if your organization restricts token permissions, allow them in the repository's Actions settings.
