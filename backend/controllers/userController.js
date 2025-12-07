const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Helper to get authorized client
const getSupabaseClient = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });
};

exports.getProfile = async (req, res) => {
    try {
        const supabase = getSupabaseClient(req);
        const userId = req.user.id;

        let { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            return res.status(400).json({ error: error.message });
        }

        if (!profile) {
            // If no profile exists, return basic user info from auth
            return res.json({
                id: userId,
                email: req.user.email,
                message: 'Profile not detailed yet'
            });
        }

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const supabase = getSupabaseClient(req);
        const userId = req.user.id;
        const updates = {
            ...req.body,
            updated_at: new Date().toISOString(),
        };

        // Upsert profile
        const { data, error } = await supabase
            .from('profiles')
            .upsert({ id: userId, ...updates })
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
