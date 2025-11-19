/**
 * Workplace Mental Health Course - Lesson Script
 * Core lesson functionality - delegates to existing interaction handlers
 */

// This file serves as a compatibility layer for lessons that reference lesson-script.js
// The actual functionality is in lesson-interactions.js which is already loaded

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Lesson script initialized');

    // Crisis banner is handled by crisis-detection.js
    // Interactive elements are handled by lesson-interactions.js
    // Both files should already be loaded via the lesson template
});
