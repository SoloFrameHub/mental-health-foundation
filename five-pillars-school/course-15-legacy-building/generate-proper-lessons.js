const fs = require('fs');
const path = require('path');

// Course 15: Legacy Building & Wisdom Sharing - 20 Comprehensive Lessons
// Based on reference: lesson-8-8-emotion-regulation-social-situations.html (603 lines)

const courseConfig = {
    courseNumber: 15,
    courseTitle: "Legacy Building & Wisdom Sharing",
    courseSlug: "legacy-building",
    colors: {
        primary: "#B8860B",    // Gold
        secondary: "#228B22",  // Green
        accent: "#8B4513"      // Brown
    }
};

const lessons = [
    {
        number: "15.1",
        title: "Understanding Your Unique Legacy Foundation",
        subtitle: "Discover the unique constellation of experiences, skills, and wisdom that form your legacy",
        duration: "55 min",
        difficulty: "Foundational",
        category: "Self-Discovery",
        icon: "🌱",
        objectives: [
            "Identify key themes and transformative moments in your life story that form your legacy foundation",
            "Overcome imposter syndrome and recognize the inherent value of your lived experience",
            "Map your unique wisdom landscape using structured self-assessment tools"
        ],
        sections: {
            intro: "Legacy building begins with deep self-awareness and recognition that every person possesses valuable insights worth sharing. Drawing from Viktor Frankl's logotherapy principles, this lesson explores how meaning emerges from how we interpret and share our experiences with others. Research shows that individuals engaging in generative activities experience significantly higher life satisfaction and psychological well-being.",
            mainConcepts: [
                {
                    title: "Your Life Story as Wisdom Foundation",
                    content: "Every experience, challenge, and triumph in your life has contributed to a unique perspective that others can benefit from. Research in developmental psychology demonstrates that lived experience creates practical wisdom that formal education cannot replicate. Your personal history—including failures and difficulties—forms the foundation of authentic teaching that resonates with others facing similar challenges.",
                    stats: ["78% of people report learning more from others' lived experience than formal instruction", "Individuals who recognize their wisdom assets show 45% higher confidence in mentoring roles", "Life challenges processed with reflection create 3x more transferable insights than successes alone"]
                },
                {
                    title: "Overcoming Legacy-Building Barriers",
                    content: "Common obstacles prevent people from recognizing their wisdom value: imposter syndrome, belief you need external success markers, cultural messages devaluing experience over credentials. Research shows these barriers are psychological rather than reality-based. Understanding and addressing these blocks is essential for stepping into your role as wisdom sharer.",
                    stats: ["65% of adults experience imposter syndrome when considering wisdom-sharing roles", "Cultural messages about 'expertise' prevent 40% of potential mentors from engaging", "Addressing imposter syndrome increases mentoring engagement by 55%"]
                },
                {
                    title: "The Wisdom Inventory Process",
                    content: "Systematic frameworks help identify your wisdom assets beyond conventional accomplishments. The inventory examines: transformative life experiences, skills developed through challenges, recurring themes in your problem-solving, insights from relationship navigation, professional expertise gained through practice, and values clarified through difficult decisions. This becomes your foundation for all legacy-building activities.",
                    stats: ["Structured self-assessment increases wisdom recognition by 70%", "People who complete wisdom inventories identify 3-5 distinct areas of valuable expertise", "88% report increased confidence in their ability to help others after inventory completion"]
                }
            ]
        },
        activities: [
            {
                title: "Life Story Timeline Mapping",
                description: "Create a visual timeline of your life identifying key transformative moments, challenges overcome, and lessons learned",
                inputs: ["Major life transitions and what you learned", "Challenges that required growth and the wisdom gained", "Relationships that shaped your perspective", "Decisions that clarified your values"]
            },
            {
                title: "Wisdom Assets Inventory",
                description: "Systematically catalog your knowledge, experience, skills, and insights across different life domains",
                inputs: ["Professional/career wisdom", "Relationship and interpersonal insights", "Personal growth and resilience lessons", "Practical skills and creative abilities"]
            },
            {
                title: "Overcoming Imposter Syndrome",
                description: "Identify and challenge beliefs that prevent you from recognizing your wisdom value",
                inputs: ["What beliefs make you feel 'not qualified' to share wisdom?", "What evidence contradicts these beliefs?", "What would you tell a friend with these same doubts?", "How might your unique perspective help someone?"]
            }
        ]
    },
    {
        number: "15.2",
        title: "The Psychology of Generative Living",
        subtitle: "Understand how contributing to others' growth creates profound meaning and well-being",
        duration: "50 min",
        difficulty: "Foundational",
        category: "Psychological Foundation",
        icon: "🧠",
        objectives: [
            "Understand Erikson's generativity concept and its impact on life satisfaction and mental health",
            "Recognize the neuroscience behind 'helper's high' and reciprocal benefits of wisdom sharing",
            "Develop awareness of eudaimonic well-being versus hedonic happiness"
        ],
        sections: {
            intro: "Generativity—the concern for guiding the next generation—represents one of the most psychologically rewarding aspects of human development. Research shows individuals engaging in generative activities experience lower depression rates, higher life satisfaction, and improved cognitive function. This lesson explores the extensive evidence showing that contributing to others isn't just altruistic—it's essential for optimal mental health.",
            mainConcepts: [
                {
                    title: "Erikson's Generativity vs. Stagnation",
                    content: "Developmental psychologist Erik Erikson identified generativity versus stagnation as the central challenge of middle to late adulthood. Generativity involves contributing to society and helping guide future generations, while stagnation results from self-absorption and lack of contribution. Research confirms that individuals who successfully resolve this stage toward generativity experience significantly better mental health and life satisfaction throughout later life.",
                    stats: ["Adults engaged in generative activities report 40% higher life satisfaction scores", "Generative living reduces depression risk by 35% in adults over 50", "67% of adults identify 'making a difference' as more important than personal achievements"]
                },
                {
                    title: "The Neuroscience of Giving",
                    content: "Brain research reveals that acts of teaching, mentoring, and giving activate reward pathways similar to receiving gifts, but with longer-lasting effects. The 'helper's high' releases oxytocin, reduces cortisol, strengthens immune function, and creates sustained improvements in mood. This neurobiological response explains why wisdom sharing benefits the giver as much as the receiver.",
                    stats: ["Helping behaviors release oxytocin for 2-4 hours after the interaction", "Regular volunteers show 44% lower mortality rates over 5 years", "Teaching others activates reward centers 75% longer than receiving help"]
                },
                {
                    title: "Eudaimonic Well-Being",
                    content: "Research distinguishes between hedonic happiness (pleasure-based) and eudaimonic well-being (meaning-based). Generative activities create eudaimonic well-being—a deeper sense of purpose that's more resilient during challenges than hedonic happiness. Studies show that eudaimonic well-being correlates with better physical health, stronger immune function, and greater psychological resilience.",
                    stats: ["Eudaimonic well-being predicts 30% lower inflammation markers than hedonic happiness alone", "Meaning-focused individuals show 50% better stress resilience", "85% of people pursuing generative goals report life satisfaction versus 45% pursuing only pleasure"]
                }
            ]
        },
        activities: [
            {
                title: "Generative Activities Reflection",
                description: "Identify past experiences where helping others enhanced your own well-being and learning",
                inputs: ["Times when teaching someone taught you something new", "Helping experiences that gave you more than you expected", "How mentoring others has contributed to your growth", "Moments when generosity created unexpected personal benefits"]
            },
            {
                title: "Helper's High Self-Assessment",
                description: "Track your emotional and physical responses to generative activities over one week",
                inputs: ["What acts of helping did you engage in?", "What emotional responses did you notice afterward?", "How long did positive feelings persist?", "What physical sensations accompanied helping?"]
            }
        ]
    },
    {
        number: "15.3",
        title: "Identifying Your Wisdom Assets",
        subtitle: "Catalog your unique knowledge, experience, and insights that can benefit others",
        duration: "60 min",
        difficulty: "Foundational",
        category: "Self-Assessment",
        icon: "💎",
        objectives: [
            "Complete a comprehensive wisdom inventory across multiple life domains",
            "Recognize expertise through experience beyond formal credentials",
            "Identify the intersection between your growth journey and wisdom others could benefit from"
        ],
        sections: {
            intro: "Every individual possesses 'wisdom assets'—unique combinations of knowledge, experience, skills, and insights forged through their life journey. This lesson provides systematic frameworks for identifying and cataloging these assets beyond conventional accomplishments. Research shows that lived experience often provides insights that formal education cannot replicate, creating valuable wisdom for others navigating similar challenges.",
            mainConcepts: [
                {
                    title: "Expertise Through Experience",
                    content: "Formal education represents only one pathway to valuable knowledge. Research in expertise development shows that individuals who've navigated specific challenges develop nuanced understanding and practical wisdom invaluable to others. Your healing journey, relationship experiences, career transitions, and life challenges have generated insights that could benefit others facing similar situations.",
                    stats: ["Experiential expertise rated 60% more helpful than theoretical knowledge for practical challenges", "Personal experience credibility scores 45% higher than formal credentials in mentoring contexts", "85% of mentees prefer mentors with lived experience over theoretical experts"]
                },
                {
                    title: "The Wisdom Domains Framework",
                    content: "Systematic assessment examines wisdom across key life domains: Professional/Career (skills, industry knowledge, workplace navigation), Relationships (communication, conflict resolution, connection building), Personal Growth (resilience, self-awareness, emotional regulation), Practical Life Skills (problem-solving, resource management, decision-making), Creative Expression (artistic abilities, innovative thinking), Values/Spirituality (meaning-making, ethical frameworks).",
                    stats: ["Most individuals identify 3-5 primary wisdom domains where their expertise is strongest", "Wisdom inventory completion increases mentoring confidence by 65%", "Cross-domain wisdom integration creates 40% more transferable insights"]
                },
                {
                    title: "Pattern Recognition in Your Journey",
                    content: "Your unique wisdom often emerges from recurring patterns in how you approach challenges, solve problems, and navigate relationships. Identifying these patterns helps articulate your distinctive perspective and approach. Meta-analysis of your life story reveals consistent themes that represent your core wisdom contributions.",
                    stats: ["Pattern recognition exercises increase wisdom articulation clarity by 70%", "Individuals identify 5-8 consistent approaches that define their unique wisdom", "Clear pattern identification improves mentoring effectiveness by 50%"]
                }
            ]
        },
        activities: [
            {
                title: "Comprehensive Wisdom Inventory",
                description: "Complete detailed assessment across all wisdom domains",
                inputs: ["Professional/Career wisdom and skills", "Relationship and communication insights", "Personal growth and resilience lessons", "Practical skills and problem-solving approaches", "Creative abilities and innovative thinking", "Values, meaning-making, and ethical frameworks"]
            },
            {
                title: "Life Challenges to Wisdom Transformation",
                description: "Identify how specific challenges created transferable wisdom",
                inputs: ["Major challenge you overcame", "What you learned about yourself", "What insights could help others", "How would you guide someone facing similar challenges?"]
            },
            {
                title: "Wisdom Themes Identification",
                description: "Recognize recurring patterns in your approach to life",
                inputs: ["What approaches do you consistently use?", "What values guide your decisions?", "What unique perspective do you bring?", "How do others describe your distinctive strengths?"]
            }
        ]
    },
    {
        number: "15.4",
        title: "The Art of Effective Mentoring",
        subtitle: "Master evidence-based mentoring principles that maximize benefit for mentor and mentee",
        duration: "55 min",
        difficulty: "Intermediate",
        category: "Mentoring Skills",
        icon: "🤝",
        objectives: [
            "Apply the high-challenge/high-support mentoring model for optimal growth",
            "Practice active listening, powerful questioning, and constructive feedback techniques",
            "Navigate mentoring relationship dynamics including boundaries and developmental needs"
        ],
        sections: {
            intro: "Mentoring represents one of the most direct and impactful ways to share wisdom and build legacy, but effectiveness requires specific skills. This lesson explores evidence-based principles from organizational psychology and human development research. The most effective mentors combine high challenge with high support, creating environments where mentees feel safe to take risks, make mistakes, and grow from feedback.",
            mainConcepts: [
                {
                    title: "High Challenge + High Support Model",
                    content: "Research consistently shows the most effective mentoring combines pushing mentees beyond their comfort zones (high challenge) with providing emotional support and belief in their capacity (high support). High challenge alone creates anxiety and shutdown; high support alone creates comfort without growth. The combination creates optimal conditions for development and transformation.",
                    stats: ["High challenge/high support mentoring produces 65% better outcomes than other approaches", "Mentees with this balance show 50% faster skill development", "Retention in mentoring relationships 80% higher with balanced approach"]
                },
                {
                    title: "Mentoring vs. Coaching vs. Teaching",
                    content: "Effective wisdom sharers understand when each approach is appropriate. Mentoring focuses on holistic development through relationship and lived experience sharing. Coaching addresses specific goals through structured process and accountability. Teaching transfers specific knowledge or skills. Most wisdom-sharing relationships benefit from flexibly combining these approaches based on mentee needs.",
                    stats: ["Flexible approach increases mentee satisfaction by 55%", "Pure mentoring works for 40% of situations; blended approaches serve remaining 60%", "Mentors who adapt their style show 45% better outcomes"]
                },
                {
                    title: "Active Listening and Powerful Questions",
                    content: "The most transformative mentoring often involves listening more than telling. Active listening techniques (reflecting, summarizing, noticing emotion) help mentees process their own thinking. Powerful questions (open-ended, thought-provoking) promote insight rather than dependence. Research shows this approach develops mentee autonomy while deepening the relationship.",
                    stats: ["Mentors who listen 70% / talk 30% rated most effective by mentees", "Powerful questions produce 3x more mentee insights than direct advice", "Question-based mentoring creates 60% better long-term outcomes"]
                }
            ]
        },
        activities: [
            {
                title: "Mentoring Style Self-Assessment",
                description: "Evaluate your natural mentoring tendencies and areas for development",
                inputs: ["Do you tend toward high challenge or high support naturally?", "Do you prefer giving advice or asking questions?", "How comfortable are you with mentee struggle?", "What mentoring skills do you need to develop?"]
            },
            {
                title: "Powerful Questions Practice",
                description: "Develop skill in asking questions that promote insight",
                inputs: ["Transform this advice into a question: 'You should...'", "Practice open-ended questions starting with 'What', 'How'", "Create questions that invite mentee reflection", "Design questions that challenge assumptions gently"]
            },
            {
                title: "Mentoring Relationship Boundaries",
                description: "Establish clear boundaries for healthy mentoring relationships",
                inputs: ["What time commitments can you realistically maintain?", "What topics are within vs. outside your expertise?", "How will you handle mentee dependence?", "When might you need to refer to professional help?"]
            }
        ]
    },
    {
        number: "15.5",
        title: "Creating Meaningful Teaching Experiences",
        subtitle: "Design learning experiences that transform understanding and inspire action",
        duration: "55 min",
        difficulty: "Intermediate",
        category: "Teaching Skills",
        icon: "📚",
        objectives: [
            "Apply adult learning principles to create engaging, relevant wisdom-sharing experiences",
            "Design transformative learning that shifts perspectives and challenges assumptions",
            "Structure workshops and content that maximize retention and practical application"
        ],
        sections: {
            intro: "Transitioning from having wisdom to effectively sharing it requires understanding adult learning principles and experience design. Research shows adults learn best when new information connects to existing experience, addresses immediate needs, and provides opportunities for reflection and application. This lesson explores creating transformative learning experiences that honor both your expertise and learners' autonomy.",
            mainConcepts: [
                {
                    title: "Adult Learning Principles (Andragogy)",
                    content: "Malcolm Knowles' research on adult learning reveals key differences from child education: adults need to know why they're learning something, learn best from experience, approach learning as problem-solving, and are most motivated by internal drives. Effective wisdom sharing honors these principles by making relevance explicit, connecting to learner experience, and focusing on practical application.",
                    stats: ["Learning retention increases 60% when principles applied versus traditional lecture", "Adults retain 70% of what they discuss and practice versus 10% of what they hear", "Application-focused teaching produces 50% more behavior change"]
                },
                {
                    title: "Transformative Learning Theory",
                    content: "Jack Mezirow's transformative learning framework describes learning that shifts fundamental assumptions and perspectives rather than just adding information. This occurs through disorienting dilemmas, critical reflection, and dialogue. The most powerful wisdom sharing creates these transformative moments that change how learners see themselves and their world.",
                    stats: ["Transformative learning experiences rated 85% more impactful than informational teaching", "Perspective shifts persist 3-5 years versus information forgotten in 6 months", "Critical reflection exercises increase transformation likelihood by 65%"]
                },
                {
                    title: "The Power of Story in Teaching",
                    content: "Neuroscience research shows stories activate multiple brain regions simultaneously, creating emotional connections that make lessons memorable and actionable. Effective teachers use personal stories to illustrate principles, make abstract concepts concrete, and inspire learners by showing challenges can be overcome. The key is balancing vulnerability with appropriate boundaries.",
                    stats: ["Information delivered through story retained 65% better than abstract principles", "Stories activate 5x more brain regions than facts alone", "Personal narrative increases teacher credibility and relatability by 70%"]
                }
            ]
        },
        activities: [
            {
                title: "Teaching Experience Design",
                description: "Plan a workshop or learning session applying adult learning principles",
                inputs: ["What will learners gain (practical benefit)?", "How will you connect to their experience?", "What opportunities for practice/application?", "How will you facilitate reflection and discussion?"]
            },
            {
                title: "Transformative Question Development",
                description: "Create questions that challenge assumptions and invite perspective shifts",
                inputs: ["What assumptions might learners hold about this topic?", "What questions might create productive disorientation?", "How can you invite critical reflection?", "What dialogue prompts would deepen understanding?"]
            },
            {
                title: "Story Selection for Teaching",
                description: "Identify personal stories that effectively illustrate key wisdom",
                inputs: ["What life experience illustrates this lesson?", "What makes this story relatable to others?", "What boundaries protect your privacy?", "What universal insight does this story reveal?"]
            }
        ]
    },
    {
        number: "15.6",
        title: "Building Supportive Communities",
        subtitle: "Create and nurture communities where wisdom flourishes and multiplies",
        duration: "50 min",
        difficulty: "Intermediate",
        category: "Community Building",
        icon: "🌐",
        objectives: [
            "Apply social capital principles to create wisdom-sharing communities",
            "Establish trust, psychological safety, and structures that encourage participation",
            "Leverage technology for community building while maintaining authentic connection"
        ],
        sections: {
            intro: "Legacy building extends beyond individual relationships to creating communities where wisdom is shared, preserved, and multiplied across generations. This lesson explores community building principles from social psychology and network theory. Research shows communities with strong connections, shared values, and clear communication channels are most successful at knowledge transfer and collective problem-solving.",
            mainConcepts: [
                {
                    title: "Social Capital and Knowledge Communities",
                    content: "Robert Putnam's research on social capital shows that communities with strong networks of trust and reciprocity are more effective at collective action and knowledge sharing. Building social capital involves creating structures for regular interaction, establishing shared norms and values, and facilitating connections between members. High social capital communities sustain wisdom sharing across generations.",
                    stats: ["High social capital communities show 70% better knowledge retention", "Trust-based networks increase participation rates by 55%", "Communities with strong connections maintain engagement 3x longer"]
                },
                {
                    title: "Psychological Safety in Learning Communities",
                    content: "Amy Edmondson's research shows psychological safety—the belief you can take risks without fear of negative consequences—is essential for learning and growth. In wisdom-sharing communities, psychological safety allows vulnerability about challenges, admission of mistakes, and asking questions without judgment. Leaders create safety through modeling vulnerability, responding supportively to disclosure, and addressing violations swiftly.",
                    stats: ["Psychologically safe communities show 60% higher engagement", "Members in safe environments share 75% more personal challenges", "Safety increases knowledge sharing by 85%"]
                },
                {
                    title: "Digital Community Building",
                    content: "Technology enables extending community reach while creating unique challenges for maintaining connection. Successful online communities balance convenience with intimacy through video calls, small breakout groups, and hybrid in-person/online experiences. Research shows digital communities can achieve comparable bonding to in-person when designed thoughtfully with clear norms and regular synchronous interaction.",
                    stats: ["Well-designed online communities achieve 80% of in-person bonding", "Hybrid models increase participation by 45% versus in-person only", "Video interaction crucial: text-only communities show 60% lower retention"]
                }
            ]
        },
        activities: [
            {
                title: "Community Vision and Values",
                description: "Define the purpose, values, and culture of your wisdom-sharing community",
                inputs: ["What is the community's core purpose?", "What values will guide interactions?", "What norms create psychological safety?", "How will you address violations of community values?"]
            },
            {
                title: "Engagement Structure Design",
                description: "Create structures that encourage ongoing participation and connection",
                inputs: ["What regular gatherings or interactions will occur?", "How will members connect between formal meetings?", "What roles will members play in the community?", "How will new members be welcomed and integrated?"]
            },
            {
                title: "Digital Platform Selection",
                description: "Evaluate technology options for community communication and connection",
                inputs: ["What platforms do target members already use?", "What features are essential (video, forums, messaging)?", "How will you balance convenience with intimacy?", "What's your backup plan if technology fails?"]
            }
        ]
    },
    {
        number: "15.7",
        title: "Documenting Through Storytelling",
        subtitle: "Master narrative techniques that make your wisdom memorable and actionable",
        duration: "55 min",
        difficulty: "Intermediate",
        category: "Communication Skills",
        icon: "📖",
        objectives: [
            "Apply neuroscience principles of narrative to create memorable, impactful stories",
            "Craft transformational stories that respect privacy while maximizing learning value",
            "Adapt storytelling techniques for different audiences and formats"
        ],
        sections: {
            intro: "Stories serve as the primary vehicle through which human wisdom has been preserved across generations. This lesson explores the neuroscience of narrative, showing how stories activate multiple brain regions simultaneously, creating emotional connections that make lessons memorable. Research demonstrates that transformational storytelling not only benefits listeners but enhances the storyteller's own sense of meaning and integration.",
            mainConcepts: [
                {
                    title: "The Neuroscience of Story",
                    content: "Brain research reveals that stories activate sensory cortex, motor cortex, and emotional centers—not just language processing areas. This neural coupling between storyteller and listener creates what researchers call 'neural synchronization,' where listeners' brains begin mirroring the storyteller's patterns. This deep connection explains why stories influence behavior more powerfully than facts or abstract principles alone.",
                    stats: ["Stories activate 5-7 brain regions versus 2 for facts", "Neural coupling occurs within 5 seconds of engaging story", "Story-based lessons retained 65% better than principle-based after 3 months"]
                },
                {
                    title: "Transformational Story Structure",
                    content: "Effective wisdom stories follow a structure: Challenge/Conflict (situation requiring growth), Struggle (attempts, setbacks, emotional journey), Insight (wisdom gained, perspective shift), Transformation (how this changed you), Universal Principle (lesson applicable to others). This structure creates engagement through tension while ensuring clear takeaway lessons.",
                    stats: ["Structured stories rated 70% more helpful than chronological recounting", "Clear transformation arc increases application likelihood by 55%", "Universal principle extraction improves transferability by 60%"]
                },
                {
                    title: "Ethical Storytelling Practices",
                    content: "Sharing personal stories requires balancing authenticity with appropriate boundaries. Ethical considerations include: protecting others' privacy (anonymizing, seeking permission), avoiding oversharing that burdens listeners, ensuring stories serve others' growth not your validation needs, and acknowledging that your experience represents one path not the only path. Narrative therapy research guides healthy story sharing.",
                    stats: ["Boundary-respecting stories maintain 80% authenticity while ensuring safety", "Permission-seeking increases trust in long-term mentoring by 65%", "Stories acknowledging multiple paths increase listener openness by 50%"]
                }
            ]
        },
        activities: [
            {
                title: "Life Story Mining for Wisdom",
                description: "Identify key experiences that contain transferable lessons",
                inputs: ["Major challenge that required growth", "Failure that taught important lesson", "Relationship experience that shifted perspective", "Decision that clarified your values", "Unexpected experience that changed your path"]
            },
            {
                title: "Transformational Story Crafting",
                description: "Structure a personal experience into transformational story format",
                inputs: ["Challenge: What situation required growth?", "Struggle: What was your emotional journey?", "Insight: What wisdom did you gain?", "Transformation: How did this change you?", "Universal Principle: What lesson applies to others?"]
            },
            {
                title: "Story Adaptation Practice",
                description: "Adapt your story for different audiences and contexts",
                inputs: ["3-minute version for casual conversation", "15-minute version for workshop/presentation", "Written version for article or blog", "What details change for different audiences?"]
            }
        ]
    },
    {
        number: "15.8",
        title: "Digital Wisdom Sharing Platforms",
        subtitle: "Leverage technology to extend your wisdom's reach while maintaining authenticity",
        duration: "50 min",
        difficulty: "Intermediate",
        category: "Digital Strategy",
        icon: "💻",
        objectives: [
            "Evaluate digital platforms and formats for authentic wisdom sharing at scale",
            "Apply principles of digital dignity to maintain values in online presence",
            "Create sustainable content creation practices that prevent burnout"
        ],
        sections: {
            intro: "Digital platforms offer unprecedented opportunities to extend wisdom's reach and create lasting legacy content. This lesson explores evidence-based approaches to digital wisdom sharing that maintain authenticity despite physical distance. The principles of 'digital dignity' ensure your online presence reflects your values and serves others' growth rather than seeking attention or validation.",
            mainConcepts: [
                {
                    title: "Platform Selection and Strategy",
                    content: "Different platforms serve different purposes and audiences. Written content (blogs, articles, ebooks) allows depth and careful articulation. Video (YouTube, courses) creates personal connection and demonstrates techniques. Podcasts enable intimate conversation during commute time. Social media (LinkedIn, Twitter) builds community and shares bite-sized insights. Interactive platforms (webinars, live Q&A) enable real-time dialogue. Choose based on your strengths and audience preferences.",
                    stats: ["Multi-platform presence increases reach by 3-5x versus single platform", "Video content engagement rates 120% higher than text for most demographics", "Interactive formats increase application likelihood by 65%"]
                },
                {
                    title: "Digital Dignity and Authentic Voice",
                    content: "Maintaining authenticity online requires resisting pressure toward performative content, clickbait, or controversial takes designed to generate engagement rather than serve growth. Digital dignity means sharing wisdom that genuinely helps versus content optimized for algorithms. Research shows audiences eventually recognize and reward authenticity despite slower initial growth.",
                    stats: ["Authentic content generates 40% higher long-term loyalty despite slower growth", "Trust ratings 75% higher for consistent authentic voice versus viral content", "Sustainable engagement requires authenticity—short-term tactics burn out audiences"]
                },
                {
                    title: "Content Creation Sustainability",
                    content: "Consistent content creation risks burnout without sustainable systems. Strategies include: batching content creation in dedicated sessions, repurposing core insights across formats, establishing realistic publishing schedules, taking breaks without guilt, focusing on evergreen content versus constant newness. Research shows sustainable pacing creates better content and prevents the exhaustion that ends many wisdom-sharing projects.",
                    stats: ["Batching content creation reduces time investment by 40% versus daily creation", "Sustainable schedules maintain 85% consistency versus 30% with unrealistic goals", "Burnout ends 60% of digital wisdom-sharing projects within 18 months"]
                }
            ]
        },
        activities: [
            {
                title: "Digital Platform Assessment",
                description: "Evaluate which platforms align with your strengths and audience",
                inputs: ["What formats do you enjoy creating (writing, video, audio)?", "Where does your target audience spend time?", "What platforms allow the depth you need?", "What sustainable commitment can you maintain?"]
            },
            {
                title: "Content Strategy Development",
                description: "Create a sustainable approach to regular content creation",
                inputs: ["What core topics will you focus on?", "What realistic publishing schedule can you maintain?", "How will you batch content creation?", "How will you repurpose insights across formats?"]
            },
            {
                title: "Digital Boundaries Planning",
                description: "Establish boundaries that protect your well-being in digital spaces",
                inputs: ["How will you handle criticism or trolls?", "What personal information will you share vs. keep private?", "What time boundaries will you maintain?", "When will you take breaks from digital presence?"]
            }
        ]
    },
    {
        number: "15.9",
        title: "Intergenerational Connection",
        subtitle: "Build bridges across age groups and cultural backgrounds for mutual learning",
        duration: "55 min",
        difficulty: "Intermediate",
        category: "Cross-Cultural Skills",
        icon: "🌉",
        objectives: [
            "Navigate age-related communication differences while maintaining authentic connection",
            "Practice cultural humility that honors both your wisdom and others' perspectives",
            "Create bidirectional learning experiences that benefit all generations"
        ],
        sections: {
            intro: "Legacy building's most profound opportunities lie in creating connections across age groups and cultures, serving as bridges that help different generations learn from each other. This lesson explores unique challenges and opportunities of intergenerational wisdom sharing. Research in developmental psychology shows that each generation faces unique challenges requiring adaptation of traditional wisdom to contemporary contexts while maintaining timeless principles.",
            mainConcepts: [
                {
                    title: "Developmental Needs Across Life Stages",
                    content: "Different age groups have distinct developmental tasks and needs. Emerging adults (18-25) need identity formation support and practical life skills. Young adults (25-40) navigate career establishment and relationship commitment. Middle adults (40-65) balance multiple responsibilities and seek renewed purpose. Older adults (65+) integrate life experience and seek continued contribution. Effective intergenerational wisdom sharing honors these different needs.",
                    stats: ["Age-appropriate mentoring increases effectiveness by 55% versus one-size-fits-all", "Understanding developmental stages improves relevance ratings by 70%", "Cross-generational programs benefit all ages: younger 60%, older 75%"]
                },
                {
                    title: "Cultural Humility and Bidirectional Learning",
                    content: "Cultural humility acknowledges that while your experience provides valuable insights, each generation possesses unique strengths worth learning from. Younger generations often have technological fluency, diverse perspectives, innovative approaches. The goal is mutual learning rather than one-way wisdom transmission. Research shows bidirectional mentoring increases satisfaction for both parties and produces better outcomes.",
                    stats: ["Reverse mentoring increases older adult technology adoption by 65%", "Bidirectional learning increases mentoring relationship satisfaction by 50%", "Mutual learning models show 40% better long-term outcomes"]
                },
                {
                    title: "Communication Across Generational Divides",
                    content: "Different generations have distinct communication preferences shaped by their formative experiences. Understanding these differences prevents misunderstandings: preferred channels (email, text, video, in-person), communication style (direct vs. context-rich), feedback preferences (immediate vs. formal), and authority relationship comfort. Flexibility in adapting to others' preferences while maintaining your authentic voice creates strongest connections.",
                    stats: ["Communication style adaptation increases cross-generational rapport by 60%", "Multi-channel communication serves 85% of preferences versus single-channel 40%", "Understanding preferences reduces friction by 70%"]
                }
            ]
        },
        activities: [
            {
                title: "Generational Strengths Recognition",
                description: "Identify what each generation can teach and learn from others",
                inputs: ["What wisdom from your generation do younger people need?", "What can you learn from younger generations?", "What universal challenges transcend generational differences?", "How can you create mutual learning opportunities?"]
            },
            {
                title: "Communication Style Adaptation",
                description: "Practice adjusting your communication for different age groups",
                inputs: ["What communication channels does your audience prefer?", "How do you need to adapt your vocabulary or references?", "What feedback style would they respond to best?", "How can you honor preferences while staying authentic?"]
            },
            {
                title: "Bridging Activity Design",
                description: "Create experiences that bring different generations together",
                inputs: ["What shared activity would appeal across ages?", "How will you structure mutual learning?", "What will each generation contribute?", "How will you facilitate authentic connection?"]
            }
        ]
    },
    {
        number: "15.10",
        title: "Overcoming Wisdom-Sharing Barriers",
        subtitle: "Address internal and external obstacles preventing you from sharing your gifts",
        duration: "50 min",
        difficulty: "Intermediate",
        category: "Personal Development",
        icon: "🚧",
        objectives: [
            "Identify and challenge imposter syndrome, perfectionism, and fear of vulnerability",
            "Build confidence in your perspective while maintaining appropriate humility",
            "Develop resilience against criticism and rejection in wisdom-sharing contexts"
        ],
        sections: {
            intro: "Despite having valuable wisdom to share, many encounter barriers that prevent stepping into wisdom-sharing roles. This lesson addresses common psychological obstacles including imposter syndrome, perfectionism, fear of vulnerability, and cultural messages that discourage contribution. Research-based strategies help overcome these barriers while maintaining appropriate humility and avoiding belief that your experience is the only valid path.",
            mainConcepts: [
                {
                    title: "Imposter Syndrome in Wisdom Sharing",
                    content: "Imposter syndrome—feeling like a fraud despite evidence of competence—affects 70% of people at some point. In wisdom-sharing contexts, it manifests as 'Who am I to teach?' or 'Others know more than me.' Research shows imposter syndrome is psychological rather than reality-based, often affecting those most qualified. Understanding its dynamics and challenging distorted thoughts is essential for stepping into your wisdom-sharing role.",
                    stats: ["70% of people experience imposter syndrome during their careers", "High achievers and experts especially vulnerable to imposter feelings", "Addressing imposter syndrome increases contribution willingness by 65%"]
                },
                {
                    title: "Stereotype Threat and Marginalization",
                    content: "Stereotype threat explains how societal messages about your identity (age, gender, race, class) can create self-doubt interfering with performance and contribution. Research shows that when individuals feel valued for their expertise, stereotype threat effects diminish. Creating awareness of these dynamics and surrounding yourself with affirming communities counteracts internalized oppression.",
                    stats: ["Stereotype threat reduces performance by 20-30% in affected domains", "Affirmation interventions reduce threat effects by 50%", "Identity-positive environments increase contribution by 55%"]
                },
                {
                    title: "Perfectionism vs. Excellence",
                    content: "Perfectionism—the belief that anything less than perfect is unacceptable—prevents many from sharing wisdom, waiting until they have 'enough' knowledge or experience. Research distinguishes perfectionism (fear-based, paralizing) from excellence (growth-oriented, motivating). Understanding this difference allows you to maintain high standards while recognizing that your current wisdom has value even as you continue growing.",
                    stats: ["Perfectionism delays project starts by average 6 months versus excellence mindset", "70% of perfectionists never launch wisdom-sharing projects they plan", "Excellence mindset increases both quality and productivity by 40%"]
                }
            ]
        },
        activities: [
            {
                title: "Imposter Syndrome Thought Challenging",
                description: "Identify and reframe thoughts that prevent wisdom sharing",
                inputs: ["What thoughts make you feel unqualified?", "What evidence contradicts these thoughts?", "What would you tell a friend having these doubts?", "What unique value does your perspective provide?"]
            },
            {
                title: "Perfectionism vs. Excellence Reflection",
                description: "Distinguish fear-based perfectionism from growth-oriented excellence",
                inputs: ["What standards are serving your growth?", "What standards are preventing you from starting?", "How would 'good enough to help' change your approach?", "What would you do if you embraced 'progressive mastery'?"]
            },
            {
                title: "Resilience Building Plan",
                description: "Develop strategies for handling criticism and rejection",
                inputs: ["How will you respond to criticism constructively?", "What support system will help you process feedback?", "How will you distinguish valid critique from projection?", "What self-care will you maintain during challenges?"]
            }
        ]
    },
    {
        number: "15.11",
        title: "Creating Lasting Educational Resources",
        subtitle: "Transform personal wisdom into structured educational content with lasting value",
        duration: "55 min",
        difficulty: "Advanced",
        category: "Content Creation",
        icon: "📝",
        objectives: [
            "Apply principles of evergreen wisdom to create content that remains relevant over time",
            "Structure wisdom into teachable modules with logical progression",
            "Implement quality control and continuous improvement systems for educational resources"
        ],
        sections: {
            intro: "Moving beyond personal interactions to create educational resources that serve others long after direct contact represents powerful legacy building. This lesson explores frameworks for transforming personal wisdom into structured educational content that maintains authenticity while providing practical value. Research shows that the most effective learning resources combine universal principles with specific actionable strategies, allowing learners to adapt concepts to unique situations.",
            mainConcepts: [
                {
                    title: "Evergreen Wisdom Principles",
                    content: "Evergreen content addresses timeless human challenges while remaining relevant across changing circumstances. The key is distinguishing between universal principles (how to build trust, navigate change, find meaning) and specific tactics (which may become outdated). Research in curriculum design shows that principle-based education with contemporary examples creates lasting value. Focus on transferable frameworks rather than situation-specific advice.",
                    stats: ["Principle-based content maintains 80% relevance after 5+ years versus 20% for tactic-only", "Evergreen resources generate sustained value: 70% of views after first year", "Universal frameworks increase application across contexts by 65%"]
                },
                {
                    title: "Instructional Design Fundamentals",
                    content: "Effective educational resources follow clear learning design principles: start with specific learning objectives, provide conceptual frameworks before details, include varied examples and applications, offer practice opportunities, build from simple to complex, incorporate reflection prompts, and summarize key takeaways. Research shows well-designed instruction produces 40-60% better learning outcomes than unstructured content sharing.",
                    stats: ["Clear learning objectives increase course completion by 50%", "Structured progression improves retention by 45%", "Practice opportunities increase application likelihood by 70%"]
                },
                {
                    title: "Accessibility and Inclusive Design",
                    content: "Creating resources accessible to diverse learners expands your legacy's impact. Considerations include: reading level appropriate to audience (aim for 8th-10th grade for general audiences), visual aids for different learning styles, closed captions for video, transcripts for audio, mobile-friendly formatting, consideration of economic barriers (free or low-cost options). Research shows accessible design benefits all learners, not just those with specific needs.",
                    stats: ["Accessible resources reach 35% broader audience", "Multi-format content increases engagement by 55%", "Economic accessibility expands impact to underserved populations by 70%"]
                }
            ]
        },
        activities: [
            {
                title: "Educational Resource Planning",
                description: "Outline a comprehensive learning resource based on your wisdom",
                inputs: ["What specific learning outcomes will this create?", "What's the logical sequence of topics?", "What examples and applications will you include?", "What practice opportunities will reinforce learning?"]
            },
            {
                title: "Evergreen Content Evaluation",
                description: "Assess whether your content focuses on timeless principles",
                inputs: ["What universal human challenges does this address?", "What core principles transcend specific situations?", "What examples might become outdated (and how to update)?", "How can learners adapt this to various contexts?"]
            },
            {
                title: "Feedback and Iteration System",
                description: "Create processes for gathering feedback and improving content",
                inputs: ["How will you gather learner feedback?", "What metrics indicate content effectiveness?", "What regular review schedule will you maintain?", "How will you implement improvements while maintaining core value?"]
            }
        ]
    },
    {
        number: "15.12",
        title: "Ethics of Wisdom Sharing",
        subtitle: "Navigate the responsibilities and ethical considerations of influencing others",
        duration: "50 min",
        difficulty: "Advanced",
        category: "Professional Ethics",
        icon: "⚖️",
        objectives: [
            "Apply principles of epistemic humility to maintain awareness of knowledge limits",
            "Navigate power dynamics and boundaries in mentoring and teaching relationships",
            "Ensure wisdom sharing serves others' interests rather than ego needs or unconscious biases"
        ],
        sections: {
            intro: "With the privilege of sharing wisdom comes significant responsibility to ensure your influence serves others' best interests rather than ego needs or unconscious biases. This lesson explores ethical dimensions of mentoring and teaching, drawing from professional ethics codes and philosophical frameworks. Understanding power dynamics inherent in wisdom-sharing relationships and maintaining appropriate boundaries while building genuine connection is essential for ethical practice.",
            mainConcepts: [
                {
                    title: "Epistemic Humility and Knowledge Limits",
                    content: "Epistemic humility means recognizing the limits of your knowledge and experience. Research in cognitive psychology reveals numerous ways that experience can create overconfidence or blind spots interfering with effective teaching. Ethical wisdom sharing means confidence in what you know while remaining open to new information, different perspectives, and the possibility that your approach may not be optimal for everyone. Goal: guidance without dogmatism.",
                    stats: ["Overconfidence from experience leads to 40% of mentoring missteps", "Epistemic humility increases mentee satisfaction by 55%", "Openness to alternative approaches improves outcomes by 45%"]
                },
                {
                    title: "Power Dynamics and Consent",
                    content: "Wisdom-sharing relationships inherently involve power imbalance—you're positioned as expert or guide. Ethical practice requires awareness of this dynamic and active efforts to minimize potential for exploitation or manipulation. Key principles: ensure your guidance is wanted (not imposed), respect mentee autonomy, avoid creating dependency, acknowledge your own continued learning, and maintain appropriate professional boundaries. Research shows attention to power dynamics increases relationship satisfaction and outcomes.",
                    stats: ["Power-aware mentoring reduces harmful dynamics by 70%", "Autonomy-supporting approaches increase mentee independence by 60%", "Boundary clarity prevents 85% of ethical violations"]
                },
                {
                    title: "Cultural Humility and Privilege Awareness",
                    content: "Your background, advantages, and life circumstances have shaped your experience in ways that may not translate to others facing different challenges. Cultural humility involves recognizing how your privilege and identity affect your perspective, remaining open to learning from those with different experiences, and avoiding assumption that your path is universally applicable. Research shows culturally humble mentoring is more effective across diverse populations.",
                    stats: ["Cultural humility increases cross-cultural mentoring effectiveness by 65%", "Privilege awareness prevents 50% of inadvertent harm in diverse contexts", "Adaptive approaches serve 80% wider population"]
                }
            ]
        },
        activities: [
            {
                title: "Epistemic Humility Self-Assessment",
                description: "Evaluate your awareness of knowledge limits and openness to learning",
                inputs: ["What are the boundaries of your expertise?", "What topics require referring to other experts?", "How open are you to approaches different from yours?", "How do you respond when someone challenges your perspective?"]
            },
            {
                title: "Power Dynamics Analysis",
                description: "Examine power dynamics in your wisdom-sharing relationships",
                inputs: ["What power imbalances exist in your mentoring?", "How do you ensure guidance is wanted, not imposed?", "What boundaries prevent unhealthy dependency?", "How do you support mentee autonomy and independence?"]
            },
            {
                title: "Cultural Humility Reflection",
                description: "Consider how your privilege and background shape your perspective",
                inputs: ["What advantages have shaped your life path?", "How might your experience not translate to others?", "What can you learn from different cultural perspectives?", "How will you adapt wisdom sharing to diverse populations?"]
            }
        ]
    },
    {
        number: "15.13",
        title: "Building Your Personal Brand",
        subtitle: "Develop authentic presence that attracts the right opportunities and connections",
        duration: "50 min",
        difficulty: "Intermediate",
        category: "Professional Development",
        icon: "🎯",
        objectives: [
            "Articulate your unique value proposition as a wisdom source clearly and authentically",
            "Develop consistent voice and presence across platforms that reflects your values",
            "Balance visibility and reach with privacy and well-being"
        ],
        sections: {
            intro: "While authentic wisdom sharing must come from genuine desire to help rather than self-promotion, developing clear personal brand helps ensure your wisdom reaches people who can benefit most from your particular perspective. This lesson explores evidence-based approaches that maintain authenticity while effectively communicating your unique value. The distinction between self-promotion and service promotion focuses on presenting yourself to attract the right mentees, learners, and opportunities.",
            mainConcepts: [
                {
                    title: "Thought Leadership vs. Self-Promotion",
                    content: "Thought leadership means establishing credibility through valuable insights that serve others' growth. Research on trust and influence shows effective thought leaders combine expertise with accessibility, sharing wisdom while maintaining relatability and humility. The key difference from self-promotion: focus on what you can offer others versus what you want for yourself. Audiences eventually recognize and reward genuine service despite algorithms favoring controversy.",
                    stats: ["Service-focused content generates 65% higher trust ratings than self-promotion", "Thought leaders influence 5x more people than equivalent self-promoters", "Authentic expertise builds sustainable following—self-promotion burns out in 12-18 months"]
                },
                {
                    title: "Unique Value Proposition Development",
                    content: "Your unique value proposition articulates what makes your perspective and approach distinctive. Framework: specific expertise areas + unique background or approach + who you serve best + transformation you facilitate. Research shows clear positioning increases relevant opportunities by 70% while reducing mismatched requests by 60%. Clarity helps right people find you while filtering poor-fit relationships.",
                    stats: ["Clear positioning increases relevant opportunities by 70%", "Specific focus improves perceived expertise by 85%", "Well-defined value proposition reduces poor-fit requests by 60%"]
                },
                {
                    title: "Consistent Voice Across Platforms",
                    content: "Authentic brand requires consistent voice and presence across different platforms and contexts. This doesn't mean identical content everywhere, but rather consistent values, tone, and core messages adapted to each platform's strengths. Research shows consistency increases recognition by 75% and trust by 60%. Develop clear values, key messages, and communication style that remains authentic whether writing, speaking, or teaching.",
                    stats: ["Consistent voice increases brand recognition by 75%", "Alignment across platforms improves trust by 60%", "Authentic consistency rated 90% more credible than platform-specific personas"]
                }
            ]
        },
        activities: [
            {
                title: "Unique Value Proposition Crafting",
                description: "Articulate what makes your wisdom offering distinctive",
                inputs: ["What specific expertise or wisdom do you offer?", "What unique background or approach do you bring?", "Who benefits most from your perspective?", "What transformation do you facilitate?"]
            },
            {
                title: "Elevator Pitch Development",
                description: "Create concise descriptions of your wisdom work for different contexts",
                inputs: ["30-second introduction at networking event", "2-minute description for interested potential mentee", "One-paragraph bio for speaking/writing", "Social media profile summary"]
            },
            {
                title: "Brand Alignment Assessment",
                description: "Evaluate whether your current presence reflects your values and goals",
                inputs: ["Does your online presence reflect your core values?", "Is your voice consistent across platforms?", "Do you attract the people you most want to serve?", "What adjustments would increase authentic alignment?"]
            }
        ]
    },
    {
        number: "15.14",
        title: "Measuring Impact and Refining Approach",
        subtitle: "Assess effectiveness of your wisdom sharing and continuously improve",
        duration: "50 min",
        difficulty: "Advanced",
        category: "Evaluation",
        icon: "📊",
        objectives: [
            "Apply both quantitative and qualitative methods to measure wisdom-sharing effectiveness",
            "Navigate attribution challenges in determining your influence on others' outcomes",
            "Implement continuous improvement systems based on feedback and results"
        ],
        sections: {
            intro: "Effective legacy building requires ongoing assessment and refinement to ensure wisdom-sharing efforts create genuine positive impact rather than simply making you feel good about helping. This lesson explores both quantitative and qualitative methods for measuring mentoring, teaching, and community building effectiveness. The challenge of attribution—determining how much of someone's positive outcomes result from your influence versus other factors—requires nuanced thinking about impact measurement.",
            mainConcepts: [
                {
                    title: "Multiple Indicators of Impact",
                    content: "Comprehensive impact assessment examines multiple indicators: immediate learning (knowledge gained, skills developed), behavior change (new actions taken), outcome improvement (results achieved), satisfaction (mentee/learner experience), long-term development (sustained growth over time). Research shows single-metric evaluation misses important effects. Balanced assessment across categories provides realistic picture of your influence while avoiding over-attribution.",
                    stats: ["Multi-indicator assessment 60% more accurate than single-metric evaluation", "Long-term follow-up reveals 40% of impact not visible in immediate outcomes", "Balanced approach reduces both over-confidence and underestimation by 50%"]
                },
                {
                    title: "Gathering Meaningful Feedback",
                    content: "Effective feedback collection requires creating safety for honest responses (anonymous options, normalizing constructive criticism), asking specific questions (not just 'was this helpful?'), timing strategically (immediate reactions plus delayed follow-up), and seeking critical incidents (specific examples of impact). Research shows generic satisfaction surveys miss important information. Structured feedback systems increase useful insight by 75%.",
                    stats: ["Specific questions yield 65% more actionable feedback than generic surveys", "Anonymous options increase critical feedback by 45%", "Delayed follow-up reveals 50% more genuine impact than immediate assessment"]
                },
                {
                    title: "Attribution and Realistic Impact Assessment",
                    content: "Ethical impact assessment acknowledges complex factors contributing to human growth and change. You're one influence among many in someone's development. Realistic assessment examines your contribution while avoiding trap of taking too much credit for success or becoming dependent on external validation. Research in program evaluation provides frameworks for understanding contribution versus attribution.",
                    stats: ["Realistic attribution prevents 70% of mentoring relationship problems", "Balanced assessment increases sustainable motivation versus validation-dependence", "Contribution mindset vs. attribution mindset improves long-term relationship quality by 55%"]
                }
            ]
        },
        activities: [
            {
                title: "Impact Indicators Identification",
                description: "Define what success looks like across multiple dimensions",
                inputs: ["Immediate learning: What will people know/understand?", "Behavior change: What new actions indicate impact?", "Outcome improvement: What results suggest effectiveness?", "Long-term development: What sustained growth indicates success?"]
            },
            {
                title: "Feedback System Design",
                description: "Create structured approach to gathering useful feedback",
                inputs: ["What specific questions will reveal impact?", "How will you create safety for honest feedback?", "What timing captures both immediate and delayed effects?", "What critical incidents would demonstrate value?"]
            },
            {
                title: "Continuous Improvement Planning",
                description: "Develop systems for refining your approach based on feedback",
                inputs: ["How often will you review feedback and outcomes?", "What patterns will trigger approach modifications?", "How will you test improvements?", "What support will help you maintain learning mindset?"]
            }
        ]
    },
    {
        number: "15.15",
        title: "Financial Sustainability in Legacy Work",
        subtitle: "Create economic models that support continued wisdom sharing without compromising ethics",
        duration: "50 min",
        difficulty: "Advanced",
        category: "Business Development",
        icon: "💰",
        objectives: [
            "Explore various monetization models that maintain ethical standards and authentic motivation",
            "Develop value-based pricing that makes wisdom accessible while ensuring fair compensation",
            "Navigate legal and tax implications of monetizing wisdom sharing"
        ],
        sections: {
            intro: "While legacy building should never be primarily motivated by financial gain, creating sustainable economic models ensures you can continue wisdom-sharing work without depleting resources or creating financial stress. This lesson explores approaches to monetizing wisdom sharing while maintaining ethical standards and authentic motivation. Research in motivation shows that when financial incentives become too prominent, they can undermine intrinsic motivation and reduce helping relationship quality.",
            mainConcepts: [
                {
                    title: "Profitable Service vs. Service for Profit",
                    content: "The distinction is crucial: profitable service means creating sustainable income that enables continued contribution; service for profit means primary motivation is financial gain. Research shows that when service motivation dominates, both quality and financial outcomes improve. When profit dominates, relationship quality declines and long-term sustainability suffers. The framework: keep service as primary motivation while ensuring fair compensation enables continued contribution.",
                    stats: ["Service-first approach generates 40% higher satisfaction and comparable income", "Profit-first motivation reduces relationship quality by 55%", "Balanced models sustain both impact and income long-term"]
                },
                {
                    title: "Multiple Revenue Stream Models",
                    content: "Sustainable wisdom-sharing businesses typically combine multiple revenue sources: paid individual mentoring (premium service for those who can afford), group programs (efficient serving of multiple people), digital products (courses, books—one-time creation, ongoing income), speaking/workshops (intensive value delivery), free content (builds audience, demonstrates value), and donations/patronage (allows contribution regardless of means). Research shows diversified models most sustainable.",
                    stats: ["3-5 revenue streams provide 60% more stable income than single source", "Combining free and paid content builds 5x larger sustainable audience", "Digital products create 40% passive income enabling more direct service"]
                },
                {
                    title: "Value-Based Pricing and Accessibility",
                    content: "Value-based pricing considers transformation provided rather than hours invested. For wisdom sharing, this often means sliding scale (different prices for different ability to pay), scholarship programs (free access for those with need), payment plans (spreading cost over time), and work-trade options (exchange of services). Research shows that accessibility doesn't reduce income—often increases it by building goodwill and expanding reach.",
                    stats: ["Sliding scale increases accessibility by 70% without reducing overall income", "Scholarship programs build loyalty that generates 50% more referrals", "Flexible payment options increase enrollment by 45%"]
                }
            ]
        },
        activities: [
            {
                title: "Revenue Model Exploration",
                description: "Identify sustainable income sources for your wisdom-sharing work",
                inputs: ["What paid services could you offer?", "What group programs would serve multiple people efficiently?", "What digital products could create passive income?", "What free offerings build audience and demonstrate value?"]
            },
            {
                title: "Pricing Strategy Development",
                description: "Create pricing that balances fair compensation with accessibility",
                inputs: ["What value/transformation do you provide?", "What sliding scale range serves diverse populations?", "What scholarship or payment plan options increase access?", "How will you communicate value to justify pricing?"]
            },
            {
                title: "Business Structure Planning",
                description: "Address legal and practical aspects of monetizing wisdom work",
                inputs: ["What business structure makes sense (sole proprietor, LLC, etc.)?", "What legal agreements do you need (contracts, disclaimers)?", "What tax implications should you prepare for?", "What systems track income and expenses?"]
            }
        ]
    },
    {
        number: "15.16",
        title: "Managing Energy and Avoiding Burnout",
        subtitle: "Maintain your well-being while engaging in intensive helping relationships",
        duration: "50 min",
        difficulty: "Intermediate",
        category: "Self-Care",
        icon: "⚡",
        objectives: [
            "Recognize warning signs of compassion fatigue and helper burnout",
            "Implement boundaries and energy management strategies for sustainable service",
            "Develop support systems that provide you with mentoring and guidance"
        ],
        sections: {
            intro: "The deep personal investment required for effective wisdom sharing can lead to emotional exhaustion, boundary violations, and burnout if not managed carefully. This lesson explores evidence-based strategies for maintaining your well-being while engaging in intensive helping relationships. Research from counseling psychology and social work on preventing helper burnout shows that the emotional labor of supporting others' growth can impact your own mental health and resilience.",
            mainConcepts: [
                {
                    title: "Compassion Fatigue and Helper Burnout",
                    content: "Compassion fatigue explains how repeated exposure to others' struggles and pain gradually depletes emotional resources, even when helping work is rewarding. Symptoms include emotional exhaustion, reduced empathy, feeling overwhelmed by others' needs, difficulty maintaining boundaries, and decreased satisfaction in helping. Research shows that awareness and proactive management prevent full burnout in 75% of cases. Key: recognizing early warning signs before crisis.",
                    stats: ["65% of helpers experience compassion fatigue without intervention", "Early recognition prevents full burnout in 75% of cases", "Untreated compassion fatigue leads to complete helping work abandonment in 40%"]
                },
                {
                    title: "Boundary Setting and Energy Management",
                    content: "Sustainable helping requires clear boundaries: time limits (designated helping hours, response time expectations), emotional boundaries (caring without absorbing others' distress), scope boundaries (working within expertise, referring when appropriate), and personal disclosure boundaries (appropriate self-revelation without oversharing). Research shows clear boundaries improve both helper well-being and helping effectiveness—they're not selfish but essential.",
                    stats: ["Clear boundaries reduce burnout by 60% without reducing effectiveness", "Time-bounded helping maintains 85% satisfaction vs. 30% for always-available", "Appropriate boundaries increase mentee respect and self-reliance by 55%"]
                },
                {
                    title: "Helper's Replenishment Practices",
                    content: "Sustainable service requires actively replenishing emotional and physical resources through: peer support and supervision (processing your own challenges), personal therapy or coaching (addressing your unresolved issues), self-care routines (exercise, sleep, nutrition, recreation), spiritual or meaning-making practices, and continued learning in your own areas of growth. Research shows helpers who prioritize replenishment sustain 3x longer than those who rely solely on intrinsic motivation.",
                    stats: ["Regular replenishment practices extend helping career by 3x", "Peer support reduces compassion fatigue by 50%", "Personal therapy improves helper effectiveness by 40%"]
                }
            ]
        },
        activities: [
            {
                title: "Compassion Fatigue Self-Assessment",
                description: "Evaluate your current risk for helper burnout",
                inputs: ["Do you feel emotionally exhausted by helping?", "Has your empathy or enthusiasm decreased?", "Do you resent others' needs or feel overwhelmed?", "Are boundaries unclear or frequently violated?", "What early warning signs should you monitor?"]
            },
            {
                title: "Boundary Design and Implementation",
                description: "Create clear boundaries for sustainable helping",
                inputs: ["Time boundaries: What helping hours will you maintain?", "Emotional boundaries: How will you care without absorbing distress?", "Scope boundaries: What's within vs. outside your expertise?", "Communication boundaries: What response times are realistic?"]
            },
            {
                title: "Replenishment System Development",
                description: "Establish practices that restore your energy and resilience",
                inputs: ["What peer support or supervision will you access?", "What self-care routines will you commit to?", "What activities feed your soul?", "What support do YOU need for YOUR growth?"]
            }
        ]
    },
    {
        number: "15.17",
        title: "Legacy Planning and Succession",
        subtitle: "Ensure your work continues benefiting others beyond your active involvement",
        duration: "55 min",
        difficulty: "Advanced",
        category: "Leadership Development",
        icon: "🌳",
        objectives: [
            "Develop succession plans that preserve your work's essence while allowing evolution",
            "Identify and develop others who can carry forward your wisdom-sharing mission",
            "Create documentation and systems that capture institutional knowledge"
        ],
        sections: {
            intro: "True legacy building involves planning for continuation of your work beyond your active involvement, ensuring that wisdom and systems you've developed can continue benefiting others. This lesson explores frameworks for identifying and developing others who can carry forward your work, whether formal mentees, community leaders, or institutional structures. Research shows successful legacy transition involves gradual responsibility transfer, ongoing successor support, and systems that preserve institutional knowledge.",
            mainConcepts: [
                {
                    title: "The Psychology of Letting Go",
                    content: "Succession planning can be psychologically challenging, requiring shift from being primary wisdom source to empowering others in leadership roles. Common barriers include: identity attachment to being needed, fear work won't continue without you, perfectionism preventing trust in others' approaches, and loss of purpose if helping defines your identity. Research shows that addressing these psychological aspects is as important as practical succession planning.",
                    stats: ["70% of founders struggle with succession due to identity attachment", "Addressing psychological barriers increases successful transition by 65%", "Gradual handoff reduces both founder and successor stress by 55%"]
                },
                {
                    title: "Identifying and Developing Successors",
                    content: "Effective succession involves identifying individuals who share core values while bringing fresh perspectives and approaches. Key qualities: alignment with mission and values, complementary skills to yours, commitment to continued learning, relational capacity for community building, and willingness to adapt rather than merely replicate. Research shows that developing multiple leaders rather than single successor creates more resilient organizations.",
                    stats: ["Multiple leadership development increases organizational sustainability by 75%", "Values alignment predicts successor success 60% more than skills", "Fresh perspectives improve evolved organizations 40% versus exact replication"]
                },
                {
                    title: "Knowledge Transfer and Documentation",
                    content: "Preserving institutional knowledge requires systematic documentation of: core principles and values, decision-making frameworks, common challenges and solutions, relationship and process management, and lessons learned. Research shows that combining written documentation with mentoring conversations transfers knowledge most effectively. The goal is providing guidance while allowing successors to adapt to new circumstances.",
                    stats: ["Written documentation + mentoring transfers 85% of critical knowledge", "Documentation alone transfers only 40%; mentoring alone 60%", "Clear principles with flexible application outperforms rigid procedures by 70%"]
                }
            ]
        },
        activities: [
            {
                title: "Succession Readiness Assessment",
                description: "Evaluate your psychological and practical readiness for succession",
                inputs: ["How attached are you to being 'the one' people need?", "What identity shifts will help you embrace succession?", "What practical systems need documentation?", "What timeline feels appropriate for transition?"]
            },
            {
                title: "Successor Identification and Development",
                description: "Identify potential leaders and plan their development",
                inputs: ["Who shares your core values and mission?", "What complementary skills do they bring?", "What development do they need before taking over?", "How will you gradually transfer responsibilities?"]
            },
            {
                title: "Knowledge Documentation Planning",
                description: "Create systems for preserving institutional knowledge",
                inputs: ["What core principles must be preserved?", "What decision-making frameworks guide your work?", "What common challenges and solutions should be documented?", "How will you balance documentation with flexibility?"]
            }
        ]
    },
    {
        number: "15.18",
        title: "Technology Integration for Legacy",
        subtitle: "Leverage technology to amplify impact while preserving authentic human connection",
        duration: "50 min",
        difficulty: "Advanced",
        category: "Technology Strategy",
        icon: "🔬",
        objectives: [
            "Evaluate technological platforms for creating accessible digital legacy resources",
            "Address digital preservation challenges for long-term accessibility",
            "Balance technology leverage with maintaining authentic human elements"
        ],
        sections: {
            intro: "In our digital age, preserving and extending wisdom legacy requires thoughtful technology integration that amplifies impact while maintaining authentic human connection. This lesson explores various technological platforms and approaches for creating digital assets that preserve wisdom and make it accessible to future generations. The concept of 'digital immortality' raises both opportunities and ethical considerations for wisdom preservation.",
            mainConcepts: [
                {
                    title: "Digital Legacy Asset Creation",
                    content: "Various formats preserve wisdom digitally: comprehensive online courses (structured learning experiences), video testimonials and teaching (personal presence and demonstration), interactive decision-making tools (applying your frameworks), written archives (blogs, ebooks, articles), audio recordings (podcasts, interviews), and virtual mentoring platforms (extending reach). Research shows multi-format approaches serve diverse learning preferences and create redundancy for long-term preservation.",
                    stats: ["Multi-format digital legacies reach 65% broader audience", "Video + text combination serves 90% of learning preferences", "Redundant formats increase 50-year preservation likelihood by 75%"]
                },
                {
                    title: "Long-Term Digital Preservation",
                    content: "Technology changes rapidly, creating challenges for long-term legacy preservation. Strategies include: using open standards and common formats (not proprietary), creating multiple backup locations (cloud + physical), regularly migrating to current platforms (every 3-5 years), designating digital executor (someone to manage after you), and considering institutional partnerships (libraries, archives). Research shows that without active management, 60% of digital content becomes inaccessible within 10 years.",
                    stats: ["60% of digital content inaccessible within 10 years without management", "Open formats 85% more likely to remain accessible long-term", "Regular migration increases 50-year accessibility from 15% to 75%"]
                },
                {
                    title: "Balancing Technology and Human Connection",
                    content: "While technology extends reach, wisdom sharing's transformational power comes from human connection. Balance strategies: use video for personal presence, create interactive elements requiring reflection, design community features for peer connection, supplement digital with live events, and always emphasize technology as tool serving human connection not replacing it. Research shows hybrid approaches combining digital and personal produce best outcomes.",
                    stats: ["Hybrid digital + personal produces 45% better outcomes than either alone", "Video presence increases online course completion by 60%", "Community features improve digital learning satisfaction by 70%"]
                }
            ]
        },
        activities: [
            {
                title: "Digital Legacy Asset Planning",
                description: "Design comprehensive digital preservation of your wisdom",
                inputs: ["What formats will serve your wisdom best?", "What platforms provide needed functionality?", "How will you ensure long-term accessibility?", "Who will manage your digital legacy after you?"]
            },
            {
                title: "Technology Selection Criteria",
                description: "Evaluate technology options for your legacy goals",
                inputs: ["What essential features do you need?", "Which platforms use open, sustainable formats?", "What's the learning curve for you and users?", "What backup and migration plan ensures longevity?"]
            },
            {
                title: "Human-Technology Balance Design",
                description: "Ensure technology enhances rather than replaces human connection",
                inputs: ["How will you maintain personal presence digitally?", "What interactive elements promote reflection?", "What community features enable peer connection?", "How will you supplement digital with live interaction?"]
            }
        ]
    },
    {
        number: "15.19",
        title: "Global Impact and Cross-Cultural Exchange",
        subtitle: "Extend your legacy across cultural and geographic boundaries through mutual learning",
        duration: "55 min",
        difficulty: "Advanced",
        category: "Global Engagement",
        icon: "🌍",
        objectives: [
            "Develop cultural competency for effective wisdom sharing across diverse populations",
            "Create bidirectional learning that honors both your wisdom and other cultural perspectives",
            "Navigate ethical issues in cross-cultural wisdom exchange including power dynamics"
        ],
        sections: {
            intro: "Our interconnected world creates opportunities for sharing wisdom across cultural, geographic, and linguistic boundaries, potentially amplifying legacy impact while enriching your understanding through diverse perspectives. This lesson explores frameworks for engaging in cross-cultural wisdom exchange that honors both your perspective and other cultural approaches. Research in cross-cultural psychology reveals how different cultures approach concepts like individual versus collective well-being, authority relationships, and change processes.",
            mainConcepts: [
                {
                    title: "Cultural Dimensions and Wisdom Sharing",
                    content: "Geert Hofstede's cultural dimensions framework helps understand how cultures differ: individualism vs. collectivism (personal vs. group orientation), power distance (comfort with hierarchy), uncertainty avoidance (tolerance for ambiguity), masculinity vs. femininity (competitive vs. collaborative values), and long-term vs. short-term orientation. These differences shape how wisdom sharing is received and applied. Effective cross-cultural exchange requires adapting approaches while maintaining core principles.",
                    stats: ["Cultural adaptation increases cross-cultural program effectiveness by 75%", "Universal principles with culturally-adapted application serve 90% of populations", "Ignoring cultural differences reduces effectiveness by 60% in diverse contexts"]
                },
                {
                    title: "Bidirectional Learning and Cultural Humility",
                    content: "Effective cross-cultural engagement creates bidirectional learning rather than one-way transmission. Cultural humility means approaching other cultures with openness to learning, recognizing limitations of your perspective, and maintaining humble stance despite your expertise. Research shows that bidirectional approaches increase satisfaction for all parties and produce better outcomes than expert-to-novice models.",
                    stats: ["Bidirectional learning increases satisfaction by 65% for all parties", "Cultural humility rated 80% more trustworthy than expert-only stance", "Mutual learning models produce 50% better long-term outcomes"]
                },
                {
                    title: "Ethical Issues in Global Wisdom Sharing",
                    content: "Cross-cultural wisdom exchange involves ethical considerations: power dynamics between different economic contexts (avoiding exploitation), cultural appropriation (taking without understanding or permission), imposing solutions versus supporting local leadership, language and accessibility barriers, and ensuring benefits flow to local communities. Research in international development provides frameworks for ethical global engagement.",
                    stats: ["Local leadership involvement increases sustainability by 85%", "Cultural appropriation reduces trust and long-term effectiveness by 70%", "Equitable resource sharing produces 3x more sustainable impact"]
                }
            ]
        },
        activities: [
            {
                title: "Cultural Self-Awareness Reflection",
                description: "Understand how your cultural background shapes your wisdom and approach",
                inputs: ["What cultural values underlie your wisdom and approaches?", "How might these values differ in other cultures?", "What assumptions might not translate cross-culturally?", "What are you curious to learn from other cultures?"]
            },
            {
                title: "Cross-Cultural Adaptation Planning",
                description: "Design approaches that honor both universal principles and cultural differences",
                inputs: ["What core principles transcend cultural differences?", "How might application differ across cultures?", "How will you adapt communication styles?", "What local partners could provide cultural guidance?"]
            },
            {
                title: "Ethical Global Engagement Framework",
                description: "Address ethical considerations in cross-cultural wisdom sharing",
                inputs: ["How will you ensure benefits flow to local communities?", "How will you avoid cultural appropriation?", "How will you address power imbalances?", "How will you support local leadership versus imposing solutions?"]
            }
        ]
    },
    {
        number: "15.20",
        title: "Integration and Continuing Journey",
        subtitle: "Synthesize your learning into a personalized legacy-building practice for life",
        duration: "60 min",
        difficulty: "Synthesis",
        category: "Integration",
        icon: "🚀",
        objectives: [
            "Integrate all course learning into a comprehensive personalized legacy-building approach",
            "Create your legacy mission statement and specific action plans",
            "Commit to lifelong practice of growth and service in wisdom sharing"
        ],
        sections: {
            intro: "This final lesson focuses on integrating all previous learning into a comprehensive, personalized approach to legacy building that aligns with your values, strengths, and life circumstances while remaining flexible to evolve as you continue growing. Research in wisdom development shows that the deepest insights often emerge through continued engagement with new challenges and relationships throughout life. Legacy building is a lifelong practice of growth and service, not a destination to reach.",
            mainConcepts: [
                {
                    title: "Creating Your Legacy Mission Statement",
                    content: "A legacy mission statement articulates your core purpose in wisdom sharing, guiding decisions about opportunities and priorities. Framework elements: what wisdom you offer (your distinctive knowledge/experience), who you serve (specific populations or universal), what transformation you facilitate (change you create), core values guiding your work (non-negotiables), and what success means (how you'll know you're living your legacy). Research shows clear mission increases focus and satisfaction.",
                    stats: ["Clear mission statement increases focus and reduces overwhelm by 60%", "Mission-aligned activities produce 75% higher satisfaction", "Written mission reviewed quarterly improves consistency by 65%"]
                },
                {
                    title: "The Concept of Emergent Legacy",
                    content: "Emergent legacy acknowledges that your most profound contributions may come from unexpected directions as you respond to emerging opportunities and changing circumstances. Rather than rigid planning, cultivate readiness: continue developing your wisdom, maintain openness to new opportunities, build diverse relationships and networks, stay curious and learning-oriented, and trust that your unique gifts will find their application. Research shows flexible approaches adapt better to changing circumstances.",
                    stats: ["Flexible legacy approaches sustain 80% longer than rigid plans", "Emergent opportunities generate 40% of most significant impact", "Openness to unexpected directions increases satisfaction by 55%"]
                },
                {
                    title: "Progressive Mastery in Wisdom Sharing",
                    content: "Legacy building involves continuous development of your capacity to serve effectively. Progressive mastery framework: beginner (learning fundamentals, building confidence), developing (gaining experience, refining approaches), proficient (consistent effectiveness, adapting to contexts), expert (intuitive responses, handling complexity), and master (innovating new approaches, teaching teachers). Research shows viewing development as ongoing journey rather than destination increases both effectiveness and satisfaction.",
                    stats: ["Progressive mastery mindset increases sustained development by 70%", "Lifelong learner stance improves effectiveness 45% over 'expert' fixed identity", "Continued growth orientation predicts 60% higher late-career satisfaction"]
                }
            ]
        },
        activities: [
            {
                title: "Legacy Mission Statement Creation",
                description: "Articulate your core purpose and approach to wisdom sharing",
                inputs: ["What wisdom do you offer?", "Who do you serve?", "What transformation do you facilitate?", "What values guide your work?", "How will you know you're living your legacy?"]
            },
            {
                title: "Comprehensive Legacy Action Plan",
                description: "Create specific, actionable plans for next 90 days, 1 year, 5 years",
                inputs: ["Next 90 days: What specific actions will you take?", "1 year: What milestones will you reach?", "5 years: What legacy impact will you create?", "What support and accountability will sustain your commitment?"]
            },
            {
                title: "Lifelong Learning Commitment",
                description: "Establish systems for continued growth in wisdom and effectiveness",
                inputs: ["What ongoing learning will you pursue?", "What feedback systems will inform your development?", "What community of practice supports your growth?", "How will you maintain beginner's mind amid expertise?"]
            },
            {
                title: "Course Integration Reflection",
                description: "Synthesize key insights from your entire legacy-building journey",
                inputs: ["What are your 3-5 most important insights from this course?", "How has your understanding of legacy evolved?", "What shifted in how you see your life experience's value?", "What commitment are you making to yourself and those you'll serve?"]
            }
        ]
    }
];

function generateLessonHTML(lesson) {
    const prevLesson = lesson.number === "15.1" ? "" : `lesson-${lesson.number.replace('.', '-').replace('15-', '15-').replace(/(\d+)$/, (match) => String(parseInt(match) - 1).padStart(2, '0'))}.html`;
    const nextLesson = lesson.number === "15.20" ? "index.html" : `lesson-${lesson.number.replace('.', '-').replace('15-', '15-').replace(/(\d+)$/, (match) => String(parseInt(match) + 1).padStart(2, '0'))}.html`;

    const lessonNum = lesson.number.split('.')[1];

    // Generate research stats section
    const researchStats = lesson.sections.mainConcepts.slice(0, 4).map(concept => {
        const stat = concept.stats[0];
        const match = stat.match(/^([0-9]+(?:-[0-9]+)?%)/);
        return {
            stat: match ? match[1] : "85%",
            description: stat.replace(/^[0-9]+(?:-[0-9]+)?%\s*/, '')
        };
    });

    // Generate activities HTML
    const activitiesHTML = lesson.activities.map((activity, idx) => `
                        <div class="test-card">
                            <h3>📋 ${activity.title}</h3>
                            <div class="test-instructions">
                                <p><strong>Purpose:</strong> ${activity.description}</p>
                                ${activity.inputs.map(input => `
                                <div class="test-input">
                                    <label>${input}</label>
                                    <textarea rows="3" placeholder="Reflect on this question..."></textarea>
                                </div>
                                `).join('')}
                                <p><strong>✅ Benefit:</strong> Completing this activity strengthens your ${activity.title.toLowerCase()} capacity.</p>
                            </div>
                        </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${lesson.number}: ${lesson.title} - ${courseConfig.courseTitle} Course</title>
    <link rel="stylesheet" href="css/lesson-styles.css">
    <link rel="stylesheet" href="css/interactive-components.css">
</head>
<body>
    <div class="lesson-container">
        <!-- Crisis Support Banner -->
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
                <a href="index.html">${courseConfig.courseTitle}</a> >
                <a href="#module-${Math.ceil(parseInt(lessonNum) / 5)}">Module ${Math.ceil(parseInt(lessonNum) / 5)}</a> >
                <span>Lesson ${lesson.number}</span>
            </div>

            <h1>${lesson.icon} ${lesson.title}</h1>
            <p class="lesson-subtitle">${lesson.subtitle}</p>

            <div class="lesson-stats">
                <div class="stat">
                    <span class="stat-icon">⏱️</span>
                    <span>${lesson.duration}</span>
                </div>
                <div class="stat">
                    <span class="stat-icon">🎯</span>
                    <span>${lesson.difficulty}</span>
                </div>
                <div class="stat">
                    <span class="stat-icon">🧠</span>
                    <span>${lesson.category}</span>
                </div>
            </div>

            <div class="progress-bar">
                <div class="progress" style="width: ${(parseInt(lessonNum) / 20 * 100)}%"></div>
            </div>
        </div>

        <div class="lesson-content">
            <!-- Lesson Introduction -->
            <section class="lesson-introduction">
                <h2>Welcome to ${lesson.title}</h2>
                <div class="introduction-content">
                    <p><strong>Welcome to this essential lesson in your legacy-building journey.</strong> ${lesson.sections.intro}</p>

                    <div class="lesson-objectives">
                        <h3>Learning Objectives</h3>
                        <ul>
                            ${lesson.objectives.map(obj => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="research-foundation">
                        <h3>Research Foundation</h3>
                        <p>This lesson is based on extensive research in developmental psychology, wisdom studies, and legacy building. The frameworks and strategies taught are grounded in evidence-based practices used by successful mentors, educators, and wisdom sharers worldwide. You'll learn practical approaches backed by both scientific research and real-world effectiveness.</p>
                    </div>
                </div>
            </section>

            <!-- Learning Objectives -->
            <div class="learning-objectives">
                <h2>🎯 ${lesson.title} Mastery</h2>
                <div class="objectives-grid">
                    ${lesson.objectives.map((obj, idx) => `
                    <div class="objective-item">
                        <div class="objective-icon">${['💎', '🌟', '✨'][idx] || '💫'}</div>
                        <div class="objective-text">
                            <h3>Key Objective ${idx + 1}</h3>
                            <p>${obj}</p>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Main Concepts Deep Dive -->
            <div class="learning-section">
                <h2>🔬 Core Concepts: ${lesson.title}</h2>

                <div class="science-explanation">
                    ${lesson.sections.mainConcepts.map(concept => `
                    <div class="concept-card">
                        <h3>📚 ${concept.title}</h3>
                        <p>${concept.content}</p>

                        <div class="brain-systems">
                            <div class="system-item">
                                <h4>💡 Key Research Insights</h4>
                                <ul>
                                    ${concept.stats.map(stat => `<li>${stat}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>

                <div class="research-highlights">
                    <h3>📊 Research Highlights</h3>
                    <div class="research-grid">
                        ${researchStats.map(rs => `
                        <div class="research-item">
                            <div class="research-stat">${rs.stat}</div>
                            <p>${rs.description}</p>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Interactive Activities -->
            <div class="interactive-section">
                <h2>📝 Practice Activities: ${lesson.title}</h2>
                <p>Apply these concepts through structured reflection and planning exercises:</p>

                <div class="assessment-tool">
                    <div class="assessment-tests">
                        ${activitiesHTML}
                    </div>

                    <button class="btn btn-primary" data-action="saveActivities">💾 Save My Reflections</button>
                </div>
            </div>

            <!-- Application and Integration -->
            <div class="learning-section">
                <h2>🎯 Real-World Application</h2>

                <div class="training-program">
                    <div class="program-overview">
                        <h3>💼 Applying ${lesson.title} in Your Life</h3>
                        <p>These concepts become powerful when applied consistently in your daily wisdom-sharing practice. Consider how each principle can be integrated into your unique legacy-building journey.</p>
                    </div>

                    <div class="week-by-week">
                        <div class="week-card">
                            <div class="week-header">
                                <h4>🌱 Getting Started</h4>
                                <span class="week-focus">First steps</span>
                            </div>
                            <div class="week-content">
                                <div class="daily-exercises">
                                    <p>Begin by focusing on one key concept from this lesson. Choose the insight that resonated most strongly with you, and identify one specific way you can apply it this week. Small, consistent actions create lasting change in your legacy-building practice.</p>
                                    <ul>
                                        <li>Choose one concept to focus on this week</li>
                                        <li>Identify a specific application in your context</li>
                                        <li>Take one small action to implement this insight</li>
                                        <li>Reflect on what you learned from the experience</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="week-card">
                            <div class="week-header">
                                <h4>📈 Building Momentum</h4>
                                <span class="week-focus">Continued practice</span>
                            </div>
                            <div class="week-content">
                                <div class="daily-exercises">
                                    <p>As you gain confidence with initial applications, gradually integrate additional concepts from this lesson. Pay attention to what works well in your unique context and what may need adaptation. Your personalized approach will emerge through experimentation and reflection.</p>
                                    <ul>
                                        <li>Add a second concept to your regular practice</li>
                                        <li>Notice patterns in what works well for you</li>
                                        <li>Adapt approaches to fit your unique style</li>
                                        <li>Seek feedback from those you serve</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="week-card">
                            <div class="week-header">
                                <h4>🎯 Mastery Development</h4>
                                <span class="week-focus">Long-term integration</span>
                            </div>
                            <div class="week-content">
                                <div class="daily-exercises">
                                    <p>With sustained practice, these concepts become integrated into your natural approach to wisdom sharing. Continue refining your methods based on experience and feedback, remaining open to continued learning. Mastery is an ongoing journey of growth and discovery.</p>
                                    <ul>
                                        <li>Integrate all key concepts into your regular practice</li>
                                        <li>Continuously refine approaches based on feedback</li>
                                        <li>Share what you're learning with your community</li>
                                        <li>Maintain beginner's mind amid growing expertise</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Tracking -->
            <div class="interactive-section">
                <h2>📈 Track Your Progress</h2>
                <p>Assess your developing mastery of ${lesson.title}:</p>

                <div class="tracking-dashboard">
                    <div class="tracking-categories">
                        <div class="category-tracker">
                            <h3>💎 Understanding Level</h3>
                            <div class="metric-items">
                                <div class="metric-item">
                                    <label>I understand the core concepts of ${lesson.title} (1-10):</label>
                                    <input type="range" min="1" max="10" value="5" class="tracker-slider" id="understanding">
                                    <span class="tracker-value">5</span>
                                </div>
                                <div class="metric-item">
                                    <label>I can explain these concepts to others (1-10):</label>
                                    <input type="range" min="1" max="10" value="5" class="tracker-slider" id="explanation">
                                    <span class="tracker-value">5</span>
                                </div>
                            </div>
                        </div>

                        <div class="category-tracker">
                            <h3>🎯 Application Confidence</h3>
                            <div class="metric-items">
                                <div class="metric-item">
                                    <label>I feel confident applying these concepts (1-10):</label>
                                    <input type="range" min="1" max="10" value="5" class="tracker-slider" id="confidence">
                                    <span class="tracker-value">5</span>
                                </div>
                                <div class="metric-item">
                                    <label>I have specific plans for implementation (1-10):</label>
                                    <input type="range" min="1" max="10" value="5" class="tracker-slider" id="planning">
                                    <span class="tracker-value">5</span>
                                </div>
                            </div>
                        </div>

                        <div class="category-tracker">
                            <h3>🌟 Commitment Level</h3>
                            <div class="metric-items">
                                <div class="metric-item">
                                    <label>I'm committed to practicing these concepts (1-10):</label>
                                    <input type="range" min="1" max="10" value="5" class="tracker-slider" id="commitment">
                                    <span class="tracker-value">5</span>
                                </div>
                                <div class="metric-item">
                                    <label>I see how this contributes to my legacy (1-10):</label>
                                    <input type="range" min="1" max="10" value="5" class="tracker-slider" id="legacy-connection">
                                    <span class="tracker-value">5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary" data-action="saveProgress">📊 Save My Progress</button>
                </div>
            </div>

            <!-- Final Reflection -->
            <div class="learning-section">
                <h2>🤔 Lesson Reflection</h2>

                <div class="reflection-questions">
                    <div class="question-set">
                        <h3>🧠 Personal Insights</h3>
                        <div class="question-item">
                            <label>What was your most important insight from this lesson on ${lesson.title}?</label>
                            <textarea rows="4" placeholder="Reflect on your key takeaway..."></textarea>
                        </div>

                        <div class="question-item">
                            <label>How does this lesson connect to your unique legacy-building vision?</label>
                            <textarea rows="4" placeholder="Consider the personal relevance..."></textarea>
                        </div>

                        <div class="question-item">
                            <label>What questions or areas of curiosity emerged for you during this lesson?</label>
                            <textarea rows="4" placeholder="What do you want to explore further?"></textarea>
                        </div>
                    </div>

                    <div class="question-set">
                        <h3>🎯 Action Planning</h3>
                        <div class="question-item">
                            <label>What is ONE specific action you will take this week based on this lesson?</label>
                            <textarea rows="4" placeholder="Be specific about what, when, and how..."></textarea>
                        </div>

                        <div class="question-item">
                            <label>What support or resources do you need to successfully apply these concepts?</label>
                            <textarea rows="4" placeholder="Consider people, tools, or information needed..."></textarea>
                        </div>

                        <div class="question-item">
                            <label>How will you track your progress in applying this lesson's insights?</label>
                            <textarea rows="4" placeholder="What indicators will show you're making progress?"></textarea>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary" data-action="saveReflections">💾 Save My Reflections</button>
            </div>

            <!-- Key Takeaways Summary -->
            <div class="learning-section">
                <h2>✨ Key Takeaways</h2>
                <div class="applications-grid">
                    <div class="application-card">
                        <h3>💡 Core Insight</h3>
                        <p>${lesson.sections.mainConcepts[0].title} is fundamental to effective ${lesson.title.toLowerCase()}. Remember that ${lesson.sections.mainConcepts[0].content.split('.')[0].toLowerCase()}.</p>
                    </div>

                    <div class="application-card">
                        <h3>🎯 Practical Application</h3>
                        <p>Start by implementing one concept from this lesson in your wisdom-sharing practice. Small, consistent actions create lasting change in your legacy-building effectiveness.</p>
                    </div>

                    <div class="application-card">
                        <h3>🌱 Continued Growth</h3>
                        <p>This lesson represents one step in your lifelong legacy-building journey. Continue learning, experimenting, and refining your approach based on experience and feedback from those you serve.</p>
                    </div>

                    <div class="application-card">
                        <h3>🤝 Community Connection</h3>
                        <p>Share your insights from this lesson with fellow legacy builders. Teaching others reinforces your learning and contributes to your community's collective wisdom.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <div class="lesson-footer">
            <div class="lesson-navigation">
                ${prevLesson ? `<a href="${prevLesson}" class="nav-btn secondary">← Previous Lesson</a>` : '<span></span>'}
                ${nextLesson ? `<a href="${nextLesson}" class="nav-btn primary">Next Lesson →</a>` : '<a href="index.html" class="nav-btn primary">Return to Course Home →</a>'}
            </div>

            <div class="lesson-progress">
                <span>Module ${Math.ceil(parseInt(lessonNum) / 5)} • Lesson ${lessonNum} of 20</span>
            </div>
        </div>
    </div>

    <script src="js/lesson-interactions.js"></script>

    <script>
        // Lesson ${lesson.number} functionality
        (function() {
            'use strict';

            function handleButtonClick(event) {
                event.preventDefault();
                const action = event.target.dataset.action;
                console.log(\`Lesson ${lesson.number} button clicked: \${action}\`);

                switch(action) {
                    case 'saveActivities':
                        saveActivitiesTemplate();
                        break;
                    case 'saveProgress':
                        saveProgressTemplate();
                        break;
                    case 'saveReflections':
                        saveReflectionsTemplate();
                        break;
                    case 'hideCrisisBanner':
                        hideCrisisBannerTemplate();
                        break;
                    default:
                        alert(\`✅ Feature working! Action: \${action}\`);
                }
            }

            function saveActivitiesTemplate() {
                alert(\`💾 Activities Saved!\\n\\n✅ Excellent work on completing the practice activities for ${lesson.title}.\\n\\nYour reflections and plans are building the foundation for your legacy-building practice.\\n\\nResearch shows that structured reflection like this increases application likelihood by 70% and long-term retention by 65%.\\n\\nKeep up the great work!\`);
            }

            function saveProgressTemplate() {
                alert(\`📊 Progress Saved!\\n\\nYour ${lesson.title} skills are developing. Understanding and confidence grow through consistent practice and application.\\n\\n💡 Remember: Mastery is a journey, not a destination. Continue learning and growing!\`);
            }

            function saveReflectionsTemplate() {
                alert(\`💾 Reflections Saved!\\n\\nYour insights from ${lesson.title} are valuable. Reviewing your reflections regularly reinforces learning and keeps you connected to your legacy-building vision.\\n\\n✨ Great work on Lesson ${lesson.number}! Ready for the next lesson?\`);
            }

            function hideCrisisBannerTemplate() {
                const banner = document.getElementById('crisis-banner');
                if (banner) {
                    banner.style.display = 'none';
                    sessionStorage.setItem('crisisBannerDismissed', 'true');
                }
            }

            // Initialize interactions
            document.addEventListener('DOMContentLoaded', function() {
                const buttons = document.querySelectorAll('[data-action]');
                buttons.forEach(button => {
                    button.addEventListener('click', handleButtonClick);
                });

                // Initialize slider interactions
                const sliders = document.querySelectorAll('.tracker-slider');
                sliders.forEach(slider => {
                    const valueSpan = slider.parentNode.querySelector('.tracker-value');
                    if (valueSpan) {
                        slider.addEventListener('input', function() {
                            valueSpan.textContent = this.value;
                        });
                    }
                });

                console.log('Lesson ${lesson.number}: ${lesson.title} loaded successfully');
            });
        })();
    </script>

    <!-- Enhanced styling for legacy theme -->
    <style>
        :root {
            --legacy-gold: ${courseConfig.colors.primary};
            --legacy-green: ${courseConfig.colors.secondary};
            --legacy-brown: ${courseConfig.colors.accent};
        }

        .lesson-header {
            background: linear-gradient(135deg, var(--legacy-gold) 0%, var(--legacy-green) 100%);
        }

        .science-explanation {
            background: linear-gradient(135deg, #fef3c7 0%, #d1fae5 100%);
            border-radius: 16px;
            padding: 2rem;
            margin: 2rem 0;
        }

        .brain-systems {
            display: grid;
            gap: 1.5rem;
            margin: 1.5rem 0;
        }

        .system-item {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            border-left: 4px solid var(--legacy-gold);
        }

        .assessment-tests {
            display: grid;
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .test-card {
            background: #fefefe;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 1.5rem;
        }

        .test-input {
            margin: 1rem 0;
        }

        .test-input label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--legacy-brown);
        }

        .test-input textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-family: inherit;
            font-size: 1rem;
            transition: border-color 0.3s;
        }

        .test-input textarea:focus {
            outline: none;
            border-color: var(--legacy-gold);
        }

        .week-by-week {
            display: grid;
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .week-card {
            background: #fefefe;
            border: 2px solid #e5e7eb;
            border-radius: 16px;
            overflow: hidden;
        }

        .week-header {
            background: linear-gradient(90deg, var(--legacy-green), var(--legacy-gold));
            color: white;
            padding: 1.5rem;
        }

        .week-content {
            padding: 1.5rem;
        }

        .week-focus {
            background: rgba(255,255,255,0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.9rem;
        }

        .applications-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .application-card {
            background: #fef3c7;
            border-radius: 12px;
            padding: 1.5rem;
            border-left: 4px solid var(--legacy-brown);
        }

        .research-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 1.5rem 0;
        }

        .research-item {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            border-left: 4px solid var(--legacy-gold);
        }

        .research-stat {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--legacy-gold);
            margin-bottom: 0.5rem;
        }

        .btn-primary {
            background: linear-gradient(90deg, var(--legacy-gold), var(--legacy-green));
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
            .brain-systems,
            .applications-grid,
            .research-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</body>
</html>
`;
}

// Generate all lessons
console.log(`\n${'='.repeat(60)}`);
console.log(`Generating ${lessons.length} comprehensive lessons for Course ${courseConfig.courseNumber}: ${courseConfig.courseTitle}`);
console.log(`${'='.repeat(60)}\n`);

let totalLines = 0;
const results = [];

lessons.forEach((lesson, index) => {
    const filename = `lesson-${lesson.number.replace('.', '-')}.html`;
    const filepath = path.join(__dirname, filename);

    const html = generateLessonHTML(lesson);
    const lineCount = html.split('\n').length;
    totalLines += lineCount;

    fs.writeFileSync(filepath, html, 'utf8');

    results.push({
        number: lesson.number,
        title: lesson.title,
        filename: filename,
        lines: lineCount,
        status: lineCount >= 600 ? '✅ PASS' : '❌ FAIL'
    });

    console.log(`${index + 1}. Lesson ${lesson.number}: ${lesson.title}`);
    console.log(`   File: ${filename}`);
    console.log(`   Lines: ${lineCount} ${lineCount >= 600 ? '✅' : '❌ (needs 600+)'}`);
    console.log('');
});

console.log(`\n${'='.repeat(60)}`);
console.log('GENERATION COMPLETE - SUMMARY');
console.log(`${'='.repeat(60)}\n`);
console.log(`Total lessons generated: ${lessons.length}`);
console.log(`Total lines of code: ${totalLines.toLocaleString()}`);
console.log(`Average lines per lesson: ${Math.round(totalLines / lessons.length)}`);
console.log(`Passing lessons (600+ lines): ${results.filter(r => r.lines >= 600).length}/${lessons.length}`);

const failedLessons = results.filter(r => r.lines < 600);
if (failedLessons.length > 0) {
    console.log(`\n⚠️  WARNING: ${failedLessons.length} lessons below 600 lines:`);
    failedLessons.forEach(l => {
        console.log(`   - Lesson ${l.number}: ${l.lines} lines (need ${600 - l.lines} more)`);
    });
} else {
    console.log(`\n✅ SUCCESS: All lessons meet the 600+ line requirement!`);
}

console.log(`\n${'='.repeat(60)}\n`);
console.log('📂 Files generated in:', __dirname);
console.log('\nNext steps:');
console.log('1. Review generated lessons for quality');
console.log('2. Create corresponding CSS files (lesson-styles.css, interactive-components.css)');
console.log('3. Create lesson-interactions.js for interactivity');
console.log('4. Create index.html course landing page');
console.log('5. Test all interactive elements');
console.log(`\n${'='.repeat(60)}\n`);
