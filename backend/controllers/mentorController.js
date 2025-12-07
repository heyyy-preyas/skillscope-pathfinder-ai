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


exports.bookSession = async (req, res) => {
    // Mock booking logic
    const { mentorId, timeSlot } = req.body;
    // In real app: check availability, create calendar event, send email

    console.log(`Booking session with mentor ${mentorId} at ${timeSlot}`);

    // Simulate success
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Session booked successfully!',
            details: { mentorId, timeSlot, link: 'https://meet.google.com/abc-defg-hij' }
        });
    }, 1000);
};
