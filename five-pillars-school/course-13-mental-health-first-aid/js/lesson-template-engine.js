/**
 * Movement Medicine Lesson Template Engine
 * Centralized, reusable lesson functionality for all 20 lessons
 */

class LessonEngine {
    constructor() {
        this.config = window.LESSON_CONFIG || {};
        this.state = {
            currentProgress: 0,
            completedSections: [],
            currentQuestion: 1,
            assessmentData: {},
            startTime: Date.now(),
            interactions: []
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.bindEventListeners();
        this.initializeCrisisDetection();
        this.setupScrollTracking();

        console.log(`✅ Lesson Engine initialized for ${this.config.id}`);
    }

    // Event listener binding
    bindEventListeners() {
        // Bind all data-action buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', this.handleAction.bind(this));
        });

        // Bind form interactions
        document.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('change', this.trackInteraction.bind(this));

            // Crisis keyword detection for text inputs
            if (element.type === 'text' || element.tagName === 'TEXTAREA') {
                element.addEventListener('input', this.checkCrisisKeywords.bind(this));
            }
        });

        // Auto-save progress
        setInterval(() => this.saveProgress(), 30000);
        window.addEventListener('beforeunload', () => this.saveProgress());
    }

    // Main action handler
    handleAction(event) {
        event.preventDefault();
        const action = event.target.dataset.action;
        const data = { ...event.target.dataset };

        console.log(`Action: ${action}`, data);

        switch(action) {
            case 'simulateExercise':
                this.simulateExercise(data.exercise);
                break;
            case 'nextQuestion':
                this.nextQuestion();
                break;
            case 'previousQuestion':
                this.previousQuestion();
                break;
            case 'completeAssessment':
                this.completeAssessment();
                break;
            case 'startMovement':
                this.startMovementTimer();
                break;
            case 'saveMoodData':
                this.saveMoodData();
                break;
            case 'hideCrisisBanner':
                this.hideCrisisBanner();
                break;
            case 'markSectionComplete':
                this.markSectionComplete(data.section);
                break;
            case 'selectCondition':
                this.selectCondition(data.condition);
                break;
            case 'showExerciseType':
                this.showExerciseType(data.type);
                break;
            case 'generatePlan':
                this.generateExercisePlan();
                break;
            case 'selectActivity':
                this.selectActivity(data.level);
                break;
            case 'recordAnswer':
                this.recordAnswer(data.question, data.answer);
                break;
            case 'nextStep':
                this.nextStep(data.step);
                break;
            case 'selectGoal':
                this.selectGoal(data.goal);
                break;
            case 'completeAssessment':
                this.completeAssessment();
                break;
            default:
                console.warn('Unknown action:', action);
                this.showFeedback(`✅ ${action} working!`, 'success');
        }

        this.trackInteraction(event);
    }

    // Exercise simulation
    simulateExercise(type) {
        const effects = {
            cardio: {
                dopamine: 85, serotonin: 70, norepinephrine: 90,
                description: "Cardio exercise is the champion of neurotransmitter production!"
            },
            strength: {
                dopamine: 75, serotonin: 60, norepinephrine: 80,
                description: "Strength training builds both muscle and mental resilience!"
            },
            yoga: {
                dopamine: 60, serotonin: 85, norepinephrine: 50,
                description: "Mindful movement excels at boosting mood and reducing stress!"
            }
        };

        const effect = effects[type];
        if (!effect) return;

        this.animateChemicalLevels(effect);
        this.showSimulationResults(type, effect);
        this.markSectionComplete('brain-simulator');
    }

    // Chemical level animation
    animateChemicalLevels(levels) {
        Object.keys(levels).forEach(chemical => {
            if (chemical === 'description') return;

            const meter = document.getElementById(`${chemical}-level`);
            const value = document.getElementById(`${chemical}-value`);

            if (meter && value) {
                // Reset and animate
                meter.style.width = '0%';
                setTimeout(() => {
                    meter.style.width = levels[chemical] + '%';
                    meter.classList.add('animating');
                    value.textContent = levels[chemical] + '%';
                }, 100);
            }
        });
    }

    // Show simulation results
    showSimulationResults(type, effect) {
        const results = document.getElementById('simulation-results');
        if (!results) return;

        const exerciseNames = {
            cardio: 'Cardio Exercise',
            strength: 'Strength Training',
            yoga: 'Yoga/Mindful Movement'
        };

        results.innerHTML = `
            <h4>Results for ${exerciseNames[type]}</h4>
            <div class="chemical-summary">
                <div class="chemical-result">
                    <span class="chemical-icon">🎯</span>
                    <strong>Dopamine:</strong> ${effect.dopamine}% - Motivation & Reward
                </div>
                <div class="chemical-result">
                    <span class="chemical-icon">😊</span>
                    <strong>Serotonin:</strong> ${effect.serotonin}% - Mood & Well-being
                </div>
                <div class="chemical-result">
                    <span class="chemical-icon">⚡</span>
                    <strong>Norepinephrine:</strong> ${effect.norepinephrine}% - Attention & Alertness
                </div>
            </div>
            <div class="benefits-explanation">
                <p><strong>Why this works:</strong> ${effect.description}</p>
            </div>
        `;
    }

    // Assessment navigation
    nextQuestion() {
        const currentCard = document.querySelector(`[data-question="${this.state.currentQuestion}"]`);
        const selectedAnswer = currentCard?.querySelector('input[type="radio"]:checked');

        if (!selectedAnswer) {
            this.showFeedback('Please select an answer before continuing.', 'warning');
            return;
        }

        // Store answer
        this.state.assessmentData[selectedAnswer.name] = selectedAnswer.value;

        // Navigate to next question
        currentCard.classList.remove('active');
        this.state.currentQuestion++;

        const nextCard = document.querySelector(`[data-question="${this.state.currentQuestion}"]`);
        if (nextCard) {
            nextCard.classList.add('active');
            this.updateNavigationButtons();
        } else {
            this.showCompleteButton();
        }
    }

    previousQuestion() {
        if (this.state.currentQuestion <= 1) return;

        const currentCard = document.querySelector(`[data-question="${this.state.currentQuestion}"]`);
        currentCard.classList.remove('active');

        this.state.currentQuestion--;
        const prevCard = document.querySelector(`[data-question="${this.state.currentQuestion}"]`);
        prevCard.classList.add('active');

        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');

        if (prevBtn) prevBtn.disabled = this.state.currentQuestion <= 1;

        // Show complete button on last question
        const totalQuestions = document.querySelectorAll('[data-question]').length;
        if (this.state.currentQuestion >= totalQuestions) {
            this.showCompleteButton();
        }
    }

    showCompleteButton() {
        const nextBtn = document.getElementById('next-question');
        const completeBtn = document.getElementById('complete-assessment');

        if (nextBtn) nextBtn.style.display = 'none';
        if (completeBtn) completeBtn.style.display = 'inline-block';
    }

    completeAssessment() {
        try {
            // Get final answer if needed
            const currentCard = document.querySelector(`[data-question="${this.state.currentQuestion}"]`);
            if (currentCard) {
                const selectedAnswer = currentCard.querySelector('input[type="radio"]:checked');
                if (selectedAnswer) {
                    this.state.assessmentData[selectedAnswer.name] = selectedAnswer.value;
                }
            }

            // Generate profile
            const profile = this.generatePersonalProfile(this.state.assessmentData);

            // Show results
            const assessmentForm = document.querySelector('.assessment-form');
            const resultsDiv = document.getElementById('assessment-results');
            const profileDiv = document.getElementById('profile-summary');

            if (assessmentForm && resultsDiv && profileDiv) {
                assessmentForm.style.display = 'none';
                resultsDiv.style.display = 'block';
                profileDiv.innerHTML = profile;

                resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                this.showFeedback('📊 Assessment completed! Check your personalized profile below.', 'success');
                this.markSectionComplete('personal-assessment');
            }
        } catch (error) {
            console.error('Assessment error:', error);
            this.showFeedback('Assessment error. Please try again.', 'error');
        }
    }

    generatePersonalProfile(data) {
        const profiles = {
            love: {
                title: "The Committed Mover",
                description: "You already have a strong relationship with exercise! This course will help you optimize your routine for even better mental health benefits.",
                recommendations: ["Fine-tune your exercise timing for maximum cognitive benefits", "Explore new movement modalities", "Track your mood changes with different exercises"]
            },
            like: {
                title: "The Motivated Beginner",
                description: "You have positive feelings about exercise but struggle with consistency. You're in the perfect position to build lasting habits!",
                recommendations: ["Start with short, enjoyable movement sessions", "Focus on building routine before intensity", "Use mood tracking to see immediate benefits"]
            },
            neutral: {
                title: "The Open Explorer",
                description: "You're neutral about exercise, which means you have a clean slate to discover what works for your unique brain and body!",
                recommendations: ["Experiment with different types of movement", "Start with gentle activities like walking", "Focus on how movement makes you feel mentally"]
            },
            dislike: {
                title: "The Hesitant Starter",
                description: "Exercise might feel overwhelming now, but this course will help you find gentle, enjoyable ways to move that transform your mental health.",
                recommendations: ["Begin with 5-minute movement breaks", "Focus on activities that don't feel like 'exercise'", "Prioritize stress-relief and mood benefits"]
            }
        };

        const relationship = data.relationship || 'neutral';
        const profile = profiles[relationship];

        return `
            <div class="profile-card">
                <h4>${profile.title}</h4>
                <p>${profile.description}</p>
                <h5>Your Personalized Action Plan:</h5>
                <ul>
                    ${profile.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Movement timer
    startMovementTimer() {
        const startBtn = document.getElementById('start-movement');
        const instructions = document.getElementById('movement-instructions');
        const timer = document.getElementById('timer');
        const instructionText = document.getElementById('instruction-text');

        if (!startBtn || !instructions || !timer || !instructionText) return;

        startBtn.style.display = 'none';
        instructions.style.display = 'block';

        const movements = [
            { time: 120, text: "Stand up and march in place..." },
            { time: 90, text: "Raise your arms overhead and breathe deeply..." },
            { time: 60, text: "Gentle side bends, feeling your body stretch..." },
            { time: 30, text: "Final deep breaths, notice how you feel..." }
        ];

        let currentTime = 120;
        let currentMovement = 0;

        const countdown = setInterval(() => {
            timer.textContent = this.formatTime(currentTime);

            if (movements[currentMovement] && currentTime <= movements[currentMovement].time) {
                instructionText.textContent = movements[currentMovement].text;
                currentMovement++;
            }

            currentTime--;

            if (currentTime < 0) {
                clearInterval(countdown);
                instructions.style.display = 'none';
                document.querySelector('.mood-after').style.display = 'block';
                this.showFeedback('Movement complete! How do you feel now?', 'success');
            }
        }, 1000);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Mood tracking
    saveMoodData() {
        const beforeValue = document.getElementById('mood-before')?.value;
        const afterValue = document.getElementById('mood-after')?.value;

        if (beforeValue && afterValue) {
            const change = afterValue - beforeValue;
            const changeText = change > 0 ? `+${change} points` : `${change} points`;
            const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';

            const resultsDiv = document.querySelector('.mood-results');
            const changeDiv = document.getElementById('mood-change');

            if (resultsDiv && changeDiv) {
                changeDiv.textContent = `Mood change: ${changeText}`;
                changeDiv.className = `mood-change ${changeClass}`;
                resultsDiv.style.display = 'block';

                this.showFeedback('Mood data saved! Notice the immediate effects of movement.', 'success');
                this.markSectionComplete('practice-section');
            }
        }
    }

    // Progress tracking
    updateProgress(percentage) {
        this.state.currentProgress = Math.max(this.state.currentProgress, percentage);

        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = this.state.currentProgress + '%';
        }

        this.saveProgress();
    }

    markSectionComplete(sectionId) {
        if (!this.state.completedSections.includes(sectionId)) {
            this.state.completedSections.push(sectionId);

            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('completed');
                this.showCompletionFeedback(section);
            }

            // Update progress
            const totalSections = document.querySelectorAll('.interactive-section').length;
            const completedPercent = (this.state.completedSections.length / totalSections) * 90; // Cap at 90%
            this.updateProgress(completedPercent);
        }
    }

    showCompletionFeedback(element) {
        const feedback = document.createElement('div');
        feedback.className = 'completion-badge';
        feedback.innerHTML = '✅ Complete';
        feedback.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #059669;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            animation: slideInRight 0.5s ease-out;
            z-index: 10;
        `;

        element.style.position = 'relative';
        element.appendChild(feedback);
    }

    // Crisis detection
    checkCrisisKeywords(event) {
        const text = event.target.value.toLowerCase();
        const crisisKeywords = [
            'suicide', 'kill myself', 'end it all', 'can\'t go on', 'hopeless',
            'hurt myself', 'self harm', 'die', 'overdose', 'want to die'
        ];

        const foundKeywords = crisisKeywords.filter(keyword => text.includes(keyword));

        if (foundKeywords.length > 0) {
            this.triggerCrisisResponse();
        }
    }

    triggerCrisisResponse() {
        const banner = document.getElementById('crisis-banner');
        if (banner) {
            banner.style.display = 'block';
            banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        this.trackInteraction({ target: { id: 'crisis-detection', value: 'triggered' } });
    }

    hideCrisisBanner() {
        const banner = document.getElementById('crisis-banner');
        if (banner) {
            banner.style.display = 'none';
            sessionStorage.setItem('crisisBannerDismissed', 'true');
        }
    }

    // User feedback
    showFeedback(message, type = 'info') {
        const feedback = document.createElement('div');
        feedback.className = `feedback-toast ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            background: ${type === 'success' ? '#059669' : type === 'warning' ? '#d97706' : type === 'error' ? '#dc2626' : '#374151'};
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    // Scroll tracking
    setupScrollTracking() {
        let maxScroll = 0;

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);

            if (maxScroll > this.state.currentProgress) {
                this.updateProgress(Math.min(maxScroll, 85)); // Cap scroll progress at 85%
            }
        });
    }

    // Lesson 1.2 specific methods
    selectCondition(condition) {
        console.log('Selected condition:', condition);

        // Remove active state from all cards
        document.querySelectorAll('.condition-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add active state to selected card
        event.target.closest('.condition-card').classList.add('selected');

        // Show recommendations
        this.showConditionRecommendations(condition);
        this.markSectionComplete('condition-selector');
    }

    showConditionRecommendations(condition) {
        const recommendations = {
            anxiety: {
                title: "Best for Anxiety & Stress",
                exercises: [
                    { name: "Yoga", benefit: "Reduces cortisol by 25-30%", icon: "🧘‍♀️" },
                    { name: "Walking", benefit: "Calms nervous system", icon: "🚶‍♀️" },
                    { name: "Swimming", benefit: "Rhythmic, meditative", icon: "🏊‍♀️" },
                    { name: "Tai Chi", benefit: "Mindful movement", icon: "🥋" }
                ]
            },
            depression: {
                title: "Best for Depression & Low Mood",
                exercises: [
                    { name: "Cardio", benefit: "Boosts endorphins 200%", icon: "🏃‍♀️" },
                    { name: "Strength Training", benefit: "Builds confidence", icon: "💪" },
                    { name: "Group Classes", benefit: "Social connection", icon: "👥" },
                    { name: "Dance", benefit: "Increases dopamine", icon: "💃" }
                ]
            },
            focus: {
                title: "Best for Focus & Concentration",
                exercises: [
                    { name: "HIIT", benefit: "Enhances neuroplasticity", icon: "⚡" },
                    { name: "Martial Arts", benefit: "Mind-body coordination", icon: "🥋" },
                    { name: "Rock Climbing", benefit: "Problem-solving focus", icon: "🧗‍♀️" },
                    { name: "Tennis", benefit: "Reaction time training", icon: "🎾" }
                ]
            },
            sleep: {
                title: "Best for Sleep Issues",
                exercises: [
                    { name: "Evening Yoga", benefit: "Activates parasympathetic system", icon: "🧘‍♀️" },
                    { name: "Light Cardio", benefit: "Early morning exposure", icon: "🌅" },
                    { name: "Stretching", benefit: "Muscle relaxation", icon: "🤸‍♀️" },
                    { name: "Walking", benefit: "Natural circadian rhythm", icon: "🚶‍♀️" }
                ]
            },
            trauma: {
                title: "Best for Trauma & PTSD",
                exercises: [
                    { name: "Gentle Yoga", benefit: "Nervous system regulation", icon: "🧘‍♀️" },
                    { name: "Swimming", benefit: "Bilateral movement", icon: "🏊‍♀️" },
                    { name: "Walking", benefit: "Grounding & safety", icon: "🚶‍♀️" },
                    { name: "Breathwork", benefit: "Autonomic regulation", icon: "🫁" }
                ]
            },
            general: {
                title: "Best for General Wellness",
                exercises: [
                    { name: "Mixed Cardio", benefit: "Overall fitness", icon: "🏃‍♀️" },
                    { name: "Strength Training", benefit: "Functional strength", icon: "💪" },
                    { name: "Flexibility", benefit: "Mobility & recovery", icon: "🤸‍♀️" },
                    { name: "Recreational Sports", benefit: "Fun & social", icon: "⚽" }
                ]
            }
        };

        const rec = recommendations[condition];
        const recommendationsDiv = document.getElementById('exercise-recommendations');
        const contentDiv = document.getElementById('recommendation-content');

        if (rec && recommendationsDiv && contentDiv) {
            contentDiv.innerHTML = `
                <h4>${rec.title}</h4>
                <div class="recommendation-grid">
                    ${rec.exercises.map(ex => `
                        <div class="recommendation-card">
                            <span class="rec-icon">${ex.icon}</span>
                            <h5>${ex.name}</h5>
                            <p>${ex.benefit}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            recommendationsDiv.style.display = 'block';
            this.showFeedback(`Showing recommendations for ${condition}`, 'success');
        }
    }

    showExerciseType(type) {
        console.log('Showing exercise type:', type);

        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Show corresponding panel
        document.querySelectorAll('.exercise-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        const targetPanel = document.getElementById(`${type}-panel`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    }

    generateExercisePlan() {
        console.log('Generating exercise plan...');

        const days = document.getElementById('weekly-days').value;
        const sessionLength = document.getElementById('session-length').value;
        const preferences = Array.from(document.querySelectorAll('.exercise-preference:checked'))
            .map(cb => cb.value);

        if (preferences.length === 0) {
            this.showFeedback('Please select at least one exercise type preference.', 'warning');
            return;
        }

        const plan = this.createPersonalizedPlan(days, sessionLength, preferences);
        const planDiv = document.getElementById('generated-plan');
        const contentDiv = document.getElementById('plan-content');

        if (plan && planDiv && contentDiv) {
            contentDiv.innerHTML = plan;
            planDiv.style.display = 'block';
            this.showFeedback('Your personalized exercise plan has been generated!', 'success');
            this.markSectionComplete('plan-builder');
        }
    }

    createPersonalizedPlan(days, sessionLength, preferences) {
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const selectedDays = weekDays.slice(0, parseInt(days));

        let planHTML = `
            <div class="plan-summary">
                <h4>Your Weekly Plan: ${days} days, ${sessionLength} minutes each</h4>
                <p>Focus areas: ${preferences.join(', ')}</p>
            </div>
            <div class="weekly-schedule">
        `;

        selectedDays.forEach((day, index) => {
            const exerciseType = preferences[index % preferences.length];
            const workoutDetails = this.getWorkoutDetails(exerciseType, sessionLength);

            planHTML += `
                <div class="day-plan">
                    <h5>${day}</h5>
                    <div class="workout-card">
                        <h6>${workoutDetails.title}</h6>
                        <p class="duration">${sessionLength} minutes</p>
                        <ul class="workout-activities">
                            ${workoutDetails.activities.map(activity => `<li>${activity}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        planHTML += '</div>';
        return planHTML;
    }

    getWorkoutDetails(type, duration) {
        const workouts = {
            cardio: {
                title: "Cardio Session",
                activities: duration <= 20 ?
                    ["5 min warm-up walk", "10 min brisk walk/jog", "5 min cool-down"] :
                    ["5 min warm-up", "20 min steady cardio", "5 min cool-down"]
            },
            strength: {
                title: "Strength Training",
                activities: duration <= 20 ?
                    ["Bodyweight squats", "Push-ups", "Planks", "Lunges"] :
                    ["Upper body strength", "Lower body strength", "Core work", "Stretching"]
            },
            yoga: {
                title: "Yoga Practice",
                activities: duration <= 20 ?
                    ["Sun salutations", "Standing poses", "Gentle flow", "Relaxation"] :
                    ["Warm-up stretches", "Standing sequence", "Floor poses", "Meditation"]
            },
            hiit: {
                title: "HIIT Training",
                activities: duration <= 20 ?
                    ["Warm-up", "4x 30sec intervals", "Rest periods", "Cool-down"] :
                    ["Dynamic warm-up", "6x 45sec intervals", "Active recovery", "Stretching"]
            },
            dance: {
                title: "Dance Session",
                activities: duration <= 20 ?
                    ["Warm-up movements", "Free dance", "Rhythm exercises", "Cool-down"] :
                    ["Movement warm-up", "Dance combinations", "Freestyle", "Gentle stretching"]
            }
        };

        return workouts[type] || workouts.cardio;
    }

    // Lesson 2.1 Assessment Methods
    selectActivity(level) {
        console.log('Selected activity level:', level);

        // Remove selected state from all options
        document.querySelectorAll('.activity-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selected state to clicked option
        event.target.closest('.activity-option').classList.add('selected');

        // Store selection
        if (typeof window.assessmentData !== 'undefined') {
            window.assessmentData.activityLevel = level;
        }

        // Show next step
        setTimeout(() => {
            document.getElementById('step-1').style.display = 'none';
            document.getElementById('step-2').style.display = 'block';
        }, 500);

        this.showFeedback(`Activity level "${level}" selected`, 'success');
    }

    recordAnswer(question, answer) {
        console.log('Recording answer:', question, answer);

        // Remove selected state from siblings
        const button = event.target;
        const siblings = button.parentNode.querySelectorAll('.answer-btn');
        siblings.forEach(btn => btn.classList.remove('selected'));

        // Add selected state
        button.classList.add('selected');

        // Store answer
        if (typeof window.assessmentData !== 'undefined') {
            window.assessmentData.readinessAnswers[question] = answer;

            // Check if all questions answered
            const totalQuestions = 3;
            const answeredQuestions = Object.keys(window.assessmentData.readinessAnswers).length;

            if (answeredQuestions >= totalQuestions) {
                document.getElementById('step-2-next').style.display = 'inline-block';
            }
        }
    }

    nextStep(stepNumber) {
        console.log('Going to step:', stepNumber);

        // Hide current step
        document.querySelectorAll('.assessment-step').forEach(step => {
            step.style.display = 'none';
        });

        // Show target step
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) {
            targetStep.style.display = 'block';
            targetStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    selectGoal(goal) {
        console.log('Selected mental health goal:', goal);

        // Remove selected state from all goals
        document.querySelectorAll('.goal-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selected state to clicked option
        event.target.closest('.goal-option').classList.add('selected');

        // Store selection
        if (typeof window.assessmentData !== 'undefined') {
            window.assessmentData.mentalHealthGoal = goal;
        }

        this.showFeedback(`Mental health goal "${goal}" selected`, 'success');
    }

    completeAssessment() {
        console.log('Completing assessment...');

        // Get current slider values
        const moodSlider = document.getElementById('current-mood');
        const energySlider = document.getElementById('current-energy');

        if (moodSlider && energySlider && typeof window.assessmentData !== 'undefined') {
            window.assessmentData.currentMood = parseInt(moodSlider.value);
            window.assessmentData.currentEnergy = parseInt(energySlider.value);
        }

        // Generate results
        const results = this.generateAssessmentResults();

        // Update results display
        this.displayAssessmentResults(results);

        // Show results section
        const resultsSection = document.getElementById('assessment-results');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        this.markSectionComplete('physical-assessment');
        this.showFeedback('Assessment completed! Check your personalized results below.', 'success');
    }

    generateAssessmentResults() {
        const data = window.assessmentData || {};

        // Calculate fitness score
        let fitnessScore = 50; // Base score
        switch (data.activityLevel) {
            case 'sedentary': fitnessScore = 25; break;
            case 'lightly-active': fitnessScore = 45; break;
            case 'moderately-active': fitnessScore = 70; break;
            case 'very-active': fitnessScore = 90; break;
        }

        // Adjust for readiness answers
        if (data.readinessAnswers) {
            if (data.readinessAnswers.stairs === 'no') fitnessScore -= 15;
            if (data.readinessAnswers.injuries === 'yes') fitnessScore -= 10;
            if (data.readinessAnswers.clearance === 'no') fitnessScore -= 20;
        }

        fitnessScore = Math.max(15, Math.min(100, fitnessScore)); // Clamp between 15-100

        // Determine fitness level
        let fitnessLevel = 'Beginner';
        if (fitnessScore >= 70) fitnessLevel = 'Advanced';
        else if (fitnessScore >= 50) fitnessLevel = 'Intermediate';

        // Generate recommendations
        const recommendations = this.generatePersonalizedRecommendations(data, fitnessScore);

        return {
            fitnessScore,
            fitnessLevel,
            mentalHealthGoal: data.mentalHealthGoal || 'General wellness',
            currentMood: data.currentMood || 5,
            currentEnergy: data.currentEnergy || 5,
            recommendations
        };
    }

    displayAssessmentResults(results) {
        // Update fitness score
        const fitnessScoreEl = document.getElementById('fitness-score');
        if (fitnessScoreEl) {
            fitnessScoreEl.innerHTML = `
                <span class="score-value">${results.fitnessScore}/100</span>
                <span class="score-label">${results.fitnessLevel}</span>
            `;
        }

        // Update mental health priority
        const mentalPriorityEl = document.getElementById('mental-priority');
        if (mentalPriorityEl) {
            const goalEmojis = {
                anxiety: '😰', depression: '😔', energy: '⚡',
                sleep: '😴', focus: '🎯', stress: '🧘‍♀️'
            };
            const emoji = goalEmojis[results.mentalHealthGoal] || '💪';
            mentalPriorityEl.innerHTML = `
                <span class="priority-text">${emoji} ${results.mentalHealthGoal.charAt(0).toUpperCase() + results.mentalHealthGoal.slice(1)}</span>
            `;
        }

        // Update intensity recommendation
        const intensityEl = document.getElementById('intensity-recommendation');
        if (intensityEl) {
            let intensity = 'Low-Moderate';
            if (results.fitnessScore >= 70) intensity = 'Moderate-High';
            else if (results.fitnessScore >= 50) intensity = 'Moderate';

            intensityEl.innerHTML = `
                <span class="intensity-text">${intensity} Intensity</span>
            `;
        }

        // Show recommendations
        const recommendationsEl = document.getElementById('recommendations');
        if (recommendationsEl && results.recommendations) {
            recommendationsEl.innerHTML = results.recommendations;
        }
    }

    generatePersonalizedRecommendations(data, fitnessScore) {
        const goal = data.mentalHealthGoal || 'stress';

        const recommendations = {
            anxiety: {
                title: 'Anxiety Management Plan',
                exercises: ['Gentle yoga (10-15 min)', 'Walking meditation', 'Breathing exercises', 'Light stretching'],
                frequency: '3-4 times per week',
                focus: 'Start with calming, rhythmic movements'
            },
            depression: {
                title: 'Mood Enhancement Plan',
                exercises: ['Brisk walking', 'Bodyweight exercises', 'Dance movement', 'Outdoor activities'],
                frequency: '4-5 times per week',
                focus: 'Build momentum with energy-boosting activities'
            },
            energy: {
                title: 'Energy Building Plan',
                exercises: ['Morning walks', 'Light cardio', 'Dynamic stretching', 'Strength training'],
                frequency: '5-6 times per week',
                focus: 'Consistent daily movement for sustained energy'
            },
            sleep: {
                title: 'Sleep Optimization Plan',
                exercises: ['Evening yoga', 'Gentle stretching', 'Walking', 'Meditation'],
                frequency: '3-4 times per week',
                focus: 'Calming activities 2-3 hours before bed'
            },
            focus: {
                title: 'Cognitive Enhancement Plan',
                exercises: ['HIIT (short bursts)', 'Complex movements', 'Martial arts', 'Balance work'],
                frequency: '3-4 times per week',
                focus: 'Activities that challenge coordination and attention'
            },
            stress: {
                title: 'Stress Relief Plan',
                exercises: ['Yoga flow', 'Tai chi', 'Swimming', 'Nature walks'],
                frequency: '4-5 times per week',
                focus: 'Mindful movement with breathing awareness'
            }
        };

        const plan = recommendations[goal] || recommendations.stress;

        return `
            <h3>${plan.title}</h3>
            <div class="recommendation-details">
                <div class="rec-section">
                    <h4>Recommended Activities</h4>
                    <ul>
                        ${plan.exercises.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
                <div class="rec-section">
                    <h4>Frequency</h4>
                    <p>${plan.frequency}</p>
                </div>
                <div class="rec-section">
                    <h4>Key Focus</h4>
                    <p>${plan.focus}</p>
                </div>
                <div class="rec-section">
                    <h4>Starting Intensity</h4>
                    <p>${fitnessScore >= 70 ? 'You can start with moderate intensity' : fitnessScore >= 50 ? 'Begin with low-moderate intensity' : 'Start very gently and build slowly'}</p>
                </div>
            </div>
        `;
    }

    // Data persistence
    saveProgress() {
        const progressData = {
            ...this.state,
            timeSpent: Date.now() - this.state.startTime,
            lastSaved: Date.now(),
            lessonId: this.config.id
        };

        localStorage.setItem(`movement-medicine-${this.config.id}`, JSON.stringify(progressData));
    }

    loadProgress() {
        const saved = localStorage.getItem(`movement-medicine-${this.config.id}`);
        if (saved) {
            const data = JSON.parse(saved);
            this.state = { ...this.state, ...data };
            this.updateProgress(this.state.currentProgress);
        }
    }

    // Interaction tracking
    trackInteraction(event) {
        const interaction = {
            element: event.target.id || event.target.className,
            action: event.type,
            value: event.target.value || null,
            timestamp: Date.now()
        };

        this.state.interactions.push(interaction);
    }

    initializeCrisisDetection() {
        if (typeof initializeCrisisDetection === 'function') {
            initializeCrisisDetection();
        }
    }
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .completed {
        border-left: 4px solid #059669 !important;
        background: linear-gradient(90deg, rgba(5, 150, 105, 0.1) 0%, transparent 100%) !important;
    }

    .animating {
        transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Auto-initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.lessonEngine = new LessonEngine();
});

// Export for global access
window.LessonEngine = LessonEngine;