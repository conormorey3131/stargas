// Debug version of chatbot to identify click issues

console.log('🔍 Chatbot Debug Script Loading...');

// Wait for DOM to be fully ready
function initDebugChatbot() {
    console.log('🔍 Starting debug initialization...');
    
    // Check if chatbot exists
    const container = document.getElementById('chatbotContainer');
    const button = document.getElementById('chatbotToggle');
    
    console.log('Container found:', !!container);
    console.log('Button found:', !!button);
    
    if (button) {
        // Check computed styles
        const styles = window.getComputedStyle(button);
        console.log('Button styles:', {
            display: styles.display,
            visibility: styles.visibility,
            pointerEvents: styles.pointerEvents,
            zIndex: styles.zIndex,
            position: styles.position
        });
        
        // Check if button is clickable
        const rect = button.getBoundingClientRect();
        console.log('Button position:', {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0
        });
        
        // Add multiple event listeners to catch any clicks
        button.addEventListener('click', function(e) {
            console.log('✅ CLICK EVENT FIRED!', e);
        }, true);
        
        button.addEventListener('mousedown', function(e) {
            console.log('✅ MOUSEDOWN EVENT FIRED!', e);
        });
        
        button.addEventListener('mouseup', function(e) {
            console.log('✅ MOUSEUP EVENT FIRED!', e);
        });
        
        button.addEventListener('touchstart', function(e) {
            console.log('✅ TOUCHSTART EVENT FIRED!', e);
        });
        
        // Test if there's an element blocking the button
        button.style.position = 'relative';
        button.style.zIndex = '99999';
        
        console.log('🔍 Debug setup complete. Try clicking the button now.');
    } else {
        console.error('❌ Chatbot button not found!');
    }
    
    // Check for any overlapping elements
    if (button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const elementAtPoint = document.elementFromPoint(centerX, centerY);
        
        console.log('Element at button center:', elementAtPoint);
        console.log('Is it the button?', elementAtPoint === button);
        
        if (elementAtPoint !== button) {
            console.warn('⚠️ Another element is covering the button:', elementAtPoint);
        }
    }
}

// Try multiple initialization methods
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDebugChatbot);
} else {
    // DOM already loaded
    setTimeout(initDebugChatbot, 100);
}

// Also try after a delay
setTimeout(initDebugChatbot, 1000);

// Global function to manually test
window.debugChatbot = function() {
    console.log('🧪 Manual debug test...');
    const button = document.getElementById('chatbotToggle');
    if (button) {
        console.log('Button found, attempting click...');
        button.click();
        
        // Also try dispatching a click event
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        button.dispatchEvent(clickEvent);
        console.log('Click event dispatched');
    } else {
        console.error('Button not found!');
    }
};