// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize map
    initializeMap();
    
    // Handle contact form submission
    handleContactForm();
    
    // Add form validation
    addFormValidation();
});

// Initialize Leaflet map
function initializeMap() {
    try {
        // Stargas location coordinates (approximate for Kilmallock, Limerick)
        const stargasLocation = [52.4, -8.57]; // Railway Road, Kilmallock, Limerick
        
        // Initialize map
        const map = L.map('contactMap').setView(stargasLocation, 15);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Custom marker icon
        const stargasIcon = L.divIcon({
            html: '<i class="fas fa-map-marker-alt" style="color: #DC2626; font-size: 2rem;"></i>',
            iconSize: [30, 30],
            className: 'custom-marker'
        });
        
        // Add marker for Stargas location
        const marker = L.marker(stargasLocation, { icon: stargasIcon }).addTo(map);
        
        // Popup content
        const popupContent = `
            <div style="text-align: center; font-family: Inter, sans-serif;">
                <h3 style="margin: 0 0 10px; color: #1F2937;">Stargas Supplies Ltd.</h3>
                <p style="margin: 0 0 5px; color: #4B5563;">Railway Road</p>
                <p style="margin: 0 0 5px; color: #4B5563;">Kilmallock</p>
                <p style="margin: 0 0 10px; color: #4B5563;">Limerick V35 TH92</p>
                <a href="tel:+35363207000" style="color: #DC2626; text-decoration: none;">
                    <i class="fas fa-phone"></i> 063 20700
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent).openPopup();
        
        // Add map controls
        L.control.scale().addTo(map);
        
    } catch (error) {
        console.error('Error initializing map:', error);
        document.getElementById('contactMap').innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; color: #6b7280; text-align: center; padding: 2rem;">
                <div>
                    <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Map temporarily unavailable</p>
                    <p>Visit us at Railway Road, Kilmallock, Limerick V35 TH92</p>
                </div>
            </div>
        `;
    }
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Remove any existing messages
        removeFormMessages();
        
        try {
            // Get form data
            const formData = new FormData(form);
            
            // Note: You'll need to replace 'YOUR_FORM_ID' with your actual Formspree form ID
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try calling us directly at 063 20700.', 'error');
        }
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
}

// Add form validation
function addFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation (optional but basic check if provided)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 7) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#DC2626';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    field.parentNode.appendChild(errorElement);
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show form message (success/error)
function showFormMessage(message, type) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-${type}`;
    messageElement.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    
    form.insertBefore(messageElement, form.firstChild);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Remove form messages
function removeFormMessages() {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(message => message.remove());
}

// Add custom marker styles
const style = document.createElement('style');
style.textContent = `
    .custom-marker {
        background: transparent !important;
        border: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #DC2626 !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
    
    .leaflet-popup-content {
        margin: 8px 12px !important;
    }
    
    .leaflet-popup-content-wrapper {
        border-radius: 8px !important;
    }
`;
document.head.appendChild(style);