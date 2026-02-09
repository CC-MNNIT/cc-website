# Contributing a Blog Post to CC-MNNIT

Welcome! This guide will walk you through the entire process of writing and submitting a blog post for the Computer Coding Club website.

## Prerequisites

Before you start, make sure you have:

- **Git** installed on your system
- **Zola** static site generator  
  **Version:** `0.21`
- A **GitHub account**
- Basic knowledge of **Markdown**

### Installing Zola

### Installing Zola

> **⚠️ CRITICAL: Use Zola v0.21 Only**
>
> Zola v0.22+ introduces breaking changes. Our site requires **exactly v0.21**.
> **Do NOT use package managers** (`pacman`, `apt`, `brew`) as they may install v0.22+.

**Step 1: Download Zola v0.21**

Visit the [Zola v0.21.0 releases page](https://github.com/getzola/zola/releases/tag/v0.21.0) and download the appropriate binary for your system:

**Linux:**
```bash
# For x86_64 Linux
wget https://github.com/getzola/zola/releases/download/v0.21.0/zola-v0.21.0-x86_64-unknown-linux-gnu.tar.gz
tar -xzf zola-v0.21.0-x86_64-unknown-linux-gnu.tar.gz
sudo mv zola /usr/local/bin/
sudo chmod +x /usr/local/bin/zola
```

**macOS:**
```bash
# For macOS (Intel)
wget https://github.com/getzola/zola/releases/download/v0.21.0/zola-v0.21.0-x86_64-apple-darwin.tar.gz
tar -xzf zola-v0.21.0-x86_64-apple-darwin.tar.gz
sudo mv zola /usr/local/bin/
sudo chmod +x /usr/local/bin/zola

# For macOS (Apple Silicon)
wget https://github.com/getzola/zola/releases/download/v0.21.0/zola-v0.21.0-aarch64-apple-darwin.tar.gz
tar -xzf zola-v0.21.0-aarch64-apple-darwin.tar.gz
sudo mv zola /usr/local/bin/
sudo chmod +x /usr/local/bin/zola
```

**Windows:**
```powershell
# Download from browser or use PowerShell
Invoke-WebRequest -Uri "https://github.com/getzola/zola/releases/download/v0.21.0/zola-v0.21.0-x86_64-pc-windows-msvc.zip" -OutFile "zola.zip"
Expand-Archive -Path zola.zip -DestinationPath C:\zola
# Add C:\zola to your PATH environment variable
```

**Step 2: Verify Installation**
```bash
zola --version
# Must output: zola 0.21.0
```

**If you see v0.22 or higher:**
```bash
# Remove the wrong version first
sudo rm /usr/local/bin/zola  # or wherever it's installed
# Then reinstall v0.21 using the instructions above
```

---

## Step 1: Clone the Repository

Clone the CC-MNNIT website repository to your local machine:

```bash
git clone --recursive https://github.com/CC-MNNIT/cc-website.git
cd cc-website
```

> **Note:** The `--recursive` flag is important as it clones the theme submodule.

---

## Step 2: Create Your Blog Post

### 2.1 Copy the Template

Copy the blog template to start writing:

```bash
# Create a new blog post file with today's date
cp BLOG_TEMPLATE.md content/blog/2026/2026-02-09-your-post-slug.md
```

**File naming convention:** `YYYY-MM-DD-your-post-slug.md`
- Use the current date
- Use lowercase and hyphens for the slug
- Make the slug descriptive (e.g., `machine-learning-basics`, `react-hooks-guide`)

### 2.2 Fill in the Frontmatter

Edit the frontmatter (the section between `+++` markers) at the top of your file:

```toml
+++
title = "Your Actual Blog Title"
date = 2026-02-09  # Use today's date
description = "A clear, concise description (max 160 chars)"

[taxonomies]
tags = ["python", "tutorial", "beginners"]
categories = ["tech"]

[extra]
author = "Your Full Name"
author_linkedin = "your-username"  # Just username, not full URL
+++
```

### 2.3 Write Your Content

Use the template as a guide. Remember:

**Common Mistakes to Avoid:**

1. ❌ Don't use inline shortcodes: `{{ alert_info(content="text") }}`
2. ✅ Use paired tags: `{% alert_info() %}text{% end %}`
3. ❌ Don't leave mermaid labels unquoted: `A[Label (text)]`
4. ✅ Quote special chars: `A["Label (text)"]`
5. ❌ Don't forget code fence language: ` ```  `
6. ✅ Always specify: ` ```python ` or ` ```bash `
{% end %}

---

## Step 3: Add Images (Optional)

If your post includes images:

1. Create a directory for your images:
   ```bash
   mkdir -p static/images/blog/2026/your-post-slug
   ```

2. Place your images in that directory

3. Reference them in your markdown:
   ```markdown
   ![Description](/images/blog/2026/your-post-slug/image.png)
   ```

---

## Step 4: Test Locally

This is **crucial** - always test before submitting!

```bash
# Start the local development server
zola serve
```

The site will be available at `http://127.0.0.1:1111`

### What to Check:

- ✅ Your blog post appears in the blog list
- ✅ All formatting renders correctly
- ✅ Code blocks have syntax highlighting
- ✅ Mermaid diagrams display properly
- ✅ Images load correctly
- ✅ Shortcodes (alerts, badges, collapse) work
- ✅ No markdown syntax is showing as raw text

**Build Failed?** Common issues:

- Missing closing tags: `{% alert_info() %}` needs `{% end %}`
- Unquoted mermaid labels with special characters
- Invalid frontmatter (check TOML syntax)
- Shortcode typos (check the template for correct names)

Run `zola build` to see specific error messages.

---

## Step 5: Submit Your Pull Request

### 5.1 Create a Branch

```bash
git checkout -b blog/your-post-slug
```

### 5.2 Commit Your Changes

```bash
# Add your blog post
git add content/blog/2026/2026-02-09-your-post-slug.md

# Add images if you have any
git add static/images/blog/2026/your-post-slug/

# Commit with a clear message
git commit -m "Add blog post: Your Post Title"
```

### 5.3 Push to GitHub

```bash
git push origin blog/your-post-slug
```

### 5.4 Create Pull Request

1. Go to [https://github.com/CC-MNNIT/cc-website](https://github.com/CC-MNNIT/cc-website)
2. Click **"Compare & pull request"**
3. Fill in the PR template:
   - **Title:** `[Blog] Your Post Title`
   - **Description:** Brief summary of your post
   - Mention if this is your first contribution
4. Click **"Create pull request"**

---

## Step 6: Review Process

After submitting your PR:

1. **Automated checks** will run (build verification)
2. **Maintainers** will review your post for:
   - Technical accuracy
   - Formatting issues
   - Grammar and clarity
   - Appropriate content
3. You may receive **feedback** - don't worry, it's normal!
4. Make any **requested changes** by pushing new commits
5. Once approved, your post will be **merged and published** 🎉

---

## Shortcode Reference

Quick reference for available shortcodes:

{% collapse(title="Alert Shortcodes") %}

**Info Alert (Blue):**
```markdown
{% alert_info() %}
Your informational content here.
{% end %}
```

**Success Alert (Green):**
```markdown
{% alert_success() %}
Positive message or achievement.
{% end %}
```

**Warning Alert (Yellow):**
```markdown
{% alert_warning() %}
Caution or important notice.
{% end %}
```

**Error Alert (Red):**
```markdown
{% alert_error() %}
Critical information or common mistakes.
{% end %}
```

{% end %}

{% collapse(title="Badge Shortcodes") %}

```markdown
{% badge_primary() %}Primary{% end %}
{% badge_secondary() %}Secondary{% end %}
{% badge_success() %}Success{% end %}
{% badge_warning() %}Warning{% end %}
```

Result: {% badge_primary() %}Primary{% end %} {% badge_secondary() %}Secondary{% end %}

{% end %}

{% collapse(title="Collapse Shortcode") %}

Great for hiding optional or advanced content:

```markdown
{% collapse(title="Click to expand") %}
Hidden content goes here. Supports all markdown!

- Lists
- Code blocks
- Everything!
{% end %}
```

{% end %}

{% collapse(title="Pretty Link Shortcode") %}

Creates beautiful link previews:

```markdown
{{ pretty_link(
    url="https://example.com",
    title="Link Title",
    description="A brief description"
) }}
```

**Note:** This is an inline shortcode (uses `{{ }}`), not a paired one.

{% end %}

---

## Tips for Great Blog Posts

1. **Start with an outline** - Plan your structure before writing
2. **Use examples** - Code snippets and diagrams make concepts clear
3. **Keep paragraphs short** - 2-4 sentences max for readability
4. **Use headings** - Break content into scannable sections
5. **Add value** - Teach something new or solve a problem
6. **Proofread** - Grammar and typos matter
7. **Test thoroughly** - Check everything works locally

---

## Need Help?

**Stuck or have questions?**

- Check the [BLOG_TEMPLATE.md](file:///home/shanu/Projects/Web/cc-website/BLOG_TEMPLATE.md) for examples
- Review existing blog posts in `content/blog/2026/`
- Open an issue on GitHub
- Ask in the CC Club Discord

We're here to help! 🚀

---

## Example Workflow

Here's the complete workflow in one view:

```bash
# 1. Clone and setup
git clone --recursive https://github.com/CC-MNNIT/cc-website.git
cd cc-website

# 2. Create your post
cp BLOG_TEMPLATE.md content/blog/2026/2026-02-09-my-awesome-post.md

# 3. Edit and write (use your favorite editor)
nano content/blog/2026/2026-02-09-my-awesome-post.md

# 4. Test locally
zola serve
# Visit http://127.0.0.1:1111 and check your post

# 5. Create branch and commit
git checkout -b blog/my-awesome-post
git add content/blog/2026/2026-02-09-my-awesome-post.md
git commit -m "Add blog post: My Awesome Post"

# 6. Push and create PR
git push origin blog/my-awesome-post
# Then create PR on GitHub
```

---

**Happy writing!** We look forward to reading your contribution. 📝✨
