# Platform Integrations Overview

**Location**: `_platform-core/integrations/`
**Purpose**: Centralized configuration for all third-party platforms and tools

---

## Active Integrations

### 1. Typebot (Interactive Assessments)
**Status**: ✅ Active
**Location**: `typebot/`
**Purpose**: Interactive forms, assessments, and course content
**Modes**: Directive (symptom-oriented) | Supportive (five-pillars)

**Key Features**:
- GAD-7, PHQ-9 clinical assessments
- Wellness check-ins
- Crisis planning worksheets
- Progress tracking

**Files**:
- `config.json` - Dual-mode configuration
- `api-client.js` - Integration wrapper
- `gad7-template.json` - Clinical assessment
- `wellness-checkin-template.json` - Wellness assessment

---

### 2. Flowise (RAG Chatbot)
**Status**: ✅ Active
**Location**: `flowise/`
**Purpose**: Course-specific Q&A chatbot with crisis detection
**Modes**: Clinical (symptom-oriented) | Supportive (five-pillars)

**Key Features**:
- RAG (Retrieval Augmented Generation)
- Course-specific knowledge base
- Crisis keyword detection
- Dual system prompts (clinical vs supportive)

**Files**:
- `config.json` - Dual-mode configuration
- `api-client.js` - Integration wrapper
- `clinical-system-prompt.md` - Symptom-oriented prompt
- `supportive-system-prompt.md` - Five-pillars prompt

---

### 3. TinyMCE (Rich Text Notebooks)
**Status**: ✅ Active
**Location**: `tinymce/`
**Purpose**: Journaling and reflective writing
**Modes**: Structured (symptom-oriented) | Reflective (five-pillars)

**Key Features**:
- WYSIWYG text editor
- Structured prompts (symptom-oriented)
- Free-form reflection (five-pillars)
- Export to PDF

**Files**:
- `config.json` - Dual-mode configuration
- `structured-prompts.json` - Clinical journaling
- `reflective-prompts.json` - Wellness journaling

---

### 4. NodeBB (Community Forum)
**Status**: ✅ Active
**Location**: `nodebb/`
**Purpose**: Peer support and community discussions

**Key Features**:
- Course-specific categories
- Moderated discussions
- Peer support groups
- Provider Q&A threads

**Files**:
- `config.json` - Forum configuration
- `categories.json` - Category structure
- `moderation-rules.md` - Community guidelines

---

### 5. Gamma (Presentation Generation)
**Status**: 🔄 Planned
**Location**: `gamma/`
**Purpose**: AI-generated slide presentations for lessons

**Key Features**:
- Provider introduction slides
- Complex concept explanations
- Celebration moments
- Visual learning support

**Files**:
- `config.json` - API configuration
- `api-client.js` - Integration wrapper
- `templates/` - Slide templates

---

### 6. Gemini Storybooks (Narrative Companions)
**Status**: 📋 Planned
**Location**: `gemini-storybooks/`
**Purpose**: AI-generated story companions for courses
**Similar To**: TinyMCE (educational content enhancement)

**Key Features**:
- Clinical case studies (symptom-oriented)
- Wellness transformations (five-pillars)
- Provider narratives
- Emotional engagement
- ChatGPT-proof differentiation

**Modes**:
- **Symptom-Oriented**: Clinical case studies with provider commentary
- **Five-Pillars**: Inspirational wellness transformation stories
- **Provider Stories**: Behind-the-scenes narratives

**Files**:
- `config.json` - Complete configuration (dual-mode)
- `README.md` - Full documentation
- `protagonist-profiles/` - Character templates
- `story-templates/` - Narrative structures

**Expected Impact**:
- +30-50% lesson completion
- Passes all 4 quality gates
- $1-2 per storybook (API cost)

---

## Integration Architecture

```
Platform Core (_platform-core)
├── Templates (base, symptom-oriented, five-pillars)
├── Integrations (tools below)
├── Providers (staff profiles)
└── Dashboards (learner, provider, admin)

Integrations
├── Typebot → Interactive assessments
├── Flowise → AI chatbot support
├── TinyMCE → Journaling tools
├── NodeBB → Community forum
├── Gamma → Visual presentations
└── Gemini Storybooks → Narrative content
```

---

## Dual-Mode System

Most integrations support **two operational modes** aligned with the two-school architecture:

| Integration | Symptom-Oriented Mode | Five-Pillars Mode |
|-------------|----------------------|-------------------|
| **Typebot** | Directive (GAD-7, PHQ-9) | Supportive (wellness check-ins) |
| **Flowise** | Clinical system prompt | Supportive system prompt |
| **TinyMCE** | Structured journaling | Reflective journaling |
| **Gemini Storybooks** | Clinical case studies | Wellness transformations |

---

## Configuration Standard

Each integration follows this structure:

```
integrations/[tool-name]/
├── config.json           # Main configuration
├── README.md             # Documentation
├── api-client.js         # Integration wrapper (if applicable)
├── templates/            # Content templates
└── examples/             # Usage examples
```

### config.json Standard
```json
{
  "integration_name": "tool-name",
  "version": "1.0.0",
  "status": "active|planned|deprecated",
  "description": "Purpose and use case",
  
  "modes": {
    "symptom-oriented": { ... },
    "five-pillars": { ... }
  },
  
  "api": {
    "endpoint": "...",
    "authentication": "...",
    "rate_limits": { ... }
  },
  
  "integration_points": {
    "course_landing_pages": { ... },
    "lesson_content": { ... },
    "email_sequences": { ... }
  }
}
```

---

## Usage Guidelines

### For Developers
1. Always use `config.json` for integration settings
2. Support dual-mode (symptom-oriented + five-pillars) where applicable
3. Document API endpoints and authentication
4. Provide usage examples
5. Follow the standard directory structure

### For Content Creators
1. Reference integration configs when building courses
2. Use appropriate mode for course type (clinical vs wellness)
3. Test integrations in development before production
4. Follow brand voice guidelines (directive vs supportive)

---

## Adding New Integrations

### Checklist
- [ ] Create `integrations/[tool-name]/` directory
- [ ] Add `config.json` with dual-mode support (if applicable)
- [ ] Write `README.md` with usage instructions
- [ ] Create `api-client.js` wrapper (if API integration)
- [ ] Add templates and examples
- [ ] Update this overview document
- [ ] Test with both symptom-oriented and five-pillars content

### Example Template
```bash
mkdir -p integrations/new-tool
touch integrations/new-tool/config.json
touch integrations/new-tool/README.md
touch integrations/new-tool/api-client.js
```

---

## Integration Priority

### Active (In Production)
1. ✅ Typebot - Core assessment functionality
2. ✅ Flowise - Student support chatbot
3. ✅ TinyMCE - Journaling experience
4. ✅ NodeBB - Community engagement

### Planned (Roadmap)
5. 🔄 Gamma - Visual presentations (Provider requested)
6. 📋 Gemini Storybooks - Narrative companions (High strategic value)

### Future Considerations
- Video hosting platform (Vimeo/YouTube)
- Live session platform (Zoom/Google Meet integration)
- Progress tracking visualization (D3.js/Chart.js)
- Gamification system (badges, points, streaks)

---

## Related Documentation

- **Platform Overview**: `../../../MENTAL-HEALTH-EDUCATION-PLATFORM-OVERVIEW.md`
- **Project State**: `../../../project-docs/PROJECT-STATE.md`
- **Storybooks Roadmap**: `../../../project-docs/GEMINI-STORYBOOKS-ROADMAP.md`
- **Credentials**: `../../../docs/setup/CREDENTIALS-MASTER.md`

---

**Last Updated**: October 26, 2025
**Maintained By**: Platform Development Team
