// JavaScript fixes for HTML5 validation compliance

// Handle flow card clicks
function handleFlowSelection(element) {
    const action = element.getAttribute('data-action');
    const flow = element.getAttribute('data-flow');

    // Existing functionality - trigger the data-action handler
    if (window.lessonEngine && action) {
        window.lessonEngine.handleAction(action, { flow: flow });
    }

    // Visual feedback
    document.querySelectorAll('.flow-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Handle activity option clicks
function handleActivitySelection(element) {
    const action = element.getAttribute('data-action');
    const level = element.getAttribute('data-level');

    // Existing functionality
    if (window.lessonEngine && action) {
        window.lessonEngine.handleAction(action, { level: level });
    }

    // Visual feedback
    document.querySelectorAll('.activity-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Handle keyboard events for accessibility
function handleFlowKeyPress(event, element) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleFlowSelection(element);
    }
}

function handleActivityKeyPress(event, element) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleActivitySelection(element);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('HTML5 validation fixes loaded');
});
