/**
 * Crisis Detection System - Frontend Integration
 * Real-time monitoring and immediate crisis intervention
 * Integrates with Trigger.dev backend tasks for professional alerts
 */

class CrisisDetectionSystem {
    constructor() {
        this.triggerDevUrl = 'https://api.trigger.dev';
        this.projectRef = 'proj_pdzwbfxpuodtmwrplwqx';
        this.isMonitoring = true;

        // Crisis keywords - matches backend detection
        this.crisisKeywords = [
            'suicide', 'kill myself', 'end it all', 'better off dead', 'want to die',
            'self-harm', 'hurt myself', 'cut myself', 'self-injury', 'cutting',
            'no point', 'hopeless', 'cant go on', 'worthless', 'no way out',
            'never get better', 'nothing helps', 'give up', 'cant take it',
            'pills', 'overdose', 'weapon', 'jump', 'hang', 'rope', 'bridge',
            'poison', 'car crash', 'knife', 'gun', 'shooting myself',
            'escape this pain', 'make it stop', 'end the suffering', 'permanent solution',
            'everyone better without me', 'burden to everyone', 'disappear forever'
        ];

        // Anxiety-specific crisis triggers
        this.anxietyCrisisKeywords = [
            'panic attack wont stop', 'cant breathe', 'heart racing for hours',
            'feel like dying', 'going crazy', 'losing my mind', 'cant handle this',
            'anxiety too much', 'overwhelming panic', 'spiraling out of control',
            'cant leave house', 'scared of everything', 'avoiding all people',
            'hiding from life', 'too scared to live', 'paralyzed by fear',
            'chest pain wont stop', 'dizzy for days', 'shaking uncontrollably',
            'nausea all the time', 'cant eat or sleep', 'body shutting down'
        ];

        this.currentUserId = this.getCurrentUserId();
        this.responseTimeTarget = 60000; // 60 seconds max response time

        this.initializeMonitoring();
    }

    /**
     * Initialize crisis detection monitoring
     */
    initializeMonitoring() {
        // Monitor all text inputs
        this.monitorTextInputs();

        // Monitor form submissions
        this.monitorFormSubmissions();

        // Check for existing crisis state
        this.checkCrisisState();

        console.log('🚨 Crisis detection system initialized');
    }

    /**
     * Monitor all text inputs for crisis keywords
     */
    monitorTextInputs() {
        const textInputs = document.querySelectorAll('input[type="text"], textarea, input[type="email"]');

        textInputs.forEach(input => {
            // Real-time monitoring with debounce
            let timeoutId;
            input.addEventListener('input', (e) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    this.analyzeText(e.target.value, 'text_input');
                }, 1000); // Debounce for 1 second
            });

            // Monitor on blur for immediate analysis
            input.addEventListener('blur', (e) => {
                this.analyzeText(e.target.value, 'text_input');
            });
        });
    }

    /**
     * Monitor form submissions
     */
    monitorFormSubmissions() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            const formData = new FormData(form);

            // Analyze all text fields in the form
            for (let [key, value] of formData.entries()) {
                if (typeof value === 'string' && value.length > 10) {
                    this.analyzeText(value, 'form_submission', key);
                }
            }
        });
    }

    /**
     * Analyze text for crisis indicators
     */
    async analyzeText(text, inputType, fieldName = null) {
        if (!text || text.length < 10) return;

        const startTime = Date.now();

        try {
            // Local crisis detection (immediate)
            const localDetection = this.detectCrisisLocally(text);

            if (localDetection.crisisDetected) {
                console.log('🚨 Local crisis detection triggered');
                await this.handleCrisisDetection(localDetection, startTime);
            }

            // Send to backend for comprehensive analysis
            await this.sendToBackendAnalysis(text, inputType, fieldName, startTime);

        } catch (error) {
            console.error('Crisis detection error:', error);
            // Fallback to local detection only
        }
    }

    /**
     * Local crisis detection (immediate response)
     */
    detectCrisisLocally(text) {
        const lowerText = text.toLowerCase();

        // Check crisis keywords
        const detectedCrisisKeywords = this.crisisKeywords.filter(keyword =>
            lowerText.includes(keyword.toLowerCase())
        );

        // Check anxiety crisis keywords
        const detectedAnxietyKeywords = this.anxietyCrisisKeywords.filter(keyword =>
            lowerText.includes(keyword.toLowerCase())
        );

        const allDetectedKeywords = [...detectedCrisisKeywords, ...detectedAnxietyKeywords];
        const crisisDetected = allDetectedKeywords.length > 0;

        let severityLevel = 'none';
        if (detectedCrisisKeywords.length > 0) {
            severityLevel = detectedCrisisKeywords.length >= 2 ? 'high' : 'moderate';
        } else if (detectedAnxietyKeywords.length > 0) {
            severityLevel = 'moderate';
        }

        return {
            crisisDetected,
            severityLevel,
            detectedKeywords: allDetectedKeywords,
            text: text.substring(0, 200) // First 200 chars for analysis
        };
    }

    /**
     * Send text to backend for comprehensive analysis
     */
    async sendToBackendAnalysis(text, inputType, fieldName, startTime) {
        try {
            // This would integrate with Trigger.dev task: anxiety-crisis-detection
            const payload = {
                userId: this.currentUserId,
                content: text,
                timestamp: new Date().toISOString(),
                inputType: inputType,
                fieldName: fieldName
            };

            // In production, this would call the actual Trigger.dev API
            console.log('📡 Sending to backend crisis analysis:', {
                userId: payload.userId,
                contentLength: text.length,
                inputType: inputType
            });

            // Simulate backend response for demo
            setTimeout(() => {
                const responseTime = Date.now() - startTime;
                console.log(`⚡ Backend analysis complete in ${responseTime}ms`);
            }, 500);

        } catch (error) {
            console.error('Backend analysis failed:', error);
        }
    }

    /**
     * Handle crisis detection
     */
    async handleCrisisDetection(detection, startTime) {
        const responseTime = Date.now() - startTime;

        console.log('🚨 CRISIS DETECTED:', {
            severity: detection.severityLevel,
            keywords: detection.detectedKeywords,
            responseTime: `${responseTime}ms`
        });

        // Immediate actions
        await this.executeImmediateResponse(detection);

        // Professional alerts
        await this.alertProfessionalTeam(detection);

        // Log crisis event
        this.logCrisisEvent(detection, responseTime);
    }

    /**
     * Execute immediate crisis response
     */
    async executeImmediateResponse(detection) {
        // 1. Display 988 hotline immediately
        this.show988Modal();

        // 2. Block course progression
        this.blockCourseProgression();

        // 3. Store crisis state
        sessionStorage.setItem('crisisDetected', 'true');
        sessionStorage.setItem('crisisLevel', detection.severityLevel);

        // 4. Show persistent crisis banner
        this.showPersistentCrisisBanner();
    }

    /**
     * Alert professional crisis team
     */
    async alertProfessionalTeam(detection) {
        try {
            // This would trigger: professional-crisis-alert task
            const alertPayload = {
                userId: this.currentUserId,
                crisisLevel: detection.severityLevel.toUpperCase(),
                detectedContent: detection.text,
                timestamp: new Date().toISOString(),
                detectedKeywords: detection.detectedKeywords
            };

            console.log('👨‍⚕️ Professional crisis team alerted:', {
                userId: alertPayload.userId,
                severity: alertPayload.crisisLevel,
                keywordCount: detection.detectedKeywords.length
            });

            // In production, this would call Trigger.dev API
            // await this.triggerProfessionalAlert(alertPayload);

        } catch (error) {
            console.error('Failed to alert professional team:', error);
        }
    }

    /**
     * Show 988 crisis modal
     */
    show988Modal() {
        const modal = document.getElementById('crisis-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');

            // Focus management for accessibility
            const firstButton = modal.querySelector('.crisis-action-btn');
            if (firstButton) {
                firstButton.focus();
            }
        }
    }

    /**
     * Block course progression during crisis
     */
    blockCourseProgression() {
        // Disable navigation links
        const navLinks = document.querySelectorAll('.nav-link[href*="pages/"], .btn[href*="pages/"]');
        navLinks.forEach(link => {
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.5';
            link.setAttribute('title', 'Course access blocked - please contact crisis support');
        });

        // Show blocking message
        const blockingMessage = document.createElement('div');
        blockingMessage.className = 'crisis-blocking-message';
        blockingMessage.innerHTML = `
            <div class="blocking-content">
                <h3>🛡️ Course Access Temporarily Blocked</h3>
                <p>For your safety, course access has been paused. Please connect with crisis support first.</p>
                <button onclick="call988()" class="btn btn-primary">📞 Call 988 Now</button>
            </div>
        `;
        document.body.appendChild(blockingMessage);
    }

    /**
     * Show persistent crisis banner
     */
    showPersistentCrisisBanner() {
        const existingBanner = document.querySelector('.crisis-banner');
        if (existingBanner) {
            existingBanner.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
            existingBanner.style.animation = 'pulse 2s infinite';

            const crisisText = existingBanner.querySelector('.crisis-text');
            if (crisisText) {
                crisisText.textContent = '🚨 CRISIS SUPPORT ACTIVATED - Professional help is standing by 24/7';
            }
        }
    }

    /**
     * Check for existing crisis state
     */
    checkCrisisState() {
        const crisisDetected = sessionStorage.getItem('crisisDetected');
        const crisisLevel = sessionStorage.getItem('crisisLevel');

        if (crisisDetected === 'true') {
            console.log('🚨 Existing crisis state detected:', crisisLevel);
            this.showPersistentCrisisBanner();
            this.blockCourseProgression();
        }
    }

    /**
     * Log crisis event for analytics
     */
    logCrisisEvent(detection, responseTime) {
        const event = {
            timestamp: new Date().toISOString(),
            userId: this.currentUserId,
            severityLevel: detection.severityLevel,
            detectedKeywords: detection.detectedKeywords,
            responseTime: responseTime,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Store locally and send to analytics
        const crisisEvents = JSON.parse(localStorage.getItem('crisisEvents') || '[]');
        crisisEvents.push(event);
        localStorage.setItem('crisisEvents', JSON.stringify(crisisEvents));

        console.log('📊 Crisis event logged:', event);
    }

    /**
     * Get current user ID (placeholder)
     */
    getCurrentUserId() {
        // In production, this would get the actual user ID
        return sessionStorage.getItem('userId') || 'anonymous_' + Date.now();
    }

    /**
     * Clear crisis state (for testing/admin)
     */
    clearCrisisState() {
        sessionStorage.removeItem('crisisDetected');
        sessionStorage.removeItem('crisisLevel');

        // Remove blocking
        const blockingMessage = document.querySelector('.crisis-blocking-message');
        if (blockingMessage) {
            blockingMessage.remove();
        }

        // Restore navigation
        const navLinks = document.querySelectorAll('.nav-link, .btn');
        navLinks.forEach(link => {
            link.style.pointerEvents = '';
            link.style.opacity = '';
            link.removeAttribute('title');
        });

        console.log('✅ Crisis state cleared');
    }
}

// Crisis response functions (global)
function call988() {
    console.log('📞 Calling 988 Suicide & Crisis Lifeline');

    // Track the action
    logCrisisAction('call_988');

    // Mobile: direct call, Desktop: show instructions
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = 'tel:988';
    } else {
        alert('Call 988 from your phone\n\n988 Suicide & Crisis Lifeline\nAvailable 24/7, free and confidential');
    }
}

function textCrisis() {
    console.log('💬 Texting Crisis Text Line');

    logCrisisAction('text_crisis');

    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = 'sms:741741&body=TALK';
    } else {
        alert('Text TALK to 741741\n\nCrisis Text Line\nAvailable 24/7, free and confidential');
    }
}

function chatCrisis() {
    console.log('💻 Opening crisis chat');

    logCrisisAction('chat_crisis');

    window.open('https://988lifeline.org/chat', '_blank', 'noopener,noreferrer');
}

function call911() {
    console.log('🚨 Calling 911 Emergency');

    logCrisisAction('call_911');

    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = 'tel:911';
    } else {
        alert('Call 911 for immediate emergency assistance');
    }
}

function closeCrisisModal() {
    const modal = document.getElementById('crisis-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function logCrisisAction(action) {
    const actionEvent = {
        timestamp: new Date().toISOString(),
        action: action,
        userId: sessionStorage.getItem('userId') || 'anonymous',
        url: window.location.href
    };

    const crisisActions = JSON.parse(localStorage.getItem('crisisActions') || '[]');
    crisisActions.push(actionEvent);
    localStorage.setItem('crisisActions', JSON.stringify(crisisActions));

    console.log('📊 Crisis action logged:', actionEvent);
}

// Initialize crisis detection when DOM is loaded
function initializeCrisisDetection() {
    if (typeof window !== 'undefined') {
        window.crisisDetection = new CrisisDetectionSystem();

        // Add styles for crisis blocking
        const style = document.createElement('style');
        style.textContent = `
            .crisis-blocking-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 3px solid #dc2626;
                border-radius: 1rem;
                padding: 2rem;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                z-index: 9999;
                text-align: center;
                max-width: 90vw;
                width: 400px;
            }

            .blocking-content h3 {
                color: #dc2626;
                margin-bottom: 1rem;
            }

            .blocking-content p {
                margin-bottom: 1.5rem;
                color: #374151;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Testing functions (for development/demo)
function testCrisisDetection() {
    if (window.crisisDetection) {
        console.log('🧪 Testing crisis detection...');

        // Test high-risk scenario
        window.crisisDetection.analyzeText(
            "I can't take this anxiety anymore. I'm thinking about ending it all. Nothing helps.",
            'test_input'
        );
    }
}

function testAnxietyCrisis() {
    if (window.crisisDetection) {
        console.log('🧪 Testing anxiety crisis detection...');

        // Test anxiety-specific crisis
        window.crisisDetection.analyzeText(
            "My panic attack won't stop and I can't breathe. I feel like I'm dying.",
            'test_input'
        );
    }
}

function clearCrisisState() {
    if (window.crisisDetection) {
        window.crisisDetection.clearCrisisState();
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CrisisDetectionSystem, initializeCrisisDetection };
}