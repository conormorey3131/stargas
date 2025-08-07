// Propylene page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Add scroll animations
    initializeScrollAnimations();
    
    // Add interactive effects
    initializeInteractiveEffects();
    
    // Initialize clean flame animations
    initializeFlameAnimations();
    
    // Initialize cost comparison animations
    initializeCostComparison();
    
    // Initialize comparison table animations
    initializeComparisonTable();
});

// Scroll Animations
function initializeScrollAnimations() {
    const observeElements = document.querySelectorAll(
        '.intro-section, .app-card, .product-card, .benefit-card, .cost-comparison, .comparison-table'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger cost comparison animation
                if (entry.target.classList.contains('cost-comparison')) {
                    triggerCostAnimation();
                }
                
                // Trigger comparison table animation
                if (entry.target.classList.contains('comparison-table')) {
                    triggerTableAnimation();
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
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', function() {
            const cylinder = this.querySelector('.cylinder-body');
            const flame = this.querySelector('.clean-flame-small');
            const badge = this.querySelector('.savings-badge');
            
            if (cylinder) {
                cylinder.style.transform = 'scale(1.1) rotateY(10deg)';
                cylinder.style.transition = 'transform 0.3s ease';
            }
            
            if (flame) {
                flame.style.transform = 'scale(1.5)';
                flame.style.opacity = '1';
            }
            
            if (badge) {
                badge.style.transform = 'scale(1.1)';
                badge.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.9)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cylinder = this.querySelector('.cylinder-body');
            const flame = this.querySelector('.clean-flame-small');
            const badge = this.querySelector('.savings-badge');
            
            if (cylinder) {
                cylinder.style.transform = 'scale(1) rotateY(0deg)';
            }
            
            if (flame) {
                flame.style.transform = 'scale(1)';
                flame.style.opacity = '0.8';
            }
            
            if (badge) {
                badge.style.transform = 'scale(1)';
                badge.style.boxShadow = '0 0 5px rgba(245, 158, 11, 0.5)';
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
                
                // Show savings message
                showSavingsMessage(productName);
                
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
            
            // Highlight corresponding benefit
            highlightBenefit('VERSATILE APPLICATIONS');
            
            // Scroll to products section when application is clicked
            document.querySelector('.propylene-products-section').scrollIntoView({
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
        feature.style.animationDelay = `${0.5 + (index * 0.3)}s`;
    });
    
    // Benefit cards animation and interactions
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.addEventListener('click', function() {
            const benefitTitle = this.querySelector('h3').textContent;
            
            if (benefitTitle.includes('COST')) {
                // Scroll to cost comparison
                document.querySelector('.cost-comparison').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Replay cost animation
                setTimeout(() => {
                    triggerCostAnimation();
                }, 500);
            } else if (benefitTitle.includes('VERSATILE')) {
                // Scroll to applications
                document.querySelector('.propylene-applications').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Clean Flame Animations
function initializeFlameAnimations() {
    const flames = document.querySelectorAll('.clean-flame, .clean-flame-small');
    
    flames.forEach((flame, index) => {
        // Add random clean flicker effect
        setInterval(() => {
            const randomScale = 0.9 + Math.random() * 0.4;
            const randomRotate = Math.random() * 6 - 3;
            
            flame.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
        }, 1500 + (index * 300));
    });
}

// Cost Comparison Animations
function initializeCostComparison() {
    const costBars = document.querySelectorAll('.cost-bar');
    
    // Reset bars initially
    costBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function triggerCostAnimation() {
    const acetyleneBu ar = document.querySelector('.acetylene-bar');
    const propylenebar = document.querySelector('.propylene-bar');
    
    if (acetyleneBar && propyleneBar) {
        // Reset and animate
        acetyleneBar.style.width = '0%';
        propyleneBar.style.width = '0%';
        
        setTimeout(() => {
            acetyleneBar.style.width = '100%';
        }, 200);
        
        setTimeout(() => {
            propyleneBar.style.width = '50%';
        }, 800);
    }
}

// Comparison Table Animations
function initializeComparisonTable() {
    const rows = document.querySelectorAll('.comparison-row');
    
    rows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
    });
}

function triggerTableAnimation() {
    const rows = document.querySelectorAll('.comparison-row');
    
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
            row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Add pulse effect to green checkmarks
            const checkIcons = row.querySelectorAll('.text-green');
            checkIcons.forEach(icon => {
                icon.style.animation = 'pulse 0.5s ease';
            });
        }, index * 200);
    });
}

// Utility Functions
function highlightBenefit(benefitText) {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        if (title.includes(benefitText)) {
            card.style.background = 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)';
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            
            setTimeout(() => {
                card.style.background = '';
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 2000);
        }
    });
}

function showSavingsMessage(productName) {
    // Create floating message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            text-align: center;
            font-weight: 600;
            animation: fadeInScale 0.5s ease;
        ">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem; color: #6EE7B7;"></i>
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">Great Choice!</h3>
            <p style="margin: 0; opacity: 0.9;">You're saving 50% compared to acetylene!</p>
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
            transform: scale(1.1);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .product-card {
        animation: fadeInUp 0.8s ease forwards;
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
        animation: pulse 0.6s ease;
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
    
    .clean-flame:hover,
    .clean-flame-small:hover {
        animation: cleanFlicker 0.3s ease-in-out infinite alternate;
    }
    
    .cost-bar {
        transition: width 1.5s ease-out;
    }
    
    .comparison-row {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .contact-highlight {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
        animation-delay: 0.4s;
    }
    
    .cost-comparison {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
        animation-delay: 0.2s;
    }
`;
document.head.appendChild(style);

// Interactive cost comparison on hover
document.addEventListener('DOMContentLoaded', function() {
    const comparisonItems = document.querySelectorAll('.comparison-item');
    
    comparisonItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const bar = this.querySelector('.cost-bar');
            if (bar) {
                bar.style.transform = 'scaleY(1.1)';
                bar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const bar = this.querySelector('.cost-bar');
            if (bar) {
                bar.style.transform = 'scaleY(1)';
                bar.style.boxShadow = '';
            }
        });
    });
});

// Scroll progress for cost savings
function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const rate = scrolled / (document.body.offsetHeight - window.innerHeight);
    
    // Update savings badges glow based on scroll
    const badges = document.querySelectorAll('.savings-badge');
    badges.forEach(badge => {
        badge.style.opacity = Math.min(1, rate * 3);
    });
}

window.addEventListener('scroll', updateScrollProgress);