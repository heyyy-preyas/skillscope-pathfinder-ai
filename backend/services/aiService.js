const axios = require('axios');
require('dotenv').config();

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // If user provides it later
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Generates a career roadmap.
 * Fallbacks to a sophisticated Mock generator if API is missing.
 */
exports.generateRoadmap = async (careerGoal) => {
    // 1. Try Real API
    if (GEMINI_API_KEY) {
        try {
            console.log(`Generating real AI roadmap for: ${careerGoal}`);
            const prompt = `Create a detailed 6-month learning roadmap for becoming a "${careerGoal}". 
            Return strictly JSON format: 
            {
                "career": "${careerGoal}",
                "description": "Short description",
                "milestones": [
                    { "week": 1, "title": "Topic", "details": "What to learn", "resource": "Link description" },
                    ... (12 milestones approx)
                ]
            }`;

            const response = await axios.post(GEMINI_URL, {
                contents: [{ parts: [{ text: prompt }] }]
            });

            const text = response.data.candidates[0].content.parts[0].text;
            // Basic cleanup to ensure JSON
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);

        } catch (error) {
            console.error('Gemini API Error (falling back to mock):', error.message);
        }
    }

    // 2. Mock Fallback (Advanced)
    console.log(`Generating MOCK roadmap for: ${careerGoal} (No API Key)`);
    return generateMockRoadmap(careerGoal);
};

// --- Mock Logic ---
const generateMockRoadmap = (career) => {
    const isTech = /developer|engineer|scientist|data|net/i.test(career);
    const isDesign = /design|art|ui|ux/i.test(career);
    const isManager = /manager|lead|scrum/i.test(career);

    let milestones = [];

    if (isTech) {
        milestones = [
            { week: 1, title: 'Computer Science Basics', details: 'Learn about binary, memory, and how the internet works.', resource: 'CS50 on YouTube' },
            { week: 2, title: 'Programming Fundamentals', details: 'Variables, loops, functions, and data structures.', resource: 'FreeCodeCamp' },
            { week: 4, title: 'Version Control (Git)', details: 'Learn to track code and collaborate on GitHub.', resource: 'Git Documentation' },
            { week: 6, title: 'Databases & SQL', details: 'Understanding relational databases and writing queries.', resource: 'PostgreSQL Tutorial' },
            { week: 8, title: 'Frameworks & Libraries', details: 'Deep dive into React, Node.js, or Python libraries.', resource: 'Official Docs' },
            { week: 12, title: 'Build a Portfolio Project', details: 'Create a full-stack application to showcase your skills.', resource: 'Project Ideas' },
            { week: 16, title: 'System Design Basics', details: 'Scalability, Load Balancing, and Architecture.', resource: 'System Design Primer' },
            { week: 24, title: 'Interview Preparation', details: 'LeetCode, behavioral questions, and mock interviews.', resource: 'Cracking the Coding Interview' }
        ];
    } else if (isDesign) {
        milestones = [
            { week: 1, title: 'Design Principles', details: 'Color theory, typography, and layout.', resource: 'Material Design Guidelines' },
            { week: 3, title: 'Mastering Figma', details: 'Auto-layout, components, and prototyping.', resource: 'Figma YouTube Channel' },
            { week: 6, title: 'User Research', details: 'User personas, journey maps, and empathy mapping.', resource: 'NNGroup Articles' },
            { week: 10, title: 'Wireframing & Prototyping', details: 'Low-fidelity to high-fidelity designs.', resource: 'Balsamiq / Figma' },
            { week: 15, title: 'Design Systems', details: 'Creating and maintaining a consistent design language.', resource: 'Atomic Design' },
            { week: 20, title: 'Portfolio Construction', details: 'Curating case studies and presenting work.', resource: 'Behance / Dribbble' }
        ];
    } else {
        // Generic
        milestones = [
            { week: 1, title: 'Industry Overview', details: `Understand the landscape of ${career}.`, resource: 'Industry Reports' },
            { week: 4, title: 'Core Skills Development', details: 'Learn the fundamental tools and terminologies.', resource: 'Online Courses' },
            { week: 8, title: 'Networking', details: 'Connect with professionals on LinkedIn.', resource: 'LinkedIn Guide' },
            { week: 12, title: 'Certification', details: 'Obtain relevant certifications for credibility.', resource: 'Cert Provider' },
            { week: 16, title: 'Practical Experience', details: 'Internships or volunteer projects.', resource: 'Job Boards' },
            { week: 24, title: 'Job Application', details: 'Resume tailoring and interview prep.', resource: 'Career Services' }
        ];
    }

    return {
        career: career,
        description: `A tailored step-by-step guide to becoming a ${career} in 6 months.`,
        milestones: milestones
    };
};
