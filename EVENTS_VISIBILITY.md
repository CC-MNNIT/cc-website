# Events Visibility Feature

## Overview
Events can now be hidden or shown on the events page using a simple `visible` field in the event's front matter. This feature properly handles the carousel navigation, slide numbering, and event grid.

## How to Use

### Show an Event
Add `visible = true` to the `[extra]` section of your event markdown file:

```toml
[extra]
visible = true
event_type = "hackathon"
status = "upcoming"
```

### Hide an Event
Set `visible = false` or remove the field entirely:

```toml
[extra]
visible = false
event_type = "hackathon"
status = "upcoming"
```

## Example

Here's a complete example of an event file with the visibility toggle:

```markdown
+++
title = "Hack36"
date = 2025-03-15
description = "Our flagship 36-hour hackathon"
template = "events/single.html"

[extra]
visible = true  # Set to false to hide this event
event_type = "hackathon"
status = "completed"
+++

## Event content here...
```

## What Gets Hidden

Events with `visible = false` will NOT appear in:
- ✅ Hero carousel (slides, navigation, progress indicators)
- ✅ Events grid (card listings)
- ✅ Carousel slide count (only visible events are counted)
- ✅ Navigation buttons (properly indexed for visible events only)

## What Remains Accessible

- ✅ The event page itself is still accessible via direct URL
- ✅ Event is still present in the data structure (just filtered from display)

## Technical Details

The template now:
1. Creates a `visible_events` list by filtering `all_events`
2. Uses this filtered list for carousel rendering
3. Properly indexes slides starting from the first visible event
4. Counts only visible events for pagination
5. Updates navigation to work with filtered event indices

## Default Behavior

**Important:** If `visible` is not specified, the event will **NOT** be shown (safety first approach). Always explicitly set `visible = true` for events you want to display.
