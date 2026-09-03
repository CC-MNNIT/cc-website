# Contributing a Blog Post

This guide walks you through writing and submitting a blog post for the CC Club website — no web development experience needed.

> **Never used Zola?** You only need it to preview your post locally. Setup takes two minutes: follow [Setup in CONTRIBUTING.md](CONTRIBUTING.md#setup) and come back here.

## What you need

- **Git** installed
- **Zola v0.22.1** — install instructions: [CONTRIBUTING.md → Setup](CONTRIBUTING.md#setup)
- A **GitHub account**
- Basic knowledge of **Markdown**

## Step 1: Clone the repository

```bash
git clone --depth=1 --recursive https://github.com/CC-MNNIT/cc-website.git
cd cc-website
```

(If you already cloned without `--recursive`: `git submodule update --init --recursive --depth=1`)

## Step 2: Create your post

```bash
# Copy the template with today's date
cp BLOG_TEMPLATE.md content/blog/2026/2026-02-09-your-post-slug.md
```

**File naming:** `YYYY-MM-DD-your-post-slug.md` — today's date, lowercase with hyphens (e.g. `2026-02-09-react-hooks-guide.md`). It goes in the folder of the current year: `content/blog/YYYY/`.

### Fill in the frontmatter

The frontmatter is the block between `+++` markers at the top of the file:

```toml
+++
title = "Your Actual Blog Title"
date = 2026-02-09          # today's date
description = "A clear, concise description (max 160 chars)"

[taxonomies]
tags = ["python", "tutorial", "beginners"]   # 3-5 tags, lowercase
categories = ["tech"]                        # "tech", "tutorials", "insights", "stories"

[extra]
author = "Your Full Name"
author_linkedin = "your-username"            # just the username, not the full URL
# reading_time = 5                           # optional, minutes
+++
```

### Write the content

Use the template as a guide — it contains working examples of alerts, badges, mermaid diagrams, and code blocks.

**Common mistakes to avoid:**

1. ❌ Inline shortcodes: `{{ alert_info(content="...") }}` → ✅ paired tags: `{% alert_info() %}text{% end %}`
2. ❌ Unquoted mermaid labels with special characters: `A[Label (text)]` → ✅ `A["Label (text)"]`
3. ❌ Code fences without a language: `` ``` `` → ✅ always specify: `` ```python `` or `` ```bash ``
4. ❌ Leaving the template's instructional comments in → ✅ remove them before submitting

## Step 3: Add images (optional)

```bash
mkdir -p static/images/blog/2026/your-post-slug
# put your images in that folder
```

Reference them in your post as:

```markdown
![Description](/images/blog/2026/your-post-slug/image.png)
```

> Images in `static/images/` are automatically optimized (WebP conversion + compression) by CI after your PR merges — upload whatever you have, no manual compression needed.

## Step 4: Test locally

**Always do this before submitting:**

```bash
zola serve
# → http://127.0.0.1:1111
```

Check your post in the blog list and verify: formatting renders, code blocks are highlighted, mermaid diagrams display, images load, no raw `{% %}` syntax is visible.

**Build failed?** The error message points at the problem. Common causes:
- A shortcode opened with `{% alert_info() %}` but no closing `{% end %}`
- Mermaid labels with unquoted `()`, `[]`, or `:`
- Invalid frontmatter (TOML — validate at [toml-lint.com](https://www.toml-lint.com/))
- Wrong shortcode name

Run `zola build` for detailed error messages.

## Step 5: Submit your pull request

```bash
# 1. Create a branch
git checkout -b blog/your-post-slug

# 2. Stage your post (and images)
git add content/blog/2026/2026-02-09-your-post-slug.md
git add static/images/blog/2026/your-post-slug/

# 3. Commit with a clear message
git commit -m "Add blog post: Your Post Title"

# 4. Push to your fork
git push origin blog/your-post-slug
```

Then on GitHub, open a pull request against `CC-MNNIT/cc-website` → `main` with title `[Blog] Your Post Title` and a one-line summary of the post.

## Step 6: Review

- **Automated checks** verify the site still builds
- **Maintainers** review for technical accuracy, formatting, and clarity — feedback is normal, just push new commits
- Once approved, your post is **merged and published** 🎉

---

## Shortcode reference

These shortcodes are the ones blog posts use most (defined in `templates/shortcodes/`). They all follow the paired-tag pattern `{% name() %}...{% end %}`.

**Alerts** (styled boxes):

```markdown
{% alert_info() %}Informational message.{% end %}
{% alert_success() %}Positive message or achievement.{% end %}
{% alert_warning() %}Caution or important notice.{% end %}
{% alert_error() %}Critical information or common mistakes.{% end %}
```

**Badges** (inline):

```markdown
{% badge_primary() %}Important{% end %}
{% badge_success() %}New{% end %}
{% badge_warning() %}Beta{% end %}
```

**Collapsible sections** (hides optional/advanced content):

```markdown
{% collapse(title="Click to expand") %}
Hidden content goes here. Supports all markdown!
{% end %}
```

**Mermaid diagrams** (flowcharts, sequence diagrams, ...):

````markdown
{% mermaid() %}
graph LR
    A["User"] -->|Request| B["Server"]
    B -->|Response| A
{% end %}
````

**Pretty links** (styled external link cards — note this one is inline, `{{ }}`):

```markdown
{{ pretty_link(
    url="https://example.com",
    title="Link Title",
    description="A brief description"
) }}
```

Full list: see the `templates/shortcodes/` directory in this repo.

---

## Tips for great posts

1. **Start with an outline** — plan the sections before writing
2. **Use examples** — code snippets and diagrams make concepts click
3. **Keep paragraphs short** — 2-4 sentences
4. **Use headings** — make it scannable
5. **Proofread** — grammar and typos matter
6. **Test thoroughly** — verify everything renders before submitting

## Need help?

- Check [BLOG_TEMPLATE.md](BLOG_TEMPLATE.md) for a working example
- Look at existing posts in `content/blog/2026/`
- Open a GitHub issue
- Ask on the [CC Club Discord](https://discord.gg/EDv6fM5yUm)

**Happy writing!** 📝
