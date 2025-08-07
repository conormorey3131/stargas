// Beer & Cellar Gas Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle enquiry buttons
    const enquiryButtons = document.querySelectorAll('.product-card .btn');
    
    enquiryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // You can customize this action - for now it opens email
            const subject = encodeURIComponent(`Enquiry about ${productName}`);
            const body = encodeURIComponent(`Hi,\n\nI would like to enquire about ${productName}.\n\nPlease provide me with pricing and availability information.\n\nThank you.`);
            
            window.location.href = `mailto:info@stargas.ie?subject=${subject}&body=${body}`;
        });
    });
    
    // Add hover effect to cylinder illustrations
    const cylinders = document.querySelectorAll('.gas-cylinder');
    
    cylinders.forEach(cylinder => {
        cylinder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(-5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        cylinder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Animate products on scroll
    const productCards = document.querySelectorAll('.product-card');
    
    const animateProducts = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        animateProducts.observe(card);
    });
});