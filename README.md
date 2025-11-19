# Mental Health Education Platform - Five Pillars School

A HIPAA-compliant mental health education platform built with Next.js, Firebase, and Vertex AI. This platform provides personalized, interactive courses for mental health education and wellness.

## Project Overview

The Five Pillars School platform offers 19 evidence-based courses covering:
- **Physical Vitality**: Movement, nutrition, sleep, and body wellness
- **Mental Clarity & Nourishment**: Cognitive wellness and nutritional foundations
- **Challenge & Growth**: Resilience, boundaries, and personal development
- **Social Connection**: Relationships, community, and belonging
- **Purpose & Responsibility**: Meaning, service, and contribution
- **Integrated Wellness**: Cross-pillar holistic approaches

## Architecture

### Frontend
- **Learner App** (`apps/learner`): Next.js app with Cruip Mosaic components for the learner experience
- **Marketing App** (`apps/marketing`): Next.js app with Cruip Fintech components for marketing/platform pages

### Backend
- **Cloud Functions** (`apps/functions`): Vertex AI-powered serverless functions for:
  - Chat (context-aware Q&A)
  - Assessments (adaptive questioning)
  - Personalization (content customization)
  - Image Generation (exercise demonstrations)
  - Storybook (course narratives)

### Infrastructure
- **Firebase**: Authentication, Firestore, Hosting, Cloud Functions
- **Vertex AI**: HIPAA-compliant AI features (Gemini models, Imagen)
- **Firestore**: User profiles, progress tracking, assessments

## Getting Started

### Prerequisites

- Node.js 20+ and npm 10+
- Firebase CLI: `npm install -g firebase-tools`
- Google Cloud account with Vertex AI API enabled
- Firebase project: `mental-health-education`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mh-licensing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   ```bash
   firebase login
   firebase use mental-health-education
   ```

4. **Configure environment variables**
   ```bash
   # Create .env.local files in each app directory
   # See .env.example files for required variables
   ```

5. **Start development servers**
   ```bash
   # Start all apps
   npm run dev

   # Or start individually
   npm run dev:learner    # Learner app on http://localhost:3000
   npm run dev:marketing  # Marketing app on http://localhost:3001
   ```

6. **Start Firebase emulators** (in separate terminal)
   ```bash
   npm run firebase:emulators
   ```

## Project Structure

```
mh-licensing/
├── apps/
│   ├── learner/          # Next.js learner experience app (Mosaic)
│   ├── marketing/        # Next.js marketing app (Fintech)
│   └── functions/        # Cloud Functions (Vertex AI)
├── packages/
│   ├── shared/           # Shared TypeScript types and utilities
│   └── ui/               # Shared UI components
├── courses/              # Course content (HTML/MDX)
│   └── course-1-movement-medicine/
├── licensees/            # Licensee-specific configurations
│   └── real-psychiatric-services/
│       ├── personas.json
│       └── provider-voice.json
├── _templates/           # Template source files
│   ├── cruip/           # Cruip templates (Mosaic, Fintech)
│   └── _bootstrap_templates/  # Bootstrap templates (backup)
├── firebase.json         # Firebase configuration
├── package.json          # Root package.json (workspaces)
└── README.md            # This file
```

## Development Workflow

### Local Development

1. **Start Firebase emulators**
   ```bash
   npm run firebase:emulators
   ```

2. **Start Next.js apps**
   ```bash
   npm run dev:learner
   npm run dev:marketing
   ```

3. **Test Cloud Functions locally**
   ```bash
   cd apps/functions
   npm run serve
   ```

### Building for Production

```bash
# Build all apps
npm run build

# Build individual apps
npm run build:learner
npm run build:marketing
```

### Deployment

```bash
# Deploy everything
npm run firebase:deploy

# Deploy specific services
npm run firebase:deploy:functions
npm run firebase:deploy:hosting
```

## Key Features

### Personalization
- User personas (Maria, Jake, David P.)
- Licensee-specific provider voice
- Adaptive content based on user profile

### Interactivity
- Interactive calculators and trackers
- Real-time assessments
- Progress tracking
- Workbook/journal features

### AI-Powered
- Context-aware chat with lesson content
- Personalized responses based on user profile
- Exercise demonstration image generation
- Adaptive assessments

### HIPAA Compliance
- Vertex AI with Google Cloud BAA
- Secure data storage in Firestore
- Local storage for sensitive workbooks
- Crisis detection and response

## Licensee Configuration

Each provider office can customize:
- **Personas**: Patient profiles for personalization
- **Provider Voice**: AI voice guidelines
- **Branding**: Custom themes and styling

See `licensees/real-psychiatric-services/` for example configuration.

## Documentation

- **Project Plan**: See `PROJECT-PLAN.md` for detailed development roadmap
- **Quick Start**: See `QUICK-START.md` for immediate next steps
- **Full Context**: See `PROJECT-CONTINUATION-PROMPT.md` for complete project context
- **Course Catalog**: See `five-pillars-school/_course-catalog.json` for course metadata

## Contributing

This is a private project. For questions or issues, contact the project maintainer.

## License

UNLICENSED - Private project

---

**Last Updated**: January 2025

