// Professional JavaScript for Stargas HTML Site

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

// Enhanced mobile menu with overlay
const mobileMenuOverlay = document.createElement('div');
mobileMenuOverlay.className = 'mobile-menu-overlay';
document.body.appendChild(mobileMenuOverlay);

// Function to close mobile menu
const closeMobileMenu = () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

// Open mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close mobile menu
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu when pressing escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Dropdown menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.nav-item');
    
    // Handle keyboard navigation for dropdowns
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (dropdown) {
            // Handle keyboard navigation
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Focus first dropdown item
                    const firstItem = dropdown.querySelector('.dropdown-item');
                    if (firstItem) firstItem.focus();
                }
            });
            
            // Handle escape key to close dropdown
            dropdown.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    link.focus();
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const isDropdown = e.target.closest('.nav-item');
        if (!isDropdown) {
            // Remove any manual show classes if we add them later
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let scrolled = false;

window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 0;
    if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        header.classList.toggle('scrolled', scrolled);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Update current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Currency toggle functionality
document.querySelectorAll('.currency-btn, .mobile-currency-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const currency = this.dataset.currency;
        const isDesktop = this.classList.contains('currency-btn');
        const buttons = isDesktop ? 
            document.querySelectorAll('.currency-btn') :
            document.querySelectorAll('.mobile-currency-btn');
            
        // Remove active class from all buttons in this group
        buttons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update currency display (placeholder for future functionality)
        console.log(`Currency changed to: ${currency}`);
    });
});

// Enhanced focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Trap focus in mobile menu when open
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && mobileMenu.classList.contains('active')) {
            const focusableContent = mobileMenu.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttled scroll handler for better performance
const throttledScrollHandler = throttle(() => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 0;
    
    if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        header.classList.toggle('scrolled', scrolled);
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler, { passive: true });

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Trigger initial animation sequence
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});


// Preload critical images
document.addEventListener('DOMContentLoaded', () => {
    const criticalImages = [
        'images/logo.png',
        'images/iso_nqa_002-155x75.jpg',
        'images/g_irish_logo-75x75.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});