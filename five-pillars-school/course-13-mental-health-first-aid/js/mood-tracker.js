/**
 * Movement Medicine Course - Mood Tracker
 * Tracks mood changes before and after movement activities
 */

class MoodTracker {
    constructor() {
        this.data = this.loadData();
        this.currentSession = null;
        this.movementTimer = null;
        this.movementInstructions = [
            "Stand up and march in place...",
            "Raise your arms above your head...",
            "Take deep breaths while moving...",
            "Add some gentle arm circles...",
            "Side steps with arm swings...",
            "Light jogging in place...",
            "Stretch your arms to the sky...",
            "Cool down with slow marching..."
        ];
    }

    // Initialize mood tracker
    initialize() {
        this.setupEventListeners();
        this.updateMoodValues();
        this.displayPreviousSessions();
    }

    // Set up event listeners
    setupEventListeners() {
        // Mood before slider
        const moodBefore = document.getElementById('mood-before');
        if (moodBefore) {
            moodBefore.addEventListener('input', (e) => {
                document.getElementById('mood-before-value').textContent = e.target.value;
            });
        }

        // Mood after slider
        const moodAfter = document.getElementById('mood-after');
        if (moodAfter) {
            moodAfter.addEventListener('input', (e) => {
                document.getElementById('mood-after-value').textContent = e.target.value;
            });
        }

        // Movement timer button
        const startMovement = document.getElementById('start-movement');
        if (startMovement) {
            startMovement.addEventListener('click', () => this.startMovementTimer());
        }

        // Save mood data button
        const saveMoodData = document.getElementById('save-mood-data');
        if (saveMoodData) {
            saveMoodData.addEventListener('click', () => this.saveMoodData());
        }
    }

    // Start movement timer
    startMovementTimer() {
        const moodBefore = document.getElementById('mood-before');
        if (!moodBefore || !moodBefore.value) {
            alert('Please rate your current mood first!');
            return;
        }

        // Create new session
        this.currentSession = {
            startTime: Date.now(),
            moodBefore: parseInt(moodBefore.value),
            moodAfter: null,
            completed: false
        };

        // Hide start button and show timer
        document.getElementById('start-movement').style.display = 'none';
        document.getElementById('movement-instructions').style.display = 'block';

        // Start 2-minute timer
        this.runMovementTimer(120); // 2 minutes in seconds
    }

    // Run the movement timer
    runMovementTimer(duration) {
        let timeLeft = duration;
        let instructionIndex = 0;
        const timerDisplay = document.getElementById('timer');
        const instructionText = document.getElementById('instruction-text');

        this.movementTimer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            // Change instruction every 15 seconds
            if (timeLeft % 15 === 0 && instructionIndex < this.movementInstructions.length) {
                instructionText.textContent = this.movementInstructions[instructionIndex];
                this.animateInstructionChange(instructionText);
                instructionIndex++;
            }

            timeLeft--;

            if (timeLeft < 0) {
                this.completeMovementTimer();
            }
        }, 1000);

        // Initial instruction
        instructionText.textContent = this.movementInstructions[0];
    }

    // Complete movement timer
    completeMovementTimer() {
        clearInterval(this.movementTimer);

        // Hide timer and show mood after section
        document.getElementById('movement-instructions').style.display = 'none';
        document.querySelector('.mood-after').style.display = 'block';

        // Show completion message
        const instructionText = document.getElementById('instruction-text');
        if (instructionText) {
            instructionText.textContent = "Great job! How do you feel now?";
            instructionText.style.color = '#059669';
            instructionText.style.fontWeight = 'bold';
        }

        // Play completion sound if possible
        this.playCompletionSound();

        // Track interaction
        if (typeof trackInteraction === 'function') {
            trackInteraction('movement-timer', 'completed', '2-minutes');
        }
    }

    // Save mood data
    saveMoodData() {
        const moodAfter = document.getElementById('mood-after');
        if (!moodAfter || !moodAfter.value) {
            alert('Please rate your mood after the movement!');
            return;
        }

        if (!this.currentSession) {
            alert('No active movement session found!');
            return;
        }

        // Complete the session
        this.currentSession.moodAfter = parseInt(moodAfter.value);
        this.currentSession.endTime = Date.now();
        this.currentSession.completed = true;

        // Calculate mood change
        const moodChange = this.currentSession.moodAfter - this.currentSession.moodBefore;

        // Save to data
        this.data.sessions.push(this.currentSession);
        this.saveData();

        // Show results
        this.displayMoodResults(moodChange);

        // Mark section as complete
        if (typeof markSectionComplete === 'function') {
            markSectionComplete('personal-assessment');
        }

        // Track interaction
        if (typeof trackInteraction === 'function') {
            trackInteraction('mood-tracker', 'completed', {
                moodBefore: this.currentSession.moodBefore,
                moodAfter: this.currentSession.moodAfter,
                change: moodChange
            });
        }
    }

    // Display mood results
    displayMoodResults(moodChange) {
        const resultsDiv = document.querySelector('.mood-results');
        const changeDiv = document.getElementById('mood-change');

        if (!resultsDiv || !changeDiv) return;

        let message, className;

        if (moodChange > 0) {
            message = `🎉 Fantastic! Your mood improved by ${moodChange} points! Movement really works!`;
            className = 'positive';
        } else if (moodChange === 0) {
            message = `😊 Your mood stayed steady. Sometimes movement helps us maintain our current state!`;
            className = 'neutral';
        } else {
            message = `💚 Thank you for tracking your mood. Movement benefits build over time - keep going!`;
            className = 'neutral';
        }

        changeDiv.textContent = message;
        changeDiv.className = `mood-change ${className}`;
        resultsDiv.style.display = 'block';

        // Animate results
        setTimeout(() => {
            changeDiv.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 100);
    }

    // Load data from localStorage
    loadData() {
        const saved = localStorage.getItem('movementMedicineMoodData');
        if (saved) {
            return JSON.parse(saved);
        }

        return {
            sessions: [],
            totalSessions: 0,
            averageMoodImprovement: 0
        };
    }

    // Save data to localStorage
    saveData() {
        // Update statistics
        this.data.totalSessions = this.data.sessions.length;

        if (this.data.sessions.length > 0) {
            const improvements = this.data.sessions.map(s => s.moodAfter - s.moodBefore);
            this.data.averageMoodImprovement = improvements.reduce((a, b) => a + b, 0) / improvements.length;
        }

        localStorage.setItem('movementMedicineMoodData', JSON.stringify(this.data));
    }

    // Update mood slider values
    updateMoodValues() {
        const moodBefore = document.getElementById('mood-before');
        const moodAfter = document.getElementById('mood-after');

        if (moodBefore) {
            document.getElementById('mood-before-value').textContent = moodBefore.value;
        }

        if (moodAfter) {
            document.getElementById('mood-after-value').textContent = moodAfter.value;
        }
    }

    // Display previous sessions summary
    displayPreviousSessions() {
        if (this.data.sessions.length === 0) return;

        const tracker = document.querySelector('.mood-tracker');
        if (!tracker) return;

        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'previous-sessions';
        summaryDiv.innerHTML = `
            <h4>Your Movement Journey So Far</h4>
            <div class="session-stats">
                <div class="stat">
                    <span class="stat-value">${this.data.totalSessions}</span>
                    <span class="stat-label">Movement Sessions</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${this.data.averageMoodImprovement.toFixed(1)}</span>
                    <span class="stat-label">Avg Mood Boost</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${this.getStreakDays()}</span>
                    <span class="stat-label">Day Streak</span>
                </div>
            </div>
        `;

        tracker.appendChild(summaryDiv);
    }

    // Calculate streak days
    getStreakDays() {
        if (this.data.sessions.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let streak = 0;
        const sessionDays = this.data.sessions.map(s => {
            const date = new Date(s.startTime);
            date.setHours(0, 0, 0, 0);
            return date.getTime();
        });

        const uniqueDays = [...new Set(sessionDays)].sort((a, b) => b - a);

        for (let i = 0; i < uniqueDays.length; i++) {
            const daysDiff = Math.floor((today.getTime() - uniqueDays[i]) / (24 * 60 * 60 * 1000));

            if (daysDiff === i) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    // Animate instruction change
    animateInstructionChange(element) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#059669';

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#374151';
        }, 500);
    }

    // Play completion sound
    playCompletionSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Audio not supported, that's okay
            console.log('Audio completion sound not supported');
        }
    }

    // Export data for analysis
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'movement-medicine-mood-data.json';
        link.click();

        URL.revokeObjectURL(url);
    }
}

// Global mood tracker instance
let moodTracker;

// Initialize mood tracker
function initializeMoodTracker() {
    moodTracker = new MoodTracker();
    moodTracker.initialize();
}

// Add CSS for previous sessions
const moodTrackerStyles = document.createElement('style');
moodTrackerStyles.textContent = `
    .previous-sessions {
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 12px;
        padding: 1.5rem;
        margin-top: 2rem;
    }

    .previous-sessions h4 {
        color: #059669;
        margin-bottom: 1rem;
        text-align: center;
    }

    .session-stats {
        display: flex;
        justify-content: space-around;
        text-align: center;
    }

    .session-stats .stat {
        flex: 1;
    }

    .session-stats .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #059669;
    }

    .session-stats .stat-label {
        font-size: 0.875rem;
        color: #047857;
    }

    @media (max-width: 480px) {
        .session-stats {
            flex-direction: column;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(moodTrackerStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MoodTracker, initializeMoodTracker };
}