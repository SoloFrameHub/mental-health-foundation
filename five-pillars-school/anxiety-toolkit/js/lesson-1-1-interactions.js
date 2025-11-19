/**
 * Lesson 1.1: Your Anxiety - What's Really Happening
 * Interactive components: Body Map, Typebot Assessment, Forms.io Quiz
 */

// Import utilities if available
const utils = window.AnxietyToolkitUtils || {};

// ========================================
// Body Map Data
// ========================================

const anxietyBodyMap = {
    head: {
        label: "Mind & Thoughts",
        whatYouFeel: "Racing thoughts, difficulty concentrating, worry spirals, catastrophic thinking, feeling like your mind won't shut off",
        theScience: "Prefrontal cortex and amygdala activation. The amygdala (alarm center) triggers within 23 milliseconds of perceived threat, while the prefrontal cortex (thinking brain) tries to interpret and regulate. Research by LeDoux (2015) shows anxiety involves dual pathway processing - a fast automatic route and a slower conscious route.",
        whyItHappens: "Your brain evolved to detect threats. In anxiety, the alarm system becomes oversensitive, triggering on false alarms. The thinking brain then amplifies the threat through worried thoughts, creating a feedback loop.",
        citation: "LeDoux, J. E. (2015). Anxious: Using the Brain to Understand and Treat Fear and Anxiety. Viking."
    },
    chest: {
        label: "Heart & Breathing",
        whatYouFeel: "Racing heart, pounding in chest, tightness, difficulty breathing, feeling like you can't get enough air, chest pressure",
        theScience: "Sympathetic nervous system activation. Your body releases adrenaline and cortisol, increasing heart rate from resting (60-80 bpm) to 100-140+ bpm. Breathing shifts from diaphragmatic (8-12 breaths/min) to chest-based rapid breathing (16-24 breaths/min). Research by Porges (2011) on Polyvagal Theory explains how autonomic nervous system states affect heart and breathing.",
        whyItHappens: "Your body is preparing for 'fight or flight.' Blood pumps faster to deliver oxygen to muscles. Breathing increases to take in more oxygen. This is an adaptive survival response, but when triggered unnecessarily, it feels terrifying.",
        citation: "Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions. Norton."
    },
    stomach: {
        label: "Gut & Digestion",
        whatYouFeel: "Butterflies, nausea, stomach churning, diarrhea or constipation, loss of appetite, feeling like you need to use bathroom urgently",
        theScience: "The gut-brain axis and enteric nervous system. Your digestive system has over 100 million neurons and produces 95% of your body's serotonin. When the sympathetic system activates, digestion shuts down (blood diverts to muscles). Research by Mayer (2016) shows bidirectional communication between gut and brain in anxiety.",
        whyItHappens: "Digestion is a 'rest and digest' function. When your body thinks you're in danger, it shuts down non-essential functions like digestion. The gut is highly sensitive to stress signals from the brain.",
        citation: "Mayer, E. A. (2016). The Mind-Gut Connection. Harper Wave."
    },
    hands: {
        label: "Hands & Actions",
        whatYouFeel: "Trembling, shaking, sweaty palms, fidgeting, restlessness, clenched fists, need to move or do something",
        theScience: "Motor cortex activation and muscle tension. Adrenaline causes fine motor tremors and increases muscle tone. Your body is preparing for action. EMG studies show increased muscle electrical activity during anxiety states, even when sitting still.",
        whyItHappens: "Your body has mobilized energy for action (fight or flight). When you don't actually fight or flee, that energy has nowhere to go, creating restlessness, trembling, and the urge to move.",
        citation: "Gross, J. J. (2002). Emotion regulation: Affective, cognitive, and social consequences. Psychophysiology, 39, 281-291."
    },
    legs: {
        label: "Legs & Grounding",
        whatYouFeel: "Jelly legs, weakness, shakiness, feeling unsteady, dizziness, feeling like you might collapse",
        theScience: "Blood flow redistribution and proprioception disruption. During anxiety, blood vessels in extremities constrict (preparing for potential injury). This can cause sensations of weakness. The vestibular system (balance) is also affected by stress hormones.",
        whyItHappens: "Your body is prioritizing vital organs over extremities. The sensation of weak legs is actually your body preparing to run - it's loosening muscles for rapid movement. The feeling is uncomfortable but not dangerous.",
        citation: "Balaban, C. D., & Thayer, J. F. (2001). Neurological bases for balance-anxiety links. Journal of Anxiety Disorders, 15, 53-79."
    }
};

// ========================================
// Body Map Manager
// ========================================

class BodyMapManager {
    constructor() {
        this.exploredRegions = new Set();
        this.currentRegion = null;
        this.currentTab = 'feel';

        this.init();
    }

    init() {
        console.log('🗺️ Initializing Body Map...');

        // Load SVG body map
        this.loadBodyMap();

        // Set up event listeners
        this.setupEventListeners();

        // Load saved progress
        this.loadProgress();
    }

    async loadBodyMap() {
        const container = document.getElementById('body-map-svg-container');
        if (!container) {
            console.warn('Body map container not found');
            return;
        }

        try {
            // Try loading from current directory first
            let response;
            try {
                response = await fetch('body-map.svg');
            } catch (e) {
                // Try alternative paths
                response = await fetch('../body-map.svg');
            }

            const svgText = await response.text();
            container.innerHTML = svgText;

            // Add click listeners to regions
            this.attachRegionListeners();
        } catch (error) {
            console.error('Error loading body map:', error);
            container.innerHTML = '<p style="color: #dc2626; padding: 1rem;">Error loading body map. Please ensure body-map.svg is in the correct location.</p>';
        }
    }

    attachRegionListeners() {
        const regions = document.querySelectorAll('.body-region');

        regions.forEach(region => {
            const regionName = region.getAttribute('data-region');

            region.addEventListener('click', () => {
                this.showSymptom(regionName);
            });

            region.addEventListener('mouseenter', () => {
                region.style.cursor = 'pointer';
            });
        });
    }

    setupEventListeners() {
        // Tab switching
        const tabs = document.querySelectorAll('.panel-tabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.showTab(tabName);
            });
        });
    }

    showSymptom(region) {
        const data = anxietyBodyMap[region];
        if (!data) {
            console.warn('No data for region:', region);
            return;
        }

        this.currentRegion = region;

        // Update panel content
        const titleEl = document.getElementById('region-title');
        if (titleEl) titleEl.textContent = data.label;

        const feelTab = document.getElementById('tab-feel');
        if (feelTab) feelTab.innerHTML = `<p>${data.whatYouFeel}</p>`;

        const scienceTab = document.getElementById('tab-science');
        if (scienceTab) scienceTab.innerHTML = `<p>${data.theScience}</p>`;

        const whyTab = document.getElementById('tab-why');
        if (whyTab) whyTab.innerHTML = `<p>${data.whyItHappens}</p>`;

        const citation = document.getElementById('citation-text');
        if (citation) citation.innerHTML = `<strong>Research:</strong> ${data.citation}`;

        // Highlight selected region
        document.querySelectorAll('.body-region').forEach(r => {
            r.classList.remove('active');
            r.classList.remove('explored');
        });

        const regionElements = document.querySelectorAll(`[data-region="${region}"]`);
        regionElements.forEach(el => {
            el.classList.add('active');
            el.classList.add('explored');
        });

        // Track exploration
        this.exploredRegions.add(region);
        this.updateExplorationProgress();

        // Track interaction
        if (utils.trackBodyMapInteraction) {
            utils.trackBodyMapInteraction(region);
        }

        // Save progress
        this.saveProgress();
    }

    showTab(tabName) {
        this.currentTab = tabName;

        // Hide all tabs
        document.querySelectorAll('.tab-panel').forEach(t => {
            t.classList.remove('active');
        });
        document.querySelectorAll('.panel-tabs .tab').forEach(t => {
            t.classList.remove('active');
        });

        // Show selected tab
        const tabPanel = document.getElementById(`tab-${tabName}`);
        const tabButton = document.querySelector(`.panel-tabs .tab[data-tab="${tabName}"]`);

        if (tabPanel) tabPanel.classList.add('active');
        if (tabButton) tabButton.classList.add('active');
    }

    updateExplorationProgress() {
        const count = this.exploredRegions.size;
        const total = Object.keys(anxietyBodyMap).length;
        const percentage = (count / total) * 100;

        const countEl = document.getElementById('explored-count');
        const barEl = document.getElementById('exploration-progress-bar');
        const completionMsg = document.getElementById('completion-message');
        const continueBtn = document.getElementById('continue-to-science');

        if (countEl) countEl.textContent = `${count} of ${total} regions explored`;
        if (barEl) barEl.style.width = `${percentage}%`;

        // Save progress to Supabase
        if (utils.saveProgressToSupabase) {
            utils.saveProgressToSupabase('lesson_1_1_body_map', {
                explored_regions: Array.from(this.exploredRegions),
                completion_percentage: percentage,
                total_regions: total
            });
        }

        // Celebrate if all regions explored
        if (count === total && count > 0) {
            if (completionMsg) completionMsg.style.display = 'block';
            if (continueBtn) continueBtn.style.display = 'block';
            this.celebrateCompletion();
        }
    }

    celebrateCompletion() {
        // Show success message
        const progressDiv = document.querySelector('.exploration-progress');
        if (progressDiv && !progressDiv.querySelector('.completion-message')) {
            const message = document.createElement('div');
            message.className = 'completion-message fade-in';
            message.innerHTML = `
                <p style="color: #059669; font-weight: 600; margin-top: 1rem;">
                    🎉 Excellent! You've explored all body regions. You now have a comprehensive understanding of where anxiety lives in your body.
                </p>
            `;
            progressDiv.appendChild(message);
        }
    }

    saveProgress() {
        const progress = {
            exploredRegions: Array.from(this.exploredRegions),
            currentRegion: this.currentRegion,
            currentTab: this.currentTab,
            timestamp: new Date().toISOString()
        };

        if (utils.saveToLocalStorage) {
            utils.saveToLocalStorage('body_map_progress', progress);
        } else {
            localStorage.setItem('body_map_progress', JSON.stringify(progress));
        }
    }

    loadProgress() {
        let progress;
        if (utils.getFromLocalStorage) {
            progress = utils.getFromLocalStorage('body_map_progress');
        } else {
            const stored = localStorage.getItem('body_map_progress');
            progress = stored ? JSON.parse(stored) : null;
        }

        if (progress) {
            this.exploredRegions = new Set(progress.exploredRegions || []);
            this.updateExplorationProgress();

            if (progress.currentRegion) {
                this.showSymptom(progress.currentRegion);
            }

            if (progress.currentTab) {
                this.showTab(progress.currentTab);
            }
        }
    }
}

// ========================================
// Gamma Presentation Manager
// ========================================

class GammaPresentationManager {
    constructor(presentationId) {
        this.presentationId = presentationId;
        this.isViewed = false;
        this.init();
    }

    init() {
        console.log('📊 Initializing Gamma Presentation...');
        this.loadProgress();
    }

    markGammaComplete() {
        if (this.isViewed) {
            alert('You have already marked this presentation as viewed.');
            return;
        }

        this.isViewed = true;

        // Track completion
        if (utils.trackEvent) {
            utils.trackEvent('gamma_presentation_viewed', {
                presentation_id: this.presentationId,
                lesson_id: 'lesson_1_1'
            });
        }

        // Save progress
        this.saveProgress();

        // Update UI
        this.updateUI();

        // Show success message
        this.showSuccessMessage();
    }

    updateUI() {
        const button = document.querySelector('.presentation-completion .btn');
        if (button) {
            button.textContent = '✅ Presentation Viewed';
            button.disabled = true;
            button.style.background = '#10b981';
        }

        // Enable next section
        const nextSection = document.querySelector('.body-map-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    showSuccessMessage() {
        const container = document.querySelector('.gamma-presentation-container');
        if (container && !container.querySelector('.success-message')) {
            const message = document.createElement('div');
            message.className = 'success-message fade-in';
            message.style.cssText = 'background: #d1fae5; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; color: #059669;';
            message.innerHTML = '<p><strong>Great!</strong> You\'re ready to explore the interactive body map below.</p>';
            container.appendChild(message);
        }
    }

    saveProgress() {
        const progress = {
            isViewed: this.isViewed,
            timestamp: new Date().toISOString()
        };

        if (utils.saveToLocalStorage) {
            utils.saveToLocalStorage('gamma_presentation_progress', progress);
        } else {
            localStorage.setItem('gamma_presentation_progress', JSON.stringify(progress));
        }

        // Also save to Supabase
        if (utils.saveProgressToSupabase) {
            utils.saveProgressToSupabase('lesson_1_1_gamma', progress);
        }
    }

    loadProgress() {
        let progress;
        if (utils.getFromLocalStorage) {
            progress = utils.getFromLocalStorage('gamma_presentation_progress');
        } else {
            const stored = localStorage.getItem('gamma_presentation_progress');
            progress = stored ? JSON.parse(stored) : null;
        }

        if (progress && progress.isViewed) {
            this.isViewed = true;
            this.updateUI();
        }
    }
}

// ========================================
// Typebot Assessment Manager
// ========================================

class TypebotAssessmentManager {
    constructor(typebotId) {
        this.typebotId = typebotId;
        this.isCompleted = false;
        this.results = null;

        this.init();
    }

    init() {
        console.log('🤖 Initializing Typebot Assessment...');

        // Initialize Typebot if library is available
        if (typeof Typebot !== 'undefined' && utils.initializeTypebot) {
            utils.initializeTypebot(this.typebotId, {
                lessonId: 'lesson_1_1',
                onComplete: (results) => this.handleComplete(results)
            });
        } else {
            console.warn('Typebot library not loaded or utilities not available');
            this.showFallbackForm();
        }

        this.loadProgress();
    }

    handleComplete(results) {
        console.log('✅ Typebot assessment completed:', results);

        this.isCompleted = true;
        this.results = results;

        // Save results
        this.saveResults();

        // Show summary
        this.showAssessmentSummary(results);

        // Track completion
        if (utils.trackEvent) {
            utils.trackEvent('typebot_assessment_completed', {
                typebot_id: this.typebotId,
                lesson_id: 'lesson_1_1'
            });
        }
    }

    showAssessmentSummary(results) {
        const summaryDiv = document.getElementById('assessment-summary');
        if (!summaryDiv) return;

        const summary = this.generateAssessmentSummary(results);

        summaryDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h4>Your Anxiety Profile Summary</h4>
                    <div class="profile-insights">
                        <div class="insight-item">
                            <h5>Primary Symptoms</h5>
                            <p>${summary.primarySymptoms}</p>
                        </div>
                        <div class="insight-item">
                            <h5>Main Triggers</h5>
                            <p>${summary.mainTriggers}</p>
                        </div>
                        <div class="insight-item">
                            <h5>Current Coping</h5>
                            <p>${summary.currentCoping}</p>
                        </div>
                        <div class="insight-item">
                            <h5>Severity Level</h5>
                            <p>${summary.severityLevel}</p>
                        </div>
                    </div>
                    <div class="alert alert-info">
                        <strong>Next Steps:</strong> ${summary.recommendations}
                    </div>
                </div>
            </div>
        `;

        summaryDiv.style.display = 'block';
        summaryDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    generateAssessmentSummary(results) {
        // This would parse actual Typebot results
        // For now, return a template
        return {
            primarySymptoms: "Physical (racing heart, shallow breathing)",
            mainTriggers: "Social situations and performance pressure",
            currentCoping: "Mix of avoidance and distraction - some helpful, some not",
            severityLevel: "Moderate - daily impact on 2-3 life areas",
            recommendations: "Focus on breathing techniques and cognitive restructuring in upcoming modules."
        };
    }

    showFallbackForm() {
        const embedDiv = document.querySelector('.typebot-embed');
        if (embedDiv) {
            embedDiv.innerHTML = `
                <div class="alert alert-warning">
                    <h4>Typebot Integration Pending</h4>
                    <p>The interactive assessment will be available once Typebot is configured.</p>
                    <p>For now, you can continue to the next section.</p>
                </div>
            `;
        }
    }

    saveResults() {
        const data = {
            isCompleted: this.isCompleted,
            results: this.results,
            timestamp: new Date().toISOString()
        };

        if (utils.saveToLocalStorage) {
            utils.saveToLocalStorage('typebot_assessment_results', data);
        } else {
            localStorage.setItem('typebot_assessment_results', JSON.stringify(data));
        }
    }

    loadProgress() {
        let data;
        if (utils.getFromLocalStorage) {
            data = utils.getFromLocalStorage('typebot_assessment_results');
        } else {
            const stored = localStorage.getItem('typebot_assessment_results');
            data = stored ? JSON.parse(stored) : null;
        }

        if (data && data.isCompleted) {
            this.isCompleted = true;
            this.results = data.results;
            this.showAssessmentSummary(data.results);
        }
    }
}

// ========================================
// Forms.io Knowledge Check Manager
// ========================================

class KnowledgeCheckManager {
    constructor(formId) {
        this.formId = formId;
        this.score = 0;
        this.totalQuestions = 5;
        this.isCompleted = false;

        this.init();
    }

    init() {
        console.log('📝 Initializing Knowledge Check...');

        // Initialize Forms.io if available
        if (typeof Formio !== 'undefined' && utils.initializeFormio) {
            this.initializeForm();
        } else {
            console.warn('Forms.io library not available');
            this.showFallbackQuiz();
        }
    }

    async initializeForm() {
        try {
            const form = await utils.initializeFormio(this.formId, 'formio-knowledge-check');

            if (form) {
                form.on('submit', (submission) => {
                    this.handleSubmission(submission);
                });
            }
        } catch (error) {
            console.error('Error initializing Forms.io:', error);
            this.showFallbackQuiz();
        }
    }

    handleSubmission(submission) {
        console.log('📊 Quiz submitted:', submission);

        // Calculate score
        this.score = this.calculateQuizScore(submission.data);

        // Mark as completed
        this.isCompleted = true;

        // Show results
        this.showQuizResults(this.score);

        // Save results
        this.saveResults();

        // Unlock next lesson if passed
        if (this.score >= 4) {
            this.unlockNextLesson();
        }
    }

    calculateQuizScore(data) {
        // Simple scoring logic - would be more sophisticated in production
        let score = 0;
        const correctAnswers = {
            q1: '23 milliseconds',
            q2: false,
            q3: 'amygdala detected threat',
            q5: 'change how I respond'
        };

        Object.keys(correctAnswers).forEach(key => {
            if (data[key] === correctAnswers[key]) {
                score++;
            }
        });

        return score;
    }

    showQuizResults(score) {
        const percentage = (score / this.totalQuestions) * 100;
        const passed = score >= 4;

        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'quiz-results fade-in';
        resultsDiv.style.cssText = `
            background: ${passed ? '#d1fae5' : '#fef3c7'};
            padding: 2rem;
            border-radius: 1rem;
            margin-top: 2rem;
            text-align: center;
        `;

        resultsDiv.innerHTML = `
            <h3 style="color: ${passed ? '#059669' : '#92400e'};">
                ${passed ? '🎉 Great Job!' : '📚 Keep Learning'}
            </h3>
            <p style="font-size: 1.5rem; font-weight: 600;">
                Score: ${score}/${this.totalQuestions} (${percentage}%)
            </p>
            <p>${passed
                ? 'You\'ve demonstrated excellent understanding of the material!'
                : 'Consider reviewing the lesson material and trying again.'
            }</p>
        `;

        const container = document.querySelector('.knowledge-check-section');
        if (container) {
            container.appendChild(resultsDiv);
        }
    }

    unlockNextLesson() {
        console.log('🔓 Unlocking Lesson 1.2...');

        // Update UI to show next lesson is available
        const nextBtn = document.getElementById('next-lesson-btn');
        if (nextBtn) {
            nextBtn.style.display = 'inline-flex';
            nextBtn.href = 'lesson-1-2.html';
        }

        // Save unlock status
        if (utils.saveProgressToSupabase) {
            utils.saveProgressToSupabase('lesson_unlocks', {
                unlocked_lesson: 'lesson_1_2',
                unlocked_at: new Date().toISOString()
            });
        }
    }

    showFallbackQuiz() {
        const container = document.getElementById('formio-knowledge-check');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-info">
                    <h4>Knowledge Check</h4>
                    <p>Forms.io integration pending. The interactive quiz will be available once configured.</p>
                    <button class="btn btn-primary" onclick="window.knowledgeCheckManager.unlockNextLesson()">
                        Continue to Next Lesson
                    </button>
                </div>
            `;
        }
    }

    saveResults() {
        const data = {
            score: this.score,
            totalQuestions: this.totalQuestions,
            isCompleted: this.isCompleted,
            timestamp: new Date().toISOString()
        };

        if (utils.saveToLocalStorage) {
            utils.saveToLocalStorage('knowledge_check_results', data);
        } else {
            localStorage.setItem('knowledge_check_results', JSON.stringify(data));
        }
    }
}

// ========================================
// Global Functions (for HTML onclick handlers)
// ========================================

function markGammaComplete() {
    if (window.gammaManager) {
        window.gammaManager.markGammaComplete();
    }
}

// ========================================
// Initialize on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Lesson 1.1 Interactive Components Loading...');

    // Initialize managers
    window.bodyMapManager = new BodyMapManager();
    window.gammaManager = new GammaPresentationManager('lesson-1-1-intro');
    window.typebotManager = new TypebotAssessmentManager('anxiety-profile-assessment');
    window.knowledgeCheckManager = new KnowledgeCheckManager('lesson-1-1-knowledge-check');

    console.log('✅ Lesson 1.1 Interactive Components Ready');
});
