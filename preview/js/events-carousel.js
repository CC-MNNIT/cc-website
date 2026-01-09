/**
 * Events Carousel - Enhanced Animated Image Slider
 * CC Club Landing Page
 * Features: Smooth animations, progress bar, keyboard/mouse controls, autoplay
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEventsCarousel);
    } else {
        initEventsCarousel();
    }

    function initEventsCarousel() {
        const imageContainer = document.getElementById('eventsImageContainer');
        const textContent = document.getElementById('eventsTextContent');
        const nameEl = document.getElementById('eventName');
        const designationEl = document.getElementById('eventDesignation');
        const quoteEl = document.getElementById('eventQuote');
        const prevBtn = document.getElementById('eventPrevBtn');
        const nextBtn = document.getElementById('eventNextBtn');
        const currentEventNum = document.getElementById('currentEventNum');
        const totalEventNum = document.getElementById('totalEventNum');
        const progressFill = document.getElementById('eventsProgressFill');

        if (!imageContainer || !textContent) return;

        const eventsData = window.eventsCarouselData || [];

        if (eventsData.length === 0) return;

        let active = 0;
        let images = [];
        let autoplayTimeout;
        const autoplayDelay = 5000; // 5 seconds
        let isTransitioning = false;

        // Set total event count
        if (totalEventNum) totalEventNum.textContent = eventsData.length;

        function randomRotate() {
            return Math.floor(Math.random() * 21) - 10;
        }

        function createImages() {
            eventsData.forEach((event, index) => {
                const img = document.createElement('img');
                img.src = event.image;
                img.alt = event.name;
                img.className = 'event-image';
                img.draggable = false;
                img.loading = 'lazy';
                imageContainer.appendChild(img);
                images.push(img);
            });
        }

        function updateImages() {
            images.forEach((img, index) => {
                const isActive = index === active;
                const distance = Math.abs(index - active);
                const zIndex = isActive ? 40 : (eventsData.length + 2 - distance);
                
                if (isActive) {
                    img.style.opacity = '1';
                    img.style.scale = '1';
                    img.style.transform = 'translateZ(0) rotate(0deg) scaleX(1)';
                    img.style.filter = 'brightness(1) blur(0px)';
                } else {
                    const rotation = randomRotate();
                    const offset = (index - active) * 15;
                    const blur = Math.min(distance * 2, 5);
                    
                    img.style.opacity = Math.max(0.4, 1 - distance * 0.2);
                    img.style.scale = Math.max(0.85, 1 - distance * 0.05);
                    img.style.transform = `translateZ(-${distance * 100}px) translateX(${offset}px) rotate(${rotation}deg)`;
                    img.style.filter = `brightness(${0.7 + distance * 0.05}) blur(${blur}px)`;
                }
                
                img.style.zIndex = zIndex;
                img.style.transition = isTransitioning ? 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none';
            });
        }

        function updateProgressBar() {
            const progress = ((active + 1) / eventsData.length) * 100;
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        }

        function updateCounter() {
            if (currentEventNum) currentEventNum.textContent = active + 1;
        }

        function animateText(text) {
            const words = text.split(' ');
            quoteEl.innerHTML = '';

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + '\u00A0';
                span.style.animationDelay = `${0.04 * index}s`;
                quoteEl.appendChild(span);
            });
        }

        function updateContent() {
            textContent.style.animation = 'none';
            textContent.style.opacity = '0';
            textContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                nameEl.textContent = eventsData[active].name;
                designationEl.textContent = eventsData[active].type;
                animateText(eventsData[active].description);
                updateCounter();
                updateProgressBar();
                
                // Trigger animation
                textContent.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, 100);
        }

        function resetAutoplay() {
            clearTimeout(autoplayTimeout);
            autoplayTimeout = setTimeout(handleNext, autoplayDelay);
        }

        function handleNext() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            active = (active + 1) % eventsData.length;
            updateImages();
            updateContent();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
            
            resetAutoplay();
        }

        function handlePrev() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            active = (active - 1 + eventsData.length) % eventsData.length;
            updateImages();
            updateContent();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
            
            resetAutoplay();
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', handlePrev);
        if (nextBtn) nextBtn.addEventListener('click', handleNext);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            }
        });

        // Pause autoplay on hover
        const section = document.querySelector('.events-carousel-section');
        if (section) {
            section.addEventListener('mouseenter', () => {
                clearTimeout(autoplayTimeout);
            });
            
            section.addEventListener('mouseleave', () => {
                resetAutoplay();
            });
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        imageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        imageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    handleNext();
                } else {
                    handlePrev();
                }
            }
        }

        // Initialize
        createImages();
        updateImages();
        updateContent();

        // Start autoplay
        resetAutoplay();
    }
})();