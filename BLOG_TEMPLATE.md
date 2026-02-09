+++
title = "Your Blog Post Title Goes Here"
date = 2026-02-09
description = "A concise 1-2 sentence description of your blog post (max 160 characters for SEO)"

[taxonomies]
tags = ["tag1", "tag2", "tag3"]  # Keep it to 3-5 tags
categories = ["tech"]  # Usually: "tech", "tutorials", "insights", or "stories"

[extra]
author = "Your Full Name"
author_linkedin = "your-linkedin-username"  # Just the username, not the full URL
# reading_time = 5  # Optional: estimated reading time in minutes
+++

<!-- 
===========================================
⚠️ IMPORTANT REMINDERS BEFORE SUBMITTING
===========================================

1. ❌ REMOVE ALL COMMENTS (like this one) before submitting
2. ✅ Use PAIRED TAGS for shortcodes: {% shortcode() %}...{% end %}
3. ✅ QUOTE mermaid labels with special characters: ["Label (with parens)"]
4. ✅ Always specify language for code fences: ```bash or ```python
5. ✅ Test locally with `zola serve` before submitting PR

===========================================
-->

## Introduction

Start with a compelling introduction that hooks the reader. Explain what problem you're solving or what you'll teach them.

{% alert_info() %}
Use this alert for important summary information or TL;DR sections.
{% end %}

## Main Content Section

Break your content into clear sections with proper headings.

### Subsection Example

Write your content here. Use **bold** for emphasis and `inline code` for technical terms.

### Code Examples

Always specify the language identifier for syntax highlighting:

```python
def example_function():
    """This is a properly formatted code block."""
    return "Hello, World!"
```

```bash
# Bash commands
echo "Always use the language identifier"
```

### Using Shortcodes Correctly

{% alert_warning() %}
**Common Mistake:** Don't use inline shortcodes like `{{ alert_info(content="...") }}`

**Correct Way:** Use paired tags as shown in this example!
{% end %}

**Available shortcodes:**

{% collapse(title="Click to see available shortcodes") %}

**Alerts:**
- `alert_info` - Blue info boxes
- `alert_success` - Green success messages
- `alert_warning` - Yellow warnings
- `alert_error` - Red error messages

**Badges:**
- `badge_primary` - Primary badges
- `badge_secondary` - Secondary badges
- `badge_success` - Success badges
- `badge_warning` - Warning badges

**Other:**
- `collapse` - Collapsible sections (like this one!)
- `pretty_link` - Beautiful link previews

{% end %}

### Example: Using Badges

{% badge_primary() %}Important{% end %} {% badge_secondary() %}Beta Feature{% end %}

### Example: Success Alert

{% alert_success() %}
Your content rendered successfully! You can use markdown inside shortcodes.
{% end %}

### Mermaid Diagrams

When using mermaid diagrams, **always quote labels** that contain special characters like `:`, `()`, `[]`:

{% mermaid() %}
graph LR
    A["User (Client)"] -->|Request| B["Server"]
    B -->|Response| A
    C["Database: PostgreSQL"] -.->|Query| B
{% end %}

❌ **Wrong:** `A[User (Client)]` - Will cause syntax errors  
✅ **Correct:** `A["User (Client)"]` - Quoted labels work perfectly

### Collapsible Sections

Use collapse for optional, detailed information:

{% collapse(title="Advanced: Deep Dive into Topic") %}

This content is hidden by default. Great for:
- Advanced topics
- Long code examples
- Optional reading material

```javascript
// Your detailed code here
const example = "Hidden until clicked";
```

{% end %}

## Images

For images, place them in `static/images/blog/YYYY/your-post-slug/`:

```markdown
![Alt text description](/images/blog/2026/your-post-slug/image-name.png)
```

Or use absolute URLs for external images:

```markdown
![Description](https://example.com/image.png)
```

## Best Practices

1. **Keep it scannable** - Use headings, lists, and short paragraphs
2. **Show, don't just tell** - Include code examples and diagrams
3. **Test everything** - Run `zola serve` and check all formatting
4. **Proofread** - Check for typos and grammar
5. **Remove comments** - Delete all instructional comments before submitting

## Conclusion

Wrap up your post with key takeaways and next steps for readers.

{% alert_success() %}
**Ready to contribute?** Follow the steps in [CONTRIBUTING_BLOG.md](/CONTRIBUTING_BLOG/) to submit your post!
{% end %}

---

## Additional Resources

Use `pretty_link` for external resources:

{{ pretty_link(url="https://github.com/CC-MNNIT/cc-website", title="CC Website Repository", description="Contribute to our open-source website") }}

---

*Questions or feedback? Connect with me on [LinkedIn](https://www.linkedin.com/in/your-linkedin-username/)!*
