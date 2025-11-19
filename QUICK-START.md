# Quick Start Guide - Five Pillars School Project

## Current Status

✅ **Completed:**
- 19 courses with basic HTML structure
- Cruip templates available (Mosaic + Fintech)
- Bootstrap templates as backup
- Vertex AI SDK installed
- Licensee configuration structure started

❌ **To Do:**
- Clean project structure setup
- Template integration
- Vertex AI Cloud Functions
- Frontend apps (Next.js)
- Content rewrite (especially Course 1)

## Immediate Next Steps

### 1. Project Structure (Day 1)
```bash
# Create root package.json
npm init -y

# Install workspace dependencies
npm install -D typescript @types/node

# Create directory structure
mkdir -p apps/{learner,marketing,functions}
mkdir -p packages/{shared,ui}
mkdir -p courses
```

### 2. Firebase Setup (Day 1-2)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init

# Enable APIs in Google Cloud Console:
# - Vertex AI API
# - Cloud Functions API
# - Firestore API
# - Firebase Authentication
```

### 3. Template Integration (Day 2-3)
```bash
# Copy Cruip Mosaic to learner app
cp -r _templates/cruip/mosaic/mosaic-next/* apps/learner/

# Copy Cruip Fintech to marketing app
cp -r _templates/cruip/fintech/fintech-next/* apps/marketing/

# Install dependencies
cd apps/learner && npm install
cd ../marketing && npm install
```

### 4. Vertex AI Functions (Day 3-4)
```bash
cd apps/functions
npm init -y
npm install firebase-functions@latest firebase-admin
npm install @google-cloud/vertexai

# Create src/chat.ts with basic Vertex AI integration
```

### 5. Licensee Configuration (Day 4-5)
```bash
# Create personas.json
# Create provider-voice.json
# Test configuration loading in functions
```

## Key Decisions Needed

1. **Project Structure**: Monorepo (Turborepo/Nx) or single project?
2. **Content Format**: MDX, HTML, or hybrid?
3. **Deployment**: Single Firebase project or separate staging/production?

## Quick Reference

### Template Locations
- **Mosaic (Learner)**: `_templates/cruip/mosaic/mosaic-next/`
- **Fintech (Marketing)**: `_templates/cruip/fintech/fintech-next/`
- **Bootstrap (Backup)**: `_templates/_bootstrap_templates/`

### Key Files
- **Project Plan**: `PROJECT-PLAN.md`
- **Full Context**: `PROJECT-CONTINUATION-PROMPT.md`
- **Course Catalog**: `five-pillars-school/_course-catalog.json`
- **Licensee Config**: `licensees/real-psychiatric-services/`

### Firebase Project
- **Project ID**: `mental-health-education`
- **Account**: `aistartuplaunch@gmail.com`
- **Region**: `us-central1` (for Vertex AI)

### Vertex AI Models
- **Chat/Assessments**: `gemini-2.5-flash`
- **Personalization**: `gemini-2.5-pro`
- **Images**: `imagen-3.0-generate-002`

## Development Workflow

1. **Local Development**
   ```bash
   # Start Firebase emulators
   firebase emulators:start
   
   # Start Next.js apps
   cd apps/learner && npm run dev
   cd apps/marketing && npm run dev
   ```

2. **Testing Functions**
   ```bash
   # Test locally with emulators
   firebase emulators:start --only functions
   
   # Deploy to staging
   firebase deploy --only functions --project staging
   ```

3. **Content Development**
   - Edit lessons in `courses/` directory
   - Use lesson template structure
   - Test interactivity locally

## Priority Order

1. **Week 1**: Project setup, template integration, Firebase config
2. **Week 2**: Vertex AI chat function, basic frontend routing
3. **Week 3**: Lesson viewer, chat widget integration
4. **Week 4+**: Content rewrite (Course 1 first)

## Getting Help

- **Full Project Plan**: See `PROJECT-PLAN.md`
- **Context & Strategy**: See `PROJECT-CONTINUATION-PROMPT.md`
- **Course Structure**: See `five-pillars-school/_course-catalog.json`

---

**Last Updated**: January 2025

