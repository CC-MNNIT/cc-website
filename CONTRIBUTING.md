# Contributing to the CC Club Website

Welcome! Whether you're here to add an event, fix a typo, write a blog post, or build a new feature - this guide tells you everything you need to know.

> **Writing a blog post?** Jump to [CONTRIBUTING_BLOG.md](CONTRIBUTING_BLOG.md) and come back here only for setup.

## Table of Contents

1. [What is Zola? (for React devs)](#what-is-zola-for-react-devs)
2. [Setup](#setup)
3. [Content contributions (events, team, projects, roadmaps)](#content-contributions)
4. [Working on the code](#working-on-the-code)
5. [Git workflow & pull requests](#git-workflow--pull-requests)
6. [Testing & troubleshooting](#testing--troubleshooting)
7. [Resources](#resources)

---

## What is Zola? (for React devs)

Most of us learned web dev with React, so here's the mental model:

**React/Next.js** → components + JS at runtime → a JavaScript bundle the browser executes.

**Zola** → Markdown + templates → plain HTML/CSS/JS generated **once, at build time**. There is no bundle, no runtime framework, no npm install.

| Concept you know | Zola equivalent |
|---|---|
| `npm run dev` | `zola serve` (auto-reloads on save) |
| `npm run build` | `zola build` (outputs to `public/`) |
| JSX components | Tera templates (`.html` files) |
| `.tsx`/`.ts` files | Markdown (`.md`) files in `content/` |
| `props` | Template variables (`{{ page.title }}`) |
| Data fetching / state | `data/*.toml` files loaded with `load_data()` |
| `next.config.js` | `config.toml` |

**The important consequence:** most contributions (events, team members, blog posts, roadmaps) are just **editing Markdown or TOML files** - no code, no build step, no JavaScript knowledge required.

The only things you need on your machine are **Git** and **Zola** (one binary, no dependencies).

---

## Setup

### 1. Prerequisites

- **Git** - [install](https://git-scm.com/downloads)
- **Zola v0.23.4** - [download the binary for your OS](https://github.com/getzola/zola/releases/tag/v0.23.4)
  - ⚠️ **Use exactly v0.23.4** - the config and CI expect this version. Don't use `apt`/`brew`/`pacman`; they often install a different version.
  - Verify with `zola --version` → should print `zola 0.23.4`.
- A **GitHub account** (to open a pull request)
- A text editor (VS Code recommended)

### 2. Clone the repository

Everything (templates, styles, scripts) lives in this repo - no submodules. `--depth=1` fetches only the latest commit, which is all you need to contribute:

```bash
git clone --depth=1 https://github.com/CC-MNNIT/cc-website.git
cd cc-website
```

### 3. Run the dev server

```bash
zola serve
# → http://127.0.0.1:1111
# → auto-reloads whenever you save a file
```

The site updates live, so you can edit a file and see the result immediately in your browser.

---

## Content contributions

These are the most common (and easiest) contributions. All of them are plain Markdown/TOML edits - no Zola knowledge beyond `zola serve` needed.

> **Where to put images:** always inside `static/images/...`, then reference them as `/images/...` in content. Never reference files from outside `static/`.

### Events

Events live in year folders: `content/events/YYYY/`.

1. **Create a file** `content/events/2026/your-event-slug.md` (copy an existing event as a starting point).
2. **Frontmatter** (the block between `+++` markers):

```toml
+++
title = "My Event 2026"
date = 2026-03-01
description = "One or two sentences about the event."
template = "events/single.html"

[extra]
event_type = "contest"          # "contest" | "workshop" | "talk" | ...
status = "upcoming"             # "upcoming" | "completed"
date_label = "Mar 2026"         # short label shown on cards
external_link = "https://..."   # registration/link-out URL
location = "MNNIT Allahabad"
participants = "500+"
prize_pool = "₹10,000"          # or "TBA"
banner_image = "events/2026/my-event/banner.webp"
show_banner = true
images = ["events/2026/my-event/banner.webp"]
+++

## About My Event

Write the event description in Markdown here.
```

3. **Images:** put them in `static/images/events/2026/my-event/` and reference as `/images/events/2026/my-event/banner.webp`.

Event pages are grouped per year (`content/events/2026/_index.md`) and shown on the listing page (`content/events/_index.md`). Set `status = "upcoming"` or `"completed"` to control which list the event appears in.

### Team members

Team data lives in `data/team.toml` (not in `content/`). The file has four groups:

- `[faculty]` - a single entry (name, title, image, email, profile_url)
- `[[ccrs]]` - array of CCRs (name, role, image, linkedin, github, instagram)
- `[[design]]` - design team
- `[[marketing]]` - marketing team

Add a new member by appending to the matching group:

```toml
[[ccrs]]
name = "Your Name"
role = "CCR"
image = "teams/yourname.webp"
linkedin = "https://linkedin.com/in/yourname"
github = "https://github.com/yourname"
instagram = "https://instagram.com/yourname"
```

Photos go in `static/images/teams/` and are referenced relative to `images/` (e.g. `teams/yourname.webp`).

### Projects

Projects live in `data/projects.toml`. Append a new `[[projects]]` entry:

```toml
[[projects]]
title = "My Project"
description = "What it does, in one or two sentences."
icon = "fa-solid fa-code"
tech_stack = ["React", "Python"]
repo_url = "https://github.com/yourname/my-project"
authors = ["yourname"]
```

### Roadmaps

Roadmaps are pages in `content/roadmaps/` (e.g. `web-development.md`). A roadmap has two parts:

1. **Frontmatter** - metadata and the landing-page carousel card:

```toml
+++
title = "My Roadmap"
weight = 5                       # order on the roadmaps page (lower = first)
description = "Short summary"
difficulty = "Beginner to Advanced"
estimated_time = "4-6 months"
prerequisites = "Basic computer skills"

[extra]
carousel_image = "roadmaps/my-roadmap-cyber.webp"     # shown on the home page carousel
carousel_title = "My Roadmap"
carousel_description = "One-liner for the carousel card"
+++
```

2. **Body** - the roadmap content itself, organized with headings (`## Phase 1: ...`) and markdown.

Add the carousel image to `static/images/roadmaps/` (see [static/images/roadmaps/README.md](static/images/roadmaps/README.md)). If no carousel image is set, the roadmap simply won't appear in the home-page carousel - it will still be a normal page.

### Other pages (About, Contact, etc.)

Pages like `content/about/_index.md` and `content/contact/_index.md` are just Markdown with frontmatter (`title`, `weight` for ordering, `template` to pick a layout). Edit the Markdown, run `zola serve`, done.

### Blog posts

Writing and submitting a blog post has its own walkthrough with examples: **[CONTRIBUTING_BLOG.md](CONTRIBUTING_BLOG.md)**. Short version: copy `BLOG_TEMPLATE.md` into `content/blog/YYYY/`, fill in the frontmatter, write Markdown, submit a PR.

---

## Working on the code

This section is for changing the actual website code - templates, styling, config, or new features.

### Directory structure

```
cc-website/
├── config.toml            # Site-wide configuration
├── content/               # All pages & posts as Markdown
│   ├── _index.md          # Home page (template: landing.html)
│   ├── about/  blog/  contact/
│   ├── events/            # Events (per-year folders)
│   ├── projects/          # Projects page
│   ├── roadmaps/          # Learning roadmaps
│   └── team/              # Team page
├── templates/             # Custom templates (Tera syntax)
│   ├── index.html         # Base layout (header/sidebar/footer blocks all pages extend)
│   ├── components.html    # All reusable components (alerts, badges, collapse, ...)
│   ├── landing.html       # Home page
│   ├── about.html         # About page
│   ├── blog.html          # Blog listing + search
│   ├── 404.html / page.html / section.html / taxonomy_*.html
│   ├── events/            # list.html / year.html / single.html
│   ├── projects.html      # Projects page
│   ├── roadmaps.html      # Roadmaps page
│   └── team.html          # Team page (reads data/team.toml)
├── static/                # Assets served as-is
│   ├── css/               # site.css imports everything (see its header)
│   └── images/            # All images (teams, events, roadmaps, ...)
├── data/                  # TOML data files
│   ├── team.toml          # Team members
│   └── projects.toml      # Projects
└── config.toml            # Site configuration
```

### How pages, templates, and data fit together

- A **content file** (`content/team/_index.md`) picks a **template** (`template = "team.html"`) and the template can pull **data** (`load_data(path="data/team.toml")`).
- Templates extend each other in-tree: `about.html` extends `index.html`, which defines the shared layout (header, sidebar, footer). To build a new page, extend `index.html`:

```html
{% extends "index.html" %}

{% block content %}
  <div class="my-section">{{ page.content | safe }}</div>
{% endblock %}
```

- Anything in `static/` is copied verbatim to the site root, so reference images as `/images/...`.

### Template cheat sheet

Zola uses the **Tera** template engine (syntax very close to Jinja2/Django):

```html
{{ page.title }}                            <!-- output a variable -->
{% if page.extra.badge %}{{ page.extra.badge }}{% endif %}   <!-- conditional -->
{% for member in team.ccrs %}<li>{{ member.name }}</li>{% endfor %}  <!-- loop -->
```

Common variables:

- `{{ config.title }}` - site title from `config.toml`
- `{{ page.title }}` / `{{ section.title }}` - page/section title
- `{{ page.content | safe }}` - rendered Markdown (don't forget `| safe`!)
- `{{ section.pages }}` - pages inside a section (blog posts, events)
- `{{ get_url(path="images/logo.webp") }}` - site-root-relative URL for a static asset

**Always use `get_url()` for internal links and images in templates** - it respects `base_url` and works on deployments to subfolders (like the preview site):

```html
<!-- ❌ breaks on subfolder deployments -->
<a href="/blog">Blog</a>
<img src="/images/logo.webp">

<!-- ✅ works everywhere -->
<a href="{{ get_url(path='@/blog/_index.md') }}">Blog</a>
<img src="{{ get_url(path='images/logo.webp') }}">
```

### Adding styles

All CSS is imported by `static/css/site.css` - read its header first: it documents the layer order (vendor → core → components → pages → shortcodes) and where new styles belong. Prefer DaisyUI components and Tailwind utility classes over writing raw CSS.

**Important:** the vendored Tailwind/DaisyUI bundle (`static/css/vendor/tailwind-daisyui.min.css`) is prebuilt and content-scanned - it only contains the utility classes that existed when it was compiled. A brand-new utility class in a template will silently do nothing. If a class has no effect, write the rule in the matching `components/*.css` or `pages/*.css` file instead.

### Adding a new page type

Say you want a "Resources" page:

1. **Create the content file** - `content/resources/_index.md`:

```toml
+++
title = "Resources"
template = "resources.html"
+++
```

2. **Create the template** - `templates/resources.html`:

```html
{% extends "index.html" %}
{% block content %}
  {{ page.content | safe }}
{% endblock %}
```

3. **Add a nav link** in `config.toml` (`nav` list, `type = "url"`).

### Configuration basics

`config.toml` holds site-wide settings: `base_url`, `title`, `theme`, taxonomies (tags/categories), the navigation menu, and custom `[extra]` variables used by templates. Key parts:

```toml
[markdown.highlighting]
style = "inline"          # "inline" colors or "class" (CSS classes)
theme = "ayu-dark"        # highlighting theme (single theme)

[extra.theme]
colorset = "dark"         # "dark" | "light"
brightness = "normal"     # "darker" | "normal" | "lighter"
disable_toggle = false

[extra.nav] ...           # see the actual file for the full nav config
```

> The config file is commented - read the real `config.toml` for the complete list of options. Full reference: [Zola configuration docs](https://www.getzola.org/documentation/getting-started/configuration/).

### Adding a new feature - workflow

1. Create a branch: `git checkout -b feature/your-feature`
2. Implement in small, focused commits
3. Test locally (`zola serve`, `zola build`)
4. Open a PR with a clear description

---

## Git workflow & pull requests

### Basics

```bash
git status                      # what changed
git add <file>                  # stage specific file (avoid `git add .`)
git commit -m "feat: add resource page"
git push origin your-branch
```

Commit messages follow `<type>: <short description>` - types: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`.

### Branching

Never commit directly to `main`. Always use a branch, e.g.:

```bash
git checkout -b fix/event-page-links   # for fixes
git checkout -b blog/my-post-slug      # for blog posts (see CONTRIBUTING_BLOG.md)
```

### Opening a PR

1. Push your branch to **your fork**: `git push origin your-branch`
2. Open a pull request against `CC-MNNIT/cc-website` → `main`
3. Fill in the template at `.github/PULL_REQUEST_TEMPLATE.md` (you'll see it automatically when creating the PR)
4. Respond to review feedback by pushing new commits - don't force-push after the PR is open

> CI runs `zola build` on every PR - if your change builds locally, it builds in CI.

---

## Testing & troubleshooting

### Before opening a PR

```bash
zola build   # catches template/content/config errors
zola check   # validates internal links and content
```

Then click through the site at http://127.0.0.1:1111 - check the pages you touched, on mobile width too (DevTools responsive mode).

### Common problems

**"Zola version mismatch" / weird build errors**
Run `zola --version` - must be `0.23.4`. CI builds with the matching 0.23.x release; the templates require Tera v2 syntax (any 0.22 or older Zola will fail).

**Frontmatter errors (`TOML parse error`)**
Frontmatter is **TOML**, not YAML - no tabs for indentation, values in quotes, `true`/`false` lowercase. Validate at [toml-lint.com](https://www.toml-lint.com/).

**Images don't show**
- File must be inside `static/` (e.g. `static/images/...`)
- Reference from site root: `/images/...` - never `static/images/...`
- Filenames are case-sensitive

**Shortcodes render as raw text**
Components (the successor to shortcodes) are defined in `templates/components.html`. With a body: `{% <alert_info> %}text{% </alert_info> %}` ✅. Self-closing: `{{<pretty_link url="https://example.com" title="Example" />}}` ✅. See the top of that file for the full list and syntax.

**Template errors**
Check Tera syntax - every `{% if %}` needs `{% endif %}`, every `{% for %}` needs `{% endfor %}`. `zola build` reports the exact file and line.

**`zola serve` won't start (port in use)**
Another instance is running - stop it, or use `zola serve --port 1112`.

---

## Resources

- [Zola docs](https://www.getzola.org/documentation/) - configuration, templates, content, deployment
- [Tera template reference](https://tera.netlify.app/docs/) - variables, filters, tests
- [Markdown guide](https://www.markdownguide.org/) - Markdown syntax
- [Git docs](https://git-scm.com/doc) & [GitHub guides](https://docs.github.com/en/get-started) - Git basics
- [DaisyUI components](https://daisyui.com/components/) & [Tailwind docs](https://tailwindcss.com/docs) - styling

---

**Questions?** Open an issue on GitHub or ask on the [CC Club Discord](https://discord.gg/EDv6fM5yUm). Happy contributing!
