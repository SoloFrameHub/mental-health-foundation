/**
 * Movement Medicine Course - Lesson Interactions
 * Handles core interactive functionality for lessons
 */

// Global lesson state
let lessonState = {
    currentProgress: 0,
    completedSections: [],
    userResponses: {},
    startTime: null,
    timeSpent: 0
};

// Initialize lesson tracking
function initializeLessonTracking() {
    lessonState.startTime = Date.now();
    updateProgress(0);

    // Auto-save progress every 30 seconds
    setInterval(saveProgress, 30000);

    // Save progress when user leaves page
    window.addEventListener('beforeunload', saveProgress);
}

// Progress tracking
function updateProgress(percentage) {
    lessonState.currentProgress = Math.max(lessonState.currentProgress, percentage);

    const progressBar = document.querySelector('.progress');
    if (progressBar) {
        progressBar.style.width = lessonState.currentProgress + '%';
        progressBar.setAttribute('data-progress', lessonState.currentProgress);
    }

    // Update completion button
    if (lessonState.currentProgress >= 90) {
        const completeBtn = document.getElementById('complete-lesson');
        if (completeBtn) {
            completeBtn.style.display = 'inline-block';
            completeBtn.classList.add('pulse');
        }
    }
}

// Save progress to localStorage
function saveProgress() {
    lessonState.timeSpent = Date.now() - lessonState.startTime;

    const progressData = {
        ...lessonState,
        lastSaved: Date.now(),
        url: window.location.pathname
    };

    localStorage.setItem('movementMedicineProgress', JSON.stringify(progressData));
}

// Load previous progress
function loadProgress() {
    const saved = localStorage.getItem('movementMedicineProgress');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.url === window.location.pathname) {
            lessonState = { ...lessonState, ...data };
            updateProgress(lessonState.currentProgress);
        }
    }
}

// Mark section as completed
function markSectionComplete(sectionId) {
    if (!lessonState.completedSections.includes(sectionId)) {
        lessonState.completedSections.push(sectionId);

        // Calculate new progress
        const totalSections = document.querySelectorAll('.interactive-section').length;
        const completedPercent = (lessonState.completedSections.length / totalSections) * 100;
        updateProgress(completedPercent);

        // Visual feedback
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('completed');
            showCompletionFeedback(section);
        }
    }
}

// Show completion feedback
function showCompletionFeedback(element) {
    const feedback = document.createElement('div');
    feedback.className = 'completion-feedback';
    feedback.innerHTML = '✅ Section Complete!';
    feedback.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: #059669;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        animation: fadeInOut 3s ease-in-out forwards;
        z-index: 100;
    `;

    element.style.position = 'relative';
    element.appendChild(feedback);

    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 3000);
}

// Navigation functions
function previousLesson() {
    // Get current lesson number and navigate to previous
    const currentLesson = getCurrentLessonNumber();
    if (currentLesson > 1) {
        const prevLessonUrl = getLessonUrl(currentLesson - 1);
        window.location.href = prevLessonUrl;
    } else {
        // Navigate to course overview
        window.location.href = '../index.html';
    }
}

function nextLesson() {
    const currentLesson = getCurrentLessonNumber();
    const nextLessonUrl = getLessonUrl(currentLesson + 1);

    // Check if next lesson exists
    fetch(nextLessonUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = nextLessonUrl;
            } else {
                // Navigate to course completion
                window.location.href = '../completion.html';
            }
        })
        .catch(() => {
            // Assume course is complete
            window.location.href = '../completion.html';
        });
}

function completeLesson() {
    // Mark lesson as 100% complete
    updateProgress(100);
    saveProgress();

    // Show completion modal
    showLessonCompletionModal();

    // Show next lesson button
    const nextBtn = document.getElementById('next-lesson');
    const completeBtn = document.getElementById('complete-lesson');

    if (nextBtn && completeBtn) {
        completeBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
    }
}

// Show lesson completion modal
function showLessonCompletionModal() {
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.innerHTML = `
        <div class="completion-modal-content">
            <div class="completion-icon">🎉</div>
            <h2>Lesson Complete!</h2>
            <p>Great job! You've successfully completed this lesson.</p>
            <div class="completion-stats">
                <div class="stat">
                    <span class="stat-value">${formatTime(lessonState.timeSpent)}</span>
                    <span class="stat-label">Time Spent</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${lessonState.completedSections.length}</span>
                    <span class="stat-label">Sections Completed</span>
                </div>
            </div>
            <button onclick="closeCompletionModal()" class="continue-btn">Continue to Next Lesson</button>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-in-out;
    `;

    document.body.appendChild(modal);
}

function closeCompletionModal() {
    const modal = document.querySelector('.completion-modal');
    if (modal) {
        modal.remove();
    }
    nextLesson();
}

// Utility functions
function getCurrentLessonNumber() {
    const path = window.location.pathname;
    const match = path.match(/lesson-(\d+)-(\d+)/);
    return match ? parseInt(match[1]) * 10 + parseInt(match[2]) : 1;
}

function getLessonUrl(lessonNumber) {
    const section = Math.floor(lessonNumber / 10);
    const lesson = lessonNumber % 10;
    return `lesson-${section}-${lesson}.html`;
}

function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
}

// Scroll-based progress tracking
function initializeScrollTracking() {
    let maxScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);

        // Update progress based on scroll
        if (maxScroll > lessonState.currentProgress) {
            updateProgress(Math.min(maxScroll, 90)); // Cap at 90% until completion
        }
    });
}

// Interactive element tracking
function trackInteraction(elementId, action, value = null) {
    const interaction = {
        element: elementId,
        action: action,
        value: value,
        timestamp: Date.now()
    };

    if (!lessonState.userResponses.interactions) {
        lessonState.userResponses.interactions = [];
    }

    lessonState.userResponses.interactions.push(interaction);
    saveProgress();
}

// Crisis detection integration
function checkForCrisisKeywords(text) {
    const crisisKeywords = [
        'suicide', 'kill myself', 'end it all', 'can\'t go on', 'hopeless',
        'hurt myself', 'self harm', 'die', 'overdose', 'pills'
    ];

    const lowerText = text.toLowerCase();
    const foundKeywords = crisisKeywords.filter(keyword => lowerText.includes(keyword));

    if (foundKeywords.length > 0) {
        triggerCrisisResponse();
        return true;
    }
    return false;
}

function triggerCrisisResponse() {
    // Show crisis modal immediately
    if (typeof showCrisisModal === 'function') {
        showCrisisModal();
    }

    // Log crisis event
    trackInteraction('crisis-detection', 'triggered', 'automatic');
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLessonTracking();
    loadProgress();
    initializeScrollTracking();

    // Set up interaction tracking for all interactive elements
    document.querySelectorAll('button, input, select, textarea').forEach(element => {
        element.addEventListener('click', (e) => {
            trackInteraction(e.target.id || e.target.className, 'click');
        });

        element.addEventListener('change', (e) => {
            trackInteraction(e.target.id || e.target.className, 'change', e.target.value);
        });
    });

    // Track text inputs for crisis keywords
    document.querySelectorAll('textarea, input[type="text"]').forEach(element => {
        element.addEventListener('input', (e) => {
            checkForCrisisKeywords(e.target.value);
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        20%, 80% { opacity: 1; }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .pulse {
        animation: pulse 2s infinite;
    }

    .completed {
        border-left: 4px solid #059669 !important;
    }

    .completion-modal-content {
        background: white;
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }

    .completion-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .completion-stats {
        display: flex;
        justify-content: space-around;
        margin: 2rem 0;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 12px;
    }

    .stat {
        text-align: center;
    }

    .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #059669;
    }

    .stat-label {
        font-size: 0.875rem;
        color: #64748b;
    }

    .continue-btn {
        background: #2563eb;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .continue-btn:hover {
        background: #1d4ed8;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);