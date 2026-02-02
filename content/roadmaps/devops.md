+++
title = "DevOps Roadmap"
description = "A comprehensive guide to begin your journey for DevOps"
weight = 7

[extra]
difficulty = "Intermediate"
estimated_time = "6 months"
prerequisites = "Linux basics, Computer Networking"
badge = "NEW"

# Landing page carousel
carousel_image = "roadmaps/devops-cyber.webp"
carousel_title = "DevOps"
carousel_description = "Master DevOps practices, CI/CD, and cloud infrastructure"
+++

# DevOps Roadmap

Start your journey into DevOps by mastering the foundational tools: the Linux command line and Git version control. These are the daily drivers for every DevOps engineer.

## Phase 1: Linux & Git (1 week)

**Objective**: A lot of us grew up using windows or mac, but overall experience of deployments and devops is best experienced by Linux and its distributions as almost all of the servers run on Linux. So first step is to get comfortable with the terminal and Git. This makes the life easy as scripting becomes easy.

### 1.1 Linux Fundamentals (Day 1-3)

**Installation**:
- We don't recommend you to right away get rid of the Windows or Mac OS. Instead, you can basically set up a dual boot system, for this you would definitely require a USB drive of 8GB or more and you can then choose one of the following Linux distributions: **Ubuntu, Linux Mint, Fedora, Debian, Arch Linux** to start with. **Ubuntu** is the most recommended one for beginners. Follow these articles for installation : 

[Windows](https://linuxblog.io/dual-boot-linux-windows-install-guide/) | [Mac](https://medium.com/@vvsvish/how-to-dual-boot-mac-and-linux-45055ae6b942) | [Guide to Linux Distributions](https://ledutokens.medium.com/get-started-with-linux-a-beginners-guide-9ba69b8be53c) 

- Understand the Linux Terminal and shell commands and try to get comfortable with it. Make a few folder, touch a few files, play around with file permissions and also try to understand the file system of Linux. Read and understand few network commands and even if you don't understand in depth few terms its okay for now. 

[Linux Terminal](https://www.freecodecamp.org/news/shell-scripting-crash-course-how-to-write-bash-scripts-in-linux/) | [Linux Video Tutorial](https://www.youtube.com/watch?v=v392lEyM29A&pp=ygUebGludXggY291cnNlIHByaW1lYWdlbiBib290ZGV20gcJCZEKAYcqIYzv) 

### 1.2 Git & Github (Day 4-5)

**First thing, git != github**:
- **Basic Overview**: Git is a version control system, and Github is a platform for hosting Git repositories. Git is a tool that helps you keep track of changes in your code, while Github is a website that allows you to store and share your code with others. Similar websites include Gitlab, Bitbucket, etc. 

- **Install git**: [Official Git Website](https://git-scm.com/downloads)

- **Understand what's under the hood and essential git commands**: [Git Tutorial (in-depth video)](https://www.youtube.com/watch?v=rH3zE7VlIMs) | [Git Command Cheatsheet for fast learners and impatient nerds](https://git-scm.com/cheat-sheet)

- Do checkout this cool website for [Your Mess](https://ohshitgit.com/)

- We highly recommend you to check out the [Github Education Pack](https://education.github.com/) which gives you access to a bunch of cool tools and paid services for free, this includes free domain names, Github Copilot for free, JetBrain IDE, DigitalOcean and Microsoft Azure free credits for learning and much more so explore it and talking about AI wherever in the process you find yourself stuck, be it messed up git repo or finding it hard to setup dual boot or even something like issues in setting up SSH Key for git, AI is your friend, use it wisely be it gemini, claude or openai.

### 1.3 Github Actions (Day 6-7)

**What is Github Actions?**
- Github Actions is a tool that helps you automate your workflows. It is a CI/CD tool that helps you automate your workflows. This is like a maggi noodles, its all ready to use and you can use it right away in an instant, no hard configs or setup needed and you can build your project in minutes by writing a few lines of [YAML](https://www.redhat.com/en/topics/automation/what-is-yaml). Eventually you will learn to write your own custom pipelines. 

- [Github Actions Documentation](https://docs.github.com/en/actions) | [Github Actions Tutorial](https://www.youtube.com/watch?v=R8_veQiYBjI) 

- We have knowingly kept this Github Actions tutorial short and crisp as a deep dive involve more familiriaty with Devops and would recommend you to basically watch these and then learn by deploying a basic react app of your to github pages using github actions [Tutorial](https://www.youtube.com/watch?v=iebVPISad54)


## Phase 2: Understanding Networking Fundamentals 

**Knowing the networking is like knowing the plumbing of Internet**

- Infact, if you are a beginner, you can even skip this phase and come back to it later. But we highly recommend you to understand the basics of networking as it will help you in understanding the basics of DevOps. Networking will help you all along your development journey.

- If you wanna learn here are some articles to get you understanding these things on a high level:

[IP](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) | [DNS](https://www.cloudflare.com/learning/dns/what-is-dns/) | [HTTP](https://www.cloudflare.com/learning/http/what-is-http/) | [HTTPS](https://www.cloudflare.com/learning/ssl/what-is-https/) | [TCP/IP](https://www.cloudflare.com/learning/network-layer/what-is-tcp-ip/) | [SSH](https://www.cloudflare.com/learning/network-security/ssh/what-is-ssh/) | [UDP](https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/) | [CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) | [Firewall](https://www.cloudflare.com/learning/network-security/firewalls/what-is-a-firewall/)

- If you want an in-depth Computer Networking Course, you can check out these awesome lectures by **Professor Mayank Pandey (HoD,CSED, MNNIT Allahabad)** : [Lectures](https://www.youtube.com/playlist?list=PLE-JBws6HCXL25EhottYz9YHgE9_M2Tjg)

## Phase 3: Understanding Docker

**What is Docker?**

- Docker is a tool that makes deployment a lot less tiring and easy in industry. It is a containerization platform that allows you to package your application and its dependencies into a container, which can then be run on any machine that has Docker installed.

- It solves a big problem in development and deployment. What works on my machine may not work on your machine. So Docker solves this problem by providing a consistent environment for your application to run in.

- [Docker Documentation](https://docs.docker.com/get-started/) | [Docker Tutorial](https://www.youtube.com/watch?v=17Bl31rlnRM&pp=ygUdZG9ja2VyIHR1dG9yaWFsIGZvciBiZWdpbm5lcnM%3D) | [Docker CLI Cheatsheet](https://www.docker.com/blog/docker-cli-cheatsheet/)

- Once you have gone through these, try to dockerize the react app you had previously made, and if you are comfortable, try to write a small backend utility in Python FastAPI which can connect with the ReactApp and then try to run a containerzied version of your full stack application. 

- Now you are fully prepared to deploy a dockerized version of your application and you can do so by following [tutorial guide](https://www.youtube.com/watch?v=JsOoUrII3EY)

- You can next try to use your Github Education Pack to buy yourself a free domain and then try to replace the github.io domain with your own custom one

## Phase 4: Understanding Nginx

**What is Nginx?**

- Nginx is a web server that is used to serve static content and act as a reverse proxy for dynamic content. It is a high-performance web server that is used to serve static content and act as a reverse proxy for dynamic content. 

[More about Nginx on this link](https://kinsta.com/blog/what-is-nginx/) 

- You must also checkout what is a [VPS (Virtual Private Server)](https://www.youtube.com/watch?v=4zZiFTQoXRM&pp=ygUDVlBT)

- You can also look into [SSL](https://www.youtube.com/watch?v=0yw-z6f7Mb4&pp=ygUDU1NM0gcJCZEKAYcqIYzv)

- Now with all this knowledge in hand and access to Free cloud credits from Github Education Pack, you can try to deploy your full stack application on a VPS with your own custom domain name using Nginx as a reverse proxy and SSL certificate. This will be challenging and you should use LLMs for assistance all along, but this will serve as a great learning experience 

## Phase 5: Understanding Kubernetes

**What is Kubernetes?**

- Kubernetes is an open-source container orchestration system that automates the deployment, scaling, and management of containerized applications. It is a platform that allows you to run your applications in a way that is scalable, reliable, and easy to manage. Its like a helping dude who says, you make docker images, deploy, I will take care of scaling it and managing it for you.

[More about Kubernetes on this link](https://www.redhat.com/en/topics/containers/what-is-kubernetes) | [Kubernetes Tutorial for Beginners](https://www.youtube.com/watch?v=KVBON1lA9N8)

## Phase 6: Jenkins Is All You Need

- Github Action is cool, its smart and comes right out of the box, write a YAML file and boom there it goes, but it is not always the case. For a lot of corporations, the data, the scale and the environment of build is something which they wish to tighly control, this is where Jenkins comes in, it is a service which needs to be managed by setting up dedicated pods/servers and then using this organizations build entirely secure and custom business workflows and CI/CD Pipelines. This gives a webUI and lot of flexibility to manage your builds and deployments through a vast library of plugins and providing you freedom to write your own Jenkins Pluggins. 

- **Webhooks** : First you need to understand what are webhooks and you can do so by watching this [video](https://www.youtube.com/watch?v=oQaJn6RdA3g) 

- Once you understand webhooks, go to your github and try to setup a webhook which gets triggered when you push code to your repository. You can use [ngrok](https://ngrok.com/) to expose your local server to the internet and then use that to test your webhook. 

- Now you understand docker and using docker to run basic Jenkins config is a good approach, so we recommend following video to understand Jenkins and then configure a very basic pipeline with SCM Polling [Resource](https://www.youtube.com/watch?v=6YZvp2GwT0A)

## A Cloud Native Mindset

- Congratulations!! You made it till the end, we hope you learnt a lot in this process and understood all the fundamentals well, DevOps will help you take your projects to the production scale and prepare you to step into the world of cloud native development. Most organizations today run on cloud, they extend their services on cloud and deploy to cloud. Additionally its very important to understand that in the industry, project development goes hand-in-hand with CI/CD Driven Deployment and Testing. Hence we conclude this roadmap by providing you a peek into the Cloud Native Mindset and leaving some resources for understanding Testing

- [Cloud Native Mindset](https://www.youtube.com/watch?v=p-88GN1WVs8)

- [Testing](https://usersnap.com/blog/web-application-testing/)