+++
title = "Setting up Arch Linux on WSL: A Complete Guide for Students"
date = 2026-03-10
description = "Learn how to install and setup Arch Linux on Windows Subsystem for Linux (WSL), configure a normal user, and install a modern developer environment."

[taxonomies]
tags = ["wsl", "arch-linux", "tutorial"]
categories = ["tutorial"]

[extra]
author = "Shanu Kumawat"
author_linkedin = "shanukumawat"
+++

## Introduction

Getting a proper development environment set up on Windows can be challenging. However, with the Windows Subsystem for Linux (WSL), you can run a full Linux environment right on your Windows machine! This guide will walk you through installing **Arch Linux on Windows using WSL**, configuring a normal user, and setting up a modern developer environment.

<!-- more -->

## 1. Install Arch Linux on WSL

First, we need to install Arch Linux through WSL.

Open **PowerShell as Administrator** and run the following command:

```powershell
wsl --install archlinux
```

This command will automatically:
- Enable Windows Subsystem for Linux
- Install the WSL2 kernel
- Install **Arch Linux**

{% alert_info() %}
If this is your first time installing WSL, **Windows will ask you to restart your computer**. 
After restarting, you will need to open PowerShell as Administrator and run the command `wsl --install archlinux` **again**. The first run only installs WSL itself, and the second run will actually install Arch Linux.
{% end %}

After installation is complete, open your Arch Linux environment by running:

```powershell
wsl
```

You should see something like this in your terminal:

```bash
[root@DESKTOP ~]#
```

Currently, you are logged in as the **root user**. For security reasons and best practices, we shouldn't do our daily work as the root user. Let's fix that!

## 2. Update the System

Before installing anything else, it's crucial to update the system packages to their latest versions.

```bash
pacman -Syu
```

Press **Y** when prompted to proceed with the updates.

## 3. Install Essential Packages

Now, let's install some basic tools we will need for the setup process.

```bash
pacman -S sudo base-devel micro curl
```

Here's what these packages provide:
- `sudo`: Allows you to run commands with administrator privileges
- `base-devel`: Essential tools required for building software from source
- `micro`: A modern and intuitive terminal-based text editor
- `curl`: A command-line tool for transferring data over URLs

## 4. Create a Normal User

As mentioned earlier, working as root is not recommended. Let's create a new standard user account. Replace `username` with your desired username.

```bash
useradd -m -G wheel username
```

{% collapse(title="Explanation of the command parameters") %}
- `-m`: Instructs `useradd` to create a home directory for the new user.
- `-G wheel`: Adds the new user to the **wheel group**, which is typically used to grant administrative (sudo) privileges.
{% end %}

## 5. Set a Password for the User

You need a password for your new user to log in and use sudo. Set it by running:

```bash
passwd username
```

You'll be prompted to enter and confirm the password.

## 6. Enable Sudo for the Wheel Group

Now we need to tell the system that users in the wheel group are allowed to use `sudo`.

Open the sudo configuration file using the `micro` editor we installed earlier:

```bash
EDITOR=micro visudo
```

Find this line in the file:

```text
# %wheel ALL=(ALL:ALL) ALL
```

Remove the `#` at the beginning to uncomment it, making it look like this:

```text
%wheel ALL=(ALL:ALL) ALL
```

Save and exit the editor (in `micro`, press `Ctrl+S` then `Ctrl+Q`).

{% alert_success() %}
This change allows any user in the **wheel group** to use `sudo` for executing administrative commands!
{% end %}

## 7. Switch to the New User

Let's test our new account. Switch to the user you just created:

```bash
su - username
```

Your prompt should now change to look similar to:

```bash
username@DESKTOP ~ $
```

## 8. Test Sudo Access

Verify that your new user can successfully execute commands as root:

```bash
sudo whoami
```

You will be asked to enter your newly created password. If everything is configured correctly, the output should be:

```text
root
```

This confirms that **sudo is working properly**!

## 9. Exit the Linux Shell

Now, let's exit the Linux shell and get back to Windows PowerShell to make our final configuration.

```bash
exit # Exits the su session
exit # Exits WSL and returns to PowerShell
```

## 10. Set the Default WSL User

By default, Arch WSL continues to launch as the `root` user. We want it to open directly as your newly created user.

In your **PowerShell** window, run this command:

```powershell
wsl --manage archlinux --set-default-user username
```

## 11. Restart the Distribution

To ensure all changes are applied cleanly, let's terminate the running WSL instance:

```powershell
wsl --terminate archlinux
```

## 12. Start Arch Again

Finally, start Arch Linux again:

```powershell
wsl
```

You should now be logged in seamlessly as:

```bash
username@DESKTOP ~ $
```

You can double-check with:

```bash
whoami
```

The output should show your username!

{% alert_success() %}
**Congratulations!** Your Arch WSL system is now set up with a normal user account and working sudo privileges. It will automatically launch as your user instead of root.
{% end %}

---

## Setting Up the Development Environment

At this point, you have a fresh, minimal Arch Linux system running inside WSL. By design, it only contains the core components. Everything else—shells, development tools, editors, and utilities—needs to be installed.

Instead of installing and configuring everything manually, you can use a small bootstrap script that automatically sets up a modern developer environment. This script installs a collection of useful tools and applies configuration files (*dotfiles*) so that your environment is ready for development work out of the box.

The automated setup configures:
- **zsh**: A powerful and customizable shell
- **neovim**: A modern terminal-based text editor
- **git & GitHub CLI**: Essential version control tools
- **ripgrep, fzf, zoxide**: Fast search and intelligent navigation utilities
- **eza & bat**: Improved replacements for common commands like `ls` and `cat`
- **yazi**: A fast, modern terminal file manager
- **tmux & btop**: Terminal multiplexer and system monitor
- **JetBrains Mono & Paru**: Developer font and AUR helper
- **Node.js & Python**: Essential language runtimes

To run the automated setup, copy and execute the following command inside your Arch WSL terminal:

```bash
curl -fsSL https://shanu-kumawat.github.io/class/setup.sh | bash
```

{% alert_info() %}
This process will download all necessary packages and apply modern configurations. It may take a few minutes depending on your internet connection speed.
{% end %}

Once the script finishes completely, simply restart your terminal or open a new WSL session. Welcome to your beautiful new development environment!
