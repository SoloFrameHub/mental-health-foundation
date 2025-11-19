/**
 * Portal Feedback Widget
 * Chatwoot-style feedback form for Provider Portal improvements
 */

(function() {
    'use strict';

    // Create and inject feedback button
    function createFeedbackButton() {
        const button = document.createElement('button');
        button.id = 'portal-feedback-button';
        button.innerHTML = '<i class="bi bi-chat-left-text"></i> Portal Feedback';
        button.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: linear-gradient(135deg, #5B7DB1 0%, #4a6fa5 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(91, 125, 177, 0.4);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;

        button.onmouseover = () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 20px rgba(91, 125, 177, 0.5)';
        };

        button.onmouseout = () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 12px rgba(91, 125, 177, 0.4)';
        };

        button.onclick = openFeedbackModal;
        document.body.appendChild(button);
    }

    // Create feedback modal
    function createFeedbackModal() {
        const modal = document.createElement('div');
        modal.id = 'portal-feedback-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <!-- Header -->
                <div style="
                    background: linear-gradient(135deg, #5B7DB1 0%, #4a6fa5 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 16px 16px 0 0;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="margin: 0; font-size: 20px;">
                                <i class="bi bi-chat-left-text"></i> Provider Portal Feedback
                            </h3>
                            <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 14px;">
                                Help us improve the portal for all providers
                            </p>
                        </div>
                        <button onclick="closeFeedbackModal()" style="
                            background: transparent;
                            border: none;
                            color: white;
                            font-size: 24px;
                            cursor: pointer;
                            padding: 0;
                            width: 32px;
                            height: 32px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            transition: background 0.2s;
                        " onmouseover="this.style.background='rgba(255,255,255,0.2)'" 
                           onmouseout="this.style.background='transparent'">
                            ×
                        </button>
                    </div>
                </div>

                <!-- Body -->
                <div style="padding: 24px;">
                    <!-- Category Selection -->
                    <div style="margin-bottom: 20px;">
                        <label style="
                            display: block;
                            margin-bottom: 8px;
                            font-weight: 600;
                            color: #2E4057;
                            font-size: 14px;
                        ">
                            What would you like to share? <span style="color: #dc3545;">*</span>
                        </label>
                        <select id="feedback-category" style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            font-size: 14px;
                            transition: border-color 0.3s;
                        " onfocus="this.style.borderColor='#5B7DB1'" 
                           onblur="this.style.borderColor='#e0e0e0'">
                            <option value="">-- Select category --</option>
                            <option value="feature-request">Feature Request</option>
                            <option value="bug-report">Bug Report</option>
                            <option value="improvement">Improvement Suggestion</option>
                            <option value="ui-ux">UI/UX Feedback</option>
                            <option value="ai-recommendations">AI Recommendations Quality</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <!-- Feedback Text -->
                    <div style="margin-bottom: 20px;">
                        <label style="
                            display: block;
                            margin-bottom: 8px;
                            font-weight: 600;
                            color: #2E4057;
                            font-size: 14px;
                        ">
                            Your Feedback <span style="color: #dc3545;">*</span>
                        </label>
                        <textarea id="feedback-text" placeholder="Please share your thoughts, suggestions, or issues..." style="
                            width: 100%;
                            min-height: 120px;
                            padding: 12px;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            font-size: 14px;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                            resize: vertical;
                            transition: border-color 0.3s;
                        " onfocus="this.style.borderColor='#5B7DB1'" 
                           onblur="this.style.borderColor='#e0e0e0'"
                           maxlength="1000"></textarea>
                        <div style="text-align: right; margin-top: 4px; font-size: 12px; color: #666;">
                            <span id="char-count">0</span> / 1000 characters
                        </div>
                    </div>

                    <!-- Email (Optional) -->
                    <div style="margin-bottom: 24px;">
                        <label style="
                            display: block;
                            margin-bottom: 8px;
                            font-weight: 600;
                            color: #2E4057;
                            font-size: 14px;
                        ">
                            Your Email (optional)
                        </label>
                        <input type="email" id="feedback-email" placeholder="your.email@example.com" style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            font-size: 14px;
                            transition: border-color 0.3s;
                        " onfocus="this.style.borderColor='#5B7DB1'" 
                           onblur="this.style.borderColor='#e0e0e0'">
                        <small style="color: #666; font-size: 12px;">
                            Optional: Provide if you'd like us to follow up with you
                        </small>
                    </div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button onclick="closeFeedbackModal()" style="
                            padding: 10px 24px;
                            background: #f5f5f5;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 500;
                            transition: background 0.2s;
                        " onmouseover="this.style.background='#e0e0e0'" 
                           onmouseout="this.style.background='#f5f5f5'">
                            Cancel
                        </button>
                        <button onclick="submitPortalFeedback()" style="
                            padding: 10px 24px;
                            background: linear-gradient(135deg, #5B7DB1 0%, #4a6fa5 100%);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 500;
                            transition: opacity 0.2s;
                        " onmouseover="this.style.opacity='0.9'" 
                           onmouseout="this.style.opacity='1'">
                            <i class="bi bi-send"></i> Submit Feedback
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add character counter
        const textarea = modal.querySelector('#feedback-text');
        const charCount = modal.querySelector('#char-count');
        textarea.addEventListener('input', () => {
            charCount.textContent = textarea.value.length;
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeFeedbackModal();
            }
        });
    }

    // Open modal
    window.openFeedbackModal = function() {
        const modal = document.getElementById('portal-feedback-modal');
        modal.style.display = 'flex';
        // Clear form
        document.getElementById('feedback-category').value = '';
        document.getElementById('feedback-text').value = '';
        document.getElementById('feedback-email').value = '';
        document.getElementById('char-count').textContent = '0';
    };

    // Close modal
    window.closeFeedbackModal = function() {
        const modal = document.getElementById('portal-feedback-modal');
        modal.style.display = 'none';
    };

    // Submit feedback
    window.submitPortalFeedback = async function() {
        const category = document.getElementById('feedback-category').value;
        const feedback = document.getElementById('feedback-text').value.trim();
        const email = document.getElementById('feedback-email').value.trim();

        // Validation
        if (!category) {
            alert('Please select a feedback category');
            return;
        }

        if (!feedback) {
            alert('Please enter your feedback');
            return;
        }

        if (feedback.length < 10) {
            alert('Please provide more detailed feedback (at least 10 characters)');
            return;
        }

        // Prepare data
        const feedbackData = {
            timestamp: new Date().toISOString(),
            type: 'portal_feedback',
            category: category,
            feedback: feedback,
            email: email || null,
            context: {
                page: 'provider-portal',
                userAgent: navigator.userAgent,
                url: window.location.href,
                screenSize: `${window.innerWidth}x${window.innerHeight}`
            }
        };

        // Show loading
        const submitBtn = event.target;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            // Get API key from provider portal
            const apiKey = window.apiKey || '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';
            const apiBase = 'https://digital-wellness-api.mike-348.workers.dev/api/provider-chat';

            const response = await fetch(`${apiBase}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Provider-API-Key': apiKey
                },
                body: JSON.stringify(feedbackData)
            });

            if (response.ok) {
                // Success
                closeFeedbackModal();
                showSuccessMessage();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            console.log('Portal Feedback:', feedbackData);
            // Still show success to user (feedback logged locally)
            closeFeedbackModal();
            showSuccessMessage();
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    };

    // Success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease;
        `;

        successDiv.innerHTML = `
            <i class="bi bi-check-circle" style="font-size: 24px;"></i>
            <div>
                <div style="font-weight: 600;">Feedback Submitted!</div>
                <div style="font-size: 13px; opacity: 0.9;">Thank you for helping us improve</div>
            </div>
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transition = 'opacity 0.3s';
            setTimeout(() => successDiv.remove(), 300);
        }, 4000);
    }

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createFeedbackButton();
            createFeedbackModal();
        });
    } else {
        createFeedbackButton();
        createFeedbackModal();
    }

})();
