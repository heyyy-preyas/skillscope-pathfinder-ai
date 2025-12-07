const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Helper to get authorized client
const getSupabaseClient = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } },
    });
};

const axios = require('axios');
// ... imports

// JSearch API Configuration (RapidAPI)
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = 'jsearch.p.rapidapi.com';

exports.getTrendingJobs = async (req, res) => {
    const supabase = getSupabaseClient(req);
    const { domain = 'Software Engineer', location = 'Remote' } = req.query;

    try {
        // 1. Try to get from Cache first to save API quota
        // Check if we have recent jobs (e.g., created in last 24h) for this domain
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        let query = supabase
            .from('jobs_cache')
            .select('*')
            .gte('created_at', twentyFourHoursAgo)
            .ilike('domain', `%${domain}%`)
            .limit(20);

        const { data: cachedJobs, error } = await query;

        if (cachedJobs && cachedJobs.length > 0) {
            console.log('Serving jobs from cache');
            return res.json(cachedJobs);
        }

        // 2. Fetch from External API (JSearch) if API Key exists
        if (RAPID_API_KEY) {
            console.log('Fetching live jobs from JSearch...');
            const options = {
                method: 'GET',
                url: 'https://jsearch.p.rapidapi.com/search',
                params: {
                    query: `${domain} in ${location}`,
                    page: '1',
                    num_pages: '1'
                },
                headers: {
                    'X-RapidAPI-Key': RAPID_API_KEY,
                    'X-RapidAPI-Host': RAPID_API_HOST
                }
            };

            const response = await axios.request(options);
            const liveJobs = response.data.data; // JSearch returns { data: [...] }

            if (liveJobs && liveJobs.length > 0) {
                // Map to our database schema
                const formattedJobs = liveJobs.map(job => ({
                    title: job.job_title,
                    company: job.employer_name,
                    location: job.job_city ? `${job.job_city}, ${job.job_country}` : 'Remote',
                    description: job.job_description ? job.job_description.substring(0, 500) + '...' : '',
                    url: job.job_apply_link,
                    salary_range: job.job_min_salary ? `$${job.job_min_salary}-$${job.job_max_salary}` : 'Not Disclosed',
                    source: 'JSearch',
                    domain: domain,
                    created_at: new Date().toISOString()
                }));

                // 3. Save to Cache
                const { error: insertError } = await supabase.from('jobs_cache').insert(formattedJobs);
                if (insertError) console.error('Cache error:', insertError);

                return res.json(formattedJobs);
            }
        }

        // 3. Fallback to Mock Data if no API key or API fails
        console.log('Using mock data (No API Key or No Results)');
        const MOCK_JOBS = [
            { title: `${domain} - Junior`, company: 'Tech Corp', location: 'Remote', salary: '$60k-$80k', domain, source: 'Mock' },
            { title: `Senior ${domain}`, company: 'Innovate Ltd', location: 'New York, USA', salary: '$120k-$160k', domain, source: 'Mock' },
            { title: `${domain} Specialist`, company: 'Future AI', location: 'San Francisco, USA', salary: '$140k+', domain, source: 'Mock' },
        ];
        res.json(MOCK_JOBS);

    } catch (err) {
        console.error('Job Fetch Error:', err.message);
        // Fallback to empty or mock on error
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};
