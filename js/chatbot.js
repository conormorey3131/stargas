// Professional AI Chatbot for Stargas
class StargasChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.messages = [];
        console.log('🤖 Stargas Chatbot initializing...');
        this.init();
        this.setupKnowledgeBase();
        console.log('✅ Stargas Chatbot ready!');
    }

    setupKnowledgeBase() {
        this.knowledgeBase = {
            greetings: [
                "Hello! I'm here to help you with any questions about Stargas. What would you like to know?",
                "Hi there! Welcome to Stargas. How can I assist you today?",
                "Greetings! I'm your Stargas assistant. What can I help you with?"
            ],
            
            faqs: {
                "opening hours": {
                    keywords: ["hours", "open", "opening", "close", "closing", "time", "when"],
                    response: "Our stockists have varying opening hours. Most are open Monday to Saturday from 9:00 AM to 5:00 PM. You can find specific hours for each location using our Store Locator."
                },
                
                "locations": {
                    keywords: ["location", "where", "near", "stockist", "find", "store", "address"],
                    response: "We have over 60+ stockists across Ireland! You can find your nearest stockist using our Store Locator. Just click 'Find a Stockist' or visit our Locations page."
                },
                
                "gas types": {
                    keywords: ["gas", "propane", "butane", "welding", "beer", "cellar", "helium", "nitrogen", "oxygen", "types", "products"],
                    response: "We supply a wide range of industrial gases including: Propane & Butane, Welding Gases (Argon, TIG, MIG), Beer & Cellar Gas, Helium for balloons, Industrial Oxygen, Nitrogen, and Propylene. All our cylinders are RENT FREE!"
                },
                
                "rent free": {
                    keywords: ["rent", "free", "cost", "price", "rental", "fee", "charge"],
                    response: "Yes! We are Ireland's No.1 RENT FREE industrial gas supplier. You only pay for the gas - no cylinder rental fees ever! This makes us the most cost-effective choice in Ireland."
                },
                
                "delivery": {
                    keywords: ["delivery", "deliver", "shipping", "transport"],
                    response: "We supply through our network of 60+ authorized stockists across Ireland. Visit your nearest stockist to collect your gas cylinders. Use our Store Locator to find the closest one to you."
                },
                
                "contact": {
                    keywords: ["contact", "phone", "email", "call", "reach"],
                    response: "You can reach us at:\n📞 Phone: 063 20700\n📧 Email: sales@stargas.ie\n📍 Address: Railway Road, Kilmallock, Limerick V35 TH92, Ireland"
                },
                
                "safety": {
                    keywords: ["safety", "testing", "certification", "standards", "quality"],
                    response: "Safety is our top priority! We are ISO 9001:2015 certified and all our cylinders are regularly tested to exceed industrial standards. We also offer professional cylinder testing services."
                },
                
                "cylinders": {
                    keywords: ["cylinder", "bottle", "size", "exchange", "return"],
                    response: "We offer 8 different cylinder sizes to meet your needs. Our RENT FREE cylinders can be exchanged at any of our 60+ stockists. Just bring your empty cylinder for a full one!"
                },
                
                "irish": {
                    keywords: ["irish", "ireland", "guaranteed", "local", "owned"],
                    response: "We're proudly 100% Irish owned and operated since 2010! We're also Guaranteed Irish certified, supporting sustainable jobs and Irish communities. Established in Kilmallock, Limerick."
                },
                
                "beer gas": {
                    keywords: ["beer", "pub", "brewery", "co2", "mixed", "cellar"],
                    response: "We specialize in Beer & Cellar Gas solutions for pubs, restaurants, and breweries. We supply CO2, mixed gas, and all the professional equipment you need with expert support."
                },
                
                "welding": {
                    keywords: ["welding", "tig", "mig", "argon", "torch"],
                    response: "We supply all welding gases including Argon for TIG welding, MIG gas mixes, and specialized welding gas solutions. Perfect for professional welders and industrial applications."
                },
                
                "helium": {
                    keywords: ["helium", "balloon", "party", "event"],
                    response: "We supply high-quality helium for party balloons, special events, and commercial applications. Available in various cylinder sizes for any occasion!"
                }
            },

            suggestions: [
                "Where is my nearest stockist?",
                "What gas types do you supply?", 
                "What are your opening hours?",
                "Why are your cylinders rent free?",
                "How do I contact you?",
                "Do you supply beer gas?"
            ]
        };
    }

    init() {
        try {
            this.createChatbotHTML();
            this.attachEventListeners();
            this.addWelcomeMessage();
            
            // Add a global test function
            window.testChatbot = () => {
                console.log('🧪 Testing chatbot...');
                const button = document.getElementById('chatbotToggle');
                if (button) {
                    console.log('✅ Button found:', button);
                    button.click();
                } else {
                    console.error('❌ Button not found!');
                }
            };
        } catch (error) {
            console.error('❌ Error during chatbot initialization:', error);
        }
    }

    createChatbotHTML() {
        // Create elements programmatically for better control
        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.id = 'chatbotContainer';
        
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'chatbot-toggle';
        toggleButton.id = 'chatbotToggle';
        toggleButton.setAttribute('aria-label', 'Open AI chat support');
        toggleButton.setAttribute('title', 'Need help? Chat with our AI assistant');
        toggleButton.type = 'button';
        toggleButton.innerHTML = '<i class="fas fa-comments"></i>';
        
        // Add click handler directly
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Button clicked directly!');
            this.toggleChat();
        });
        
        container.appendChild(toggleButton);
        
        // Create widget HTML
        const widgetHTML = `
                <div class="chatbot-widget" id="chatbotWidget">
                    <div class="chatbot-header">
                        <h3>Stargas Assistant</h3>
                        <button class="chatbot-close" id="chatbotClose" aria-label="Close chat">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbotMessages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-suggestions" id="chatbotSuggestions">
                        <!-- Suggestion buttons will be added here -->
                    </div>
                    
                    <div class="chatbot-input-area">
                        <div class="chatbot-input-wrapper">
                            <textarea 
                                class="chatbot-input" 
                                id="chatbotInput" 
                                placeholder="Ask me anything about Stargas..."
                                rows="1"
                            ></textarea>
                            <button class="chatbot-send" id="chatbotSend" aria-label="Send message">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
        `;
        
        // Add widget HTML to container
        container.insertAdjacentHTML('beforeend', widgetHTML);
        
        // Append container to body
        document.body.appendChild(container);
        console.log('🔧 Chatbot HTML injected into DOM');
        
        // Verify button was added
        const verifyButton = document.getElementById('chatbotToggle');
        if (verifyButton) {
            console.log('✅ Chatbot button successfully added to DOM');
        } else {
            console.error('❌ Failed to add chatbot button!');
        }
    }

    attachEventListeners() {
        // Toggle button already has listener from createChatbotHTML
        const close = document.getElementById('chatbotClose');
        const input = document.getElementById('chatbotInput');
        const send = document.getElementById('chatbotSend');

        if (!close || !input || !send) {
            console.error('❌ Some chatbot elements not found:', { close, input, send });
            return;
        }
        
        close.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeChat();
        });
        
        send.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.sendMessage();
        });
        
        console.log('🎯 Event listeners attached successfully');
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        input.addEventListener('input', () => this.autoResize());
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const container = document.getElementById('chatbotContainer');
            if (this.isOpen && !container.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        console.log('🔄 Toggling chat, currently open:', this.isOpen);
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        const widget = document.getElementById('chatbotWidget');
        const toggle = document.getElementById('chatbotToggle');
        
        widget.classList.add('active');
        toggle.classList.add('active');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-times';
        }
        
        // Focus input
        setTimeout(() => {
            document.getElementById('chatbotInput').focus();
        }, 300);
    }

    closeChat() {
        this.isOpen = false;
        const widget = document.getElementById('chatbotWidget');
        const toggle = document.getElementById('chatbotToggle');
        
        widget.classList.remove('active');
        toggle.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-comments';
        }
    }

    addWelcomeMessage() {
        const greeting = this.knowledgeBase.greetings[
            Math.floor(Math.random() * this.knowledgeBase.greetings.length)
        ];
        
        setTimeout(() => {
            this.addMessage(greeting, 'bot');
            this.showSuggestions();
        }, 500);
    }

    showSuggestions() {
        const suggestionsContainer = document.getElementById('chatbotSuggestions');
        suggestionsContainer.innerHTML = '';
        
        this.knowledgeBase.suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion;
            button.addEventListener('click', () => {
                this.handleSuggestionClick(suggestion);
            });
            suggestionsContainer.appendChild(button);
        });
    }

    handleSuggestionClick(suggestion) {
        document.getElementById('chatbotInput').value = suggestion;
        this.sendMessage();
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        this.autoResize();
        
        // Hide suggestions after first user message
        document.getElementById('chatbotSuggestions').innerHTML = '';
        
        this.generateResponse(message);
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        messageDiv.textContent = message;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messages.push({ message, sender, timestamp: Date.now() });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-typing';
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    generateResponse(userMessage) {
        this.isTyping = true;
        this.showTypingIndicator();
        
        // Quick AI processing time
        setTimeout(() => {
            const response = this.findBestResponse(userMessage);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.isTyping = false;
        }, 300 + Math.random() * 400);
    }

    findBestResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let bestMatch = null;
        let maxScore = 0;

        // Check for greetings
        if (message.match(/(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return "Hello! How can I help you with Stargas today?";
        }

        // Check for goodbyes
        if (message.match(/(bye|goodbye|thanks|thank you|cheers)/)) {
            return "You're welcome! Feel free to ask if you have any other questions about Stargas. Have a great day! 😊";
        }

        // Search through FAQ knowledge base
        for (const [category, data] of Object.entries(this.knowledgeBase.faqs)) {
            let score = 0;
            
            data.keywords.forEach(keyword => {
                if (message.includes(keyword)) {
                    score++;
                }
            });
            
            if (score > maxScore) {
                maxScore = score;
                bestMatch = data.response;
            }
        }

        if (bestMatch && maxScore >= 1) {
            return bestMatch;
        }

        // Default response with helpful suggestions
        return `I'd be happy to help! I can assist you with information about:
        
• Finding your nearest stockist
• Gas types and cylinder sizes  
• Rent-free cylinder benefits
• Opening hours and contact details
• Safety and certifications

You can also call us directly at 063 20700 or email sales@stargas.ie for personalized assistance!`;
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    autoResize() {
        const input = document.getElementById('chatbotInput');
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 96) + 'px'; // Max 4rem
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing Stargas Chatbot...');
    try {
        window.stargasChatbot = new StargasChatbot();
    } catch (error) {
        console.error('❌ Error initializing chatbot:', error);
    }
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('🚀 DOM already loaded, initializing Stargas Chatbot immediately...');
    setTimeout(() => {
        try {
            if (!window.stargasChatbot) {
                window.stargasChatbot = new StargasChatbot();
            }
        } catch (error) {
            console.error('❌ Error in fallback initialization:', error);
        }
    }, 100);
}

// Analytics tracking (optional)
function trackChatbotEvent(action, label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Chatbot',
            event_label: label
        });
    }
}