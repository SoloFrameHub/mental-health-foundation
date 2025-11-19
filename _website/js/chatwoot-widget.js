/**
 * Chatwoot Widget Integration for Mental Health Education Platform
 *
 * Purpose: Provides omnichannel customer support for non-clinical inquiries
 * Scope: Billing, course access, technical support, general wellness education questions
 *
 * IMPORTANT BOUNDARIES:
 * - NO clinical advice or medical consultation
 * - NO PHI (Protected Health Information) collection or storage
 * - Separate from Real Psychiatric Services clinical practice
 * - For educational platform support only
 */

(function() {
    'use strict';

    // Chatwoot Configuration
    const CHATWOOT_CONFIG = {
        baseUrl: 'https://chat.realpsychiatricservices.com',
        websiteToken: 'UPjFAsCNoVrbpyefCiRhJdgo'
    };

    // Pre-chat notice for privacy and boundaries
    const PRE_CHAT_NOTICE = {
        title: 'Welcome to Mental Health Education Platform Support',
        message: 'We\'re here to help with:\n\n' +
                 '✓ Course access and navigation\n' +
                 '✓ Billing and subscription questions\n' +
                 '✓ Technical support\n' +
                 '✓ General wellness education questions\n\n' +
                 '⚠️ Important Boundaries:\n' +
                 '• This is NOT clinical care or medical advice\n' +
                 '• Please do not share personal medical information\n' +
                 '• For clinical services, visit realpsychiatricservices.com\n' +
                 '• In crisis? Call 988 (Suicide & Crisis Lifeline) or 911'
    };

    // Configure Chatwoot widget settings with RPS branding
    window.chatwootSettings = {
        // Positioning
        position: 'right',
        type: 'standard',

        // Appearance (RPS branding colors)
        // Primary: #4a6fa5 (professional blue) - set via Chatwoot admin
        // Accent: #20c997 (wellness green)
        darkMode: 'auto',

        // Accessibility
        hideMessageBubble: false,
        showPopoutButton: false,

        // Localization
        locale: 'en',

        // Custom launcher label
        launcherTitle: 'Chat with Support'
    };

    /**
     * Load Chatwoot SDK
     */
    function loadChatwootSDK() {
        const script = document.createElement('script');
        script.src = CHATWOOT_CONFIG.baseUrl + '/packs/js/sdk.js';
        script.defer = true;
        script.async = true;

        script.onload = function() {
            initializeChatwoot();
        };

        script.onerror = function() {
            console.error('Failed to load Chatwoot widget');
        };

        document.body.appendChild(script);
    }

    /**
     * Initialize Chatwoot with configuration
     */
    function initializeChatwoot() {
        if (window.chatwootSDK) {
            window.chatwootSDK.run({
                websiteToken: CHATWOOT_CONFIG.websiteToken,
                baseUrl: CHATWOOT_CONFIG.baseUrl
            });

            console.log('Chatwoot widget initialized successfully');

            // Force widget to show even when agents are offline
            // This allows users to leave messages 24/7
            setTimeout(forceShowWidget, 2000);
        }
    }

    /**
     * Force widget to be visible by creating a custom bubble if needed
     * and ensuring the holder is accessible
     */
    function forceShowWidget() {
        const bubble = document.querySelector('.woot-widget-bubble');
        const holder = document.querySelector('.woot-widget-holder');

        // Always ensure holder can be shown when clicked
        if (holder && holder.classList.contains('woot--hide')) {
            // Don't remove it immediately, but make sure it can be toggled
            console.log('📦 Holder is hidden but will show on click');
        }

        if (!bubble && holder) {
            // Chatwoot didn't create a bubble (agent offline), so create a custom one
            console.log('⚠️ Bubble not created by Chatwoot, creating custom bubble...');
            createCustomBubble(holder);
        } else if (bubble) {
            // Bubble exists, just remove hide class
            if (bubble.classList.contains('woot--hide')) {
                bubble.classList.remove('woot--hide');
                console.log('✅ Chat bubble is now visible');
            }

            // Keep monitoring to prevent hiding
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const target = mutation.target;
                        if (target.classList.contains('woot-widget-bubble') &&
                            target.classList.contains('woot--hide')) {
                            target.classList.remove('woot--hide');
                        }
                    }
                });
            });
            observer.observe(bubble, { attributes: true });
        } else if (!holder) {
            // Neither bubble nor holder found yet, try again
            console.log('⏳ Waiting for Chatwoot to create holder...');
            setTimeout(forceShowWidget, 500);
        }
    }

    /**
     * Create a custom chat bubble when Chatwoot doesn't create one
     */
    function createCustomBubble(holder) {
        const bubble = document.createElement('div');
        bubble.className = 'woot-widget-bubble woot--close custom-chatwoot-bubble';
        bubble.style.cssText = `
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            width: 64px !important;
            height: 64px !important;
            border-radius: 50% !important;
            background: linear-gradient(135deg, #4a6fa5 0%, #5a7fb8 100%) !important;
            box-shadow: 0 4px 12px rgba(74, 111, 165, 0.4) !important;
            cursor: pointer !important;
            z-index: 2147483000 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.3s ease !important;
            visibility: visible !important;
            opacity: 1 !important;
        `;

        // Add chat icon (SVG)
        bubble.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        `;

        // Add hover effect
        bubble.addEventListener('mouseenter', function() {
            bubble.style.transform = 'scale(1.05)';
            bubble.style.boxShadow = '0 6px 20px rgba(74, 111, 165, 0.5)';
        });

        bubble.addEventListener('mouseleave', function() {
            bubble.style.transform = 'scale(1)';
            bubble.style.boxShadow = '0 4px 12px rgba(74, 111, 165, 0.4)';
        });

        // Click handler to open Chatwoot
        bubble.addEventListener('click', function() {
            console.log('💬 Custom bubble clicked, opening Chatwoot...');

            // Remove hide class from holder
            if (holder.classList.contains('woot--hide')) {
                holder.classList.remove('woot--hide');
            }

            // Toggle using Chatwoot API if available
            if (window.$chatwoot) {
                window.$chatwoot.toggle('open');
            }
        });

        document.body.appendChild(bubble);
        console.log('✅ Custom chat bubble created and added to page');
    }

    /**
     * Set page context for support team
     */
    function setPageContext() {
        if (!window.$chatwoot) {
            setTimeout(setPageContext, 500);
            return;
        }

        const context = {
            page_url: window.location.href,
            page_path: window.location.pathname,
            referrer: document.referrer || 'direct',
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        // Detect course context (non-identifying)
        const pathParts = window.location.pathname.split('/');

        // Map course to pillar for better routing
        const coursePillarMap = {
            'course-1-movement-medicine': { pillar: '1-Physical-Vitality', topic: 'Movement-Medicine' },
            'course-2-workplace-mental-health': { pillar: '1-Physical-Vitality', topic: 'Workplace-Wellness' },
            'course-3-digital-wellness': { pillar: '1-Physical-Vitality', topic: 'Digital-Wellness' },
            'course-4-growth-mindset': { pillar: '2-Cognitive-Mastery', topic: 'Growth-Mindset' },
            'course-5-cbt-fundamentals': { pillar: '2-Cognitive-Mastery', topic: 'CBT' },
            'course-6-stress-challenge-navigation': { pillar: '2-Cognitive-Mastery', topic: 'Stress-Management' },
            'course-7-boundaries-bootcamp': { pillar: '2-Cognitive-Mastery', topic: 'Boundaries' },
            'course-8-social-circle-mastery': { pillar: '3-Social-Connection', topic: 'Friendships' },
            'course-9-team-sports-mental-health': { pillar: '3-Social-Connection', topic: 'Team-Sports' },
            'course-10-relationship-dynamics': { pillar: '3-Social-Connection', topic: 'Relationships' },
            'course-11-family-parenting-mental-health': { pillar: '3-Social-Connection', topic: 'Family-Parenting' },
            'course-12-purpose-and-responsibility': { pillar: '4-Purpose-Leadership', topic: 'Purpose' },
            'course-13-mental-health-first-aid': { pillar: '4-Purpose-Leadership', topic: 'First-Aid' },
            'course-14-coaching-mentoring': { pillar: '4-Purpose-Leadership', topic: 'Coaching' },
            'course-15-legacy-building': { pillar: '4-Purpose-Leadership', topic: 'Legacy' },
            'course-16-recreational-therapy': { pillar: '5-Creative-Expression', topic: 'Recreation' },
            'course-17-creative-expression': { pillar: '5-Creative-Expression', topic: 'Art-Therapy' },
            'course-18-adventure-outdoor-mental-health': { pillar: '5-Creative-Expression', topic: 'Adventure' },
            'course-19-music-movement-wellness': { pillar: '5-Creative-Expression', topic: 'Music-Movement' }
        };

        // Check if user is viewing a course
        for (const [courseKey, courseData] of Object.entries(coursePillarMap)) {
            if (pathParts.some(part => part.includes(courseKey))) {
                context.pillar = courseData.pillar;
                context.topic = courseData.topic;
                context.viewing_course = true;
                break;
            }
        }

        // Detect other page types
        if (window.location.pathname.includes('courses.html')) {
            context.page_type = 'course-catalog';
        } else if (window.location.pathname.includes('instructors.html')) {
            context.page_type = 'instructors';
        } else if (window.location.pathname.includes('community.html')) {
            context.page_type = 'community';
        } else if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            context.page_type = 'homepage';
        }

        // Set custom attributes for routing
        window.$chatwoot.setCustomAttributes(context);
    }

    /**
     * Add event listeners for Chatwoot events
     */
    function setupEventListeners() {
        window.addEventListener('chatwoot:ready', function() {
            console.log('Chatwoot widget ready');
            setPageContext();

            // Add custom CSS for branding if needed
            injectCustomStyles();
        });

        window.addEventListener('chatwoot:error', function(error) {
            console.error('Chatwoot error:', error);
        });

        window.addEventListener('chatwoot:on-message', function() {
            // Message received - could trigger notifications
        });
    }

    /**
     * Inject custom CSS for RPS branding and accessibility
     */
    function injectCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Chatwoot Custom Branding for RPS Mental Health Education Platform */

            /* Ensure high contrast for accessibility (WCAG AA+) */
            .woot-widget-bubble {
                background: linear-gradient(135deg, #4a6fa5 0%, #5a7fb8 100%) !important;
                box-shadow: 0 4px 12px rgba(74, 111, 165, 0.4) !important;
            }

            .woot-widget-bubble:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(74, 111, 165, 0.5) !important;
                cursor: pointer !important;
            }

            /* Ensure click events work properly */
            .woot-widget-bubble {
                pointer-events: auto !important;
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .woot-widget-bubble {
                    border: 2px solid #fff !important;
                }
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .woot-widget-bubble,
                .woot-widget-holder {
                    animation: none !important;
                    transition: none !important;
                }
            }

            /* Focus visible for keyboard navigation */
            .woot-widget-bubble:focus-visible {
                outline: 3px solid #20c997;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Public API for custom interactions
     */
    window.DigitalWellnessChatwoot = {
        /**
         * Open the widget
         */
        open: function() {
            if (window.$chatwoot) {
                window.$chatwoot.toggle('open');
            }
        },

        /**
         * Close the widget
         */
        close: function() {
            if (window.$chatwoot) {
                window.$chatwoot.toggle('close');
            }
        },

        /**
         * Set user information (for logged-in users)
         * Only non-identifying information
         */
        setUser: function(userInfo) {
            if (window.$chatwoot && userInfo) {
                const sanitizedInfo = {
                    identifier: userInfo.id || userInfo.email,
                    name: userInfo.name || 'Student',
                    email: userInfo.email
                };

                // Never include: SSN, DOB, medical info, diagnosis, etc.
                window.$chatwoot.setUser(sanitizedInfo.identifier, {
                    email: sanitizedInfo.email,
                    name: sanitizedInfo.name
                });
            }
        },

        /**
         * Set custom attributes for context
         */
        setAttributes: function(attributes) {
            if (window.$chatwoot) {
                // Filter out any potentially identifying info
                const safeAttributes = {};
                const allowedKeys = ['subscription_type', 'courses_enrolled', 'page_type', 'topic', 'pillar'];

                for (const [key, value] of Object.entries(attributes)) {
                    if (allowedKeys.includes(key)) {
                        safeAttributes[key] = value;
                    }
                }

                window.$chatwoot.setCustomAttributes(safeAttributes);
            }
        },

        /**
         * Reset session (for logout)
         */
        reset: function() {
            if (window.$chatwoot) {
                window.$chatwoot.reset();
            }
        },

        /**
         * Set language
         */
        setLocale: function(locale) {
            if (window.$chatwoot) {
                window.$chatwoot.setLocale(locale);
            }
        }
    };

    /**
     * Initialize on DOM ready
     */
    function init() {
        console.log('🚀 Initializing Chatwoot widget...');
        console.log('Config:', CHATWOOT_CONFIG);
        setupEventListeners();
        loadChatwootSDK();
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('✅ Chatwoot widget script loaded');

})();
