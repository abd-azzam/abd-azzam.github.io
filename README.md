# Personal academic website

A Jekyll site in the style of [mdcattaneo.github.io](https://mdcattaneo.github.io):
a dark sticky header with the site title on the left and two rows of navigation on
the right, a photo-and-affiliation sidebar next to the bio on the home page, plain
numbered lists for papers and courses, and a dark footer with the department address.

Built to deploy on GitHub Pages with no build step of your own.

## Start here — the five edits that matter

1. **`_config.yml`** — your name, the one-line site description, and the `author`
   block (role, department, institution, address, email). These feed the sidebar,
   the footer, and the page titles, so you only write them once.
2. **`index.html`** — the bio. Four paragraphs, each starting with `REPLACE`.
3. **`_data/navigation.yml`** — which pages appear in the nav, and the small row of
   off-site links above it (CV, Google Scholar, GitHub, email).
4. **`assets/images/headshot.jpg`** (800×1000) and **`headshot-400.jpg`** (400×500) —
   the sidebar photo. To change it, replace both files with a 4:5 portrait crop.
5. **`cv/azzam-cv.pdf`** — add your CV under that exact name, or rename it and update
   the two places it is linked (`_data/navigation.yml` and `_includes/contact.html`).

The content pages (`research.html`, `experience.html`, `skills.html`,
`referees.html`) are filled in from the CV. Update them as the CV changes.

## Publishing on GitHub Pages

In the repository, go to **Settings → Pages** and set the source to **Deploy from a
branch**, pick the branch, folder `/ (root)`. GitHub builds the Jekyll site for you.

### Getting the address you want

GitHub serves a **user site** — one at the bare `https://<username>.github.io`, with no
path after it — only when the repository is named exactly `<username>.github.io`. The
username is fixed by the account, so the address always contains the account name
unless you bring your own domain.

**This config targets `https://abd-azzam.github.io`.** Two renames, in this order:

```
1. Account:     DurovWannaBe -> abd-azzam              Settings -> Account -> Change username
2. Repository:  Website-     -> abd-azzam.github.io    Settings -> General -> Repository name
```

`abd-azzam` was unregistered when this was written. If it has since been claimed,
`abdazzam21` was also free; `abdullah-azzam`, `abdullahazzam`, `azzamabdullah`,
`azzam-abdullah`, `abdazzam`, and `a-azzam` are all taken. Whatever you land on, set
`url: "https://<newname>.github.io"` and leave `baseurl: ""`.

If you would rather not rename the account, name the repository
`durovwannabe.github.io` instead and set `url: "https://durovwannabe.github.io"` —
`baseurl` stays empty either way.

**A custom domain** is the alternative — the only route to your full name, and the one most
academics take. Works with any username and any repository name, so no renaming at
all, and the address survives moving off GitHub Pages later. Costs roughly $10–15 a
year for the domain.

1. Buy a domain, e.g. `abdullahazzam.com`.
2. At the registrar, create four `A` records for the apex pointing at
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a
   `CNAME` for `www` pointing at `<username>.github.io`.
3. In **Settings → Pages → Custom domain**, enter the domain and save. GitHub commits
   a `CNAME` file to the repository for you.
4. Tick **Enforce HTTPS** once the certificate is issued (can take a few minutes).
5. Set `url: "https://abdullahazzam.com"` and `baseurl: ""` here.

Do not add a `CNAME` file by hand before the domain resolves — Pages will fail to
serve the site while the domain is unverified.

| What you end up with | `url` | `baseurl` |
| --- | --- | --- |
| Account `abd-azzam`, repo `abd-azzam.github.io` — **current config** | `https://abd-azzam.github.io` | `""` |
| Account unchanged, repo `durovwannabe.github.io` | `https://durovwannabe.github.io` | `""` |
| Custom domain | `https://yourdomain.com` | `""` |
| Any other repo name, e.g. `Website-` | `https://durovwannabe.github.io` | `"/Website-"` |

Match capitalisation exactly — Pages paths are case-sensitive, and a mismatched
`baseurl` is the usual reason a deployed site loads with no styling.

### If you rename the account

- Update the GitHub links in `_data/navigation.yml` and `_includes/contact.html`.
  Old *profile* URLs are not redirected and will 404.
- Update your git remote:
  `git remote set-url origin https://github.com/<newname>/<newname>.github.io`
- The old username becomes claimable by someone else, so do not leave links pointing
  at it.

### Notes

- Pages on a **private** repository requires GitHub Pro, Team, or Enterprise. On the
  free plan the repository must be public.
- The first build takes a minute or two. Check progress under the repository's
  **Actions** tab.

## Previewing locally

```sh
bundle install
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>. If `baseurl` is set, the site is at
<http://localhost:4000/website-/>.

## How the pieces fit

```
_config.yml              site title, description, url/baseurl, author block
_data/navigation.yml     both navigation rows
_layouts/default.html    the shell every page renders into
_includes/
  head.html              meta tags, title, stylesheet, favicon
  header.html            site title + navigation (mobile menu is CSS-only)
  contact.html           sidebar: photo, affiliation, CV button, social icons
  footer.html            address block and institution line
assets/css/styles.css    the whole design; palette lives in `:root` at the top
assets/js/navigation.js  menu niceties only — the menu works without JS
index.html               home page (sidebar + bio)
research.html            interests, thesis, current and earlier projects
experience.html          positions and education
skills.html              methods, software, writing
referees.html            referees
papers/                  PDFs of your papers and slides
cv/                      your CV PDF
```

### Adding a page

Create `newpage.html` with front matter modelled on the others:

```yaml
---
title: New Page
body_class: "new-page"
permalink: /new-page/
---
```

Then add it to `main:` in `_data/navigation.yml`. Nothing else needs touching.

### Changing the colours

The palette is six variables at the top of `assets/css/styles.css`:

```css
--bar:         #121212;              /* header and footer */
--accent-deep: rgb(23, 42, 84);      /* links, CV button */
--accent-warm: rgb(201, 138, 42);    /* nav underline on the active page */
```

## Notes

- The mobile menu is a CSS checkbox toggle, so navigation works with JavaScript off.
- Pages carry a visually hidden `<h1>` for screen readers and search engines; only the
  home page shows one.
- `redirect_from` entries keep old URLs such as `/research.html` working if you have
  already shared them.
