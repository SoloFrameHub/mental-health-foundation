/**
 * Discourse Forum Integration for Mental Health Education Platform
 * Handles forum interactions, topic creation, and community engagement
 */

class DiscourseIntegration {
    constructor(config) {
        this.baseUrl = config.baseUrl || 'https://forum.realpsychiatricservices.com';
        this.apiKey = config.apiKey;
        this.apiUsername = config.apiUsername || 'digital-wellness';
        this.initialized = false;
        this.categories = {};
    }

    /**
     * Initialize the Discourse integration
     */
    async init() {
        try {
            await this.fetchCategories();
            this.initialized = true;
            console.log('Discourse integration initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize Discourse:', error);
            return false;
        }
    }

    /**
     * Fetch forum categories
     */
    async fetchCategories() {
        try {
            const response = await this.makeRequest('/categories.json');
            if (response.category_list && response.category_list.categories) {
                this.categories = response.category_list.categories.reduce((acc, cat) => {
                    acc[cat.slug] = cat;
                    return acc;
                }, {});
            }
            return this.categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return {};
        }
    }

    /**
     * Get latest topics from a category
     */
    async getLatestTopics(categorySlug = null, limit = 10) {
        try {
            const endpoint = categorySlug
                ? `/c/${categorySlug}/l/latest.json`
                : '/latest.json';

            const response = await this.makeRequest(endpoint);

            if (response.topic_list && response.topic_list.topics) {
                return response.topic_list.topics.slice(0, limit);
            }
            return [];
        } catch (error) {
            console.error('Error fetching topics:', error);
            return [];
        }
    }

    /**
     * Get topic details with posts
     */
    async getTopic(topicId) {
        try {
            const response = await this.makeRequest(`/t/${topicId}.json`);
            return response;
        } catch (error) {
            console.error('Error fetching topic:', error);
            return null;
        }
    }

    /**
     * Create a new topic
     */
    async createTopic(data) {
        try {
            const payload = {
                title: data.title,
                raw: data.content,
                category: data.categoryId || null,
                tags: data.tags || []
            };

            const response = await this.makeRequest('/posts.json', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            return response;
        } catch (error) {
            console.error('Error creating topic:', error);
            throw error;
        }
    }

    /**
     * Create a reply to a topic
     */
    async createReply(topicId, content) {
        try {
            const payload = {
                topic_id: topicId,
                raw: content
            };

            const response = await this.makeRequest('/posts.json', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            return response;
        } catch (error) {
            console.error('Error creating reply:', error);
            throw error;
        }
    }

    /**
     * Search forum
     */
    async search(query, options = {}) {
        try {
            const params = new URLSearchParams({
                q: query,
                ...options
            });

            const response = await this.makeRequest(`/search.json?${params.toString()}`);
            return response;
        } catch (error) {
            console.error('Error searching forum:', error);
            return { topics: [], posts: [] };
        }
    }

    /**
     * Get user activity
     */
    async getUserActivity(username) {
        try {
            const response = await this.makeRequest(`/u/${username}/summary.json`);
            return response;
        } catch (error) {
            console.error('Error fetching user activity:', error);
            return null;
        }
    }

    /**
     * Make API request to Discourse
     */
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            'Api-Key': this.apiKey,
            'Api-Username': this.apiUsername
        };

        const config = {
            ...options,
            headers: {
                ...headers,
                ...(options.headers || {})
            }
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`Discourse API error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Discourse API request failed:', error);
            throw error;
        }
    }

    /**
     * Render forum widget on page
     */
    renderForumWidget(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const categorySlug = options.category || null;
        const limit = options.limit || 5;
        const title = options.title || 'Community Discussions';

        // Create widget HTML
        container.innerHTML = `
            <div class="discourse-widget">
                <div class="discourse-widget-header">
                    <h3>${title}</h3>
                    <a href="${this.baseUrl}" target="_blank" rel="noopener" class="view-all-link">
                        View All <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div class="discourse-widget-body" id="${containerId}-topics">
                    <div class="loading-spinner">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Load and display topics
        this.getLatestTopics(categorySlug, limit).then(topics => {
            const topicsContainer = document.getElementById(`${containerId}-topics`);

            if (topics.length === 0) {
                topicsContainer.innerHTML = '<p class="text-muted">No discussions yet. Be the first to start a conversation!</p>';
                return;
            }

            const topicsHTML = topics.map(topic => `
                <div class="forum-topic-item">
                    <div class="topic-info">
                        <h4><a href="${this.baseUrl}/t/${topic.slug}/${topic.id}" target="_blank" rel="noopener">${this.escapeHtml(topic.title)}</a></h4>
                        <div class="topic-meta">
                            <span class="topic-author">
                                <i class="bi bi-person"></i> ${this.escapeHtml(topic.last_poster_username)}
                            </span>
                            <span class="topic-replies">
                                <i class="bi bi-chat-dots"></i> ${topic.posts_count - 1} replies
                            </span>
                            <span class="topic-views">
                                <i class="bi bi-eye"></i> ${topic.views} views
                            </span>
                            <span class="topic-time">
                                <i class="bi bi-clock"></i> ${this.formatRelativeTime(topic.last_posted_at)}
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');

            topicsContainer.innerHTML = topicsHTML;
        }).catch(error => {
            console.error('Error loading topics:', error);
            const topicsContainer = document.getElementById(`${containerId}-topics`);
            topicsContainer.innerHTML = '<p class="text-danger">Unable to load forum topics. Please try again later.</p>';
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Format relative time
     */
    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 30) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    }

    /**
     * Get forum embed iframe
     */
    getEmbedIframe(topicId, options = {}) {
        const height = options.height || '500px';
        const width = options.width || '100%';

        return `
            <iframe
                src="${this.baseUrl}/t/${topicId}/embed"
                width="${width}"
                height="${height}"
                style="border: 1px solid #e9ecef; border-radius: 8px;"
                frameborder="0"
                allowfullscreen
            ></iframe>
        `;
    }

    /**
     * Add forum discussion button to course pages
     */
    addDiscussionButton(courseId, courseName) {
        const button = document.createElement('a');
        button.href = `${this.baseUrl}/c/${courseId}`;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.className = 'btn btn-primary discourse-discussion-btn';
        button.innerHTML = `
            <i class="bi bi-chat-square-text"></i> Join Discussion
        `;
        return button;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiscourseIntegration;
}
