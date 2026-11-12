+++
title = "DevOps Roadmap"
description = "A comprehensive, practical guide to mastering DevOps engineering: CI/CD pipelines, Docker containers, Kubernetes orchestration, infrastructure as code, observability, and cloud-native operations."
weight = 12

[extra]
difficulty = "Intermediate to Advanced"
estimated_time = "Ongoing Practice (4-6 months for core foundation)"
prerequisites = "Basic programming or Linux exposure; the System Administration roadmap's early stages are recommended"
badge = "DEVOPS"
toc_expand = true

# Landing page carousel
carousel_image = "roadmaps/devops-cyber.webp"
carousel_title = "DevOps"
carousel_description = "Master DevOps engineering: CI/CD pipelines with GitHub Actions, Docker, Kubernetes, Terraform infrastructure as code, and cloud-native operations."
+++

DevOps is the engineering discipline that turns code written on a laptop into reliable, observable software running for millions of users. It is part culture (developers and operations sharing ownership), part practice (CI/CD, infrastructure as code, monitoring), and part tooling (Docker, Kubernetes, Terraform, GitHub Actions).

This roadmap is designed by the **Computer Coding Club (CC), MNNIT Allahabad** to take you from "I can write code" to "I can ship, run, and operate that code like a production engineer." It deliberately builds on the [System Administration Roadmap](@/roadmaps/sysadmin.md) — DevOps automates and scales the operations concepts taught there.

---

## 1. Orientation: The DevOps Landscape & Culture

### 1.1 What DevOps Actually Is

DevOps is the practice of **treating infrastructure and delivery like software**: everything automated, everything versioned, everything observable. The name comes from merging *Dev* (who writes the features) and *Ops* (who runs them) — because hand-offs between those teams are where production outages are born.

{% <mermaid> %}
graph LR
    Plan["Plan<br/>(issues, sprints)"] --> Code["Code<br/>(Git)"]
    Code --> Build["Build<br/>(compile, lint, test)"]
    Build --> Test["Automated Tests"]
    Test --> Release["Release<br/>(version, artifact)"]
    Release --> Deploy["Deploy<br/>(containers, IaC)"]
    Deploy --> Operate["Operate<br/>(Kubernetes, cloud)"]
    Operate --> Monitor["Monitor<br/>(metrics, logs, alerts)"]
    Monitor -.->|"feedback loop"| Plan
{% </mermaid> %}

* **Continuous Integration (CI)**: Every push builds and tests the code automatically — broken code can never reach a teammate.
* **Continuous Delivery/Deployment (CD)**: Every good build produces a deployable artifact, deployed to production without manual ceremony.
* **Infrastructure as Code (IaC)**: Servers, networks, and databases described in versioned files instead of clicked into existence.
* **Observability**: Metrics, logs, and alerts so you learn about failures before your users do.

### 1.2 The Toolchain Map

Every DevOps tool you will encounter sits somewhere on this map. Learn the *stage first* — the tool is interchangeable:

| Stage | The Question | Common Tools |
| :--- | :--- | :--- |
| **Version Control** | Where does code live? | Git, GitHub, GitLab |
| **CI** | Does the code work? | GitHub Actions, GitLab CI, Jenkins |
| **Containers** | Does it run the same everywhere? | Docker, Podman, containerd |
| **Orchestration** | How does it run at scale? | Kubernetes, Docker Swarm, Nomad |
| **IaC** | How is infrastructure created? | Terraform, Pulumi, CloudFormation |
| **Configuration Mgmt** | How are servers configured? | Ansible (see [SysAdmin M8](@/roadmaps/sysadmin.md)) |
| **Observability** | Is it healthy? | Prometheus, Grafana, Loki, Sentry |
| **GitOps** | Who deploys what, from where? | ArgoCD, Flux |

### 1.3 DevOps vs. SRE vs. Platform Engineering

{% <alert_info> %}
**The Landscape**: **Site Reliability Engineering** (Google's flavor of operations) adds SLOs, error budgets, and blameless postmortems on top of DevOps practices. **Platform Engineering** builds internal developer platforms so product teams can self-serve deployments. All three share the same foundations this roadmap teaches. The [SysAdmin roadmap's orientation](@/roadmaps/sysadmin.md) maps how these disciplines relate.
{% </alert_info> %}

### 1.4 Where Are You Starting From?

{% <mermaid> %}
graph TD
    Start["Your Starting Point"] --> T1["Track A: Student / Beginner"]
    Start --> T2["Track B: Web or App Developer with apps to deploy"]
    Start --> T3["Track C: SysAdmin Roadmap Graduate"]
    Start --> T4["Track D: Backend / ML Developer"]

    T1 --> R1["Linux + Git basics first, then CI/CD, then containers"]
    T2 --> R2["Start at GitHub Actions — put your existing project in a pipeline"]
    T3 --> R3["Skip to Docker and Kubernetes — automation is your next layer"]
    T4 --> R4["Focus on Docker, CI/CD, and cloud deployment of your services"]

    R1 --> Core["Core Milestone: A live, pipeline-deployed application"]
    R2 --> Core
    R3 --> Core
    R4 --> Core
{% </mermaid> %}

* **Track A (Students/Beginners)**: Follow the stages in order. Stage 1 compresses the Linux and networking foundations — the [SysAdmin roadmap](@/roadmaps/sysadmin.md) is the deep-dive companion whenever a concept feels shaky.
* **Track B (Developers with existing projects)**: You already have the hard part (an application). Start at Stage 2 and pipeline it; everything else builds on that.
* **Track C (SysAdmin graduates)**: You know Linux, systemd, Nginx, and monitoring. Stage 3 onward is your content — automation and orchestration are the new layers.
* **Track D (Backend/ML developers)**: Your services are the payload. Focus on containers, CI/CD, and Kubernetes — the deployment story for APIs and models.

---

## 2. Stage 1: Foundations — Linux, Git & Networking

DevOps runs on Linux and Git. This stage is a *compressed* foundation: the deep versions live in the [System Administration Roadmap](@/roadmaps/sysadmin.md) (Linux internals, systemd, storage, SSH hardening, firewalls) — this stage gives you just enough to operate.

### 2.1 Linux Fundamentals

A lot of us grew up on Windows or macOS, but production infrastructure overwhelmingly runs Linux — so getting comfortable in a terminal is step one. You do not need to wipe your current OS: dual-boot (a 8GB+ USB drive and an Ubuntu/Fedora/Debian installer is all it takes), a virtual machine, or **WSL2 on Windows** all work. **Ubuntu** is the most recommended distribution for beginners.

* Terminal fluency: files, permissions, processes, packages (`apt`), and shell scripting — [shell scripting crash course](https://www.freecodecamp.org/news/shell-scripting-crash-course-how-to-write-bash-scripts-in-linux/).
* SSH key authentication and remote administration — [hardened setup in the SysAdmin roadmap](@/roadmaps/sysadmin.md).
* Where your code actually runs: processes, ports, services — [SysAdmin Stages 1–3](@/roadmaps/sysadmin.md).

### 2.2 Git & GitHub

First thing: **git ≠ GitHub**. Git is the version control system; GitHub is a platform hosting Git repositories (GitLab and Bitbucket are alternatives).

* [Install Git](https://git-scm.com/downloads) · [Official cheat sheet](https://git-scm.com/cheat-sheet) · [In-depth video tutorial](https://www.youtube.com/watch?v=rH3zE7VlIMs)
* When your repository inevitably becomes a mess: [ohshitgit.com](https://ohshitgit.com/) — the lifesaver.
* Branching, pull requests, and review etiquette: the [Open Source Contribution Roadmap](@/roadmaps/open-source.md) teaches the full collaboration workflow.

{% <alert_info> %}
**The GitHub Education Pack** ([education.github.com](https://education.github.com/)) gives students free access to tools this roadmap uses: free domains (Namecheap), GitHub Copilot, JetBrains IDEs, and cloud credits from DigitalOcean, Microsoft Azure, and others. Sign up early — you will use these credits in Stages 4 and 8.
{% </alert_info> %}

### 2.3 Networking Essentials

Knowing networking is knowing the plumbing of the internet. A high-level pass is enough here — packets, DNS, HTTP, SSH, firewalls:

[IP](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) | [DNS](https://www.cloudflare.com/learning/dns/what-is-dns/) | [HTTP](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) | [HTTPS](https://www.cloudflare.com/learning/ssl/what-is-https/) | [TCP/IP](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) | [SSH](https://www.cloudflare.com/learning/access-management/what-is-ssh/) | [UDP](https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/) | [CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) | [Firewall](https://www.cloudflare.com/learning/security/what-is-a-firewall/)

For a rigorous treatment, these lectures by **Professor Mayank Pandey (HoD, CSED, MNNIT Allahabad)** are outstanding: [Computer Networking Lectures](https://www.youtube.com/playlist?list=PLE-JBws6HCXL25EhottYz9YHgE9_M2Tjg). The full packet-level depth lives in [SysAdmin Stage 5](@/roadmaps/sysadmin.md).

---

## 3. Stage 2: CI/CD with GitHub Actions

CI/CD is the heartbeat of DevOps — and GitHub Actions is the lowest-friction way to learn it. This is like maggi noodles: ready to use in minutes, no infrastructure to set up, and you will build your first pipeline with a few lines of YAML. (Eventually you will outgrow it into the self-hosted world of Stage 6 — but start here.)

### 3.1 Your First Pipeline

Every workflow lives in `.github/workflows/` and defines *events* that trigger *jobs* made of *steps*:

```yaml
# .github/workflows/ci.yml — runs on every push and pull request
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint and type-check
        run: |
          npm run lint
          npx tsc --noEmit

      - name: Run tests
        run: npm test -- --run

      - name: Build production bundle
        run: npm run build
```

* **Triggers (`on:`)**: `push`, `pull_request`, `schedule` (cron), and `workflow_dispatch` (manual button).
* **Runners**: GitHub-hosted Ubuntu/Windows/macOS machines — or your own self-hosted runners for sensitive workloads.
* **Actions**: Reusable steps from the marketplace (`actions/checkout`, `actions/setup-node`) — the equivalent of npm packages for pipelines.
* **Secrets**: Store tokens and credentials in repository **Settings → Secrets** — they arrive in the pipeline as environment variables and are masked in logs. Never hardcode them in YAML.

### 3.2 From CI to CD

Extend the pipeline to *deploy*: on merge to `main`, build an artifact and ship it — GitHub Pages for a static site, a Docker image push for a containerized app (Stage 3), or an SSH deploy to a VPS (Stage 4). The [Web Development roadmap's deployment stage](@/roadmaps/web-development.md) shows a complete React deploy pipeline you can copy today.

**The learning exercise**: Take any project you own — a React app, a Python script, anything — and get a green pipeline running on every push. That green checkmark is your first DevOps artifact.

---

## 4. Stage 3: Docker & Containers

Docker solves the oldest excuse in software: *"it works on my machine."* A container packages your application with its entire runtime — dependencies, system libraries, configuration — into an image that runs identically on your laptop, a CI runner, and a production server.

### 4.1 Images, Layers & the Dockerfile

```dockerfile
# Dockerfile — a production-grade Node.js image
# 1. Build stage: compile the application
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Runtime stage: minimal image with only what's needed to run
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 8080
USER node
CMD ["node", "server.js"]
```

* **Images are layered**: each instruction is a cached layer — copying `package.json` *before* the source means dependency layers survive code changes (faster builds for free).
* **Multi-stage builds** keep runtime images small: the compiler and dev dependencies never enter the final image.
* **Run as a non-root user** (`USER node`) — container escape is a security concern, not paranoia.

```bash
docker build -t cc-pulse:latest .            # build the image
docker run -p 8080:8080 cc-pulse:latest      # run it locally
docker images / docker ps                    # inspect images and containers
docker logs -f <container>                   # stream logs
docker exec -it <container> sh               # shell into a running container
```

### 4.2 Docker Compose: Full-Stack, One File

Real applications are multiple services: a frontend, an API, a database, a cache. **Compose** orchestrates them locally from one declarative file:

```yaml
# compose.yaml — full-stack CC Pulse application
services:
  web:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - api
  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://pulse:pulse@db:5432/pulse
    depends_on:
      - db
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: pulse
      POSTGRES_PASSWORD: pulse
      POSTGRES_DB: pulse
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

`docker compose up` brings the whole stack up with one command — and the same file pattern is what Kubernetes will replace at scale (Stage 5).

### 4.3 Registries, Tags & Hygiene

* Push images to a registry (GitHub Container Registry `ghcr.io` is free for public repos) and tag them with versions *and* commit SHAs — `:latest` alone is how broken deploys happen.
* Scan images for vulnerabilities: `docker scout` or `trivy image`.
* A `.dockerignore` keeps builds small and secrets out of images.

**The exercise**: containerize your own full-stack application (the Web Development roadmap's milestones are perfect candidates) and push the images to `ghcr.io`.

---

## 5. Stage 4: Deploying to a VPS — Nginx, TLS & systemd

Before orchestration platforms, learn the classic path: a Virtual Private Server running your app behind **Nginx** as a reverse proxy, with **TLS** certificates and a **systemd** service keeping it alive. This is what the platforms automate — and doing it once by hand teaches you what every button actually does.

* Provision a VPS with your [GitHub Education Pack credits](https://education.github.com/pack), SSH in with your hardened key setup.
* Run your Docker image on the server; place Nginx in front as a reverse proxy ([full Nginx config pattern in the SysAdmin roadmap](@/roadmaps/sysadmin.md)).
* Automate certificates with **Certbot** (`certbot --nginx`) — never manual TLS.
* Register your application as a systemd service so it restarts on failure and on boot.
* Point your custom domain from the Education Pack at the server and verify the full chain: domain → DNS → TLS → Nginx → container.

{% <alert_warning> %}
**This stage is intentionally challenging.** Use LLMs for assistance all along — but make sure you understand every command you run. Getting a full-stack application live on your own VPS with your own domain and HTTPS is a rite of passage, and it makes Kubernetes intuitive later.
{% </alert_warning> %}

---

## 6. Stage 5: Kubernetes — Container Orchestration

Kubernetes (K8s) is the industry-standard container orchestrator: you declare *what* should be running, and it makes reality match the declaration — scheduling containers across machines, restarting failures, scaling on load, and rolling out updates without downtime. Think of it as a tireless operator: *you make Docker images and declare the desired state; Kubernetes handles scheduling, scaling, and healing.*

### 6.1 The Core Objects

{% <mermaid> %}
graph TD
    User["You declare desired state (YAML)"] --> API["Kubernetes API Server"]
    API --> Sched["Scheduler places Pods onto Nodes"]
    Sched --> D["Deployment<br/>(manages ReplicaSets → Pods)"]
    D --> P1["Pod 1 (your container)"]
    D --> P2["Pod 2 (your container)"]
    Svc["Service<br/>(stable virtual IP + load balancing)"] --> P1
    Svc --> P2
    Ing["Ingress<br/>(HTTP routing + TLS from the outside)"] --> Svc
{% </mermaid> %}

* **Pod**: The smallest unit — one or more containers sharing a network namespace. Pods are mortal; that is normal.
* **Deployment**: Declares how many Pod replicas should exist and manages rolling updates (new versions replace old ones gradually, automatically rolling back if health checks fail).
* **Service**: Pods come and go with changing IPs; a Service provides a stable virtual IP and load-balances across them.
* **Ingress**: HTTP routing from the outside world to Services — host- and path-based rules plus TLS termination.

### 6.2 A Minimal Deployment

```yaml
# deployment.yaml — the CC Pulse API, three replicas, rolling updates
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pulse-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pulse-api
  template:
    metadata:
      labels:
        app: pulse-api
    spec:
      containers:
        - name: api
          image: ghcr.io/cc-mnnit/pulse-api:1.4.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: pulse-api
spec:
  selector:
    app: pulse-api
  ports:
    - port: 80
      targetPort: 8080
```

```bash
minikube start                          # or: kind create cluster (local clusters)
kubectl apply -f deployment.yaml        # declare the desired state
kubectl get pods                        # watch Kubernetes make it real
kubectl rollout status deployment/pulse-api
kubectl rollout undo deployment/pulse-api  # instant rollback
```

* **Learn locally first**: `minikube` or `kind` give you a full cluster on your laptop — no cloud bill.
* **Helm**: Once applications grow beyond a few YAML files, Helm packages them as versioned, parameterized charts (the npm of Kubernetes).
* **The deepest concepts**: liveness/readiness probes (how K8s knows your app is healthy), resource requests/limits, ConfigMaps and Secrets, and horizontal pod autoscaling.

---

## 7. Stage 6: Jenkins & Enterprise CI

GitHub Actions is smart and comes out of the box — write YAML and it goes. But enterprises often need tighter control: the data, the scale, and the build environment itself live behind their firewall. That is where **Jenkins** — the veteran, plugin-powered, self-hosted automation server — comes in. A huge share of corporations still run their pipelines on it, which makes Jenkins fluently reading and writing a genuinely employable skill.

* **The setup pattern**: Run Jenkins itself in Docker (Stage 3 knowledge applies directly), with pipelines defined as versioned **Jenkinsfiles**:

```groovy
// Jenkinsfile — declarative pipeline
pipeline {
    agent any
    stages {
        stage('Build') {
            steps { sh 'npm ci && npm run build' }
        }
        stage('Test') {
            steps { sh 'npm test -- --run' }
        }
        stage('Docker Image') {
            steps { sh 'docker build -t cc-pulse:${BUILD_NUMBER} .' }
        }
    }
}
```

* **Webhooks first**: Understand what a webhook is — a push event from GitHub triggering your server. Practice locally by exposing your machine with [ngrok](https://ngrok.com/) and configuring a repository webhook.
* **Modern context**: For self-hosted CI, also evaluate **GitLab CI** (integrated with GitLab) and self-hosted **GitHub Actions runners** — Jenkins remains the enterprise incumbent, but the ecosystem has moved toward simpler YAML-native systems.
* **Exercise**: Configure a basic Jenkins pipeline with SCM polling, then upgrade it to webhook-triggered builds.

---

## 8. Stage 7: Infrastructure as Code with Terraform

Clicking through cloud consoles to create servers does not scale, cannot be reviewed, and cannot be reproduced after an outage. **Infrastructure as Code** fixes all three: infrastructure described in versioned files, applied by tooling.

**Terraform** is the industry-standard IaC tool, provider-based and cloud-agnostic:

```hcl
# main.tf — provision a DigitalOcean droplet for the CC Pulse API
terraform {
  required_providers {
    digitalocean = { source = "digitalocean/digitalocean" }
  }
}

variable "do_token" {
  type      = string
  sensitive = true
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "pulse_api" {
  name   = "pulse-api-prod-01"
  region = "blr1"
  size   = "s-2vcpu-4gb"
  image  = "ubuntu-24-04-x64"
}

output "server_ip" {
  value = digitalocean_droplet.pulse_api.ipv4_address
}
```

```bash
terraform init      # download providers
terraform plan      # preview every change before it happens
terraform apply     # create/update infrastructure
terraform destroy   # tear it all down (carefully)
```

* **`terraform plan` is the culture**: every infrastructure change is a reviewable diff, exactly like a pull request.
* **State**: Terraform tracks what it created in a state file — in production, keep it in remote storage (S3, Terraform Cloud) so teams share one truth.
* **Configuration management** (installing software *inside* machines) is Ansible's domain — see [SysAdmin Stage 10](@/roadmaps/sysadmin.md). IaC provisions the machines; Ansible configures them.

---

## 9. Stage 8: Observability — Metrics, Logs & Alerts

You cannot operate what you cannot see. Observability has three pillars:

* **Metrics**: Numeric time series (CPU, memory, request latency, error rates) — **Prometheus** scrapes and stores them; **Grafana** visualizes them as dashboards.
* **Logs**: Structured event streams — shipped to a central store (Loki, ELK) instead of scattered across machines.
* **Alerts**: **Alertmanager** rules that page a human when thresholds break ("disk usage above 85% for 10 minutes").

{% <mermaid> %}
graph LR
    App["Applications & Nodes<br/>(exporters expose /metrics)"] -->|"scrape"| Prom["Prometheus<br/>(time-series database)"]
    Prom --> Graf["Grafana Dashboards"]
    Prom --> Alert["Alertmanager"]
    Alert -->|"pages on-call"| Human["Engineer"]
    Logs["App Logs"] --> Loki["Loki / ELK"] --> Graf
{% </mermaid> %}

* **The SRE connection**: Define **SLOs** (service level objectives — e.g., "99.9% of requests under 300ms") and alert on *burn rate*, not every hiccup. The [SysAdmin roadmap's Milestone 9](@/roadmaps/sysadmin.md) is a complete hands-on Prometheus/Grafana deployment — do it.
* **In CI/CD**: Observability closes the loop from the pipeline diagram in Stage 1 — alerts trigger rollbacks, postmortems feed back into new tests.

---

## 10. Stage 9: Cloud Platforms & GitOps

### 10.1 The Cloud Providers

AWS, Microsoft Azure, and Google Cloud all offer free tiers and student credits (the [GitHub Education Pack](https://education.github.com/pack) includes Azure and DigitalOcean credits). Learn one deeply — the concepts transfer. The typical journey: managed containers (ECS / Cloud Run / AKS), managed databases (RDS / Cloud SQL), and object storage (S3) — all provisioned via Terraform from Stage 7, never clicked.

### 10.2 GitOps: Kubernetes Deployment Done Right

GitOps extends IaC to Kubernetes deployments: **Git is the single source of truth**, and an in-cluster controller continuously reconciles reality with the repository. If someone edits the cluster by hand, the controller reverts it; every deploy is a Git commit with an audit trail.

{% <mermaid> %}
graph LR
    Dev["Developer merges PR"] --> Git["Git Repository<br/>(declared desired state)"]
    Git --> Argo["ArgoCD<br/>(in-cluster GitOps controller)"]
    Argo -->|"detects drift / new version"| K8s["Kubernetes Cluster<br/>(reconciles to match Git)"]
    K8s --> Health["Health status reported back to Argo"]
    Health -->|"sync failed"| Alert["Alert the team"]
{% </mermaid> %}

* **ArgoCD** (or Flux) watches a repository containing your Kubernetes manifests (or Helm charts) and keeps the cluster in sync.
* **The complete flow**: CI builds and pushes an image → CI updates the image tag in the GitOps repo → ArgoCD rolls it out to the cluster. Humans review pull requests; machines do the deploying.
* This pipeline — CI + GitOps — is the architecture behind most modern platform engineering teams, and it is your capstone (Milestone 6).

---

## 11. Six Progressive Milestone Projects

Theory without pipelines is just blog-post knowledge. Work through these six milestones — each builds on the previous and leaves a deployable artifact:

{% <mermaid> %}
graph TD
    M1["Milestone 1: First CI Pipeline<br/>Focus: GitHub Actions, lint, test, build"] --> M2["Milestone 2: Containerized Full-Stack App<br/>Focus: Dockerfile, Compose, GHCR Registry"]
    M2 --> M3["Milestone 3: VPS Production Deployment<br/>Focus: Nginx, TLS, systemd, Domain"]
    M3 --> M4["Milestone 4: Kubernetes Migration<br/>Focus: kubectl, Deployments, Ingress, Helm"]
    M4 --> M5["Milestone 5: Terraform-Managed Cloud Infra<br/>Focus: IaC, Remote State, Multi-Environment"]
    M5 --> M6["Milestone 6 (Capstone): End-to-End GitOps Platform<br/>Focus: ArgoCD, Observability, Automated Rollbacks"]
{% </mermaid> %}

### Milestone 1: First CI Pipeline
* **Goal**: Any project you own gets a GitHub Actions pipeline that lints, type-checks, tests, and builds on every pull request.
* **Core Concepts**: Workflow triggers, runners, marketplace actions, secrets, branch protection rules that require a green pipeline.
* **Portfolio Value**: Demonstrates the automation mindset — quality gates enforced by machines, not memory.

### Milestone 2: Containerized Full-Stack Application
* **Goal**: Dockerize a full-stack application (frontend + API + PostgreSQL) and run the entire stack with one `docker compose up`.
* **Core Concepts**: Multi-stage Dockerfiles, Compose networking, volumes for database persistence, pushing images to GitHub Container Registry, image scanning.
* **Stretch Goals**: Non-root containers; image size reduction (compare before/after multi-stage).
* **Portfolio Value**: Proves container fluency — the universal packaging layer of modern infrastructure.

### Milestone 3: VPS Production Deployment
* **Goal**: Deploy the same application to a VPS with a custom domain, HTTPS, and zero-downtime restarts.
* **Core Concepts**: Nginx reverse proxy, Certbot TLS automation, systemd services, SSH deploy scripts or a simple GitHub Actions deploy job.
* **Stretch Goals**: A staging environment on a subdomain; automated rollback on failed health checks.
* **Portfolio Value**: Proves you understand the full request path — the machinery platforms hide.

### Milestone 4: Kubernetes Migration
* **Goal**: Move the containerized application from the VPS into a Kubernetes cluster (local `kind`/`minikube` first, then a managed cloud cluster).
* **Core Concepts**: Deployments, Services, Ingress with TLS, ConfigMaps/Secrets, liveness probes, resource limits, Helm chart packaging.
* **Stretch Goals**: Horizontal pod autoscaling under load; blue-green deploy with zero downtime.
* **Portfolio Value**: Demonstrates orchestration fluency at the industry's default scale layer.

### Milestone 5: Terraform-Managed Cloud Infrastructure
* **Goal**: Provision your cloud infrastructure (VPS or managed Kubernetes cluster, DNS records, firewall) entirely with Terraform.
* **Core Concepts**: Providers, variables, remote state, plan/apply workflows, multi-environment structure (dev/staging/prod).
* **Stretch Goals**: Terraform Cloud/remote state locking; a destroyed-and-rebuilt-from-zero exercise.
* **Portfolio Value**: Proves infrastructure reproducibility — the "cattle, not pets" discipline.

### Milestone 6 (Capstone): End-to-End GitOps Platform
* **Goal**: A complete GitOps delivery platform: pull request → CI → image push → GitOps repo update → ArgoCD rollout → monitored production.
* **Core Concepts**:
  * CI building, testing, and pushing signed images with commit-SHA tags.
  * ArgoCD reconciling a GitOps repository across dev and production environments.
  * Prometheus/Grafana monitoring with Alertmanager routing to your notification channel.
  * Automated rollbacks on failed health checks; a documented incident-response runbook.
* **Portfolio Value**: The definitive capstone proving end-to-end DevOps mastery — the exact platform architecture modern engineering teams run, built and operated by you.

---

## 12. Curated Official Resources

{{<pretty_link url="https://docs.docker.com/" title="Docker Official Documentation" description="The authoritative reference for images, Dockerfiles, Compose, and container runtime behavior." />}}

{{<pretty_link url="https://kubernetes.io/docs/home/" title="Kubernetes Official Documentation" description="The complete K8s reference: concepts, object specifications, kubectl, and production best practices." />}}

{{<pretty_link url="https://docs.github.com/en/actions" title="GitHub Actions Documentation" description="Official guides for workflows, runners, environments, and security hardening of pipelines." />}}

{{<pretty_link url="https://developer.hashicorp.com/terraform/docs" title="Terraform Documentation" description="HashiCorp's official IaC documentation: providers, state management, and modules." />}}

{{<pretty_link url="https://argo-cd.readthedocs.io/" title="ArgoCD Documentation" description="The declarative GitOps controller for Kubernetes — official guides and best practices." />}}

{{<pretty_link url="https://prometheus.io/docs/introduction/overview/" title="Prometheus Documentation" description="The metrics and alerting standard: exporters, PromQL, and Alertmanager configuration." />}}

{{<pretty_link url="https://www.jenkins.io/doc/" title="Jenkins Documentation" description="Official guides for declarative pipelines, plugin management, and self-hosted automation." />}}

---

## 13. Where to Next in the CC Ecosystem

DevOps is the automation layer over everything else the CC ecosystem teaches. Where you go next depends on your direction:

* **[System Administration Roadmap](@/roadmaps/sysadmin.md)** — the foundation beneath this roadmap: Linux internals, networking depth, storage, security hardening, and hands-on monitoring deployments.
* **[Web Development Roadmap](@/roadmaps/web-development.md)** — the applications your pipelines deploy: full-stack engineering from both sides.
* **[Blockchain Development Roadmap](@/roadmaps/blockchain.md)** — run validator and full-node infrastructure, and automate smart-contract deployment pipelines.
* **[Desktop Application Development Roadmap](@/roadmaps/desktop-development.md)** — package and distribute desktop clients for the platforms you operate.
* **[Open Source Contribution Roadmap](@/roadmaps/open-source.md)** — contribute to the tools themselves: Kubernetes, Terraform providers, GitHub Actions, and the CNCF ecosystem.
