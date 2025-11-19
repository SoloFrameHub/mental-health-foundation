/**
 * User Data Sync System
 * Syncs user progress and responses between localStorage and backend database
 * Provides offline-first functionality with automatic background sync
 */

class UserDataSync {
  constructor() {
    this.apiBaseURL = window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api'
      : 'https://realpsychiatric.com/api'; // Update with your production URL

    this.syncQueue = [];
    this.isSyncing = false;
    this.lastSyncTime = null;
    this.syncInterval = null;
    this.isOnline = navigator.onLine;

    this.init();
  }

  /**
   * Initialize sync system
   */
  init() {
    // Check if user is authenticated
    this.checkAuth();

    // Listen for online/offline events
    window.addEventListener('online', () => {
      console.log('🌐 Back online - resuming sync');
      this.isOnline = true;
      this.syncAll();
    });

    window.addEventListener('offline', () => {
      console.log('📴 Offline - data will sync when connection restored');
      this.isOnline = false;
    });

    // Sync every 30 seconds if online
    this.syncInterval = setInterval(() => {
      if (this.isOnline && this.getAuthToken()) {
        this.syncAll();
      }
    }, 30000);

    // Sync before page unload
    window.addEventListener('beforeunload', () => {
      this.syncAll({ blocking: true });
    });

    // Initial sync on load
    if (this.isOnline && this.getAuthToken()) {
      this.loadUserData();
    }
  }

  /**
   * Check if user is authenticated
   */
  checkAuth() {
    const token = this.getAuthToken();
    if (!token) {
      console.log('📝 No auth token - data stored locally only');
      return false;
    }
    return true;
  }

  /**
   * Get authentication token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem('rps_auth_token') || localStorage.getItem('supabase_token');
  }

  /**
   * Get authenticated headers for API requests
   */
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  /**
   * Make authenticated API request
   */
  async apiRequest(endpoint, options = {}) {
    const url = `${this.apiBaseURL}${endpoint}`;
    const headers = this.getAuthHeaders();

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.warn('🔒 Authentication expired - please log in again');
          // Optionally trigger re-authentication
        }
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // ==========================================================================
  // LESSON PROGRESS SYNC
  // ==========================================================================

  /**
   * Save lesson progress to backend
   */
  async saveLessonProgress(courseId, lessonId, progressData) {
    if (!this.getAuthToken()) {
      console.log('📍 Saving locally (not authenticated)');
      return this.saveToLocalStorage(`lesson-progress-${courseId}-${lessonId}`, progressData);
    }

    try {
      const payload = {
        progressPercent: progressData.currentProgress || 0,
        completedSections: progressData.completedSections || [],
        timeSpent: progressData.timeSpent || 0,
        lessonUrl: window.location.pathname,
        status: progressData.currentProgress >= 100 ? 'completed' : 'in_progress'
      };

      const response = await this.apiRequest(
        `/progress/lessons/${courseId}/${lessonId}`,
        {
          method: 'POST',
          body: JSON.stringify(payload)
        }
      );

      console.log('✅ Lesson progress synced to backend');
      this.lastSyncTime = Date.now();
      return response;
    } catch (error) {
      console.error('Failed to sync lesson progress:', error);
      // Fallback to localStorage
      this.saveToLocalStorage(`lesson-progress-${courseId}-${lessonId}`, progressData);
      // Add to sync queue for retry
      this.addToSyncQueue('lesson-progress', { courseId, lessonId, progressData });
    }
  }

  /**
   * Load lesson progress from backend
   */
  async loadLessonProgress(courseId, lessonId) {
    if (!this.getAuthToken()) {
      return this.loadFromLocalStorage(`lesson-progress-${courseId}-${lessonId}`);
    }

    try {
      const response = await this.apiRequest(`/progress/lessons/${courseId}/${lessonId}`);

      if (response.success && response.lesson) {
        console.log('📥 Loaded lesson progress from backend');
        return {
          currentProgress: response.lesson.progress_percent || 0,
          completedSections: response.lesson.completed_sections || [],
          timeSpent: response.lesson.time_spent_seconds || 0,
          status: response.lesson.status
        };
      }

      // Fallback to localStorage
      return this.loadFromLocalStorage(`lesson-progress-${courseId}-${lessonId}`);
    } catch (error) {
      console.error('Failed to load lesson progress:', error);
      return this.loadFromLocalStorage(`lesson-progress-${courseId}-${lessonId}`);
    }
  }

  /**
   * Mark lesson as complete
   */
  async completLesson(courseId, lessonId, timeSpent = 0) {
    if (!this.getAuthToken()) {
      return null;
    }

    try {
      const response = await this.apiRequest(
        `/progress/lessons/${courseId}/${lessonId}/complete`,
        {
          method: 'POST',
          body: JSON.stringify({ timeSpent })
        }
      );

      console.log('🎉 Lesson marked as complete');
      return response;
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
      this.addToSyncQueue('lesson-complete', { courseId, lessonId, timeSpent });
    }
  }

  // ==========================================================================
  // USER RESPONSES SYNC
  // ==========================================================================

  /**
   * Save user response (textarea, slider, input, etc.)
   */
  async saveUserResponse(courseId, lessonId, elementId, elementType, value, additionalData = {}) {
    // Always save to localStorage first (offline-first)
    const localKey = `user-response-${courseId}-${lessonId}-${elementId}`;
    this.saveToLocalStorage(localKey, { value, elementType, timestamp: Date.now() });

    if (!this.getAuthToken()) {
      return;
    }

    try {
      const payload = {
        courseId,
        lessonId,
        elementId,
        elementType,
        responseValue: value,
        responseData: additionalData
      };

      await this.apiRequest('/progress/responses', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      console.log(`✅ Response synced: ${elementId}`);
    } catch (error) {
      console.error('Failed to sync response:', error);
      this.addToSyncQueue('user-response', { courseId, lessonId, elementId, elementType, value, additionalData });
    }
  }

  /**
   * Save multiple responses at once
   */
  async saveUserResponses(responses) {
    // Save all to localStorage first
    responses.forEach(resp => {
      const localKey = `user-response-${resp.courseId}-${resp.lessonId}-${resp.elementId}`;
      this.saveToLocalStorage(localKey, { value: resp.responseValue, timestamp: Date.now() });
    });

    if (!this.getAuthToken()) {
      return;
    }

    try {
      await this.apiRequest('/progress/responses/bulk', {
        method: 'POST',
        body: JSON.stringify({ responses })
      });

      console.log(`✅ Bulk responses synced: ${responses.length} items`);
    } catch (error) {
      console.error('Failed to sync bulk responses:', error);
      responses.forEach(resp => {
        this.addToSyncQueue('user-response', resp);
      });
    }
  }

  /**
   * Load all user responses for a lesson
   */
  async loadUserResponses(courseId, lessonId) {
    if (!this.getAuthToken()) {
      // Load from localStorage
      const responses = {};
      const prefix = `user-response-${courseId}-${lessonId}-`;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
          const elementId = key.replace(prefix, '');
          const data = this.loadFromLocalStorage(key);
          if (data) {
            responses[elementId] = data.value;
          }
        }
      }

      return responses;
    }

    try {
      const response = await this.apiRequest(`/progress/responses/${courseId}/${lessonId}`);

      if (response.success) {
        const responses = {};
        response.responses.forEach(r => {
          responses[r.element_id] = r.response_value;
        });
        console.log(`📥 Loaded ${Object.keys(responses).length} responses from backend`);
        return responses;
      }

      return {};
    } catch (error) {
      console.error('Failed to load responses:', error);
      return {};
    }
  }

  // ==========================================================================
  // ASSESSMENT SYNC
  // ==========================================================================

  /**
   * Save assessment results
   */
  async saveAssessment(courseId, lessonId, assessmentData) {
    const localKey = `assessment-${courseId}-${assessmentData.assessmentId}`;
    this.saveToLocalStorage(localKey, assessmentData);

    if (!this.getAuthToken()) {
      return;
    }

    try {
      const payload = {
        courseId,
        lessonId,
        assessmentId: assessmentData.assessmentId,
        assessmentType: assessmentData.type || 'self_assessment',
        score: assessmentData.score,
        maxScore: assessmentData.maxScore,
        passFail: assessmentData.passFail,
        answers: assessmentData.answers || {},
        profileResult: assessmentData.profile || {},
        startedAt: assessmentData.startedAt
      };

      await this.apiRequest('/progress/assessments', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      console.log('✅ Assessment synced to backend');
    } catch (error) {
      console.error('Failed to sync assessment:', error);
      this.addToSyncQueue('assessment', { courseId, lessonId, assessmentData });
    }
  }

  // ==========================================================================
  // MOOD TRACKER SYNC
  // ==========================================================================

  /**
   * Save mood entry
   */
  async saveMoodEntry(courseId, lessonId, moodData) {
    const localKey = `mood-entry-${Date.now()}`;
    this.saveToLocalStorage(localKey, moodData);

    if (!this.getAuthToken()) {
      return;
    }

    try {
      const payload = {
        courseId,
        lessonId,
        moodBefore: moodData.moodBefore,
        moodAfter: moodData.moodAfter,
        activityType: moodData.activityType || 'movement',
        activityDuration: moodData.duration || 0,
        notes: moodData.notes
      };

      await this.apiRequest('/progress/mood', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      console.log('✅ Mood entry synced to backend');
    } catch (error) {
      console.error('Failed to sync mood entry:', error);
      this.addToSyncQueue('mood-entry', { courseId, lessonId, moodData });
    }
  }

  /**
   * Load mood history
   */
  async loadMoodHistory(courseId = null, limit = 30) {
    if (!this.getAuthToken()) {
      return [];
    }

    try {
      const queryParams = new URLSearchParams({ limit });
      if (courseId) queryParams.append('courseId', courseId);

      const response = await this.apiRequest(`/progress/mood/history?${queryParams}`);

      if (response.success) {
        console.log(`📥 Loaded ${response.entries.length} mood entries`);
        return response.entries;
      }

      return [];
    } catch (error) {
      console.error('Failed to load mood history:', error);
      return [];
    }
  }

  // ==========================================================================
  // CRISIS EVENT LOGGING
  // ==========================================================================

  /**
   * Log crisis detection event
   */
  async logCrisisEvent(eventData) {
    if (!this.getAuthToken()) {
      // Still log locally for privacy review later
      const localKey = `crisis-event-${Date.now()}`;
      this.saveToLocalStorage(localKey, eventData);
      return;
    }

    try {
      await this.apiRequest('/progress/crisis-event', {
        method: 'POST',
        body: JSON.stringify(eventData)
      });

      console.log('⚠️ Crisis event logged');
    } catch (error) {
      console.error('Failed to log crisis event:', error);
    }
  }

  // ==========================================================================
  // SYNC QUEUE MANAGEMENT
  // ==========================================================================

  /**
   * Add item to sync queue for retry
   */
  addToSyncQueue(type, data) {
    this.syncQueue.push({
      type,
      data,
      timestamp: Date.now(),
      retries: 0
    });

    // Save queue to localStorage
    localStorage.setItem('sync-queue', JSON.stringify(this.syncQueue));
    console.log(`📋 Added to sync queue: ${type}`);
  }

  /**
   * Sync all queued items
   */
  async syncAll(options = {}) {
    if (this.isSyncing || !this.isOnline || !this.getAuthToken()) {
      return;
    }

    // Load queue from localStorage
    const savedQueue = localStorage.getItem('sync-queue');
    if (savedQueue) {
      try {
        this.syncQueue = JSON.parse(savedQueue);
      } catch (e) {
        console.error('Failed to parse sync queue');
      }
    }

    if (this.syncQueue.length === 0) {
      return;
    }

    this.isSyncing = true;
    console.log(`🔄 Syncing ${this.syncQueue.length} queued items...`);

    const failedItems = [];

    for (const item of this.syncQueue) {
      try {
        switch (item.type) {
          case 'lesson-progress':
            await this.saveLessonProgress(
              item.data.courseId,
              item.data.lessonId,
              item.data.progressData
            );
            break;

          case 'lesson-complete':
            await this.completLesson(
              item.data.courseId,
              item.data.lessonId,
              item.data.timeSpent
            );
            break;

          case 'user-response':
            await this.saveUserResponse(
              item.data.courseId,
              item.data.lessonId,
              item.data.elementId,
              item.data.elementType,
              item.data.value,
              item.data.additionalData
            );
            break;

          case 'assessment':
            await this.saveAssessment(
              item.data.courseId,
              item.data.lessonId,
              item.data.assessmentData
            );
            break;

          case 'mood-entry':
            await this.saveMoodEntry(
              item.data.courseId,
              item.data.lessonId,
              item.data.moodData
            );
            break;

          default:
            console.warn('Unknown sync item type:', item.type);
        }
      } catch (error) {
        console.error(`Failed to sync ${item.type}:`, error);
        item.retries = (item.retries || 0) + 1;

        // Keep items that haven't exceeded retry limit
        if (item.retries < 3) {
          failedItems.push(item);
        }
      }
    }

    // Update queue with only failed items
    this.syncQueue = failedItems;
    localStorage.setItem('sync-queue', JSON.stringify(this.syncQueue));

    this.isSyncing = false;
    console.log(`✅ Sync complete. ${failedItems.length} items remaining in queue.`);
  }

  /**
   * Clear sync queue
   */
  clearSyncQueue() {
    this.syncQueue = [];
    localStorage.removeItem('sync-queue');
    console.log('🗑️ Sync queue cleared');
  }

  // ==========================================================================
  // DASHBOARD & SUMMARY
  // ==========================================================================

  /**
   * Load user progress summary
   */
  async loadUserSummary() {
    if (!this.getAuthToken()) {
      return null;
    }

    try {
      const response = await this.apiRequest('/progress/summary');

      if (response.success) {
        console.log('📊 Loaded user progress summary');
        return response.summary;
      }

      return null;
    } catch (error) {
      console.error('Failed to load user summary:', error);
      return null;
    }
  }

  /**
   * Load dashboard data
   */
  async loadDashboard() {
    if (!this.getAuthToken()) {
      return null;
    }

    try {
      const response = await this.apiRequest('/progress/dashboard');

      if (response.success) {
        console.log('📈 Loaded dashboard data');
        return response.dashboard;
      }

      return null;
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      return null;
    }
  }

  // ==========================================================================
  // LOCAL STORAGE UTILITIES
  // ==========================================================================

  /**
   * Save data to localStorage
   */
  saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }

  /**
   * Load data from localStorage
   */
  loadFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  /**
   * Load all user data from backend
   */
  async loadUserData() {
    console.log('🔄 Loading user data from backend...');

    try {
      await this.loadDashboard();
      console.log('✅ User data loaded');
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }

  /**
   * Destroy sync system
   */
  destroy() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  }
}

// Global instance
window.userDataSync = new UserDataSync();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserDataSync;
}
