// Language Toggle Functionality
class LanguageToggle {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Get language buttons
        this.enBtn = document.getElementById('lang-en');
        this.ptBtn = document.getElementById('lang-pt');
        
        // Get content containers
        this.enContent = document.getElementById('content-en');
        this.ptContent = document.getElementById('content-pt');
        
        // Get footer text elements
        this.footerTextEn = document.getElementById('footer-text-en');
        this.footerTextPt = document.getElementById('footer-text-pt');
        this.contactTitleEn = document.getElementById('contact-title-en');
        this.contactTitlePt = document.getElementById('contact-title-pt');
        this.rightsTextEn = document.getElementById('rights-text-en');
        this.rightsTextPt = document.getElementById('rights-text-pt');
        
        // Add event listeners
        this.enBtn.addEventListener('click', () => this.switchLanguage('en'));
        this.ptBtn.addEventListener('click', () => this.switchLanguage('pt'));
        
        // Check for saved language preference or browser language
        this.loadSavedLanguage();
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        
        // Update active button states
        this.updateButtonStates();
        
        // Toggle content visibility with smooth transition
        this.toggleContent();
        
        // Update page language attribute
        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
        
        // Save language preference
        localStorage.setItem('preferred-language', lang);
        
        // Update page title
        this.updatePageTitle();
    }

    updateButtonStates() {
        if (this.currentLang === 'en') {
            this.enBtn.classList.add('active');
            this.ptBtn.classList.remove('active');
        } else {
            this.ptBtn.classList.add('active');
            this.enBtn.classList.remove('active');
        }
    }

    toggleContent() {
        if (this.currentLang === 'en') {
            this.enContent.style.display = 'block';
            this.ptContent.style.display = 'none';
            this.footerTextEn.style.display = 'block';
            this.footerTextPt.style.display = 'none';
            this.contactTitleEn.style.display = 'block';
            this.contactTitlePt.style.display = 'none';
            this.rightsTextEn.style.display = 'inline';
            this.rightsTextPt.style.display = 'none';
        } else {
            this.enContent.style.display = 'none';
            this.ptContent.style.display = 'block';
            this.footerTextEn.style.display = 'none';
            this.footerTextPt.style.display = 'block';
            this.contactTitleEn.style.display = 'none';
            this.contactTitlePt.style.display = 'block';
            this.rightsTextEn.style.display = 'none';
            this.rightsTextPt.style.display = 'inline';
        }
        
        // Smooth scroll to top when switching languages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Determine initial language
        let initialLang = 'en'; // Default to English
        
        if (savedLang) {
            initialLang = savedLang;
        } else if (browserLang && browserLang.startsWith('pt')) {
            initialLang = 'pt';
        }
        
        // Switch to determined language
        this.switchLanguage(initialLang);
    }

    updatePageTitle() {
        const titles = {
            'en': 'QA Starter Kit by A Menina de QA',
            'pt': 'Kit Inicial de QA by A Menina de QA'
        };
        
        document.title = titles[this.currentLang];
    }
}

// Smooth scrolling for internal links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create intersection observer for fade-in animations
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Add fade-in class to animated elements
        this.addAnimationClasses();
        
        // Observe elements for animation
        this.observeElements();
    }

    addAnimationClasses() {
        const elementsToAnimate = [
            '.feature-item',
            '.step',
            '.audience-content',
            '.section-title'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('fade-in');
            });
        });
    }

    observeElements() {
        document.querySelectorAll('.fade-in').forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images when they come into view
        this.lazyLoadImages();
        
        // Optimize scroll events
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeScrollEvents() {
        let ticking = false;

        const updateScrollPosition = () => {
            // Add any scroll-based functionality here
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }
}

// Analytics and tracking (placeholder)
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        // Track language switches
        this.trackLanguageChanges();
        
        // Track CTA clicks
        this.trackCTAClicks();
        
        // Track social media clicks
        this.trackSocialClicks();
    }

    trackLanguageChanges() {
        document.getElementById('lang-en').addEventListener('click', () => {
            this.track('language_change', { language: 'en' });
        });

        document.getElementById('lang-pt').addEventListener('click', () => {
            this.track('language_change', { language: 'pt' });
        });
    }

    trackCTAClicks() {
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', () => {
                this.track('cta_click', { button_text: button.textContent.trim() });
            });
        });
    }

    trackSocialClicks() {
        document.querySelectorAll('.social-links a').forEach(link => {
            link.addEventListener('click', () => {
                const platform = this.getSocialPlatform(link.href);
                this.track('social_click', { platform });
            });
        });
    }

    getSocialPlatform(url) {
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('instagram')) return 'instagram';
        if (url.includes('calendly')) return 'calendly';
        return 'unknown';
    }

    track(event, data) {
        // Placeholder for analytics tracking
        // In production, integrate with Google Analytics, Mixpanel, etc.
        console.log(`Analytics Event: ${event}`, data);
        
        // Example: Google Analytics 4
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', event, data);
        // }
    }
}

// Error handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.error);
            // In production, send to error tracking service
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            // In production, send to error tracking service
        });
    }
}

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize core functionality
        new LanguageToggle();
        new SmoothScroll();
        new ScrollAnimations();
        new PerformanceOptimizer();
        new Analytics();
        new ErrorHandler();
        
        console.log('QA Starter Kit website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Export modules for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageToggle,
        SmoothScroll,
        ScrollAnimations,
        PerformanceOptimizer,
        Analytics,
        ErrorHandler
    };
}
