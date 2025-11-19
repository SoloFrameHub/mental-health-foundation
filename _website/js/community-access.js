/**
 * Seamless Community Access for Student Dashboard
 * Handles SSO login to Discourse forum from student portal
 */

class CommunityAccess {
    constructor() {
        this.forumUrl = 'https://forum.realpsychiatricservices.com';
        this.ssoEndpoint = '/api/discourse/sso';
        this.apiUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:3000'
            : 'https://your-production-domain.com';
    }

    /**
     * Initialize community access buttons
     */
    init() {
        // Add event listeners to community forum links
        document.querySelectorAll('a[href*="community"]').forEach(link => {
            // Skip if already has SSO handler
            if (link.dataset.ssoEnabled) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.accessForum();
            });
            link.dataset.ssoEnabled = 'true';
        });
    }

    /**
     * Access forum with SSO authentication
     */
    async accessForum() {
        try {
            // Check if user is authenticated
            const session = await this.checkSession();

            if (!session.authenticated) {
                this.showLoginPrompt();
                return;
            }

            // Show loading state
            this.showLoading();

            // Get SSO URL from backend
            const ssoUrl = await this.getSSOUrl();

            if (ssoUrl) {
                // Redirect to Discourse with SSO
                window.location.href = ssoUrl;
            } else {
                // Fallback: open forum in new tab
                window.open(this.forumUrl, '_blank');
            }

        } catch (error) {
            console.error('Community access error:', error);

            // Fallback: direct forum access
            if (confirm('SSO login unavailable. Open forum directly?')) {
                window.open(this.forumUrl, '_blank');
            }
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Check user session status
     */
    async checkSession() {
        try {
            const response = await fetch(`${this.apiUrl}/api/auth/session`, {
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Session check failed:', error);
            return { authenticated: false };
        }
    }

    /**
     * Get SSO URL from backend
     */
    async getSSOUrl() {
        try {
            const response = await fetch(`${this.apiUrl}${this.ssoEndpoint}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.redirected) {
                return response.url;
            }

            const data = await response.json();
            return data.sso_url || null;

        } catch (error) {
            console.error('SSO URL fetch failed:', error);
            return null;
        }
    }

    /**
     * Show login prompt
     */
    showLoginPrompt() {
        alert('Please log in to access the community forum.');
        window.location.href = '/login.html?redirect=/student/dashboard.html';
    }

    /**
     * Show loading state
     */
    showLoading() {
        const loader = document.createElement('div');
        loader.id = 'community-loader';
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    text-align: center;
                ">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3 mb-0">Accessing Community Forum...</p>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        const loader = document.getElementById('community-loader');
        if (loader) {
            loader.remove();
        }
    }

    /**
     * Get user's enrolled courses for group assignment
     */
    async getEnrolledCourses() {
        try {
            const response = await fetch(`${this.apiUrl}/api/progress/user-courses`, {
                credentials: 'include'
            });

            if (!response.ok) return [];

            const data = await response.json();
            return data.courses || [];
        } catch (error) {
            console.error('Failed to fetch enrolled courses:', error);
            return [];
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const communityAccess = new CommunityAccess();
    communityAccess.init();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommunityAccess;
}
