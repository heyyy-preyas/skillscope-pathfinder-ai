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
    const { query, location = "Remote" } = await req.json();
    
    // Mock job data (replace with real API like LinkedIn, Indeed, or Google Jobs)
    // For production, integrate with real job APIs
    const mockJobs = [
      {
        id: "1",
        title: `${query} Developer`,
        company: "TechCorp Inc.",
        location: location,
        type: "Full-time",
        salary: "$80,000 - $120,000",
        description: `Seeking an experienced ${query} professional to join our growing team.`,
        requirements: ["3+ years experience", "Strong problem-solving skills", "Team player"],
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: "https://example.com/apply"
      },
      {
        id: "2",
        title: `Senior ${query} Specialist`,
        company: "Innovation Labs",
        location: location,
        type: "Full-time",
        salary: "$100,000 - $150,000",
        description: `Lead ${query} projects and mentor junior team members.`,
        requirements: ["5+ years experience", "Leadership skills", "Advanced certifications"],
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: "https://example.com/apply"
      },
      {
        id: "3",
        title: `${query} Consultant`,
        company: "Global Solutions",
        location: "Hybrid",
        type: "Contract",
        salary: "$70 - $100/hour",
        description: `Provide expert ${query} consulting to clients across industries.`,
        requirements: ["4+ years experience", "Excellent communication", "Industry certifications"],
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: "https://example.com/apply"
      },
      {
        id: "4",
        title: `Junior ${query} Associate`,
        company: "StartUp Ventures",
        location: location,
        type: "Full-time",
        salary: "$50,000 - $70,000",
        description: `Entry-level ${query} position with growth opportunities.`,
        requirements: ["0-2 years experience", "Eager to learn", "Relevant degree"],
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: "https://example.com/apply"
      }
    ];

    return new Response(JSON.stringify({ jobs: mockJobs }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
