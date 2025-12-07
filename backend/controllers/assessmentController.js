const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://127.0.0.1:5000';

// Helper to get authorized client
const getSupabaseClient = (req) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });
};

exports.submitAssessment = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const userId = req.user.id;
    const { answers } = req.body;
    // answers: { "question_id": "value" } -> value is string "1"-"5"

    if (!answers) {
        return res.status(400).json({ error: 'Answers are required' });
    }

    try {
        // 0. Fetch Question Categories to Map Answers
        // We need to know which question belongs to which RIASEC category
        const { data: questions, error: qError } = await supabase
            .from('quiz_questions')
            .select('id, category');

        if (qError) throw qError;

        // Create a map for quick lookup: { "qid": "Realistic" }
        const questionMap = {};
        questions.forEach(q => {
            questionMap[q.id] = q.category;
        });

        // 1. Format Payload for AI Service
        // AI expects: { "answers": [ { "category": "Realistic", "value": 5 }, ... ] }
        const formattedAnswers = Object.keys(answers).map(qid => ({
            category: questionMap[qid] || 'Unknown',
            value: parseInt(answers[qid]) || 0
        }));

        // 2. Call AI Service
        let prediction = null;
        try {
            const response = await axios.post(`${FLASK_API_URL}/predict`, { answers: formattedAnswers });
            prediction = response.data;
        } catch (aiError) {
            console.warn('AI Service unavailable, using fallback:', aiError.message);

            // FALLBACK MOCK LOGIC (For Presentation/Dev)
            // Calculate dominant trait from formattedAnswers
            const scores = { 'Realistic': 0, 'Investigative': 0, 'Artistic': 0, 'Social': 0, 'Enterprising': 0, 'Conventional': 0 };
            formattedAnswers.forEach(ans => {
                if (scores[ans.category] !== undefined) {
                    scores[ans.category] += ans.value;
                }
            });

            // Find highest score
            const dominantTrait = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

            // Map traits to default careers
            const careerMap = {
                'Realistic': 'Software Engineer',
                'Investigative': 'Data Scientist',
                'Artistic': 'UI/UX Designer',
                'Social': 'Product Manager',
                'Enterprising': 'Startup Founder',
                'Conventional': 'DevOps Engineer'
            };

            prediction = {
                career: careerMap[dominantTrait] || 'Software Engineer',
                confidence: 0.85,
                behavioral_profile: `You are a strong ${dominantTrait} type.`
            };
        }

        // 3. Save History to Supabase
        // predicted_career, confidence_score, input_data
        if (prediction) {
            const { error: dbError } = await supabase
                .from('career_predictions')
                .insert({
                    user_id: userId,
                    input_data: answers,
                    predicted_career: prediction.career,
                    confidence_score: prediction.confidence,
                    // We could store behavioral profile too if schema allows, or just put in input_data metadata
                    // For now, schema only has predicted_career
                });

            if (dbError) throw dbError;
        }

        res.json(prediction);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getHistory = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const { data, error } = await supabase
            .from('career_predictions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getQuestions = async (req, res) => {
    const supabase = getSupabaseClient(req);
    try {
        const { data, error } = await supabase
            .from('quiz_questions')
            .select('*')
            .order('category'); // or random?

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
