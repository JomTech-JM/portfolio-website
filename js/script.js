// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
            }
        });
    }

    // ===== ANIMATED SKILL BARS =====
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    function animateSkillBars() {
        const skillsSection = document.querySelector('.about-skills');
        if (!skillsSection || skillsAnimated) return;

        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                
                // Add animation class for extra effect
                bar.classList.add('animated');
            });
            skillsAnimated = true;
        }
    }

    // Initialize skill bars with 0 width
    if (skillBars.length > 0) {
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }

    // Animate skill bars on scroll
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on load in case section is already in view

    // ===== HIRE ME MODAL =====
    const hireMeTriggers = document.querySelectorAll('.hire-me-trigger');
    const hireMeModal = document.getElementById('hireMeModal');
    const modalIframe = hireMeModal ? hireMeModal.querySelector('iframe') : null;

    function openModal() {
        if (!hireMeModal) return;
        hireMeModal.classList.add('show');
        document.body.classList.add('nav-open');

        if (modalIframe && modalIframe.dataset.src && modalIframe.getAttribute('src') === 'about:blank') {
            modalIframe.setAttribute('src', modalIframe.dataset.src);
        }
    }

    function closeModal() {
        if (!hireMeModal) return;
        hireMeModal.classList.remove('show');
        document.body.classList.remove('nav-open');
    }

    if (hireMeTriggers.length > 0 && hireMeModal) {
        hireMeTriggers.forEach(trigger => {
            trigger.addEventListener('click', openModal);
        });

        hireMeModal.addEventListener('click', event => {
            if (event.target.dataset.modalClose !== undefined || event.target === hireMeModal.querySelector('.modal-backdrop')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && hireMeModal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    function handleHeaderScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ===== SERVICE CARDS ANIMATION =====
    function animateServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (cardPosition < screenPosition) {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('fade-in-up');
            }
        });
    }

    // ===== CV DOWNLOAD TRACKING =====
    function trackCVDownload() {
        const cvDownloadLink = document.querySelector('a[href*="Maseka_Jonathan_CV.pdf"]');
        if (cvDownloadLink) {
            cvDownloadLink.addEventListener('click', function() {
                // You can add analytics tracking here
                console.log('CV downloaded');
                // Example: gtag('event', 'download', {'event_category': 'CV'});
            });
        }
    }

    // ===== LAZY LOADING FOR IMAGES =====
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===== INITIALIZE ALL FUNCTIONS =====
    function init() {
        // Initial checks
        handleHeaderScroll();
        animateSkillBars();
        animateServiceCards();

        // Event listeners
        window.addEventListener('scroll', () => {
            handleHeaderScroll();
            animateSkillBars();
            animateServiceCards();
        });

        // Initialize other features
        trackCVDownload();
        lazyLoadImages();
    }

    // Start everything
    init();

    // ===== CONSOLE GREETING =====
    console.log(`
    🚀 Maseka Jonathan Portfolio Website
    📧 Contact: contact@masekajonathan.com
    💼 WordPress Developer & SEO Expert
    📝 Contact form ready for submissions
    `);
});

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}