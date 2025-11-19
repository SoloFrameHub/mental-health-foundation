/**
 * Firebase + GenKit Integration for Movement Medicine Lessons
 *
 * This module handles:
 * - Firebase initialization and authentication
 * - Chat widget integration with GenKit chat flow
 * - Assessment flow integration
 * - Firestore data persistence (progress, reflections, prescriptions)
 * - Fallback behavior when Firebase is not yet deployed
 *
 * @version 1.0.0
 * @date November 18, 2025
 */

(function() {
    'use strict';

    // Configuration
    const FIREBASE_CONFIG = {
        // These will be populated when Firebase project is created
        apiKey: null,
        authDomain: null,
        projectId: null,
        storageBucket: null,
        messagingSenderId: null,
        appId: null
    };

    const FUNCTIONS_BASE_URL = 'https://us-central1-mental-health-education.cloudfunctions.net';
    const IS_FIREBASE_AVAILABLE = false; // Set to true when Firebase is deployed

    // State
    let currentUser = null;
    let chatHistory = [];
    let lessonContext = '';

    /**
     * Initialize Firebase and authentication
     */
    async function initializeFirebase() {
        if (!IS_FIREBASE_AVAILABLE) {
            console.log('Firebase not yet deployed - using fallback mode');
            return;
        }

        try {
            // Initialize Firebase
            firebase.initializeApp(FIREBASE_CONFIG);

            // Set up anonymous authentication
            const auth = firebase.auth();
            auth.onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user;
                    console.log('User authenticated:', user.uid);
                    loadUserData();
                } else {
                    // Sign in anonymously
                    auth.signInAnonymously()
                        .then(() => console.log('Signed in anonymously'))
                        .catch((error) => console.error('Anonymous auth error:', error));
                }
            });
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    }

    /**
     * Load user data from Firestore
     */
    async function loadUserData() {
        if (!IS_FIREBASE_AVAILABLE || !currentUser) return;

        try {
            const db = firebase.firestore();
            const userDoc = await db.collection('users').doc(currentUser.uid).get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                console.log('User data loaded:', userData);
                // Could pre-fill forms or personalize content here
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    /**
     * Save user progress to Firestore
     */
    async function saveProgress(lessonId, data) {
        if (!IS_FIREBASE_AVAILABLE || !currentUser) {
            console.log('Progress save (fallback):', { lessonId, data });
            localStorage.setItem(`lesson_${lessonId}_progress`, JSON.stringify(data));
            return;
        }

        try {
            const db = firebase.firestore();
            await db.collection('users').doc(currentUser.uid)
                .collection('progress').doc(lessonId).set({
                    ...data,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });

            console.log('Progress saved to Firestore');
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    /**
     * Chat Widget Management
     */
    const ChatWidget = {
        isOpen: false,
        messagesContainer: null,
        inputField: null,
        sendButton: null,

        init() {
            this.messagesContainer = document.getElementById('chat-messages');
            this.inputField = document.getElementById('chat-input');
            this.sendButton = document.getElementById('chat-send');

            // Toggle button
            document.getElementById('chat-toggle')?.addEventListener('click', () => {
                this.toggle();
            });

            // Close button
            document.getElementById('chat-close')?.addEventListener('click', () => {
                this.close();
            });

            // Send message
            this.sendButton?.addEventListener('click', () => {
                this.sendMessage();
            });

            // Enter to send (Shift+Enter for new line)
            this.inputField?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Set lesson context from page
            const lessonTitle = document.querySelector('h1')?.textContent || 'Movement Medicine Lesson';
            lessonContext = `Lesson: ${lessonTitle}`;
        },

        toggle() {
            const chatWindow = document.getElementById('chat-window');
            if (this.isOpen) {
                this.close();
            } else {
                chatWindow.style.display = 'block';
                this.isOpen = true;
                this.inputField?.focus();
            }
        },

        close() {
            const chatWindow = document.getElementById('chat-window');
            chatWindow.style.display = 'none';
            this.isOpen = false;
        },

        async sendMessage() {
            const message = this.inputField?.value.trim();
            if (!message) return;

            // Add user message to UI
            this.addMessage('user', message);
            this.inputField.value = '';

            // Add to history
            chatHistory.push({ role: 'user', content: message });

            // Show typing indicator
            const typingId = this.addTypingIndicator();

            try {
                let response;

                if (IS_FIREBASE_AVAILABLE) {
                    // Call GenKit chat flow via Cloud Function
                    response = await this.callChatFunction(message);
                } else {
                    // Fallback: simulated David Glenn response
                    response = await this.getFallbackResponse(message);
                }

                // Remove typing indicator
                this.removeTypingIndicator(typingId);

                // Add assistant response
                this.addMessage('assistant', response.response);
                chatHistory.push({ role: 'assistant', content: response.response });

                // Show suggestion chips if provided
                if (response.suggestions && response.suggestions.length > 0) {
                    this.addSuggestions(response.suggestions);
                }

                // Handle crisis detection
                if (response.crisisDetected) {
                    this.showCrisisBanner();
                }
            } catch (error) {
                this.removeTypingIndicator(typingId);
                console.error('Chat error:', error);
                this.addMessage('assistant', 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.');
            }
        },

        async callChatFunction(message) {
            const response = await fetch(`${FUNCTIONS_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    lessonContext,
                    chatHistory: chatHistory.slice(-10), // Last 10 messages for context
                    userProfile: this.getUserProfile()
                })
            });

            if (!response.ok) {
                throw new Error('Chat function failed');
            }

            return await response.json();
        },

        async getFallbackResponse(message) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Simple keyword-based responses in David Glenn's voice
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('self-harm')) {
                return {
                    response: "I'm concerned about what you've shared. Your safety is the priority right now. Please reach out to the 988 Suicide & Crisis Lifeline (call or text 988) or text HOME to 741741 for the Crisis Text Line. These services are free, confidential, and available 24/7. If you're in immediate danger, please call 911 or go to your nearest emergency room.",
                    crisisDetected: true
                };
            }

            if (lowerMessage.includes('research') || lowerMessage.includes('study') || lowerMessage.includes('evidence')) {
                return {
                    response: "The research on exercise for depression is really robust. The SMILE study showed that 30 minutes of moderate exercise, 3 times per week, was as effective as Zoloft for treating depression. What's even more remarkable is that the exercise group had an 8% relapse rate versus 38% for medication-only. \n\nThe TREAD study gave us the therapeutic dose: 16 kcal/kg/week, which translates to about 150 minutes of moderate activity weekly. What specific aspect of the research would you like to explore?",
                    suggestions: ["Tell me more about the SMILE study", "How does exercise compare to therapy?", "What if I can't do 150 minutes?"]
                };
            }

            if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('first step')) {
                return {
                    response: "Starting is often the hardest part, especially when depression is sapping your motivation. In my practice, I've seen the most success with ridiculously small starts. \n\nHere's what I'd suggest: commit to just 10 minutes of walking, three times this week. That's it. Not 30 minutes, not every day - just 10 minutes, three times. After each walk, rate your mood before and after. You'll start building evidence that movement helps, which makes the next session easier. \n\nWhat's one tiny movement you could commit to this week?",
                    suggestions: ["What if I can't even do 10 minutes?", "Should I walk or do something else?", "How do I stay consistent?"]
                };
            }

            if (lowerMessage.includes('motivation') || lowerMessage.includes("can't") || lowerMessage.includes('tired')) {
                return {
                    response: "This is one of depression's cruelest tricks - you need movement to feel better, but depression kills the motivation to move. Here's the key insight: motivation follows action, not the other way around. \n\nI tell my patients to schedule movement like medication. You wouldn't wait to 'feel like' taking your antidepressant, right? Put it in your calendar, set out your shoes the night before, and commit to just 10 minutes with permission to stop if you want. \n\nEighty percent of the time, once you start, you'll continue. Twenty percent of the time you'll stop at 10 minutes - and that's okay, because you still got 10 minutes of the therapeutic dose. \n\nWhat's your biggest barrier right now?",
                    suggestions: ["I have no energy", "I don't have time", "I feel too anxious to exercise"]
                };
            }

            // Generic helpful response
            return {
                response: "That's a great question about exercise and depression. The key principle is that movement is medicine - it works through multiple mechanisms including neurotransmitter production, BDNF elevation, inflammation reduction, and behavioral activation. \n\nWhat I've seen work best in my practice is starting small, tracking the mood benefit, and building consistency before intensity. Every person's starting point is different. \n\nCan you tell me more about where you are in your journey? What specific challenge are you facing?",
                suggestions: ["How do I start?", "What type of exercise is best?", "How long until I see results?"]
            };
        },

        getUserProfile() {
            // TODO: Load from Firestore when available
            return {
                persona: localStorage.getItem('user_persona') || 'general',
                barriers: [],
                fitnessLevel: localStorage.getItem('fitness_level') || 'unknown'
            };
        },

        addMessage(role, content) {
            if (!this.messagesContainer) return;

            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${role}`;

            const textP = document.createElement('p');
            textP.textContent = content;
            messageDiv.appendChild(textP);

            this.messagesContainer.appendChild(messageDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        },

        addTypingIndicator() {
            const typingId = 'typing-' + Date.now();
            const typingDiv = document.createElement('div');
            typingDiv.id = typingId;
            typingDiv.className = 'chat-message assistant typing';
            typingDiv.innerHTML = '<p>David is typing<span class="typing-dots">...</span></p>';
            this.messagesContainer.appendChild(typingDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            return typingId;
        },

        removeTypingIndicator(typingId) {
            const typingDiv = document.getElementById(typingId);
            if (typingDiv) {
                typingDiv.remove();
            }
        },

        addSuggestions(suggestions) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'chat-suggestions';

            suggestions.forEach(suggestion => {
                const chip = document.createElement('button');
                chip.className = 'suggestion-chip';
                chip.textContent = suggestion;
                chip.addEventListener('click', () => {
                    this.inputField.value = suggestion;
                    this.sendMessage();
                    suggestionsDiv.remove();
                });
                suggestionsDiv.appendChild(chip);
            });

            this.messagesContainer.appendChild(suggestionsDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        },

        showCrisisBanner() {
            const banner = document.getElementById('crisis-banner');
            if (banner) {
                banner.style.display = 'block';
                banner.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    /**
     * Assessment Flow Integration
     */
    const AssessmentFlow = {
        currentQuestionIndex: 0,
        answers: [],

        async startAssessment(assessmentType = 'movement-readiness') {
            this.currentQuestionIndex = 0;
            this.answers = [];

            if (IS_FIREBASE_AVAILABLE) {
                // Call GenKit assessment flow
                await this.getNextQuestion(assessmentType);
            } else {
                // Show fallback message
                alert('🔧 Assessment feature coming soon!\n\nThis will use Firebase GenKit to provide an adaptive, personalized assessment that matches you to Maria, Jake, or David and generates your custom prescription.\n\nFor now, you can use the Exercise Prescription Calculator above to get your therapeutic dose.');
            }
        },

        async getNextQuestion(assessmentType) {
            try {
                const response = await fetch(`${FUNCTIONS_BASE_URL}/assess`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        assessmentType,
                        currentAnswers: this.answers,
                        lessonId: this.getCurrentLessonId()
                    })
                });

                const result = await response.json();

                if (result.isComplete) {
                    this.showResults(result.results);
                } else {
                    this.renderQuestion(result.nextQuestion);
                }
            } catch (error) {
                console.error('Assessment error:', error);
                alert('Unable to load assessment. Please try again later.');
            }
        },

        renderQuestion(question) {
            // Render the question in the assessment UI
            const container = document.getElementById('question-container');
            if (!container) return;

            container.innerHTML = `
                <div class="assessment-question">
                    <h3>${question.text}</h3>
                    ${this.renderQuestionInput(question)}
                </div>
            `;
        },

        renderQuestionInput(question) {
            switch (question.type) {
                case 'multiple-choice':
                    return question.options.map((opt, i) => `
                        <label class="assessment-option">
                            <input type="radio" name="current-answer" value="${opt}">
                            ${opt}
                        </label>
                    `).join('');

                case 'scale':
                    return `
                        <div class="scale-input">
                            <input type="range" name="current-answer" min="1" max="10" value="5">
                            <span class="scale-value">5</span>
                        </div>
                    `;

                case 'text':
                    return `<textarea name="current-answer" rows="4"></textarea>`;

                default:
                    return '';
            }
        },

        showResults(results) {
            const resultsContainer = document.getElementById('assessment-results-content');
            if (!resultsContainer) return;

            resultsContainer.innerHTML = `
                <div class="assessment-results">
                    ${results.personaMatch ? `<p><strong>Your persona match:</strong> ${results.personaMatch}</p>` : ''}
                    <p>${results.interpretation}</p>
                    <h4>Recommendations:</h4>
                    <ul>
                        ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            `;

            // Show results screen
            document.getElementById('assessment-questions').style.display = 'none';
            document.getElementById('assessment-results').style.display = 'block';
        },

        getCurrentLessonId() {
            // Extract from URL or page
            return window.location.pathname.split('/').pop().replace('.html', '');
        }
    };

    /**
     * Data Persistence Utilities
     */
    const DataPersistence = {
        async saveReflection(lessonId, reflectionData) {
            if (!IS_FIREBASE_AVAILABLE) {
                // Store in localStorage
                const key = `lesson_${lessonId}_reflections`;
                const existing = JSON.parse(localStorage.getItem(key) || '[]');
                existing.push({
                    ...reflectionData,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem(key, JSON.stringify(existing));
                console.log('Reflection saved to localStorage');
                return;
            }

            // Save to Firestore
            await saveProgress(lessonId, {
                reflections: firebase.firestore.FieldValue.arrayUnion(reflectionData)
            });
        },

        async savePrescription(lessonId, prescriptionData) {
            if (!IS_FIREBASE_AVAILABLE) {
                localStorage.setItem(`lesson_${lessonId}_prescription`, JSON.stringify(prescriptionData));
                console.log('Prescription saved to localStorage');
                return;
            }

            await saveProgress(lessonId, {
                prescription: prescriptionData
            });
        },

        async saveActivationPlan(lessonId, planData) {
            if (!IS_FIREBASE_AVAILABLE) {
                localStorage.setItem(`lesson_${lessonId}_activation_plan`, JSON.stringify(planData));
                console.log('Activation plan saved to localStorage');
                return;
            }

            await saveProgress(lessonId, {
                activationPlan: planData
            });
        }
    };

    /**
     * Initialize everything when DOM is ready
     */
    function initialize() {
        // Initialize Firebase
        initializeFirebase();

        // Initialize chat widget
        ChatWidget.init();

        // Add global functions for other scripts to use
        window.FirebaseIntegration = {
            saveProgress,
            ChatWidget,
            AssessmentFlow,
            DataPersistence,
            isAvailable: IS_FIREBASE_AVAILABLE
        };

        console.log('Firebase integration initialized (fallback mode:', !IS_FIREBASE_AVAILABLE, ')');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
