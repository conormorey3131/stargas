// Propane Gas page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize product filtering
    initializeProductFiltering();
    
    // Add scroll animations
    initializeScrollAnimations();
    
    // Add interactive effects
    initializeInteractiveEffects();
});

// Product Category Filtering
function initializeProductFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productsGrid = document.querySelector('.products-grid');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Add filtering class for smooth transition
            productsGrid.classList.add('filtering');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Remove filtering class after animation
            setTimeout(() => {
                productsGrid.classList.remove('filtering');
            }, 300);
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'product_filter', {
                    'event_category': 'product_interaction',
                    'event_label': category
                });
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observeElements = document.querySelectorAll(
        '.intro-section, .app-card, .product-card, .safety-feature'
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
            if (cylinder) {
                cylinder.style.transform = 'scale(1.1) rotateY(10deg)';
                cylinder.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cylinder = this.querySelector('.cylinder-body');
            if (cylinder) {
                cylinder.style.transform = 'scale(1) rotateY(0deg)';
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
                
                // You could redirect to contact page or open a modal here
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
            
            // Filter products based on clicked application
            const relevantCategory = getRelevantCategory(appType);
            if (relevantCategory) {
                const categoryBtn = document.querySelector(`[data-category="${relevantCategory}"]`);
                if (categoryBtn) {
                    categoryBtn.click();
                    
                    // Scroll to products section
                    document.querySelector('.propane-products-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Hero features animation
    const heroFeatures = document.querySelectorAll('.hero-feature');
    heroFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${0.5 + (index * 0.2)}s`;
    });
    
    // Safety features animation
    const safetyFeatures = document.querySelectorAll('.safety-feature');
    safetyFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
    });
}

// Helper function to map applications to categories
function getRelevantCategory(appType) {
    const categoryMap = {
        'bbq': 'bbq',
        'outdoor cooking': 'bbq',
        'patio heating': 'patio',
        'camping': 'camping',
        'caravan': 'camping',
        'forklift': 'commercial'
    };
    
    for (const [key, category] of Object.entries(categoryMap)) {
        if (appType.includes(key)) {
            return category;
        }
    }
    
    return null;
}

// Add product count display
function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product-card:not(.hidden)').length;
    const totalProducts = document.querySelectorAll('.product-card').length;
    
    // You could add a product counter element here if needed
    console.log(`Showing ${visibleProducts} of ${totalProducts} products`);
}

// Add CSS animations
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
        transform: scale(1.1) rotate(5deg);
        transition: transform 0.3s ease;
    }
    
    .hero-feature {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
    }
    
    .safety-feature {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .category-btn {
        position: relative;
        overflow: hidden;
    }
    
    .category-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .category-btn:hover::before {
        left: 100%;
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
`;
document.head.appendChild(style);