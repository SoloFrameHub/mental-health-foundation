# Course Introduction Page - Implementation Guide

## Purpose

The **Course Introduction & Orientation** page serves as the bridge between enrollment and learning. Students see this page ONCE immediately after enrolling, before accessing Module 1.

## User Flow

```
Public Homepage → Enroll → Course Introduction (this page) → Module 1 Lesson 1
```

## What Gets Customized Per Course

### 1. Replace Placeholders

**In `course-introduction-template.html`, find and replace:**

```
[COURSE NAME] → Actual course title (e.g., "Anxiety Toolkit")
[GAMMA_PRESENTATION_URL] → Gamma welcome presentation embed URL
[TYPEBOT_NOTEBOOK_TUTORIAL_URL] → Typebot notebook tutorial flow URL
[TYPEBOT_GOAL_SETTING_URL] → Typebot goal-setting flow URL
[FORUM_URL] → Course-specific forum URL
[CONTACT_URL] → Support contact page URL
[MODULE_1_LESSON_1_URL] → First lesson URL
```

### 2. Module List Customization

Update the "Course Map" section (lines ~420-460) with your actual modules:

```html
<div class="list-group-item d-flex align-items-center">
    <div class="badge bg-primary me-3">1</div>
    <div class="flex-grow-1">
        <h6 class="mb-1">Module 1: Understanding Your Anxiety</h6>
        <small class="text-muted">4 lessons • ~45 minutes</small>
    </div>
    <span class="badge bg-light text-dark">Not Started</span>
</div>
```

Repeat for each module in your course (typically 8-10 modules).

### 3. Provider-Specific Content

**Gamma Welcome Presentation** should include:
- Provider photo and introduction
- Course journey overview
- What students will accomplish
- Clinical relevance and benefits
- Support system explanation
- Encouraging "let's begin" message

**Example Gamma Script:**
```
Slide 1: "Welcome to [Course Name]" + Provider photo
Slide 2: "Who Am I?" - Brief provider credentials and why they created this
Slide 3: "Your Journey Ahead" - Visual course overview
Slide 4: "What You'll Gain" - Specific outcomes and skills
Slide 5: "Your Support System" - Tools and resources available
Slide 6: "Let's Begin Together" - Encouragement and next step
```

## Required Typebot Flows

### 1. Notebook Tutorial Flow

**Purpose:** Interactive 2-minute walkthrough of notebook features

**Flow Structure:**
```
Welcome → Feature 1: Reflection Prompts (show example) →
Feature 2: Practice Worksheets (show example) →
Feature 3: Progress Tracking (show example) →
Feature 4: Creative Tools (drawing, rich text) →
Feature 5: Privacy Controls (export, share options) →
"Try it now!" → Link to blank notebook page
```

### 2. Goal Setting Flow

**Purpose:** Personalize course experience and set intentions

**Sample Questions:**
```
1. "What brings you to this course today?" (open text)
2. "What's your biggest challenge right now?" (multiple choice with open "other")
3. "How would you like to feel after completing this course?" (open text)
4. "On a scale of 1-10, how committed are you to making changes?" (slider)
5. "What's one specific goal you have for this course?" (open text)
```

**Result:** Responses saved to student's notebook as "My Course Intentions"

## Integration with Platform

### Database Fields Needed

```javascript
{
  courseId: string,
  studentId: string,
  orientationCompleted: boolean,
  orientationDate: timestamp,
  courseGoals: {
    bringsYouHere: string,
    biggestChallenge: string,
    desiredFeeling: string,
    commitmentLevel: number,
    specificGoal: string
  },
  notebookTutorialCompleted: boolean
}
```

### Navigation Logic

```javascript
// When student clicks "Start Course" from dashboard:
if (!student.orientationCompleted) {
  redirect('/courses/{courseId}/introduction');
} else {
  redirect('/courses/{courseId}/module/1/lesson/1');
}
```

### Tracking Events

```javascript
// Analytics events to track:
- 'orientation_viewed'
- 'gamma_welcome_watched'
- 'notebook_tutorial_completed'
- 'goals_set'
- 'module_1_started'
```

## Testing Checklist

- [ ] All placeholder URLs replaced with actual URLs
- [ ] Gamma presentation loads and plays correctly
- [ ] Notebook tutorial Typebot flow works end-to-end
- [ ] Goal setting Typebot flow saves responses to notebook
- [ ] Module list shows correct number of modules for course
- [ ] "Start Module 1" button links to correct first lesson
- [ ] Crisis support widget displays and links work (988, 741741)
- [ ] Mobile responsive design works on phones/tablets
- [ ] All navigation links work (dashboard, forums, support)
- [ ] Page tracks orientation completion in localStorage
- [ ] First-time users see this page; returning users skip to lessons

## Maintenance Notes

### When to Update

**Update this page when:**
- Adding/removing modules from course
- Changing course structure or duration
- Updating support resources
- Modifying notebook features
- Provider changes or new providers added

### Version Control

Keep this template versioned separately from individual course implementations:

```
/templates/
  course-introduction-template.html (master template)

/courses/
  anxiety-toolkit/introduction.html (course-specific)
  sleep-mastery/introduction.html (course-specific)
  cbt-fundamentals/introduction.html (course-specific)
```

## Best Practices

1. **Keep it brief** - 2-3 minutes max for orientation
2. **Prioritize notebook tutorial** - This is the most important differentiator
3. **Set expectations clearly** - Module structure, time commitment, support
4. **Create excitement** - Balance information with encouragement
5. **Make crisis support visible** - Always accessible widget
6. **Test thoroughly** - First impression matters!

## Next Steps After Creating This Page

1. Create corresponding Gamma welcome presentation
2. Build Typebot notebook tutorial flow
3. Build Typebot goal-setting flow
4. Test complete user journey from enrollment → orientation → Module 1
5. Gather feedback from 3-5 beta users
6. Refine based on feedback before full launch

---

**Questions or Issues?**
Document in project knowledge for future reference and continuous improvement.
