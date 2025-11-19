/**
 * Paywall System for Mental Health Education Platform
 * Handles content protection, payment UI, and user access verification
 */

class PaywallSystem {
  constructor() {
    this.apiBase = window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api'
      : '/api';
    this.currentUser = null;
    this.userAccess = null;
    this.init();
  }

  async init() {
    // Check authentication status
    await this.checkAuth();

    // Check if current page requires premium access
    if (this.shouldProtectContent()) {
      await this.enforcePaywall();
    }

    // Add payment buttons if they exist
    this.attachPaymentButtons();
  }

  /**
   * Check if user is authenticated
   */
  async checkAuth() {
    try {
      const response = await fetch(`${this.apiBase}/auth/session`, {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.authenticated) {
        this.currentUser = data.user;
        await this.checkAccess();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  }

  /**
   * Check user's content access
   */
  async checkAccess() {
    if (!this.currentUser) return;

    try {
      const path = window.location.pathname;
      const courseId = this.extractCourseId(path);

      const response = await fetch(
        `${this.apiBase}/content/check-access?path=${encodeURIComponent(path)}${courseId ? `&courseId=${courseId}` : ''}`,
        { credentials: 'include' }
      );

      this.userAccess = await response.json();
    } catch (error) {
      console.error('Access check failed:', error);
    }
  }

  /**
   * Determine if current page should be protected
   */
  shouldProtectContent() {
    const path = window.location.pathname;

    // Free content patterns
    const freePatterns = [
      /index\.html$/,
      /landing-page\.html$/,
      /courses\.html$/,
      /about\.html$/,
      /contact\.html$/,
      /lesson-\d+-1\.html$/, // First lesson of each course
      /crisis|safety|emergency/,
      /login|register/,
      /privacy|terms/
    ];

    return !freePatterns.some(pattern => pattern.test(path));
  }

  /**
   * Extract course ID from path
   */
  extractCourseId(path) {
    const courseMatch = path.match(/course-(\d+)/);
    return courseMatch ? `course-${courseMatch[1]}` : null;
  }

  /**
   * Enforce paywall on protected content
   */
  async enforcePaywall() {
    // Wait for access check to complete
    if (!this.userAccess) {
      await this.checkAccess();
    }

    // If user has access, do nothing
    if (this.userAccess?.allowed) {
      this.showSuccessMessage();
      return;
    }

    // Show paywall
    if (!this.currentUser) {
      this.showLoginRequired();
    } else {
      this.showUpgradeRequired();
    }
  }

  /**
   * Show login required message
   */
  showLoginRequired() {
    const overlay = this.createPaywallOverlay({
      title: 'Login Required',
      message: 'Please log in to access this content',
      primaryAction: {
        text: 'Log In',
        onClick: () => {
          const returnUrl = encodeURIComponent(window.location.pathname);
          window.location.href = `/pages/login.html?return=${returnUrl}`;
        }
      },
      secondaryAction: {
        text: 'Create Account',
        onClick: () => {
          window.location.href = '/pages/register.html';
        }
      }
    });

    document.body.appendChild(overlay);
  }

  /**
   * Show upgrade required message
   */
  showUpgradeRequired() {
    const courseId = this.extractCourseId(window.location.pathname);
    const courseName = document.querySelector('h1')?.textContent || 'This Course';

    const overlay = this.createPaywallOverlay({
      title: 'Premium Content',
      message: 'Upgrade to access this content',
      features: [
        'Unlock all course lessons',
        'Downloadable resources',
        'Community forum access',
        'Certificate of completion'
      ],
      pricing: {
        subscription: {
          price: '$19.95',
          period: 'per month',
          description: 'Access all 19 courses'
        },
        single: {
          price: '$29.95',
          period: 'one-time',
          description: `Access ${courseName}`
        }
      },
      primaryAction: {
        text: 'Subscribe - $19.95/month',
        onClick: () => this.startCheckout('subscription')
      },
      secondaryAction: {
        text: `Buy Course - $29.95`,
        onClick: () => this.startCheckout('course', courseId, courseName)
      }
    });

    document.body.appendChild(overlay);
  }

  /**
   * Create paywall overlay UI
   */
  createPaywallOverlay(config) {
    const overlay = document.createElement('div');
    overlay.className = 'paywall-overlay';
    overlay.innerHTML = `
      <div class="paywall-modal">
        <div class="paywall-header">
          <i class="fas fa-lock text-primary" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <h2>${config.title}</h2>
          <p class="text-muted">${config.message}</p>
        </div>

        ${config.features ? `
          <div class="paywall-features">
            <h5>What's Included:</h5>
            <ul class="list-unstyled">
              ${config.features.map(f => `
                <li><i class="fas fa-check-circle text-success"></i> ${f}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        ${config.pricing ? `
          <div class="paywall-pricing">
            <div class="pricing-option recommended">
              <span class="badge bg-primary">Best Value</span>
              <div class="price">${config.pricing.subscription.price}</div>
              <div class="period">${config.pricing.subscription.period}</div>
              <p class="description">${config.pricing.subscription.description}</p>
            </div>
            <div class="pricing-option">
              <div class="price">${config.pricing.single.price}</div>
              <div class="period">${config.pricing.single.period}</div>
              <p class="description">${config.pricing.single.description}</p>
            </div>
          </div>
        ` : ''}

        <div class="paywall-actions">
          <button class="btn btn-primary btn-lg paywall-primary-action">
            ${config.primaryAction.text}
          </button>
          ${config.secondaryAction ? `
            <button class="btn btn-outline-secondary paywall-secondary-action">
              ${config.secondaryAction.text}
            </button>
          ` : ''}
        </div>

        <div class="paywall-footer">
          <p class="text-muted small">
            <i class="fas fa-shield-alt"></i> Secure payment powered by Stripe
          </p>
        </div>
      </div>
    `;

    // Attach event listeners
    overlay.querySelector('.paywall-primary-action').addEventListener('click', config.primaryAction.onClick);
    if (config.secondaryAction) {
      overlay.querySelector('.paywall-secondary-action').addEventListener('click', config.secondaryAction.onClick);
    }

    return overlay;
  }

  /**
   * Start Stripe checkout
   */
  async startCheckout(type, courseId = null, courseName = null) {
    try {
      const endpoint = type === 'subscription'
        ? `${this.apiBase}/stripe/create-checkout-monthly-subscription`
        : `${this.apiBase}/stripe/create-checkout-course`;

      const body = {
        customerEmail: this.currentUser?.email || '',
        successUrl: `${window.location.origin}/pages/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.href
      };

      if (type === 'course') {
        body.courseId = courseId;
        body.courseName = courseName;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    }
  }

  /**
   * Attach payment buttons to existing elements
   */
  attachPaymentButtons() {
    // Find all "Buy Now" or "Subscribe" buttons
    document.querySelectorAll('[data-payment-action]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.dataset.paymentAction;
        const courseId = button.dataset.courseId;
        const courseName = button.dataset.courseName;

        if (action === 'subscribe') {
          this.startCheckout('subscription');
        } else if (action === 'buy-course') {
          this.startCheckout('course', courseId, courseName);
        }
      });
    });
  }

  /**
   * Show success message for users with access
   */
  showSuccessMessage() {
    // Optional: Show a small badge or notification
    const badge = document.createElement('div');
    badge.className = 'access-badge';
    badge.innerHTML = '<i class="fas fa-check-circle"></i> Premium Access';
    badge.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      z-index: 1000;
      font-size: 14px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(badge);

    // Remove after 3 seconds
    setTimeout(() => badge.remove(), 3000);
  }
}

// Initialize paywall system when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.paywallSystem = new PaywallSystem();
  });
} else {
  window.paywallSystem = new PaywallSystem();
}
