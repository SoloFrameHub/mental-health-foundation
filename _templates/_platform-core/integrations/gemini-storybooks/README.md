# Gemini Storybooks Integration

**Status**: 📋 Planned
**Platform Type**: Content Generation Tool
**Similar To**: TinyMCE (educational content enhancement)

---

## Overview

Gemini Storybooks is an AI-powered narrative generation system that creates emotionally engaging companion stories for mental health courses. Like TinyMCE enhances journaling, Storybooks enhance course content with human-centered narratives.

---

## Purpose

Transform clinical course content into relatable, engaging narratives that:
- Demonstrate tool application in real-world scenarios
- Build emotional connection with learners
- Differentiate from generic AI content (ChatGPT Test)
- Model recovery journeys with provider guidance

---

## Integration Modes

### Symptom-Oriented School
**Format**: Clinical Case Studies
- Evidence-based recovery narratives
- Provider commentary throughout
- GAD-7/PHQ-9 integration
- Crisis resources embedded
- Shows "how to" apply course tools

**Example**: "Alex's Anxiety Journey" - 6 chapters showing panic disorder recovery using Anxiety Toolkit tools

### Five Pillars School
**Format**: Wellness Transformations
- Inspirational growth stories
- Five Pillars framework integration
- Reflective journaling prompts
- Community connection themes
- Sustainable lifestyle changes

**Example**: "From Stressed to Strong" - Startup founder's burnout recovery through Five Pillars

### Provider Stories
**Format**: Behind-the-Scenes Narratives
- Provider personal journey
- Clinical philosophy explained
- Memorable cases (anonymized)
- Vision for mental health care

**Example**: "A Day in the Life: PMHNP Practice" - David Glenn's story

---

## Technical Architecture

### Generation System
```
Gemini 2.5 Pro API
    ↓
Story Templates (symptom-oriented, five-pillars, provider)
    ↓
Protagonist Profiles (JSON)
    ↓
6-Chapter Narrative (800-1000 words each)
    ↓
Quality Validation (4 gates)
    ↓
HTML5 Output (mobile-responsive)
```

### Integration Points

**Course Landing Pages**:
```html
<div class="companion-storybook">
  <h3>📖 Companion Story: Alex's Anxiety Journey</h3>
  <p>Follow Alex's recovery using the tools you'll learn.</p>
  <a href="/storybooks/alex">Read Free Chapter 1 →</a>
</div>
```

**Between Modules**:
```html
<div class="story-checkpoint">
  <p>You just learned 4-7-8 breathing. See how Alex used it during a panic attack.</p>
  <a href="/storybooks/alex/chapter-3">Continue Story →</a>
</div>
```

**Email Sequences**:
- 1 chapter per day for 6 days
- Story-driven course preview
- Engagement and conversion tool

---

## Configuration

### API Setup
```json
{
  "api": {
    "service": "Google Gemini",
    "model": "gemini-2.5-pro",
    "authentication": "GEMINI_API_KEY"
  }
}
```

### Modes Configuration
```json
{
  "modes": {
    "symptom-oriented": {
      "tone": "clinical, empathetic, hopeful",
      "chapters": 6,
      "provider_commentary": true
    },
    "five-pillars": {
      "tone": "supportive, aspirational, growth-oriented",
      "chapters": 6,
      "wellness_prompts": true
    }
  }
}
```

---

## Content Structure

### Chapter Template
1. **Opening Scene** (200-300 words)
   - Set context and situation
   - Show protagonist's struggle

2. **Development** (400-500 words)
   - Tool application or learning moment
   - Challenges and small wins

3. **Provider Commentary** (100-150 words)
   - Clinical context
   - Encouragement
   - "This is exactly how [tool] works"

4. **Closing** (100-150 words)
   - Reflection
   - Preview next chapter
   - Discussion prompt

5. **Course Link**
   - Related lesson reference
   - "Learn this tool in Module 2"

**Total**: 800-1,000 words (5-7 minute read)

---

## Quality Validation

### Automated Checks
- ✅ Provider voice consistency
- ✅ Clinical accuracy (symptom-oriented)
- ✅ Crisis resources included
- ✅ Reading level (8th-10th grade)
- ✅ Chapter length within range

### Manual Review
- ✅ Provider approval (David Glenn)
- ✅ 4 quality gates (ChatGPT, Prescription, Emotional, Practice)
- ✅ Clinical accuracy validation

### Student Validation
- ✅ 70%+ chapter completion
- ✅ Engagement metrics (time, scroll)
- ✅ Feedback survey ("Did this help?")

---

## Cost Analysis

### API Costs
- **Per Chapter**: $0.15-0.30
- **Per Storybook** (6 chapters): $1-2
- **Pilot** (3 storybooks): $3-6
- **Scale** (10 storybooks): $16-20

### Development Time
- **Script Setup**: 4-6 hours (one-time)
- **Per Storybook**: 1-1.5 hours
- **Quality Review**: 30-45 minutes

### Total Investment
- **Pilot Phase**: ~$300-450 + $3-6 API
- **Scale Phase**: ~$1,200-1,500 + $16-20 API
- **Enhanced Phase**: ~$2,000-3,000 + $50-100 API

**ROI**: HIGH - Low cost, high differentiation, solves core problem

---

## Expected Impact

### Engagement Metrics
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Lesson Completion** | 65% | 85-95% | +30-50% |
| **Time on Platform** | 45 min | 60-70 min | +33-55% |
| **Emotional Connection** | 60% | 90%+ | +50% |

### Quality Performance
- ✅ **ChatGPT Test**: PASS - Unique narratives tied to courses
- ✅ **Provider Prescription Test**: PASS - Models clinical application
- ✅ **Emotional Connection Test**: PASS - Humanizes content
- ✅ **Practice Test**: PASS - Demonstrates tool usage

---

## Implementation Phases

### Phase 1: Pilot (1-2 weeks)
**Deliverables**:
- Alex's Anxiety Journey (symptom-oriented)
- From Stressed to Strong (five-pillars)
- A Day in the Life: PMHNP (provider)

**Validation**: 70%+ engagement, provider approval

### Phase 2: Scale (2-3 weeks)
**Deliverables**:
- 1 story per Tier 1 course (4 stories)
- Overview stories (2 stories)
- Provider collection (4 stories)

**Validation**: +30% lesson completion boost

### Phase 3: Enhanced (1 month)
**Features**:
- Visual storybooks (AI illustrations)
- Interactive narratives (branching)
- Audio narration (text-to-speech)

**Validation**: Premium experience differentiation

---

## Related Integrations

### Typebot
**Integration**: Story checkpoints trigger Typebot reflections
**Example**: "Chapter 3 → Try the breathing technique Alex used"

### Flowise
**Integration**: Story-aware chatbot context
**Example**: "Ask questions about Alex's recovery journey"

### TinyMCE
**Integration**: Story-prompted journaling
**Example**: "Reflect on your experience like Maya did"

### NodeBB
**Integration**: Story discussion threads
**Example**: "Share your reaction to Chapter 4"

---

## Files & Scripts

### Configuration
- `config.json` - Complete integration settings
- `protagonist-profiles/` - Character templates (JSON)
- `story-templates/` - Narrative structures (TXT)

### Scripts (To Be Created)
- `scripts/gemini/gemini-storybook-generator.py` - Main generator
- `scripts/gemini/storybook-validator.py` - Quality checks
- `scripts/gemini/storybook-deployer.py` - Platform integration

### Output
- `data/gemini/output/storybooks/` - Generated HTML
- `github-deployment/storybooks/` - Production location

---

## Prerequisites

### Required
- ✅ Gemini API configured (COMPLETE)
- [ ] Provider voice profiles extracted
- [ ] Core courses available for reference
- [ ] Quality validation system operational

### Before Start
- [ ] Provider approval (David Glenn buy-in)
- [ ] 3-5 protagonist profiles developed
- [ ] Story arc templates created
- [ ] Integration points identified in courses

---

## Success Criteria

### Pilot Phase
- [ ] All 3 stories complete (18 chapters)
- [ ] Provider review approved
- [ ] Passes all 4 quality gates
- [ ] 70%+ chapter completion
- [ ] 80%+ positive feedback

### Scale Phase
- [ ] 10 total stories complete
- [ ] Integrated into course platform
- [ ] Marketing materials created
- [ ] +30% lesson completion boost

---

## Future Enhancements

### Planned Features
1. **User-Generated Stories** - Community submissions
2. **Video Storybooks** - Provider-narrated
3. **VR Story Experiences** - Immersive journeys
4. **Storybook Courses** - Entire courses as narratives
5. **AI Companion Character** - Interactive story guide

---

## Documentation

- **Roadmap**: [project-docs/GEMINI-STORYBOOKS-ROADMAP.md](../../../project-docs/GEMINI-STORYBOOKS-ROADMAP.md)
- **Config**: [config.json](config.json)
- **Integration Guide**: To be created after pilot

---

## Comparison to TinyMCE

| Feature | TinyMCE | Gemini Storybooks |
|---------|---------|-------------------|
| **Purpose** | User journaling | Narrative content |
| **User** | Student writes | Platform provides |
| **Mode Dual** | Yes (structured/reflective) | Yes (clinical/wellness) |
| **Integration** | Lesson tool | Course companion |
| **Value** | Personal reflection | Emotional connection |
| **Cost** | Subscription | API per generation |

**Both enhance learning** - TinyMCE for personal expression, Storybooks for guided narrative learning.

---

**Status**: 📋 **PLANNED** - Ready for implementation after Tier 1 courses
**Priority**: Medium-High
**Strategic Value**: HIGH - Addresses "Wikipedia-like" content problem

---

*Created: October 26, 2025*
*Last Updated: October 26, 2025*
