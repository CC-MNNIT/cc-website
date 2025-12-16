+++
title = "Current Team"
description = "Meet the passionate individuals leading Computer Coding Club"
template = "page.html"
weight = 2

[extra]
badge = "UPDATED"
use_team_data = true
+++

# Meet Our Team

The Computer Coding Club is led by a dedicated team of students passionate about technology, learning, and community building. Get to know the people who make CC Club what it is!

---

## 🎓 Faculty Advisors

Our faculty advisors provide invaluable guidance and support for all club activities.

<!-- Faculty advisor cards will be rendered here from data/team.yaml -->

---

## 🌟 Club Coordinators

Senior members who lead the club, organize major events, and mentor juniors.

<!-- Coordinator cards will be rendered here from data/team.yaml -->

---

## ⭐ Executive Members

Active members who support events, create content, provide mentorship, and help build our community.

<!-- Executive member cards will be rendered here from data/team.yaml -->

---

## Want to Join the Team?

We're always looking for passionate individuals to join our core team! Leadership positions are typically filled at the end of each academic year.

**Qualities we look for**:
- Active participation in club activities
- Initiative and leadership skills
- Technical skills and willingness to teach others
- Commitment to the club's mission and values
- Collaborative mindset

**How to get involved**:
1. Participate actively in events and workshops
2. Contribute to club projects
3. Help organize events
4. Mentor junior members
5. Express interest when applications open

---

## Past Leaders

Want to see who led the club before? Check out our [Alumni section](/alumni) to see where our past coordinators are now!

---

## Contact the Team

Have questions or suggestions? Reach out to us:

- **General Inquiries**: ccclub@college.edu
- **Event Related**: events@ccclub.edu
- **Discord**: [Join our server](https://discord.gg/ccclub)

---

<!--
    TEAM PAGE TEMPLATE
    
    This page should:
    - Display current team members with photos and roles
    - Show social links (LinkedIn, GitHub) on hover
    - Be updated annually or as team changes
    - Link to alumni page for past members
    
    IMPLEMENTATION NOTES:
    
    The actual team member cards should be generated from data/team.yaml
    using a custom template (templates/team.html or similar).
    
    Each card should display:
    - Photo
    - Name
    - Role (Senior Coordinator, Executive Member, etc.)
    - Year & Branch
    - Social links (visible on hover or always visible)
    - Optional: Brief bio or interests
    
    TEMPLATE STRUCTURE:
    
    {% for faculty in team_data.faculty %}
      <div class="team-card">
        <img src="{{ faculty.image }}" alt="{{ faculty.name }}">
        <h3>{{ faculty.name }}</h3>
        <p>{{ faculty.designation }}</p>
        <p>{{ faculty.email }}</p>
      </div>
    {% endfor %}
    
    Similar structure for coordinators and executives.
-->
