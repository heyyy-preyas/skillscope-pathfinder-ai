const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const getSupabaseClient = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } },
    });
};

exports.getRoadmap = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('roadmaps')
            .select('*')
            .eq('user_id', userId)
            .single();

        // Return empty or null if not found
        if (error && error.code !== 'PGRST116') throw error;
        res.json(data || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const aiService = require('../services/aiService');

exports.generateRoadmap = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const userId = req.user.id;
    const { career_goal } = req.body;

    if (!career_goal) {
        return res.status(400).json({ error: 'Career goal is required' });
    }

    try {
        // 1. Generate Roadmap (AI or Mock)
        const roadMapData = await aiService.generateRoadmap(career_goal);

        const newRoadmap = {
            user_id: userId,
            career_goal: roadMapData.career,
            steps: roadMapData.milestones, // Store the detailed array
            status: 'active',
            created_at: new Date().toISOString()
        };

        // 2. Save to Database
        const { data, error } = await supabase
            .from('roadmaps')
            .upsert(newRoadmap)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Roadmap Geneation Error:', err);
        res.status(500).json({ error: 'Failed to generate roadmap' });
    }
};
