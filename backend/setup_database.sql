-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student', -- 'student', 'mentor', 'admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Create jobs table (for caching/trending)
CREATE TABLE IF NOT EXISTS public.jobs_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  description TEXT,
  url TEXT,
  salary_range TEXT,
  source TEXT, -- 'linkedin', 'naukri', etc.
  domain TEXT, -- AI category or keyword
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.jobs_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jobs are viewable by everyone." ON public.jobs_cache FOR SELECT USING (true);
CREATE POLICY "Only service role can manage jobs." ON public.jobs_cache FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'Coursera', 'Udemy'
  url TEXT NOT NULL,
  imageUrl TEXT,
  rating NUMERIC,
  domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are viewable by everyone." ON public.courses FOR SELECT USING (true);

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
CREATE POLICY "Mentors are viewable by everyone." ON public.mentors FOR SELECT USING (true);

-- Create career_predictions table (history)
CREATE TABLE IF NOT EXISTS public.career_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  input_data JSONB, -- The answers provided
  predicted_career TEXT,
  confidence_score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.career_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see their own predictions." ON public.career_predictions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert predictions." ON public.career_predictions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create roadmaps table
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_goal TEXT,
  steps JSONB, -- Array of steps/milestones
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see their own roadmaps." ON public.roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert roadmaps." ON public.roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);
