/**
 * Flowise RAG Chatbot API Client
 *
 * Manages RAG chatbot with dual system prompts for symptom-oriented (clinical)
 * and five-pillars (supportive) modes.
 */

class FlowiseAPIClient {
    constructor(config = {}) {
        this.apiKey = config.apiKey || process.env.FLOWISE_API_KEY;
        this.baseUrl = config.apiUrl || 'https://flowise.realpsychiatricservices.com/api/v1';
        this.chatflowId = config.chatflowId;
        this.schoolType = config.schoolType || 'symptom-oriented';
    }

    /**
     * Send message to chatbot and get response
     */
    async chat(message, sessionId, overrideConfig = {}) {
        const endpoint = `/prediction/${this.chatflowId}`;

        const payload = {
            question: message,
            chatId: sessionId,
            overrideConfig: {
                ...overrideConfig
            }
        };

        return await this.makeRequest(endpoint, 'POST', payload);
    }

    /**
     * Upload document to knowledge base
     */
    async uploadDocument(file, metadata = {}) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify(metadata));

        return await this.makeRequest('/vector/upsert', 'POST', formData, true);
    }

    /**
     * Delete document from knowledge base
     */
    async deleteDocument(documentId) {
        return await this.makeRequest(`/vector/${documentId}`, 'DELETE');
    }

    /**
     * Get chatbot embed code
     */
    getEmbedCode(options = {}) {
        const config = this.schoolType === 'symptom-oriented'
            ? require('./config.json').flowise.embedOptions['symptom-oriented']
            : require('./config.json').flowise.embedOptions['five-pillars'];

        return `
<script type="module">
  import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
  Chatbot.init({
    chatflowid: "${this.chatflowId}",
    apiHost: "${this.baseUrl.replace('/api/v1', '')}",
    chatflowConfig: ${JSON.stringify(config.chatflowConfig, null, 2)},
    ...${JSON.stringify(options, null, 2)}
  })
</script>
        `.trim();
    }

    async makeRequest(endpoint, method = 'GET', body = null, isFormData = false) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = { 'Authorization': `Bearer ${this.apiKey}` };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const options = { method, headers };
        if (body) {
            options.body = isFormData ? body : JSON.stringify(body);
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Flowise API Error: ${response.status}`);
        }
        return await response.json();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlowiseAPIClient;
}
if (typeof window !== 'undefined') {
    window.FlowiseAPIClient = FlowiseAPIClient;
}
