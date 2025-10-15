import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || '';
    const location = url.searchParams.get('location') || '';

    // Realistic job data based on career paths
    const jobs = [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Google',
        location: 'Mountain View, CA',
        salary: '$160k - $220k',
        type: 'Full-time',
        remote: true,
        description: 'Join our engineering team to build cutting-edge cloud infrastructure. Work with distributed systems, microservices, and modern web technologies.',
        requirements: ['5+ years experience', 'React, Node.js, Python', 'System design expertise'],
        posted: '2 days ago',
        applicants: 89,
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://careers.google.com'
      },
      {
        id: '2',
        title: 'Data Scientist',
        company: 'Meta',
        location: 'Menlo Park, CA',
        salary: '$140k - $190k',
        type: 'Full-time',
        remote: false,
        description: 'Analyze large datasets to drive product decisions. Build ML models for recommendation systems and user behavior prediction.',
        requirements: ['MS in Data Science or related field', 'Python, TensorFlow, SQL', 'A/B testing experience'],
        posted: '1 week ago',
        applicants: 156,
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://metacareers.com'
      },
      {
        id: '3',
        title: 'UX/UI Designer',
        company: 'Apple',
        location: 'Cupertino, CA',
        salary: '$110k - $160k',
        type: 'Full-time',
        remote: false,
        description: 'Design intuitive interfaces for next-generation products. Collaborate with engineers to create seamless user experiences.',
        requirements: ['3+ years design experience', 'Figma, Sketch proficiency', 'Strong portfolio'],
        posted: '3 days ago',
        applicants: 234,
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://jobs.apple.com'
      },
      {
        id: '4',
        title: 'Registered Nurse - ICU',
        company: 'Stanford Health Care',
        location: 'Palo Alto, CA',
        salary: '$80k - $110k',
        type: 'Full-time',
        remote: false,
        description: 'Provide critical care to patients in our state-of-the-art ICU. Work with cutting-edge medical technology and a collaborative care team.',
        requirements: ['BSN required', 'ACLS certification', '2+ years ICU experience'],
        posted: '5 days ago',
        applicants: 67,
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://stanfordhealthcare.org/careers'
      },
      {
        id: '5',
        title: 'Financial Analyst',
        company: 'Goldman Sachs',
        location: 'New York, NY',
        salary: '$90k - $130k',
        type: 'Full-time',
        remote: false,
        description: 'Analyze financial data and market trends. Build models to support investment decisions and strategic planning.',
        requirements: ['Bachelor in Finance/Economics', 'Excel, SQL expert', 'CFA Level 1 preferred'],
        posted: '4 days ago',
        applicants: 198,
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://goldmansachs.com/careers'
      },
      {
        id: '6',
        title: 'Digital Marketing Manager',
        company: 'Amazon',
        location: 'Seattle, WA',
        salary: '$95k - $140k',
        type: 'Full-time',
        remote: true,
        description: 'Lead digital marketing campaigns across multiple channels. Drive customer acquisition and engagement through data-driven strategies.',
        requirements: ['5+ years marketing experience', 'Google Analytics, SEO expertise', 'Team leadership'],
        posted: '1 day ago',
        applicants: 145,
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://amazon.jobs'
      },
      {
        id: '7',
        title: 'Mechanical Engineer',
        company: 'Tesla',
        location: 'Fremont, CA',
        salary: '$95k - $135k',
        type: 'Full-time',
        remote: false,
        description: 'Design and test mechanical systems for electric vehicles. Work on innovative manufacturing processes and product development.',
        requirements: ['BS in Mechanical Engineering', 'CAD software proficiency', '3+ years automotive experience'],
        posted: '1 week ago',
        applicants: 178,
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://tesla.com/careers'
      },
      {
        id: '8',
        title: 'High School Math Teacher',
        company: 'Oakland Unified School District',
        location: 'Oakland, CA',
        salary: '$55k - $85k',
        type: 'Full-time',
        remote: false,
        description: 'Inspire students to excel in mathematics. Develop engaging curriculum and support diverse learners.',
        requirements: ['Teaching credential required', 'Math degree or equivalent', 'Classroom management skills'],
        posted: '2 weeks ago',
        applicants: 23,
        postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://ousd.org/jobs'
      },
      {
        id: '9',
        title: 'Graphic Designer',
        company: 'Nike',
        location: 'Portland, OR',
        salary: '$65k - $95k',
        type: 'Full-time',
        remote: true,
        description: 'Create compelling visual content for brand campaigns. Design marketing materials, digital assets, and brand guidelines.',
        requirements: ['3+ years design experience', 'Adobe Creative Suite mastery', 'Strong portfolio'],
        posted: '3 days ago',
        applicants: 267,
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://jobs.nike.com'
      },
      {
        id: '10',
        title: 'Cybersecurity Analyst',
        company: 'Microsoft',
        location: 'Redmond, WA',
        salary: '$105k - $155k',
        type: 'Full-time',
        remote: true,
        description: 'Protect cloud infrastructure from security threats. Monitor systems, conduct penetration testing, and implement security protocols.',
        requirements: ['Security+ or CISSP', 'Network security expertise', '3+ years experience'],
        posted: '4 days ago',
        applicants: 112,
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://careers.microsoft.com'
      }
    ];

    // Filter jobs based on query and location
    let filteredJobs = jobs;
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(lowerQuery) ||
        job.company.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery)
      );
    }

    if (location) {
      const lowerLocation = location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(lowerLocation)
      );
    }

    return new Response(JSON.stringify({ jobs: filteredJobs, total: filteredJobs.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-jobs:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});