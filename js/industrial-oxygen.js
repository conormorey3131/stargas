// Industrial Oxygen page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Add scroll animations
    initializeScrollAnimations();
    
    // Add interactive effects
    initializeInteractiveEffects();
    
    // Initialize oxygen particles animation
    initializeParticleAnimations();
    
    // Initialize flame animations
    initializeFlameAnimations();
});

// Scroll Animations
function initializeScrollAnimations() {
    const observeElements = document.querySelectorAll(
        '.intro-section, .app-card, .product-card, .benefit-card, .tip-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            const cylinder = this.querySelector('.cylinder-body');
            const flame = this.querySelector('.oxygen-flame');
            
            if (cylinder) {
                cylinder.style.transform = 'scale(1.1) rotateY(10deg)';
                cylinder.style.transition = 'transform 0.3s ease';
            }
            
            if (flame) {
                flame.style.transform = 'scale(1.3)';
                flame.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cylinder = this.querySelector('.cylinder-body');
            const flame = this.querySelector('.oxygen-flame');
            
            if (cylinder) {
                cylinder.style.transform = 'scale(1) rotateY(0deg)';
            }
            
            if (flame) {
                flame.style.transform = 'scale(1)';
                flame.style.opacity = '0.8';
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
                
                // Redirect to contact page with product info
                window.location.href = 'contact.html?product=' + encodeURIComponent(productName);
            });
        }
    });
    
    // Application card interactions
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.addEventListener('click', function() {
            const appType = this.querySelector('h4').textContent.toLowerCase();
            
            // Scroll to products section when application is clicked
            document.querySelector('.oxygen-products-section').scrollIntoView({
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
    
    // Hero features animation
    const heroFeatures = document.querySelectorAll('.hero-feature');
    heroFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${0.5 + (index * 0.2)}s`;
    });
    
    // Benefit cards animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Tip cards animation
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
}

// Particle Animations
function initializeParticleAnimations() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Add random movement to particles
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500));
    });
}

// Flame Animations
function initializeFlameAnimations() {
    const flames = document.querySelectorAll('.oxygen-flame');
    
    flames.forEach((flame, index) => {
        // Add random flicker effect
        setInterval(() => {
            const randomScale = 0.9 + Math.random() * 0.3;
            const randomRotate = Math.random() * 10 - 5;
            
            flame.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
        }, 1000 + (index * 200));
    });
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
            transform: scale(1.05);
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
        animation: pulse 1s ease-in-out;
    }
    
    .hero-feature {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
    }
    
    .benefit-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .tip-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
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
    
    .oxygen-flame:hover {
        animation: flicker 0.5s ease-in-out infinite alternate;
    }
    
    @keyframes flicker {
        0% {
            transform: scale(1) rotate(-2deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(1.2) rotate(2deg);
            opacity: 1;
        }
    }
    
    .particle {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px);
            opacity: 1;
        }
    }
    
    .contact-highlight {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
        animation-delay: 0.3s;
    }
`;
document.head.appendChild(style);

// Safety tip interactions
document.addEventListener('DOMContentLoaded', function() {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle highlight effect when tip is clicked
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            setTimeout(() => {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 200);
        });
    });
});

// Scroll-triggered counter animation for purity percentages
function animateCounters() {
    const productCards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const purityElement = entry.target.querySelector('.product-features li');
                if (purityElement && purityElement.textContent.includes('%')) {
                    // Add a subtle glow effect to highlight purity
                    purityElement.style.color = '#1E40AF';
                    purityElement.style.fontWeight = '600';
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    productCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize counter animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateCounters);