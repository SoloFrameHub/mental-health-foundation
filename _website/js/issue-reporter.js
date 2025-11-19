/**
 * Issue Reporter Widget for Mental Health Education Platform
 *
 * Allows users to report issues directly from course pages
 * Captures full context and state at the time of the issue
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        chatwootUrl: 'https://chat.realpsychiatricservices.com',
        websiteToken: 'UPjFAsCNoVrbpyefCiRhJdgo',
        apiToken: 'MHzaqW2U3VJaPNGaRoyMmeQE',
        inboxId: 1
    };

    /**
     * Capture complete state when issue occurs
     */
    function captureState() {
        const state = {
            // Page context
            url: window.location.href,
            path: window.location.pathname,
            title: document.title,
            referrer: document.referrer || 'direct',

            // Timestamp
            timestamp: new Date().toISOString(),
            userTime: new Date().toLocaleString(),

            // Browser info
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            screen: {
                width: screen.width,
                height: screen.height
            },

            // Course context
            courseInfo: detectCourseContext(),

            // User progress (if available)
            progress: captureProgressState(),

            // Video state (if applicable)
            videoState: captureVideoState(),

            // Scroll position
            scrollPosition: {
                x: window.scrollX,
                y: window.scrollY,
                percentScrolled: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
            },

            // Console errors (last 5)
            recentErrors: getRecentConsoleErrors(),

            // Network status
            networkStatus: navigator.onLine ? 'online' : 'offline',

            // Performance metrics
            performance: getPerformanceMetrics()
        };

        return state;
    }

    /**
     * Detect course context from URL and page
     */
    function detectCourseContext() {
        const pathParts = window.location.pathname.split('/');

        // Course mapping
        const coursePillarMap = {
            'course-1-movement-medicine': { id: 1, pillar: '1-Physical-Vitality', name: 'Movement Medicine' },
            'course-2-workplace-mental-health': { id: 2, pillar: '1-Physical-Vitality', name: 'Workplace Mental Health' },
            'course-3-digital-wellness': { id: 3, pillar: '1-Physical-Vitality', name: 'Digital Wellness' },
            'course-4-growth-mindset': { id: 4, pillar: '2-Cognitive-Mastery', name: 'Growth Mindset' },
            'course-5-cbt-fundamentals': { id: 5, pillar: '2-Cognitive-Mastery', name: 'CBT Fundamentals' },
            'course-6-stress-challenge-navigation': { id: 6, pillar: '2-Cognitive-Mastery', name: 'Stress & Challenge Navigation' },
            'course-7-boundaries-bootcamp': { id: 7, pillar: '2-Cognitive-Mastery', name: 'Boundaries Bootcamp' },
            'course-8-social-circle-mastery': { id: 8, pillar: '3-Social-Connection', name: 'Social Circle Mastery' },
            'course-9-team-sports-mental-health': { id: 9, pillar: '3-Social-Connection', name: 'Team Sports & Mental Health' },
            'course-10-relationship-dynamics': { id: 10, pillar: '3-Social-Connection', name: 'Relationship Dynamics' },
            'course-11-family-parenting-mental-health': { id: 11, pillar: '3-Social-Connection', name: 'Family & Parenting' },
            'course-12-purpose-and-responsibility': { id: 12, pillar: '4-Purpose-Leadership', name: 'Purpose & Responsibility' },
            'course-13-mental-health-first-aid': { id: 13, pillar: '4-Purpose-Leadership', name: 'Mental Health First Aid' },
            'course-14-coaching-mentoring': { id: 14, pillar: '4-Purpose-Leadership', name: 'Coaching & Mentoring' },
            'course-15-legacy-building': { id: 15, pillar: '4-Purpose-Leadership', name: 'Legacy Building' },
            'course-16-recreational-therapy': { id: 16, pillar: '5-Creative-Expression', name: 'Recreational Therapy' },
            'course-17-creative-expression': { id: 17, pillar: '5-Creative-Expression', name: 'Creative Expression' },
            'course-18-adventure-outdoor-mental-health': { id: 18, pillar: '5-Creative-Expression', name: 'Adventure & Outdoor Mental Health' },
            'course-19-music-movement-wellness': { id: 19, pillar: '5-Creative-Expression', name: 'Music, Movement & Wellness' }
        };

        // Detect course
        for (const [courseKey, courseData] of Object.entries(coursePillarMap)) {
            if (pathParts.some(part => part.includes(courseKey))) {
                const lessonMatch = window.location.pathname.match(/lesson-(\d+)-(\d+)/);
                return {
                    courseId: courseData.id,
                    courseName: courseData.name,
                    pillar: courseData.pillar,
                    lesson: lessonMatch ? {
                        module: parseInt(lessonMatch[1]),
                        lesson: parseInt(lessonMatch[2])
                    } : null
                };
            }
        }

        return null;
    }

    /**
     * Capture user progress state from localStorage
     */
    function captureProgressState() {
        try {
            const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
            // Don't include PHI, just course completion stats
            return {
                totalCoursesStarted: Object.keys(progress).length,
                currentCourse: progress[window.location.pathname]
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Capture video player state if video is present
     */
    function captureVideoState() {
        const videos = document.querySelectorAll('video');
        if (videos.length === 0) return null;

        const videoStates = Array.from(videos).map(video => ({
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused,
            muted: video.muted,
            volume: video.volume,
            src: video.currentSrc ? video.currentSrc.split('/').pop() : 'unknown'
        }));

        return videoStates;
    }

    /**
     * Get recent console errors (stored by error listener)
     */
    function getRecentConsoleErrors() {
        return window.__recentErrors || [];
    }

    /**
     * Get performance metrics
     */
    function getPerformanceMetrics() {
        if (!window.performance) return null;

        const navigation = performance.getEntriesByType('navigation')[0];
        return {
            pageLoadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : null,
            domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : null,
            timeToInteractive: navigation ? Math.round(navigation.domInteractive - navigation.fetchStart) : null
        };
    }

    /**
     * Create and inject the issue report button
     */
    function createReportButton() {
        const button = document.createElement('button');
        button.id = 'issue-report-btn';
        button.className = 'issue-report-button';
        button.innerHTML = `
            <i class="bi bi-chat-dots"></i>
            <span>We want to hear from you</span>
        `;
        button.setAttribute('aria-label', 'Contact us with feedback or report an issue');
        button.addEventListener('click', openFeedbackDialog);

        document.body.appendChild(button);
    }

    /**
     * Create feedback choice dialog
     */
    function openFeedbackDialog() {
        // Check if dialog already exists
        if (document.getElementById('feedback-choice-dialog')) {
            document.getElementById('feedback-choice-dialog').style.display = 'flex';
            return;
        }

        const dialog = document.createElement('div');
        dialog.id = 'feedback-choice-dialog';
        dialog.className = 'issue-report-dialog';
        dialog.innerHTML = `
            <div class="issue-report-content">
                <div class="issue-report-header">
                    <h3><i class="bi bi-chat-heart-fill"></i> How Can We Help?</h3>
                    <button class="close-btn" onclick="this.closest('.issue-report-dialog').style.display='none'" aria-label="Close dialog">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div class="issue-report-body">
                    <p class="help-text">Choose what you'd like to do:</p>

                    <div class="feedback-choice-cards">
                        <div class="feedback-choice-card" onclick="window.IssueReporter.openReportDialog(); document.getElementById('feedback-choice-dialog').style.display='none'">
                            <div class="choice-icon">
                                <i class="bi bi-bug-fill"></i>
                            </div>
                            <h4>Report Technical Issue</h4>
                            <p>Something not working? Let us know so we can fix it.</p>
                            <ul class="choice-examples">
                                <li>Broken links or navigation</li>
                                <li>Quiz or assessment errors</li>
                                <li>Video playback problems</li>
                                <li>Display or formatting issues</li>
                            </ul>
                            <button class="choice-button">
                                <i class="bi bi-tools"></i> Report Issue
                            </button>
                        </div>

                        <div class="feedback-choice-card" onclick="window.IssueReporter.openGeneralFeedback(); document.getElementById('feedback-choice-dialog').style.display='none'">
                            <div class="choice-icon" style="background: linear-gradient(135deg, #28a745 0%, #20803a 100%);">
                                <i class="bi bi-chat-square-text-fill"></i>
                            </div>
                            <h4>Share General Feedback</h4>
                            <p>Have suggestions, questions, or want to share your experience?</p>
                            <ul class="choice-examples">
                                <li>Course suggestions or ideas</li>
                                <li>What you liked or didn't like</li>
                                <li>Questions about content</li>
                                <li>General comments</li>
                            </ul>
                            <button class="choice-button" style="background: linear-gradient(135deg, #28a745 0%, #20803a 100%);">
                                <i class="bi bi-chat-dots"></i> Share Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
    }

    /**
     * Create report dialog
     */
    function openReportDialog() {
        // Check if dialog already exists
        if (document.getElementById('issue-report-dialog')) {
            document.getElementById('issue-report-dialog').style.display = 'flex';
            return;
        }

        const dialog = document.createElement('div');
        dialog.id = 'issue-report-dialog';
        dialog.className = 'issue-report-dialog';
        dialog.innerHTML = `
            <div class="issue-report-content">
                <div class="issue-report-header">
                    <h3><i class="bi bi-bug-fill"></i> Report Technical Issue</h3>
                    <button class="close-btn" onclick="this.closest('.issue-report-dialog').style.display='none'" aria-label="Close dialog">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div class="issue-report-body">
                    <p class="help-text">Help us fix this quickly by providing details below. We'll capture technical information automatically.</p>

                    <div class="form-group">
                        <label for="issue-category" class="form-label">
                            <i class="bi bi-tag-fill"></i> What type of issue?
                        </label>
                        <select id="issue-category" class="form-select" required>
                            <option value="">Choose issue type...</option>
                            <option value="navigation">🔗 Navigation or broken link</option>
                            <option value="content">📝 Content missing or incorrect</option>
                            <option value="display">🎨 Display or formatting problem</option>
                            <option value="quiz">✅ Quiz or assessment not working</option>
                            <option value="video">🎥 Video playback issue</option>
                            <option value="performance">⚡ Page loading slowly</option>
                            <option value="mobile">📱 Mobile device issue</option>
                            <option value="other">🔧 Other technical problem</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="issue-description" class="form-label">
                            <i class="bi bi-chat-left-text-fill"></i> What happened?
                        </label>
                        <textarea
                            id="issue-description"
                            class="form-control"
                            rows="4"
                            placeholder="Example: When I click 'Next Lesson', it takes me to the wrong lesson..."
                            required
                        ></textarea>
                        <small class="form-hint">Be specific about what you were trying to do and what went wrong.</small>
                    </div>

                    <div class="form-group">
                        <label for="issue-email" class="form-label">
                            <i class="bi bi-envelope-fill"></i> Email (optional)
                        </label>
                        <input
                            type="email"
                            id="issue-email"
                            class="form-control"
                            placeholder="your.email@example.com"
                        >
                        <small class="form-hint">Only if you want us to follow up with you</small>
                    </div>

                    <div class="info-box">
                        <div class="info-icon">
                            <i class="bi bi-shield-check"></i>
                        </div>
                        <div class="info-content">
                            <strong>Automatic data capture</strong>
                            <p>We'll include: page URL, browser type, screen size, and any relevant timestamps to help reproduce the issue.</p>
                        </div>
                    </div>
                </div>

                <div class="issue-report-footer">
                    <button class="btn btn-cancel" onclick="this.closest('.issue-report-dialog').style.display='none'">
                        Cancel
                    </button>
                    <button class="btn btn-submit" onclick="window.IssueReporter.submitIssue()">
                        <i class="bi bi-send-fill"></i> Submit Report
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
    }

    /**
     * Create general feedback dialog
     */
    function openGeneralFeedback() {
        // Check if dialog already exists
        if (document.getElementById('general-feedback-dialog')) {
            document.getElementById('general-feedback-dialog').style.display = 'flex';
            return;
        }

        const dialog = document.createElement('div');
        dialog.id = 'general-feedback-dialog';
        dialog.className = 'issue-report-dialog';
        dialog.innerHTML = `
            <div class="issue-report-content">
                <div class="issue-report-header">
                    <h3><i class="bi bi-chat-square-text-fill"></i> Share Your Feedback</h3>
                    <button class="close-btn" onclick="this.closest('.issue-report-dialog').style.display='none'" aria-label="Close dialog">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div class="issue-report-body">
                    <p class="help-text">We'd love to hear your thoughts! Your feedback helps us improve the Mental Health Education Platform for everyone.</p>

                    <div class="form-group">
                        <label for="feedback-type" class="form-label">
                            <i class="bi bi-tag-fill"></i> What would you like to share?
                        </label>
                        <select id="feedback-type" class="form-select">
                            <option value="">Choose feedback type...</option>
                            <option value="suggestion">💡 Suggestion or idea</option>
                            <option value="liked">❤️ What I liked</option>
                            <option value="disliked">💔 What could be better</option>
                            <option value="question">❓ Question about content</option>
                            <option value="testimonial">⭐ Success story or testimonial</option>
                            <option value="general">💬 General comment</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="feedback-message" class="form-label">
                            <i class="bi bi-chat-left-text-fill"></i> Your Feedback
                        </label>
                        <textarea
                            id="feedback-message"
                            class="form-control"
                            rows="6"
                            placeholder="Share your thoughts, suggestions, or questions here..."
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label for="feedback-email" class="form-label">
                            <i class="bi bi-envelope-fill"></i> Email (optional)
                        </label>
                        <input
                            type="email"
                            id="feedback-email"
                            class="form-control"
                            placeholder="your.email@example.com"
                        >
                        <small class="form-hint">Only if you'd like us to respond</small>
                    </div>

                    <div class="info-box" style="background: linear-gradient(135deg, #d4edda 0%, #e7f5e9 100%); border-color: #c3e6cb;">
                        <div class="info-icon" style="background: #28a745;">
                            <i class="bi bi-heart-fill"></i>
                        </div>
                        <div class="info-content">
                            <strong style="color: #155724;">Your Voice Matters</strong>
                            <p style="color: #155724;">Every piece of feedback helps us create better mental wellness education. Thank you for taking the time to share!</p>
                        </div>
                    </div>
                </div>

                <div class="issue-report-footer">
                    <button class="btn btn-cancel" onclick="this.closest('.issue-report-dialog').style.display='none'">
                        Cancel
                    </button>
                    <button class="btn btn-submit" style="background: linear-gradient(135deg, #28a745 0%, #20803a 100%);" onclick="window.IssueReporter.submitFeedback()">
                        <i class="bi bi-send-fill"></i> Send Feedback
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
    }

    /**
     * Submit general feedback
     */
    async function submitFeedback() {
        const feedbackType = document.getElementById('feedback-type').value;
        const message = document.getElementById('feedback-message').value;
        const email = document.getElementById('feedback-email').value;

        // Validation
        if (!message.trim()) {
            alert('Please share your feedback');
            return;
        }

        try {
            // Show loading state
            const submitBtn = document.querySelector('#general-feedback-dialog .btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';

            // Send to backend
            await fetch('https://digital-wellness-api.mike-348.workers.dev/api/feedback/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: feedbackType || 'general',
                    message: message,
                    email: email,
                    page: window.location.href,
                    timestamp: new Date().toISOString()
                })
            });

            // Open Chatwoot if available
            if (window.$chatwoot) {
                if (email) {
                    window.$chatwoot.setUser(email, { email: email });
                }
                window.$chatwoot.setCustomAttributes({
                    feedback_type: feedbackType || 'general',
                    feedback_page: window.location.pathname
                });
                window.$chatwoot.toggle('open');
            }

            // Show success
            const successDiv = document.createElement('div');
            successDiv.className = 'issue-report-success';
            successDiv.innerHTML = `
                <div class="alert alert-success" style="background: linear-gradient(135deg, #d4edda 0%, #e7f5e9 100%); border-color: #c3e6cb;">
                    <i class="bi bi-check-circle"></i>
                    <strong>Thank you for your feedback!</strong>
                    <p class="mb-0">We've received your message and truly appreciate you taking the time to share.</p>
                </div>
            `;
            document.body.appendChild(successDiv);
            setTimeout(() => successDiv.remove(), 5000);

            // Close dialog
            document.getElementById('general-feedback-dialog').style.display = 'none';

        } catch (error) {
            console.error('Failed to submit feedback:', error);
            alert('Failed to submit feedback. Please try the chat widget or email support@realpsychiatricservices.com');

            // Reset button
            const submitBtn = document.querySelector('#general-feedback-dialog .btn-submit');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Send Feedback';
        }
    }

    /**
     * Submit issue to Chatwoot
     */
    async function submitIssue() {
        const category = document.getElementById('issue-category').value;
        const description = document.getElementById('issue-description').value;
        const email = document.getElementById('issue-email').value;

        // Validation
        if (!category) {
            alert('Please select an issue type');
            return;
        }

        if (!description.trim()) {
            alert('Please describe the issue');
            return;
        }

        // Capture full state
        const state = captureState();

        // Format message for Chatwoot
        const message = formatIssueMessage(category, description, email, state);

        try {
            // Show loading state
            const submitBtn = document.querySelector('.issue-report-footer .btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';

            // Send to backend alert system (PRIORITY - creates VS Code notification)
            await sendToAlertSystem(category, description, email, state);

            // Also open Chatwoot for support team
            if (window.$chatwoot) {
                // Set contact info if email provided
                if (email) {
                    window.$chatwoot.setUser(email, {
                        email: email
                    });
                }

                // Set custom attributes for routing
                window.$chatwoot.setCustomAttributes({
                    issue_type: category,
                    issue_page: state.path,
                    issue_course: state.courseInfo ? state.courseInfo.courseName : 'N/A',
                    automated_report: true
                });

                // Open widget
                window.$chatwoot.toggle('open');

                console.log('Issue Report Ready:', message);
            }

            // Show success
            showSuccessMessage(message);

            // Close dialog
            document.getElementById('issue-report-dialog').style.display = 'none';

        } catch (error) {
            console.error('Failed to submit issue:', error);
            alert('Failed to submit issue. Please try using the chat widget directly or email support@realpsychiatricservices.com');

            // Reset button
            const submitBtn = document.querySelector('.issue-report-footer .btn-submit');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Submit Report';
        }
    }

    /**
     * Send issue to backend alert system
     */
    async function sendToAlertSystem(category, description, email, state) {
        try {
            const response = await fetch('https://digital-wellness-api.mike-348.workers.dev/api/issues/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category,
                    description: description,
                    email: email,
                    state: state
                })
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Issue sent to alert system. ID:', data.issueId);
            } else {
                console.warn('⚠️ Failed to send to alert system:', data.error);
            }
        } catch (error) {
            console.warn('⚠️ Alert system unavailable:', error.message);
            // Don't fail the whole submission if alert system is down
        }
    }

    /**
     * Format issue message for Chatwoot
     */
    function formatIssueMessage(category, description, email, state) {
        const courseInfo = state.courseInfo || {};
        const videoInfo = state.videoState && state.videoState.length > 0 ? state.videoState[0] : null;

        let message = `🚨 AUTOMATED ISSUE REPORT\n\n`;
        message += `**Issue Type:** ${category}\n\n`;
        message += `**User Description:**\n${description}\n\n`;

        if (email) {
            message += `**Contact Email:** ${email}\n\n`;
        }

        message += `---\n**CAPTURED STATE:**\n\n`;
        message += `**Page:** ${state.title}\n`;
        message += `**URL:** ${state.url}\n`;
        message += `**Time:** ${state.userTime}\n\n`;

        if (courseInfo.courseName) {
            message += `**Course:** ${courseInfo.courseName}\n`;
            message += `**Pillar:** ${courseInfo.pillar}\n`;
            if (courseInfo.lesson) {
                message += `**Lesson:** Module ${courseInfo.lesson.module}, Lesson ${courseInfo.lesson.lesson}\n`;
            }
            message += `\n`;
        }

        if (videoInfo) {
            message += `**Video State:**\n`;
            message += `- Time: ${Math.round(videoInfo.currentTime)}s / ${Math.round(videoInfo.duration)}s\n`;
            message += `- Status: ${videoInfo.paused ? 'Paused' : 'Playing'}\n`;
            message += `- File: ${videoInfo.src}\n\n`;
        }

        message += `**Browser:** ${navigator.userAgent}\n`;
        message += `**Viewport:** ${state.viewport.width}x${state.viewport.height}\n`;
        message += `**Scroll:** ${state.scrollPosition.percentScrolled}% down page\n`;
        message += `**Network:** ${state.networkStatus}\n\n`;

        if (state.performance) {
            message += `**Performance:**\n`;
            message += `- Page Load: ${state.performance.pageLoadTime}ms\n`;
            message += `- DOM Ready: ${state.performance.domContentLoaded}ms\n\n`;
        }

        if (state.recentErrors && state.recentErrors.length > 0) {
            message += `**Recent Errors:**\n`;
            state.recentErrors.slice(0, 3).forEach(err => {
                message += `- ${err}\n`;
            });
            message += `\n`;
        }

        message += `---\n`;
        message += `*This is an automated report generated by the Issue Reporter widget.*`;

        return message;
    }

    /**
     * Show success message
     */
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'issue-report-success';
        successDiv.innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle"></i>
                <strong>Issue reported successfully!</strong>
                <p class="mb-0">The chat widget has opened with your issue details. Our support team will respond shortly.</p>
            </div>
        `;

        document.body.appendChild(successDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    /**
     * Inject styles
     */
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Issue Report Button */
            .issue-report-button {
                position: fixed;
                bottom: 90px;
                right: 24px;
                background: linear-gradient(135deg, #5B7DB1 0%, #4a6fa5 100%);
                color: white;
                border: none;
                border-radius: 50px;
                padding: 12px 20px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(91, 125, 177, 0.4);
                z-index: 999999;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            }

            .issue-report-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(91, 125, 177, 0.5);
                background: linear-gradient(135deg, #4a6fa5 0%, #3d5a8a 100%);
            }

            .issue-report-button i {
                font-size: 16px;
            }

            /* Issue Report Dialog */
            .issue-report-dialog {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                z-index: 9999999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .issue-report-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }

            .issue-report-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid #dee2e6;
            }

            .issue-report-header h3 {
                margin: 0;
                font-size: 20px;
                font-weight: 600;
                color: #212529;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .issue-report-header h3 i {
                color: #5B7DB1;
            }

            .close-btn {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #6c757d;
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: all 0.2s;
            }

            .close-btn:hover {
                background: #f8f9fa;
                color: #212529;
            }

            .issue-report-body {
                padding: 28px;
                overflow-y: auto;
                flex: 1;
            }

            .help-text {
                color: #6c757d;
                font-size: 15px;
                margin-bottom: 24px;
                line-height: 1.5;
            }

            .form-group {
                margin-bottom: 22px;
            }

            .form-label {
                font-weight: 600;
                color: #212529;
                margin-bottom: 10px;
                font-size: 15px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .form-label i {
                color: #5B7DB1;
                font-size: 16px;
            }

            .form-select, .form-control {
                width: 100%;
                padding: 11px 14px;
                border: 2px solid #e9ecef;
                border-radius: 10px;
                font-size: 15px;
                transition: all 0.2s ease;
                font-family: inherit;
            }

            .form-select:focus, .form-control:focus {
                outline: none;
                border-color: #5B7DB1;
                box-shadow: 0 0 0 4px rgba(91, 125, 177, 0.1);
            }

            .form-hint {
                display: block;
                color: #6c757d;
                font-size: 13px;
                margin-top: 6px;
                font-style: italic;
            }

            .info-box {
                background: linear-gradient(135deg, #e7f3ff 0%, #f0f7ff 100%);
                border: 1px solid #b8daff;
                border-radius: 12px;
                padding: 16px 18px;
                display: flex;
                gap: 14px;
                margin-top: 8px;
            }

            .info-icon {
                flex-shrink: 0;
                width: 32px;
                height: 32px;
                background: #5B7DB1;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
            }

            .info-content {
                flex: 1;
            }

            .info-content strong {
                display: block;
                color: #004085;
                margin-bottom: 4px;
                font-size: 14px;
            }

            .info-content p {
                margin: 0;
                color: #004085;
                font-size: 13px;
                line-height: 1.5;
            }

            .issue-report-footer {
                padding: 20px 28px;
                border-top: 1px solid #e9ecef;
                background: #f8f9fa;
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                flex-shrink: 0;
            }

            .issue-report-footer .btn {
                padding: 12px 26px;
                border-radius: 10px;
                font-weight: 600;
                font-size: 15px;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: inherit;
            }

            .btn-cancel {
                background: white;
                color: #6c757d;
                border: 2px solid #dee2e6;
            }

            .btn-cancel:hover {
                background: #f8f9fa;
                border-color: #adb5bd;
                color: #495057;
            }

            .btn-submit {
                background: linear-gradient(135deg, #5B7DB1 0%, #4a6fa5 100%);
                color: white;
                box-shadow: 0 4px 12px rgba(91, 125, 177, 0.3);
            }

            .btn-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(91, 125, 177, 0.4);
            }

            .btn-submit:active {
                transform: translateY(0);
            }

            /* Success Message */
            .issue-report-success {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 99999999;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .issue-report-button {
                    bottom: 80px;
                    right: 16px;
                    padding: 10px 16px;
                    font-size: 13px;
                }

                .issue-report-button span {
                    display: none;
                }

                .issue-report-content {
                    margin: 0;
                    border-radius: 0;
                    max-height: 100vh;
                    height: 100%;
                }
            }

            /* Focus styles for accessibility */
            .issue-report-button:focus-visible {
                outline: 3px solid #5B7DB1;
                outline-offset: 2px;
            }

            /* Feedback Choice Cards */
            .feedback-choice-cards {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-top: 20px;
            }

            .feedback-choice-card {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 12px;
                padding: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
            }

            .feedback-choice-card:hover {
                border-color: #5B7DB1;
                box-shadow: 0 8px 24px rgba(91, 125, 177, 0.15);
                transform: translateY(-4px);
            }

            .feedback-choice-card .choice-icon {
                width: 64px;
                height: 64px;
                background: linear-gradient(135deg, #5B7DB1 0%, #4a6fa5 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 16px;
                color: white;
                font-size: 28px;
            }

            .feedback-choice-card h4 {
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 12px;
                color: #212529;
            }

            .feedback-choice-card p {
                font-size: 14px;
                color: #6c757d;
                margin: 0 0 16px;
                line-height: 1.5;
            }

            .feedback-choice-card .choice-examples {
                list-style: none;
                padding: 0;
                margin: 0 0 20px;
                text-align: left;
            }

            .feedback-choice-card .choice-examples li {
                font-size: 13px;
                color: #6c757d;
                padding: 6px 0;
                padding-left: 24px;
                position: relative;
            }

            .feedback-choice-card .choice-examples li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #5B7DB1;
                font-weight: 600;
            }

            .feedback-choice-card .choice-button {
                width: 100%;
                background: linear-gradient(135deg, #5B7DB1 0%, #4a6fa5 100%);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 12px 20px;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-family: inherit;
            }

            .feedback-choice-card .choice-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(91, 125, 177, 0.3);
            }

            @media (max-width: 768px) {
                .feedback-choice-cards {
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Track console errors
     */
    function trackConsoleErrors() {
        window.__recentErrors = [];

        window.addEventListener('error', function(event) {
            const errorMsg = `${event.message} at ${event.filename}:${event.lineno}`;
            window.__recentErrors.push(errorMsg);

            // Keep only last 10 errors
            if (window.__recentErrors.length > 10) {
                window.__recentErrors.shift();
            }
        });
    }

    /**
     * Initialize
     */
    function init() {
        injectStyles();
        createReportButton();
        trackConsoleErrors();

        // Expose public API
        window.IssueReporter = {
            submitIssue: submitIssue,
            submitFeedback: submitFeedback,
            captureState: captureState,
            openDialog: openReportDialog,
            openReportDialog: openReportDialog,
            openGeneralFeedback: openGeneralFeedback,
            openFeedbackDialog: openFeedbackDialog
        };

        console.log('Issue Reporter initialized');
    }

    // Start on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
