const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const getSupabaseClient = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } },
    });
};

exports.getAllMentors = async (req, res) => {
    const supabase = getSupabaseClient(req);

    try {
        // Join with profiles to get names
        const { data, error } = await supabase
            .from('mentors')
            .select('*, profiles(full_name, bio, avatar_url)');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getMentorProfile = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('mentors')
            .select('*, profiles(full_name, bio, avatar_url)')
            .eq('id', id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error check id' });
    }
};
