// Nitrogen page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Add scroll animations
    initializeScrollAnimations();
    
    // Add interactive effects
    initializeInteractiveEffects();
    
    // Initialize racing animations
    initializeRacingAnimations();
    
    // Initialize comparison animations
    initializeComparisonAnimations();
});

// Scroll Animations
function initializeScrollAnimations() {
    const observeElements = document.querySelectorAll(
        '.intro-section, .app-card, .product-card, .benefit-card, .advantage-item, .comparison-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger racing animation for product cards
                if (entry.target.classList.contains('product-card')) {
                    triggerRacingEffect(entry.target);
                }
                
                // Trigger comparison animation
                if (entry.target.classList.contains('comparison-card')) {
                    triggerComparisonEffect(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Interactive Effects
function initializeInteractiveEffects() {
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        // Stagger initial animation
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.addEventListener('mouseenter', function() {
            const cylinder = this.querySelector('.cylinder-body');
            const badge = this.querySelector('.racing-badge');
            
            if (cylinder) {
                cylinder.style.transform = 'scale(1.1) rotateY(15deg)';
                cylinder.style.transition = 'transform 0.3s ease';
                
                // Add racing glow effect
                cylinder.style.boxShadow = '0 0 20px rgba(96, 165, 250, 0.5)';
            }
            
            if (badge) {
                badge.style.transform = 'scale(1.1)';
                badge.style.animation = 'racingStripe 1s ease infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cylinder = this.querySelector('.cylinder-body');
            const badge = this.querySelector('.racing-badge');
            
            if (cylinder) {
                cylinder.style.transform = 'scale(1) rotateY(0deg)';
                cylinder.style.boxShadow = 'var(--shadow-md)';
            }
            
            if (badge) {
                badge.style.transform = 'scale(1)';
                badge.style.animation = 'racingGlow 2s ease-in-out infinite';
            }
        });
        
        // Order button tracking
        const orderBtn = card.querySelector('.btn');
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.price-amount').textContent;
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'product_interest', {
                        'event_category': 'ecommerce',
                        'event_label': productName,
                        'value': parseFloat(productPrice)
                    });
                }
                
                // Show racing success message
                showRacingMessage(productName);
                
                // Redirect to contact page with product info
                setTimeout(() => {
                    window.location.href = 'contact.html?product=' + encodeURIComponent(productName);
                }, 1500);
            });
        }
    });
    
    // Application card interactions
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('click', function() {
            const appType = this.querySelector('h4').textContent.toLowerCase();
            
            // Filter products by application type
            filterProductsByApplication(appType);
            
            // Scroll to products section
            document.querySelector('.nitrogen-products-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'application_click', {
                    'event_category': 'user_engagement',
                    'event_label': appType
                });
            }
        });
    });
    
    // Advantage item interactions
    const advantageItems = document.querySelectorAll('.advantage-item');
    advantageItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('click', function() {
            // Highlight corresponding benefit
            const advantageTitle = this.querySelector('h4').textContent;
            highlightBenefit(advantageTitle);
        });
    });
    
    // Hero features animation
    const heroFeatures = document.querySelectorAll('.hero-feature');
    heroFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${0.5 + (index * 0.3)}s`;
    });
    
    // Benefit cards animation and interactions
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.addEventListener('click', function() {
            const benefitTitle = this.querySelector('h3').textContent;
            
            if (benefitTitle.includes('TEMPERATURE')) {
                // Scroll to advantages section
                document.querySelector('.nitrogen-advantages').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else if (benefitTitle.includes('RACING')) {
                // Scroll to applications
                document.querySelector('.nitrogen-applications').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Racing Animations
function initializeRacingAnimations() {
    // Animate tire tracks
    const tracks = document.querySelectorAll('.tire-track');
    tracks.forEach((track, index) => {
        // Reset and restart animation periodically
        setInterval(() => {
            track.style.animation = 'none';
            setTimeout(() => {
                track.style.animation = `raceTrack 4s linear infinite`;
                track.style.animationDelay = `${index * 2}s`;
            }, 100);
        }, 8000);
    });
    
    // Animate racing flags
    const flags = document.querySelectorAll('.racing-flag');
    flags.forEach((flag, index) => {
        flag.addEventListener('mouseenter', function() {
            this.style.animation = 'wave 0.5s ease-in-out infinite';
        });
        
        flag.addEventListener('mouseleave', function() {
            this.style.animation = 'wave 2s ease-in-out infinite';
        });
    });
}

// Comparison Animations
function initializeComparisonAnimations() {
    const comparisonSection = document.querySelector('.performance-comparison');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateComparisonCards();
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (comparisonSection) {
        observer.observe(comparisonSection);
    }
}

function animateComparisonCards() {
    const nitrogenCard = document.querySelector('.nitrogen-card');
    const airCard = document.querySelector('.air-card');
    const vsDivider = document.querySelector('.vs-divider');
    
    // Stagger the animations
    setTimeout(() => {
        if (nitrogenCard) {
            nitrogenCard.style.opacity = '1';
            nitrogenCard.style.transform = 'translateX(0) scale(1)';
            nitrogenCard.style.transition = 'all 0.8s ease';
        }
    }, 200);
    
    setTimeout(() => {
        if (vsDivider) {
            vsDivider.style.opacity = '1';
            vsDivider.style.transform = 'scale(1) rotate(0deg)';
            vsDivider.style.transition = 'all 0.5s ease';
        }
    }, 600);
    
    setTimeout(() => {
        if (airCard) {
            airCard.style.opacity = '1';
            airCard.style.transform = 'translateX(0) scale(1)';
            airCard.style.transition = 'all 0.8s ease';
        }
    }, 1000);
    
    // Animate check/cross icons
    setTimeout(() => {
        const checkIcons = document.querySelectorAll('.fa-check');
        const crossIcons = document.querySelectorAll('.fa-times');
        
        checkIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'pulse 0.6s ease';
                icon.style.color = '#10B981';
            }, index * 200);
        });
        
        crossIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'shake 0.6s ease';
                icon.style.color = '#EF4444';
            }, index * 200);
        });
    }, 1200);
}

// Utility Functions
function triggerRacingEffect(productCard) {
    const badge = productCard.querySelector('.racing-badge');
    if (badge) {
        // Add temporary racing effect
        badge.style.background = 'linear-gradient(90deg, #F59E0B, #D97706, #F59E0B)';
        badge.style.backgroundSize = '200% 200%';
        badge.style.animation = 'racingStripe 1s ease infinite';
        
        setTimeout(() => {
            badge.style.animation = 'racingGlow 2s ease-in-out infinite';
        }, 2000);
    }
}

function triggerComparisonEffect(card) {
    if (card.classList.contains('nitrogen-card')) {
        card.style.borderColor = '#10B981';
        card.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
    } else if (card.classList.contains('air-card')) {
        card.style.borderColor = '#EF4444';
        card.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
    }
}

function filterProductsByApplication(appType) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        let shouldHighlight = false;
        
        // Map application types to products
        switch(appType) {
            case 'motor sport teams':
                shouldHighlight = productName.includes('motor sport') || productName.includes('professional');
                break;
            case 'aircraft maintenance':
                shouldHighlight = productName.includes('aircraft');
                break;
            case 'go karts':
                shouldHighlight = productName.includes('go-kart') || productName.includes('motor sport');
                break;
            case 'car enthusiasts':
                shouldHighlight = productName.includes('enthusiast') || productName.includes('car');
                break;
        }
        
        if (shouldHighlight) {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 20px 25px -5px rgba(59, 130, 246, 0.3)';
            card.style.border = '2px solid #3B82F6';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.border = '';
            }, 3000);
        }
    });
}

function highlightBenefit(advantageTitle) {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        const benefitTitle = card.querySelector('h3').textContent;
        
        if ((advantageTitle.includes('Temperature') && benefitTitle.includes('TEMPERATURE')) ||
            (advantageTitle.includes('Performance') && benefitTitle.includes('PERFORMANCE')) ||
            (advantageTitle.includes('Lasting') && benefitTitle.includes('LASTING'))) {
            
            card.style.background = 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)';
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
            
            setTimeout(() => {
                card.style.background = '';
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 2500);
        }
    });
}

function showRacingMessage(productName) {
    // Create racing-themed floating message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #374151 0%, #1F2937 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            text-align: center;
            font-weight: 600;
            animation: raceIn 0.5s ease;
            border: 2px solid #F59E0B;
        ">
            <i class="fas fa-flag-checkered" style="font-size: 2rem; margin-bottom: 1rem; color: #F59E0B;"></i>
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">Racing Choice!</h3>
            <p style="margin: 0; opacity: 0.9;">Perfect for motor sports performance</p>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.8;">Redirecting to contact form...</p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Remove message after animation
    setTimeout(() => {
        message.remove();
    }, 1400);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes raceIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) rotateY(180deg);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateY(0deg);
        }
    }
    
    .product-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .app-card {
        animation: slideInLeft 0.6s ease forwards;
        opacity: 0;
        cursor: pointer;
    }
    
    .app-card:nth-child(even) {
        animation-name: slideInRight;
    }
    
    .app-card:hover .app-icon {
        animation: pulse 0.8s ease;
    }
    
    .hero-feature {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
    }
    
    .benefit-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        cursor: pointer;
    }
    
    .advantage-item {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        cursor: pointer;
    }
    
    .advantage-item:hover .advantage-icon {
        animation: pulse 0.6s ease;
    }
    
    .benefit-card:hover .benefit-icon {
        animation: pulse 0.8s ease;
    }
    
    .cylinder-body {
        position: relative;
        overflow: hidden;
    }
    
    .cylinder-body::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
        transform: rotate(45deg);
        transition: transform 0.6s;
        opacity: 0;
    }
    
    .product-card:hover .cylinder-body::after {
        opacity: 1;
        transform: rotate(45deg) translate(50px, 50px);
    }
    
    .comparison-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .nitrogen-card {
        transform: translateX(-50px) scale(0.9);
    }
    
    .air-card {
        transform: translateX(50px) scale(0.9);
    }
    
    .vs-divider {
        opacity: 0;
        transform: scale(0) rotate(180deg);
    }
    
    .contact-highlight {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
        animation-delay: 0.4s;
    }
    
    .nitrogen-advantages {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
        animation-delay: 0.2s;
    }
`;
document.head.appendChild(style);

// Interactive racing elements
document.addEventListener('DOMContentLoaded', function() {
    // Make racing flags clickable for fun
    const flags = document.querySelectorAll('.racing-flag');
    flags.forEach(flag => {
        flag.addEventListener('click', function() {
            this.style.animation = 'wave 0.2s ease-in-out 3';
            
            // Show racing message
            const racingMsg = document.createElement('div');
            racingMsg.textContent = '🏁 Ready to Race! 🏁';
            racingMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #000, #fff);
                color: #F59E0B;
                padding: 1rem;
                border-radius: 8px;
                font-weight: bold;
                z-index: 9999;
                animation: fadeInUp 0.5s ease;
            `;
            document.body.appendChild(racingMsg);
            
            setTimeout(() => {
                racingMsg.remove();
            }, 2000);
        });
    });
});

// Performance monitoring for racing theme
function trackPerformanceMetrics() {
    // Track how long users spend viewing products
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        let viewStartTime = null;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    viewStartTime = Date.now();
                } else if (viewStartTime) {
                    const viewDuration = Date.now() - viewStartTime;
                    
                    if (typeof gtag !== 'undefined' && viewDuration > 2000) {
                        gtag('event', 'product_engagement', {
                            'event_category': 'user_engagement',
                            'event_label': card.querySelector('h3').textContent,
                            'value': Math.round(viewDuration / 1000)
                        });
                    }
                    
                    viewStartTime = null;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(card);
    });
}

// Initialize performance tracking
document.addEventListener('DOMContentLoaded', trackPerformanceMetrics);