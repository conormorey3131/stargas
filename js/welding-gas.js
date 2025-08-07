// Welding Gas page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling animations
    const observeElements = document.querySelectorAll('.intro-text, .cylinder-sizes, .product-card, .benefit-card');
    
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
    
    // Add click handlers for call-to-action buttons
    const callButtons = document.querySelectorAll('.btn:contains("Call")');
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Analytics tracking could go here
            gtag && gtag('event', 'phone_call', {
                'event_category': 'contact',
                'event_label': 'welding_gas_page'
            });
        });
    });
    
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cylinder = this.querySelector('.cylinder-body');
            if (cylinder) {
                cylinder.style.transform = 'scale(1.05) rotateY(5deg)';
                cylinder.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cylinder = this.querySelector('.cylinder-body');
            if (cylinder) {
                cylinder.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
    });
    
    // Add cylinder size card interactions
    const sizeCards = document.querySelectorAll('.size-card');
    sizeCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('click', function() {
            // Scroll to products section
            const productsSection = document.querySelector('.welding-products-section');
            if (productsSection) {
                productsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                });
            }
        });
    });
});

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
    
    .size-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        cursor: pointer;
    }
    
    .size-card:hover .size-icon {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    .hero-feature {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .hero-feature:nth-child(1) { animation-delay: 0.2s; }
    .hero-feature:nth-child(2) { animation-delay: 0.4s; }
    .hero-feature:nth-child(3) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);