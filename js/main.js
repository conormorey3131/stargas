// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

// Open mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close mobile menu
mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

// Store locator functionality
const searchInput = document.querySelector('.search-input');
const storeCards = document.querySelectorAll('.store-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        storeCards.forEach(card => {
            const storeName = card.querySelector('h4').textContent.toLowerCase();
            const storeAddress = card.querySelector('p').textContent.toLowerCase();
            
            if (storeName.includes(searchTerm) || storeAddress.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Store card interaction
storeCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all cards
        storeCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
    });
});

// "Use My Location" button functionality
const locationBtn = document.querySelector('.btn-outline');
if (locationBtn && locationBtn.textContent.includes('Use My Location')) {
    locationBtn.addEventListener('click', () => {
        if ('geolocation' in navigator) {
            locationBtn.disabled = true;
            locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting location...';
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('User location:', latitude, longitude);
                    locationBtn.innerHTML = '<i class="fas fa-check"></i> Location found';
                    
                    // Here you would typically update the store list based on user location
                    setTimeout(() => {
                        locationBtn.disabled = false;
                        locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Use My Location';
                    }, 2000);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    locationBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Location access denied';
                    setTimeout(() => {
                        locationBtn.disabled = false;
                        locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Use My Location';
                    }, 2000);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });
}

// Add CSS for header scroll behavior
const style = document.createElement('style');
style.textContent = `
    .header.scroll-down {
        transform: translateY(-100%);
    }
    
    .header.scroll-up {
        transform: translateY(0);
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .store-card.active {
        border-color: var(--stargas-red);
        background-color: #FEE2E2;
    }
`;
document.head.appendChild(style);

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
    // Initialize currency toggle
    initializeCurrencyToggle();
});

// Currency Toggle Functionality
function initializeCurrencyToggle() {
    // Get saved currency preference or default to EUR
    let currentCurrency = localStorage.getItem('stargas-currency') || 'EUR';
    
    // Update currency on page load
    updateCurrency(currentCurrency, false);
    
    // Add event listeners to currency buttons (desktop)
    const currencyBtns = document.querySelectorAll('.currency-btn');
    currencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currency = btn.dataset.currency;
            if (currency !== currentCurrency) {
                currentCurrency = currency;
                updateCurrency(currency, true);
                localStorage.setItem('stargas-currency', currency);
            }
        });
    });
    
    // Add event listeners to mobile currency buttons
    const mobileCurrencyBtns = document.querySelectorAll('.mobile-currency-btn');
    mobileCurrencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currency = btn.dataset.currency;
            if (currency !== currentCurrency) {
                currentCurrency = currency;
                updateCurrency(currency, true);
                localStorage.setItem('stargas-currency', currency);
            }
        });
    });
}

function updateCurrency(currency, animate = true) {
    // Update button states (desktop and mobile)
    const allCurrencyBtns = document.querySelectorAll('.currency-btn, .mobile-currency-btn');
    allCurrencyBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.currency === currency);
    });
    
    // Update all prices on the page
    const priceElements = document.querySelectorAll('[data-eur][data-gbp]');
    priceElements.forEach(priceEl => {
        const eurPrice = parseFloat(priceEl.dataset.eur);
        const gbpPrice = parseFloat(priceEl.dataset.gbp);
        const newPrice = currency === 'EUR' ? eurPrice : gbpPrice;
        const symbol = currency === 'EUR' ? '€' : '£';
        
        const currencySymbol = priceEl.querySelector('.currency-symbol');
        const priceAmount = priceEl.querySelector('.price-amount');
        
        if (currencySymbol && priceAmount) {
            if (animate) {
                // Add animation class
                priceEl.style.transform = 'scale(1.1)';
                priceEl.style.transition = 'transform 0.2s ease';
                
                setTimeout(() => {
                    currencySymbol.textContent = symbol;
                    priceAmount.textContent = newPrice.toFixed(2);
                    priceEl.style.transform = 'scale(1)';
                }, 100);
                
                setTimeout(() => {
                    priceEl.style.transform = '';
                    priceEl.style.transition = '';
                }, 300);
            } else {
                currencySymbol.textContent = symbol;
                priceAmount.textContent = newPrice.toFixed(2);
            }
        }
    });
    
    // Update any currency indicators in text
    updateCurrencyText(currency);
}

function updateCurrencyText(currency) {
    // Update price ranges or currency mentions in text
    const currencyTexts = document.querySelectorAll('[data-currency-text]');
    currencyTexts.forEach(textEl => {
        const eurText = textEl.dataset.eurText || '';
        const gbpText = textEl.dataset.gbpText || '';
        textEl.textContent = currency === 'EUR' ? eurText : gbpText;
    });
}