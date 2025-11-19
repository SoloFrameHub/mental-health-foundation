/**
 * Enhanced Paywall System with Coupon & Affiliate Support
 * Mental Health Education Platform
 */

(function() {
  'use strict';

  const PAYWALL_CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api'
      : 'https://digital-wellness.realpsychiatricservices.com/api',
    STRIPE_PUBLISHABLE_KEY: 'pk_test_your_key_here', // Replace with actual key
    CHECK_ACCESS_INTERVAL: 60000, // Check access every 60 seconds
    AFFILIATE_COOKIE_NAME: 'dw_affiliate_ref',
    AFFILIATE_COOKIE_DAYS: 30
  };

  // Pricing tiers
  const PRICING_TIERS = {
    basic: {
      name: 'Basic Access',
      monthly: 9.95,
      annual: 99.00,
      features: [
        'Access to 5 foundational courses',
        'Community forum access',
        'Basic progress tracking',
        'Mobile app access'
      ]
    },
    premium: {
      name: 'Premium Access',
      monthly: 19.95,
      annual: 199.00,
      features: [
        'Access to ALL 19 courses',
        'Priority community support',
        'Advanced progress analytics',
        'Downloadable resources',
        'Certificate of completion',
        'Crisis resources'
      ],
      featured: true
    },
    professional: {
      name: 'Professional Plan',
      monthly: 49.95,
      annual: 499.00,
      features: [
        'Everything in Premium',
        'Provider-only resources',
        'CEU credits',
        'Client management tools',
        'White-label options',
        'Priority support'
      ]
    }
  };

  class PaywallSystem {
    constructor() {
      this.userEmail = null;
      this.selectedTier = 'premium';
      this.selectedBilling = 'monthly';
      this.couponCode = null;
      this.discountAmount = 0;
      this.affiliateClickId = this.getAffiliateClickId();
      this.init();
    }

    init() {
      // Check if user has access to current content
      this.checkAccess();

      // Track affiliate referral if present
      this.trackAffiliateReferral();

      // Set up event listeners
      this.setupEventListeners();
    }

    /**
     * Get affiliate click ID from cookie or URL
     */
    getAffiliateClickId() {
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');

      if (refCode) {
        // Track this click
        this.trackAffiliateClick(refCode);
      }

      // Return stored click ID from cookie
      return this.getCookie(PAYWALL_CONFIG.AFFILIATE_COOKIE_NAME);
    }

    /**
     * Track affiliate click via API
     */
    async trackAffiliateClick(affiliateCode) {
      try {
        const response = await fetch(`${PAYWALL_CONFIG.API_BASE_URL}/affiliates/track-click`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            affiliateCode: affiliateCode,
            referralUrl: document.referrer,
            landingPage: window.location.href,
            visitorIp: null, // Server will handle this
            visitorUserAgent: navigator.userAgent,
            utmSource: new URLSearchParams(window.location.search).get('utm_source'),
            utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
            utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign')
          })
        });

        const result = await response.json();

        if (result.success && result.clickId) {
          // Store click ID in cookie
          this.setCookie(PAYWALL_CONFIG.AFFILIATE_COOKIE_NAME, result.clickId, PAYWALL_CONFIG.AFFILIATE_COOKIE_DAYS);
          this.affiliateClickId = result.clickId;
          console.log('Affiliate referral tracked:', result.clickId);
        }
      } catch (error) {
        console.error('Failed to track affiliate click:', error);
      }
    }

    /**
     * Track affiliate referral
     */
    trackAffiliateReferral() {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');

      if (refCode && !this.affiliateClickId) {
        this.trackAffiliateClick(refCode);
      }
    }

    /**
     * Check if user has access to current content
     */
    async checkAccess() {
      try {
        const response = await fetch(`${PAYWALL_CONFIG.API_BASE_URL}/content/check-access?path=${window.location.pathname}`, {
          credentials: 'include'
        });

        const result = await response.json();

        if (!result.allowed) {
          this.showPaywall(result);
        }
      } catch (error) {
        console.error('Access check failed:', error);
      }
    }

    /**
     * Show paywall modal
     */
    showPaywall(accessInfo) {
      // Create paywall modal
      const modal = this.createPaywallModal(accessInfo);
      document.body.appendChild(modal);

      // Blur background content
      document.body.style.overflow = 'hidden';
      const mainContent = document.querySelector('main') || document.body;
      mainContent.style.filter = 'blur(5px)';
      mainContent.style.pointerEvents = 'none';

      // Show modal with animation
      setTimeout(() => {
        modal.classList.add('paywall-visible');
      }, 10);
    }

    /**
     * Create paywall modal HTML
     */
    createPaywallModal(accessInfo) {
      const modal = document.createElement('div');
      modal.className = 'paywall-modal';
      modal.id = 'paywallModal';

      modal.innerHTML = `
        <div class="paywall-backdrop"></div>
        <div class="paywall-content">
          <div class="paywall-header">
            <h2>🌟 Unlock Premium Content</h2>
            <p>Choose a plan to continue your wellness journey</p>
          </div>

          <div class="pricing-toggle">
            <button class="billing-toggle ${this.selectedBilling === 'monthly' ? 'active' : ''}" data-billing="monthly">
              Monthly
            </button>
            <button class="billing-toggle ${this.selectedBilling === 'annual' ? 'active' : ''}" data-billing="annual">
              Annual <span class="save-badge">Save 17%</span>
            </button>
          </div>

          <div class="pricing-tiers">
            ${this.renderPricingTiers()}
          </div>

          <div class="coupon-section">
            <div class="coupon-input-group">
              <input type="text" id="couponCodeInput" placeholder="Have a coupon code?" class="coupon-input">
              <button id="applyCouponBtn" class="btn-apply-coupon">Apply</button>
            </div>
            <div id="couponMessage" class="coupon-message"></div>
          </div>

          <div class="paywall-footer">
            <p>✓ Cancel anytime &nbsp;&nbsp;|&nbsp;&nbsp; ✓ 30-day money-back guarantee &nbsp;&nbsp;|&nbsp;&nbsp; ✓ Secure payment</p>
          </div>
        </div>
      `;

      return modal;
    }

    /**
     * Render pricing tiers
     */
    renderPricingTiers() {
      return Object.entries(PRICING_TIERS).map(([tierId, tier]) => {
        const price = this.selectedBilling === 'monthly' ? tier.monthly : tier.annual;
        const period = this.selectedBilling === 'monthly' ? 'month' : 'year';
        const monthlyEquivalent = this.selectedBilling === 'annual' ? (tier.annual / 12).toFixed(2) : null;

        return `
          <div class="pricing-tier ${tier.featured ? 'featured' : ''} ${this.selectedTier === tierId ? 'selected' : ''}" data-tier="${tierId}">
            ${tier.featured ? '<div class="featured-badge">Most Popular</div>' : ''}
            <h3>${tier.name}</h3>
            <div class="price">
              <span class="currency">$</span>
              <span class="amount">${price}</span>
              <span class="period">/${period}</span>
            </div>
            ${monthlyEquivalent ? `<div class="monthly-equiv">$${monthlyEquivalent}/month</div>` : ''}
            <ul class="features">
              ${tier.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
            </ul>
            <button class="btn-select-tier" data-tier="${tierId}">
              ${this.selectedTier === tierId ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        `;
      }).join('');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
      // Use event delegation for dynamically created elements
      document.addEventListener('click', (e) => {
        // Billing toggle
        if (e.target.classList.contains('billing-toggle')) {
          this.selectedBilling = e.target.dataset.billing;
          this.updatePricingDisplay();
        }

        // Tier selection
        if (e.target.classList.contains('btn-select-tier')) {
          this.selectedTier = e.target.dataset.tier;
          this.proceedToCheckout();
        }

        // Apply coupon
        if (e.target.id === 'applyCouponBtn') {
          this.applyCoupon();
        }
      });

      // Enter key on coupon input
      document.addEventListener('keypress', (e) => {
        if (e.target.id === 'couponCodeInput' && e.key === 'Enter') {
          this.applyCoupon();
        }
      });
    }

    /**
     * Update pricing display after billing toggle
     */
    updatePricingDisplay() {
      const modal = document.getElementById('paywallModal');
      if (!modal) return;

      const pricingContainer = modal.querySelector('.pricing-tiers');
      pricingContainer.innerHTML = this.renderPricingTiers();

      // Update active billing toggle
      modal.querySelectorAll('.billing-toggle').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.billing === this.selectedBilling);
      });
    }

    /**
     * Apply coupon code
     */
    async applyCoupon() {
      const input = document.getElementById('couponCodeInput');
      const messageDiv = document.getElementById('couponMessage');
      const code = input.value.trim();

      if (!code) {
        this.showCouponMessage('Please enter a coupon code', 'error');
        return;
      }

      messageDiv.innerHTML = '<div class="spinner"></div> Validating...';
      messageDiv.className = 'coupon-message loading';

      try {
        // Get current pricing
        const tier = PRICING_TIERS[this.selectedTier];
        const price = this.selectedBilling === 'monthly' ? tier.monthly : tier.annual;
        const purchaseAmount = Math.round(price * 100); // Convert to cents

        const response = await fetch(`${PAYWALL_CONFIG.API_BASE_URL}/coupons/validate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: code,
            email: this.userEmail || 'guest@example.com',
            purchaseAmount: purchaseAmount,
            purchaseType: 'subscription'
          })
        });

        const result = await response.json();

        if (result.success && result.valid) {
          this.couponCode = code;
          this.discountAmount = result.discountAmount;
          this.showCouponMessage(
            `✓ ${result.message} You save $${result.discountAmount.toFixed(2)}!`,
            'success'
          );
          input.disabled = true;
          document.getElementById('applyCouponBtn').textContent = 'Applied';
          document.getElementById('applyCouponBtn').disabled = true;
        } else {
          this.showCouponMessage(result.message || 'Invalid coupon code', 'error');
          this.couponCode = null;
          this.discountAmount = 0;
        }
      } catch (error) {
        console.error('Coupon validation error:', error);
        this.showCouponMessage('Failed to validate coupon. Please try again.', 'error');
      }
    }

    /**
     * Show coupon message
     */
    showCouponMessage(message, type) {
      const messageDiv = document.getElementById('couponMessage');
      messageDiv.textContent = message;
      messageDiv.className = `coupon-message ${type}`;
    }

    /**
     * Proceed to Stripe checkout
     */
    async proceedToCheckout() {
      try {
        // Prompt for email if not logged in
        if (!this.userEmail) {
          this.userEmail = prompt('Enter your email to continue:');
          if (!this.userEmail) return;
        }

        // Show loading state
        const selectedBtn = document.querySelector(`[data-tier="${this.selectedTier}"]`);
        const originalText = selectedBtn.textContent;
        selectedBtn.textContent = 'Loading...';
        selectedBtn.disabled = true;

        // Create checkout session
        const response = await fetch(`${PAYWALL_CONFIG.API_BASE_URL}/stripe/create-checkout-monthly-subscription`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerEmail: this.userEmail,
            couponCode: this.couponCode,
            affiliateClickId: this.affiliateClickId,
            tierId: this.selectedTier,
            successUrl: `${window.location.origin}/pages/welcome.html?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.href
          }),
          credentials: 'include'
        });

        const result = await response.json();

        if (result.success && result.url) {
          // Redirect to Stripe checkout
          window.location.href = result.url;
        } else {
          throw new Error(result.error || 'Failed to create checkout session');
        }
      } catch (error) {
        console.error('Checkout error:', error);
        alert('Failed to start checkout. Please try again.');

        // Reset button
        const selectedBtn = document.querySelector(`[data-tier="${this.selectedTier}"]`);
        selectedBtn.textContent = 'Select Plan';
        selectedBtn.disabled = false;
      }
    }

    /**
     * Cookie helpers
     */
    setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
    }

    getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return value;
      }
      return null;
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

})();
