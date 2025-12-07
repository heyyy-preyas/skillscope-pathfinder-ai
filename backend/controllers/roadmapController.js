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

exports.generateRoadmap = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const userId = req.user.id;
    const { career_goal } = req.body;

    // Mock Roadmap Generation logic
    // Real implementation: Call Flask or complex logic
    const newRoadmap = {
        user_id: userId,
        career_goal,
        steps: [
            { id: 1, title: 'Learn Basics', status: 'pending' },
            { id: 2, title: 'Build Project', status: 'pending' },
            { id: 3, title: 'Apply for Jobs', status: 'pending' }
        ]
    };

    try {
        const { data, error } = await supabase
            .from('roadmaps')
            .upsert(newRoadmap) // upsert based on user_id if we want 1 roadmap per user? Or just insert.
            // IDs are UUIDs. If we want one active roadmap, we'd need to handle that.
            // For now, let's just insert.
            .insert(newRoadmap)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
