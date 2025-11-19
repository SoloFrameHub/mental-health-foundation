# LLM Handoff Prompt: Mental Health Course Platform Rebuild
## Clean Project - 19 Lessons + Cruip Templates

**Date:** November 18, 2025  
**Purpose:** Complete context for continuing development with long-context LLM  
**Project Location:** _new clean repo (to be created)_

---

## CRITICAL CONTEXT: READ FIRST

You are continuing development of a mental health education platform. The human (Mike) is a consultant building this for Psychiatric Nurse Practitioner offices, starting with Real Psychiatric Services. 

**Key Strategic Points:**
- Rebuilding from scratch with a clean project containing only the 19 Five Pillars courses and Cruip templates
- Moving from generic "ChatGPT-like" content to personalized, interactive experiences
- HIPAA compliance required - using Vertex AI (not consumer Gemini API) with Google Cloud BAA
- Must pass "ChatGPT Test" - courses must provide value beyond what users could get from pasting content into ChatGPT
- Two-school model planned: Five Pillars courses + symptom-based courses with higher therapeutic support

---

## PROJECT OVERVIEW

### What We're Building
An AI-enhanced mental health education platform with:
1. **19 Five Pillars courses** - currently static HTML, need complete rewrite with interactivity
2. **Movement Medicine (Course 1)** - first course to optimize, all 20 lessons need correct exercise science content
3. **Vertex AI backend** - serverless, HIPAA-compliant AI features via Vertex SDK (not Firebase Studio)
4. **Personalization engine** - adapts content to user profiles/personas per licensee
5. **Two-school architecture** - Five Pillars school + symptom-based school (future)

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
├─────────────────────────────────────────────────────────┤
│  Cruip Mosaic (React/Next) - Learner Experience        │
│  - Interactive lesson pages                             │
│  - Calculators, trackers, assessments (client-side JS)  │
│  - Chat Widget (calls Cloud Functions)                  │
│  - Progress Tracker (Firestore)                         │
│  - Workbooks (localStorage - most sensitive)            │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│              CLOUD FUNCTIONS / CLOUD RUN                 │
├─────────────────────────────────────────────────────────┤
│  Vertex AI SDK Flows:                                   │
│  - /chat - Context-aware Q&A                            │
│  - /assess - Adaptive assessments                       │
│  - /personalize - Content customization                 │
│  - /generate-image - Exercise demonstrations            │
│  - /storybook - Chapter generation                      │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│                 VERTEX AI (HIPAA)                        │
├─────────────────────────────────────────────────────────┤
│  Models:                                                │
│  - gemini-2.5-flash (chat, assessments)                 │
│  - gemini-2.5-pro (complex personalization)             │
│  - imagen-3.0-generate-002 (exercise images)            │
│  - text-embedding-005 (if RAG needed)                   │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│                    FIRESTORE                             │
├─────────────────────────────────────────────────────────┤
│  Collections:                                           │
│  - users/{uid}/profile (personalization data)           │
│  - users/{uid}/progress (lesson completion)             │
│  - users/{uid}/assessments (scores over time)           │
│  - courses/{courseId}/content (if needed)               │
└─────────────────────────────────────────────────────────┘
```

---

## CURRENT PROJECT STATE

### Clean Project Structure (To Be Created)

```
/new-clean-project/
├── courses/
│   ├── course-1-movement-medicine/
│   │   ├── lesson-1-1-the-science-of-exercise-as-medicine.html
│   │   ├── lesson-1-2-depression-and-movement-prescription.html
│   │   └── ... (lessons 1-3 through 1-20)
│   ├── course-2-workplace-mental-health/
│   ├── course-3-digital-wellness/
│   └── ... (courses 4-19)
├── themes/
│   ├── cruip/
│   │   ├── mosaic/          # HTML + React/Next versions
│   │   └── fintech/         # HTML + Next versions (marketing)
│   └── bootstrap/           # Learner Pro, NiceAdmin (backup)
├── licensees/
│   ├── real-psychiatric-services/
│   │   ├── personas.json
│   │   └── provider-voice.json
│   └── [future-licensee]/
│       ├── personas.json
│       └── provider-voice.json
├── functions/               # Cloud Functions with Vertex SDK
│   ├── src/
│   │   ├── chat.ts
│   │   ├── assess.ts
│   │   ├── personalize.ts
│   │   ├── generateImage.ts
│   │   └── storybook.ts
│   └── package.json
├── prompts/
│   ├── CONTENT-GENERATION-SYSTEM-PROMPT.md
│   ├── COURSE-GENERATION-SYSTEM-PROMPT.md
│   └── COURSE-REWRITER-SYSTEM-PROMPT.md
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
└── README.md
```

### Critical Issue: Movement Medicine Content

**All 20 Movement Medicine lessons contain WRONG content.** They have Window of Tolerance/Emotion Regulation content instead of exercise science. This requires complete rewrites but gives opportunity to build with interactivity from the start.

**What lessons SHOULD contain:**
- Module 1: Exercise Science Foundation (brain chemistry, BDNF, dose-response)
- Module 2: Movement Modalities (cardio, strength, flexibility, balance)
- Module 3: Personal Practice (barriers, planning, tracking)

### What Has NOT Been Done Yet

- Clean project structure not created
- Firebase project verification needed (aistartuplaunch@gmail.com account)
- Cloud functions not built (Vertex SDK approach)
- No lessons rewritten
- BAA with Google Cloud not executed
- Cruip templates not integrated

---

## THREE PERSONAS FOR PERSONALIZATION

### Maria - The Overwhelmed Professional (CORRECTED)
- **Age:** 42 (NOT 62 - this was corrected)
- **Background:** Marketing director, divorced, two teenagers
- **Condition:** Moderate depression, chronic stress
- **Barriers:** Time scarcity, fatigue, "all-or-nothing" thinking
- **Goals:** Sustainable energy, better sleep, stress management
- **Exercise History:** Former yoga practitioner, stopped 3 years ago
- **Motivation Style:** Needs permission to start small, evidence that 10 minutes counts

### Jake - The Former Athlete
- **Age:** 28
- **Background:** Former college basketball player, now software developer
- **Condition:** Anxiety disorder, identity crisis post-athletics
- **Barriers:** Injury fear, "not real exercise" mindset, performance anxiety
- **Goals:** Reconnect with body, manage anxiety, find new identity
- **Exercise History:** Extensive but hasn't exercised seriously in 4 years
- **Motivation Style:** Responds to challenge and competition, needs reframing of "enough"

### David P. - The Late Starter
- **Age:** 58
- **Background:** Accountant, married, recently diagnosed with Type 2 diabetes
- **Condition:** Mild depression, health anxiety, sedentary lifestyle
- **Barriers:** Physical limitations, embarrassment, "too late" thinking
- **Goals:** Blood sugar control, prevent decline, improve mood
- **Exercise History:** Never regularly exercised
- **Motivation Style:** Needs medical framing, gradual progression, dignity preservation

**Note:** Persona files are stored per-licensee in `licensees/{licensee-name}/personas.json` so each provider office can customize patient profiles.

---

## PROVIDER VOICE: DAVID GLENN

The AI chat and content should speak in David Glenn's voice. Reference: https://realpsychiatricservices.com/meet-your-providers

**Voice Characteristics:**
- Warm, encouraging, and clinically informed
- Uses "I" and shares insights from practice (anonymized)
- Balances clinical expertise with accessible language
- Celebrates effort and progress, not just outcomes
- Normalizes struggles: "Many of my patients feel the same way"
- Provides hope grounded in evidence

**Phrases to Use:**
- "In my experience working with patients..."
- "Research tells us that..."
- "What I've seen work well is..."
- "It's completely normal to feel..."
- "Here's what I'd suggest trying..."
- "You're already doing great by..."

**Phrases to Avoid:**
- "As an AI..." or any AI references
- Overly clinical jargon without explanation
- Dismissive language ("just exercise more")
- Guarantees or promises of outcomes
- Specific medical diagnoses or treatment changes

**Safety Protocol:**
If someone mentions self-harm, suicidal thoughts, or crisis, immediately provide:
- 988 Suicide & Crisis Lifeline
- Crisis Text Line: Text HOME to 741741
- Emergency: 911

**Note:** Provider voice files are stored per-licensee in `licensees/{licensee-name}/provider-voice.json` so each office can customize the AI's voice to match their providers.

---

## VERTEX AI FLOWS TO BUILD

### 1. Chat Flow
- Context-aware Q&A with lesson context
- Personalized to user profile/persona
- Provider voice (David Glenn or licensee-specific)
- Crisis detection
- Suggestion chips for follow-up questions

### 2. Assessment Flow
- Adaptive questioning based on previous answers
- Types: movement-readiness, barrier-identification, progress-check, knowledge-check
- Determines persona match
- Generates personalized recommendations

### 3. Image Generation Flow
- Exercise demonstration images via Imagen 3
- Start/mid/end positions
- Personalized form cues based on user limitations
- Cost: ~$0.04 per image

### 4. Storybook Flow
- Course narrative companions
- Features the three personas
- Clinical case study format
- Gemini 2.5 Pro for better creative writing

### 5. Personalization Flow
- Analyzes user profile
- Selects relevant content variations
- Adjusts language complexity
- Chooses appropriate examples

**Implementation Approach:** Use Vertex AI SDK directly in Cloud Functions/Cloud Run, NOT Firebase Studio. Keep it simple and maintainable.

---

## DATA STORAGE STRATEGY

### Firestore (Cloud - requires BAA)
| Collection | Data | Why Cloud |
|------------|------|-----------|
| `users/{uid}/profile` | Persona match, goals, barriers | Powers AI personalization |
| `users/{uid}/progress` | Lessons completed, streaks | Cross-device continuity |
| `users/{uid}/assessments` | Wellness scores over time | Longitudinal tracking |

### localStorage (Private - no BAA needed)
| Key | Data | Why Local |
|-----|------|-----------|
| `workbook_content` | Journal entries, reflections | Most sensitive |
| `chat_history` | Conversation messages | Can rebuild, low stakes |

---

## FRONTEND ARCHITECTURE

### Two-School Model

**School 1: Five Pillars (Current Focus)**
- **Learner Experience:** Cruip Mosaic (React/Next.js)
  - Interactive lesson pages
  - Dashboard with progress tracking
  - Chat widget integration
  - Workbook/journal features
- **Marketing Pages:** Cruip Fintech (Next.js)
  - Provider onboarding
  - Course landing pages
  - Licensing information

**School 2: Symptom-Based (Future)**
- Higher therapeutic support
- More intensive interventions
- Separate branding/theme

**Bootstrap Templates (Backup)**
- Learner Pro, NiceAdmin available for quick exports
- Can be used if provider prefers classic Bootstrap look

---

## LESSON REWRITE ORDER

**Follow numerical order (1-19):**
1. Course 1: Movement Medicine (20 lessons) - START HERE
2. Course 2: Workplace Mental Health
3. Course 3: Digital Wellness
4. Course 4: Growth Mindset
5. Course 5: CBT Fundamentals
6. Course 6: Stress & Challenge Navigation
7. Course 7: Boundaries Bootcamp
8. Course 8: Social Circle Mastery
9. Course 9: Team Sports & Mental Health
10. Course 10: Relationship Dynamics
11. Course 11: Family & Parenting Mental Health
12. Course 12: Purpose & Responsibility
13. Course 13: Mental Health First Aid
14. Course 14: Coaching & Mentoring
15. Course 15: Legacy Building
16. Course 16: Recreational Therapy
17. Course 17: Creative Expression & Art Therapy
18. Course 18: Adventure & Outdoor Mental Health
19. Course 19: Music & Movement for Wellness

---

## EXTERNAL INTEGRATIONS

**Current:** None required

**Future Consideration:**
- NodeBB forum (VPS-hosted) - potential SSO/API integration if needed
- No EHR integrations planned
- No LMS integrations planned

---

## QUALITY STANDARDS

### The ChatGPT Test
Every lesson must provide value that users CANNOT get from ChatGPT:
- Interactive exercises (body maps, calculators, trackers)
- Personalized responses based on their profile
- Progressive skill building with feedback
- Accountability and progress tracking
- Provider wisdom and clinical insights

### Experiential Learning (Kolb Cycle)
Each lesson should follow:
1. **Concrete Experience** (10-15%) - Do something first
2. **Reflective Observation** (20-25%) - What did you notice?
3. **Abstract Conceptualization** (30-35%) - Here's why that happened
4. **Active Experimentation** (30-40%) - Now practice the skill

### Provider Presence
- Personal clinical stories (anonymized)
- Warm, encouraging tone
- Validates struggles
- Celebrates progress specifically
- Never academic/textbook voice

---

## IMMEDIATE NEXT STEPS

### Mike Needs To Do:
1. Create clean project structure
2. Verify Firebase project: `mental-health-education` with `aistartuplaunch@gmail.com`
3. Enable APIs: Vertex AI, Cloud Functions, Firestore
4. Execute BAA with Google Cloud (required for HIPAA)
5. Add Cruip templates (Mosaic HTML+React/Next, Fintech HTML+Next)
6. Create `licensees/real-psychiatric-services/` folder with personas.json and provider-voice.json

### LLM Should Do Next:
1. **Verify Firebase setup** - Check project configuration, account, APIs
2. **Build Vertex SDK functions** - Create `functions/src/` with chat.ts, assess.ts, personalize.ts, etc.
3. **Create lesson template** - Reusable HTML structure with Kolb cycle, interactive placeholders
4. **Rewrite Lesson 1-1** - Movement Medicine with correct exercise science content
5. **Integrate Cruip Mosaic** - Set up React/Next structure for learner experience
6. **Build personalization engine** - Load licensee-specific personas and provider voice

---

## KEY PROJECT FILES TO READ

Before starting work, read these files in the project:

1. **`prompts/CONTENT-GENERATION-SYSTEM-PROMPT.md`** - System prompt for generating lesson content
2. **`prompts/COURSE-GENERATION-SYSTEM-PROMPT.md`** - System prompt for course-level generation
3. **`licensees/real-psychiatric-services/personas.json`** - Persona profiles for personalization
4. **`licensees/real-psychiatric-services/provider-voice.json`** - David Glenn voice guidelines
5. **Sample lesson:** `courses/course-1-movement-medicine/lesson-1-1-*.html` - See current structure

---

## TECHNICAL NOTES

### Firebase Configuration
- Project: `mental-health-education`
- Account: `aistartuplaunch@gmail.com` (verify this is active)
- Region: `us-central1` for Vertex AI
- Enable App Check for production security
- Use Firebase Auth for user management

### Vertex AI SDK Approach
```typescript
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: 'mental-health-education',
  location: 'us-central1',
});

// Use directly in Cloud Functions, not Firebase Studio
```

### Testing Approach
- **Local:** Firebase emulators for functions, Firestore, Auth
- **Development:** Deploy to staging project first
- **Production:** Deploy after clinical review

---

## LICENSEE-SPECIFIC CONFIGURATION

Each provider office that licenses the platform gets:
- `licensees/{office-name}/personas.json` - Custom patient personas
- `licensees/{office-name}/provider-voice.json` - Provider voice guidelines
- Custom branding (via Cruip theme customization)
- Their own Firebase project (or multi-tenant Firestore structure)

**Real Psychiatric Services (Initial Licensee):**
- Provider voice: David Glenn (see https://realpsychiatricservices.com/meet-your-providers)
- Personas: Maria (42, overworked professional), Jake (28, former athlete), David P. (58, late starter)

---

## CONVERSATION HISTORY SUMMARY

1. **Strategic pivot confirmed:** From generic content to personalized, interactive experiences
2. **Architecture designed:** Vertex AI SDK + Cloud Functions (not Firebase Studio)
3. **Clean project approach:** Starting fresh with 19 lessons + Cruip templates
4. **Personas defined:** Maria (corrected to age 42), Jake, David P. with detailed profiles
5. **Two-school model:** Five Pillars + symptom-based (future)
6. **Licensee system:** Per-licensee personas and provider voice files
7. **Content issue identified:** All 20 Movement Medicine lessons have wrong content (needs full rewrite)
8. **Next action:** Build clean project structure and begin Lesson 1-1 rewrite

---

## HOW TO USE THIS PROMPT

1. Load this entire document into your context
2. Read the key project files listed above from the local filesystem
3. Verify Firebase project setup with Mike
4. Start with Lesson 1-1 rewrite OR Vertex SDK function scaffolding (Mike's choice)
5. Maintain provider voice (David Glenn or licensee-specific) in all generated content
6. Apply Kolb Cycle to lesson structure
7. Ensure all content passes the ChatGPT Test
8. Test locally with Firebase emulators

---

## QUESTIONS TO ASK MIKE

Before proceeding, confirm:
1. Has the clean project structure been created?
2. Is Firebase project `mental-health-education` verified with `aistartuplaunch@gmail.com`?
3. Have Cruip templates been added to the project?
4. Which to start with: Lesson 1-1 rewrite OR Vertex SDK functions?
5. Any changes to the personas or voice guidelines?
6. Preferred testing approach (local emulators vs. deployed)?

---

**End of Handoff Prompt**

*This document contains complete context for continuing the Mental Health Education Platform development with a new LLM session in the clean project.*

