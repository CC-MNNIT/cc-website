# Events Banner Visibility Feature

## Overview
Events can be controlled in the hero carousel/banner using `show_banner` and `banner_image` fields in the event's front matter. Events hidden from the banner will still appear in the cards grid below.

## Fields

### `show_banner`
Controls whether the event appears in the hero carousel/banner.

### `banner_image`
Optional custom image for the carousel/banner. If not specified, uses the first image from the `images` array.

## How to Use

### Show an Event in Banner with Custom Image
```toml
[extra]
show_banner = true
banner_image = "events/my-event/banner.jpg"
event_type = "hackathon"
status = "upcoming"
```

### Show an Event in Banner (using first image from images array)
```toml
[extra]
show_banner = true
event_type = "hackathon"
status = "upcoming"

images = [
    "events/my-event/1.jpg",
    "events/my-event/2.jpg"
]
# Will use events/my-event/1.jpg for banner
```

### Hide an Event from Banner (but keep in cards)
```toml
[extra]
show_banner = false
event_type = "hackathon"
status = "upcoming"
```

## Example

Here's a complete example:

```markdown
+++
title = "Hack36"
date = 2025-03-15
description = "Our flagship 36-hour hackathon"
template = "events/single.html"

[extra]
show_banner = true
banner_image = "events/hack36/banner-hero.jpg"  # Custom banner image
event_type = "hackathon"
status = "completed"

images = [
    "events/hack36/1.svg",
    "events/hack36/2.svg",
    "events/hack36/3.svg"
]
+++

## Event content here...
```

## What Gets Hidden

Events with `show_banner = false` will NOT appear in:
- ✅ Hero carousel/banner (slides, navigation, progress indicators)
- ✅ Banner slide count (only banner events are counted)
- ✅ Navigation buttons (properly indexed for banner events only)

## What Remains Visible

Events with `show_banner = false` will STILL appear in:
- ✅ Events grid cards below the carousel
- ✅ Event listings and filters
- ✅ Search results
- ✅ Direct URL access to event page

## Image Priority

For the banner/carousel, the template uses images in this order:
1. **`banner_image`** - If specified, always uses this
2. **First image from `images` array** - Fallback if `banner_image` is not set
3. **No image** - Shows placeholder if neither is available

For event cards in the grid, the template always uses the `images` array.

## Use Cases

### Custom Banner Image
Use `banner_image` when you want a wide, high-quality hero image for the carousel that's different from the gallery images:
```toml
banner_image = "events/hack36/hero-banner-1920x800.jpg"
images = ["events/hack36/gallery1.jpg", "events/hack36/gallery2.jpg"]
```

### Hide from Banner
Use `show_banner = false` when you want to:
- Keep an event visible in the listings but not featured in the banner
- Reduce carousel clutter for minor events
- Promote only flagship/major events in the hero section
- Archive older events from banner while keeping them accessible

## Default Behavior

**Important:** 
- If `show_banner` is not specified, the event will **NOT** appear in the banner (but will still show in cards)
- If `banner_image` is not specified, the first image from `images` array will be used
- Always explicitly set `show_banner = true` for events you want featured in the carousel
