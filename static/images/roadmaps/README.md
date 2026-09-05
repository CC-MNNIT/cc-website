# Roadmap Images (Home Page Carousel)

This folder holds the images used by the roadmap cards on the home page's horizontal scroll section.

## How it works

The home page automatically shows every roadmap in `content/roadmaps/` that sets a `carousel_image` in its frontmatter — nothing else needs to be updated when adding a new roadmap.

## Current roadmaps and their images

| Roadmap file | Carousel image |
|---|---|
| `content/roadmaps/web-development.md` | `roadmaps/web-development-cyber.webp` |
| `content/roadmaps/competitive-programming.md` | `roadmaps/dsa-cyber.webp` |
| `content/roadmaps/machine-learning.md` | `roadmaps/machine-learning-cyber.webp` |
| `content/roadmaps/devops.md` | `roadmaps/devops-cyber.webp` |
| `content/roadmaps/open-source.md` | `roadmaps/open-source-cyber.webp` |

## Adding a new roadmap image

1. Create the roadmap page in `content/roadmaps/` (e.g. `content/roadmaps/rust.md`)
2. Add the carousel fields to its frontmatter:

```toml
[extra]
carousel_image = "roadmaps/rust-cyber.webp"
carousel_title = "Rust"
carousel_description = "One-line pitch for the carousel card"
```

3. Place the image in this folder (`static/images/roadmaps/`)

## Image guidelines

- **Format:** WebP preferred (JPG/PNG accepted — CI converts and optimizes automatically)
- **Size:** ~600x400px (3:2), displayed at 240px height
- **Quality:** web-optimized, aim for under 150KB
- **Style:** should match the existing "cyber" cards used by the current roadmaps
