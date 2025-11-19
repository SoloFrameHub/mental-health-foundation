/**
 * Exercise Calculators for Mental Health
 * Evidence-based tools for exercise prescription and therapeutic dosing
 */

(function() {
    'use strict';

    // MET values for common activities (research-based)
    const MET_VALUES = {
        'walking_slow': { met: 2.5, label: 'Walking (2 mph, slow pace)' },
        'walking_moderate': { met: 3.5, label: 'Walking (3 mph, moderate pace)' },
        'walking_brisk': { met: 4.5, label: 'Walking (4 mph, brisk pace)' },
        'jogging': { met: 7.0, label: 'Jogging (5 mph)' },
        'running': { met: 9.0, label: 'Running (6 mph)' },
        'cycling_leisure': { met: 4.0, label: 'Cycling (leisurely, <10 mph)' },
        'cycling_moderate': { met: 6.0, label: 'Cycling (moderate, 10-12 mph)' },
        'cycling_vigorous': { met: 8.0, label: 'Cycling (vigorous, 12-14 mph)' },
        'swimming_leisure': { met: 6.0, label: 'Swimming (leisurely laps)' },
        'swimming_vigorous': { met: 10.0, label: 'Swimming (vigorous effort)' },
        'resistance_training': { met: 5.0, label: 'Resistance training (moderate)' },
        'yoga': { met: 2.5, label: 'Yoga (Hatha)' },
        'yoga_power': { met: 4.0, label: 'Yoga (Power/Vinyasa)' },
        'dance': { met: 5.0, label: 'Dancing (moderate)' },
        'gardening': { met: 4.0, label: 'Gardening (moderate effort)' },
        'housework': { met: 3.5, label: 'Housework (vigorous cleaning)' },
        'stairs': { met: 8.0, label: 'Stair climbing (moderate pace)' },
        'elliptical': { met: 5.0, label: 'Elliptical trainer (moderate)' },
        'rowing': { met: 7.0, label: 'Rowing machine (moderate)' },
        'hiking': { met: 6.0, label: 'Hiking (moderate terrain)' }
    };

    /**
     * Calculator 1: METs to Mental Health Therapeutic Dose
     * Based on TREAD study (Trivedi et al., 2011)
     */
    window.ExerciseCalculators = {

        /**
         * Calculate therapeutic dose from exercise parameters
         * @param {number} weight - Body weight in kg
         * @param {string} activity - Activity type from MET_VALUES
         * @param {number} duration - Duration in minutes
         * @param {number} frequency - Sessions per week
         * @returns {object} Calculation results
         */
        calculateTherapeuticDose: function(weight, activity, duration, frequency) {
            if (!weight || !activity || !duration || !frequency) {
                throw new Error('All parameters required');
            }

            const activityData = MET_VALUES[activity];
            if (!activityData) {
                throw new Error('Invalid activity type');
            }

            const met = activityData.met;

            // Standard formula: (MET × 3.5 × weight in kg × time in min) / 200 = kcal
            const caloriesPerSession = (met * 3.5 * weight * duration) / 200;
            const weeklyCalories = caloriesPerSession * frequency;
            const dosePerKg = weeklyCalories / weight;

            // Categorize based on TREAD study findings
            let category, symptomReduction, recommendation, evidenceLevel, clinicalNote;

            if (dosePerKg < 4) {
                category = "Low Dose - Health Maintenance";
                symptomReduction = "10-15%";
                recommendation = "Increase frequency or duration for therapeutic effect. Current dose below clinical treatment threshold.";
                evidenceLevel = "Public health dose - insufficient for depression treatment";
                clinicalNote = "Good for general health maintenance and prevention, but not adequate for treating existing depression or anxiety.";
            } else if (dosePerKg < 8) {
                category = "Moderate Dose - Mild Symptoms";
                symptomReduction = "20-30%";
                recommendation = "Effective for mild depression/anxiety. Consider increasing to 16 kcal/kg/week for moderate-severe symptoms.";
                evidenceLevel = "Partial therapeutic dose";
                clinicalNote = "May see some benefit for mild symptoms. Comparable to low-dose antidepressant.";
            } else if (dosePerKg < 16) {
                category = "Moderate-High Dose - Clinical Effect";
                symptomReduction = "30-40%";
                recommendation = "Strong therapeutic benefit. Increase to 16+ kcal/kg/week for maximum antidepressant effect.";
                evidenceLevel = "Approaching optimal therapeutic dose";
                clinicalNote = "Good clinical effect expected. Comparable to standard-dose antidepressant.";
            } else {
                category = "Therapeutic Dose - Maximum Clinical Benefit";
                symptomReduction = "40-50%";
                recommendation = "Optimal dose achieved! Equivalent to antidepressant medication effectiveness.";
                evidenceLevel = "Evidence-based therapeutic dose (TREAD study)";
                clinicalNote = "Maximum antidepressant effect. Remission rates of 47% observed in clinical trials.";
            }

            // Calculate equivalent activities comparison
            const equivalentActivities = this.calculateEquivalentActivities(weeklyCalories, weight);

            return {
                caloriesPerSession: Math.round(caloriesPerSession),
                weeklyCalories: Math.round(weeklyCalories),
                dosePerKg: dosePerKg.toFixed(1),
                category: category,
                symptomReduction: symptomReduction,
                recommendation: recommendation,
                evidenceLevel: evidenceLevel,
                clinicalNote: clinicalNote,
                metValue: met,
                activityLabel: activityData.label,
                equivalentActivities: equivalentActivities,
                percentOfTherapeutic: Math.round((dosePerKg / 16) * 100)
            };
        },

        /**
         * Calculate equivalent activities to reach same dose
         */
        calculateEquivalentActivities: function(targetCalories, weight) {
            const equivalents = [];
            const commonActivities = ['walking_brisk', 'cycling_moderate', 'swimming_leisure', 'jogging'];

            commonActivities.forEach(activity => {
                const activityData = MET_VALUES[activity];
                const met = activityData.met;
                // Calculate minutes needed per week to reach target
                const minutesNeeded = (targetCalories * 200) / (met * 3.5 * weight);
                const sessionsPerWeek = 3; // Standard recommendation
                const minutesPerSession = Math.round(minutesNeeded / sessionsPerWeek);

                if (minutesPerSession > 0 && minutesPerSession <= 120) {
                    equivalents.push({
                        activity: activityData.label,
                        minutesPerSession: minutesPerSession,
                        sessionsPerWeek: sessionsPerWeek,
                        totalMinutesPerWeek: Math.round(minutesNeeded)
                    });
                }
            });

            return equivalents;
        },

        /**
         * Calculate target heart rate zones for mental health
         * @param {number} age - Age in years
         * @returns {object} Heart rate zones
         */
        calculateHRZones: function(age) {
            const maxHR = 220 - age;

            return {
                maxHR: maxHR,
                zone1: { // Light - Stress reduction, mindfulness
                    min: Math.round(maxHR * 0.50),
                    max: Math.round(maxHR * 0.60),
                    label: 'Zone 1: Mindfulness & Stress Reduction',
                    benefit: 'Promotes relaxation, reduces cortisol, enhances mind-body awareness',
                    color: '#10b981'
                },
                zone2: { // Moderate - Optimal BDNF
                    min: Math.round(maxHR * 0.60),
                    max: Math.round(maxHR * 0.70),
                    label: 'Zone 2: Optimal BDNF Production',
                    benefit: 'Maximum brain-derived neurotrophic factor elevation, sustainable for long duration',
                    color: '#3b82f6'
                },
                zone3: { // Vigorous - Maximum antidepressant
                    min: Math.round(maxHR * 0.70),
                    max: Math.round(maxHR * 0.80),
                    label: 'Zone 3: Maximum Antidepressant Effect',
                    benefit: 'Strongest neurotransmitter changes, hippocampal neurogenesis, mood elevation',
                    color: '#f59e0b'
                },
                zone4: { // High intensity - Mental toughness
                    min: Math.round(maxHR * 0.80),
                    max: Math.round(maxHR * 0.90),
                    label: 'Zone 4: Mental Toughness & Resilience',
                    benefit: 'Brief intervals only - builds psychological resilience, not primary recommendation',
                    color: '#ef4444'
                },
                zone5: { // Maximum - Not recommended
                    min: Math.round(maxHR * 0.90),
                    max: maxHR,
                    label: 'Zone 5: Maximum (Not Recommended)',
                    benefit: 'Too intense for mental health focus - risk of overtraining and mood worsening',
                    color: '#991b1b'
                }
            };
        },

        /**
         * Estimate BDNF response to exercise
         * @param {string} intensity - 'light', 'moderate', 'vigorous'
         * @param {number} duration - Duration in minutes
         * @returns {object} BDNF response estimation
         */
        estimateBDNFResponse: function(intensity, duration) {
            let baselineMultiplier, peakTime, peakMultiplier, sustainedEffect;

            // Based on research: moderate-vigorous intensity shows 2-3x BDNF elevation
            switch(intensity) {
                case 'light':
                    baselineMultiplier = 1.2;
                    peakTime = 15;
                    peakMultiplier = 1.4;
                    sustainedEffect = '2-4 hours';
                    break;
                case 'moderate':
                    baselineMultiplier = 1.5;
                    peakTime = 30;
                    peakMultiplier = 2.5;
                    sustainedEffect = '4-6 hours';
                    break;
                case 'vigorous':
                    baselineMultiplier = 1.8;
                    peakTime = 45;
                    peakMultiplier = 3.0;
                    sustainedEffect = '6-8 hours';
                    break;
                default:
                    throw new Error('Intensity must be light, moderate, or vigorous');
            }

            // Adjust for duration (longer = more sustained elevation)
            if (duration >= 45) {
                sustainedEffect = '8-12 hours';
                peakMultiplier *= 1.1;
            }

            return {
                intensity: intensity,
                duration: duration,
                immediateIncrease: `${Math.round((baselineMultiplier - 1) * 100)}%`,
                peakTime: `${peakTime} minutes post-exercise`,
                peakIncrease: `${Math.round((peakMultiplier - 1) * 100)}%`,
                sustainedEffect: sustainedEffect,
                neuroplasticityBenefit: peakMultiplier >= 2.0 ? 'High - promotes synaptogenesis' : 'Moderate',
                recommendation: this.getBDNFRecommendation(intensity, duration, peakMultiplier)
            };
        },

        getBDNFRecommendation: function(intensity, duration, multiplier) {
            if (multiplier >= 2.5) {
                return 'Excellent protocol for maximizing brain plasticity and neurogenesis. Maintain consistency for cumulative benefits.';
            } else if (multiplier >= 2.0) {
                return 'Good BDNF response. Consider increasing duration to 45+ minutes for enhanced neuroplasticity.';
            } else {
                return 'Modest BDNF elevation. Increase to moderate intensity for stronger neuroplastic effects.';
            }
        },

        /**
         * Generate personalized exercise prescription
         * @param {object} profile - Patient profile
         * @returns {object} Exercise prescription
         */
        generatePrescription: function(profile) {
            const {
                diagnosis, // 'depression', 'anxiety', 'ptsd', 'adhd'
                fitnessLevel, // 'sedentary', 'low', 'moderate', 'high'
                timeAvailable, // minutes per session
                barriers, // array of barrier codes
                preferences // object with preference flags
            } = profile;

            let prescription = {
                weeklyGoal: {},
                progression: [],
                specificExercises: [],
                behavioralStrategies: [],
                warningSign: [],
                trackingMetrics: []
            };

            // Diagnosis-specific recommendations
            switch(diagnosis) {
                case 'depression':
                    prescription.weeklyGoal = {
                        frequency: '3-5 days/week',
                        duration: '30-45 minutes',
                        intensity: 'Moderate to vigorous (60-80% max HR)',
                        type: 'Aerobic exercise preferred - walking, cycling, swimming',
                        targetDose: '16 kcal/kg/week (therapeutic dose)',
                        expectedBenefit: '40-50% symptom reduction in 12-16 weeks'
                    };
                    prescription.warningSign = [
                        'Exercise makes mood worse (possible overtraining)',
                        'Increased suicidal ideation',
                        'Complete inability to motivate (may need medication first)',
                        'Exercise becoming compulsive/excessive'
                    ];
                    break;

                case 'anxiety':
                    prescription.weeklyGoal = {
                        frequency: '4-6 days/week',
                        duration: '20-30 minutes',
                        intensity: 'Moderate (60-70% max HR) - avoid excessive intensity',
                        type: 'Rhythmic aerobic + mind-body (yoga, tai chi)',
                        targetDose: '12-16 kcal/kg/week',
                        expectedBenefit: '30-40% anxiety reduction, improved HRV'
                    };
                    prescription.warningSign = [
                        'Exercise triggers panic attacks',
                        'Hypervigilance to heart rate/physical sensations',
                        'Avoidance developing',
                        'Post-exercise anxiety spikes'
                    ];
                    break;

                case 'ptsd':
                    prescription.weeklyGoal = {
                        frequency: '3-4 days/week',
                        duration: '30-45 minutes',
                        intensity: 'Moderate (60-70% max HR) with body awareness',
                        type: 'Trauma-sensitive yoga, walking, swimming (safe activities)',
                        targetDose: '12-16 kcal/kg/week',
                        expectedBenefit: 'Reduced hyperarousal, improved emotion regulation'
                    };
                    prescription.behavioralStrategies.push(
                        'Start with predictable, controllable activities',
                        'Avoid competitive/contact sports initially',
                        'Practice grounding during exercise',
                        'Exercise with trusted person if helpful'
                    );
                    prescription.warningSign = [
                        'Dissociation during exercise',
                        'Flashbacks triggered by physical exertion',
                        'Extreme hypervigilance in gym/group settings'
                    ];
                    break;

                case 'adhd':
                    prescription.weeklyGoal = {
                        frequency: 'Daily preferred (6-7 days/week)',
                        duration: '20-40 minutes',
                        intensity: 'Moderate to vigorous with variety',
                        type: 'Sports, martial arts, dance - engaging activities',
                        targetDose: '14-18 kcal/kg/week',
                        expectedBenefit: 'Improved focus, impulse control, executive function'
                    };
                    prescription.behavioralStrategies.push(
                        'Use exercise as focus tool before challenging tasks',
                        'Vary activities to maintain interest',
                        'Incorporate skill-building/gamification',
                        'Morning exercise for school/work focus'
                    );
                    break;
            }

            // Adjust for fitness level
            const startingMultiplier = {
                'sedentary': 0.3,
                'low': 0.5,
                'moderate': 0.7,
                'high': 1.0
            }[fitnessLevel];

            prescription.progression = this.createProgressionPlan(
                prescription.weeklyGoal,
                startingMultiplier,
                timeAvailable
            );

            // Add barrier-specific strategies
            prescription.barrierStrategies = this.getBarrierStrategies(barriers);

            // Add tracking metrics
            prescription.trackingMetrics = [
                'Mood before/after each session (1-10 scale)',
                'PHQ-9 or GAD-7 every 2 weeks',
                'Sleep quality (1-10 scale)',
                'Energy level (1-10 scale)',
                'Exercise adherence (days completed/week)'
            ];

            return prescription;
        },

        /**
         * Create 12-week progression plan
         */
        createProgressionPlan: function(weeklyGoal, startingMultiplier, timeAvailable) {
            const progression = [];
            const weeks = 12;

            for (let week = 1; week <= weeks; week++) {
                let weekMultiplier;

                if (week <= 2) {
                    weekMultiplier = startingMultiplier;
                } else if (week <= 4) {
                    weekMultiplier = startingMultiplier + 0.1;
                } else if (week <= 6) {
                    weekMultiplier = startingMultiplier + 0.2;
                } else if (week <= 8) {
                    weekMultiplier = startingMultiplier + 0.3;
                } else {
                    weekMultiplier = Math.min(1.0, startingMultiplier + 0.4);
                }

                const targetMinutes = Math.round(
                    parseInt(weeklyGoal.duration.split('-')[0]) * weekMultiplier
                );

                const targetDays = Math.round(
                    parseInt(weeklyGoal.frequency.split('-')[0]) * weekMultiplier
                );

                progression.push({
                    week: week,
                    frequency: `${targetDays} days`,
                    duration: `${targetMinutes} minutes`,
                    intensity: weekMultiplier >= 0.7 ? weeklyGoal.intensity : 'Light to moderate',
                    focus: this.getWeekFocus(week)
                });
            }

            return progression;
        },

        getWeekFocus: function(week) {
            const focuses = {
                1: 'Habit establishment - consistency over intensity',
                2: 'Building confidence - celebrating small wins',
                3: 'Gradual intensity increase',
                4: 'Refining form and technique',
                5: 'Mid-program assessment - adjust as needed',
                6: 'Pushing therapeutic dose threshold',
                7: 'Variety integration - prevent boredom',
                8: 'Solidifying gains',
                9: 'Fine-tuning for sustainability',
                10: 'Challenge week - test progress',
                11: 'Consolidation of benefits',
                12: 'Long-term maintenance planning'
            };
            return focuses[week] || 'Continue consistent practice';
        },

        /**
         * Get evidence-based strategies for common barriers
         */
        getBarrierStrategies: function(barriers) {
            const strategies = {
                'anhedonia': [
                    'Start with just 5 minutes - use behavioral activation principles',
                    'Focus on process not enjoyment initially',
                    'Track mood improvement post-exercise to build association',
                    'Use "exercise snacks" - brief bursts throughout day'
                ],
                'fatigue': [
                    'Paradoxically, exercise increases energy via BDNF and mitochondrial biogenesis',
                    'Start with 10 minutes, energy often increases during session',
                    'Morning exercise when energy highest',
                    'Low-intensity steady state initially'
                ],
                'time': [
                    'Research shows 10-minute sessions effective if done multiple times daily',
                    'HIIT protocols: 1 minute intense intervals = significant benefit',
                    'Incidental activity: stairs, walking meetings, active commute',
                    'Reframe: "I don\'t have time NOT to exercise" (saves time via productivity)'
                ],
                'shame': [
                    'Home-based options eliminate public exposure',
                    'Online classes with camera off',
                    'Outdoor solo activities (hiking, walking)',
                    'Focus on mental health benefits, not appearance'
                ],
                'past_failure': [
                    'Reframe previous attempts as learning experiences',
                    'Lower intensity/duration - prevent overambitious crash',
                    'Track mood not weight/appearance',
                    'Build identity as "person who moves" not "athlete"'
                ],
                'injury': [
                    'Adaptive exercise options (chair-based, aquatic)',
                    'Focus on what you CAN do',
                    'Physical therapy integration',
                    'Upper body focus if lower body limited, vice versa'
                ]
            };

            return barriers.map(barrier => ({
                barrier: barrier,
                strategies: strategies[barrier] || ['Consult with healthcare provider for personalized solutions']
            }));
        },

        /**
         * Calculate adherence risk score
         */
        calculateAdherenceRisk: function(factors) {
            const {
                pastExerciseHistory, // 0-5 scale
                depressionSeverity, // PHQ-9 score 0-27
                socialSupport, // 0-5 scale
                facilityAccess, // boolean
                autonomousMotivation // 0-5 scale
            } = factors;

            let riskScore = 0;

            // Past history (lower = higher risk)
            riskScore += (5 - pastExerciseHistory) * 3;

            // Depression severity (higher = higher risk)
            if (depressionSeverity >= 20) riskScore += 15;
            else if (depressionSeverity >= 15) riskScore += 10;
            else if (depressionSeverity >= 10) riskScore += 5;

            // Social support (lower = higher risk)
            riskScore += (5 - socialSupport) * 2;

            // Facility access
            if (!facilityAccess) riskScore += 5;

            // Autonomous motivation (lower = higher risk)
            riskScore += (5 - autonomousMotivation) * 4;

            // Categorize risk
            let riskLevel, recommendations;

            if (riskScore <= 20) {
                riskLevel = 'Low Risk';
                recommendations = [
                    'Good prognosis for adherence',
                    'Standard exercise prescription appropriate',
                    'Monthly check-ins sufficient'
                ];
            } else if (riskScore <= 40) {
                riskLevel = 'Moderate Risk';
                recommendations = [
                    'Build in accountability (exercise partner, class commitment)',
                    'Start with very manageable dose',
                    'Weekly check-ins initially',
                    'Address top barrier proactively'
                ];
            } else {
                riskLevel = 'High Risk';
                recommendations = [
                    'Consider supervised exercise program',
                    'Combine with behavioral activation therapy',
                    'Address depression severity first (may need medication)',
                    'Daily micro-commitments (5-10 min)',
                    'Twice-weekly check-ins with accountability'
                ];
            }

            return {
                riskScore: riskScore,
                riskLevel: riskLevel,
                recommendations: recommendations,
                topBarriers: this.identifyTopBarriers(factors)
            };
        },

        identifyTopBarriers: function(factors) {
            const barriers = [];

            if (factors.pastExerciseHistory <= 2) {
                barriers.push({
                    barrier: 'Low exercise history',
                    strategy: 'Start with "exercise snacks" - 5-10 min sessions to build confidence and habit'
                });
            }

            if (factors.depressionSeverity >= 15) {
                barriers.push({
                    barrier: 'Moderate-severe depression',
                    strategy: 'Use behavioral activation principles - schedule exercise regardless of motivation, track mood improvement'
                });
            }

            if (factors.socialSupport <= 2) {
                barriers.push({
                    barrier: 'Limited social support',
                    strategy: 'Join group classes or online community for built-in accountability and connection'
                });
            }

            if (!factors.facilityAccess) {
                barriers.push({
                    barrier: 'No facility access',
                    strategy: 'Home-based bodyweight exercises, walking, online workout videos - no equipment needed'
                });
            }

            if (factors.autonomousMotivation <= 2) {
                barriers.push({
                    barrier: 'Low intrinsic motivation',
                    strategy: 'Build autonomy (choose activities you enjoy), competence (start achievable), relatedness (exercise with others)'
                });
            }

            return barriers.slice(0, 3); // Top 3 only
        },

        /**
         * Utility: Convert pounds to kg
         */
        lbsToKg: function(lbs) {
            return lbs * 0.453592;
        },

        /**
         * Utility: Convert kg to pounds
         */
        kgToLbs: function(kg) {
            return kg * 2.20462;
        },

        /**
         * Get all available activities for dropdown population
         */
        getAvailableActivities: function() {
            return Object.keys(MET_VALUES).map(key => ({
                value: key,
                label: MET_VALUES[key].label,
                met: MET_VALUES[key].met
            })).sort((a, b) => a.label.localeCompare(b.label));
        }
    };

    // Make calculators globally accessible
    console.log('Exercise calculators loaded successfully');

})();
