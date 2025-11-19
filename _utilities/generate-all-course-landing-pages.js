const fs = require('fs');
const path = require('path');

const courses = [
  {
    num: 1,
    slug: 'movement-medicine',
    title: 'Movement Medicine: Exercise as Mental Health Treatment',
    subtitle: 'Physical Vitality & Movement',
    price: 89,
    instructor: 'David Glenn, PMHNP-BC',
    description: 'Exercise is among the most powerful yet underutilized interventions for mental health, with research demonstrating effectiveness comparable to medication for depression and anxiety while providing additional benefits for cognitive function, sleep, and overall wellbeing.',
    descriptionFull: [
      'Regular physical activity produces measurable changes in brain structure and chemistry that directly support mental health. Exercise increases production of brain-derived neurotrophic factor (BDNF), promotes neurogenesis in the hippocampus, reduces inflammation, and modulates neurotransmitter systems including serotonin, dopamine, and endorphins. These neurobiological changes translate to reduced symptoms of depression and anxiety, improved mood regulation, enhanced cognitive function, and greater stress resilience.',
      'This comprehensive 20-lesson course provides evidence-based guidance for using movement as mental health medicine. You\'ll learn the neuroscience of exercise and mental health, develop personalized movement protocols for different mental health conditions, and build sustainable exercise habits that support long-term wellbeing.'
    ],
    whoFor: [
      'Individuals with depression, anxiety, or other mental health conditions seeking evidence-based self-care strategies',
      'Anyone wanting to understand the neuroscience of exercise and mental health',
      'People struggling to maintain consistent exercise habits',
      'Those recovering from burnout or seeking stress management tools'
    ],
    whatToExpect: [
      'Understand the neuroscience of exercise and brain health',
      'Learn movement protocols for depression, anxiety, and stress',
      'Develop personalized exercise routines for mental health goals',
      'Build sustainable movement habits and overcome barriers'
    ],
    evidence: [
      'Meta-analyses showing exercise effectiveness comparable to medication for depression',
      'Neuroscience research on BDNF, neurogenesis, and exercise',
      'Studies on exercise for anxiety, PTSD, and mood disorders',
      'Research on movement types and mental health outcomes'
    ],
    faqs: [
      {
        q: 'How much exercise do I need for mental health benefits?',
        a: 'Research shows benefits from as little as 20-30 minutes of moderate activity 3-4 times weekly, though more may provide additional benefits. The key is consistency rather than intensity—regular moderate exercise often produces better mental health outcomes than sporadic intense workouts.'
      },
      {
        q: 'What if I hate exercise or have physical limitations?',
        a: 'This course helps you find movement forms that work for your body and preferences. Mental health benefits come from many activity types—walking, dancing, yoga, swimming, or adaptive exercises. The focus is on finding sustainable, enjoyable movement rather than forcing yourself into activities you hate.'
      }
    ]
  },
  {
    num: 2,
    slug: 'workplace-mental-health',
    title: 'Workplace Mental Health: Thriving in Your Career',
    subtitle: 'Physical Vitality & Movement',
    price: 89,
    instructor: 'David Glenn, PMHNP-BC',
    description: 'Workplace stress and burnout have reached epidemic levels, with 77% of employees experiencing burnout at their current job. The cost of workplace mental health issues to businesses exceeds $300 billion annually in lost productivity, yet most individuals lack skills to protect their mental health while advancing their careers.',
    descriptionFull: [
      'The modern workplace creates unique mental health challenges including chronic stress, role ambiguity, interpersonal conflicts, work-life imbalance, and productivity pressure. Research shows that workplace factors contribute significantly to depression, anxiety, substance use, and physical health problems. However, evidence-based strategies can help individuals thrive professionally while maintaining mental wellbeing.',
      'This comprehensive 20-lesson course provides practical tools for workplace mental health management. You\'ll learn to set professional boundaries, manage workplace stress, navigate difficult relationships, and build careers that support rather than undermine mental health.'
    ],
    whoFor: [
      'Professionals experiencing workplace stress, burnout, or career dissatisfaction',
      'Anyone navigating difficult workplace relationships or toxic environments',
      'Individuals seeking work-life balance and sustainable career practices',
      'People transitioning careers or facing workplace challenges'
    ],
    whatToExpect: [
      'Learn evidence-based workplace stress management techniques',
      'Develop professional boundaries and communication skills',
      'Navigate workplace conflicts and difficult relationships',
      'Build sustainable career practices that support mental health'
    ],
    evidence: [
      'Burnout research and workplace mental health statistics',
      'Studies on job demands, control, and mental health outcomes',
      'Research on workplace interventions and stress reduction',
      'Evidence on professional boundaries and wellbeing'
    ],
    faqs: [
      {
        q: 'What if my workplace is genuinely toxic?',
        a: 'This course helps you distinguish between challenging workplaces where boundary-setting can help versus genuinely toxic environments that may require exit strategies. You\'ll learn to assess your situation realistically and make informed decisions about whether to stay and implement changes or plan a healthier transition.'
      },
      {
        q: 'Can I set boundaries without risking my job?',
        a: 'Effective professional boundaries actually improve work quality and relationships. The course teaches you to set limits in ways that demonstrate professionalism and enhance rather than threaten your career. Many workplace "requirements" for constant availability are cultural norms rather than actual job necessities.'
      }
    ]
  },
  {
    num: 18,
    slug: 'adventure-outdoor-mental-health',
    title: 'Adventure & Outdoor Mental Health',
    subtitle: 'Recreational Joy & Play',
    price: 99,
    instructor: 'Autumn Persinger, PMHNP-BC',
    description: 'Nature exposure and adventure activities provide powerful mental health benefits through neurobiological mechanisms, psychological processes, and social connections unavailable in indoor or urban environments.',
    descriptionFull: [
      'Research demonstrates that time in nature reduces cortisol, improves mood, enhances cognitive function, and supports overall mental wellbeing. Adventure therapy combines outdoor experiences with therapeutic processing to create profound psychological breakthroughs. Understanding these mechanisms enables intentional use of outdoor activities for mental health support.',
      'This comprehensive 20-lesson course explores adventure therapy, nature-based interventions, and outdoor mental health practices. You\'ll learn the science behind nature\'s mental health benefits and develop personalized outdoor wellness routines.'
    ],
    whoFor: [
      'Individuals seeking nature-based mental health interventions',
      'Anyone interested in adventure therapy and outdoor wellness',
      'People wanting to deepen their connection with nature',
      'Those looking for alternative mental health approaches'
    ],
    whatToExpect: [
      'Understand the neuroscience of nature and mental health',
      'Learn adventure therapy principles and applications',
      'Develop outdoor mindfulness and movement practices',
      'Create personalized nature-based wellness routines'
    ],
    evidence: [
      'Research on nature exposure and mental health outcomes',
      'Adventure therapy effectiveness studies',
      'Neuroscience of outdoor environments and brain function',
      'Studies on specific outdoor activities and wellbeing'
    ],
    faqs: [
      {
        q: 'What if I don\'t have access to wilderness areas?',
        a: 'Mental health benefits come from various natural settings including urban parks, gardens, and even indoor nature elements. This course teaches you to maximize benefits from whatever nature access you have while also exploring ways to increase outdoor time.'
      },
      {
        q: 'Do I need outdoor skills or physical fitness?',
        a: 'No. Nature-based mental health practices can be adapted to all fitness levels and require no special outdoor skills. The course includes options from gentle nature walks to more adventurous activities, allowing you to choose what fits your abilities and interests.'
      }
    ]
  },
  {
    num: 19,
    slug: 'music-movement-wellness',
    title: 'Music & Movement for Wellness',
    subtitle: 'Recreational Joy & Play',
    price: 79,
    instructor: 'Autumn Persinger, PMHNP-BC',
    description: 'Music and movement provide accessible, evidence-based tools for emotional regulation, stress reduction, and mental health support through their effects on brain chemistry, nervous system function, and embodied experience.',
    descriptionFull: [
      'Musical engagement activates reward systems, releases neurochemicals including dopamine and endorphins, and creates opportunities for emotional expression and processing. Movement therapy recognizes the body as primary vehicle for emotional healing, with research demonstrating effectiveness for trauma, depression, and anxiety.',
      'This comprehensive 20-lesson course combines music therapy principles with movement-based practices. You\'ll learn to use sound and movement intentionally for mental health support, developing personalized practices for emotional regulation and wellbeing.'
    ],
    whoFor: [
      'Individuals seeking creative approaches to mental health',
      'Anyone interested in music therapy or dance/movement therapy',
      'People wanting embodied healing practices',
      'Those looking for emotional expression tools'
    ],
    whatToExpect: [
      'Understand neuroscience of music and movement for mental health',
      'Learn therapeutic music and movement techniques',
      'Develop personalized sound and movement practices',
      'Build sustainable wellness routines using creative expression'
    ],
    evidence: [
      'Neuroscience research on music and brain chemistry',
      'Dance/movement therapy effectiveness studies',
      'Studies on rhythm, percussion, and emotional regulation',
      'Research on embodied practices for mental health'
    ],
    faqs: [
      {
        q: 'Do I need musical or dance training?',
        a: 'No. Therapeutic music and movement focus on personal expression and healing rather than performance or skill. All practices are accessible regardless of musical or dance background, with emphasis on what feels authentic and helpful for you.'
      },
      {
        q: 'What if I feel self-conscious about movement or singing?',
        a: 'The course includes practices for building comfort with embodied expression, starting with private, low-pressure activities. You\'ll learn to work with self-consciousness as part of the healing process while developing practices that feel safe and sustainable.'
      }
    ]
  }
];

function generateLandingPage(course) {
  const firstLesson = `lesson-${course.num}-1`;
  const lessonFiles = [];
  for (let i = 1; i <= 20; i++) {
    lessonFiles.push(`Lesson ${i}`);
  }

  const faqItems = course.faqs.map((faq, idx) => `
                                <div class="accordion-item">
                                    <h3 class="accordion-header">
                                        <button class="accordion-button ${idx === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#faq${idx}">
                                            ${faq.q}
                                        </button>
                                    </h3>
                                    <div id="faq${idx}" class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            ${faq.a}
                                        </div>
                                    </div>
                                </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>${course.title} | Evidence-Based Course | Real Psychiatric Services</title>
    <meta name="description" content="${course.description}">
    <meta name="keywords" content="mental health, wellness course, ${course.slug.replace(/-/g, ' ')}, evidence-based mental health, Columbus OH">

    <!-- Open Graph -->
    <meta property="og:title" content="${course.title}">
    <meta property="og:description" content="${course.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://digital-wellness.realpsychiatricservices.com/course-${course.num}-${course.slug}/">

    <!-- Geo Tags -->
    <meta name="geo.region" content="US-OH">
    <meta name="geo.placename" content="Columbus">
    <meta name="geo.position" content="39.9612;-82.9988">

    <!-- Schema.org Course Markup -->
    <script type="application/ld+json">
    {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "${course.title}",
  "description": "${course.description}",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Real Psychiatric Services - Mental Health Education Platform",
    "url": "https://digital-wellness.realpsychiatricservices.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4770 Indianola Ave., Suite 111",
      "addressLocality": "Columbus",
      "addressRegion": "OH",
      "postalCode": "43214"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9612",
      "longitude": "-82.9988"
    }
  },
  "numberOfLessons": 20,
  "timeRequired": "PT18H",
  "offers": {
    "@type": "Offer",
    "price": "${course.price}",
    "priceCurrency": "USD"
  }
}
    </script>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="../../index.html"><strong>Real Psychiatric Services</strong></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="../../index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="../courses.html">All Courses</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="../../index.html">Home</a></li>
                            <li class="breadcrumb-item"><a href="../courses.html">Courses</a></li>
                            <li class="breadcrumb-item active">${course.title}</li>
                        </ol>
                    </nav>
                    <h1 class="display-4 fw-bold mb-3">${course.title}</h1>
                    <p class="lead text-muted mb-4">${course.subtitle}</p>
                    <p class="mb-4">${course.description}</p>
                    <div class="d-flex flex-wrap gap-3 mb-4">
                        <span class="badge bg-primary fs-6"><i class="bi bi-journal-text"></i> 20 Lessons</span>
                        <span class="badge bg-secondary fs-6"><i class="bi bi-clock"></i> 18+ Hours</span>
                        <span class="badge bg-success fs-6"><i class="bi bi-person"></i> ${course.instructor}</span>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card shadow-sm border-primary">
                        <div class="card-body text-center">
                            <p class="text-muted mb-2">Until 1 Jan 2026</p>
                            <h2 class="mb-0">
                                <span class="display-3 text-success fw-bold">$29</span>
                                <span class="display-4 text-muted text-decoration-line-through ms-2">$${course.price}</span>
                            </h2>
                            <p class="text-muted mb-4">One-time payment • Lifetime access</p>
                            <a href="#enroll" class="btn btn-primary btn-lg w-100 mb-2">Enroll Now</a>
                            <a href="#overview" class="btn btn-outline-secondary w-100">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <section class="py-5" id="overview">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <!-- Tabbed Content -->
                    <ul class="nav nav-tabs mb-4" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview-content" type="button">Overview</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="evidence-tab" data-bs-toggle="tab" data-bs-target="#evidence-content" type="button">Evidence Foundation</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="faq-tab" data-bs-toggle="tab" data-bs-target="#faq-content" type="button">FAQ</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="lessons-tab" data-bs-toggle="tab" data-bs-target="#lessons-content" type="button">Lessons</button>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <!-- Overview Tab -->
                        <div class="tab-pane fade show active" id="overview-content">
                            <h2 class="mb-4">Course Description</h2>
                            ${course.descriptionFull.map(p => `<p class="mb-3">${p}</p>`).join('\n')}

                            <h3 class="mt-5 mb-3">Who This Course Is For</h3>
                            <ul class="list-unstyled">
                                ${course.whoFor.map(item => `<li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>${item}</li>`).join('\n')}
                            </ul>

                            <h3 class="mt-5 mb-3">What to Expect</h3>
                            <ul class="list-unstyled">
                                ${course.whatToExpect.map(item => `<li class="mb-2"><i class="bi bi-arrow-right-circle-fill text-primary me-2"></i>${item}</li>`).join('\n')}
                            </ul>
                        </div>

                        <!-- Evidence Tab -->
                        <div class="tab-pane fade" id="evidence-content">
                            <h2 class="mb-4">Research & Evidence Foundation</h2>
                            <p class="lead mb-4">This course is built on rigorous scientific research:</p>
                            <ul class="list-unstyled">
                                ${course.evidence.map(item => `<li class="mb-3"><i class="bi bi-mortarboard-fill text-primary me-2"></i>${item}</li>`).join('\n')}
                            </ul>
                        </div>

                        <!-- FAQ Tab -->
                        <div class="tab-pane fade" id="faq-content">
                            <h2 class="mb-4">Frequently Asked Questions</h2>
                            <div class="accordion" id="faqAccordion">
                                ${faqItems}
                            </div>
                        </div>

                        <!-- Lessons Tab -->
                        <div class="tab-pane fade" id="lessons-content">
                            <h2 class="mb-4">Course Lessons</h2>
                            <div class="mb-3">
                                <a href="${firstLesson}.html" class="h5 text-decoration-none">
                                    Lesson 1: [First Lesson Title] <span class="text-primary">- visit</span>
                                </a>
                            </div>
                            <div class="text-muted">
                                ${Array.from({length: 19}, (_, i) => `<div class="mb-2">Lesson ${i + 2}: [Lesson ${i + 2} Title]</div>`).join('\n')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="col-lg-4">
                    <div class="card shadow-sm mb-4">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0"><i class="bi bi-star-fill"></i> Course Features</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled mb-0">
                                <li class="mb-3"><i class="bi bi-journal-text text-primary"></i> <strong>20 Interactive Lessons</strong></li>
                                <li class="mb-3"><i class="bi bi-clock text-primary"></i> <strong>18+ Hours</strong> of Content</li>
                                <li class="mb-3"><i class="bi bi-phone text-primary"></i> <strong>Mobile & Desktop</strong> Access</li>
                                <li class="mb-3"><i class="bi bi-infinity text-primary"></i> <strong>Lifetime</strong> Access</li>
                                <li class="mb-3"><i class="bi bi-lightbulb text-primary"></i> <strong>Evidence-Based</strong> Content</li>
                                <li class="mb-0"><i class="bi bi-shield-check text-primary"></i> <strong>Crisis Support</strong> Included</li>
                            </ul>
                        </div>
                    </div>

                    <div class="card shadow-sm mb-4">
                        <div class="card-header bg-secondary text-white">
                            <h5 class="mb-0"><i class="bi bi-geo-alt-fill"></i> Contact Us</h5>
                        </div>
                        <div class="card-body">
                            <p class="mb-2"><strong>Real Psychiatric Services</strong></p>
                            <p class="mb-2">4770 Indianola Ave., Suite 111<br>Columbus, OH 43214</p>
                            <p class="mb-2"><i class="bi bi-telephone"></i> 614-427-3205</p>
                            <p class="mb-0"><i class="bi bi-clock"></i> Mon-Fri: 9am-5pm</p>
                        </div>
                    </div>

                    <div class="card shadow-sm border-warning">
                        <div class="card-body text-center">
                            <h5 class="card-title"><i class="bi bi-shield-fill-exclamation text-warning"></i> Crisis Support</h5>
                            <p class="card-text small">If experiencing a crisis, call <strong>988</strong> for immediate support.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Enrollment CTA -->
    <section class="py-5 bg-primary text-white" id="enroll">
        <div class="container text-center">
            <h2 class="display-5 fw-bold mb-3">Ready to Begin Your Journey?</h2>
            <p class="lead mb-4">Join thousands learning evidence-based mental health strategies</p>
            <a href="${firstLesson}.html" class="btn btn-light btn-lg px-5">Start Course Now</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container text-center">
            <p class="mb-2">&copy; 2025 Real Psychiatric Services. All rights reserved.</p>
        </div>
    </footer>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}

// Generate landing pages for each course
courses.forEach(course => {
  const dir = path.join(__dirname, `course-${course.num}-${course.slug}`);
  const filePath = path.join(dir, 'index.html');
  
  const html = generateLandingPage(course);
  fs.writeFileSync(filePath, html);
  
  console.log(`✅ Generated: course-${course.num}-${course.slug}/index.html`);
});

console.log('\n🎉 All course landing pages generated successfully!');
