/**
 * Roadmaps Horizontal Scroll Animation
 * CC Club Landing Page
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoadmapsScroll);
    } else {
        initRoadmapsScroll();
    }

    function initRoadmapsScroll() {
        const track = document.getElementById('lp-roadmapsSliderTrack');
        const wrapper = document.querySelector('.lp-roadmaps-scroll-wrapper');

        if (!track || !wrapper) return; // Exit if elements don't exist

        let ticking = false;

        function updateScroll() {
            // Get current scroll position within the roadmaps section
            const wrapperTop = wrapper.offsetTop;
            const scrollY = window.pageYOffset;
            const relativeScroll = scrollY - wrapperTop;

            // Only apply transform when we're in the roadmaps section
            if (relativeScroll >= 0 && relativeScroll <= wrapper.scrollHeight - window.innerHeight) {
                // Calculate how far through the section we've scrolled (0 to 1)
                const scrollFraction = relativeScroll / (wrapper.scrollHeight - window.innerHeight);

                // Calculate how far the track should slide left
                const trackWidth = track.scrollWidth;
                const moveAmount = scrollFraction * (trackWidth - window.innerWidth + (window.innerWidth * 0.15));

                track.style.transform = `translateX(-${moveAmount}px)`;
            }

            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }

        // Listen to scroll events
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });

        // Initial update
        updateScroll();

        // Update on resize
        window.addEventListener('resize', updateScroll);
    }
})();