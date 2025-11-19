/**
 * Anxiety Toolkit Course - Main JavaScript
 * Handles navigation, interactions, and general functionality
 */

// Global state management
const AppState = {
    user: null,
    currentSection: null,
    crisisDetected: false,
    mobileMenuOpen: false
};

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Main application initialization
 */
function initializeApp() {
    console.log('🚀 Initializing Anxiety Toolkit application...');

    // Initialize components
    initializeNavigation();
    initializeOutlineAccordion();
    initializeAccessibility();
    checkUserStatus();

    console.log('✅ Application initialized successfully');
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleAnchorClick);
    });

    // Navigation highlighting
    window.addEventListener('scroll', highlightCurrentSection);
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggle = document.querySelector('.mobile-menu-toggle');

    AppState.mobileMenuOpen = !AppState.mobileMenuOpen;

    if (navLinks) {
        if (AppState.mobileMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '1rem';
            toggle.setAttribute('aria-expanded', 'true');
        } else {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.background = '';
            navLinks.style.boxShadow = '';
            navLinks.style.padding = '';
            navLinks.style.gap = '';
            toggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Animate hamburger menu
    if (toggle) {
        const spans = toggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (AppState.mobileMenuOpen) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    }
}

/**
 * Handle anchor link clicks
 */
function handleAnchorClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const headerOffset = 120; // Account for sticky headers
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (AppState.mobileMenuOpen) {
            toggleMobileMenu();
        }

        // Update URL
        history.pushState(null, null, `#${targetId}`);
    }
}

/**
 * Highlight current section in navigation
 */
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    let currentSection = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update navigation highlighting
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    AppState.currentSection = currentSection;
}

/**
 * Initialize course outline accordion
 */
function initializeOutlineAccordion() {
    const outlineHeaders = document.querySelectorAll('.outline-header');

    outlineHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const sectionNumber = this.querySelector('.outline-number').textContent;
            toggleOutlineSection(parseInt(sectionNumber));
        });
    });
}

/**
 * Toggle outline section
 */
function toggleOutlineSection(sectionNumber) {
    const content = document.getElementById(`outline-${sectionNumber}`);
    const header = document.querySelector(`[onclick="toggleOutlineSection(${sectionNumber})"]`);
    const toggle = header?.querySelector('.outline-toggle');

    if (content && toggle) {
        const isOpen = content.classList.contains('active');

        if (isOpen) {
            content.classList.remove('active');
            content.style.display = 'none';
            toggle.textContent = '+';
            toggle.style.transform = '';
            header.setAttribute('aria-expanded', 'false');
        } else {
            content.classList.add('active');
            content.style.display = 'block';
            toggle.textContent = '−';
            toggle.style.transform = 'rotate(180deg)';
            header.setAttribute('aria-expanded', 'true');
        }

        // Announce to screen readers
        announceToScreenReader(
            isOpen ?
                `Section ${sectionNumber} collapsed` :
                `Section ${sectionNumber} expanded`
        );
    }
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Skip to main content link
    addSkipToMainLink();

    // Keyboard navigation
    initializeKeyboardNavigation();

    // Focus management
    initializeFocusManagement();

    // Screen reader announcements
    initializeScreenReaderSupport();

    // High contrast mode detection
    detectHighContrastMode();
}

/**
 * Add skip to main content link
 */
function addSkipToMainLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-to-main';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('role', 'main');
    }
}

/**
 * Initialize keyboard navigation
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes modals
        if (e.key === 'Escape') {
            closeCrisisModal();
            if (AppState.mobileMenuOpen) {
                toggleMobileMenu();
            }
        }

        // Enter key activates buttons
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('outline-header')) {
                activeElement.click();
            }
        }

        // Tab navigation trap for modals
        if (e.key === 'Tab') {
            trapFocusInModal(e);
        }
    });
}

/**
 * Trap focus within modals
 */
function trapFocusInModal(e) {
    const modal = document.querySelector('.crisis-modal:not(.hidden)');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}

/**
 * Initialize focus management
 */
function initializeFocusManagement() {
    // Store last focused element before opening modals
    let lastFocusedElement = null;

    // When modal opens
    document.addEventListener('modalOpen', function() {
        lastFocusedElement = document.activeElement;
    });

    // When modal closes
    document.addEventListener('modalClose', function() {
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    });

    // Focus indicators for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .outline-header:focus {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
        }

        .nav-link:focus,
        .btn:focus,
        .crisis-btn:focus {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize screen reader support
 */
function initializeScreenReaderSupport() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(liveRegion);

    // Add descriptive labels
    addAriaLabels();
}

/**
 * Add ARIA labels for better accessibility
 */
function addAriaLabels() {
    // Navigation
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
    }

    // Course outline
    const outline = document.querySelector('.outline-accordion');
    if (outline) {
        outline.setAttribute('role', 'region');
        outline.setAttribute('aria-label', 'Course outline');
    }

    // Outline sections
    const outlineHeaders = document.querySelectorAll('.outline-header');
    outlineHeaders.forEach((header, index) => {
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-controls', `outline-${index + 1}`);
    });

    // Crisis banner
    const crisisBanner = document.querySelector('.crisis-banner');
    if (crisisBanner) {
        crisisBanner.setAttribute('role', 'banner');
        crisisBanner.setAttribute('aria-label', 'Crisis support available 24/7');
    }
}

/**
 * Announce message to screen readers
 */
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

/**
 * Detect high contrast mode
 */
function detectHighContrastMode() {
    // Check for Windows high contrast mode
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Listen for changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        });
    }
}

/**
 * Check user authentication status
 */
function checkUserStatus() {
    const userId = sessionStorage.getItem('userId');
    const userEmail = sessionStorage.getItem('userEmail');

    if (userId && userEmail) {
        AppState.user = {
            id: userId,
            email: userEmail
        };

        // Update navigation for logged-in users
        updateNavigationForUser();
    }
}

/**
 * Update navigation for authenticated users
 */
function updateNavigationForUser() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && AppState.user) {
        // Replace Sign In / Get Started with user menu
        const signInLink = navLinks.querySelector('a[href="pages/login.html"]');
        const getStartedLink = navLinks.querySelector('a[href="pages/register.html"]');

        if (signInLink) signInLink.style.display = 'none';
        if (getStartedLink) {
            getStartedLink.textContent = 'Continue Course';
            getStartedLink.href = 'pages/dashboard.html';
        }
    }
}

/**
 * Handle form submissions with validation
 */
function handleFormSubmission(form, validationRules) {
    const formData = new FormData(form);
    const errors = [];

    // Validate fields
    for (const [field, rules] of Object.entries(validationRules)) {
        const value = formData.get(field);

        if (rules.required && (!value || value.trim() === '')) {
            errors.push(`${field} is required`);
        }

        if (rules.email && value && !isValidEmail(value)) {
            errors.push(`${field} must be a valid email address`);
        }

        if (rules.minLength && value && value.length < rules.minLength) {
            errors.push(`${field} must be at least ${rules.minLength} characters`);
        }
    }

    // Display errors or proceed
    if (errors.length > 0) {
        displayFormErrors(form, errors);
        return false;
    } else {
        clearFormErrors(form);
        return true;
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display form validation errors
 */
function displayFormErrors(form, errors) {
    // Remove existing error display
    clearFormErrors(form);

    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-errors';
    errorContainer.setAttribute('role', 'alert');
    errorContainer.style.cssText = `
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    `;

    const errorList = document.createElement('ul');
    errorList.style.margin = '0';
    errorList.style.paddingLeft = '1.5rem';

    errors.forEach(error => {
        const errorItem = document.createElement('li');
        errorItem.textContent = error;
        errorList.appendChild(errorItem);
    });

    errorContainer.appendChild(errorList);
    form.insertBefore(errorContainer, form.firstChild);

    // Announce to screen readers
    announceToScreenReader(`Form has ${errors.length} error${errors.length > 1 ? 's' : ''}`);
}

/**
 * Clear form validation errors
 */
function clearFormErrors(form) {
    const errorContainer = form.querySelector('.form-errors');
    if (errorContainer) {
        errorContainer.remove();
    }
}

/**
 * Utility function to format dates
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Show loading state
 */
function showLoading(element, message = 'Loading...') {
    if (element) {
        element.style.position = 'relative';
        element.style.pointerEvents = 'none';
        element.style.opacity = '0.6';

        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <span>${message}</span>
            </div>
        `;
        loader.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        element.appendChild(loader);
    }
}

/**
 * Hide loading state
 */
function hideLoading(element) {
    if (element) {
        element.style.pointerEvents = '';
        element.style.opacity = '';

        const loader = element.querySelector('.loading-overlay');
        if (loader) {
            loader.remove();
        }
    }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    // Set background color based on type
    const colors = {
        info: '#2563eb',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#dc2626'
    };
    notification.style.background = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);

    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Export functions for global use
window.AppState = AppState;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleOutlineSection = toggleOutlineSection;
window.handleFormSubmission = handleFormSubmission;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showNotification = showNotification;
window.announceToScreenReader = announceToScreenReader;

// Log successful initialization
console.log('✅ Main JavaScript loaded successfully');