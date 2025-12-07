const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const getSupabaseClient = (req) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    // For public data like careers, we can use service role or anon key if RLS allows public select.
    // Using anon key + token if provided, or just anon key.

    const options = token ? { global: { headers: { Authorization: `Bearer ${token}` } } } : {};
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, options);
};

exports.getAllCareers = async (req, res) => {
    const supabase = getSupabaseClient(req);
    try {
        const { data, error } = await supabase
            .from('career_paths')
            .select('*')
            .order('title');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCareerById = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('career_paths')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
