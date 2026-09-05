+++
title = "mnnit-proxy: Proxifier for Linux, built for MNNIT"
date = 2026-09-05
description = "One-command installer that routes all Linux apps through the MNNIT campus proxy: hostel-wise static IPs, proxy failover, LAN auto start/stop. Arch and Ubuntu."

[taxonomies]
tags = ["linux", "proxy", "networking", "open-source"]
categories = ["tech"]

[extra]
author = "Shanu Kumawat"
author_linkedin = "shanukumawat"
+++

## Introduction

MNNIT's hostel internet runs through an authenticated HTTP proxy. On Windows that is a solved problem: Proxifier sits between your apps and the network, and everything works. On Linux, the official guidance has been environment variables plus per-app configs. Browsers respect them. Most software does not. Every year someone burns a weekend getting `git`, `npm` or Steam to talk through `edcguest`, and the fix falls apart with the next app update.

So I wrote **mnnit-proxy**: one installer that makes the whole system use the college proxy, every app, zero configuration. The source lives in the [CC-MNNIT](https://github.com/CC-MNNIT) organisation on GitHub, and changes go through a test suite before they ship.

{% <alert_info > %}
**TL;DR:** run this on campus (hotspot works too) and follow the prompts:

```bash
curl -fsSL https://raw.githubusercontent.com/CC-MNNIT/mnnit-proxy/main/install.sh | sudo bash
```

It detects your distro, sets your hostel's static IP from the official allotment PDF, and puts a transparent proxy in front of the entire system. Arch and Ubuntu, x86_64 and ARM.
{% </alert_info > %}

![mnnit-proxy hero - all application traffic flowing through one tunnel](/images/blog/2026/mnnit-proxy/hero.webp)

<!-- more -->

## How it works

mihomo (the engine behind Clash.Meta) creates a TUN device: a virtual network interface that the kernel routes all traffic through. Applications configure nothing and never learn that a proxy exists.

![Architecture - app traffic converging into the TUN device, rules engine, then proxied out](/images/blog/2026/mnnit-proxy/how-it-works.webp)

{% <mermaid > %}
graph LR
    A["Apps: browser, git, npm, Steam"] -->|"all TCP"| B["TUN device (Meta)"]
    B --> C{"mihomo rules engine"}
    C -->|"campus and LAN IPs"| D["DIRECT"]
    C -->|"everything else"| E["College proxy (3-way fallback)"]
    E -->|"HTTP CONNECT with auth"| F["Internet"]
{% </mermaid > %}

Three details do the heavy lifting:

1. **DNS.** Campus networks break name resolution for non-proxy-aware apps. mihomo hijacks DNS on port 53 and answers with addresses from a reserved fake range. When the app dials that address, mihomo maps it back to the hostname and forwards the hostname upstream. Resolution works even for apps that would never have used the proxy on their own.
2. **Route exclusion.** The TUN takes over the default route, but three private ranges (`10/8`, `172.16/12`, `192.168/16`) are excluded from it. Your hostel LAN, the campus intranet and the proxy servers themselves stay outside the tunnel.
3. **Failover.** Three college proxies sit in a fallback group with health checks every five minutes. One dies, the next picks up, no config edit needed.

## Why the GitHub repo says "Honkai: Star Rail"

One thing you will notice immediately: the [mihomo repository](https://github.com/MetaCubeX/mihomo) describes itself as "a simple Python Pydantic model for Honkai: Star Rail parsed data from the Mihomo API". That is not a mistake.

mihomo used to be **Clash.Meta**, the community successor to the original Clash proxy core. In late 2023 the original Clash repository was taken down under legal pressure, and the project survived by renaming itself and toning down its public face. Today the default branch genuinely contains a working Star Rail API library (we checked), while the actual kernel lives on the `Meta` branch and in the release binaries - which is what the installer downloads. The real documentation is at [wiki.metacubex.one](https://wiki.metacubex.one). An open secret, and we verified every bit of it.

## What the installer does

It is a single bash script, and it encodes everything specific about our network:

- **Distro detection.** On Arch it sets up an AUR helper and installs mihomo. On Ubuntu it fetches the release binary from GitHub and writes a systemd unit with the capabilities the TUN device needs.
- **Static IP.** The DHCP pool on hostel LANs does not route to the proxy servers, so the per-room static IP from the allotment PDFs is genuinely required. The installer shows your hostel's PDF, computes gateway and subnet for the IP you enter, validates it against the documented range, and applies it with `nmcli`.
- **Proxifier behaviour.** A NetworkManager dispatcher script watches link events. Cable in and a `172.31.*` gateway appears: mihomo starts. Cable out: it stops, and your hotspot works normally. The decision log lives in `journalctl -t mihomo-lan`.
- **Offline toolkit.** Everything is copied to `/opt/mnnit-proxy` with a `mnnit-proxy-update` command, so you can switch hostel or IP later without internet.

When something breaks, `sudo bash install.sh --diagnose` runs six checks (service, TUN device, config, IP and gateway, proxy reachability, end-to-end) and says what each failure means instead of dumping a stack trace at you.

## The LAN watcher in action

![LAN watcher - cable plugged glows active, unplugged glows paused](/images/blog/2026/mnnit-proxy/lan-watch.webp)

The dispatcher is my favourite part. It reacts to NetworkManager events:

```bash
# cable plugged in at hostel
mihomo-lan: campus gateway 172.31.64.1 detected on enp62s0 -> starting mihomo

# cable pulled out, switching to phone hotspot
mihomo-lan: no campus link left -> stopping mihomo
```

One edge case: mihomo's own TUN device also fires link events when it comes up. The dispatcher ignores TUN interfaces, otherwise the tool would react to itself forever.

## Honest limitations

{% <alert_warning > %}
The college proxy only speaks HTTP CONNECT. That is TCP, nothing else. So:

- `ping` and `traceroute` fail. ICMP has no proxy path; test with `curl https://google.com` instead.
- Anything UDP-shaped does not work: Discord voice, most multiplayer games, torrents.
- QUIC/HTTP3 falls back to TCP on its own, so browsing is unaffected.

Everything that speaks TCP - `git`, `npm`, `pip`, `ssh`, `apt`, `pacman` - works without configuration.
{% </alert_warning > %}

## Links

{{<pretty_link url="https://github.com/CC-MNNIT/mnnit-proxy" title="CC-MNNIT/mnnit-proxy" description="The installer, test suite and CI - issues welcome" />}}

{{<pretty_link url="https://github.com/CC-MNNIT/proxy-settings" title="CC-MNNIT/proxy-settings" description="The classic per-app proxy guide, including the Windows Proxifier setup" />}}

If your hostel's allotment changed or a subnet in the table is wrong, PRs are welcome. The data is one TSV file.

{% <alert_success > %}
**Setup:** `curl -fsSL https://raw.githubusercontent.com/CC-MNNIT/mnnit-proxy/main/install.sh | sudo bash` - if it breaks on your machine, run the diagnose mode and open an issue with the output.
{% </alert_success > %}

---

*Questions or feedback? Connect with me on [LinkedIn](https://www.linkedin.com/in/shanukumawat/)!*