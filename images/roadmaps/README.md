# Roadmaps Images for Landing Page Horizontal Scroll

This folder contains images for the roadmaps horizontal scroll section on the landing page.

## Required Images:

Add images that correspond to your roadmap markdown files in `content/roadmaps/`.

Currently configured roadmaps need these images:

1. **dsa-fundamentals.jpg** (600x400px recommended)
   - Referenced in: `content/roadmaps/dsa.md`
   - Theme: Data structures, algorithms, coding challenges

2. **web-development.jpg** (600x400px recommended)
   - Referenced in: `content/roadmaps/web-development.md`
   - Theme: Web development, HTML/CSS/JS, full-stack

## Adding More Roadmaps:

To add new roadmaps to the landing page carousel:

1. Create a new `.md` file in `content/roadmaps/` (e.g., `machine-learning.md`)
2. Add these fields to the frontmatter:
   ```toml
   [extra]
   carousel_image = "roadmaps/your-image.jpg"
   carousel_title = "Your Roadmap Title"
   carousel_description = "Brief description for the landing page"
   ```
3. Add the corresponding image to this folder

## Image Guidelines:

- **Format**: JPG or PNG
- **Size**: 600x400px (3:2 ratio) - displayed at 240px height
- **Quality**: High quality, web-optimized (under 150KB per image)
- **Theme**: Should match CC Club's dark burgundy & gold aesthetic
- **Content**: Clear, relevant icons/graphics for each learning path

## Placeholder Sources:

If you don't have custom images yet, you can use:
- Unsplash (https://unsplash.com/) - Search: "coding", "learning", "programming"
- Undraw (https://undraw.co/) - Customizable illustrations
- Create simple graphics with Canva or Figma

## Dynamic Loading:

The landing page automatically loads all roadmap pages from `content/roadmaps/` that have the `carousel_image` field set. No need to manually update `_index.md`!
