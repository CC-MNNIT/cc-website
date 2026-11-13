+++
title = "Cybersecurity Engineering Roadmap"
description = "A comprehensive, practical guide to mastering cybersecurity engineering: security foundations, web application security, network defense, applied cryptography, offensive labs and CTFs, and defensive operations."
weight = 14

[extra]
difficulty = "Beginner to Advanced"
estimated_time = "Ongoing Practice (5-7 months for core foundation)"
prerequisites = "Basic computer literacy; the System Administration roadmap's early stages are strongly recommended"
badge = "SECURITY"
toc_expand = true
+++

Cybersecurity is the discipline of defending systems, networks, and applications against adversaries — and, to defend them well, understanding exactly how attackers break them. It is one of the few engineering fields where thinking like the attacker is a formal job requirement, where lab practice on deliberately vulnerable machines is the standard curriculum, and where a single unpatched misconfiguration can cost an organization everything.

For college students, cybersecurity offers a uniquely accessible entry: most of the world's best training — the PortSwigger Web Security Academy, TryHackMe, HackTheBox, picoCTF — is free or cheap, the labs are legal sandboxes built for experimentation, and the skills compound directly on top of the Linux and networking foundations taught in our [System Administration Roadmap](@/roadmaps/sysadmin.md).

This roadmap is designed by the **Computer Coding Club (CC), MNNIT Allahabad** to take you from security fundamentals to hands-on offensive labs, defensive operations, and a portfolio of documented findings — the exact artifacts security hiring managers look for.

---

## 1. Orientation: The Security Engineering Mindset

### 1.1 Read This First: Ethics & Legality

{% <alert_warning> %}
**The Absolute Rule of This Field**: Never test, scan, probe, or attempt to exploit any system you do not have **explicit written authorization** to test. Scanning someone else's server "out of curiosity" is a criminal offense in most jurisdictions — in India under the **Information Technology Act, 2000** (Sections 43 and 66), and elsewhere under laws like the US Computer Fraud and Abuse Act. "I was only learning" is not a legal defense.

Everything in this roadmap is practiced on **deliberately vulnerable lab machines** built for exactly this purpose, or on platforms (TryHackMe, HackTheBox, PortSwigger) that grant you explicit authorization per lab. If a target is not in your lab, on your own hardware, or covered by a bug bounty scope document — it is off-limits. This rule separates future security engineers from future convicts.
{% </alert_warning> %}

* **Responsible disclosure**: If you ever find a real vulnerability in a public service, report it privately through the vendor's security.txt or bug bounty program — never publicly, never exploitatively.
* **Your reputation is your career**: Security hiring is trust-based. A clean, documented lab portfolio is an asset; an unauthorized-access record is permanent.

### 1.2 The CIA Triad: The Foundation of Everything

Every security control, every vulnerability, and every job in this field exists to protect one or more of:

* **Confidentiality**: Only authorized parties can read the data (encryption, access control).
* **Integrity**: Data cannot be tampered with undetected (hashing, signatures, audit logs).
* **Availability**: Systems stay up and serving (redundancy, DDoS protection, incident response).

When you analyze any attack — ransomware (destroys availability), data breach (destroys confidentiality), web defacement (destroys integrity) — you are really asking which leg of the triad it breaks.

### 1.3 The Security Domain Map

"Cybersecurity" is an umbrella over several genuinely different careers:

{% <mermaid> %}
graph TD
    Sec["Cybersecurity Engineering"] --> AppSec["Application Security (AppSec)<br/>Securing code, APIs, and web apps"]
    Sec --> NetSec["Network Security<br/>Firewalls, IDS/IPS, traffic analysis"]
    Sec --> OffSec["Offensive Security<br/>Penetration testing, red teams, CTFs"]
    Sec --> BlueTeam["Defensive Security / Blue Team<br/>SOC, incident response, forensics"]
    Sec --> Crypto["Applied Cryptography<br/>TLS, key management, protocol design"]
    Sec --> GRC["Governance, Risk &amp; Compliance<br/>Audits, standards, policy"]
{% </mermaid> %}

* **Offensive** and **defensive** are two sides of the same skill — great defenders understand attacks, and great attackers understand defenses. This roadmap covers both.
* **AppSec** is the most developer-adjacent path — and the one that pairs best with our [Web Development roadmap](@/roadmaps/web-development.md).

### 1.4 Where Are You Starting From?

{% <mermaid> %}
graph TD
    Start["Your Starting Point"] --> T1["Track A: Complete Beginner"]
    Start --> T2["Track B: Developer (any language)"]
    Start --> T3["Track C: Linux / Networking Comfortable"]
    Start --> T4["Track D: Aspiring Pentester"]

    T1 --> R1["Computer + Linux + networking basics first (SysAdmin Stages 1-5)"]
    T2 --> R2["Web security is your fast lane — you already read code"]
    T3 --> R3["Jump to network security, hardening, and offensive labs"]
    T4 --> R4["Lab platforms directly: TryHackMe paths, then HackTheBox"]

    R1 --> Core["Core Milestone: A personal lab + first documented findings"]
    R2 --> Core
    R3 --> Core
    R4 --> Core
{% </mermaid> %}

* **Track A (Complete Beginners)**: Build the foundation first — security assumes you understand how systems and networks work. The [System Administration roadmap](@/roadmaps/sysadmin.md) is your Stage 0.
* **Track B (Developers)**: You have the highest-leverage path: application security. Attackers exploit the exact code patterns you write daily — and "developer who understands security" is the most in-demand AppSec profile.
* **Track C (Linux/Networking comfortable)**: Go straight to Stages 4–7; the foundations are yours already.
* **Track D (Aspiring Pentesters)**: Lab platforms are your curriculum — but do not skip the fundamentals: tooling without fundamentals produces script kiddies, not engineers.

---

## 2. Stage 1: Technical Foundations

Security work is 50% understanding systems deeply enough to know when they behave abnormally.

* **Linux fluency**: Processes, permissions, services, logs, and the command line. The [System Administration roadmap](@/roadmaps/sysadmin.md) is the prerequisite — security professionals live in Linux.
* **Networking depth**: The OSI and TCP/IP models, DNS, HTTP(S), TLS handshakes, subnetting, and packet flow. You cannot understand a man-in-the-middle attack without knowing what a handshake is.
* **Scripting**: **Python** is the security lingua franca — automation, exploit prototyping, log parsing, and tooling. **Bash** for glue and system work. Build small scripts early: a port scanner and a log parser teach more than they seem to.
* **Virtualization**: Your lab is built on VMs — VirtualBox, VMware, or Proxmox. Learn snapshots (your rollback button when a lab machine breaks).

---

## 3. Stage 2: Core Security Concepts & Threat Modeling

### 3.1 Principles Every Control Derives From

* **Least privilege**: Every user, process, and service gets the minimum access it needs — nothing more. Most real-world breaches are a privilege escalation of some kind.
* **Defense in depth**: Never one control — layers. If the perimeter fails, the network segment holds; if that fails, the host holds; if that fails, the data is encrypted.
* **Fail securely**: When anything fails (an exception, a timeout), the system should default to *denying* access, not granting it.
* **Never trust user input**: The root of nearly every injection vulnerability. Everything from the network is hostile until validated.
* **Security through obscurity is not security**: A hidden endpoint is not a protected endpoint. Systems must be safe even when the attacker knows exactly how they work.

### 3.2 Authentication vs. Authorization

* **Authentication (AuthN)**: Proving identity — passwords, MFA, biometrics, certificates.
* **Authorization (AuthZ)**: What that identity may do — roles, permissions, ownership checks.
* **The classic vulnerability class**: Broken access control is the **#1 category in the OWASP Top 10:2025** — APIs that authenticate correctly but never re-check authorization per resource. Learn it deeply; you will find it everywhere.

### 3.3 Encryption vs. Hashing (Do Not Confuse Them)

* **Encryption** is two-way: data can be decrypted with the key. Used for confidentiality in transit (TLS) and at rest.
* **Hashing** is one-way: passwords are *hashed* (with bcrypt/argon2, never MD5/SHA-1 alone), never encrypted — because the server should never be able to read them back.
* **Salting**: Unique random values per password, defeating precomputed rainbow tables.

### 3.4 Threat Modeling: Thinking Like an Attacker, Structured

* **STRIDE**: The standard taxonomy — **S**poofing, **T**ampering, **R**epudiation, **I**nformation disclosure, **D**enial of service, **E**levation of privilege. For any system, ask what could go wrong in each category.
* **Attack surface**: Every endpoint, port, dependency, and human is entry territory. Mapping the attack surface is the first step of every assessment.

---

## 4. Stage 3: Web Application Security

The web is the largest attack surface in existence — and **application security** is the highest-demand security specialization.

### 4.1 The OWASP Top 10:2025

The [OWASP Top 10](https://top10.owasp.org/2025/en) is the industry-standard list of the most critical web application security risks (the 2025 edition is the current release). Learn each category as a *pattern*, not a list to memorize:

* **Broken Access Control** (still #1): Reading or modifying resources you do not own — changing `?userId=104` to `?userId=105` in the URL, calling admin APIs as a normal user.
* **Injection** (SQL, command, template): Untrusted input interpreted as code. The defense discipline: parameterized queries, never string-concatenated queries.
* **Cryptographic Failures**: Plaintext passwords, weak algorithms, missing TLS, hardcoded keys.
* **Security Misconfiguration**: Default credentials, verbose errors, disabled security features, exposed admin panels.
* **Vulnerable & Outdated Components**: Known-CVE dependencies left unpatched — most breaches start here, not with exotic attacks.
* **Server-Side Request Forgery (SSRF)**: Tricking a server into fetching attacker-controlled URLs — a cloud-environment favorite (metadata endpoints).
* Plus identification failures, software/data integrity failures, and logging failures — see the [full 2025 list](https://top10.owasp.org/2025/en).

### 4.2 The Lab: PortSwigger Web Security Academy

The [PortSwigger Web Security Academy](https://portswigger.net/web-security) is free, browser-based, and the single best web security curriculum in existence — written by the makers of Burp Suite:

* Each vulnerability class gets concept explanations, guided labs, and unsolved labs.
* Work through it in order: SQL injection → access control → XSS → CSRF → SSRF → authentication → web cache poisoning.
* **Document every solved lab** — these notes become your portfolio and your revision material.

---

## 5. Stage 4: Network Security & Traffic Analysis

* **Packet analysis**: **Wireshark** and `tcpdump` — read actual traffic, understand handshakes, spot plaintext credentials, detect anomalies. Capturing and analyzing your own lab traffic is the fastest way to make networking real.
* **Scanning methodology**: **Nmap** — host discovery, port scanning, service/version detection, and scripting engine. Learn *why* each scan type works (SYN vs connect), not just flags:

```bash
nmap -sV -sC -T4 --top-ports 1000 10.10.10.5    # service/version detection, default scripts
nmap -sU --top-ports 50 10.10.10.5              # UDP — often forgotten, often open
```

* **Firewalls & IDS/IPS**: Packet filtering vs stateful inspection vs application-layer inspection; how Snort/Suricata signatures detect attacks.
* **The lab**: Scan only your own VMs and lab networks — the ethics rule applies double to scanning.

---

## 6. Stage 5: Cryptography for Practitioners

You will not design cryptographic algorithms — and you must never invent your own. But you must understand how the working parts fit together, because misusing correct cryptography is one of the most common vulnerability classes.

* **Symmetric encryption** (AES): One shared key, fast, used for data at rest and bulk traffic.
* **Asymmetric encryption** (RSA, ECC): Public/private keypairs — used for key exchange and signatures, not bulk data.
* **TLS**: How the handshake actually works — certificate verification, cipher negotiation, forward secrecy. Inspect real handshakes in Wireshark.
* **Certificates & PKI**: The chain of trust, certificate authorities, and what certificate pinning protects against.
* **Key management**: Where keys live (hardware-backed keystores — see the Android roadmap's Keystore section), rotation, and why hardcoded keys in source code are an automatic finding.
* **The iron rule**: If a task involves designing new cryptography, the correct answer is "use a standard, well-vetted library and protocol." Crypto failures come from DIY schemes, not from AES.

---

## 7. Stage 6: Offensive Security & CTFs

### 7.1 The Lab Platforms

| Platform | Cost | Best For |
| :--- | :--- | :--- |
| **[TryHackMe](https://tryhackme.com/)** | Free tier + subscription | Guided learning paths — the best structured entry |
| **[HackTheBox](https://www.hackthebox.com/)** | Free tier + subscription | Harder, realistic machines; ranked progression |
| **[PortSwigger Academy](https://portswigger.net/web-security)** | Free | Web application security, end to end |
| **[picoCTF](https://picoctf.org/)** | Free | Beginner CTFs from Carnegie Mellon |
| **[OverTheWire](https://overthewire.org/wargames/)** | Free | Command-line and Linux security wargames |

### 7.2 The Offensive Methodology

Every machine, every CTF, every professional assessment follows the same loop:

1. **Reconnaissance**: What is running? (Port scans, service versions, technologies, OSINT.)
2. **Enumeration**: Go deep on each service — versions, configurations, default credentials, exposed endpoints.
3. **Vulnerability analysis**: What known weaknesses exist? (Version comparison against CVE databases, misconfigurations, logic flaws.)
4. **Exploitation**: Demonstrate the weakness on the authorized target.
5. **Post-exploitation & privilege escalation**: What access leads to what? (SUID binaries, misconfigured services, credential reuse.)
6. **Documentation**: What you found, how, the impact, and the remediation — **the report is the deliverable**. In professional pentesting, the report is 50% of the job.

### 7.3 The Toolchain

* **Kali Linux** (or Parrot): The penetration-testing distribution — hundreds of preinstalled tools. Run it as a VM in your lab.
* **Burp Suite Community/Professional**: The web proxy and testing workbench — intercept, modify, and replay HTTP traffic.
* **Nmap, ffuf, Nikto**: Scanning and content discovery.
* **Metasploit Framework**: Exploit development and execution framework — learn the concepts, use it in labs.
* **Searchsploit & CVE databases**: Matching discovered versions to public exploits.

{% <alert_warning> %}
**Tools do not make you a security engineer.** Running `nmap` and Metasploit without understanding protocols is the "script kiddie" trap. Every tool use should come with the question: *what is this actually doing on the wire, and why does it work?*
{% </alert_warning> %}

---

## 8. Stage 7: Defensive Security & The Blue Team

* **The SOC (Security Operations Center)**: Where analysts watch telemetry, triage alerts, and respond to incidents in real time. Tier 1 analyst is the most common entry-level security job in the industry.
* **Log analysis**: Reading authentication logs, web server logs, and endpoint telemetry to reconstruct what happened. The [SysAdmin roadmap's](@/roadmaps/sysadmin.md) auditd and journal coverage is your foundation.
* **Incident response lifecycle**: Preparation → Detection & analysis → Containment → Eradication → Recovery → **Lessons learned**. Practice writing timelines from synthetic log data.
* **SIEM tools**: Splunk, Elastic Security, or Wazuh — learn one on your lab (Wazuh is free and excellent).
* **Hardening ownership**: The hardening checklist from the [SysAdmin roadmap](@/roadmaps/sysadmin.md) (SSH, firewalls, patching, least privilege) is the defensive baseline every blue team enforces.

---

## 9. Stage 8: Career Paths, Certifications & Realistic Expectations

### 9.1 The Common Paths

| Path | What You Do | Entry Point |
| :--- | :--- | :--- |
| **SOC Analyst (Blue Team)** | Monitor, triage, and respond to alerts | Tier 1 roles — most common entry job |
| **Application Security Engineer** | Secure code, review PRs, run SAST/DAST | Often transitions from development |
| **Penetration Tester (Red Team)** | Authorized offensive assessments | After strong lab + CTF portfolio |
| **Security Engineer (Infrastructure)** | Harden and design secure systems | Pairs with DevOps skills |
| **GRC / Compliance** | Audits, policy, risk management | Non-technical adjacent path |

### 9.2 The Certification Ladder (In Sensible Order)

1. **CompTIA Security+** (SY0-701) — the standard HR-filter certification; covers breadth.
2. **eJPT** (INE) — hands-on junior pentester certification, fully practical.
3. **TryHackMe/HackTheBox paths and badges** — continuous documented practice.
4. **OSCP** (Offensive Security) — the respected hands-on penetration testing certification; demanding, and a genuine career milestone.
5. **CISSP** — later-career, requires experience; the management-track standard.

### 9.3 Realistic Expectations

* **Your portfolio is labs + writeups + projects**, not certificates alone. A GitHub repository of documented CTF writeups and a home-lab build guide is what differentiates candidates.
* **Security is a second-layer skill**: the best security engineers understand development or systems administration first. Pair this roadmap with the [Web Development](@/roadmaps/web-development.md) or [System Administration](@/roadmaps/sysadmin.md) roadmap.
* **Keep ethics absolute** — one unauthorized incident ends security careers permanently.

---

## 10. Ten Progressive Milestone Projects

Security skills are proven through **documented practice** — every milestone here produces a writeup or artifact for your portfolio:

{% <mermaid> %}
graph TD
    M1["Milestone 1: Home Lab Build<br/>Kali + vulnerable VMs + snapshots"] --> M2["Milestone 2: OWASP Top 10 Lab Run<br/>DVWA / WebGoat, documented findings"]
    M2 --> M3["Milestone 3: PortSwigger Foundation<br/>Core Academy paths completed"]
    M3 --> M4["Milestone 4: Network Reconnaissance Report<br/>Nmap, Wireshark, enumeration"]
    M4 --> M5["Milestone 5: First Machine Compromise<br/>TryHackMe box + full writeup"]
    M5 --> M6["Milestone 6: Web App Pentest Report<br/>Burp Suite, professional format"]
    M6 --> M7["Milestone 7: Log Investigation & IR<br/>Reconstruct an incident from logs"]
    M7 --> M8["Milestone 8: Crypto Implementation Review<br/>Audit a small app's crypto usage"]
    M8 --> M9["Milestone 9: CTF Competition<br/>Team event + public writeup"]
    M9 --> M10["Milestone 10 (Capstone): Full Penetration Test Report<br/>Multi-service assessment, professional deliverable"]
{% </mermaid> %}

### Milestone 1: Build Your Home Lab
* **Objective**: Create a safe, snapshotted lab environment for everything that follows.
* **Core Tasks**: Set up VirtualBox/VMware with a Kali attacker VM and at least two deliberately vulnerable targets (Metasploitable 2, DVWA via Docker); configure host-only networking; practice snapshot and restore workflows.
* **Demonstrates**: Lab discipline, isolation, and operational hygiene.

### Milestone 2: Run the OWASP Top 10 Against a Vulnerable App
* **Objective**: Exploit every category of the OWASP Top 10 on DVWA or OWASP WebGoat — with the difficulty set high.
* **Core Tasks**: SQL injection to extract credentials, stored XSS payloads, broken access control demonstrations, command injection, and file upload bypasses — each documented with the *why*, not just the payload.
* **Demonstrates**: The complete web vulnerability taxonomy, hands-on.

### Milestone 3: PortSwigger Academy Foundation
* **Objective**: Complete the core Academy paths (SQL injection, access control, authentication, SSRF).
* **Core Tasks**: Solve every lab in the selected paths, maintain a notes repository with your methodology per vulnerability class.
* **Demonstrates**: Structured web security learning with verifiable progress.

### Milestone 4: Network Reconnaissance Report
* **Objective**: Perform a full reconnaissance and enumeration pass across your lab network.
* **Core Tasks**: Nmap discovery and service sweeps, Wireshark capture analysis of common protocols, OS fingerprinting, and a professional-style findings document.
* **Demonstrates**: Network-level methodology and evidence-based reporting.

### Milestone 5: First Machine Compromise with Writeup
* **Objective**: Fully compromise a beginner TryHackMe or HackTheBox machine and publish a complete writeup.
* **Core Tasks**: Recon → enumeration → initial access → privilege escalation → flags — documented step by step with reasoning at each decision point.
* **Demonstrates**: The offensive loop, end to end, plus technical writing.

### Milestone 6: Web Application Penetration Test Report
* **Objective**: Assess a deliberately vulnerable web application and produce a professional pentest report.
* **Core Tasks**: Scope definition, Burp Suite-driven testing, severity-rated findings (CVSS), remediation advice, and an executive summary — formatted like a real client deliverable.
* **Demonstrates**: The communication skill that separates professional pentesters from tool operators.

### Milestone 7: Log-Based Incident Investigation
* **Objective**: Reconstruct a simulated security incident purely from logs.
* **Core Tasks**: Generate a synthetic attack in your lab (brute force + webshell), then analyze SSH auth logs, web access logs, and auditd output to build a complete incident timeline with indicators of compromise.
* **Demonstrates**: Blue-team analysis and forensic thinking.

### Milestone 8: Cryptographic Implementation Review
* **Objective**: Audit the cryptography in a small application you build (or an open-source one).
* **Core Tasks**: Review password storage, TLS configuration, key management, and random number usage against current best practices; document every finding with the correct fix.
* **Demonstrates**: Applied cryptography judgment — the "misuse of correct crypto" eye.

### Milestone 9: CTF Competition Participation
* **Objective**: Compete in a real CTF event (picoCTF, a university CTF, or HackTheBox event) as a team.
* **Core Tasks**: Solve challenges across at least two categories (web, crypto, forensics, reverse engineering), and publish writeups for the challenges you solved.
* **Demonstrates**: Applied problem-solving under time pressure and community contribution.

### Milestone 10 (Capstone): Full Penetration Test Report
* **Objective**: Perform a complete, multi-service penetration test against a vulnerable VM range (e.g., a HackTheBox Pro Lab or a multi-VM lab you design) and deliver a professional assessment report.
* **Architecture**:
  * Full methodology: scoping, reconnaissance, enumeration, exploitation, post-exploitation, lateral movement.
  * Every finding severity-rated with CVSS, remediation guidance, and reproduction steps.
  * Executive summary written for non-technical readers.
  * Evidence appendix: screenshots, command outputs, and proof-of-concept artifacts.
  * A remediation roadmap prioritized by risk.
* **Portfolio Value**: The definitive security portfolio artifact — a professional-grade penetration test report proving you can find, exploit, document, and communicate vulnerabilities exactly as the industry requires.

---

## 11. Curated Official Resources

{{<pretty_link url="https://portswigger.net/web-security" title="PortSwigger Web Security Academy" description="The free, definitive web security curriculum with interactive labs for every vulnerability class." />}}

{{<pretty_link url="https://tryhackme.com/" title="TryHackMe" description="Guided, beginner-friendly security learning paths with browser-based attack machines." />}}

{{<pretty_link url="https://www.hackthebox.com/" title="HackTheBox" description="Realistic, harder machines and Pro Labs for progressing offensive skills." />}}

{{<pretty_link url="https://top10.owasp.org/2025/en" title="OWASP Top 10:2025" description="The current industry-standard list of the most critical web application security risks." />}}

{{<pretty_link url="https://owasp.org/www-project-web-security-testing-guide/" title="OWASP Web Security Testing Guide" description="The comprehensive manual for testing web applications — the professional methodology reference." />}}

{{<pretty_link url="https://picoctf.org/" title="picoCTF" description="Carnegie Mellon's free beginner CTF platform — the gentlest entry into capture-the-flag." />}}

{{<pretty_link url="https://overthewire.org/wargames/" title="OverTheWire Wargames" description="Free command-line and Linux security wargames, starting from absolute zero." />}}

{{<pretty_link url="https://cryptohack.org/" title="CryptoHack" description="Free cryptography challenges teaching modern crypto through playful, hands-on problems." />}}

---

## 12. Where to Next in the CC Ecosystem

Security is a second-layer discipline — it compounds with everything else the CC ecosystem teaches:

* **[System Administration Roadmap](@/roadmaps/sysadmin.md)** — the foundation this roadmap assumes: Linux depth, networking, hardening, and the monitoring your blue-team work builds on.
* **[Web Development Master Roadmap](@/roadmaps/web-development.md)** — the highest-leverage pairing: developers who understand security build unexploitable applications, and AppSec engineers who can code are rare and valuable.
* **[DevOps Roadmap](@/roadmaps/devops.md)** — DevSecOps: shifting security into pipelines with image scanning, secrets management, and infrastructure auditing.
* **[Blockchain Development Roadmap](@/roadmaps/blockchain.md)** — smart contract security auditing is one of the highest-paying security specializations, and its Stage 7 covers the exact exploit classes.
* **[Open Source Contribution Roadmap](@/roadmaps/open-source.md)** — contribute to security tooling (Slither, Wazuh, OWASP projects) and practice responsible disclosure on real projects.
