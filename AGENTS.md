# AGENTS.md

Guidance for AI coding agents (and new humans) working in this repo.

## What this is

Zola 0.23.4 static site: Tera v2 templates, plain CSS, vanilla JS.
No npm/node, no framework, no theme, no submodules. `zola build` is the entire pipeline.
Everything (templates, styles, content, data) lives in this repo.

## Hard constraints

- **Zola 0.23.4 required.** Older versions fail to build: the site uses Tera v2
  components, not v1 macros/shortcodes. Check with `zola --version`.
- **Never add npm/node or any build tooling.** The zero-toolchain model is deliberate.
- **Never edit `static/css/vendor/tailwind-daisyui.min.css`** except surgical,
  value-preserving patches. It is prebuilt and content-scanned: a brand-new utility
  class used in a template silently does nothing. Put new styles in the matching
  `components/*.css` or `pages/*.css` file instead.
- **All components live in `templates/components.html`** and nowhere else. Components
  are hygienic: they see ONLY explicitly passed params. Pass `config={config}`,
  `lang={lang}`, and `page={page}`/`section={section}`/`page={false}` explicitly.
- **Preserve the cascade layer order** documented in `static/css/site.css`:
  vendor -> prose-extras -> core -> components -> pages -> shortcodes (must stay last).
  Shortcodes-layer rules intentionally beat cards.css brand rules by order.
- No `!important` in new CSS; layer order and specificity are the mechanism.
- Don't rename `cc-*` identifiers, `data-theme`/`data-brightness` values, or component
  names. The `goyo-*` localStorage migration shim in the head component is intentional.

## Commands

```bash
zola build   # must exit 0 before you commit
zola serve   # http://127.0.0.1:1111, auto-reload
zola check   # link/content checking
```

## Repo map

- `templates/components.html` - single component registry: `html_tag`, `head`, `search`,
  `header`, `comments`, `toc`, `footer`, `sidebar` + `alert_*` (4), `badge_*` (7),
  `collapse`, `mermaid`, `pretty_link`, `image`, `youtube`, `browser`, `math`,
  `openstreetmap`, `asciinema`, `carousel`, `codepen`, `gist`, `image_diff`, `team_grid`
- `templates/index.html` - base layout; pages extend it and override the
  `content`/`header`/`prev_link`/`next_link` blocks
- `static/css/site.css` - stylesheet entry point; its header documents the layers
- `static/css/components/prose-extras.css` - site rules extracted verbatim from the
  vendor bundle (keep byte-identical when editing; pixel-verify after any change)
- `content/` - Markdown + TOML frontmatter; blog posts: `content/blog/YYYY/YYYY-MM-DD-slug.md`
- `data/team.toml`, `data/projects.toml` - structured data (loaded via `load_data`)
- `static/js/theme.js` - theme toggle, fuse.js search, copy-code/heading-link helpers

## Tera v2 syntax traps (differs from old Tera v1 docs)

- Self-closing: `{{<name arg={var} str="lit" />}}` - with body: `{% <name> %}body{% </name> %}`
- `| default(value="x")` keeps kwargs; positional `default("x")` fails
- Tests take kwargs: `is starting_with(pat="http")`
- Filters `concat`, `filter`, `slice` are **removed** -> use spreads `[...arr, x]`,
  comprehensions (single `for` clause only), or `set_global` + spread for accumulation
- Indexing: `arr[0]`, never `arr.0`; map literals need quoted keys `{"k": 1}`
- A bare undefined variable is a build error. Guard with `is defined`,
  `| default(value=...)`, or optional chaining `a?.b`
- `{% block %}` names must be unique per template; an empty child block override
  REMOVES the parent's content (this silently dropped the navbar once)

## Pitfalls that cost real time

- Component HTML output must stay on ONE line (no newlines/indentation inside the
  component body markup): Zola 0.23 does not re-parse component output as markdown
  blocks, but indented output inside list items can still corrupt layout
- `page`/`section` params are `false` when absent: use truthiness (`{% if page %}`),
  and pass `page={false}` explicitly at call sites that don't have them
- `index.html` uses one `wide_layout` branch (two layout branches were merged to
  satisfy the unique-block rule); check both layout modes when editing it
- Event/badge styling: dark-theme soft variants live in `shortcodes.css` and must
  keep winning over `cards.css` - see the cascade note in `site.css`

## Before you commit

1. `zola build` exits 0
2. Eyeball in BOTH themes (toggle): home, a blog post with alerts/badges/mermaid,
   events page, 404; mobile width if you touched layout
3. Commit message: `<type>: <short description>` with types
   `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`
4. Don't force-push after a PR is open; respond to review with new commits
