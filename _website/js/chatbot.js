/**
 * Mental Health Education Platform Chatbot
 * A friendly AI assistant to help visitors navigate the platform
 */

class WellnessChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        this.loadGreeting();
    }

    createChatWidget() {
        const chatHTML = `
            <div id="wellness-chatbot" class="chatbot-container">
                <!-- Chat Toggle Button -->
                <button id="chat-toggle" class="chat-toggle" aria-label="Open chat">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span class="notification-badge" style="display: none;">1</span>
                </button>

                <!-- Chat Window -->
                <div id="chat-window" class="chat-window" style="display: none;">
                    <!-- Header -->
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div>
                                <h3>Wellness Assistant</h3>
                                <p>Here to help you navigate</p>
                            </div>
                        </div>
                        <button id="chat-minimize" class="chat-minimize" aria-label="Close chat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <!-- Messages -->
                    <div id="chat-messages" class="chat-messages">
                        <!-- Messages will be inserted here -->
                    </div>

                    <!-- Quick Actions -->
                    <div id="quick-actions" class="quick-actions">
                        <button class="quick-action-btn" data-action="courses">
                            📚 View Courses
                        </button>
                        <button class="quick-action-btn" data-action="pillars">
                            🏛️ 5 Pillars
                        </button>
                        <button class="quick-action-btn" data-action="pricing">
                            💰 Pricing
                        </button>
                        <button class="quick-action-btn" data-action="help">
                            ❓ Get Help
                        </button>
                    </div>

                    <!-- Input -->
                    <div class="chat-input-container">
                        <input
                            type="text"
                            id="chat-input"
                            class="chat-input"
                            placeholder="Ask me anything..."
                            autocomplete="off"
                        />
                        <button id="chat-send" class="chat-send" aria-label="Send message">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chat-toggle');
        const minimizeBtn = document.getElementById('chat-minimize');
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');
        const quickActions = document.querySelectorAll('.quick-action-btn');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        minimizeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickActions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chat-window');
        const badge = document.querySelector('.notification-badge');

        if (this.isOpen) {
            chatWindow.style.display = 'flex';
            badge.style.display = 'none';
            document.getElementById('chat-input').focus();
        } else {
            chatWindow.style.display = 'none';
        }
    }

    loadGreeting() {
        setTimeout(() => {
            const greetingMessage = this.getGreeting();
            this.addMessage(greetingMessage, 'bot');

            // Show notification badge if chat is closed
            if (!this.isOpen) {
                document.querySelector('.notification-badge').style.display = 'flex';
            }
        }, 1000);
    }

    getGreeting() {
        const hour = new Date().getHours();
        let timeGreeting = 'Hello';

        if (hour < 12) timeGreeting = 'Good morning';
        else if (hour < 18) timeGreeting = 'Good afternoon';
        else timeGreeting = 'Good evening';

        return `${timeGreeting}! 👋 Welcome to the Mental Health Education Platform. I'm here to help you explore our evidence-based mental health courses. How can I assist you today?`;
    }

    addMessage(text, sender = 'bot', options = {}) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        const time = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ text, sender, time });
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        // Simulate response delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 800);
    }

    showTyping() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    handleQuickAction(action) {
        const actions = {
            courses: () => {
                this.addMessage('I want to see the courses', 'user');
                setTimeout(() => {
                    this.addMessage(
                        'We offer 19 comprehensive courses across 5 core pillars of wellness:\n\n' +
                        '🏃 Physical Vitality & Movement\n' +
                        '🧠 Resilience & Cognitive Mastery\n' +
                        '❤️ Relationships & Social Connection\n' +
                        '🎯 Purpose & Leadership Development\n' +
                        '🎨 Creative Expression & Recreational Therapy\n\n' +
                        'Each course is $29.95, or get unlimited access to all courses for $19.95/month. <a href="courses.html">Browse all courses →</a>',
                        'bot'
                    );
                }, 500);
            },
            pillars: () => {
                this.addMessage('Tell me about the 5 Pillars', 'user');
                setTimeout(() => {
                    this.addMessage(
                        'The 5 Pillars framework represents evidence-based domains of comprehensive mental wellness:\n\n' +
                        '1. <strong>Physical Vitality & Movement</strong> - Exercise, workplace wellness, digital balance\n' +
                        '2. <strong>Resilience & Cognitive Mastery</strong> - Growth mindset, CBT, stress management\n' +
                        '3. <strong>Relationships & Social Connection</strong> - Boundaries, friendships, family, romance\n' +
                        '4. <strong>Purpose & Leadership</strong> - Finding meaning, helping others, legacy building\n' +
                        '5. <strong>Creative Expression</strong> - Art therapy, nature, music, play\n\n' +
                        '<a href="index.html#pillars">Learn more about the 5 Pillars →</a>',
                        'bot'
                    );
                }, 500);
            },
            pricing: () => {
                this.addMessage('What are the pricing options?', 'user');
                setTimeout(() => {
                    this.addMessage(
                        '💰 <strong>Pricing Options:</strong>\n\n' +
                        '• <strong>Individual Course:</strong> $29.95 per course\n' +
                        '• <strong>Platform Subscription:</strong> $19.95/month for unlimited access to all 19 courses\n\n' +
                        'All courses include:\n' +
                        '✓ 20 interactive lessons\n' +
                        '✓ Evidence-based content by board-certified professionals\n' +
                        '✓ Self-paced learning\n' +
                        '✓ Mobile-friendly access\n\n' +
                        '<a href="courses.html">Start learning today →</a>',
                        'bot'
                    );
                }, 500);
            },
            help: () => {
                this.addMessage('I need help', 'user');
                setTimeout(() => {
                    this.addMessage(
                        'I\'m here to help! Here are some things I can assist you with:\n\n' +
                        '• Finding the right course for your needs\n' +
                        '• Understanding the 5 Pillars framework\n' +
                        '• Explaining pricing and subscriptions\n' +
                        '• Information about our instructors\n' +
                        '• General questions about mental wellness\n\n' +
                        'Just ask me anything, or contact us at info@digitalwellnessplatform.com',
                        'bot'
                    );
                }, 500);
            }
        };

        if (actions[action]) {
            actions[action]();
        }
    }

    generateResponse(message) {
        const msg = message.toLowerCase();

        // Course inquiries
        if (msg.includes('course') || msg.includes('class') || msg.includes('learn')) {
            return 'We offer 19 evidence-based courses covering everything from Movement Medicine to CBT Fundamentals. Each course has 20 interactive lessons designed by board-certified psychiatric nurse practitioners. Would you like to <a href="courses.html">browse our courses</a> or learn about a specific topic?';
        }

        // Pricing
        if (msg.includes('price') || msg.includes('cost') || msg.includes('subscription') || msg.includes('pay')) {
            return 'Each course is $29.95, or you can get unlimited access to all 19 courses for just $19.95/month with our platform subscription. The subscription is perfect if you want to explore multiple areas of wellness!';
        }

        // 5 Pillars
        if (msg.includes('pillar') || msg.includes('framework')) {
            return 'Our 5 Pillars framework covers: Physical Vitality & Movement, Resilience & Cognitive Mastery, Relationships & Social Connection, Purpose & Leadership Development, and Creative Expression & Recreational Therapy. Each pillar represents a crucial domain of mental wellness. <a href="index.html#pillars">Learn more →</a>';
        }

        // Anxiety/Depression
        if (msg.includes('anxiety') || msg.includes('anxious') || msg.includes('worry')) {
            return 'For anxiety, I recommend checking out our <a href="course-5-cbt-fundamentals/index.html">CBT Fundamentals</a> course and <a href="course-6-stress-challenge-navigation/index.html">Stress & Challenge Navigation</a>. These courses teach evidence-based techniques for managing anxious thoughts and building resilience.';
        }

        if (msg.includes('depress') || msg.includes('sad') || msg.includes('down')) {
            return 'Our <a href="course-1-movement-medicine/index.html">Movement Medicine</a> and <a href="course-4-growth-mindset/index.html">Growth Mindset</a> courses are excellent for addressing depression. Exercise can be as effective as medication for mild to moderate depression, and developing a growth mindset helps transform your relationship with challenges.';
        }

        // Relationships
        if (msg.includes('relationship') || msg.includes('partner') || msg.includes('marriage') || msg.includes('dating')) {
            return 'Check out our <a href="course-10-relationship-dynamics/index.html">Relationship Dynamics</a> course! It covers the neuroscience of love, attachment styles, and communication skills for thriving romantic partnerships.';
        }

        // Boundaries
        if (msg.includes('boundar') || msg.includes('saying no') || msg.includes('people pleasing')) {
            return 'Our <a href="course-7-boundaries-bootcamp/index.html">Boundaries Bootcamp</a> is perfect for you! Learn to establish healthy boundaries while honoring your needs and values without guilt.';
        }

        // Work/Career
        if (msg.includes('work') || msg.includes('job') || msg.includes('career') || msg.includes('burnout')) {
            return 'The <a href="course-2-workplace-mental-health/index.html">Workplace Mental Health</a> course is designed for you! It covers managing stress, preventing burnout, and creating psychological safety in professional environments.';
        }

        // Beginner
        if (msg.includes('start') || msg.includes('begin') || msg.includes('first') || msg.includes('new')) {
            return 'Great question! I recommend starting with either <a href="course-4-growth-mindset/index.html">The Growth Mindset</a> or <a href="course-5-cbt-fundamentals/index.html">CBT Fundamentals</a> - they provide foundational mental health skills. Or explore our <a href="index.html#pillars">5 Pillars</a> to find what resonates most with you!';
        }

        // Instructors
        if (msg.includes('instructor') || msg.includes('teacher') || msg.includes('who created') || msg.includes('credentials')) {
            return 'All courses are created by board-certified psychiatric nurse practitioners with 14+ years of clinical experience. Our team combines evidence-based research with practical clinical expertise. <a href="instructors.html">Meet our instructors →</a>';
        }

        // General wellness
        if (msg.includes('mental health') || msg.includes('wellness') || msg.includes('wellbeing')) {
            return 'Mental wellness is multifaceted! Our platform addresses it through 5 key domains: physical vitality, cognitive resilience, social connection, purpose, and creative expression. Each pillar supports the others for comprehensive wellbeing. What area interests you most?';
        }

        // Gratitude/Thanks
        if (msg.includes('thank') || msg.includes('thanks')) {
            return 'You\'re very welcome! I\'m here whenever you need help. Feel free to ask me anything else about our courses or platform. 😊';
        }

        // Help
        if (msg.includes('help') || msg.includes('support')) {
            return 'I\'m here to help! You can ask me about:\n• Finding the right course\n• Understanding our 5 Pillars\n• Pricing and subscriptions\n• Specific mental health topics\n• Our instructors\n\nWhat would you like to know?';
        }

        // Default response
        return 'That\'s a great question! While I can help with general information about our courses and platform, for specific mental health concerns, our courses provide comprehensive, evidence-based guidance. Would you like me to recommend a course based on your interests? Or you can <a href="courses.html">browse all courses</a>.';
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new WellnessChatbot();
    });
} else {
    new WellnessChatbot();
}
