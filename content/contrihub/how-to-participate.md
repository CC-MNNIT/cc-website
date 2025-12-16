+++
title = "How to Participate in ContriHub"
description = "Complete guide for participating in ContriHub - from Git basics to making your first pull request"
date = 2025-09-01
weight = 1

[extra]
guide_type = "beginner-friendly"
badge = "UPDATED"
+++

# How to Participate in ContriHub

Welcome to ContriHub! This guide will walk you through everything you need to know to make your first open source contribution. **No prior experience required** - we'll teach you step by step.

## Before You Start

### What You'll Need

- **GitHub Account** - [Sign up free](https://github.com/signup)
- **Git Installed** - [Download Git](https://git-scm.com/downloads)
- **Code Editor** - [VS Code (recommended)](https://code.visualstudio.com/)
- **Discord Account** - [Join our server](https://discord.gg/ccclub)

### Recommended Knowledge

- Basic programming (any language)
- Familiarity with command line basics
- Willingness to learn and ask questions!

**Don't have these skills?** That's okay! We'll help you learn.

---

## Step 1: Learn Git & GitHub Basics

### What is Git?

**Git** is a version control system that tracks changes to your code. Think of it like "Track Changes" in Word, but for code and much more powerful.

### What is GitHub?

**GitHub** is a website where people store Git repositories and collaborate on code.

### Essential Git Concepts

**Repository (Repo)**: A folder containing your project and its history  
**Commit**: A snapshot of your changes  
**Branch**: A parallel version of your code  
**Pull Request (PR)**: A request to merge your changes into the main code  
**Fork**: Your personal copy of someone else's repository

### Git Installation

#### Windows
```bash
# Download installer from git-scm.com
# Run installer with default settings
# Verify installation
git --version
```

#### Mac
```bash
# Using Homebrew
brew install git

# Verify
git --version
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get install git

# Fedora
sudo dnf install git

# Verify
git --version
```

### Configure Git

```bash
# Set your name (will appear in commits)
git config --global user.name "Your Name"

# Set your email (should match GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## Step 2: Fork and Clone a Repository

### 1. Find a Repository

Browse ContriHub repositories:
- [CC Club Website](https://github.com/ccclub/website)
- [DSA Platform](https://github.com/ccclub/dsa-platform)
- [Alumni Portal](https://github.com/ccclub/alumni-portal)

Look for repositories with **good documentation** and **"good first issue"** labels.

### 2. Fork the Repository

**Fork** = Create your own copy of the repository

1. Go to the repository on GitHub
2. Click the "Fork" button (top right)
3. GitHub creates `yourname/repository` - this is yours!

### 3. Clone to Your Computer

**Clone** = Download the repository to work locally

```bash
# Replace with your GitHub username and repo name
git clone https://github.com/YOUR-USERNAME/repository-name.git

# Example:
git clone https://github.com/ananya/cc-website.git

# Navigate into the folder
cd repository-name
```

### 4. Add Upstream Remote

**Upstream** = The original repository (to get updates)

```bash
# Add the original repository as "upstream"
git remote add upstream https://github.com/ccclub/repository-name.git

# Verify remotes
git remote -v
# You should see:
# origin    https://github.com/YOUR-USERNAME/repo.git (your fork)
# upstream  https://github.com/ccclub/repo.git (original)
```

---

## Step 3: Find an Issue to Work On

### What Makes a Good First Issue?

Look for issues tagged:
- **`good first issue`** - Perfect for beginners
- **`documentation`** - Usually straightforward
- **`help wanted`** - Maintainers actively seeking help
- **`beginner-friendly`** - Self-explanatory!

### How to Pick an Issue

1. **Read the issue description carefully**
2. **Check if someone is already working on it** (look for comments)
3. **Make sure you understand what needs to be done**
4. **Comment saying you'd like to work on it**

Example comment:
```
Hi! I'd like to work on this issue. This would be my first contribution, 
so I might need some guidance. Looking forward to contributing!
```

**Wait for maintainer approval** before starting work!

### Issue Labels Explained

- 🟢 `good first issue` - Perfect starting point
- 📘 `documentation` - Update or add docs
- 🐛 `bug` - Something isn't working
- ✨ `enhancement` - New feature
- 🧪 `testing` - Add or improve tests
- 🎨 `design` - UI/UX improvements

---

## Step 4: Make Your Changes

### 1. Create a New Branch

**Never work directly on `main` branch!**

```bash
# Create and switch to a new branch
git checkout -b fix-typo-in-readme

# Branch naming conventions:
# fix/issue-description
# feature/what-you're-adding
# docs/what-documentation
```

### 2. Make Your Changes

- Open the project in your code editor (VS Code recommended)
- Make the changes described in the issue
- Test your changes (run the project locally if possible)
- Follow the project's code style

### 3. Check Your Changes

```bash
# See what files you've changed
git status

# See the actual changes
git diff
```

### 4. Stage Your Changes

```bash
# Stage specific files
git add filename.txt

# Or stage all changed files
git add .
```

### 5. Commit Your Changes

```bash
# Commit with a descriptive message
git commit -m "Fix typo in README.md"
```

**Good Commit Messages**:
- ✅ "Fix typo in installation instructions"
- ✅ "Add dark mode toggle to header"
- ✅ "Update broken link in documentation"

**Bad Commit Messages**:
- ❌ "Update"
- ❌ "Fixed stuff"
- ❌ "asdfghjk"

### 6. Push to Your Fork

```bash
# Push your branch to your fork on GitHub
git push origin your-branch-name

# Example:
git push origin fix-typo-in-readme
```

---

## Step 5: Create a Pull Request

### 1. Go to Your Fork on GitHub

After pushing, GitHub will show a banner:
**"your-branch-name had recent pushes"** with a button **"Compare & pull request"**

Click that button!

### 2. Fill Out the PR Template

Most repositories have a template. Fill it out completely:

```markdown
## Description
Fixed a typo in the README.md file where "installtion" 
was misspelled as "installation".

## Type of Change
- [x] Bug fix (typo correction)
- [ ] New feature
- [ ] Documentation update

## Related Issue
Fixes #42

## Testing
- Verified spelling is now correct
- Checked that formatting is intact

## Screenshots (if applicable)
Before: [screenshot]
After: [screenshot]
```

### 3. Submit the PR

- Review your changes one last time
- Click "Create pull request"
- Wait for review!

### 4. Respond to Feedback

Maintainers might request changes:

```
"Thanks for the PR! Could you also check line 47 
which has a similar typo?"
```

**How to make changes**:

```bash
# Make the requested changes in your code editor
# Stage and commit
git add .
git commit -m "Fix typo on line 47 as requested"

# Push to the same branch
git push origin your-branch-name
```

The PR updates automatically! No need to create a new one.

---

## Step 6: After Your PR is Merged

### 1. Celebrate! 🎉

You're officially an open source contributor!

### 2. Update Your Fork

```bash
# Switch to main branch
git checkout main

# Get latest changes from original repo
git pull upstream main

# Update your fork on GitHub
git push origin main
```

### 3. Delete the Branch (Optional)

```bash
# Delete local branch
git branch -d your-branch-name

# Delete remote branch
git push origin --delete your-branch-name
```

---

## Common Issues & Solutions

### "Permission denied" when pushing

**Problem**: Your SSH key isn't set up  
**Solution**: Use HTTPS URL or [set up SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### "Conflict" when pulling

**Problem**: Remote changes conflict with yours  
**Solution**:
```bash
git stash        # Save your changes
git pull         # Get remote changes
git stash pop    # Re-apply your changes
# Resolve conflicts manually, then commit
```

### "Failed to push some refs"

**Problem**: Remote branch has changes you don't have  
**Solution**:
```bash
git pull --rebase origin your-branch-name
git push origin your-branch-name
```

### Can't see my PR in the original repo

**Problem**: You opened PR on your fork, not the upstream  
**Solution**: Make sure you selected the correct base repository when creating PR

---

## Best Practices

### Do's ✅

- **Ask questions** - Better to ask than assume
- **Read contribution guidelines** - Every repo has them
- **One issue per PR** - Keep changes focused
- **Test your changes** - Make sure things work
- **Write clear commit messages** - Others should understand what you did
- **Be patient** - Maintainers review when they can
- **Be respectful** - Everyone's learning

### Don'ts ❌

- **Don't work on unassigned issues** - Wait for approval
- **Don't force push to main** - Ever!
- **Don't make unrelated changes** - Stick to the issue
- **Don't ignore review feedback** - It's there to help
- **Don't rush** - Quality over speed

---

## Getting Help

### Stuck? Here's Where to Ask

1. **Discord** - #contrihub-help channel  
   Real-time community support

2. **Issue Comments** - Ask on the GitHub issue  
   Maintainers and other contributors can help

3. **Office Hours** - Weekly support sessions during ContriHub  
   One-on-one help available

4. **Documentation** - Check the repository's docs  
   Often answers are already documented

### How to Ask for Help

**Bad**:
> "It doesn't work help"

**Good**:
> "I'm trying to set up the project following the README, but when I run 
> `npm install`, I get error 'MODULE_NOT_FOUND'. I'm on Windows 10 with 
> Node v18. Here's the full error: [paste error]. Any ideas?"

**Include**:
- What you're trying to do
- What you expected to happen
- What actually happened
- Error messages (full text)
- Your system (OS, versions)
- Steps you've already tried

---

## Resources for Learning

### Git & GitHub

- [Git Handbook (GitHub)](https://guides.github.com/introduction/git-handbook/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
- [GitHub Skills](https://skills.github.com/)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Fixing common mistakes

### Markdown (for documentation)

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

### Open Source

- [First Timers Only](https://www.firsttimersonly.com/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Awesome for Beginners](https://github.com/MunGell/awesome-for-beginners)

---

## Quick Reference: Git Commands

```bash
# Clone a repository
git clone <url>

# Check status
git status

# Create a new branch
git checkout -b <branch-name>

# Stage changes
git add <file>          # specific file
git add .               # all files

# Commit changes
git commit -m "message"

# Push to GitHub
git push origin <branch-name>

# Pull latest changes
git pull upstream main

# Update your fork
git push origin main

# View remotes
git remote -v

# View branch history
git log
```

---

## Checklist: Before Submitting PR

- [ ] Issue is assigned to you
- [ ] Created a new branch (not working on main)
- [ ] Made the changes described in the issue
- [ ] Tested changes locally
- [ ] Followed code style guidelines
- [ ] Updated documentation if needed
- [ ] Wrote clear commit messages
- [ ] Filled out PR template completely
- [ ] Linked the related issue
- [ ] Requested review

---

## Next Steps

Ready to contribute? Here's what to do:

1. ✅ **Set up Git and GitHub** (if not already done)
2. ✅ **Join Discord** for community support
3. ✅ **Browse repositories** and find a good first issue
4. ✅ **Comment on the issue** to claim it
5. ✅ **Follow this guide** to make your contribution
6. ✅ **Ask for help** whenever you're stuck

**Remember**: Every expert was once a beginner. Your first contribution doesn't have to be perfect - it just has to be genuine. The community is here to support you!

---

**Questions about this guide?** Ask in Discord #contrihub-help or email contrihub@ccclub.edu.

**Found an error in this guide?** This guide is also open source! Submit a PR to improve it. 🚀

<!--
    HOW TO PARTICIPATE GUIDE TEMPLATE
    
    This is a comprehensive beginner-friendly guide.
    
    KEY PRINCIPLES:
    - Assume ZERO prior knowledge
    - Explain every term
    - Provide specific examples
    - Include troubleshooting
    - Make it encouraging, not intimidating
    
    UPDATE REGULARLY:
    - As Git/GitHub UIs change
    - Based on common questions from participants
    - With new resources and tools
    - To reflect current best practices
-->
