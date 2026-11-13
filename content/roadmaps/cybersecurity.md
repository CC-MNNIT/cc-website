+++
title = "Cybersecurity Engineering Roadmap"
description = "The most comprehensive practical guide to mastering cybersecurity: security foundations, threat modeling, web application security, network defense, applied cryptography, offensive security and CTFs, malware analysis, cloud security, AI security, blue-team operations, and professional certifications."
weight = 14

[extra]
difficulty = "Beginner to Advanced"
estimated_time = "Ongoing Practice (6-9 months for core foundation)"
prerequisites = "Basic computer literacy; the System Administration roadmap's early stages are strongly recommended"
badge = "SECURITY"
toc_expand = true

# Landing page carousel
carousel_image = "roadmaps/cybersecurity-cyber.webp"
carousel_title = "Cybersecurity"
carousel_description = "Master threat modeling, web app security, network defense, cryptography, offensive labs, and security operations."
+++

Cybersecurity is the discipline of defending systems, networks, and applications against adversaries — and, to defend them well, understanding exactly how attackers break them. It is one of the few engineering fields where thinking like the attacker is a formal job requirement, where lab practice on deliberately vulnerable machines is the standard curriculum, and where a single unpatched misconfiguration can cost an organization everything.

For college students, cybersecurity offers a uniquely accessible entry: most of the world's best training — the PortSwigger Web Security Academy, TryHackMe, HackTheBox, picoCTF — is free or cheap, the labs are legal sandboxes built for experimentation, and the skills compound directly on top of the Linux and networking foundations taught in our [System Administration Roadmap](@/roadmaps/sysadmin.md).

This roadmap is the most comprehensive in the CC ecosystem, because security is not one skill — it is a layered discipline spanning systems, networks, cryptography, human psychology, law, and adversarial thinking. It is designed by the **Computer Coding Club (CC), MNNIT Allahabad** to take you from security fundamentals to hands-on offensive labs, defensive operations, malware analysis, cloud security, and a portfolio of documented findings — the exact artifacts security hiring managers look for.

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

When you analyze any attack — ransomware (destroys availability), data breach (destroys confidentiality), web defacement (destroys integrity) — you are really asking which leg of the triad it breaks. Extend it with the modern additions: **authenticity** (is this who claims to be?) and **non-repudiation** (can they deny doing it?).

### 1.3 The Modern Threat Landscape

Understanding what actually threatens organizations today shapes every lesson that follows:

* **Ransomware-as-a-Service**: Criminal enterprises sell ransomware kits and affiliate networks — modern ransomware exfiltrates data *before* encrypting it, then extorts twice (restore + silence).
* **Supply chain attacks**: Compromising one widely-used dependency compromises every downstream customer (SolarWinds 2020, Log4Shell 2021, the xz-utils backdoor attempt 2024). This is why Stage 13's dependency hygiene matters.
* **State-nation actors**: Espionage campaigns targeting research, infrastructure, and government — patient, well-funded, and persistent ("advanced persistent threats").
* **AI on both sides**: Attackers use LLMs to write flawless phishing at scale and to find vulnerabilities faster; defenders use them for triage, log analysis, and secure code review. Stage 14 covers the new attack surface AI applications themselves create (prompt injection is now the #1 entry in the OWASP Top 10 for LLM Applications).
* **The human layer**: Phishing remains the #1 initial access vector in real breaches — technology alone cannot defend against a well-crafted email to an untrained human.

### 1.4 The Security Domain Map

"Cybersecurity" is an umbrella over several genuinely different careers:

{% <mermaid> %}
graph TD
    Sec["Cybersecurity Engineering"] --> AppSec["Application Security (AppSec)<br/>Securing code, APIs, and web apps"]
    Sec --> NetSec["Network Security<br/>Firewalls, IDS/IPS, traffic analysis"]
    Sec --> OffSec["Offensive Security<br/>Penetration testing, red teams, CTFs"]
    Sec --> BlueTeam["Defensive Security / Blue Team<br/>SOC, incident response, forensics"]
    Sec --> Malware["Malware Analysis &amp; Reverse Engineering<br/>Dissecting binaries and campaigns"]
    Sec --> CloudSec["Cloud Security<br/>IAM, workloads, containers, misconfigurations"]
    Sec --> Crypto["Applied Cryptography<br/>TLS, key management, protocol design"]
    Sec --> GRC["Governance, Risk &amp; Compliance<br/>Audits, standards, policy"]
{% </mermaid> %}

* **Offensive** and **defensive** are two sides of the same skill — great defenders understand attacks, and great attackers understand defenses. This roadmap covers both.
* **AppSec** is the most developer-adjacent path — and the one that pairs best with our [Web Development roadmap](@/roadmaps/web-development.md).
* **Cloud security** is the fastest-growing specialization: misconfigured cloud IAM and storage buckets cause more real breaches than exotic exploits.

### 1.5 Where Are You Starting From?

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

### 2.1 Linux Fluency

Security professionals live in Linux — the majority of servers, security tools, and CTF machines are Linux-based:

* Processes, permissions, services, logs, and the command line — the [System Administration roadmap](@/roadmaps/sysadmin.md) is the prerequisite.
* Filesystem layout and where evidence lives: `/var/log`, `/proc`, `/etc` (Stage 11's forensics depends on knowing these).
* Package management, systemd services, and network configuration.

### 2.2 Windows Internals (The Enterprise Reality)

Most enterprise endpoints and Active Directory environments are Windows — blue teams and red teams both need Windows fluency:

* **Registry, services, and scheduled tasks**: Where persistence hides and where malware leaves traces.
* **Processes & authentication**: LSASS, Windows authentication flow, and why mimikatz-style credential dumping works (defensively: why Credential Guard matters).
* **NTFS permissions and the difference from POSIX** — a frequent source of misconfigurations.
* **Active Directory (AD)**: The directory service running ~90% of enterprise networks. Concepts: domains, domain controllers, Kerberos authentication, group policy. AD misconfigurations are the backbone of modern red team engagements (Stage 8 covers the attack patterns).

### 2.3 Scripting: Python & Bash

**Python** is the security lingua franca — automation, exploit prototyping, log parsing, and tooling. **Bash** for glue and system work. Build real tools early — each of these teaches a core skill:

```python
# 1. A minimal TCP port scanner — teaches sockets, iteration, service behavior
import socket

def scan(host, ports):
    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        if sock.connect_ex((host, port)) == 0:
            print(f"[open] {host}:{port}")
        sock.close()

scan("scanme.nmap.org", [21, 22, 25, 80, 443, 8080])
```

```python
# 2. A log parser — teaches regex, structured extraction, and analysis thinking
import re
from collections import Counter

with open("access.log") as f:
    failed = Counter()
    for line in f:
        # Extract IPs from failed authentication attempts
        match = re.search(r"Failed password.*from (\d+\.\d+\.\d+\.\d+)", line)
        if match:
            failed[match.group(1)] += 1

for ip, count in failed.most_common(10):
    print(f"{ip}: {count} failed attempts")
```

* **Exercise**: Extend the scanner with threading, banner grabbing, and service fingerprinting — then compare your results against `nmap` and study *why* nmap is more accurate.

### 2.4 Virtualization: Your Lab Foundation

Your entire practice environment is built on VMs — VirtualBox, VMware, or Proxmox:

* **Snapshots are your rollback button**: Break a lab machine, restore the snapshot in seconds.
* **Isolated host-only networks**: Your attacker machine and targets talk to each other without touching the real internet.
* **Recommended lab stack**: Kali Linux (attacker toolkit) + Metasploitable 2 / DVWA (vulnerable targets) + a Windows evaluation VM.

---

## 3. Stage 2: Core Security Concepts & Threat Modeling

### 3.1 Principles Every Control Derives From

* **Least privilege**: Every user, process, and service gets the minimum access it needs — nothing more. Most real-world breaches are a privilege escalation of some kind.
* **Defense in depth**: Never one control — layers. If the perimeter fails, the network segment holds; if that fails, the host holds; if that fails, the data is encrypted.
* **Fail securely**: When anything fails (an exception, a timeout), the system should default to *denying* access, not granting it.
* **Never trust user input**: The root of nearly every injection vulnerability. Everything from the network is hostile until validated.
* **Security through obscurity is not security**: A hidden endpoint is not a protected endpoint. Systems must be safe even when the attacker knows exactly how they work.
* **Complete mediation**: Every access to every resource must be checked — the second request to an "authorized" endpoint deserves the same check as the first.

### 3.2 Authentication vs. Authorization

* **Authentication (AuthN)**: Proving identity — passwords, MFA, biometrics, certificates.
* **Authorization (AuthZ)**: What that identity may do — roles, permissions, ownership checks.
* **The classic vulnerability class**: Broken access control is the **#1 category in the OWASP Top 10:2025** — APIs that authenticate correctly but never re-check authorization per resource. Learn it deeply; you will find it everywhere.

### 3.3 Encryption vs. Hashing (Do Not Confuse Them)

* **Encryption** is two-way: data can be decrypted with the key. Used for confidentiality in transit (TLS) and at rest.
* **Hashing** is one-way: passwords are *hashed* (with bcrypt/argon2, never MD5/SHA-1 alone), never encrypted — because the server should never be able to read them back.
* **Salting**: Unique random values per password, defeating precomputed rainbow tables.

### 3.4 Threat Modeling: STRIDE, Worked Example

Threat modeling is structured attacker-thinking applied to a *design*, before code exists. **STRIDE** is the standard taxonomy:

| Letter | Threat | Example |
| :--- | :--- | :--- |
| **S**poofing | Pretending to be someone/something else | Forged JWT, stolen session cookie |
| **T**ampering | Modifying data in transit or at rest | Price field edited in a client-side cart |
| **R**epudiation | Denying an action (no audit trail) | Deleting records with no log entry |
| **I**nformation disclosure | Data exposed to unauthorized parties | Verbose errors, public S3 buckets |
| **D**enial of service | Making the system unavailable | Resource-exhaustion via unbounded uploads |
| **E**levation of privilege | Gaining higher access than intended | SUID misconfig, IDOR to admin functions |

**Worked example** — threat-model a simple feature: *"Users upload profile pictures."*

1. **What can go wrong (STRIDE)?**
   * Spoofing: Upload on behalf of another user → session check needed.
   * Tampering: Filename/path manipulation → path traversal (`../../etc/passwd`).
   * Information disclosure: Files served without access checks → direct URL enumeration.
   * DoS: Unlimited upload size → disk exhaustion.
   * Elevation of privilege: Uploading a `.php`/`.exe` file that executes → content validation needed.
2. **What controls mitigate each?** Authenticated sessions, server-generated filenames, access-checked storage, size/type limits, non-executable storage buckets.
3. **What remains?** Residual risk is documented and accepted — threat modeling is a *process*, not a one-time checkbox.

### 3.5 Severity, CVEs & CVSS

The shared vocabulary of the industry:

* **CVE** (Common Vulnerabilities and Exposures): Every publicly known vulnerability gets an ID (`CVE-2021-44228` — the Log4Shell flaw).
* **CVSS** (Common Vulnerability Scoring System): Scores severity 0–10 across exploitability and impact dimensions (attack vector, privileges required, user interaction, confidentiality/integrity/availability impact). Learn to read the sub-scores, not just the number.
* **CWE** (Common Weakness Enumeration): The *class* of weakness (`CWE-79` XSS, `CWE-89` SQL injection) — how security reports and SAST tools classify findings.
* **MITRE ATT&CK**: The standard knowledge base of attacker tactics and techniques, organized by kill-chain phase (Initial Access → Execution → Persistence → Privilege Escalation → …). It is the shared language of every threat report and detection rule you will ever read.

---

## 4. Stage 3: Web Application Security

The web is the largest attack surface in existence — and **application security** is the highest-demand security specialization.

### 4.1 The OWASP Top 10:2025

The [OWASP Top 10](https://top10.owasp.org/2025/en) is the industry-standard list of the most critical web application security risks (the 2025 edition is the current release — Broken Access Control remains #1). Learn each category as a *pattern*, not a list to memorize. For each class below: understand the mechanism, exploit it in a lab, and internalize the defense.

### 4.2 Injection: SQL, Command & Beyond

* **The mechanism**: Untrusted input interpreted as code by an interpreter (SQL, shell, template engine).
* **The vulnerable pattern** (never write this):

```python
# VULNERABLE: string-concatenated query — ' OR 1=1 -- logs in as anyone
query = "SELECT * FROM users WHERE user = '" + username + "' AND pass = '" + password + "'"
```

* **The defense**: Parameterized queries — the driver separates code from data structurally:

```python
# SECURE: the driver ensures input is data, never executable query
cursor.execute("SELECT * FROM users WHERE user = ? AND pass = ?", (username, password))
```

* **Command injection**: `os.system("ping " + user_host)` allows `; rm -rf /` — use argument arrays (`subprocess.run(["ping", host])`) that never invoke a shell.
* **Lab it**: The PortSwigger SQL injection path, then DVWA — from error-based to blind and time-based injection.

### 4.3 Cross-Site Scripting (XSS)

* **The mechanism**: Attacker-controlled JavaScript executing in another user's browser — stealing sessions, keylogging, defacing.
* **The three flavors**: **Reflected** (payload in the request, echoed in response), **Stored** (payload persisted — the dangerous one), **DOM-based** (client-side sinks like `innerHTML`).
* **The defense**: Framework output-encoding by default (React escapes automatically), `DOMPurify` for the rare legitimate raw-HTML case, and a Content Security Policy as the second layer (see the [Web Development roadmap's security stage](@/roadmaps/web-development.md)).

### 4.4 Broken Access Control & IDOR

* **The mechanism**: The #1 OWASP category. The server authenticates who you are but never re-checks *what you may access*:

```
GET /api/invoices/1041   → your invoice
GET /api/invoices/1042   → someone else's invoice (IDOR — Insecure Direct Object Reference)
```

* **Why tools miss it**: Automated scanners cannot know which invoice belongs to whom — access control is *business logic*. This is why manual testing matters.
* **The defense**: Server-side authorization on **every request for every object** — derive ownership from the session, never from client-supplied IDs alone.

### 4.5 Server-Side Request Forgery (SSRF)

* **The mechanism**: Tricking a server into making requests to attacker-chosen destinations — in cloud environments, the internal metadata endpoint (`169.254.169.254` on AWS) leaks credentials that compromise the entire account.
* **The defense**: Allow-list outbound destinations, block link-local ranges, never let user input define a raw URL the server fetches.

### 4.6 Business Logic Flaws: The Class Tools Cannot Find

* **The mechanism**: Abusing the *intended* functionality in unintended sequences — applying a discount code twice, buying negative quantities, skipping payment steps by replaying requests out of order.
* **Why it matters**: No scanner detects these — they require understanding what the application is *supposed* to do. This is where human pentesters permanently outperform automation, and where developers' knowledge of business rules becomes a security skill.

### 4.7 Authentication & Session Management Failures

* **Weak login flows**: No rate limiting (credential stuffing with breached password lists), predictable reset tokens, username enumeration via differing error messages ("user not found" vs "wrong password").
* **Session management**: Session tokens that never expire, cookies missing `HttpOnly`/`Secure`/`SameSite`, session fixation (pre-auth sessions carried into post-auth), and logout that does not invalidate the session server-side.
* **JWT pitfalls** (Stage 5's crypto section applied): accepting `alg: none`, weak HMAC secrets, missing expiry/audience validation.
* **The modern bar**: phishing-resistant MFA (FIDO2 keys) — even the best password policy loses to a captured credential.

### 4.8 File Upload Vulnerabilities

* **The mechanism**: Upload endpoints that trust filenames, extensions, or content-type headers — enabling webshells, path traversal, or storage abuse.
* **The defense checklist**: Validate server-side (extension *and* content magic bytes), generate server-side filenames, strip metadata, store outside the web root (or in object storage), never execute the upload directory, and set `Content-Disposition: attachment`.
* **The lab**: PortSwigger's file upload path covers bypass-by-extension, polyglot files, and race conditions.

### 4.9 Insecure Deserialization

* **The mechanism**: Applications that deserialize untrusted data into executable objects — a crafted payload becomes code execution on deserialize (the classic Java/PHP gadget-chain attacks).
* **The defense**: Never deserialize untrusted data; prefer data formats without executable semantics (JSON), validate before use, and monitor deserialization libraries for CVEs.

### 4.10 Cross-Site Request Forgery (CSRF)

* **The mechanism**: An attacker's page makes the victim's browser silently submit a request to your site — the browser attaches cookies automatically, so the request arrives *authenticated*. Classic impact: changing the victim's email, transferring funds, adding admin users.
* **The defense**: `SameSite` cookies (the modern default), per-session CSRF tokens on state-changing forms, and rejecting cross-origin mutations. Note the division of labor: **CORS** controls what other origins can *read*; CSRF defenses control what they can *do*.
* **The lab**: PortSwigger's CSRF path — from token bypasses to SameSite downgrades.

### 4.11 The Lab: PortSwigger Web Security Academy

The [PortSwigger Web Security Academy](https://portswigger.net/web-security) is free, browser-based, and the single best web security curriculum in existence — written by the makers of Burp Suite:

* Each vulnerability class gets concept explanations, guided labs, and unsolved labs.
* Work through it in order: SQL injection → access control → XSS → CSRF → SSRF → authentication → web cache poisoning.
* **Document every solved lab** — these notes become your portfolio and your revision material.

---

## 5. Stage 4: Network Security & Traffic Analysis

* **Packet analysis**: **Wireshark** and `tcpdump` — read actual traffic, understand handshakes, spot plaintext credentials, detect anomalies. Capturing and analyzing your own lab traffic is the fastest way to make networking real.
* **Scanning methodology**: **Nmap** — host discovery, port scanning, service/version detection, and scripting engine. Learn *why* each scan type works, not just flags:

| Scan | Flag | How It Works |
| :--- | :--- | :--- |
| **SYN scan** | `-sS` | Half-open connections — fast, stealthier, needs raw sockets |
| **Connect scan** | `-sT` | Full TCP handshake — works without root |
| **Version detection** | `-sV` | Probes services to fingerprint versions |
| **UDP scan** | `-sU` | The forgotten half — DNS, SNMP, and other UDP services are often open |
| **Script scan** | `-sC` | NSE scripts: default enumeration, vulnerability detection |

```bash
nmap -sV -sC -T4 --top-ports 1000 10.10.10.5    # service/version detection, default scripts
nmap -sU --top-ports 50 10.10.10.5              # UDP — often forgotten, often open
nmap --script vuln 10.10.10.5                   # NSE vulnerability-class scripts
```

* **Firewalls & IDS/IPS**: Packet filtering vs stateful inspection vs application-layer inspection; how Snort/Suricata signatures detect attacks:

```text
# A Snort/Suricata-style signature — read it as: alert when inbound traffic
# matches this pattern (the Log4Shell JNDI lookup in web requests)
alert tcp $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (
    msg:"Log4Shell JNDI exploit attempt";
    content:"${jndi:"; nocase;
    sid:1000001; rev:1;
)
```

* **Zero Trust architecture**: The modern model — "never trust, always verify" — replacing implicit network-location trust with per-request authentication, micro-segmentation, and continuous verification. Know the concept; enterprises are actively migrating to it.
* **Wireless security**: WPA2 vs WPA3 (SAE), evil-twin access points, deauthentication (and why 802.11w/PMF mitigates it), and the legal reality: attacking networks you do not own is a crime even if "unsecured." Practice on your own router and dedicated lab adapters.
* **The lab**: Scan only your own VMs and lab networks — the ethics rule applies double to scanning.

---

## 6. Stage 5: Cryptography for Practitioners

You will not design cryptographic algorithms — and you must never invent your own. But you must understand how the working parts fit together, because misusing correct cryptography is one of the most common vulnerability classes.

* **Symmetric encryption** (AES): One shared key, fast, used for data at rest and bulk traffic.
* **Asymmetric encryption** (RSA, ECC): Public/private keypairs — used for key exchange and signatures, not bulk data.
* **TLS**: How the handshake actually works — certificate verification, cipher negotiation, forward secrecy. Inspect real handshakes in Wireshark; configure TLS correctly on your own servers (see [SysAdmin's Certbot stage](@/roadmaps/sysadmin.md)).
* **Certificates & PKI**: The chain of trust, certificate authorities, and what certificate pinning protects against.
* **How a TLS handshake actually works** (read this once, and certificate errors become legible forever):
  1. Client sends a `ClientHello` — supported TLS versions and cipher suites.
  2. Server replies with its **certificate chain** and chosen parameters.
  3. Client **verifies the chain** against trusted root CAs (this is where "certificate not trusted" errors come from) and checks the hostname matches.
  4. Both sides perform the key exchange (ECDHE) — producing the symmetric session keys without ever transmitting them.
  5. All further traffic is encrypted and MAC-authenticated.
* **Key management**: Where keys live (hardware-backed keystores — see the Android roadmap's Keystore section), rotation, and why hardcoded keys in source code are an automatic finding.

### 6.1 How Cryptography Fails in Practice

Real-world crypto failures are almost never broken algorithms — they are broken *usage*:

* **ECB mode**: Identical plaintext blocks produce identical ciphertext (the famous "ECB penguin" — an encrypted image still shows the penguin). Use authenticated modes (GCM).
* **Weak randomness**: Predictable "random" values make keys and nonces guessable — always use the OS CSPRNG (`crypto.getRandomValues`, `secrets` module).
* **Nonce reuse**: Reusing an AES-GCM nonce with the same key reveals the keystream — a catastrophic, subtle failure.
* **Missing authentication**: Encryption without a MAC is malleable — attackers can flip ciphertext bits undetected. Use authenticated encryption.
* **Deprecated algorithms**: MD5, SHA-1, DES, RC4 — knowing what is broken and what replaced it is table stakes.

### 6.2 Password Storage Done Right

* **The standard**: bcrypt, scrypt, or **argon2id** — deliberately slow, salted, memory-hard algorithms designed for passwords.
* **The parameters matter**: argon2id with low work factors is nearly as bad as MD5. Know what "configured correctly" means for your library.
* **Never**: plaintext, reversible encryption, MD5/SHA-256 alone (too fast — GPUs brute-force billions of guesses per second), or unsalted hashes.

### 6.3 JWT Pitfalls

JWTs (JSON Web Tokens) are everywhere in modern auth — and their misuse is a recurring vulnerability class:

* `alg: none` — accepting unsigned tokens because the library honored an attacker-set algorithm.
* Weak HMAC secrets — `jwt.decode` with a guessable secret is trivially forgeable.
* Missing expiration/audience validation.
* **The defense**: Pin the expected algorithm, validate every claim, keep secrets long and random, and prefer short-lived access tokens with refresh flows.

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
| **[CryptoHack](https://cryptohack.org/)** | Free | Modern cryptography through challenges |

### 7.2 The Offensive Methodology

Every machine, every CTF, every professional assessment follows the same loop:

1. **Reconnaissance**: What is running? (Port scans, service versions, technologies, OSINT.)
2. **Enumeration**: Go deep on each service — versions, configurations, default credentials, exposed endpoints. **Enumeration is 80% of the work** — the exploit is usually trivial after thorough enumeration.
3. **Vulnerability analysis**: What known weaknesses exist? (Version comparison against CVE databases, misconfigurations, logic flaws.)
4. **Exploitation**: Demonstrate the weakness on the authorized target.
5. **Post-exploitation & privilege escalation**: What access leads to what? (SUID binaries, misconfigured services, credential reuse.)
6. **Documentation**: What you found, how, the impact, and the remediation — **the report is the deliverable**. In professional pentesting, the report is 50% of the job.

### 7.3 Privilege Escalation: The Half That Tutorials Skip

Getting a shell is rarely the end — escalating to root/SYSTEM is where assessments are won:

* **Linux enumeration**: SUID binaries (`find / -perm -4000`), sudo permissions (`sudo -l`), cron jobs, writable service files, kernel versions (compare against public exploits). Tools: `linpeas`, `LSE`.
* **Windows enumeration**: Service misconfigurations (unquoted paths, writable service binaries), always-install-elevated policies, stored credentials, token privileges. Tools: `winPEAS`, PowerUp.
* **The discipline**: Document *every* escalation path found, even unused ones — professional reports list them all.
* **Practice**: TryHackMe's "Linux PrivEsc" and "Windows PrivEsc" rooms are the canonical introductions.

### 7.4 Active Directory: The Enterprise Attack Surface

~90% of enterprises run Active Directory, and AD attacks dominate modern red team engagements. Learn the concepts on dedicated labs (TryHackMe's Active Directory Basics and Attack paths):

* **Kerberos in one paragraph**: Users authenticate to a Key Distribution Center, receive Ticket-Granting Tickets, and exchange service tickets — each exchange is an attack surface (Kerberoasting extracts service-account hashes for offline cracking; pass-the-ticket reuses captured tickets).
* **Common misconfigurations**: Excessive group memberships, unconstrained delegation, passwords-in-description-fields, legacy protocols (NTLMv1, LDAP without signing).
* **The defender's view**: Tiered administration, LAPS for local admin passwords, and monitoring for anomalous ticket requests.

### 7.5 The Toolchain

* **Kali Linux** (or Parrot): The penetration-testing distribution — hundreds of preinstalled tools. Run it as a VM in your lab.
* **Burp Suite Community/Professional**: The web proxy and testing workbench — intercept, modify, and replay HTTP traffic.
* **Nmap, ffuf, Nikto**: Scanning and content discovery.
* **Metasploit Framework**: Exploit development and execution framework — learn the concepts, use it in labs.
* **Searchsploit & CVE databases**: Matching discovered versions to public exploits.

{% <alert_warning> %}
**Tools do not make you a security engineer.** Running `nmap` and Metasploit without understanding protocols is the "script kiddie" trap. Every tool use should come with the question: *what is this actually doing on the wire, and why does it work?*
{% </alert_warning> %}

---

### 7.6 A Complete Worked Example: Compromising a Lab Machine

The methodology from 7.2 applied end-to-end on a typical beginner TryHackMe-style machine (a Linux host running a web app and SSH) — this is what your writeups should read like:

**1. Reconnaissance** — `nmap -sV -sC 10.10.x.x` reveals: port 22 (OpenSSH 8.2), port 80 (nginx), port 8080 (Tomcat 9.0.31).

**2. Enumeration** — three services, three investigations:
* The website: `gobuster dir -u http://10.10.x.x -w /usr/share/wordlists/dirb/common.txt` reveals `/manager` — a Tomcat manager panel.
* The version matters: Tomcat 9.0.31 has known manager deployment weaknesses — searchsploit finds candidate exploits.
* SSH 8.2 has no easy attack — note it and move on. **Unused findings still go in the report.**

**3. Exploitation** — Default Tomcat credentials (`tomcat:s3cret` — from the vendor's own sample config, a classic misconfiguration) grant the manager panel. A reverse-shell WAR deployment gives a low-privilege shell as `tomcat`.

**4. Enumeration (again) — now from inside**: `sudo -l` reveals the tomcat user can run `/usr/bin/find` as root — a well-known GTFOBins escalation.

**5. Privilege escalation** — `sudo find . -exec /bin/sh \; -quit` — root shell.

**6. Documentation** — the writeup records every step with reasoning, the flags captured, *and the remediation*: change default credentials, remove manager access in production, and fix the sudo rule (find must not be granted as sudo).

The lesson: the exploit was trivial **because the enumeration was thorough**. Skills compound at the enumeration stage — that is where you should spend your practice hours.

### 7.7 The CTF Category Guide

CTF challenges fall into standard categories — each trains a different security muscle:

| Category | What You Solve | Start With |
| :--- | :--- | :--- |
| **Web** | Exploit web application flaws (injection, access control, SSRF) | PortSwigger Academy, then CTF web challenges |
| **Crypto** | Break weak encryption, misuse of algorithms, padding oracles | CryptoHack, then CTF crypto |
| **Forensics** | Extract evidence from files, memory dumps, packet captures | picoCTF forensics, NetworkMiner on pcaps |
| **Reverse Engineering** | Understand binaries without source (static/dynamic) | picoCTF RE challenges, Ghidra basics |
| **Pwn (Binary Exploitation)** | Memory corruption: buffer overflows, ROP | pwn.college — the gold-standard free course |
| **OSINT** | Find answers in public information | Track D challenges in open CTFs |

* **Start web and crypto** (highest transfer from this roadmap), then explore RE/pwn if systems programming excites you.
* **Writeups are the culture**: publishing your solutions (after the event ends) is how you learn and how you get noticed.

{% <collapse title="Command Cheat Sheet — The Daily-Use Toolkit"> %}

```bash
# ── Reconnaissance & scanning ──
nmap -sV -sC -T4 10.10.x.x                      # full service sweep
gobuster dir -u http://10.10.x.x -w common.txt  # web content discovery
ffuf -u http://10.10.x.x/FUZZ -w subdomains.txt # fast fuzzing
searchsploit "Tomcat 9.0"                       # local exploit database

# ── Web testing ──
# Burp Suite: intercept, Repeater to replay modified requests
sqlmap -u "http://10.10.x.x/item?id=1" --batch  # automated SQLi (labs only)

# ── Shells & post-access ──
sudo -l                                          # what can this user run as root?
find / -perm -4000 -type f 2>/dev/null           # SUID binaries
ls -la /etc/cron*                                # scheduled tasks
cat /proc/net/tcp                                # hidden listening sockets?

# ── Reporting ──
# Screenshot EVERYTHING: evidence turns findings into proof
```

{% </collapse> %}

---

### 7.8 Binary Exploitation: The Pwn Path

Binary exploitation — corrupting a program's memory to hijack its control flow — is the deepest technical CTF category and the foundation of memory-safety research:

* **The core bug**: A buffer overflow writing past an array onto adjacent stack data — including the saved return address. Redirecting that address redirects execution.
* **The modern protections you must understand first** (and why naive overflows fail):
  * **ASLR** — randomizes memory addresses per run.
  * **NX/DEP** — stack memory is non-executable.
  * **Stack canaries** — a poisoned value checked before return.
  * Bypassing all three together is the skill (ROP — reusing existing code fragments).
* **Start here**: [pwn.college](https://pwn.college/) — the free, structured Arizona State University course that takes you from zero to real exploitation.
* **Why memory safety matters**: This is exactly why modern languages (Rust, Go) emphasize memory-safe design — the entire class of vulnerabilities disappears at the language level.

---

## 8. Stage 7: Social Engineering & OSINT

{% <alert_warning> %}
**The ethics boundary is absolute here too**: OSINT techniques in this section apply to **your own footprint, lab environments, and authorized assessments only**. Reconnaissance against real people without consent is harassment, and in professional pentesting, even social-engineering engagements run under strict written scope.
{% </alert_warning> %}

* **Why this matters**: Phishing remains the #1 initial access vector in real breaches — the human layer is attacked more than any firewall. Defenders must understand the mechanics to build training and controls.
* **OSINT (Open-Source Intelligence)**: What is publicly discoverable about an organization — exposed subdomains (`amass`, `subfinder`), leaked credentials (breach databases), employee roles (LinkedIn), technology stack (Shodan, Wappalyzer), documents (metadata), and public code.
* **Shodan & internet-wide search**: Understanding how exposed devices are indexed — and why your lab should never face the public internet unauthenticated.
* **Phishing mechanics (defensive view)**: Pretexting, urgency framing, lookalike domains, and payload delivery — learned to build recognition training and email filtering rules, never to deploy.
* **Defensive countermeasures**: MFA everywhere (phishing-resistant: FIDO2 keys), user awareness training, email authentication (SPF/DKIM/DMARC), and report-button culture.

---

## 9. Stage 8: Cloud Security

The fastest-growing attack surface — organizations moved to cloud faster than they moved cloud security skills. Misconfigured cloud IAM and storage cause more real breaches than exotic exploits.

### 9.1 The Shared Responsibility Model

* **The #1 cloud security concept**: The provider secures the infrastructure *of* the cloud; **you** secure what you put *in* the cloud — IAM configuration, application code, data encryption, network exposure. Most cloud breaches are customer-side misconfigurations, not provider failures.

### 9.2 The Big Three Misconfiguration Classes

1. **IAM over-permission**: Overly permissive roles and policies (`*:*` policies, long-lived access keys). Fix: least privilege, role-based access, short-lived credentials, MFA on everything sensitive.
2. **Exposed storage**: Public S3 buckets leaking databases. Fix: block public access at the account level, audit continuously.
3. **Exposed management interfaces**: Metadata services reachable from workloads (the SSRF-to-credentials chain from Stage 3), unsecured dashboards and APIs.

### 9.3 Kubernetes Security (Where DevOps Meets Security)

* Container escape and pod security standards, RBAC misconfigurations, exposed dashboards, and image supply-chain risks.
* Tools: `kube-bench` (CIS benchmark), `kube-hunter`, and policy engines (OPA/Gatekeeper).
* The [DevOps roadmap's Kubernetes stage](@/roadmaps/devops.md) teaches the orchestration — this is the security lens over the same objects.

---

## 10. Stage 9: Malware Analysis & Reverse Engineering

The most specialized and intellectually deep branch — dissecting malicious software and unknown binaries.

### 10.1 The Analysis Workflow

* **Static analysis**: Examining the binary without executing it — strings, imports, headers, disassembly. Safe and first.
* **Dynamic analysis**: Executing in an isolated sandbox (snapshot first!) — observing network behavior, file changes, and registry modifications.
* **The golden rule**: Analysis happens in isolated VMs with no network access to anything real, snapshots taken before every run.

### 10.2 The Toolchain

* **Disassembly/decompilation**: **Ghidra** (free, from the NSA — start here), IDA Pro (industry standard).
* **Behavioral sandboxing**: Any.Run, Cuckoo Sandbox, or your own instrumented VM.
* **YARA**: Writing pattern rules to identify malware families — the defender's matching language.
* **Skills that transfer**: Assembly reading, C understanding (from the Desktop roadmap's toolchains), and OS internals from the SysAdmin roadmap.

### 10.3 Malware Categories & The Modern Threat

* Ransomware (encryption + extortion), infostealers (credential harvesting — the driver of most corporate breaches), remote access trojans (RATs), and loader/dropper chains.
* **The modern lesson**: Malware is now a service industry — understanding the ransomware affiliate model explains entire breach patterns.

---

## 11. Stage 10: Defensive Security & The Blue Team

* **The SOC (Security Operations Center)**: Where analysts watch telemetry, triage alerts, and respond to incidents in real time. Tier 1 analyst is the most common entry-level security job in the industry.
* **Log analysis**: Reading authentication logs, web server logs, and endpoint telemetry to reconstruct what happened. The [SysAdmin roadmap's](@/roadmaps/sysadmin.md) auditd and journal coverage is your foundation.

### 11.1 Building Your Detection Lab

* **Wazuh** (free, open source): A full SIEM/XDR — endpoint agents, log collection, rule-based detection, and alerting. Deploy it in your lab and point your lab machines' agents at it:

```text
Lab detection exercise:
1. Brute-force SSH against your own lab server (from a second VM).
2. Open Wazuh: watch the authentication failure rules fire in real time.
3. Correlate: source IP, target account, timestamps across log sources.
4. Write a detection note: what fired, why, what the response should be.
```

* This exercise — *cause an attack, watch the detection, write the response* — teaches blue-team work better than any lecture.

### 11.2 Incident Response: The Lifecycle

**Preparation → Detection & Analysis → Containment → Eradication → Recovery → Lessons Learned**

* **Worked example — a phishing incident**:
  1. *Detection*: User reports a suspicious email; mail gateway flags a lookalike domain.
  2. *Analysis*: Was it opened? Did any attachment execute? (Mail logs, endpoint telemetry.)
  3. *Containment*: Block the sender domain, quarantine the message cluster, isolate affected endpoints.
  4. *Eradication*: Remove persistence, reset exposed credentials.
  5. *Recovery*: Restore from known-good state, monitor for re-infection.
  6. *Lessons learned*: What allowed it? New detection rule, user-awareness update.
* **Blameless postmortems**: The SRE-influenced culture of documenting incidents without blaming individuals — because fear produces hidden incidents.

### 11.2 Threat Intelligence

* **What threat intel is**: Curated knowledge about adversaries — their infrastructure, malware, tactics (mapped to [MITRE ATT&CK](https://attack.mitre.org/)), and indicators (IPs, domains, hashes).
* **How teams consume it**: Feeds and reports feed detection rules (a new campaign's C2 domain becomes a firewall/SIEM indicator), enrich investigations (is this IP known-malicious?), and shape defenses against the techniques actually used in your sector.
* **Strategic vs tactical**: Strategic intel informs executives and architecture; tactical intel (indicators) powers detection. Both require the same core skill: reading adversary behavior and translating it into defensive action.

### 11.3 Detection Engineering: YARA & Detection-as-Code

Detection itself is becoming an engineering discipline — rules are versioned, tested, and shipped like code:

```yara
rule Suspicious_PowerShell_Download
{
    meta:
        author = "CC Security Club"
        description = "PowerShell downloading and executing remote content"
        severity = "high"

    strings:
        $download = "DownloadString" nocase
        $invoke = "IEX" or "Invoke-Expression" nocase
        $url = /https?:\/\//

    condition:
        uint16(0) == 0x5A4D and      // PE executable
        filesize < 500KB and
        all of them
}
```

* **The workflow**: Write the rule → test against known-good and known-bad corpora (false positives destroy analyst trust) → version it in Git → deploy to endpoints.
* **The same discipline applies to Suricata/Sniper rules, Sigma detections, and Wazuh rules — detection-as-code is a hiring differentiator for detection engineers.

### 11.3 Digital Forensics Basics

* **Artifacts of interest**: Authentication logs, browser history, shell history, prefetch (Windows), timeline correlation.
* **Order of volatility**: Capture memory before disk, disk before power-off — evidence decays in order of volatility.
* **Chain of custody**: Forensic work is evidence work — document every acquisition and transfer.
* **Memory forensics**: RAM captures reveal what disk analysis cannot — running malware without files, injected code, and decrypted credentials. **Volatility 3** is the standard framework:

```bash
vol -f lab-memory.raw windows.pslist          # running process list
vol -f lab-memory.raw windows.malfind        # injected code / hollowed processes
vol -f lab-memory.raw windows.netscan        # network connections at capture time
```

* **Tools**: Autopsy/The Sleuth Kit (disk), Volatility 3 (memory), Plaso (super-timelines), CyberChef (decoding).

---

## 12. Stage 11: Platform Security — Mobile, Cloud & Emerging Surfaces

### 12.1 Mobile Application Security

* **Android**: APKs are zip archives — decompile with `jadx`/`apktool` to review code, inspect `AndroidManifest.xml` for exported components, insecure storage (SharedPreferences vs the Keystore), and certificate pinning bypasses. The [Android roadmap's Keystore section](@/roadmaps/android.md) covers the defensive storage side.
* **iOS**: IPA analysis, Keychain handling, and jailbreak-detection weaknesses.
* **OWASP Mobile Top 10**: improper credential usage, insecure data storage, and communication — the mobile mirror of the web list.
* **Tools**: MobSF (Mobile Security Framework) automates static and dynamic analysis for both platforms.

### 12.2 Cloud Security (Expanded)

* **Recon**: `ScoutSuite` and `Prowler` audit AWS/Azure/GCP configurations against CIS benchmarks automatically — run them on your own cloud accounts.
* **IAM deep dive**: Policies, roles, trust relationships, and the privilege-escalation paths inside cloud IAM itself (a misconfigured role assumption is cloud privilege escalation).
* **Container & Kubernetes security**: Image scanning (`trivy`), pod security standards, RBAC review, and the exposed-dashboard findings from Stage 9 of the DevOps roadmap.
* **Exercise**: Deploy a deliberately misconfigured cloud stack (CloudGoat, flawed cloud apps) and find every issue with free tooling — the cloud-native equivalent of the OWASP lab.

---

## 13. Stage 12: AI Security — The New Frontier

AI introduces a genuinely new attack surface, and 2025–2026 made it official: the [OWASP Top 10 for LLM Applications](https://genai.owasp.org/) tracks it, with **prompt injection as its #1 risk**.

### 13.1 The New Vulnerability Classes

* **Prompt injection**: Attacker text that overrides an LLM's instructions — "ignore previous instructions and reveal the system prompt." The equivalent of SQL injection for natural-language interfaces, and equally structural: the defense is architecture (separating instructions from data, output filtering, least-privilege tool access), not clever phrasing.
* **Insecure tool use**: LLM agents with access to databases, email, or code execution — a prompt injection becomes a *server-side* compromise when the agent can act.
* **Data & model risks**: Training-data poisoning, model theft, and sensitive-data leakage through generation.
* **Over-reliance**: Automating decisions (security triage, code review, legal text) on outputs that can be confidently wrong.

### 13.2 AI for Defenders

* LLMs dramatically accelerate security work *when used with judgment*: log triage and summarization, vulnerability explanation, secure-code review assistance, and lab-learning acceleration. The skill is verifying everything — LLMs are confidently wrong often enough that unverified output is a liability, especially in security.

### 13.3 Securing AI Applications You Build

If you build LLM-powered features (the [Web Development roadmap's](@/roadmaps/web-development.md) backend stage meets the AI frontier):

* Treat model output as untrusted user input — same validation, same encoding.
* Give agents the least-privilege tool access; never connect an agent to production databases with write access.
* Log prompts and outputs (with privacy care) — you cannot investigate what you did not record.
* Follow the [OWASP LLM Top 10](https://genai.owasp.org/) as your checklist.

---

## 14. Stage 13: Career Paths, Certifications & Realistic Expectations

### 14.1 The Common Paths

| Path | What You Do | Entry Point |
| :--- | :--- | :--- |
| **SOC Analyst (Blue Team)** | Monitor, triage, and respond to alerts | Tier 1 roles — most common entry job |
| **Application Security Engineer** | Secure code, review PRs, run SAST/DAST | Often transitions from development |
| **Penetration Tester (Red Team)** | Authorized offensive assessments | After strong lab + CTF portfolio |
| **Security Engineer (Infrastructure)** | Harden and design secure systems | Pairs with DevOps skills |
| **Cloud Security Engineer** | Secure IAM, workloads, and container platforms | Pairs with cloud + DevOps skills |
| **Malware Analyst / DFIR** | Dissect malware, investigate incidents | RE fundamentals + forensics practice |
| **Detection Engineer** | Write and tune SIEM/YARA/Sigma detections | Detection-as-code skills (Stage 11) |
| **Threat Intelligence Analyst** | Track adversaries, campaigns, and indicators | Analytical writing + ATT&CK fluency |
| **GRC / Compliance** | Audits, policy, risk management | Non-technical adjacent path |

### 14.2 The Certification Ladder (In Sensible Order)

1. **CompTIA Security+** (SY0-701) — the standard HR-filter certification; covers breadth.
2. **eJPT** (INE) — hands-on junior pentester certification, fully practical.
3. **TryHackMe/HackTheBox paths and badges** — continuous documented practice.
4. **OSCP** (Offensive Security) — the respected hands-on penetration testing certification; demanding, and a genuine career milestone.
5. **CISSP** — later-career, requires experience; the management-track standard.

### 14.3 Realistic Expectations

* **Your portfolio is labs + writeups + projects**, not certificates alone. A GitHub repository of documented CTF writeups and a home-lab build guide is what differentiates candidates.
* **Security is a second-layer skill**: the best security engineers understand development or systems administration first. Pair this roadmap with the [Web Development](@/roadmaps/web-development.md) or [System Administration](@/roadmaps/sysadmin.md) roadmap.
* **Keep ethics absolute** — one unauthorized incident ends security careers permanently.

---

## 15. Ten Progressive Milestone Projects

Security skills are proven through **documented practice** — every milestone here produces a writeup or artifact for your portfolio:

{% <mermaid> %}
graph TD
    M1["Milestone 1: Home Lab Build<br/>Kali + vulnerable VMs + snapshots"] --> M2["Milestone 2: OWASP Top 10 Lab Run<br/>DVWA / WebGoat, documented findings"]
    M2 --> M3["Milestone 3: PortSwigger Foundation<br/>Core Academy paths completed"]
    M3 --> M4["Milestone 4: Network Reconnaissance Report<br/>Nmap, Wireshark, enumeration"]
    M4 --> M5["Milestone 5: First Machine Compromise<br/>TryHackMe box + full writeup"]
    M5 --> M6["Milestone 6: Web App Pentest Report<br/>Burp Suite, professional format"]
    M6 --> M7["Milestone 7: AD Lab &amp; Escalation<br/>Kerberos concepts, privesc paths"]
    M7 --> M8["Milestone 8: Log Investigation &amp; IR<br/>Wazuh lab, reconstruct an incident"]
    M8 --> M9["Milestone 9: Malware Triage &amp; CTF<br/>Static/dynamic analysis + CTF event"]
    M9 --> M10["Milestone 10 (Capstone): Full Penetration Test Report<br/>Multi-service assessment, professional deliverable"]
{% </mermaid> %}

### Milestone 1: Build Your Home Lab
* **Objective**: Create a safe, snapshotted lab environment for everything that follows.
* **Core Tasks**: Set up VirtualBox/VMware with a Kali attacker VM and at least two deliberately vulnerable targets (Metasploitable 2, DVWA via Docker); configure host-only networking; practice snapshot and restore workflows.

{% <mermaid> %}
graph LR
    subgraph HostOnly["Host-Only Lab Network (isolated)"]
        Kali["Kali Linux<br/>(attacker machine)"] -->|"scans &amp; exploits"| Target1["Metasploitable 2<br/>(Linux target)"]
        Kali --> Target2["DVWA Container<br/>(web target)"]
        Kali --> Target3["Windows Eval VM<br/>(AD target)"]
    end
    HostOnly -.->|"no route to internet"| Internet["Public Internet<br/>(isolated by design)"]
{% </mermaid> %}
* **Stretch Goals**: Add a Windows evaluation VM; script the lab build with Vagrant or Docker Compose.
* **Demonstrates**: Lab discipline, isolation, and operational hygiene.

### Milestone 2: Run the OWASP Top 10 Against a Vulnerable App
* **Objective**: Exploit every category of the OWASP Top 10 on DVWA or OWASP WebGoat — with the difficulty set high.
* **Core Tasks**: SQL injection to extract credentials, stored XSS payloads, broken access control demonstrations, command injection, and file upload bypasses — each documented with the *why*, not just the payload.
* **Stretch Goals**: Fix each vulnerability in a copy of the source, then verify your fix resists your own exploit.
* **Demonstrates**: The complete web vulnerability taxonomy, hands-on.

### Milestone 3: PortSwigger Academy Foundation
* **Objective**: Complete the core Academy paths (SQL injection, access control, authentication, SSRF).
* **Core Tasks**: Solve every lab in the selected paths, maintain a notes repository with your methodology per vulnerability class.
* **Stretch Goals**: Add an IDOR hunting exercise against a deliberately vulnerable API you build yourself.
* **Demonstrates**: Structured web security learning with verifiable progress.

### Milestone 4: Network Reconnaissance Report
* **Objective**: Perform a full reconnaissance and enumeration pass across your lab network.
* **Core Tasks**: Nmap discovery and service sweeps, Wireshark capture analysis of common protocols, OS fingerprinting, and a professional-style findings document.
* **Stretch Goals**: Write your own NSE script; compare nmap results against your hand-rolled Python scanner from Stage 1.
* **Demonstrates**: Network-level methodology and evidence-based reporting.

### Milestone 5: First Machine Compromise with Writeup
* **Objective**: Fully compromise a beginner TryHackMe or HackTheBox machine and publish a complete writeup.
* **Core Tasks**: Recon → enumeration → initial access → privilege escalation → flags — documented step by step with reasoning at each decision point.
* **Stretch Goals**: Two escalation paths on the same machine; a no-Metasploit constraint run.
* **Demonstrates**: The offensive loop, end to end, plus technical writing.

### Milestone 6: Web Application Penetration Test Report
* **Objective**: Assess a deliberately vulnerable web application and produce a professional pentest report.
* **Core Tasks**: Scope definition, Burp Suite-driven testing, severity-rated findings (CVSS), remediation advice, and an executive summary — formatted like a real client deliverable.
* **Stretch Goals**: Include a business-logic finding you discovered manually (the class scanners cannot find).
* **Demonstrates**: The communication skill that separates professional pentesters from tool operators.

### Milestone 7: Active Directory Lab & Escalation
* **Objective**: Build a small AD lab (one DC, two workstations) and practice the classic enterprise misconfigurations defensively.
* **Core Tasks**: Deploy Windows Server with AD DS, create users/groups/GPOs, then enumerate the domain from an attacker VM (Kerberos concepts, group membership mapping) and document the detection signals for each technique.
* **Stretch Goals**: Deploy Tiered administration and LAPS; verify the attack paths close.
* **Demonstrates**: Enterprise-directory security fluency — the enterprise red/blue differentiator.

### Milestone 8: Log-Based Incident Investigation
* **Objective**: Reconstruct a simulated security incident purely from logs, using your Wazuh SIEM.
* **Core Tasks**: Generate a synthetic attack in your lab (brute force + webshell), then analyze SSH auth logs, web access logs, and auditd output to build a complete incident timeline with indicators of compromise — plus the response actions you would take at each stage of the IR lifecycle.
* **Stretch Goals**: Write custom Wazuh rules for two detections you wish existed.
* **Demonstrates**: Blue-team analysis, forensic thinking, and detection engineering.

### Milestone 9: Malware Triage & CTF Competition
* **Objective**: Dissect a benign sample in your isolated lab, then compete in a real CTF event as a team.
* **Core Tasks**: Static analysis (strings, imports, Ghidra disassembly) and sandboxed dynamic analysis of a benign test binary; then participate in picoCTF or a university CTF, solving challenges across at least two categories, with published writeups.
* **Stretch Goals**: Write a YARA rule matching the analyzed sample's behavior.
* **Demonstrates**: Reverse-engineering fundamentals, applied competition skills, and community contribution.

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

## 16. Curated Official Resources

{{<pretty_link url="https://portswigger.net/web-security" title="PortSwigger Web Security Academy" description="The free, definitive web security curriculum with interactive labs for every vulnerability class." />}}

{{<pretty_link url="https://tryhackme.com/" title="TryHackMe" description="Guided, beginner-friendly security learning paths with browser-based attack machines." />}}

{{<pretty_link url="https://www.hackthebox.com/" title="HackTheBox" description="Realistic, harder machines and Pro Labs for progressing offensive skills." />}}

{{<pretty_link url="https://top10.owasp.org/2025/en" title="OWASP Top 10:2025" description="The current industry-standard list of the most critical web application security risks." />}}

{{<pretty_link url="https://owasp.org/www-project-web-security-testing-guide/" title="OWASP Web Security Testing Guide" description="The comprehensive manual for testing web applications — the professional methodology reference." />}}

{{<pretty_link url="https://owasp.org/www-project-top-10-for-large-language-model-applications/" title="OWASP Top 10 for LLM Applications" description="The standard risk list for AI-powered applications — prompt injection and beyond." />}}

{{<pretty_link url="https://picoctf.org/" title="picoCTF" description="Carnegie Mellon's free beginner CTF platform — the gentlest entry into capture-the-flag." />}}

{{<pretty_link url="https://overthewire.org/wargames/" title="OverTheWire Wargames" description="Free command-line and Linux security wargames, starting from absolute zero." />}}

{{<pretty_link url="https://cryptohack.org/" title="CryptoHack" description="Free cryptography challenges teaching modern crypto through playful, hands-on problems." />}}

{{<pretty_link url="https://attack.mitre.org/" title="MITRE ATT&CK Framework" description="The shared knowledge base of adversary tactics and techniques — the language of every threat report." />}}

{{<pretty_link url="https://ghidra-sre.org/" title="Ghidra (NSA)" description="The free, open-source software reverse-engineering suite for malware analysis." />}}

{{<pretty_link url="https://genai.owasp.org/" title="OWASP GenAI Security Project" description="The LLM Top 10 and guidance for securing AI-powered applications." />}}

{{<pretty_link url="https://github.com/sbilly/awesome-security" title="Awesome Security" description="A curated collection of security tools, resources, and reading — the field's index." />}}

---

## 17. Glossary: The Vocabulary of the Field

Security communication runs on shared vocabulary — this is the minimum working set:

{% <collapse title="Key Terms, A to Z"> %}

* **APT (Advanced Persistent Threat)** — a well-resourced, patient adversary group, typically state-backed.
* **Backdoor** — an undocumented access path bypassing normal authentication.
* **Brute force** — trying every possible credential combination; defeated by rate limiting and MFA.
* **C2 (Command & Control)** — the infrastructure malware uses to receive instructions from its operator.
* **CVE / CVSS / CWE** — the vulnerability's ID / severity score / weakness class (Stage 2.5).
* **Exploit** — code or a technique that triggers a vulnerability.
* **Hardening** — reducing attack surface by disabling or restricting everything not needed.
* **IOC (Indicator of Compromise)** — observable evidence of an attack (a malicious IP, hash, domain).
* **Lateral movement** — attackers pivoting from an initial foothold deeper into a network.
* **Least privilege** — the principle that access must be minimal (Stage 3.1).
* **MFA (Multi-Factor Authentication)** — requiring a second proof of identity; phishing-resistant when FIDO2.
* **Payload** — the part of an exploit that performs the actual action.
* **Red Team / Blue Team / Purple Team** — attackers / defenders / the combined exercise of both.
* **RCE (Remote Code Execution)** — running arbitrary code on a remote system; the most severe impact class.
* **SAST / DAST** — static (code-scanning) and dynamic (running-app-scanning) application security testing.
* **Threat model** — a structured analysis of what can go wrong and what controls mitigate it (Stage 3.4).
* **Zero-day** — a vulnerability unknown to the vendor; no patch exists yet.
{% </collapse> %}

---

## 18. Where to Next in the CC Ecosystem

Security is a second-layer discipline — it compounds with everything else the CC ecosystem teaches:

* **[System Administration Roadmap](@/roadmaps/sysadmin.md)** — the foundation this roadmap assumes: Linux depth, networking, hardening, and the monitoring your blue-team work builds on.
* **[Web Development Master Roadmap](@/roadmaps/web-development.md)** — the highest-leverage pairing: developers who understand security build unexploitable applications, and AppSec engineers who can code are rare and valuable.
* **[DevOps Roadmap](@/roadmaps/devops.md)** — DevSecOps: shifting security into pipelines with image scanning, secrets management, and infrastructure auditing.
* **[Blockchain Development Roadmap](@/roadmaps/blockchain.md)** — smart contract security auditing is one of the highest-paying security specializations, and its Stage 7 covers the exact exploit classes.
* **[Open Source Contribution Roadmap](@/roadmaps/open-source.md)** — contribute to security tooling (Slither, Wazuh, OWASP projects) and practice responsible disclosure on real projects.
