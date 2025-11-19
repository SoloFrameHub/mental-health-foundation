const fs = require('fs');
const path = require('path');

// Course metadata with lesson information
const coursesData = {
  'course-1-movement-medicine': {
    num: 1,
    title: 'Movement Medicine: Exercise as Mental Health Treatment',
    subtitle: 'Evidence-based exercise protocols to treat depression, anxiety, and trauma through movement',
    price: 89,
    pillar: 'Physical Vitality & Movement',
    category: 'Physical Movement & Body',
    image: 'Course 1 - Movement Medicine.jpg',
    firstLesson: 'lesson-1-1-the-science-of-exercise-as-medicine.html',
    lessonTitles: [
      'The Neuroscience of Exercise & Mental Health',
      'Depression and the Movement Prescription',
      'Anxiety Disorders and Movement Therapy',
      'PTSD and Trauma-Informed Movement',
      'ADHD and Movement-Based Focus Enhancement',
      'Building Your Personal Movement Assessment',
      'The Neuroscience of Movement and Mood',
      'Cardio for Mental Clarity and Emotional Regulation',
      'Strength Training for Self-Esteem and Resilience',
      'Yoga and Mindful Movement for Mental Health',
      'High-Intensity Interval Training (HIIT) for Mental Toughness',
      'Team Sports and Social Connection Through Movement',
      'Individual Sport Psychology and Personal Growth',
      'Dance and Creative Movement Therapy',
      'Outdoor Exercise and Nature\'s Mental Health Benefits',
      'Creating Sustainable Exercise Habits',
      'Exercise for Sleep and Circadian Rhythm Optimization',
      'Nutrition and Exercise Synergy for Mental Health',
      'Technology and Exercise Tracking for Mental Health',
      'Building Your Personal Movement Medicine Plan'
    ]
  },
  'course-5-cbt-fundamentals': {
    num: 5,
    title: 'CBT Fundamentals: Rewiring Thought Patterns',
    subtitle: 'Master cognitive behavioral therapy techniques to transform your mental health',
    price: 119,
    pillar: 'Challenge & Growth Through Adversity',
    category: 'Cognitive & Psychological Skills',
    image: 'Course 5 - CBT Fundamentals.jpg',
    firstLesson: 'lesson-5-1-cognitive-triangle-thoughts-feelings-behaviors.html',
    lessonTitles: [
      'The Cognitive Triangle: Thoughts, Feelings, and Behaviors',
      'Identifying Automatic Thoughts',
      'Cognitive Distortions: The Dirty Dozen',
      'Thought Records: Documenting Your Mental Patterns',
      'Cognitive Restructuring Techniques',
      'Behavioral Activation for Depression',
      'Exposure Hierarchy for Anxiety',
      'Problem-Solving Therapy',
      'Assertiveness and Communication Skills',
      'Relaxation and Stress Management Techniques',
      'Mindfulness in CBT Practice',
      'Core Beliefs and Schema Work',
      'Intermediate Beliefs and Assumptions',
      'Behavioral Experiments',
      'Activity Scheduling and Pleasure Prediction',
      'Relapse Prevention Planning',
      'CBT for Specific Disorders',
      'Self-Compassion in Cognitive Work',
      'Integration and Maintenance',
      'Building Your Personal CBT Practice'
    ]
  },
  'course-6-stress-challenge-navigation': {
    num: 6,
    title: 'Stress & Challenge Navigation',
    subtitle: 'Master your window of tolerance and thrive under pressure with science-backed strategies',
    price: 79,
    pillar: 'Challenge & Growth Through Adversity',
    category: 'Cognitive & Psychological Skills',
    image: 'Course 6 - Stress & Challenge Navigation.jpg',
    firstLesson: 'lesson-6-1-window-tolerance-understanding-your-zone.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Stress & Challenge Lesson ${i + 1}`)
  },
  'course-7-boundaries-bootcamp': {
    num: 7,
    title: 'Boundaries Bootcamp: Protecting Your Peace',
    subtitle: 'Learn to set and maintain healthy boundaries in all areas of your life',
    price: 89,
    pillar: 'Challenge & Growth Through Adversity',
    category: 'Boundaries & Self-Protection',
    image: 'Course 7 - Boundaries Bootcamp.jpg',
    firstLesson: 'lesson-7-1-boundaries-mental-health-foundation.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Boundaries Lesson ${i + 1}`)
  },
  'course-8-social-circle-mastery': {
    num: 8,
    title: 'Social Circle Mastery: Building Meaningful Connections',
    subtitle: 'Create and nurture authentic relationships that support your mental health',
    price: 89,
    pillar: 'Social Connection & Community',
    category: 'Social Connection & Community',
    image: 'Course 8 - Social Circle Mastery.jpg',
    firstLesson: 'lesson-8-1-social-connection-mental-health-foundation.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Social Connection Lesson ${i + 1}`)
  },
  'course-9-team-sports-mental-health': {
    num: 9,
    title: 'Team Sports & Mental Health',
    subtitle: 'Harness the therapeutic power of collective movement and team connection',
    price: 89,
    pillar: 'Physical Vitality & Movement',
    category: 'Physical Movement & Body',
    image: 'Course 9 - Team Sports & Mental Health.jpg',
    firstLesson: 'lesson-9-1-team-sports-mental-health-connection.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Team Sports Lesson ${i + 1}`)
  },
  'course-10-relationship-dynamics': {
    num: 10,
    title: 'Relationship Dynamics: Building Healthy Connections',
    subtitle: 'Understand attachment, communication, and creating secure relationships',
    price: 89,
    pillar: 'Social Connection & Community',
    category: 'Social Connection & Community',
    image: 'Course 10 - Relationship Dynamics.jpg',
    firstLesson: 'lesson-10-1-attachment-theory-relationship-foundations.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Relationship Lesson ${i + 1}`)
  },
  'course-11-family-parenting-mental-health': {
    num: 11,
    title: 'Family & Parenting Mental Health',
    subtitle: 'Break generational patterns and raise emotionally healthy children',
    price: 79,
    pillar: 'Social Connection & Community',
    category: 'Family & Generational Health',
    image: 'Course 11 - Family & Parenting Mental Health.jpg',
    firstLesson: 'lesson-11-1-parenting-mental-health-foundation.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Family & Parenting Lesson ${i + 1}`)
  },
  'course-12-purpose-and-responsibility': {
    num: 12,
    title: 'Purpose & Responsibility: Creating Meaning Through Service',
    subtitle: 'Discover meaning and combat existential anxiety through contribution',
    price: 99,
    pillar: 'Purpose Through Responsibility',
    category: 'Purpose & Leadership',
    image: 'Course 12 - Purpose & Responsibility.jpg',
    firstLesson: 'lesson-12-1-logotherapy-meaning-centered-approach.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Purpose Lesson ${i + 1}`)
  },
  'course-13-mental-health-first-aid': {
    num: 13,
    title: 'Mental Health First Aid & Community Support',
    subtitle: 'Learn to recognize crisis and provide life-saving support to others',
    price: 149,
    pillar: 'Purpose Through Responsibility',
    category: 'Social Connection & Community',
    image: 'Course 13 - Mental Health First Aid.jpg',
    firstLesson: 'lesson-13-1-mental-health-first-aid-foundations.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `First Aid Lesson ${i + 1}`)
  },
  'course-14-coaching-mentoring': {
    num: 14,
    title: 'Coaching & Mentoring Others',
    subtitle: 'Develop skills to guide and empower others on their mental health journey',
    price: 149,
    pillar: 'Purpose Through Responsibility',
    category: 'Purpose & Leadership',
    image: 'Course 14 - Coaching & Mentoring Others.jpg',
    firstLesson: 'lesson-14-1-coaching-foundations-helping-relationship.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Coaching Lesson ${i + 1}`)
  },
  'course-15-legacy-building': {
    num: 15,
    title: 'Legacy Building & Wisdom Sharing',
    subtitle: 'Create lasting impact through generativity and wisdom transmission',
    price: 129,
    pillar: 'Purpose Through Responsibility',
    category: 'Family & Generational Health',
    image: 'Course 15 - Legacy Building & Wisdom Sharing.jpg',
    firstLesson: 'lesson-15-1-generativity-legacy-eriksons-framework.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Legacy Lesson ${i + 1}`)
  },
  'course-16-recreational-therapy': {
    num: 16,
    title: 'Recreational Therapy: Rediscovering Joy & Play',
    subtitle: 'Reclaim play, spontaneity, and joy as essential mental health practices',
    price: 79,
    pillar: 'Recreational Joy & Play',
    category: 'Creative & Recreational Healing',
    image: 'Course 16 - Recreational Therapy.jpg',
    firstLesson: 'lesson-16-1-play-therapy-adults-rediscovering-joy.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Recreation Lesson ${i + 1}`)
  },
  'course-17-creative-expression': {
    num: 17,
    title: 'Creative Expression & Art Therapy',
    subtitle: 'Use creativity to process emotions, heal trauma, and express what words cannot',
    price: 89,
    pillar: 'Recreational Joy & Play',
    category: 'Creative & Recreational Healing',
    image: 'Course 17 - Creative Expression & Art Therapy.jpg',
    firstLesson: 'lesson-17-1-art-therapy-foundations-creative-healing.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Art Therapy Lesson ${i + 1}`)
  },
  'course-18-adventure-outdoor-mental-health': {
    num: 18,
    title: 'Adventure & Outdoor Mental Health',
    subtitle: 'Harness the healing power of nature and wilderness for mental wellness',
    price: 99,
    pillar: 'Recreational Joy & Play',
    category: 'Creative & Recreational Healing',
    image: 'Course 18 - Adventure & Outdoor Mental Health.jpg',
    firstLesson: 'lesson-18-1-nature-therapy-wilderness-mental-health.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Adventure Lesson ${i + 1}`)
  },
  'course-19-music-movement-wellness': {
    num: 19,
    title: 'Music & Movement for Wellness',
    subtitle: 'Use rhythm, sound, and dance as therapeutic tools for nervous system regulation',
    price: 79,
    pillar: 'Recreational Joy & Play',
    category: 'Physical Movement & Body',
    image: 'Course 19 - Music & Movement for Wellness.jpg',
    firstLesson: 'lesson-19-1-neuroscience-music-mental-health.html',
    lessonTitles: Array.from({length: 20}, (_, i) => `Music & Movement Lesson ${i + 1}`)
  }
};

// Read the Course 4 template
const course4Template = fs.readFileSync('/Volumes/ext-data/github/mental-health-education-platform/github-deployment/course-4-growth-mindset/index.html', 'utf8');

// Process each course
Object.keys(coursesData).forEach(courseDir => {
  const course = coursesData[courseDir];
  const coursePath = `/Volumes/ext-data/github/mental-health-education-platform/github-deployment/${courseDir}/index.html`;

  // Check if course exists
  if (!fs.existsSync(coursePath)) {
    console.log(`⚠ Skipping ${courseDir} - file not found`);
    return;
  }

  // Generate lesson list HTML
  const lessonListHTML = course.lessonTitles.map((title, idx) => {
    const lessonNum = idx + 1;
    if (lessonNum === 1) {
      return `        <div class="mb-3">
            <a href="${course.firstLesson}" class="h5 text-decoration-none">
                Lesson ${lessonNum}: ${title} <span class="text-primary">- visit</span>
            </a>
        </div>`;
    } else {
      return `        <div class="mb-2">Lesson ${lessonNum}: ${title}</div>`;
    }
  }).join('\n');

  let html = course4Template;

  // Replace course-specific content
  html = html.replace(/Course 4 - The Growth Mindset\.jpg/g, course.image);
  html = html.replace(/The Growth Mindset: Thriving Through Challenge/g, course.title);
  html = html.replace(/The Growth Mindset/g, course.title.split(':')[0].trim());
  html = html.replace(/Challenge & Growth Through Adversity/g, course.pillar);
  html = html.replace(/Cognitive & Psychological Skills/g, course.category);
  html = html.replace(/\$29/g, `$29`);  // Keep promotional pricing
  html = html.replace(/\$99/g, `$${course.price}`);
  html = html.replace(/lesson-9-1-neuroscience-mindset-plasticity\.html/g, course.firstLesson);

  // Replace subtitle
  html = html.replace(/The belief that abilities can be developed through dedication and hard work—the growth mindset—fundamentally transforms how individuals approach challenges, setbacks, and opportunities for learning throughout life\./g, course.subtitle);

  // Update meta description
  html = html.replace(/<meta name="description" content="[^"]*">/g, `<meta name="description" content="${course.subtitle}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${course.subtitle}">`);

  // Update schema.org course name
  html = html.replace(/"name": "The Growth Mindset: Thriving Through Challenge"/g, `"name": "${course.title}"`);
  html = html.replace(/"description": "Transform your approach to challenges[^"]*"/g, `"description": "${course.subtitle}"`);

  // Update course URL in meta
  html = html.replace(/digital-wellness\.realpsychiatricservices\.com\/course-4-growth-mindset\//g, `digital-wellness.realpsychiatricservices.com/${courseDir}/`);

  // Update breadcrumb
  html = html.replace(/<li class="breadcrumb-item active">The Growth Mindset<\/li>/g, `<li class="breadcrumb-item active">${course.title.split(':')[0].trim()}</li>`);

  // Write the updated file
  fs.writeFileSync(coursePath, html);
  console.log(`✓ Updated ${courseDir}`);
});

console.log('\n✅ All course landing pages updated successfully!');
