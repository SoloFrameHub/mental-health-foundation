/**
 * Forum Integration Frontend
 *
 * Handles Discourse forum integration on the frontend:
 * - Embedded discussions in lessons
 * - SSO authentication flow
 * - Forum status and navigation
 * - Community features integration
 */

class ForumIntegration {
    constructor(config = {}) {
        this.config = {
            forumUrl: config.forumUrl || window.LESSON_CONFIG?.forumUrl || process.env.DISCOURSE_URL,
            ssoEndpoint: config.ssoEndpoint || '/api/discourse/sso',
            embedContainer: config.embedContainer || 'discourse-comments',
            autoEmbed: config.autoEmbed !== false, // Default true
            showForumLinks: config.showForumLinks !== false, // Default true
            ...config
        };

        this.isEmbedded = false;
        this.currentLessonId = window.LESSON_CONFIG?.id;
        this.currentCourseId = window.LESSON_CONFIG?.courseId;

        this.init();
    }

    /**
     * Initialize forum integration
     */
    init() {
        if (this.config.autoEmbed) {
            this.setupEmbeddedDiscussion();
        }

        if (this.config.showForumLinks) {
            this.addForumNavigationLinks();
        }

        this.setupEventListeners();
        this.loadForumStatus();
    }

    /**
     * Setup embedded discussion for current lesson
     */
    setupEmbeddedDiscussion() {
        // Create discussion container if it doesn't exist
        let container = document.getElementById(this.config.embedContainer);

        if (!container) {
            container = this.createDiscussionContainer();
        }

        if (!container) return;

        // Set up Discourse embed
        this.embedDiscussion(container);
    }

    /**
     * Create discussion container in lesson
     */
    createDiscussionContainer() {
        const lessonContent = document.querySelector('.lesson-content');
        if (!lessonContent) return null;

        const discussionSection = document.createElement('section');
        discussionSection.className = 'lesson-discussion mb-5';
        discussionSection.innerHTML = `
            <div class="card">
                <div class="card-header bg-info text-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">💬 Community Discussion</h5>
                        <div class="forum-controls">
                            <button class="btn btn-sm btn-light" onclick="forumIntegration.toggleDiscussion()">
                                <span id="discussion-toggle-text">Hide Discussion</span>
                            </button>
                            <a href="${this.getForumUrl()}" target="_blank" class="btn btn-sm btn-light ms-2">
                                🔗 Open in Forum
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="discussion-intro mb-3">
                        <p class="text-muted small">
                            Share your insights, ask questions, and connect with fellow students.
                            This discussion is moderated by mental health professionals.
                        </p>
                    </div>
                    <div id="${this.config.embedContainer}">
                        <div class="text-center py-4">
                            <div class="spinner-border text-info" role="status">
                                <span class="visually-hidden">Loading discussion...</span>
                            </div>
                            <p class="mt-2 text-muted">Loading community discussion...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert before lesson actions
        const lessonActions = document.querySelector('.lesson-actions');
        if (lessonActions) {
            lessonActions.parentNode.insertBefore(discussionSection, lessonActions);
        } else {
            lessonContent.appendChild(discussionSection);
        }

        return document.getElementById(this.config.embedContainer);
    }

    /**
     * Embed Discourse discussion
     */
    embedDiscussion(container) {
        if (!container || this.isEmbedded) return;

        const embedUrl = `${window.location.origin}${window.location.pathname}`;

        // Set up Discourse embed configuration
        window.DiscourseEmbed = {
            discourseUrl: this.config.forumUrl + '/',
            discourseEmbedUrl: embedUrl,
            className: 'discourse-embed',

            // Optional: Pre-set topic ID if we know it
            ...(this.getTopicId() && { topicId: this.getTopicId() }),

            // Styling options
            discourseUserName: this.getCurrentUsername(),

            // Callbacks
            onLoad: () => {
                this.onDiscussionLoaded();
            }
        };

        // Load Discourse embed script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
        script.onload = () => {
            this.isEmbedded = true;
        };

        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }

    /**
     * Get topic ID for current lesson
     */
    getTopicId() {
        // This would come from lesson configuration or API call
        return window.LESSON_CONFIG?.forumTopicId || null;
    }

    /**
     * Get current username for embed
     */
    getCurrentUsername() {
        // This would come from user session
        return localStorage.getItem('username') || null;
    }

    /**
     * Called when discussion is loaded
     */
    onDiscussionLoaded() {
        const loadingSpinner = document.querySelector(`#${this.config.embedContainer} .spinner-border`);
        if (loadingSpinner) {
            loadingSpinner.parentElement.style.display = 'none';
        }

        // Track analytics
        this.trackEvent('discussion_loaded', {
            lesson_id: this.currentLessonId,
            course_id: this.currentCourseId
        });
    }

    /**
     * Toggle discussion visibility
     */
    toggleDiscussion() {
        const container = document.getElementById(this.config.embedContainer);
        const toggleText = document.getElementById('discussion-toggle-text');

        if (!container || !toggleText) return;

        if (container.style.display === 'none') {
            container.style.display = 'block';
            toggleText.textContent = 'Hide Discussion';
            this.trackEvent('discussion_shown');
        } else {
            container.style.display = 'none';
            toggleText.textContent = 'Show Discussion';
            this.trackEvent('discussion_hidden');
        }
    }

    /**
     * Add forum navigation links to lesson
     */
    addForumNavigationLinks() {
        // Add forum link to lesson header
        this.addHeaderForumLink();

        // Add discussion prompt to journal section
        this.addJournalForumPrompt();

        // Add community insights section
        this.addCommunityInsights();
    }

    /**
     * Add forum link to lesson header
     */
    addHeaderForumLink() {
        const lessonHeader = document.querySelector('.lesson-header');
        if (!lessonHeader) return;

        const practitionerByline = lessonHeader.querySelector('.d-flex.align-items-center:last-child');
        if (!practitionerByline) return;

        const forumLink = document.createElement('div');
        forumLink.className = 'd-flex align-items-center mt-3';
        forumLink.innerHTML = `
            <div class="me-3">
                <i class="bi bi-people-fill text-info"></i>
            </div>
            <div>
                <div class="small">
                    <a href="${this.getForumUrl()}" target="_blank" class="text-decoration-none">
                        💬 Join the discussion with fellow students
                    </a>
                </div>
                <div class="small text-muted">Moderated by mental health professionals</div>
            </div>
        `;

        practitionerByline.parentNode.insertBefore(forumLink, practitionerByline.nextSibling);
    }

    /**
     * Add forum prompt to journal section
     */
    addJournalForumPrompt() {
        const journalSection = document.querySelector('.journal-prompt');
        if (!journalSection) return;

        const journalBody = journalSection.querySelector('.card-body');
        if (!journalBody) return;

        const forumPrompt = document.createElement('div');
        forumPrompt.className = 'alert alert-light mt-3';
        forumPrompt.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-chat-heart text-info me-2"></i>
                <div class="flex-grow-1">
                    <small>
                        <strong>Share with the community:</strong>
                        Consider sharing your insights in the
                        <a href="${this.getForumUrl()}" target="_blank">lesson discussion forum</a>
                        to connect with fellow students.
                    </small>
                </div>
            </div>
        `;

        const saveButton = journalBody.querySelector('button[data-action="saveJournalEntry"]');
        if (saveButton) {
            saveButton.parentNode.insertBefore(forumPrompt, saveButton);
        } else {
            journalBody.appendChild(forumPrompt);
        }
    }

    /**
     * Add community insights section
     */
    addCommunityInsights() {
        // This would show recent community discussions or insights
        const lessonContent = document.querySelector('.lesson-content');
        if (!lessonContent) return;

        const insightsSection = document.createElement('section');
        insightsSection.className = 'community-insights mb-5';
        insightsSection.innerHTML = `
            <div class="card border-info">
                <div class="card-header bg-light">
                    <h6 class="card-title mb-0">
                        <i class="bi bi-lightbulb text-info me-2"></i>
                        Community Insights
                    </h6>
                </div>
                <div class="card-body">
                    <div id="community-insights-content">
                        <div class="text-center py-3">
                            <div class="spinner-border spinner-border-sm text-info" role="status">
                                <span class="visually-hidden">Loading insights...</span>
                            </div>
                            <p class="small text-muted mt-2">Loading community insights...</p>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <a href="${this.getForumUrl()}" target="_blank" class="btn btn-outline-info btn-sm">
                            View All Discussions →
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Insert after practitioner insight if it exists
        const practitionerInsight = document.querySelector('.practitioner-insight');
        if (practitionerInsight) {
            practitionerInsight.parentNode.insertBefore(insightsSection, practitionerInsight.nextSibling);
        } else {
            // Insert after introduction
            const introduction = document.querySelector('.lesson-introduction');
            if (introduction) {
                introduction.parentNode.insertBefore(insightsSection, introduction.nextSibling);
            }
        }

        // Load community insights
        this.loadCommunityInsights();
    }

    /**
     * Load recent community insights
     */
    async loadCommunityInsights() {
        try {
            const response = await fetch(`/api/forum/insights?lesson=${this.currentLessonId}&course=${this.currentCourseId}`);
            const insights = await response.json();

            const container = document.getElementById('community-insights-content');
            if (!container) return;

            if (insights.length === 0) {
                container.innerHTML = `
                    <p class="text-muted small text-center">
                        Be the first to share your insights in the discussion forum!
                    </p>
                `;
                return;
            }

            container.innerHTML = insights.map(insight => `
                <div class="insight-item mb-2 p-2 bg-light rounded">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <p class="small mb-1">"${insight.excerpt}"</p>
                            <div class="small text-muted">
                                by ${insight.author} • ${this.formatTimeAgo(insight.created_at)}
                            </div>
                        </div>
                        <a href="${insight.url}" target="_blank" class="btn btn-sm btn-outline-info ms-2">
                            Reply
                        </a>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Failed to load community insights:', error);
            const container = document.getElementById('community-insights-content');
            if (container) {
                container.innerHTML = `
                    <p class="text-muted small text-center">
                        Unable to load community insights.
                        <a href="${this.getForumUrl()}" target="_blank">Visit the forum directly</a>
                    </p>
                `;
            }
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for lesson progress updates
        document.addEventListener('lessonProgress', (event) => {
            this.onLessonProgress(event.detail);
        });

        // Listen for crisis events
        document.addEventListener('crisisDetected', (event) => {
            this.onCrisisDetected(event.detail);
        });

        // Listen for journal saves
        document.addEventListener('journalSaved', (event) => {
            this.onJournalSaved(event.detail);
        });
    }

    /**
     * Handle lesson progress updates
     */
    onLessonProgress(progressData) {
        // Post progress updates to forum if user opts in
        if (this.shouldShareProgress(progressData)) {
            this.shareProgressToForum(progressData);
        }
    }

    /**
     * Handle crisis detection
     */
    onCrisisDetected(crisisData) {
        // Alert forum moderators if crisis is detected in lesson
        this.alertForumModerators(crisisData);
    }

    /**
     * Handle journal saves
     */
    onJournalSaved(journalData) {
        // Offer to share insights with community
        if (journalData.shareWithCommunity) {
            this.shareJournalInsights(journalData);
        }
    }

    /**
     * Load forum status
     */
    async loadForumStatus() {
        try {
            const response = await fetch('/api/discourse/status');
            const status = await response.json();

            this.forumStatus = status;
            this.updateForumUI(status);

        } catch (error) {
            console.error('Failed to load forum status:', error);
        }
    }

    /**
     * Update forum UI based on status
     */
    updateForumUI(status) {
        // Update forum links with user-specific data
        const forumLinks = document.querySelectorAll('a[href*="forum"]');
        forumLinks.forEach(link => {
            if (status.user_groups.includes('students')) {
                link.href = this.getForumUrl();
            }
        });

        // Show/hide features based on permissions
        if (status.trust_level >= 2) {
            this.enableAdvancedFeatures();
        }
    }

    /**
     * Get forum URL for current lesson/course
     */
    getForumUrl() {
        if (this.currentCourseId && this.forumStatus) {
            const courseSlug = this.getCourseSlug(this.currentCourseId);
            return `${this.config.forumUrl}/c/${courseSlug}`;
        }
        return this.config.forumUrl;
    }

    /**
     * Get course slug for forum URLs
     */
    getCourseSlug(courseId) {
        const courseMap = {
            'movement-medicine': 'movement-medicine',
            'anxiety-mastery-toolkit': 'anxiety-mastery'
        };
        return courseMap[courseId] || courseId;
    }

    /**
     * Navigate to SSO login
     */
    loginToForum() {
        const ssoUrl = `${this.config.ssoEndpoint}?return_url=${encodeURIComponent(window.location.href)}`;
        window.location.href = ssoUrl;
    }

    /**
     * Format time ago
     */
    formatTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }

    /**
     * Track analytics events
     */
    trackEvent(eventName, data = {}) {
        if (window.gtag) {
            gtag('event', eventName, {
                event_category: 'forum_integration',
                ...data
            });
        }

        if (window.lessonEngine) {
            window.lessonEngine.trackInteraction(eventName, data);
        }
    }

    /**
     * Enable advanced forum features for trusted users
     */
    enableAdvancedFeatures() {
        // Add moderator tools, advanced posting options, etc.
        console.log('Advanced forum features enabled');
    }

    // Additional helper methods would go here...
    shouldShareProgress(progressData) { return false; } // Placeholder
    shareProgressToForum(progressData) { } // Placeholder
    alertForumModerators(crisisData) { } // Placeholder
    shareJournalInsights(journalData) { } // Placeholder
}

// Global instance
window.ForumIntegration = ForumIntegration;

// Auto-initialize if lesson config is available
document.addEventListener('DOMContentLoaded', function() {
    if (window.LESSON_CONFIG) {
        window.forumIntegration = new ForumIntegration({
            forumUrl: window.LESSON_CONFIG.forumUrl,
            autoEmbed: window.LESSON_CONFIG.enableForumDiscussion !== false
        });
    }
});