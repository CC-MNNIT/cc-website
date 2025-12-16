+++
title = "Computer Coding Club"
description = "Learn, Build, and Grow Together - Official website of Computer Coding Club"
template = "landing.html"

[extra]
version = "2025"

# Hero Section - Main banner at the top
[extra.hero]
title = "Computer Coding Club"
badge = "🚀 Learn, Build, and Grow Together"
description = "Join a vibrant community of passionate coders, innovators, and tech enthusiasts. We organize workshops, hackathons, coding competitions, and contribute to open source projects that make a difference."
image = "/images/hero-background.jpg"
cta_buttons = [
    { text = "Join Us", url = "/about", style = "primary" },
    { text = "Explore Blog", url = "/blog", style = "secondary" },
]

# Features Section - Highlight what CC Club offers
[extra.features_section]
title = "What We Offer"
description = "Everything you need to grow as a developer and tech enthusiast"

[[extra.features_section.features]]
title = "Learning Sessions"
desc = "Regular workshops and tutorials on web development, data structures, machine learning, and cutting-edge technologies."
icon = "fa-solid fa-book"

[[extra.features_section.features]]
title = "Hands-on Projects"
desc = "Build real-world applications and contribute to open source projects that impact thousands of users."
icon = "fa-solid fa-code"

[[extra.features_section.features]]
title = "Hackathons & Contests"
desc = "Participate in exciting coding competitions, hackathons, and technical challenges with amazing prizes."
icon = "fa-solid fa-trophy"

[[extra.features_section.features]]
title = "Active Community"
desc = "Connect with like-minded peers, seniors, and alumni working at top tech companies worldwide."
icon = "fa-solid fa-users"

[[extra.features_section.features]]
title = "Career Growth"
desc = "Interview preparation, resume reviews, and mentorship from industry professionals at FAANG and startups."
icon = "fa-solid fa-rocket"

[[extra.features_section.features]]
title = "ContriHub Event"
desc = "Annual open source celebration where beginners learn to contribute in a supportive, non-competitive environment."
icon = "fa-solid fa-code-branch"

# Trust Section - Show our reach and impact
[extra.trust_section]
title = "By the Numbers"
logos = [
    { src = "/images/stats/members-200.svg", alt = "200+ Active Members" },
    { src = "/images/stats/events-50.svg", alt = "50+ Events Organized" },
    { src = "/images/stats/projects-15.svg", alt = "15+ Open Source Projects" },
]

# Showcase Section - Highlight different aspects
[extra.showcase_section]
title = "Experience CC Club"
subtitle = "Explore our community, events, and impact"

[[extra.showcase_section.tabs]]
name = "Community"
title = "Vibrant Tech Community"
description = "Join 200+ students passionate about technology. From beginners to advanced developers, everyone finds their place in our inclusive community."
image = "/images/showcase/community.jpg"

[[extra.showcase_section.tabs]]
name = "Events"
title = "Exciting Events Year-Round"
description = "Hackathons, workshops, guest lectures, and meetups. We organize 50+ events annually covering the latest in tech."
image = "/images/showcase/events.jpg"

[[extra.showcase_section.tabs]]
name = "ContriHub"
title = "ContriHub - Open Source Celebration"
description = "Our flagship event where students make meaningful contributions to open source in a beginner-friendly, supportive environment."
image = "/images/showcase/contrihub.jpg"

[[extra.showcase_section.tabs]]
name = "Learning"
title = "Structured Learning Paths"
description = "Follow curated roadmaps for web development, DSA, machine learning, and more. Learn at your own pace with community support."
image = "/images/showcase/learning.jpg"

# Social Proof Section - Testimonials from members and alumni
[extra.social_proof_section]
title = "What Our Members Say"

[[extra.social_proof_section.testimonials]]
author = "Priya Sharma"
role = "Software Engineer at Google | CC Club Alumni 2023"
quote = "CC Club transformed my coding journey. From struggling with basic syntax to contributing to major open source projects - the supportive community made all the difference."
avatar = "/images/testimonials/priya.jpg"

[[extra.social_proof_section.testimonials]]
author = "Rahul Verma"
role = "SDE at Amazon | CC Club President 2022"
quote = "Leading CC Club was the best decision of my college life. The skills I learned in organizing events and mentoring juniors helped me land my dream job."
avatar = "/images/testimonials/rahul.jpg"

[[extra.social_proof_section.testimonials]]
author = "Ananya Gupta"
role = "ML Engineer at Microsoft | ContriHub Participant 2024"
quote = "ContriHub gave me the confidence to contribute to open source. Now I'm a maintainer of two popular Python libraries!"
avatar = "/images/testimonials/ananya.jpg"

# Final CTA Section - Encourage action
[extra.final_cta_section]
title = "Ready to Level Up Your Skills?"
description = "Join Computer Coding Club today and become part of a community that will support your growth from day one. Whether you're a complete beginner or an experienced developer, there's a place for you here."
button = { text = "Get Started", url = "/about" }
image = "/images/cta-background.jpg"
+++

<!-- 
    LANDING PAGE - Goyo Theme
    
    This homepage uses Goyo's landing.html template with the following sections:
    
    1. Hero Section - Main banner with background image and CTA buttons
    2. Features Section - 6 key features in a grid layout
    3. Trust Section - Stats/numbers showing club impact
    4. Showcase Section - Tabbed content highlighting different aspects
    5. Social Proof Section - Testimonials from members and alumni
    6. Final CTA Section - Call-to-action before footer
    
    All sections are configured in the frontmatter above using [extra.*] sections.
    The Goyo theme automatically renders these with beautiful styling.
    
    CUSTOMIZATION:
    - Update testimonial avatars: Add images to static/images/testimonials/
    - Update showcase images: Add images to static/images/showcase/
    - Update stats logos: Create SVGs in static/images/stats/ or use text
    - Modify button links: Change URLs in cta_buttons array
    - Adjust content: Edit titles, descriptions, and quotes above
    
    No markdown content needed below - the template handles everything!
-->
