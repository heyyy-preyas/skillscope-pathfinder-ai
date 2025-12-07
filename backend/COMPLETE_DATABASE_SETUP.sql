-- ============================================
-- SkillScope Complete Database Setup
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- First, create all tables (if not exists)

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING ( true );
CREATE POLICY IF NOT EXISTS "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ( auth.uid() = id );
CREATE POLICY IF NOT EXISTS "Users can update own profile." ON public.profiles FOR UPDATE USING ( auth.uid() = id );

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_type TEXT DEFAULT 'riasec',
  question TEXT NOT NULL,
  options JSONB,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Quiz questions are viewable by everyone." ON public.quiz_questions FOR SELECT USING (true);

-- Create jobs_cache table
CREATE TABLE IF NOT EXISTS public.jobs_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  description TEXT,
  url TEXT,
  salary_range TEXT,
  source TEXT,
  domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.jobs_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Jobs are viewable by everyone." ON public.jobs_cache FOR SELECT USING (true);

-- Create career_predictions table
CREATE TABLE IF NOT EXISTS public.career_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  input_data JSONB,
  predicted_career TEXT,
  confidence_score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.career_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Users see their own predictions." ON public.career_predictions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert predictions." ON public.career_predictions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create roadmaps table
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_goal TEXT,
  steps JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Users see their own roadmaps." ON public.roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert roadmaps." ON public.roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create mentors table
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id),
  expertise TEXT[],
  years_of_experience INTEGER,
  company TEXT,
  hourly_rate TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Mentors are viewable by everyone." ON public.mentors FOR SELECT USING (true);

-- ============================================
-- Now seed the quiz questions
-- ============================================

-- Clear existing questions (optional - remove if you want to keep existing data)
-- DELETE FROM public.quiz_questions;

-- Insert RIASEC Questions
INSERT INTO public.quiz_questions (question, category, options) VALUES
-- Realistic (Doers)
('I like adding functionality to applications using code.', 'Realistic', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),
('I enjoy debugging and fixing broken systems.', 'Realistic', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),

-- Investigative (Thinkers)
('I like analyzing algorithms to improve efficiency.', 'Investigative', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),
('I enjoy researching new technologies and how they work.', 'Investigative', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),

-- Artistic (Creators)
('I enjoy designing user interfaces and visual layouts.', 'Artistic', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),
('I like brainstorming creative solutions to problems.', 'Artistic', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),

-- Social (Helpers)
('I enjoy mentoring others and helping them learn.', 'Social', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),
('I like working in teams and collaborating with people.', 'Social', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),

-- Enterprising (Persuaders)
('I enjoy leading projects and managing timelines.', 'Enterprising', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),
('I like pitching ideas and persuading others.', 'Enterprising', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),

-- Conventional (Organizers)
('I like writing well-structured and documented code.', 'Conventional', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}'),
('I enjoy following established coding standards and patterns.', 'Conventional', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}')
ON CONFLICT DO NOTHING;

-- ============================================
-- Verification
-- ============================================
SELECT COUNT(*) as total_quiz_questions FROM public.quiz_questions;
