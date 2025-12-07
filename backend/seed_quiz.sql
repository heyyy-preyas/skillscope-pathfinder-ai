-- Add quiz_questions table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_type TEXT DEFAULT 'riasec', -- 'riasec', 'skill', etc.
  question TEXT NOT NULL,
  options JSONB, -- { "options": [ { "text": "Strongly Agree", "value": "5" }, ... ] }
  category TEXT, -- 'R', 'I', 'A', 'S', 'E', 'C'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quiz questions are viewable by everyone." ON public.quiz_questions FOR SELECT USING (true);

-- Seed RIASEC Questions (Realistic, Investigative, Artistic, Social, Enterprising, Conventional)
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
('I enjoy following established coding standards and patterns.', 'Conventional', '{"options": [{"text": "Dislike", "value": "1"}, {"text": "Neutral", "value": "3"}, {"text": "Like", "value": "5"}]}');
