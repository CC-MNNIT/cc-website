# Content Organization Guide

This document explains the organization and structure of content files and data in the CC website.

## Directory Structure

```
content/
├── blog/           # Blog posts
├── contrihub/      # ContriHub event pages (organized by year)
├── events/         # Event pages (organized by year)
├── projects/       # Project showcases
├── roadmaps/       # Learning roadmaps
└── team/           # Team member profiles

data/
├── alumni.yaml     # All alumni data (single file)
└── contrihub/      # ContriHub event data (organized by year)
    └── 2025/
        ├── event.yaml         # Main event stats
        ├── featured.yaml      # Featured contributions
        ├── recognitions.yaml  # Awards
        └── stories.yaml       # Success stories
```

## Alumni Data Management

**Location**: `data/alumni.yaml` (single file for all alumni)

### Adding New Alumni (No Coding Required!)

1. **Open** `data/alumni.yaml`
2. **Add** new entry at the top of the `alumni:` list:

```yaml
alumni:
  # Add new alumni here (newest first)
  - name: "Full Name"
    batch: "2024-2028"              # Batch years
    graduation_year: 2028           # Graduation year
    current_role: "Software Engineer"  # Job title
    company: "Google"               # Employer
    domain: "Backend Development"   # Field/Domain
    location: "City, Country"       # Location
    linkedin: "https://linkedin.com/in/username"  # Optional
    github: "https://github.com/username"         # Optional
    image: "/images/alumni/name.jpg"              # Optional
    message: "Your advice or testimonial"         # Optional
  
  # ... existing alumni ...
```

3. **Validate**: Run `python3 scripts/validate-data.py`
4. **Build**: Run `zola build`

**That's it!** Alumni automatically appears on website with search/filters working.

### Required vs Optional Fields

**Required**:
- `name`, `batch`, `graduation_year`

**Optional**:
- `current_role`, `company`, `domain`, `location`, `image`, `linkedin`, `github`, `message`

**Important**: No template or code changes needed when adding alumni!

## Year-Based Organization

### Events (`content/events/`)

Events are organized by calendar year for better long-term maintainability:

```
events/
├── _index.md       # Events section landing page
├── 2025/           # Events happening in 2025
│   ├── _index.md
│   └── event-name.md
└── 2024/           # Events from 2024
    ├── _index.md
    └── event-name.md
```

**Why year-based?**
- Prevents accumulation in "past" folder
- Easier to find events from specific years
- Natural archive organization
- Scales better over 5+ years

**Creating a new event:**

1. Determine the event year (2025, 2026, etc.)
2. Create or use existing year folder: `content/events/YYYY/`
3. Create event file: `content/events/YYYY/event-name.md`
4. Use this frontmatter template:

```toml
+++
title = "Event Name"
description = "Brief event description"
date = 2025-03-15  # Event date
template = "contrihub-event.html"  # Optional: custom template

[extra]
badge = "UPCOMING"  # or "COMPLETED"
location = "Venue Name"
start_time = "10:00 AM"
end_time = "05:00 PM"

[extra.tags]
category = ["workshop", "hackathon", "seminar"]  # Choose relevant
+++

Event content in markdown...
```

5. Ensure year has `_index.md`:

```toml
+++
title = "2025 Events"
sort_by = "date"
template = "section.html"

[extra]
badge = "NEW"  # Optional
+++
```

### ContriHub (`content/contrihub/`)

ContriHub pages are organized with a main landing and year-specific event pages:

```
contrihub/
├── _index.md                   # ContriHub main landing page
├── how-to-participate.md       # Single guide for all years (edit as needed)
└── 2025/
    └── _index.md               # ContriHub 2025 event page (uses contrihub-event.html)
```

**Why one guide?**
- Only current year participation matters
- Update the single guide when process changes
- Past event participation guides are irrelevant
- Keeps content simple and maintainable

**Creating a new ContriHub year:**

1. Create year folder and event page:
```bash
mkdir -p content/contrihub/2026
```

2. Create `_index.md` with event details:
```toml
+++
title = "ContriHub 2026"
description = "ContriHub 2026 event description"
template = "contrihub-event.html"

[extra]
contrihub_year = "2026"  # Important: links to data/contrihub/2026/
status = "upcoming"       # or "completed"
+++
```

3. Create data files:
```bash
cp -r data/contrihub/2025 data/contrihub/2026
# Edit files in data/contrihub/2026/ with new stats
```

4. **Update how-to-participate.md** only if process changes (not every year!)

**No year-specific guides needed** - one guide serves all years!

## Frontmatter Standards

### Date Fields

**Use ONE date field per page** - avoid duplicates:

```toml
# ✅ CORRECT - Single date field
+++
title = "Event Name"
date = 2025-03-15  # Main event date

[extra]
# Additional time details if needed
start_time = "10:00 AM"
end_time = "05:00 PM"
+++
```

```toml
# ❌ WRONG - Duplicate date fields
+++
title = "Event Name"
date = 2025-03-15
start_date = 2025-03-15  # Don't do this!
+++
```

### Required Fields by Content Type

**Events**:
```toml
title = "..."         # Required
description = "..."   # Required
date = YYYY-MM-DD    # Required
template = "..."      # Optional (uses default if not set)
```

**ContriHub Guides**:
```toml
title = "..."         # Required
description = "..."   # Required
weight = 1           # Required (for ordering)
```

**Blog Posts**:
```toml
title = "..."         # Required
date = YYYY-MM-DD    # Required
description = "..."   # Recommended

[extra.taxonomies]   # Optional
tags = ["tag1", "tag2"]
authors = ["author1"]
```

### Using [extra] Section

Goyo theme uses `[extra]` for custom fields and theme-specific features:

```toml
[extra]
badge = "UPCOMING"           # Badge display
location = "Event venue"     # Custom field
featured = true              # Feature flag

[extra.hero]                 # Landing page hero
title = "Main Title"
subtitle = "Subtitle text"

[extra.tags]                 # Tags for filtering
category = ["workshop", "tech"]
```

### Badges

Use badges to highlight page status:

- `NEW` - Recently added content
- `UPDATED` - Recently modified
- `UPCOMING` - Future events
- `COMPLETED` - Past events
- `FEATURED` - Highlighted content

```toml
[extra]
badge = "UPCOMING"
```

## Section Index Files (`_index.md`)

Every directory that represents a section needs an `_index.md`:

```
events/
├── _index.md        # Required - Events section page
└── 2025/
    └── _index.md    # Required - 2025 year subsection page
```

**Basic _index.md template:**

```toml
+++
title = "Section Name"
sort_by = "date"           # How to sort pages: "date", "weight", "title"
template = "section.html"  # Template to use

[extra]
badge = "NEW"             # Optional
+++

Optional section description in markdown.
```

## Content Guidelines

### File Naming

- Use lowercase with hyphens: `event-name.md`
- Be descriptive: `docker-kubernetes-workshop.md` not `workshop.md`
- Avoid special characters, spaces, or underscores
- Keep names concise but meaningful

### Image Paths

Always use absolute paths from the static directory:

```markdown
✅ CORRECT
![Event Photo](/images/events/2025/event-photo.jpg)

❌ WRONG
![Event Photo](../../static/images/events/2025/event-photo.jpg)
![Event Photo](images/events/2025/event-photo.jpg)
```

### Content Structure

Use clear heading hierarchy:

```markdown
+++
title = "Page Title"
+++

Brief introduction paragraph.

## First Section

Section content...

### Subsection

Subsection content...

## Second Section

More content...
```

## Validation

Run validation before committing:

```bash
# Validate data files and frontmatter
python scripts/validate-data.py

# Test build
zola build

# Local preview
zola serve
```

## Best Practices

1. **Organize by year for temporal content** - Events, ContriHub editions, etc.
2. **Use single date field** - Avoid duplicates like `date` and `start_date`
3. **Include _index.md for sections** - Required for proper navigation
4. **Use descriptive filenames** - Helps with maintenance
5. **Validate before committing** - Catch errors early
6. **Test locally** - Preview changes with `zola serve`
7. **Use absolute paths for images** - Prevents broken links
8. **Follow Goyo theme conventions** - Use [extra] for custom fields

## Migration Notes

Recent structural changes (2025-01):

- ✅ Events reorganized from `upcoming/`/`past/` to year-based (`2025/`, `2024/`)
- ✅ ContriHub guides moved into year folders (`2025/`)
- ✅ Duplicate date fields removed from event pages
- ✅ All sections now have proper `_index.md` files
- ✅ Alumni data split into year-based YAML files

These changes improve long-term maintainability and scalability.

## Troubleshooting

**Problem**: Page returns 404

**Solution**:
- Check filename and path are correct
- Ensure `_index.md` exists in parent directory
- Verify frontmatter has required fields (`title`, etc.)
- Run `zola build` to check for errors

**Problem**: Page doesn't appear in section list

**Solution**:
- Check `_index.md` has `sort_by` specified
- Verify page has proper `date` or `weight` for sorting
- Ensure page is in correct directory

**Problem**: Images not loading

**Solution**:
- Use absolute paths starting with `/`
- Verify image exists in `static/` directory
- Check filename matches exactly (case-sensitive)

## Questions?

For more information:
- **Data files**: See `/data/README.md`
- **Alumni data**: See `/data/alumni/README.md`
- **Goyo theme**: See `themes/goyo/README.md`
- **Validation**: Run `scripts/validate-data.py`
