/**
 * Chat Function
 * Context-aware Q&A with lesson content, personalized to user profile
 */

import { onCall } from 'firebase-functions/v2/https';
import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: process.env.GCLOUD_PROJECT || 'mental-health-education',
  location: 'us-central1',
});

const model = 'gemini-2.5-flash';

export const chat = onCall(async (request) => {
  // TODO: Implement chat function
  // - Load lesson context from Firestore
  // - Load user persona from licensees/{licensee}/personas.json
  // - Load provider voice from licensees/{licensee}/provider-voice.json
  // - Generate response with crisis detection
  // - Return response with suggestion chips

  return {
    message: 'Chat function coming soon',
    suggestionChips: [],
  };
});

