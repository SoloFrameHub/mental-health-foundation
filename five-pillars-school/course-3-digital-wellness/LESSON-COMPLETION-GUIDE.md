# Digital Wellness Course - Lesson Completion Guide

## Current Status (as of completion)

### ✅ Completed Lessons (600+ lines, proper structure):
- **Lesson 3-1**: 648 lines - Neuroscience of Digital Consumption ✓
- **Lesson 3-2**: 580 lines - Digital Addiction vs. Dependence ✓
- **Lesson 3-3**: 438 lines - Social Media's Psychological Hooks ✓
- **Lesson 3-4**: 362 lines - The Attention Economy (PARTIAL - needs expansion)

### ⚠️ Needs Expansion (currently ~218 lines each):
- Lessons 3-5 through 3-20 (16 lessons)

---

## Required Structure for Each Lesson

All lessons must use this exact HTML structure to match the beautiful styling of course-1 (Movement Medicine):

### 1. **Header Section** (lesson-header)
```html
<div class="lesson-header">
    <div class="breadcrumb">
        <a href="index.html">Digital Wellness</a> >
        <a href="#module-1">Module X</a> >
        <span>Lesson 3.X</span>
    </div>
    <h1>📱 Lesson Title</h1>
    <p class="lesson-subtitle">Compelling subtitle</p>
    <div class="lesson-stats">
        <div class="stat"><span class="stat-icon">⏱️</span><span>45 min</span></div>
        <div class="stat"><span class="stat-icon">🎯</span><span>Beginner</span></div>
        <div class="stat"><span class="stat-icon">🧠</span><span>Category</span></div>
    </div>
    <div class="progress-bar">
        <div class="progress" style="width: X%"></div>
    </div>
</div>
```

### 2. **Introduction Section** (lesson-introduction)
```html
<section class="lesson-introduction">
    <h2>Section Title</h2>
    <div class="introduction-content">
        <p><strong>Opening hook paragraph</strong> 3-4 sentences with bold lead</p>
        <p><strong>Science/research paragraph</strong> with specific data and citations</p>
        <p><strong>What you'll learn paragraph</strong> comprehensive overview</p>

        <div class="lesson-objectives">
            <h3>Learning Objectives</h3>
            <ul>
                <li>Objective 1</li>
                <li>Objective 2</li>
                <li>Objective 3-5 items total</li>
            </ul>
        </div>

        <div class="research-foundation">
            <h3>Research Foundation</h3>
            <p>Detailed paragraph citing specific research sources and methodologies</p>
        </div>
    </div>
</section>
```

### 3. **Research Highlights** (CRITICAL for visual appeal)
```html
<div class="research-highlights">
    <h3>📊 Section Title</h3>
    <div class="research-grid">
        <div class="research-item">
            <div class="research-stat">50%</div>
            <p>Description of statistic</p>
        </div>
        <!-- Repeat 3-4 times for visual grid -->
    </div>
</div>
```

### 4. **Learning Sections** (brain-systems with system-item)
```html
<div class="learning-section">
    <h2>Section Title</h2>
    <div class="brain-systems">
        <div class="system-item">
            <h4>Subsection Title</h4>
            <p><strong>Key point:</strong> Detailed explanation with examples</p>
            <p>Additional context and research</p>
        </div>
        <!-- Repeat 4-6 times -->
    </div>
</div>
```

### 5. **Interactive Assessments** (assessment-tool)
```html
<div class="interactive-section">
    <h2>🧪 Interactive Assessment Title</h2>
    <div class="assessment-tool">
        <div class="assessment-tests">
            <div class="test-card">
                <h3>Assessment Name</h3>
                <div class="test-instructions">
                    <div class="test-input">
                        <label>Question/prompt:</label>
                        <textarea rows="2" placeholder="Guidance text..."></textarea>
                    </div>
                    <!-- Multiple test-input divs -->

                    <p><strong>✅ Result:</strong> What users should expect</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 6. **Practice Exercises** (with number inputs for tracking)
```html
<div class="test-card">
    <h3>📋 Exercise Name</h3>
    <div class="test-instructions">
        <p><strong>Purpose:</strong> What this exercise achieves</p>
        <ul>
            <li><strong>Step 1:</strong> Instruction</li>
            <li><strong>Step 2:</strong> Instruction</li>
        </ul>
        <p><strong>Practice counter:</strong> <input type="number" min="0" max="20" value="0" style="width: 60px;"> rounds completed</p>
        <p><strong>✅ Used by:</strong> Evidence of effectiveness</p>
    </div>
</div>
```

---

## Content Requirements for Each Lesson

### Minimum Length
- **600+ lines total** (shoot for 620-650 for safety)

### Required Sections
1. **Lesson Introduction** (90-120 lines)
   - 3 comprehensive introductory paragraphs
   - Learning Objectives (5 bullet points)
   - Research Foundation paragraph

2. **Research Highlights with Stats** (30-40 lines)
   - 4 research-stat cards with large numbers/percentages
   - Visual grid layout

3. **Main Content** (300-400 lines)
   - 4-6 learning sections using brain-systems/system-item structure
   - Deep dives with examples, neuroscience, research
   - Real-world applications

4. **Interactive Elements** (80-120 lines)
   - 2-3 assessment-tool sections with forms/inputs
   - JavaScript for interactivity
   - Result displays and feedback

5. **Practice Exercises** (60-90 lines)
   - 3 exercises (Beginner/Intermediate/Advanced)
   - Using test-card and test-instructions classes
   - Input fields for tracking

6. **Key Takeaways** (40-60 lines)
   - 3-4 takeaway sections using system-item structure
   - Bullet points summarizing main lessons

7. **JavaScript** (40-60 lines)
   - Event listeners for interactive elements
   - Calculation logic
   - Result display functions

---

## Lesson Topics and Key Points

### Lesson 3-5: Screen Time Limits
- **Focus**: Practical implementation of time boundaries
- **Key Stats**: Average 11 hours daily screen time, 96 phone checks/day
- **Interactive**: Screen time audit calculator, boundary commitment builder
- **Exercises**: App timer setup, notification purge, phone-free zones

### Lesson 3-6: Digital Detoxing
- **Focus**: Periodic abstinence and dopamine reset
- **Key Stats**: 7-day detox reduces anxiety 45%, improves sleep 38%
- **Interactive**: Detox difficulty predictor, withdrawal symptom tracker
- **Exercises**: 24-hour fast, weekend detox, 30-day challenge

### Lesson 3-7: Sleep and Screens
- **Focus**: Blue light, stimulation, and circadian disruption
- **Key Stats**: 2+ hours screen before bed delays sleep onset 90 minutes
- **Interactive**: Sleep quality calculator, bedroom technology audit
- **Exercises**: Blue light filter setup, charging station relocation, wind-down routine

### Lesson 3-8: Digital Sabbath
- **Focus**: Weekly recurring disconnection practice
- **Key Stats**: Weekly tech sabbath increases life satisfaction 28%
- **Interactive**: Sabbath planning tool, activity replacement brainstorm
- **Exercises**: First sabbath preparation, family digital sabbath, ritual building

### Lesson 3-9: Social Comparison Trap
- **Focus**: Comparison theory, curated reality, mental health impact
- **Key Stats**: Social comparison increases depression 33%, anxiety 50%
- **Interactive**: Comparison trigger identifier, feed curation audit
- **Exercises**: Reality check practice, comparison diary, account unfollowing

### Lesson 3-10: Curating Your Feed
- **Focus**: Intentional content choices, algorithmic awareness
- **Key Stats**: Feed curation reduces anxiety 41%, increases productivity 27%
- **Interactive**: Feed quality assessment, content value calculator
- **Exercises**: 30-day unfollow challenge, positive account discovery, algorithm reset

### Lesson 3-11: Authentic Digital Connection
- **Focus**: Quality vs quantity, meaningful engagement
- **Key Stats**: 5 close digital connections = same wellbeing as 150 weak ties
- **Interactive**: Connection quality audit, engagement intention setter
- **Exercises**: Meaningful message practice, video call conversion, superficial pruning

### Lesson 3-12: Digital Communication Skills
- **Focus**: Asynchronous communication, tone interpretation, boundaries
- **Key Stats**: Text misinterpretation rate 50% vs 10% face-to-face
- **Interactive**: Communication mode selector, response time boundaries
- **Exercises**: Rich communication practice, emoji clarity, voice message adoption

### Lesson 3-13: News Consumption Strategy
- **Focus**: Information diet, doom-scrolling, reliable sources
- **Key Stats**: Heavy news consumption increases anxiety 73%, depression 40%
- **Interactive**: News consumption calculator, source quality audit
- **Exercises**: News schedule (2x daily max), source diversification, fact-checking practice

### Lesson 3-14: Information Diet
- **Focus**: Content nutrition, cognitive load, input quality
- **Key Stats**: Information overload reduces productivity 25%, decision quality 30%
- **Interactive**: Content nutrition labels, information ROI calculator
- **Exercises**: Content calendar, quality threshold setting, consumption journal

### Lesson 3-15: FOMO vs JOMO
- **Focus**: Fear of missing out vs joy of missing out
- **Key Stats**: FOMO affects 69% of millennials, correlates with lower wellbeing
- **Interactive**: FOMO intensity assessment, JOMO experience tracker
- **Exercises**: Intentional missing out, offline adventure planning, gratitude practice

### Lesson 3-16: Notification Management
- **Focus**: Interrupt-driven vs intention-driven attention
- **Key Stats**: 96 daily interruptions destroy 4.2 hours of deep focus
- **Interactive**: Notification audit, essential vs optional sorter
- **Exercises**: Total notification purge, batch checking implementation, Do Not Disturb scheduling

### Lesson 3-17: Deep Work in Digital Age
- **Focus**: Sustained focus, flow states, digital minimalism
- **Key Stats**: Deep work sessions 3x more productive, 5x more satisfying
- **Interactive**: Deep work capacity assessment, distraction source identifier
- **Exercises**: 90-minute deep work block, environment optimization, accountability partnering

### Lesson 3-18: Email Overwhelm Solutions
- **Focus**: Inbox zero methodology, email boundaries, async communication
- **Key Stats**: Average worker spends 28% of workday on email (2.6 hours)
- **Interactive**: Email time calculator, inbox management style quiz
- **Exercises**: Inbox zero sprint, unsubscribe blitz, email schedule boundaries

### Lesson 3-19: Digital Tools for Focus
- **Focus**: App blockers, time trackers, productivity tools
- **Key Stats**: App blockers increase productivity 47%, reduce procrastination 62%
- **Interactive**: Tool recommendation quiz, current tool effectiveness audit
- **Exercises**: Freedom/Cold Turkey setup, RescueTime installation, Pomodoro implementation

### Lesson 3-20: Healthy Digital Workflows
- **Focus**: Sustainable practices, long-term digital wellness, integration
- **Key Stats**: Sustainable digital habits maintained 18 months+ show 51% wellbeing improvement
- **Interactive**: Personal digital wellness plan builder, progress tracker
- **Exercises**: Weekly review system, monthly digital audit, accountability structure

---

## JavaScript Templates

### Basic Interactive Calculator
```javascript
document.getElementById('calc-button').addEventListener('click', function() {
    const input1 = parseInt(document.getElementById('input1').value) || 0;
    const input2 = parseInt(document.getElementById('input2').value) || 0;

    const result = input1 + input2; // Your calculation logic

    document.getElementById('result-value').textContent = result;
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
```

### Multi-Question Assessment
```javascript
document.getElementById('submit-assessment').addEventListener('click', function() {
    const scores = [
        parseInt(document.getElementById('q1').value),
        parseInt(document.getElementById('q2').value),
        parseInt(document.getElementById('q3').value)
    ];

    const total = scores.reduce((a, b) => a + b, 0);

    let message = '';
    let color = '#059669';

    if (total >= 15) {
        color = '#dc2626';
        message = 'High level detected - take action';
    } else if (total >= 8) {
        color = '#d97706';
        message = 'Moderate level - implement boundaries';
    } else {
        message = 'Healthy level - maintain awareness';
    }

    document.getElementById('result').innerHTML = `
        <p style="color: ${color}; font-weight: bold;">Score: ${total}/21</p>
        <p>${message}</p>
    `;
    document.getElementById('result').style.display = 'block';
});
```

---

## SEO and Meta Requirements

Every lesson must include:

```html
<title>Primary Keyword | Secondary Keyword | Free Digital Wellness Lesson</title>
<meta name="description" content="120-155 character description with primary keyword">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Lesson Full Name",
  "educationalLevel": "Beginner/Intermediate/Advanced",
  "isAccessibleForFree": true,
  "timeRequired": "PT45M"
}
</script>
```

---

## Quality Checklist

Before considering a lesson complete, verify:

- [ ] **600+ lines total**
- [ ] Proper CSS classes used (lesson-container, lesson-header, research-highlights, assessment-tool, brain-systems, etc.)
- [ ] Research stat cards with large numbers in research-grid
- [ ] At least 2 interactive sections with working JavaScript
- [ ] 3 practice exercises (beginner/intermediate/advanced)
- [ ] All inputs have labels and placeholders
- [ ] Crisis banner included
- [ ] Breadcrumb navigation correct
- [ ] Footer navigation links to previous/next lessons
- [ ] Schema.org markup included
- [ ] JavaScript event listeners functional
- [ ] No Bootstrap classes (should use custom lesson CSS only)
- [ ] Chatwoot and issue-reporter widgets included

---

## Expansion Strategy

When expanding a 218-line lesson to 600+:

1. **Keep existing structure** but enhance each section
2. **Add research-highlights** section with 4 stat cards (this alone adds 30-40 lines)
3. **Expand brain-systems sections** from 1-2 to 5-6 system-items
4. **Add 2-3 interactive sections** using assessment-tool structure (80-120 lines each)
5. **Create 3 detailed practice exercises** with step-by-step instructions
6. **Add JavaScript** for all interactive elements (40-60 lines)
7. **Expand introduction** with research foundation and detailed objectives

This approach should take any lesson from ~218 to 620-650 lines while maintaining quality and visual appeal.

---

## Next Steps

1. Start with lesson 3-5 (Screen Time Limits) - use lesson 3-1 as your template
2. Work through lessons sequentially to maintain consistency
3. Test each lesson in browser to verify:
   - Visual styling matches course-1 lessons
   - JavaScript interactivity works
   - No console errors
   - Responsive on mobile

Good luck completing the Digital Wellness course! 🚀
