/**
 * Shared Utilities for Anxiety Toolkit Module 1
 * Handles Supabase integration, API calls, progress tracking, and common functions
 */

// ========================================
// Configuration
// ========================================

const CONFIG = {
    SUPABASE_URL: process.env.SUPABASE_URL || 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'your-anon-key',
    FORMS_IO_API_URL: 'http://46.202.88.248:3010',
    TYPEBOT_API_URL: 'http://46.202.88.248:3000',
    FLOWISE_API_URL: 'http://46.202.88.248:3007',
    DIRECTUS_API_URL: 'http://46.202.88.248:8055'
};

// ========================================
// Supabase Client (Simplified - would use official SDK in production)
// ========================================

class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
        this.headers = {
            'Content-Type': 'application/json',
            'apikey': key,
            'Authorization': `Bearer ${key}`
        };
    }

    async insert(table, data) {
        try {
            const response = await fetch(`${this.url}/rest/v1/${table}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Supabase insert failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Supabase insert error:', error);
            // Fallback to localStorage if Supabase fails
            this._saveToLocalStorage(table, data);
            return { error: error.message, fallback: 'localStorage' };
        }
    }

    async upsert(table, data) {
        try {
            const response = await fetch(`${this.url}/rest/v1/${table}`, {
                method: 'POST',
                headers: {
                    ...this.headers,
                    'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Supabase upsert failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Supabase upsert error:', error);
            this._saveToLocalStorage(table, data);
            return { error: error.message, fallback: 'localStorage' };
        }
    }

    async select(table, filters = {}) {
        try {
            let url = `${this.url}/rest/v1/${table}?`;

            Object.entries(filters).forEach(([key, value]) => {
                url += `${key}=eq.${value}&`;
            });

            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`Supabase select failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Supabase select error:', error);
            // Try to get from localStorage
            return this._getFromLocalStorage(table, filters);
        }
    }

    _saveToLocalStorage(table, data) {
        const key = `supabase_${table}`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
            ...data,
            _saved_at: new Date().toISOString(),
            _fallback: true
        });
        localStorage.setItem(key, JSON.stringify(existing));
        console.log(`📦 Saved to localStorage fallback: ${table}`);
    }

    _getFromLocalStorage(table, filters) {
        const key = `supabase_${table}`;
        let data = JSON.parse(localStorage.getItem(key) || '[]');

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            data = data.filter(item => item[key] === value);
        });

        return data;
    }
}

// Initialize Supabase client
const supabase = new SupabaseClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// ========================================
// User Management
// ========================================

function getCurrentUserId() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return user.userId || 'anonymous_' + Date.now();
}

function getCurrentUserName() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return user.name || 'User';
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

// ========================================
// Progress Tracking
// ========================================

async function saveProgressToSupabase(lessonId, progressData) {
    const data = {
        user_id: getCurrentUserId(),
        lesson_id: lessonId,
        progress_data: progressData,
        last_updated: new Date().toISOString()
    };

    return await supabase.upsert('lesson_progress', data);
}

async function getUserProgress(lessonId) {
    const data = await supabase.select('lesson_progress', {
        user_id: getCurrentUserId(),
        lesson_id: lessonId
    });

    return data.length > 0 ? data[0] : null;
}

async function trackEvent(eventName, eventData = {}) {
    const data = {
        user_id: getCurrentUserId(),
        event_name: eventName,
        event_data: eventData,
        timestamp: new Date().toISOString(),
        session_id: getSessionId(),
        lesson_id: eventData.lesson_id || getCurrentLessonId()
    };

    return await supabase.insert('events', data);
}

function getCurrentLessonId() {
    // Extract from URL or meta tag
    const pathParts = window.location.pathname.split('/');
    const filename = pathParts[pathParts.length - 1];

    if (filename.includes('lesson-')) {
        return filename.replace('.html', '');
    }

    return 'unknown';
}

// ========================================
// Interactive Components Tracking
// ========================================

async function trackBodyMapInteraction(region) {
    return await trackEvent('body_map_interaction', {
        region: region,
        timestamp: new Date().toISOString()
    });
}

async function trackPracticeCompletion(practiceType, practiceData = {}) {
    return await trackEvent('practice_completed', {
        practice_type: practiceType,
        ...practiceData,
        timestamp: new Date().toISOString()
    });
}

async function saveToSupabase(table, data) {
    return await supabase.insert(table, {
        user_id: getCurrentUserId(),
        ...data,
        created_at: new Date().toISOString()
    });
}

// ========================================
// Forms.io Integration
// ========================================

async function initializeFormio(formId, containerId) {
    // Check if Formio library is loaded
    if (typeof Formio === 'undefined') {
        console.error('Formio library not loaded');
        return null;
    }

    try {
        const form = await Formio.createForm(
            document.getElementById(containerId),
            {
                src: `${CONFIG.FORMS_IO_API_URL}/${formId}`
            }
        );

        form.on('submit', async (submission) => {
            await handleFormSubmission(formId, submission);
        });

        return form;
    } catch (error) {
        console.error('Forms.io initialization error:', error);
        return null;
    }
}

async function handleFormSubmission(formId, submission) {
    // Save to Supabase
    await saveToSupabase('form_submissions', {
        form_id: formId,
        submission_data: submission.data,
        submitted_at: new Date().toISOString()
    });

    // Track completion
    await trackEvent('form_submitted', {
        form_id: formId,
        fields_completed: Object.keys(submission.data).length
    });

    // Generate PDF if applicable
    if (formId.includes('assessment')) {
        await generateAssessmentPDF(submission.data);
    }

    return submission;
}

async function generateAssessmentPDF(data) {
    // In production, this would call a backend API to generate PDF
    console.log('📄 PDF generation requested for assessment data:', data);
    // Return a promise that would download the PDF
    return Promise.resolve({ pdf_url: '/assessments/generated_pdf.pdf' });
}

// ========================================
// Typebot Integration
// ========================================

function initializeTypebot(typebotId, config = {}) {
    // Check if Typebot library is loaded
    if (typeof Typebot === 'undefined') {
        console.error('Typebot library not loaded');
        return null;
    }

    const defaultConfig = {
        typebot: typebotId,
        apiHost: CONFIG.TYPEBOT_API_URL,
        theme: {
            button: { backgroundColor: "#4a90a4" },
            chatWindow: { backgroundColor: "#f7f8f6" },
        },
        hiddenVariables: {
            userId: getCurrentUserId(),
            userName: getCurrentUserName(),
            lessonId: config.lessonId || getCurrentLessonId()
        },
        onComplete: async (results) => {
            await saveTypebotResults(typebotId, results);
            if (config.onComplete) {
                config.onComplete(results);
            }
        }
    };

    Typebot.initBubble({ ...defaultConfig, ...config });
}

async function saveTypebotResults(typebotId, results) {
    return await saveToSupabase('typebot_responses', {
        typebot_id: typebotId,
        responses: results,
        completed_at: new Date().toISOString()
    });
}

// ========================================
// Flowise AI Integration
// ========================================

class FlowiseChat {
    constructor(chatflowId) {
        this.chatflowId = chatflowId;
        this.apiUrl = `${CONFIG.FLOWISE_API_URL}/api/v1/prediction/${chatflowId}`;
        this.sessionId = `user_${getCurrentUserId()}_${getCurrentLessonId()}`;
    }

    async sendMessage(message) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: message,
                    overrideConfig: {
                        sessionId: this.sessionId
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Flowise API error: ${response.statusText}`);
            }

            const data = await response.json();

            // Track interaction
            await trackEvent('flowise_interaction', {
                user_message: message,
                ai_response: data.text,
                chatflow_id: this.chatflowId
            });

            return data;
        } catch (error) {
            console.error('Flowise error:', error);
            return {
                text: 'I apologize, but I encountered an error. Please try again or contact support if the problem persists.',
                error: error.message
            };
        }
    }
}

// ========================================
// Utility Functions
// ========================================

function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
}

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

function generateUniqueId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ========================================
// Crisis Detection Integration
// ========================================

async function analyzeCrisisRisk(text, context = '') {
    // This would integrate with the existing crisis detection system
    if (window.crisisDetection && typeof window.crisisDetection.analyzeText === 'function') {
        return window.crisisDetection.analyzeText(text, 'lesson_content', context);
    }

    // Fallback: simple keyword detection
    const crisisKeywords = [
        'suicide', 'kill myself', 'end my life', 'want to die',
        'hurt myself', 'self harm', 'no reason to live'
    ];

    const lowerText = text.toLowerCase();
    const hasCrisisKeyword = crisisKeywords.some(keyword => lowerText.includes(keyword));

    if (hasCrisisKeyword) {
        console.warn('⚠️ Crisis keywords detected in user input');
        return { risk_level: 'high', keywords_found: true };
    }

    return { risk_level: 'low', keywords_found: false };
}

// ========================================
// Local Storage Helpers
// ========================================

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('localStorage save error:', error);
        return false;
    }
}

function getFromLocalStorage(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error('localStorage get error:', error);
        return defaultValue;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('localStorage remove error:', error);
        return false;
    }
}

// ========================================
// Export for use in other files
// ========================================

// Make functions available globally
window.AnxietyToolkitUtils = {
    // Supabase
    supabase,
    saveProgressToSupabase,
    getUserProgress,
    saveToSupabase,
    trackEvent,

    // User
    getCurrentUserId,
    getCurrentUserName,
    getSessionId,

    // Tracking
    trackBodyMapInteraction,
    trackPracticeCompletion,

    // Integrations
    initializeFormio,
    initializeTypebot,
    FlowiseChat,

    // Utilities
    formatTime,
    debounce,
    generateUniqueId,
    analyzeCrisisRisk,

    // Storage
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,

    // Config
    CONFIG
};

console.log('✅ Anxiety Toolkit Shared Utilities loaded');
