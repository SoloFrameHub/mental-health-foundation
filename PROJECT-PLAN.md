# Five Pillars School - Project Continuation Plan

**Date:** January 2025  
**Status:** Planning Phase  
**Project:** Mental Health Education Platform Rebuild with Vertex AI & Cruip Templates

---

## Executive Summary

This project plan outlines the continuation strategy for rebuilding the Five Pillars School mental health education platform. The rebuild focuses on:

1. **Template Migration**: Moving from Bootstrap templates to modern Cruip templates (Mosaic for learner experience, Fintech for marketing)
2. **AI Integration**: Implementing Vertex AI SDK for HIPAA-compliant, personalized AI features
3. **Content Enhancement**: Rewriting lessons with interactivity and personalization
4. **Architecture Modernization**: Clean project structure with proper separation of concerns

---

## Current State Assessment

### ✅ What Exists

1. **Course Content** (19 courses, 380 lessons total)
   - All courses have basic HTML structure
   - Course 1 (Movement Medicine) has 20 lessons with some interactivity
   - Course catalog JSON with metadata
   - Bootstrap-based templates in `_bootstrap_templates/`

2. **Templates Available**
   - **Bootstrap Templates**: Learner Pro, NiceAdmin (backup/legacy)
   - **Cruip Fintech**: HTML + Next.js versions (for marketing/platform pages)
   - **Cruip Mosaic**: HTML + React + Next.js versions (for learner experience)

3. **Licensee Configuration**
   - Real Psychiatric Services configuration started
   - Provider voice guidelines documented
   - User personas defined (Maria, Jake, David P. from PROJECT-CONTINUATION-PROMPT.md)

4. **Documentation**
   - PROJECT-CONTINUATION-PROMPT.md with full context
   - Workbook integration guides
   - Course enhancement plans

### ❌ What's Missing

1. **Clean Project Structure**
   - No root-level `package.json` or project configuration
   - No Firebase configuration (`firebase.json`)
   - No Cloud Functions structure
   - No organized template integration

2. **Vertex AI Integration**
   - SDK installed but not configured
   - No Cloud Functions for AI flows
   - No personalization engine
   - No chat/assessment/image generation flows

3. **Template Integration**
   - Cruip templates not integrated into project
   - No Next.js/React app structure
   - No routing for courses/lessons
   - No component library setup

4. **Content Issues**
   - Movement Medicine lessons have incorrect content (Window of Tolerance instead of exercise science)
   - Lessons lack interactivity (calculators, trackers, assessments)
   - No personalization based on personas
   - Static HTML without dynamic features

---

## Project Goals & Success Criteria

### Primary Goals

1. **Template Migration** (Weeks 1-2)
   - Integrate Cruip Mosaic for learner dashboard/lessons
   - Integrate Cruip Fintech for marketing/platform pages
   - Maintain Bootstrap templates as backup option

2. **Vertex AI Backend** (Weeks 2-4)
   - Build 5 Cloud Functions (chat, assess, personalize, generate-image, storybook)
   - Implement HIPAA-compliant Vertex AI integration
   - Create personalization engine with licensee-specific personas

3. **Frontend Development** (Weeks 3-6)
   - Build Next.js app with Mosaic components
   - Create lesson viewer with interactivity
   - Implement chat widget
   - Build progress tracking dashboard

4. **Content Rewrite** (Weeks 4-12)
   - Rewrite Course 1 (Movement Medicine) with correct content
   - Add interactive components to all lessons
   - Implement personalization based on user personas
   - Ensure all content passes "ChatGPT Test"

### Success Criteria

- ✅ All 19 courses accessible via modern Mosaic interface
- ✅ Vertex AI chat functional with provider voice
- ✅ Personalization working based on licensee personas
- ✅ Interactive components (calculators, trackers) functional
- ✅ HIPAA compliance verified (BAA executed, Vertex AI configured)
- ✅ Firebase project deployed and accessible
- ✅ Content quality: Lessons provide value beyond ChatGPT

---

## Phase 1: Project Setup & Template Integration (Weeks 1-2)

### 1.1 Clean Project Structure

**Tasks:**
- [ ] Create root `package.json` with workspace configuration
- [ ] Set up monorepo structure (or single project structure)
- [ ] Create `firebase.json` configuration
- [ ] Set up `.gitignore` for Firebase/Node
- [ ] Create `README.md` with setup instructions

**Directory Structure:**
```
mh-licensing/
├── apps/
│   ├── learner/              # Next.js app (Mosaic-based)
│   ├── marketing/            # Next.js app (Fintech-based)
│   └── functions/            # Cloud Functions (Vertex AI)
├── packages/
│   ├── shared/               # Shared types, utilities
│   └── ui/                   # Shared UI components
├── courses/                  # Course content (HTML/MDX)
│   └── course-1-movement-medicine/
├── licensees/                # Licensee-specific configs
│   └── real-psychiatric-services/
├── _templates/               # Template source files
│   ├── cruip/
│   └── _bootstrap_templates/
└── firebase.json
```

### 1.2 Cruip Template Integration

**Tasks:**
- [ ] Copy Cruip Mosaic Next.js to `apps/learner/`
- [ ] Copy Cruip Fintech Next.js to `apps/marketing/`
- [ ] Install dependencies for both apps
- [ ] Configure Tailwind CSS and build tools
- [ ] Set up shared component library
- [ ] Create base layout components

**Key Files to Integrate:**
- `_templates/cruip/mosaic/mosaic-next/` → `apps/learner/`
- `_templates/cruip/fintech/fintech-next/` → `apps/marketing/`

### 1.3 Firebase Configuration

**Tasks:**
- [ ] Verify Firebase project: `mental-health-education`
- [ ] Verify account: `aistartuplaunch@gmail.com`
- [ ] Enable APIs: Vertex AI, Cloud Functions, Firestore, Auth
- [ ] Configure `firebase.json` with hosting and functions
- [ ] Set up Firestore security rules
- [ ] Configure Firebase Auth providers
- [ ] Set up App Check for production security

**Firebase Configuration:**
```json
{
  "hosting": [
    {
      "target": "learner",
      "public": "apps/learner/.next/out",
      "rewrites": [...]
    },
    {
      "target": "marketing",
      "public": "apps/marketing/.next/out",
      "rewrites": [...]
    }
  ],
  "functions": {
    "source": "apps/functions",
    "runtime": "nodejs20"
  }
}
```

---

## Phase 2: Vertex AI Backend Development (Weeks 2-4)

### 2.1 Cloud Functions Setup

**Tasks:**
- [ ] Initialize Cloud Functions project
- [ ] Install Vertex AI SDK: `@google-cloud/vertexai`
- [ ] Set up TypeScript configuration
- [ ] Create function structure:
  - `src/chat.ts`
  - `src/assess.ts`
  - `src/personalize.ts`
  - `src/generateImage.ts`
  - `src/storybook.ts`
- [ ] Configure environment variables
- [ ] Set up local emulator testing

**Function Structure:**
```typescript
// apps/functions/src/chat.ts
import { VertexAI } from '@google-cloud/vertexai';
import { onCall } from 'firebase-functions/v2/https';

export const chat = onCall(async (request) => {
  // Vertex AI chat implementation
  // - Load lesson context
  // - Load user persona
  // - Load provider voice
  // - Generate response with crisis detection
});
```

### 2.2 Vertex AI Flows Implementation

#### 2.2.1 Chat Flow
**Features:**
- Context-aware Q&A with lesson content
- Personalized responses based on user persona
- Provider voice (David Glenn or licensee-specific)
- Crisis detection and response
- Suggestion chips for follow-up questions

**Implementation:**
- Use `gemini-2.5-flash` for chat
- Load context from Firestore (lesson content, user profile)
- Load persona from `licensees/{licensee}/personas.json`
- Load provider voice from `licensees/{licensee}/provider-voice.json`
- Implement crisis keyword detection

#### 2.2.2 Assessment Flow
**Features:**
- Adaptive questioning based on previous answers
- Types: movement-readiness, barrier-identification, progress-check, knowledge-check
- Determines persona match (Maria, Jake, David P.)
- Generates personalized recommendations

**Implementation:**
- Use `gemini-2.5-flash` for assessments
- Store assessment results in Firestore
- Update user profile with persona match

#### 2.2.3 Personalization Flow
**Features:**
- Analyzes user profile
- Selects relevant content variations
- Adjusts language complexity
- Chooses appropriate examples

**Implementation:**
- Use `gemini-2.5-pro` for complex personalization
- Generate personalized lesson content on-demand
- Cache personalized content in Firestore

#### 2.2.4 Image Generation Flow
**Features:**
- Exercise demonstration images via Imagen 3
- Start/mid/end positions
- Personalized form cues based on user limitations

**Implementation:**
- Use `imagen-3.0-generate-002`
- Generate images for Movement Medicine course
- Store image URLs in Firestore

#### 2.2.5 Storybook Flow
**Features:**
- Course narrative companions
- Features the three personas
- Clinical case study format

**Implementation:**
- Use `gemini-2.5-pro` for creative writing
- Generate storybook chapters per course module
- Store in Firestore for user access

### 2.3 Licensee Configuration System

**Tasks:**
- [ ] Create `licensees/real-psychiatric-services/personas.json`
  - Maria (42, overwhelmed professional)
  - Jake (28, former athlete)
  - David P. (58, late starter)
- [ ] Create `licensees/real-psychiatric-services/provider-voice.json`
  - David Glenn voice guidelines
  - Phrases to use/avoid
  - Safety protocols
- [ ] Build configuration loader in Cloud Functions
- [ ] Create admin interface for licensee management (future)

---

## Phase 3: Frontend Development (Weeks 3-6)

### 3.1 Learner App (Mosaic-based)

**Tasks:**
- [ ] Set up Next.js app with Mosaic components
- [ ] Create routing structure:
  - `/` - Dashboard
  - `/courses` - Course catalog
  - `/courses/[courseId]` - Course homepage
  - `/courses/[courseId]/lessons/[lessonId]` - Lesson viewer
  - `/dashboard` - Progress tracking
  - `/workbooks` - Workbook management
- [ ] Integrate Firebase Auth
- [ ] Build lesson viewer component
- [ ] Implement interactive components:
  - Calculators (exercise, mood, etc.)
  - Trackers (progress, mood, habits)
  - Assessments (knowledge checks, readiness)
- [ ] Build chat widget component
- [ ] Create progress tracking dashboard
- [ ] Implement workbook/journal features

**Key Components:**
- `LessonViewer` - Main lesson display with interactivity
- `ChatWidget` - AI chat interface
- `ProgressDashboard` - User progress tracking
- `WorkbookManager` - Workbook creation/editing
- `AssessmentWidget` - Interactive assessments

### 3.2 Marketing App (Fintech-based)

**Tasks:**
- [ ] Set up Next.js app with Fintech components
- [ ] Create marketing pages:
  - `/` - Platform homepage
  - `/courses` - Course catalog (public)
  - `/courses/[courseId]` - Course landing page
  - `/providers` - Provider onboarding
  - `/pricing` - Licensing information
- [ ] Integrate with Firebase Auth for enrollment
- [ ] Create course preview functionality
- [ ] Build provider dashboard (future)

### 3.3 Shared Components & Utilities

**Tasks:**
- [ ] Create shared TypeScript types
- [ ] Build shared UI components
- [ ] Create API client for Cloud Functions
- [ ] Implement error handling
- [ ] Set up logging/monitoring

---

## Phase 4: Content Rewrite & Enhancement (Weeks 4-12)

### 4.1 Lesson Template Creation

**Tasks:**
- [ ] Create reusable lesson template with Kolb Cycle structure:
  1. Concrete Experience (10-15%)
  2. Reflective Observation (20-25%)
  3. Abstract Conceptualization (30-35%)
  4. Active Experimentation (30-40%)
- [ ] Add interactive component placeholders
- [ ] Include personalization hooks
- [ ] Add workbook integration points
- [ ] Create MDX format for lessons (or enhanced HTML)

### 4.2 Course 1: Movement Medicine Rewrite

**Priority:** HIGH (all 20 lessons have incorrect content)

**Tasks:**
- [ ] Rewrite Lesson 1-1: The Science of Exercise as Medicine
  - Correct exercise science content
  - BDNF, neuroplasticity, neurotransmitters
  - Interactive BDNF visualization
  - Exercise calculator
- [ ] Rewrite Lesson 1-2: Depression and the Movement Prescription
  - Dose-response relationships
  - Exercise protocols for depression
  - Personalized exercise planning
- [ ] Continue with lessons 1-3 through 1-20
- [ ] Add interactive components to each lesson
- [ ] Implement personalization based on personas
- [ ] Add provider voice throughout

**Module Structure:**
- Module 1: Exercise Science Foundation (Lessons 1-5)
- Module 2: Movement Modalities (Lessons 6-12)
- Module 3: Personal Practice (Lessons 13-20)

### 4.3 Remaining Courses Enhancement

**Order:** Follow numerical order (Course 2-19)

**Tasks per Course:**
- [ ] Review existing content
- [ ] Add interactive components
- [ ] Implement personalization
- [ ] Add provider voice
- [ ] Ensure "ChatGPT Test" compliance
- [ ] Add workbook integration

**Estimated Time:** 2-3 days per course (38-57 days total)

---

## Phase 5: Testing & Deployment (Weeks 10-12)

### 5.1 Local Testing

**Tasks:**
- [ ] Set up Firebase emulators
- [ ] Test Cloud Functions locally
- [ ] Test frontend apps locally
- [ ] Integration testing
- [ ] User acceptance testing with personas

### 5.2 Staging Deployment

**Tasks:**
- [ ] Deploy to staging Firebase project
- [ ] Test Vertex AI integration
- [ ] Test personalization engine
- [ ] Performance testing
- [ ] Security audit

### 5.3 Production Deployment

**Tasks:**
- [ ] Execute Google Cloud BAA (HIPAA compliance)
- [ ] Deploy to production Firebase project
- [ ] Configure custom domains
- [ ] Set up monitoring and alerts
- [ ] Create backup/rollback procedures

### 5.4 Documentation

**Tasks:**
- [ ] Update README with setup instructions
- [ ] Document API endpoints
- [ ] Create admin guide
- [ ] Write user documentation
- [ ] Create deployment runbook

---

## Technical Architecture

### Frontend Stack
- **Learner App**: Next.js 14+ (App Router), React, Tailwind CSS, Mosaic components
- **Marketing App**: Next.js 14+ (App Router), React, Tailwind CSS, Fintech components
- **State Management**: React Context + Firebase SDK
- **Authentication**: Firebase Auth
- **Storage**: Firestore (cloud), localStorage (workbooks)

### Backend Stack
- **Cloud Functions**: Node.js 20, TypeScript
- **AI**: Vertex AI SDK (`@google-cloud/vertexai`)
  - Models: `gemini-2.5-flash`, `gemini-2.5-pro`, `imagen-3.0-generate-002`
- **Database**: Firestore
- **Hosting**: Firebase Hosting

### Data Flow

```
User Browser
  ↓
Next.js App (Mosaic/Fintech)
  ↓
Firebase Auth (user authentication)
  ↓
Cloud Functions (Vertex AI)
  ↓
Vertex AI (HIPAA-compliant)
  ↓
Firestore (user data, progress)
```

---

## Risk Management

### Technical Risks

1. **Vertex AI Integration Complexity**
   - **Mitigation**: Start with simple chat flow, iterate
   - **Fallback**: Use simpler AI models if needed

2. **HIPAA Compliance**
   - **Mitigation**: Execute BAA early, use Vertex AI (not consumer API)
   - **Fallback**: Consult legal/security experts

3. **Template Integration Issues**
   - **Mitigation**: Keep Bootstrap templates as backup
   - **Fallback**: Use existing Bootstrap structure if needed

4. **Content Quality**
   - **Mitigation**: Clinical review process, iterative improvement
   - **Fallback**: Start with Course 1, refine process

### Timeline Risks

1. **Content Rewrite Takes Longer**
   - **Mitigation**: Prioritize Course 1, batch remaining courses
   - **Fallback**: Release Course 1 first, add others incrementally

2. **Vertex AI Development Delays**
   - **Mitigation**: Start with MVP (chat only), add features incrementally
   - **Fallback**: Launch without AI features, add later

---

## Success Metrics

### Technical Metrics
- ✅ All 19 courses accessible
- ✅ < 3s page load time
- ✅ 99.9% uptime
- ✅ Zero critical security vulnerabilities

### User Experience Metrics
- ✅ Interactive components functional
- ✅ Chat response time < 2s
- ✅ Personalization accuracy > 80%
- ✅ User satisfaction > 4.5/5

### Business Metrics
- ✅ HIPAA compliance verified
- ✅ Licensee onboarding process functional
- ✅ Content passes "ChatGPT Test"
- ✅ Provider voice consistency > 90%

---

## Next Steps (Immediate Actions)

### Week 1 Priorities

1. **Project Structure** (Day 1-2)
   - [ ] Create root `package.json`
   - [ ] Set up Firebase configuration
   - [ ] Create directory structure

2. **Template Integration** (Day 2-3)
   - [ ] Copy Cruip templates to project
   - [ ] Install dependencies
   - [ ] Verify builds work

3. **Vertex AI Setup** (Day 3-4)
   - [ ] Verify Firebase project access
   - [ ] Enable Vertex AI API
   - [ ] Create first Cloud Function (chat)

4. **Licensee Configuration** (Day 4-5)
   - [ ] Create personas.json
   - [ ] Create provider-voice.json
   - [ ] Test configuration loading

### Questions to Resolve

1. **Project Structure**: Monorepo (Turborepo/Nx) or single project?
2. **Deployment**: Single Firebase project or separate staging/production?
3. **Content Format**: MDX, HTML, or hybrid?
4. **Authentication**: Firebase Auth only or add SSO?
5. **Licensee Management**: Multi-tenant Firestore or separate projects?

---

## Resources & References

### Documentation
- `PROJECT-CONTINUATION-PROMPT.md` - Full project context
- `_course-catalog.json` - Course metadata
- `COMPLETE-WORKBOOK-INTEGRATION-GUIDE.md` - Workbook system
- `LESSON-1-1-ENHANCEMENT-PLAN.md` - Lesson enhancement example

### Templates
- Cruip Mosaic: `_templates/cruip/mosaic/mosaic-next/`
- Cruip Fintech: `_templates/cruip/fintech/fintech-next/`
- Bootstrap (backup): `_templates/_bootstrap_templates/`

### External Resources
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Cruip Templates](https://cruip.com/)

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1: Setup & Templates | Weeks 1-2 | Project structure, template integration, Firebase config |
| Phase 2: Vertex AI Backend | Weeks 2-4 | Cloud Functions, AI flows, personalization engine |
| Phase 3: Frontend Development | Weeks 3-6 | Learner app, marketing app, shared components |
| Phase 4: Content Rewrite | Weeks 4-12 | Course 1 rewrite, remaining courses enhancement |
| Phase 5: Testing & Deployment | Weeks 10-12 | Testing, staging, production deployment |

**Total Estimated Duration:** 12 weeks (3 months)

---

## Conclusion

This project plan provides a comprehensive roadmap for continuing the Five Pillars School platform development. The phased approach allows for iterative development and early value delivery. Key priorities are:

1. **Template Integration** - Modern UI with Cruip templates
2. **Vertex AI Backend** - HIPAA-compliant AI features
3. **Content Quality** - Interactive, personalized lessons
4. **HIPAA Compliance** - BAA execution and security

The plan is flexible and can be adjusted based on priorities, resources, and learnings during development.

---

**Last Updated:** January 2025  
**Next Review:** After Phase 1 completion

