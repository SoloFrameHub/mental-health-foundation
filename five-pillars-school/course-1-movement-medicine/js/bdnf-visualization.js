/**
 * BDNF (Brain-Derived Neurotrophic Factor) Visualization
 * Interactive chart showing BDNF response to exercise
 * Requires Chart.js library
 */

(function() {
    'use strict';

    window.BDNFVisualization = {

        /**
         * Create BDNF response chart
         * @param {string} canvasId - ID of canvas element
         * @param {string} intensity - 'light', 'moderate', or 'vigorous'
         * @param {number} duration - Exercise duration in minutes
         */
        createBDNFChart: function(canvasId, intensity, duration) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) {
                console.error(`Canvas element ${canvasId} not found`);
                return null;
            }

            // Get BDNF parameters based on intensity
            const params = this.getBDNFParameters(intensity, duration);

            // Create time labels (before, during, after exercise)
            const labels = this.generateTimeLabels(duration);
            const data = this.generateBDNFData(params, duration, labels.length);

            // Create chart
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'BDNF Level (relative to baseline)',
                        data: data,
                        borderColor: this.getIntensityColor(intensity),
                        backgroundColor: this.getIntensityColor(intensity, 0.1),
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        borderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `BDNF Response to ${this.capitalizeFirst(intensity)} Exercise (${duration} min)`,
                            font: { size: 16, weight: 'bold' }
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.parsed.y;
                                    const increase = Math.round((value - 1.0) * 100);
                                    return `BDNF: ${value.toFixed(2)}x baseline (+${increase}%)`;
                                },
                                afterLabel: function(context) {
                                    return BDNFVisualization.getBDNFTooltipInfo(context.parsed.x, params);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0.8,
                            title: {
                                display: true,
                                text: 'BDNF Level (x baseline)',
                                font: { size: 14 }
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toFixed(1) + 'x';
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time',
                                font: { size: 14 }
                            }
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    }
                }
            });

            // Add annotation showing optimal zone
            this.addOptimalZoneAnnotation(chart, params);

            return chart;
        },

        /**
         * Get BDNF parameters based on exercise intensity
         */
        getBDNFParameters: function(intensity, duration) {
            const params = {
                light: {
                    baselineMultiplier: 1.2,
                    peakMultiplier: 1.4,
                    peakTimeOffset: 15, // minutes after exercise start
                    sustainedHours: 3,
                    returnRate: 0.15 // how fast it returns to baseline
                },
                moderate: {
                    baselineMultiplier: 1.5,
                    peakMultiplier: 2.5,
                    peakTimeOffset: 30,
                    sustainedHours: 5,
                    returnRate: 0.10
                },
                vigorous: {
                    baselineMultiplier: 1.8,
                    peakMultiplier: 3.0,
                    peakTimeOffset: 45,
                    sustainedHours: 7,
                    returnRate: 0.08
                }
            };

            let selected = params[intensity] || params.moderate;

            // Adjust for duration
            if (duration >= 60) {
                selected.peakMultiplier *= 1.15;
                selected.sustainedHours += 2;
            }

            return selected;
        },

        /**
         * Generate time labels for chart
         */
        generateTimeLabels: function(duration) {
            const labels = ['Before'];

            // During exercise (every 10 min)
            for (let i = 10; i <= duration; i += 10) {
                labels.push(`${i} min`);
            }

            // After exercise (every 30 min for first 2 hours, then hourly)
            for (let i = 30; i <= 120; i += 30) {
                labels.push(`+${i} min`);
            }
            for (let i = 3; i <= 8; i++) {
                labels.push(`+${i} hrs`);
            }

            return labels;
        },

        /**
         * Generate BDNF data points
         */
        generateBDNFData: function(params, duration, numPoints) {
            const data = [];
            const totalMinutes = 480; // 8 hours total timeline

            for (let i = 0; i < numPoints; i++) {
                const timePoint = (i / numPoints) * totalMinutes;
                let bdnfLevel;

                if (timePoint < 0) {
                    // Before exercise
                    bdnfLevel = 1.0;

                } else if (timePoint <= duration) {
                    // During exercise - gradual rise
                    const progress = timePoint / duration;
                    bdnfLevel = 1.0 + ((params.baselineMultiplier - 1.0) * progress);

                } else {
                    // After exercise
                    const postExerciseTime = timePoint - duration;

                    if (postExerciseTime <= params.peakTimeOffset) {
                        // Rising to peak
                        const peakProgress = postExerciseTime / params.peakTimeOffset;
                        bdnfLevel = params.baselineMultiplier +
                            ((params.peakMultiplier - params.baselineMultiplier) * peakProgress);

                    } else {
                        // Declining from peak
                        const timeSincePeak = postExerciseTime - params.peakTimeOffset;
                        const sustainMinutes = params.sustainedHours * 60;

                        if (timeSincePeak <= sustainMinutes) {
                            // Sustained elevation period - slow decline
                            const declineProgress = timeSincePeak / sustainMinutes;
                            bdnfLevel = params.peakMultiplier -
                                ((params.peakMultiplier - 1.0) * declineProgress * params.returnRate);
                        } else {
                            // Return to baseline
                            const returnProgress = Math.min(1.0,
                                (timeSincePeak - sustainMinutes) / (60 * 2)); // 2 hour return
                            const currentElevation = params.peakMultiplier -
                                ((params.peakMultiplier - 1.0) * params.returnRate);
                            bdnfLevel = currentElevation - ((currentElevation - 1.0) * returnProgress);
                        }
                    }
                }

                data.push(Math.max(1.0, bdnfLevel)); // Never below baseline
            }

            return data;
        },

        /**
         * Get tooltip information based on timeline position
         */
        getBDNFTooltipInfo: function(position, params) {
            if (position < 2) {
                return 'Baseline BDNF level before exercise';
            } else if (position < 5) {
                return 'BDNF beginning to elevate during exercise';
            } else if (position < 8) {
                return 'Peak BDNF elevation - maximum neuroplasticity';
            } else if (position < 12) {
                return 'Sustained elevation - synaptogenesis occurring';
            } else {
                return 'BDNF returning to baseline - effects still present';
            }
        },

        /**
         * Get color based on intensity
         */
        getIntensityColor: function(intensity, alpha = 1) {
            const colors = {
                light: `rgba(16, 185, 129, ${alpha})`, // green
                moderate: `rgba(59, 130, 246, ${alpha})`, // blue
                vigorous: `rgba(245, 158, 11, ${alpha})` // orange
            };
            return colors[intensity] || colors.moderate;
        },

        /**
         * Add annotation for optimal neuroplasticity zone
         */
        addOptimalZoneAnnotation: function(chart, params) {
            // This would require Chart.js annotation plugin
            // Placeholder for future enhancement
            console.log('Optimal BDNF zone:', params.peakMultiplier);
        },

        /**
         * Capitalize first letter
         */
        capitalizeFirst: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        /**
         * Create comparison chart for different intensities
         */
        createComparisonChart: function(canvasId, duration) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) {
                console.error(`Canvas element ${canvasId} not found`);
                return null;
            }

            const labels = this.generateTimeLabels(duration);
            const intensities = ['light', 'moderate', 'vigorous'];
            const datasets = [];

            intensities.forEach(intensity => {
                const params = this.getBDNFParameters(intensity, duration);
                const data = this.generateBDNFData(params, duration, labels.length);

                datasets.push({
                    label: `${this.capitalizeFirst(intensity)} Intensity`,
                    data: data,
                    borderColor: this.getIntensityColor(intensity),
                    backgroundColor: this.getIntensityColor(intensity, 0.05),
                    fill: false,
                    tension: 0.4,
                    pointRadius: 2,
                    borderWidth: 2
                });
            });

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `BDNF Response Comparison by Intensity (${duration} min exercise)`,
                            font: { size: 16, weight: 'bold' }
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0.8,
                            title: {
                                display: true,
                                text: 'BDNF Level (x baseline)',
                                font: { size: 14 }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time',
                                font: { size: 14 }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });

            return chart;
        },

        /**
         * Create BDNF benefits timeline (text-based)
         */
        getBDNFBenefitsTimeline: function(intensity) {
            const timelines = {
                light: [
                    { time: 'Immediately', benefit: 'Mood elevation begins via endorphins' },
                    { time: '15 min', benefit: '40% BDNF increase - synaptic connections strengthening' },
                    { time: '1 hour', benefit: 'Sustained BDNF elevation - learning enhancement' },
                    { time: '2-4 hours', benefit: 'Memory consolidation window' },
                    { time: '24 hours', benefit: 'Neurogenesis triggered in hippocampus' }
                ],
                moderate: [
                    { time: 'Immediately', benefit: 'Strong endorphin and endocannabinoid release' },
                    { time: '30 min', benefit: '150% BDNF increase - peak neuroplasticity' },
                    { time: '2 hours', benefit: 'Synaptogenesis (new neural connections forming)' },
                    { time: '4-6 hours', benefit: 'Enhanced learning and memory consolidation' },
                    { time: '24-48 hours', benefit: 'Hippocampal neurogenesis - new brain cells' },
                    { time: '1 week', benefit: 'Structural brain changes begin with consistent practice' }
                ],
                vigorous: [
                    { time: 'Immediately', benefit: 'Maximum endorphin/endocannabinoid release ("runner\'s high")' },
                    { time: '45 min', benefit: '200% BDNF increase - maximum neuroplastic window' },
                    { time: '3 hours', benefit: 'Peak synaptogenesis - new connections forming rapidly' },
                    { time: '6-8 hours', benefit: 'Extended learning enhancement period' },
                    { time: '24-48 hours', benefit: 'Robust hippocampal neurogenesis' },
                    { time: '2 weeks', benefit: 'Measurable changes in hippocampal volume (with consistency)' },
                    { time: '12 weeks', benefit: 'Structural brain remodeling - 2% hippocampal volume increase' }
                ]
            };

            return timelines[intensity] || timelines.moderate;
        },

        /**
         * Generate HTML for BDNF benefits timeline
         */
        generateTimelineHTML: function(intensity) {
            const timeline = this.getBDNFBenefitsTimeline(intensity);
            const color = this.getIntensityColor(intensity);

            let html = `<div class="bdnf-timeline" style="border-left: 4px solid ${color}; padding-left: 2rem; margin: 2rem 0;">`;
            html += `<h3 style="color: ${color}; margin-bottom: 1.5rem;">BDNF Benefits Timeline - ${this.capitalizeFirst(intensity)} Intensity</h3>`;

            timeline.forEach((item, index) => {
                html += `
                    <div class="timeline-item" style="margin-bottom: 1.5rem; position: relative;">
                        <div class="timeline-marker" style="position: absolute; left: -2.5rem; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: ${color}; border: 3px solid white; box-shadow: 0 0 0 3px ${color};"></div>
                        <div class="timeline-time" style="font-weight: bold; color: ${color}; margin-bottom: 0.25rem;">${item.time}</div>
                        <div class="timeline-benefit" style="color: #4b5563;">${item.benefit}</div>
                    </div>
                `;
            });

            html += '</div>';
            return html;
        },

        /**
         * Get clinical interpretation of BDNF levels
         */
        getClinicalInterpretation: function(intensity, duration) {
            const params = this.getBDNFParameters(intensity, duration);
            const peakIncrease = Math.round((params.peakMultiplier - 1.0) * 100);

            let interpretation = {
                neuroplasticity: '',
                clinical: '',
                recommendation: ''
            };

            if (params.peakMultiplier >= 2.5) {
                interpretation.neuroplasticity = 'Excellent';
                interpretation.clinical = 'This BDNF elevation is comparable to levels seen with antidepressant medications. Strong neuroplastic effects support learning, memory, and mood regulation.';
                interpretation.recommendation = 'Optimal protocol for depression treatment and cognitive enhancement. Maintain consistency for cumulative brain changes.';
            } else if (params.peakMultiplier >= 2.0) {
                interpretation.neuroplasticity = 'Good';
                interpretation.clinical = 'Significant BDNF elevation promotes synaptogenesis and hippocampal neurogenesis. Beneficial for mood and cognitive function.';
                interpretation.recommendation = 'Effective for mental health benefits. Consider increasing duration to 45+ minutes for maximum neuroplastic effects.';
            } else {
                interpretation.neuroplasticity = 'Moderate';
                interpretation.clinical = 'Modest BDNF elevation provides some neuroplastic benefits. Better than sedentary, but below therapeutic threshold for depression.';
                interpretation.recommendation = 'Increase to moderate-vigorous intensity for stronger mental health effects. Current protocol good for maintenance.';
            }

            interpretation.peakIncrease = `${peakIncrease}%`;
            interpretation.sustainedHours = params.sustainedHours;

            return interpretation;
        }
    };

    console.log('BDNF Visualization module loaded successfully');

})();
