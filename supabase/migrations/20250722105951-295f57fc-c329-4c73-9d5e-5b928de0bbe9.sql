-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE public.career_category AS ENUM ('technology', 'healthcare', 'finance', 'education', 'arts', 'business', 'engineering', 'science', 'other');
CREATE TYPE public.quiz_type AS ENUM ('personality', 'skills', 'interests', 'values');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  location TEXT,
  education_level TEXT,
  current_field TEXT,
  goals TEXT[],
  bio TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create career_paths table
CREATE TABLE public.career_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category career_category NOT NULL,
  average_salary_min INTEGER,
  average_salary_max INTEGER,
  growth_outlook TEXT,
  required_skills TEXT[],
  education_requirements TEXT[],
  roadmap JSONB,
  job_market_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_type quiz_type NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  weight INTEGER DEFAULT 1,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_results table
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_type quiz_type NOT NULL,
  answers JSONB NOT NULL,
  scores JSONB,
  recommendations TEXT[],
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_career_matches table
CREATE TABLE public.user_career_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  career_path_id UUID NOT NULL REFERENCES public.career_paths(id) ON DELETE CASCADE,
  match_score DECIMAL(3,2) NOT NULL CHECK (match_score >= 0 AND match_score <= 1),
  reasoning TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, career_path_id)
);

-- Create mentors table
CREATE TABLE public.mentors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expertise_areas TEXT[] NOT NULL,
  experience_years INTEGER,
  company TEXT,
  bio TEXT,
  hourly_rate DECIMAL(10,2),
  available_slots JSONB,
  rating DECIMAL(2,1) DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_career_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for career_paths (public read access)
CREATE POLICY "Career paths are viewable by everyone" ON public.career_paths
  FOR SELECT USING (true);

-- Create RLS policies for quiz_questions (public read access)
CREATE POLICY "Quiz questions are viewable by authenticated users" ON public.quiz_questions
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for quiz_results
CREATE POLICY "Users can view their own quiz results" ON public.quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results" ON public.quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz results" ON public.quiz_results
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user_career_matches
CREATE POLICY "Users can view their own career matches" ON public.user_career_matches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own career matches" ON public.user_career_matches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own career matches" ON public.user_career_matches
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for mentors
CREATE POLICY "Mentors are viewable by authenticated users" ON public.mentors
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own mentor profile" ON public.mentors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mentor profile" ON public.mentors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_career_paths_updated_at
  BEFORE UPDATE ON public.career_paths
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentors_updated_at
  BEFORE UPDATE ON public.mentors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for career paths
INSERT INTO public.career_paths (title, description, category, average_salary_min, average_salary_max, growth_outlook, required_skills, education_requirements, roadmap) VALUES
('Software Engineer', 'Design, develop, and maintain software applications and systems', 'technology', 70000, 150000, 'Excellent - 13% growth expected', 
 ARRAY['JavaScript', 'Python', 'React', 'Node.js', 'Git'], 
 ARRAY['Bachelor''s in Computer Science or related field'],
 '{"steps": [{"title": "Learn Programming Basics", "duration": "3-6 months"}, {"title": "Build Projects", "duration": "6-12 months"}, {"title": "Apply for Internships", "duration": "1-2 months"}, {"title": "Junior Developer Role", "duration": "1-2 years"}]}'::jsonb),
('Data Scientist', 'Analyze complex data to help organizations make informed decisions', 'technology', 85000, 165000, 'Very Strong - 31% growth expected',
 ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
 ARRAY['Bachelor''s in Statistics, Mathematics, or Computer Science'],
 '{"steps": [{"title": "Learn Statistics & Programming", "duration": "6-12 months"}, {"title": "Master Data Analysis Tools", "duration": "6-9 months"}, {"title": "Build Portfolio Projects", "duration": "3-6 months"}, {"title": "Data Analyst Role", "duration": "1-2 years"}]}'::jsonb),
('UX Designer', 'Create intuitive and engaging user experiences for digital products', 'arts', 60000, 120000, 'Good - 8% growth expected',
 ARRAY['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
 ARRAY['Bachelor''s in Design, Psychology, or related field'],
 '{"steps": [{"title": "Learn Design Principles", "duration": "3-6 months"}, {"title": "Master Design Tools", "duration": "3-6 months"}, {"title": "Build Design Portfolio", "duration": "6-12 months"}, {"title": "Junior UX Designer", "duration": "1-2 years"}]}'::jsonb);

-- Insert sample quiz questions
INSERT INTO public.quiz_questions (quiz_type, question, options, category) VALUES
('interests', 'Which activity sounds most appealing to you?', 
 '{"options": [{"value": "solving_problems", "text": "Solving complex technical problems"}, {"value": "helping_people", "text": "Helping people achieve their goals"}, {"value": "creating_art", "text": "Creating beautiful visual designs"}, {"value": "analyzing_data", "text": "Analyzing data to find patterns"}]}'::jsonb, 
 'general'),
('skills', 'How would you rate your analytical thinking skills?',
 '{"options": [{"value": "beginner", "text": "Beginner - I''m just starting to develop these skills"}, {"value": "intermediate", "text": "Intermediate - I can handle most analytical tasks"}, {"value": "advanced", "text": "Advanced - I excel at complex analysis"}, {"value": "expert", "text": "Expert - I''m among the best in analytical thinking"}]}'::jsonb,
 'analytical'),
('personality', 'In group projects, you typically:',
 '{"options": [{"value": "lead", "text": "Take charge and lead the team"}, {"value": "collaborate", "text": "Work closely with others as equals"}, {"value": "support", "text": "Provide support where needed"}, {"value": "independent", "text": "Prefer to work independently"}]}'::jsonb,
 'teamwork');