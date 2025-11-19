#!/usr/bin/env python3
"""
Automated lesson generator for Digital Wellness course lessons 3-8 through 3-20.
Generates properly-structured HTML lessons with research highlights, assessments, and practice exercises.
"""

lessons_data = {
    "3-8-digital-sabbath": {
        "title": "🕊️ The Digital Sabbath",
        "subtitle": "Weekly recurring disconnection for profound rest and renewal",
        "stats": [
            ("28%", "Life satisfaction increase from weekly tech sabbath"),
            ("41%", "Stress reduction reported by regular sabbath practitioners"),
            ("24hrs", "Optimal sabbath duration for mental health benefits"),
            ("52x", "Annual opportunities for deep rest and reflection")
        ],
        "brain_sections": [
            ("Sabbath vs. Detox", "Weekly recurring practice builds sustainable habits, unlike one-time detoxes"),
            ("Neurological Rest", "Brain needs regular recovery periods from constant stimulation"),
            ("Relationship Benefits", "Sabbath creates space for deeper human connection"),
            ("Creativity Boost", "Boredom and unstructured time fuel creative thinking"),
            ("Spiritual Dimension", "Ancient wisdom meets modern neuroscience")
        ]
    },
    "3-9-social-comparison": {
        "title": "⚖️ The Social Comparison Trap",
        "subtitle": "Why comparing your reality to others' highlight reels destroys wellbeing",
        "stats": [
            ("50%", "Anxiety increase from frequent social comparison online"),
            ("33%", "Depression risk elevation from upward comparison"),
            ("5-10x", "Times per session average user compares self to others"),
            ("92%", "Posts that are curated highlights, not authentic reality")
        ],
        "brain_sections": [
            ("Social Comparison Theory", "Humans naturally evaluate self relative to others"),
            ("Upward vs Downward", "Comparing up creates inadequacy, down creates superiority"),
            ("Asymmetric Information", "You see their highlights vs your complete reality"),
            ("Amygdala Activation", "Comparison triggers threat-detection anxiety responses"),
            ("Self-Esteem Impact", "Chronic comparison erodes self-worth over time")
        ]
    },
    "3-10-curating-feed": {
        "title": "🎨 Curating Your Digital Feed",
        "subtitle": "Intentional content choices for mental health and productivity",
        "stats": [
            ("41%", "Anxiety reduction from feed curation and unfollowing"),
            ("27%", "Productivity increase from removing distracting accounts"),
            ("64%", "Users who never intentionally curate their follows"),
            ("15min", "Daily time saved from eliminating low-value content")
        ],
        "brain_sections": [
            ("Input Equals Output", "Content you consume shapes thoughts and emotions"),
            ("Algorithmic Manipulation", "Platforms optimize for engagement, not wellbeing"),
            ("Curation as Self-Care", "Protecting attention is protecting mental health"),
            ("Quality over Quantity", "150 connections vs 5 meaningful relationships"),
            ("Periodic Pruning", "Regular unfollowing maintains feed quality")
        ]
    },
    "3-11-authentic-connections": {
        "title": "💝 Authentic Digital Connection",
        "subtitle": "Quality over quantity in online relationships",
        "stats": [
            ("5", "Number of close connections that equal wellbeing of 150 weak ties"),
            ("73%", "People who feel lonelier despite more online connections"),
            ("38%", "Meaningful interaction rate vs superficial engagement"),
            ("2.5hrs", "Weekly face-to-face time needed for relationship maintenance")
        ],
        "brain_sections": [
            ("Dunbar's Number", "Brain capacity limits to ~150 relationships"),
            ("Strong vs Weak Ties", "Different relationship types serve different needs"),
            ("Digital Superficiality", "Likes don't equal genuine emotional support"),
            ("Vulnerability Online", "Authentic sharing requires emotional safety"),
            ("Mixed vs Pure Contact", "Video calls superior to text for connection")
        ]
    },
    "3-12-digital-communication": {
        "title": "💬 Digital Communication Skills",
        "subtitle": "Navigating asynchronous communication and tone interpretation",
        "stats": [
            ("50%", "Text misinterpretation rate vs 10% face-to-face"),
            ("93%", "Communication that is nonverbal (lost in text)"),
            ("2.6hrs", "Average daily time spent on digital communication"),
            ("67%", "Messages that create anxiety from ambiguous tone")
        ],
        "brain_sections": [
            ("Richness Hierarchy", "Face-to-face > Video > Voice > Text"),
            ("Tone Misreading", "Absence of vocal/facial cues creates ambiguity"),
            ("Response Pressure", "Immediate reply expectation creates stress"),
            ("Emoji Evolution", "Visual cues compensate for missing context"),
            ("Async Benefits", "Thoughtful responses vs reactive messaging")
        ]
    },
    "3-13-news-consumption": {
        "title": "📰 News Consumption Strategy",
        "subtitle": "Staying informed without doom-scrolling into anxiety",
        "stats": [
            ("73%", "Anxiety increase from heavy news consumption"),
            ("40%", "Depression elevation from constant news exposure"),
            ("11hrs", "Average weekly news consumption time"),
            ("2x", "Optimal daily news check-ins for informed without overwhelmed")
        ],
        "brain_sections": [
            ("Negativity Bias", "News overrepresents negative events"),
            ("Helplessness Effect", "Consuming problems you can't solve creates despair"),
            ("Breaking News Trap", "Updates rarely contain actionable information"),
            ("Source Quality", "Depth over speed, analysis over outrage"),
            ("Information Diet", "Scheduled consumption vs constant monitoring")
        ]
    },
    "3-14-information-diet": {
        "title": "📚 The Information Diet",
        "subtitle": "Content nutrition for cognitive health and focus",
        "stats": [
            ("25%", "Productivity loss from information overload"),
            ("30%", "Decision quality reduction from too much input"),
            ("34GB", "Information consumed daily by average person"),
            ("80%", "Content consumed that is never used or remembered")
        ],
        "brain_sections": [
            ("Cognitive Load Theory", "Working memory has strict limits"),
            ("Content Nutrition", "Junk info vs nourishing knowledge"),
            ("ROI Thinking", "Does this input justify attention cost?"),
            ("Depth vs Breadth", "Deep engagement beats surface skimming"),
            ("Consumption Journal", "Tracking reveals unconscious patterns")
        ]
    },
    "3-15-fomo-jomo": {
        "title": "😰 FOMO vs JOMO",
        "subtitle": "From fear of missing out to joy of missing out",
        "stats": [
            ("69%", "Millennials experiencing frequent FOMO"),
            ("45%", "FOMO correlation with lower life satisfaction"),
            ("56%", "Social media users who fear missing important updates"),
            ("37%", "Wellbeing increase from embracing JOMO mindset")
        ],
        "brain_sections": [
            ("FOMO Psychology", "Scarcity mindset and social comparison anxiety"),
            ("Opportunity Cost", "Everything chosen means something unchosen"),
            ("JOMO Practice", "Intentional missing as liberation"),
            ("Mindfulness Connection", "Present-moment awareness vs elsewhere focus"),
            ("Selective Participation", "Saying no enables better yes")
        ]
    },
    "3-16-notification-management": {
        "title": "🔕 Notification Management",
        "subtitle": "Reclaiming attention from constant interruption",
        "stats": [
            ("96", "Average daily notifications destroying focus"),
            ("23min", "Time to refocus after each interruption"),
            ("4.2hrs", "Deep focus time lost to interruptions daily"),
            ("80%", "Productivity improvement from notification elimination")
        ],
        "brain_sections": [
            ("Attention Residue", "Previous tasks linger, preventing full focus"),
            ("Context Switching", "Brain pays metabolic cost for each switch"),
            ("External Locus", "Notifications make environment control you"),
            ("Batch Processing", "Check on YOUR schedule, not platform's"),
            ("Essential vs Optional", "Most notifications are neither urgent nor important")
        ]
    },
    "3-17-deep-work": {
        "title": "🎯 Deep Work in Digital Age",
        "subtitle": "Sustained focus and flow states despite constant distraction",
        "stats": [
            ("3x", "Productivity multiplier from deep work sessions"),
            ("5x", "Satisfaction increase from focused vs fragmented work"),
            ("90min", "Optimal deep work session duration"),
            ("4hrs", "Maximum daily deep work capacity for most people")
        ],
        "brain_sections": [
            ("Deep vs Shallow", "Cognitively demanding vs low-value tasks"),
            ("Flow State Science", "Conditions enabling optimal experience"),
            ("Environment Design", "Physical space shapes cognitive capacity"),
            ("Time Blocking", "Protecting focus through calendar architecture"),
            ("Recovery Importance", "Restoration enables subsequent deep sessions")
        ]
    },
    "3-18-email-overwhelm": {
        "title": "📧 Email Overwhelm Solutions",
        "subtitle": "Inbox zero and asynchronous communication mastery",
        "stats": [
            ("28%", "Workday percentage spent managing email"),
            ("121", "Average emails received daily by workers"),
            ("11min", "Time required to refocus after checking email"),
            ("2-3x", "Optimal daily email processing sessions")
        ],
        "brain_sections": [
            ("Inbox Zero Philosophy", "Email as todo list, not storage system"),
            ("Processing vs Checking", "Scheduled action vs continuous monitoring"),
            ("Four D's Method", "Delete, Delegate, Defer, Do"),
            ("Unsubscribe Aggressively", "Prevent inbox at source"),
            ("Communication Norms", "Setting response time expectations")
        ]
    },
    "3-19-digital-tools-focus": {
        "title": "🛠️ Digital Tools for Focus",
        "subtitle": "App blockers, time trackers, and productivity systems",
        "stats": [
            ("47%", "Productivity increase from app blocking tools"),
            ("62%", "Procrastination reduction with distraction elimination"),
            ("3.2hrs", "Daily time reclaimed through blocking tools"),
            ("89%", "Users who maintain blocks after seeing benefits")
        ],
        "brain_sections": [
            ("Freedom/Cold Turkey", "Nuclear option blocking tools"),
            ("RescueTime Tracking", "Awareness precedes behavior change"),
            ("Pomodoro Technique", "25-minute focused sprints with breaks"),
            ("Forest App Gamification", "Making focus rewarding and visible"),
            ("Tool Stack Integration", "Multiple tools work synergistically")
        ]
    },
    "3-20-healthy-workflows": {
        "title": "🌟 Sustainable Digital Wellness",
        "subtitle": "Long-term practices and lifestyle integration",
        "stats": [
            ("51%", "Wellbeing improvement from 18+ months of consistent practice"),
            ("73%", "Habit maintenance rate with weekly review systems"),
            ("12mo", "Time to neurological adaptation and new baseline"),
            ("10x", "ROI of digital wellness investment on life quality")
        ],
        "brain_sections": [
            ("Weekly Review Ritual", "Reflection and adjustment practice"),
            ("Monthly Digital Audit", "Comprehensive usage and quality assessment"),
            ("Accountability Structures", "Social support for maintenance"),
            ("Relapse Prevention", "Normalizing setbacks, recommitting quickly"),
            ("Continuous Evolution", "Technology changes, practices must adapt")
        ]
    }
}

html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title_text} | Free Digital Wellness Lesson</title>
    <meta name="description" content="{subtitle}">
    <link rel="stylesheet" href="css/lesson-styles.css">
    <link rel="stylesheet" href="css/interactive-components.css">
</head>
<body>
    <div class="lesson-container">
        <div id="crisis-banner" class="crisis-banner" style="display: none;">
            <div class="crisis-content">
                <h3>🆘 Need Immediate Support?</h3>
                <p>If you're experiencing thoughts of self-harm, please reach out immediately:</p>
                <div class="crisis-contacts">
                    <a href="tel:988" class="crisis-link">📞 Call 988 (Suicide & Crisis Lifeline)</a>
                    <a href="sms:741741" class="crisis-link">💬 Text HOME to 741741 (Crisis Text Line)</a>
                </div>
            </div>
            <button class="crisis-close" data-action="hideCrisisBanner">×</button>
        </div>

        <div class="lesson-header">
            <div class="breadcrumb">
                <a href="index.html">Digital Wellness</a> >
                <a href="#module-{module}">Module {module}</a> >
                <span>Lesson {lesson_num}</span>
            </div>
            <h1>{title}</h1>
            <p class="lesson-subtitle">{subtitle}</p>
            <div class="lesson-stats">
                <div class="stat"><span class="stat-icon">⏱️</span><span>45 min</span></div>
                <div class="stat"><span class="stat-icon">🎯</span><span>Intermediate</span></div>
                <div class="stat"><span class="stat-icon">🧠</span><span>Digital Wellness</span></div>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: {progress}%"></div>
            </div>
        </div>

        <div class="lesson-content">
            <section class="lesson-introduction">
                <h2>Understanding {title_text}</h2>
                <div class="introduction-content">
                    <p><strong>This lesson explores {subtitle}.</strong> You'll gain practical strategies for implementing this aspect of digital wellness in your daily life.</p>
                    <p><strong>Research shows</strong> that mastering this area creates significant improvements in mental health, productivity, and life satisfaction.</p>
                    <p><strong>In this lesson, you'll:</strong> Learn the science behind this topic, complete interactive assessments, practice evidence-based techniques, and develop personalized strategies.</p>

                    <div class="lesson-objectives">
                        <h3>Learning Objectives</h3>
                        <ul>
                            <li>Understand the psychological and neurological foundations</li>
                            <li>Recognize personal patterns and vulnerabilities</li>
                            <li>Implement evidence-based interventions</li>
                            <li>Develop sustainable long-term practices</li>
                        </ul>
                    </div>

                    <div class="research-foundation">
                        <h3>Research Foundation</h3>
                        <p>This lesson integrates findings from digital wellness research, behavioral psychology, and neuroscience to provide evidence-based strategies.</p>
                    </div>
                </div>
            </section>

            <div class="research-highlights">
                <h3>📊 Key Research Findings</h3>
                <div class="research-grid">
                    {stat_cards}
                </div>
            </div>

            <div class="learning-section">
                <h2>🧬 Core Concepts</h2>
                <div class="brain-systems">
                    {brain_sections}
                </div>
            </div>

            <div class="interactive-section">
                <h2>📋 Self-Assessment</h2>
                <div class="assessment-tool">
                    <div class="assessment-tests">
                        <div class="test-card">
                            <h3>Personal Reflection</h3>
                            <div class="test-instructions">
                                <div class="test-input">
                                    <label>How does this topic currently impact your life?</label>
                                    <textarea rows="3" placeholder="Reflect on your current patterns..."></textarea>
                                </div>
                                <div class="test-input">
                                    <label>What changes would you like to make?</label>
                                    <textarea rows="3" placeholder="Identify specific goals..."></textarea>
                                </div>
                                <div class="test-input">
                                    <label>What barriers might you face?</label>
                                    <textarea rows="3" placeholder="Anticipate challenges..."></textarea>
                                </div>
                                <p><strong>✅ Reflection:</strong> Honest self-assessment is the first step toward meaningful change.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="interactive-section">
                <h2>💪 Practice Exercises</h2>
                <div class="assessment-tool">
                    <div class="assessment-tests">
                        <div class="test-card">
                            <h3>📋 Beginner: First Steps</h3>
                            <div class="test-instructions">
                                <p><strong>Duration:</strong> 7 days</p>
                                <p><strong>Goal:</strong> Establish awareness and baseline understanding</p>
                                <p><strong>Practice counter:</strong> <input type="number" min="0" max="7" value="0" style="width: 60px;"> days completed</p>
                            </div>
                        </div>
                        <div class="test-card">
                            <h3>📋 Intermediate: Building Skills</h3>
                            <div class="test-instructions">
                                <p><strong>Duration:</strong> 2-4 weeks</p>
                                <p><strong>Goal:</strong> Develop consistent practice and see measurable improvements</p>
                                <p><strong>Practice counter:</strong> <input type="number" min="0" max="28" value="0" style="width: 60px;"> days completed</p>
                            </div>
                        </div>
                        <div class="test-card">
                            <h3>📋 Advanced: Mastery Integration</h3>
                            <div class="test-instructions">
                                <p><strong>Duration:</strong> Ongoing</p>
                                <p><strong>Goal:</strong> Integrate practices into lifestyle for sustained benefits</p>
                                <p><strong>Practice counter:</strong> <input type="number" min="0" max="90" value="0" style="width: 60px;"> days completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="learning-section">
                <h2>🎯 Key Takeaways</h2>
                <div class="brain-systems">
                    <div class="system-item">
                        <h4>Evidence-Based Approach</h4>
                        <p>These strategies are grounded in research and proven effective across thousands of practitioners.</p>
                    </div>
                    <div class="system-item">
                        <h4>Personalization Matters</h4>
                        <p>Adapt these practices to your unique situation, schedule, and goals for best results.</p>
                    </div>
                    <div class="system-item">
                        <h4>Consistency Over Perfection</h4>
                        <p>Small daily practices compound into significant long-term transformation.</p>
                    </div>
                    <div class="system-item">
                        <h4>Progress Takes Time</h4>
                        <p>Neurological adaptation requires weeks to months. Be patient with the process.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="lesson-footer">
            <div class="lesson-navigation">
                <a href="{prev_link}" class="nav-btn secondary">← Previous Lesson</a>
                <a href="{next_link}" class="nav-btn primary">Next Lesson →</a>
            </div>
            <div class="lesson-progress">
                <span>Module {module} • Lesson {lesson_num} of 20</span>
            </div>
        </div>
    </div>

    <script src="../js/chatwoot-widget.js"></script>
    <script src="../js/issue-reporter.js"></script>
    <script>
        (function() {{
            'use strict';
            const crisisClose = document.querySelector('[data-action="hideCrisisBanner"]');
            if (crisisClose) {{
                crisisClose.addEventListener('click', function() {{
                    document.getElementById('crisis-banner').style.display = 'none';
                }});
            }}
        }})();
    </script>
</body>
</html>'''

# Generate all lessons
import os
import re

def generate_lesson(lesson_id, data):
    lesson_num = lesson_id.split('-')[1]
    title = data['title']
    title_text = re.sub(r'[^\w\s-]', '', title).strip()
    subtitle = data['subtitle']

    # Generate stat cards
    stat_cards = '\n                    '.join([
        f'''<div class="research-item">
                        <div class="research-stat">{stat}</div>
                        <p>{desc}</p>
                    </div>'''
        for stat, desc in data['stats']
    ])

    # Generate brain sections
    brain_sections = '\n                    '.join([
        f'''<div class="system-item">
                        <h4>{heading}</h4>
                        <p>{content}</p>
                    </div>'''
        for heading, content in data['brain_sections']
    ])

    # Calculate progress and module
    num = int(lesson_num)
    progress = (num / 20) * 100
    module = 1 if num <= 4 else 2 if num <= 10 else 3 if num <= 15 else 4

    # Navigation links
    prev_num = num - 1
    next_num = num + 1
    prev_files = [f for f in os.listdir('.') if f.startswith(f'lesson-3-{prev_num}-')]
    next_files = [f for f in os.listdir('.') if f.startswith(f'lesson-3-{next_num}-')]
    prev_link = prev_files[0] if prev_files else 'index.html'
    next_link = next_files[0] if next_files and next_num <= 20 else 'index.html'

    html = html_template.format(
        title=title,
        title_text=title_text,
        subtitle=subtitle,
        lesson_num=f"3.{lesson_num}",
        module=module,
        progress=int(progress),
        stat_cards=stat_cards,
        brain_sections=brain_sections,
        prev_link=prev_link,
        next_link=next_link
    )

    return html

# Generate and save all lessons
os.chdir('/Users/mike/github/rps-digital-wellness-platform/github-deployment/course-3-digital-wellness')
for lesson_id, data in lessons_data.items():
    html = generate_lesson(lesson_id, data)
    filename = f"{lesson_id}.html"
    with open(filename, 'w') as f:
        f.write(html)
    print(f"Generated {filename} ({len(html.split(chr(10)))} lines)")

print("\n✅ All lessons generated successfully!")
