import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { answers, userId } = await req.json();

    // Fetch career paths from database
    const { data: careerPaths, error: careerError } = await supabase
      .from('career_paths')
      .select('*');

    if (careerError) throw careerError;

    // Build prompt for OpenAI
    const prompt = `You are a career counselor analyzing quiz responses to recommend careers. 

User's Quiz Answers:
${Object.entries(answers).map(([questionId, answer]) => `Q${questionId}: ${answer}`).join('\n')}

Available Career Paths:
${careerPaths?.map((career, index) => 
  `${index + 1}. ${career.title} (${career.category})\n   Description: ${career.description}\n   Skills: ${career.required_skills?.join(', ')}`
).join('\n\n')}

Based on the user's responses, recommend the top 3 most suitable careers. For each career, provide:
1. Career title (from the available list)
2. Match score (0-100)
3. Personalized reasoning explaining why this career matches their profile in a friendly, conversational tone (2-3 sentences starting with something like "Based on your interests...")
4. A step-by-step roadmap with 4-5 actionable items (courses, skills to learn, certifications, etc.)

Respond ONLY with valid JSON in this exact format:
{
  "recommendations": [
    {
      "careerTitle": "Career Name",
      "matchScore": 95,
      "reasoning": "Based on your interests...",
      "roadmap": [
        "Step 1: Learn fundamentals...",
        "Step 2: Build projects...",
        "Step 3: Get certified...",
        "Step 4: Network..."
      ]
    }
  ]
}`;

    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful career counselor. Always respond with valid JSON only.' 
          },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 2000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0].message.content);
    
    console.log('AI Response:', aiResponse);

    // Save recommendations to database
    const matches = [];
    for (const rec of aiResponse.recommendations) {
      const career = careerPaths?.find(c => 
        c.title.toLowerCase() === rec.careerTitle.toLowerCase()
      );
      
      if (career) {
        matches.push({
          user_id: userId,
          career_path_id: career.id,
          match_score: rec.matchScore / 100,
          reasoning: rec.reasoning
        });
      }
    }

    // Upsert career matches
    if (matches.length > 0) {
      const { error: matchError } = await supabase
        .from('user_career_matches')
        .upsert(matches, { onConflict: 'user_id,career_path_id' });

      if (matchError) {
        console.error('Error saving matches:', matchError);
      }
    }

    // Return full recommendations with roadmap
    return new Response(
      JSON.stringify({ 
        success: true,
        recommendations: aiResponse.recommendations 
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in generate-career-recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
