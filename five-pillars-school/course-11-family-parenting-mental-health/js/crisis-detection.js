/**
 * Crisis Detection System
 * Monitors user input for crisis indicators and provides immediate support
 * Based on evidence-based mental health screening and crisis intervention protocols
 */

class CrisisDetectionSystem {
    constructor(config = {}) {
        this.config = {
            // Directus endpoint for logging events
            endpoint: config.endpoint || '/api/directus',

            // Practitioner notification settings
            practitionerId: config.practitionerId || null,
            enablePractitionerAlerts: config.enablePractitionerAlerts || true,

            // Detection sensitivity (1-5, where 5 is most sensitive)
            sensitivity: config.sensitivity || 3,

            // Resources to display
            crisisResources: config.crisisResources || this.getDefaultResources(),

            // Debug mode
            debug: config.debug || false,

            ...config
        };

        this.crisisKeywords = this.getCrisisKeywords();
        this.isActive = true;
        this.lastDetection = null;

        this.init();
    }

    init() {
        // Monitor text inputs across the lesson
        this.setupInputMonitoring();

        // Monitor quiz/assessment responses
        this.setupAssessmentMonitoring();

        // Setup crisis banner
        this.setupCrisisBanner();

        if (this.config.debug) {
            console.log('Crisis Detection System initialized', this.config);
        }
    }

    /**
     * Crisis keywords categorized by severity and type
     */
    getCrisisKeywords() {
        return {
            // High severity - immediate intervention
            critical: [
                'kill myself', 'end my life', 'commit suicide', 'take my own life',
                'not worth living', 'better off dead', 'end it all',
                'hurt myself', 'harm myself', 'cut myself',
                'overdose', 'jump off', 'hang myself'
            ],

            // Moderate severity - significant concern
            high: [
                'want to die', 'wish I was dead', 'life is pointless',
                'no reason to live', 'everyone would be better without me',
                'can\'t go on', 'can\'t take it anymore', 'give up on life',
                'nothing matters', 'what\'s the point', 'no hope left'
            ],

            // Lower severity but concerning
            moderate: [
                'feel hopeless', 'so depressed', 'can\'t cope',
                'overwhelming sadness', 'empty inside', 'numb all the time',
                'panic attacks daily', 'can\'t sleep for days', 'stopped eating',
                'isolating from everyone', 'everything is falling apart'
            ],

            // Contextual phrases that may indicate distress
            contextual: [
                'cry all the time', 'can\'t function', 'lost all motivation',
                'scared all the time', 'intrusive thoughts', 'racing thoughts',
                'feel like a burden', 'disappointing everyone', 'failing at everything'
            ]
        };
    }

    /**
     * Default crisis resources
     */
    getDefaultResources() {
        return [
            {
                name: '988 Suicide & Crisis Lifeline',
                type: 'phone',
                contact: '988',
                description: 'Free, confidential crisis support 24/7',
                action: 'call'
            },
            {
                name: 'Crisis Text Line',
                type: 'text',
                contact: '741741',
                description: 'Text HOME for immediate support',
                action: 'text'
            },
            {
                name: 'Emergency Services',
                type: 'emergency',
                contact: '911',
                description: 'For immediate danger situations',
                action: 'call'
            }
        ];
    }

    /**
     * Monitor all text inputs for crisis language
     */
    setupInputMonitoring() {
        // Journal entries
        document.addEventListener('input', (event) => {
            if (event.target.matches('textarea[data-action="autoSaveJournal"]')) {
                this.analyzeText(event.target.value, 'journal', event.target);
            }
        });

        // Quiz responses (text inputs)
        document.addEventListener('input', (event) => {
            if (event.target.closest('.quiz-container')) {
                this.analyzeText(event.target.value, 'quiz', event.target);
            }
        });

        // Worksheet submissions
        document.addEventListener('input', (event) => {
            if (event.target.closest('.worksheet')) {
                this.analyzeText(event.target.value, 'worksheet', event.target);
            }
        });
    }

    /**
     * Monitor quiz/assessment scores for crisis thresholds
     */
    setupAssessmentMonitoring() {
        document.addEventListener('click', (event) => {
            if (event.target.matches('button[onclick*="scoreGAD7"]') ||
                event.target.matches('button[onclick*="scorePHQ9"]')) {

                setTimeout(() => {
                    this.checkAssessmentScores();
                }, 100);
            }
        });
    }

    /**
     * Analyze text for crisis indicators
     */
    analyzeText(text, source, element) {
        if (!text || text.length < 10) return; // Skip very short inputs

        const analysis = {
            text: text.toLowerCase(),
            source: source,
            detectedKeywords: [],
            severityLevel: 'none',
            riskScore: 0
        };

        // Check each severity level
        for (const [level, keywords] of Object.entries(this.crisisKeywords)) {
            const detected = keywords.filter(keyword =>
                analysis.text.includes(keyword.toLowerCase())
            );

            if (detected.length > 0) {
                analysis.detectedKeywords.push(...detected);
                analysis.severityLevel = level;

                // Calculate risk score
                switch (level) {
                    case 'critical': analysis.riskScore += detected.length * 10; break;
                    case 'high': analysis.riskScore += detected.length * 7; break;
                    case 'moderate': analysis.riskScore += detected.length * 4; break;
                    case 'contextual': analysis.riskScore += detected.length * 2; break;
                }
            }
        }

        // Apply sensitivity adjustment
        analysis.riskScore *= (this.config.sensitivity / 3);

        // Trigger response if needed
        if (analysis.riskScore >= 7 || analysis.severityLevel === 'critical') {
            this.triggerCrisisResponse(analysis, element);
        } else if (analysis.riskScore >= 4) {
            this.showSupportReminder(analysis, element);
        }

        // Log event (if enabled)
        this.logCrisisEvent(analysis);
    }

    /**
     * Check clinical assessment scores (GAD-7, PHQ-9, etc.)
     */
    checkAssessmentScores() {
        const gad7Score = this.calculateGAD7Score();
        const phq9Score = this.calculatePHQ9Score();

        if (gad7Score >= 15 || phq9Score >= 20) {
            this.triggerCrisisResponse({
                source: 'clinical_assessment',
                severityLevel: 'high',
                riskScore: 10,
                assessmentScores: { gad7: gad7Score, phq9: phq9Score }
            });
        } else if (gad7Score >= 10 || phq9Score >= 15) {
            this.showSupportReminder({
                source: 'clinical_assessment',
                severityLevel: 'moderate',
                riskScore: 6,
                assessmentScores: { gad7: gad7Score, phq9: phq9Score }
            });
        }
    }

    /**
     * Calculate GAD-7 score from form
     */
    calculateGAD7Score() {
        const form = document.getElementById('gad7');
        if (!form) return 0;

        const formData = new FormData(form);
        let total = 0;

        for (let value of formData.values()) {
            total += parseInt(value) || 0;
        }

        return total;
    }

    /**
     * Calculate PHQ-9 score from form
     */
    calculatePHQ9Score() {
        const form = document.getElementById('phq9');
        if (!form) return 0;

        const formData = new FormData(form);
        let total = 0;

        for (let value of formData.values()) {
            total += parseInt(value) || 0;
        }

        return total;
    }

    /**
     * Trigger immediate crisis response
     */
    triggerCrisisResponse(analysis, element = null) {
        this.lastDetection = {
            ...analysis,
            timestamp: new Date().toISOString(),
            responded: false
        };

        // Show crisis banner immediately
        this.showCrisisBanner('high');

        // Alert practitioner (if configured)
        if (this.config.enablePractitionerAlerts && this.config.practitionerId) {
            this.alertPractitioner(analysis);
        }

        // Add visual indicator to the element
        if (element) {
            this.addCrisisIndicator(element, 'high');
        }

        // Track the event
        this.trackCrisisEvent('crisis_detected', analysis);

        if (this.config.debug) {
            console.warn('Crisis response triggered:', analysis);
        }
    }

    /**
     * Show gentle support reminder
     */
    showSupportReminder(analysis, element = null) {
        // Show less urgent support message
        const supportDiv = document.createElement('div');
        supportDiv.className = 'alert alert-info border-info mt-2';
        supportDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-heart text-info me-2"></i>
                <div class="flex-grow-1">
                    <small><strong>Remember:</strong> Support is always available if you need it.</small>
                </div>
                <button class="btn btn-outline-info btn-sm" onclick="crisisDetection.showCrisisBanner('moderate')">
                    Get Support
                </button>
            </div>
        `;

        // Insert after the element
        if (element && element.parentNode) {
            element.parentNode.insertBefore(supportDiv, element.nextSibling);

            // Remove after 10 seconds
            setTimeout(() => {
                if (supportDiv.parentNode) {
                    supportDiv.parentNode.removeChild(supportDiv);
                }
            }, 10000);
        }

        this.trackCrisisEvent('support_reminder', analysis);
    }

    /**
     * Setup and show crisis banner
     */
    setupCrisisBanner() {
        const banner = document.getElementById('crisis-banner');
        if (banner) {
            banner.innerHTML = this.generateCrisisBannerHTML();
        }
    }

    showCrisisBanner(severity = 'high') {
        const banner = document.getElementById('crisis-banner');
        if (!banner) return;

        banner.className = `crisis-banner ${severity}`;
        banner.style.display = 'block';

        // Scroll to top to ensure visibility
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Auto-hide after 30 seconds unless high severity
        if (severity !== 'high') {
            setTimeout(() => {
                this.hideCrisisBanner();
            }, 30000);
        }
    }

    hideCrisisBanner() {
        const banner = document.getElementById('crisis-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    /**
     * Generate crisis banner HTML
     */
    generateCrisisBannerHTML() {
        return `
            <div class="crisis-content">
                <h3>🆘 Immediate Support Available</h3>
                <p>If you're experiencing thoughts of self-harm or crisis, please reach out immediately:</p>
                <div class="crisis-contacts">
                    ${this.config.crisisResources.map(resource => `
                        <a href="${resource.action}:${resource.contact}" class="crisis-link btn btn-danger me-2 mb-2">
                            ${resource.action === 'call' ? '📞' : '💬'} ${resource.name}
                        </a>
                    `).join('')}
                </div>
                <div class="crisis-additional mt-3">
                    <button class="btn btn-warning" onclick="crisisDetection.alertPractitioner()">
                        📧 Contact My Practitioner
                    </button>
                    <button class="btn btn-info" onclick="crisisDetection.showCopingStrategies()">
                        🧘 Show Coping Strategies
                    </button>
                </div>
            </div>
            <button class="crisis-close btn-close" onclick="crisisDetection.hideCrisisBanner()"></button>
        `;
    }

    /**
     * Add visual crisis indicator to form element
     */
    addCrisisIndicator(element, severity) {
        element.classList.add('border-warning');

        const indicator = document.createElement('div');
        indicator.className = `crisis-indicator ${severity}`;
        indicator.innerHTML = `
            <small class="text-warning">
                <i class="bi bi-exclamation-triangle"></i>
                Your response indicates you may need support. Resources are available above.
            </small>
        `;

        element.parentNode.insertBefore(indicator, element.nextSibling);
    }

    /**
     * Alert practitioner
     */
    async alertPractitioner(analysis = null) {
        if (!this.config.practitionerId) return;

        const alertData = {
            practitioner_id: this.config.practitionerId,
            analysis: analysis || this.lastDetection,
            user_message: 'User has been flagged for potential crisis intervention',
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(`${this.config.endpoint}/items/crisis_events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.getCurrentUserId(),
                    trigger_type: 'system_detected',
                    trigger_data: alertData,
                    severity_level: analysis?.severityLevel || 'high',
                    resources_displayed: true,
                    practitioner_alerted: true,
                    practitioner_id: this.config.practitionerId,
                    follow_up_required: true
                })
            });

            if (response.ok) {
                this.showNotification('Your practitioner has been notified and will follow up with you.', 'success');
            }
        } catch (error) {
            console.error('Failed to alert practitioner:', error);
            this.showNotification('Unable to contact practitioner. Please call directly if needed.', 'warning');
        }
    }

    /**
     * Show coping strategies
     */
    showCopingStrategies() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">🧘 Immediate Coping Strategies</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="coping-strategy mb-3">
                            <h6>5-4-3-2-1 Grounding</h6>
                            <p>Name: 5 things you see, 4 things you hear, 3 things you feel, 2 things you smell, 1 thing you taste.</p>
                        </div>
                        <div class="coping-strategy mb-3">
                            <h6>Box Breathing</h6>
                            <p>Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat 5 times.</p>
                        </div>
                        <div class="coping-strategy mb-3">
                            <h6>Progressive Muscle Relaxation</h6>
                            <p>Tense and release each muscle group, starting from your toes to your head.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Remove modal after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    /**
     * Log crisis events to Directus
     */
    async logCrisisEvent(analysis) {
        if (!this.config.endpoint) return;

        try {
            await fetch(`${this.config.endpoint}/items/user_activity_log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.getCurrentUserId(),
                    activity_type: 'crisis_detection',
                    activity_data: {
                        analysis: analysis,
                        lesson_id: window.LESSON_CONFIG?.id,
                        course_id: window.LESSON_CONFIG?.courseId
                    }
                })
            });
        } catch (error) {
            if (this.config.debug) {
                console.error('Failed to log crisis event:', error);
            }
        }
    }

    /**
     * Track crisis events for analytics
     */
    trackCrisisEvent(eventType, data) {
        // Send to analytics if configured
        if (window.gtag) {
            gtag('event', 'crisis_detection', {
                event_category: 'safety',
                event_label: eventType,
                value: data.riskScore
            });
        }
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        document.body.appendChild(toast);
        const bootstrapToast = new bootstrap.Toast(toast);
        bootstrapToast.show();

        // Remove after hiding
        toast.addEventListener('hidden.bs.toast', () => {
            document.body.removeChild(toast);
        });
    }

    /**
     * Get current user ID (would integrate with auth system)
     */
    getCurrentUserId() {
        // This would integrate with your authentication system
        return localStorage.getItem('user_id') || 'anonymous';
    }

    /**
     * Disable crisis detection temporarily
     */
    disable() {
        this.isActive = false;
    }

    /**
     * Re-enable crisis detection
     */
    enable() {
        this.isActive = true;
    }
}

// Global instance
window.CrisisDetectionSystem = CrisisDetectionSystem;

// Auto-initialize if lesson config is available
document.addEventListener('DOMContentLoaded', function() {
    if (window.LESSON_CONFIG) {
        window.crisisDetection = new CrisisDetectionSystem({
            practitionerId: window.LESSON_CONFIG.practitioner?.id,
            crisisKeywords: window.LESSON_CONFIG.crisisKeywords || [],
            endpoint: window.LESSON_CONFIG.directus?.endpoint,
            debug: window.location.hostname === 'localhost'
        });
    }
});