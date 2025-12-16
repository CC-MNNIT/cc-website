# CC Club Website

Welcome to the official website of the Computer Coding Club, LNMIIT! This is a modern, fast, and easy-to-maintain static website built with [Zola](https://www.getzola.org/) and the [Goyo](https://github.com/jeevangantait/goyo) theme.

## 🚀 Quick Start

### Prerequisites

- **Zola** (Static Site Generator)
  - Download: [https://www.getzola.org/documentation/getting-started/installation/](https://www.getzola.org/documentation/getting-started/installation/)
  - Version: 0.17.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ccc-lnmiit/cc-website.git
   cd cc-website
   ```

2. **Initialize the Goyo theme submodule**:
   ```bash
   git submodule update --init --recursive
   ```

3. **Run the development server**:
   ```bash
   zola serve
   ```

4. **Open in browser**:
   - Navigate to `http://127.0.0.1:1111`
   - Site will auto-reload when you make changes

### Building for Production

```bash
zola build
```

This generates the static site in the `public/` directory.

## 📁 Project Structure

```
cc-website/
├── config.toml              # Site configuration
├── content/                 # All content (markdown files)
│   ├── _index.md           # Homepage
│   ├── blog/               # Blog posts
│   │   └── 2025/
│   ├── events/             # Event pages
│   │   ├── upcoming/
│   │   └── past/
│   ├── contrihub/          # ContriHub pages
│   │   └── 2025/
│   ├── projects/           # Project showcase
│   ├── roadmaps/           # Learning roadmaps
│   ├── resources/          # Curated resources
│   ├── about.md            # About page
│   ├── team.md             # Team page
│   └── alumni.md           # Alumni directory
├── data/                    # YAML data files
│   ├── team.yaml           # Team member data
│   ├── alumni.yaml         # Alumni data
│   └── contrihub/          # ContriHub data
│       ├── 2025.yaml
│       ├── 2025-recognitions.yaml
│       ├── 2025-featured.yaml
│       └── 2025-stories.yaml
├── static/                  # Static assets
│   ├── css/
│   │   └── custom.css      # Custom styles
│   ├── js/
│   │   └── alumni-search.js
│   └── images/             # All images
├── templates/               # Custom HTML templates
│   ├── alumni.html         # Alumni page template
│   └── contrihub-event.html # ContriHub event template
├── themes/
│   └── goyo/               # Goyo theme (git submodule)
├── CONTRIBUTING.md          # Contribution guide
└── README.md               # This file
```

## ✨ Features

### Built-in Features (via Goyo Theme)
- ⚡ Lightning-fast static site generation
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔍 Built-in search functionality
- 📊 Mermaid diagram support
- 💬 Comment system integration (optional)
- 🎨 DaisyUI components
- 📝 Syntax highlighting for code blocks
- 🔗 Social sharing buttons
- ♿ Accessible design

### Custom Features
- 👥 Alumni directory with search and filters
- 🎯 ContriHub event showcase with recognitions and stories
- 📚 Comprehensive learning roadmaps
- 📝 Blog with categories and tags
- 📅 Event management (upcoming/past)
- 💼 Project showcase
- 📖 Curated resource library

## 📝 Content Management

### Adding Content

**Blog Posts:**
```bash
# Create new blog post
touch content/blog/2025/your-post-title.md
```

**Events:**
```bash
# Add upcoming event
touch content/events/2025/event-name.md
```

**Roadmaps:**
```bash
# Add new roadmap
touch content/roadmaps/domain-name.md
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on adding each type of content.

### Updating Data

**Team Members:**
- Edit `data/team.yaml`
- Add photos to `static/images/team/`

**Alumni:**
- Edit `data/alumni.yaml`
- Add photos to `static/images/alumni/`

**ContriHub:**
- Edit files in `data/contrihub/`
- Follow existing YAML structure

## 🎨 Customization

### Styling

Custom styles go in `static/css/custom.css`. This file includes:
- Extensive comments explaining each section
- Examples for common customizations
- Instructions for the design team

**Common customizations:**
```css
/* Change primary color */
:root {
  --primary-color: #your-color;
}

/* Customize fonts */
body {
  font-family: 'Your Font', sans-serif;
}
```

### Configuration

Edit `config.toml` to modify:
- Site title and description
- Navigation menu
- Theme settings (logo, colors, sidebar)
- Social links
- Analytics (optional)

### Templates

Custom templates are in `templates/`:
- `alumni.html` - Alumni directory page
- `contrihub-event.html` - ContriHub event pages

To use a custom template, add to frontmatter:
```markdown
+++
template = "alumni.html"
+++
```

## 🚀 Deployment

### GitHub Pages

The site can be deployed to GitHub Pages using GitHub Actions.

1. **Enable GitHub Pages** in repository settings
2. **Add GitHub Actions workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      
      - name: Install Zola
        run: |
          wget https://github.com/getzola/zola/releases/download/v0.17.2/zola-v0.17.2-x86_64-unknown-linux-gnu.tar.gz
          tar -xzf zola-v0.17.2-x86_64-unknown-linux-gnu.tar.gz
          sudo mv zola /usr/local/bin/
      
      - name: Build
        run: zola build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

3. **Push to main branch** - Site will auto-deploy!

### Other Platforms

**Netlify:**
- Connect GitHub repo
- Build command: `zola build`
- Publish directory: `public`

**Vercel:**
- Import GitHub repo
- Framework: Other
- Build command: `zola build`
- Output directory: `public`

**Cloudflare Pages:**
- Connect GitHub repo
- Build command: `zola build`
- Build output directory: `public`

## 🛠️ Development

### Recommended Tools

- **VS Code** with extensions:
  - Markdown All in One
  - YAML
  - Better TOML
  - Zola Syntax Highlighting (if available)

- **Git GUI** (optional):
  - GitHub Desktop
  - GitKraken
  - SourceTree

### Testing

**Local testing:**
```bash
zola serve
```

**Build testing:**
```bash
zola build
```

**Check for errors:**
```bash
zola check
```

### Common Tasks

**Adding images:**
```bash
# Place in appropriate directory
cp image.jpg static/images/blog/2025/

# Reference in markdown
![Description](images/blog/2025/image.jpg)
```

**Preview drafts:**
```markdown
+++
draft = true
+++
```

Use `zola serve --drafts` to see draft content.

## 📚 Documentation

- **Zola Docs**: [https://www.getzola.org/documentation/](https://www.getzola.org/documentation/)
- **Goyo Theme**: [https://github.com/jeevangantait/goyo](https://github.com/jeevangantait/goyo)
- **DaisyUI**: [https://daisyui.com/](https://daisyui.com/)
- **Markdown Guide**: [https://www.markdownguide.org/](https://www.markdownguide.org/)

## 🤝 Contributing

We welcome contributions from all club members!

**Quick contribution:**
1. Fork the repository
2. Make your changes
3. Create a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
- Adding blog posts, events, and content
- Updating team and alumni data
- Working with Git
- Pull request process
- Code of conduct

## 👥 Team

**Web Team 2024-25:**
- **Lead**: [Name] - [GitHub]
- **Design**: [Name] - [GitHub]
- **Content**: [Name] - [GitHub]
- **Maintainer**: Shanu Kumawat - [@your-github]

See [Team Page](content/team.md) for full team.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The Goyo theme is licensed under the MIT License by its original authors.

## 🙋 Support

**Need help?**

1. Check [CONTRIBUTING.md](CONTRIBUTING.md) for common questions
2. Search existing [GitHub Issues](https://github.com/ccc-lnmiit/cc-website/issues)
3. Ask on club Discord server
4. Open a new issue on GitHub
5. Contact web team directly

## 📈 Roadmap

**Current Status:** ~80% Complete ✅

**Completed:**
- ✅ Site structure and configuration
- ✅ All content pages created
- ✅ Blog section with examples
- ✅ Event pages
- ✅ ContriHub section
- ✅ Roadmaps
- ✅ Alumni directory
- ✅ Team page
- ✅ Custom templates
- ✅ YAML data structure
- ✅ Documentation

**To Do:**
- 🔄 Add real content (replace examples)
- 🔄 Custom CSS styling (design team)
- 🔄 Collect team photos
- 🔄 Collect alumni data
- 🔄 Add more blog posts
- 🔄 Add more roadmaps
- 🔄 Set up GitHub Actions deployment
- 🔄 Add analytics (optional)

**Future Enhancements:**
- Newsletter subscription
- Event registration integration
- Project submission portal
- Member dashboard
- Achievement badges
- Photo gallery
- ContriHub live leaderboard

## 🎉 Acknowledgments

- **Goyo Theme** by Jeevan Gantait
- **Zola** static site generator
- **DaisyUI** component library
- **Tailwind CSS** utility framework
- **Font Awesome** icons
- All CC Club contributors!

---

**Made with ❤️ by CC Club, LNMIIT**

**Last Updated:** January 2025
