-- Populate career paths with real data
INSERT INTO public.career_paths (title, category, description, average_salary_min, average_salary_max, growth_outlook, required_skills, education_requirements, roadmap) VALUES
('Software Engineer', 'technology', 'Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to solve complex problems.', 80000, 180000, 'Excellent - 22% growth expected by 2030', 
ARRAY['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'Problem Solving', 'Data Structures', 'Algorithms'], 
ARRAY['Bachelor''s in Computer Science or related field', 'Coding bootcamp or self-taught with strong portfolio', 'Relevant certifications (AWS, Azure, etc.)'],
'{"steps": [{"title": "Learn Programming Fundamentals", "duration": "3-6 months", "description": "Master core programming concepts, data structures, and algorithms"}, {"title": "Build Projects & Portfolio", "duration": "3-6 months", "description": "Create 5-10 projects showcasing different skills"}, {"title": "Practice Coding Interviews", "duration": "2-3 months", "description": "Solve LeetCode problems and mock interviews"}, {"title": "Apply & Interview", "duration": "1-2 months", "description": "Apply to 50+ positions, network, and interview"}]}'::jsonb),

('Data Scientist', 'technology', 'Analyze complex data to help organizations make better decisions using statistical methods, machine learning, and data visualization.', 90000, 170000, 'Excellent - 36% growth expected by 2030',
ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'TensorFlow', 'Pandas', 'Data Visualization', 'Communication', 'Business Acumen'],
ARRAY['Master''s in Data Science, Statistics, or related field', 'Bachelor''s with relevant experience', 'Online certifications (Coursera, DataCamp)'],
'{"steps": [{"title": "Master Statistics & Math", "duration": "4-6 months", "description": "Learn probability, statistics, linear algebra"}, {"title": "Learn Python & Data Tools", "duration": "3-4 months", "description": "Master pandas, numpy, scikit-learn, visualization"}, {"title": "Build ML Projects", "duration": "4-6 months", "description": "Complete Kaggle competitions and real-world projects"}, {"title": "Network & Apply", "duration": "2-3 months", "description": "Build portfolio, network, and apply to positions"}]}'::jsonb),

('UX/UI Designer', 'technology', 'Create intuitive and visually appealing digital experiences by understanding user needs and designing interfaces that are both functional and beautiful.', 65000, 130000, 'Good - 13% growth expected by 2030',
ARRAY['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping', 'Visual Design', 'Typography', 'Color Theory', 'Wireframing', 'HTML/CSS'],
ARRAY['Bachelor''s in Design or related field', 'Design bootcamp certification', 'Strong portfolio (more important than degree)'],
'{"steps": [{"title": "Learn Design Fundamentals", "duration": "2-3 months", "description": "Master design principles, color theory, typography"}, {"title": "Master Design Tools", "duration": "2-3 months", "description": "Become proficient in Figma, Adobe XD"}, {"title": "Build Portfolio", "duration": "4-6 months", "description": "Complete 5-8 case studies showing your process"}, {"title": "Network & Apply", "duration": "1-2 months", "description": "Join design communities, apply to positions"}]}'::jsonb),

('Registered Nurse', 'healthcare', 'Provide direct patient care, administer medications, coordinate care plans, and serve as patient advocates in various healthcare settings.', 60000, 95000, 'Excellent - 9% growth expected by 2030',
ARRAY['Patient Care', 'Medical Knowledge', 'Critical Thinking', 'Communication', 'Empathy', 'Time Management', 'EMR Systems', 'IV Administration', 'Vital Signs', 'Emergency Response'],
ARRAY['Associate''s or Bachelor''s of Science in Nursing (BSN)', 'Pass NCLEX-RN examination', 'State nursing license', 'CPR certification'],
'{"steps": [{"title": "Complete Nursing Program", "duration": "2-4 years", "description": "Earn ADN or BSN degree from accredited program"}, {"title": "Pass NCLEX-RN", "duration": "1-2 months", "description": "Study and pass nursing licensure exam"}, {"title": "Gain Clinical Experience", "duration": "1-2 years", "description": "Work in various departments to find specialty"}, {"title": "Pursue Specialization", "duration": "Ongoing", "description": "Consider ICU, ER, Pediatrics, or other specialties"}]}'::jsonb),

('Financial Analyst', 'finance', 'Analyze financial data, create reports, and provide insights to help organizations make informed business and investment decisions.', 60000, 110000, 'Good - 9% growth expected by 2030',
ARRAY['Excel', 'Financial Modeling', 'SQL', 'Data Analysis', 'Accounting', 'Forecasting', 'Presentation Skills', 'Bloomberg Terminal', 'PowerBI', 'Communication'],
ARRAY['Bachelor''s in Finance, Economics, or Business', 'CFA certification (recommended)', 'Internship experience in finance'],
'{"steps": [{"title": "Earn Finance Degree", "duration": "4 years", "description": "Complete bachelor''s in finance or economics"}, {"title": "Gain Internship Experience", "duration": "3-6 months", "description": "Complete 1-2 finance internships"}, {"title": "Master Financial Tools", "duration": "3-6 months", "description": "Advanced Excel, SQL, financial modeling"}, {"title": "Start CFA Program", "duration": "2-4 years", "description": "Begin working toward CFA certification"}]}'::jsonb),

('Digital Marketing Manager', 'business', 'Develop and execute digital marketing strategies across multiple channels to drive brand awareness, engagement, and conversions.', 55000, 120000, 'Good - 10% growth expected by 2030',
ARRAY['SEO', 'Google Analytics', 'Content Marketing', 'Social Media', 'Email Marketing', 'PPC Advertising', 'Marketing Automation', 'A/B Testing', 'Copywriting', 'Data Analysis'],
ARRAY['Bachelor''s in Marketing or related field', 'Digital marketing certifications (Google, HubSpot)', 'Portfolio of successful campaigns'],
'{"steps": [{"title": "Learn Digital Marketing Basics", "duration": "2-3 months", "description": "Complete Google and HubSpot certifications"}, {"title": "Gain Practical Experience", "duration": "6-12 months", "description": "Intern or freelance on real campaigns"}, {"title": "Specialize & Build Portfolio", "duration": "6-12 months", "description": "Focus on 2-3 channels, document results"}, {"title": "Apply for Manager Roles", "duration": "1-2 months", "description": "Target mid-level positions with your experience"}]}'::jsonb),

('Mechanical Engineer', 'engineering', 'Design, develop, and test mechanical systems and devices, from small components to large machinery and vehicles.', 65000, 115000, 'Good - 7% growth expected by 2030',
ARRAY['CAD Software', 'AutoCAD', 'SolidWorks', 'Thermodynamics', 'Materials Science', 'Problem Solving', 'Project Management', 'Manufacturing Processes', 'FEA Analysis', 'Technical Writing'],
ARRAY['Bachelor''s in Mechanical Engineering', 'PE license (for advanced roles)', 'Internship or co-op experience'],
'{"steps": [{"title": "Earn Engineering Degree", "duration": "4 years", "description": "Complete ABET-accredited ME program"}, {"title": "Complete Internships", "duration": "3-6 months", "description": "Gain hands-on engineering experience"}, {"title": "Master CAD Tools", "duration": "Ongoing", "description": "Become proficient in SolidWorks, AutoCAD"}, {"title": "Consider PE License", "duration": "4+ years", "description": "Gain experience and pass PE exam"}]}'::jsonb),

('High School Teacher', 'education', 'Educate and inspire students in grades 9-12, develop curriculum, assess student progress, and foster a positive learning environment.', 45000, 75000, 'Average - 4% growth expected by 2030',
ARRAY['Curriculum Development', 'Classroom Management', 'Communication', 'Patience', 'Subject Matter Expertise', 'Technology Integration', 'Assessment', 'Differentiation', 'Collaboration', 'Empathy'],
ARRAY['Bachelor''s degree in Education or subject area', 'State teaching license/certification', 'Student teaching experience', 'Background check clearance'],
'{"steps": [{"title": "Earn Bachelor''s Degree", "duration": "4 years", "description": "Complete education program with certification"}, {"title": "Student Teaching", "duration": "3-6 months", "description": "Complete supervised teaching practicum"}, {"title": "Pass Certification Exams", "duration": "1-2 months", "description": "Pass state-required teaching exams"}, {"title": "Apply for Positions", "duration": "1-3 months", "description": "Apply to school districts"}]}'::jsonb),

('Graphic Designer', 'arts', 'Create visual content for print and digital media, including logos, marketing materials, websites, and brand identities.', 40000, 80000, 'Average - 3% growth expected by 2030',
ARRAY['Adobe Creative Suite', 'Typography', 'Color Theory', 'Layout Design', 'Branding', 'Illustration', 'Print Design', 'Web Design', 'Communication', 'Creativity'],
ARRAY['Bachelor''s in Graphic Design or related field', 'Design portfolio (essential)', 'Adobe certifications (optional)'],
'{"steps": [{"title": "Learn Design Fundamentals", "duration": "3-6 months", "description": "Master principles, Adobe tools"}, {"title": "Build Portfolio", "duration": "6-12 months", "description": "Create 10-15 diverse design pieces"}, {"title": "Gain Experience", "duration": "6-12 months", "description": "Freelance or intern to build skills"}, {"title": "Apply & Network", "duration": "1-2 months", "description": "Join design communities, apply to jobs"}]}'::jsonb),

('Cybersecurity Analyst', 'technology', 'Protect organizations from cyber threats by monitoring networks, identifying vulnerabilities, and implementing security measures.', 75000, 140000, 'Excellent - 35% growth expected by 2030',
ARRAY['Network Security', 'Penetration Testing', 'SIEM Tools', 'Incident Response', 'Threat Analysis', 'Linux', 'Python', 'Risk Assessment', 'Compliance', 'Ethical Hacking'],
ARRAY['Bachelor''s in Cybersecurity or IT', 'CompTIA Security+', 'CEH or CISSP certification', 'Hands-on security experience'],
'{"steps": [{"title": "Learn IT Fundamentals", "duration": "3-6 months", "description": "Get CompTIA A+ and Network+"}, {"title": "Security+ Certification", "duration": "2-3 months", "description": "Earn foundational security cert"}, {"title": "Hands-on Security Practice", "duration": "6-12 months", "description": "Use TryHackMe, HackTheBox"}, {"title": "Advanced Certifications", "duration": "6-12 months", "description": "Pursue CEH, CISSP, or specialized certs"}]}'::jsonb);

-- Populate quiz questions with real assessment questions
INSERT INTO public.quiz_questions (quiz_type, question, options, category, weight) VALUES
('interests', 'What type of work environment appeals to you most?', 
'{"options": [
  {"text": "Working independently on challenging technical problems", "value": "technical_solo"},
  {"text": "Collaborating with teams to build innovative solutions", "value": "collaborative_tech"},
  {"text": "Directly helping and caring for people", "value": "people_care"},
  {"text": "Creating visual content and designs", "value": "creative_visual"},
  {"text": "Analyzing data and providing strategic insights", "value": "analytical"}
]}'::jsonb, 'work_style', 3),

('interests', 'Which activities do you enjoy in your free time?', 
'{"options": [
  {"text": "Building or coding personal projects", "value": "tech_building"},
  {"text": "Reading research papers or learning new concepts", "value": "research_learning"},
  {"text": "Volunteering or helping others", "value": "service_oriented"},
  {"text": "Creating art, design, or content", "value": "creative_making"},
  {"text": "Playing strategy games or solving puzzles", "value": "problem_solving"}
]}'::jsonb, 'interests', 2),

('interests', 'How do you prefer to solve problems?', 
'{"options": [
  {"text": "Writing code or building technical solutions", "value": "technical_build"},
  {"text": "Analyzing data and finding patterns", "value": "data_analysis"},
  {"text": "Brainstorming creative approaches", "value": "creative_thinking"},
  {"text": "Collaborating with others to find solutions", "value": "team_problem_solving"},
  {"text": "Following established processes and procedures", "value": "systematic"}
]}'::jsonb, 'problem_solving', 3),

('interests', 'What subject did you enjoy most in school?', 
'{"options": [
  {"text": "Mathematics and logical reasoning", "value": "math_logic"},
  {"text": "Science and research", "value": "science"},
  {"text": "Art, design, or creative writing", "value": "creative_arts"},
  {"text": "Social studies and understanding people", "value": "social_studies"},
  {"text": "Business and economics", "value": "business"}
]}'::jsonb, 'academic', 2),

('interests', 'Which best describes your ideal work-life balance?', 
'{"options": [
  {"text": "Flexible remote work with project deadlines", "value": "flexible_remote"},
  {"text": "Structured 9-5 with clear boundaries", "value": "structured"},
  {"text": "Shift-based work in healthcare or service", "value": "shift_work"},
  {"text": "Self-employed with full control", "value": "entrepreneurial"},
  {"text": "Dynamic schedule with variety", "value": "dynamic"}
]}'::jsonb, 'lifestyle', 2),

('interests', 'What motivates you most in your career?', 
'{"options": [
  {"text": "Solving complex technical challenges", "value": "technical_challenges"},
  {"text": "Making a positive impact on people''s lives", "value": "social_impact"},
  {"text": "Creating something beautiful or innovative", "value": "creative_innovation"},
  {"text": "Financial success and stability", "value": "financial"},
  {"text": "Continuous learning and growth", "value": "learning_growth"}
]}'::jsonb, 'motivation', 3),

('interests', 'How comfortable are you with technology?', 
'{"options": [
  {"text": "Expert - I build and code technology", "value": "tech_expert"},
  {"text": "Advanced - I use complex software daily", "value": "tech_advanced"},
  {"text": "Intermediate - I''m comfortable with common tools", "value": "tech_intermediate"},
  {"text": "Basic - I use technology when needed", "value": "tech_basic"},
  {"text": "Prefer minimal technology in my work", "value": "tech_minimal"}
]}'::jsonb, 'technical_skill', 3),

('interests', 'What type of recognition do you value most?', 
'{"options": [
  {"text": "Appreciation from those I''ve helped", "value": "personal_gratitude"},
  {"text": "Professional awards and certifications", "value": "professional_recognition"},
  {"text": "Financial bonuses and promotions", "value": "financial_reward"},
  {"text": "Seeing my creative work appreciated", "value": "creative_validation"},
  {"text": "Respect from technical peers", "value": "peer_respect"}
]}'::jsonb, 'values', 2),

('interests', 'How do you handle stress and pressure?', 
'{"options": [
  {"text": "I thrive under pressure and tight deadlines", "value": "pressure_positive"},
  {"text": "I manage stress well with proper planning", "value": "stress_managed"},
  {"text": "I prefer steady, predictable workload", "value": "steady_pace"},
  {"text": "I need breaks and low-stress environment", "value": "low_stress"},
  {"text": "I''m adaptable to varying stress levels", "value": "adaptable"}
]}'::jsonb, 'work_style', 2),

('interests', 'What size company would you prefer to work for?', 
'{"options": [
  {"text": "Large corporation with structure and benefits", "value": "large_corp"},
  {"text": "Mid-size company with growth potential", "value": "mid_size"},
  {"text": "Startup with innovation and rapid change", "value": "startup"},
  {"text": "Small business with close-knit team", "value": "small_business"},
  {"text": "Self-employment or freelancing", "value": "independent"}
]}'::jsonb, 'work_environment', 2),

('interests', 'Which skills do you want to develop most?', 
'{"options": [
  {"text": "Programming and software development", "value": "programming"},
  {"text": "Data analysis and visualization", "value": "data_skills"},
  {"text": "Design and creative production", "value": "design_skills"},
  {"text": "Leadership and people management", "value": "leadership"},
  {"text": "Healthcare and patient care", "value": "healthcare_skills"}
]}'::jsonb, 'skill_interest', 3),

('interests', 'How important is job security to you?', 
'{"options": [
  {"text": "Very important - I need stability", "value": "security_high"},
  {"text": "Important but willing to take calculated risks", "value": "security_moderate"},
  {"text": "Less important - I value growth over security", "value": "security_low"},
  {"text": "Not important - I''m entrepreneurial", "value": "security_minimal"},
  {"text": "Varies depending on life circumstances", "value": "security_flexible"}
]}'::jsonb, 'values', 2),

('interests', 'What type of communication do you prefer?', 
'{"options": [
  {"text": "Written documentation and async communication", "value": "written_async"},
  {"text": "Face-to-face meetings and presentations", "value": "face_to_face"},
  {"text": "Quick chats and instant messaging", "value": "instant_messaging"},
  {"text": "Visual presentations and diagrams", "value": "visual_communication"},
  {"text": "Mix of all communication styles", "value": "mixed_communication"}
]}'::jsonb, 'communication', 2),

('interests', 'What''s your approach to learning new skills?', 
'{"options": [
  {"text": "Self-taught through online resources", "value": "self_taught"},
  {"text": "Formal education and structured courses", "value": "formal_education"},
  {"text": "Learning by doing and experimentation", "value": "hands_on"},
  {"text": "Mentorship and guidance from experts", "value": "mentorship"},
  {"text": "Combination of multiple approaches", "value": "mixed_learning"}
]}'::jsonb, 'learning_style', 2),

('interests', 'Which work outcome matters most to you?', 
'{"options": [
  {"text": "Building something that scales and lasts", "value": "lasting_impact"},
  {"text": "Improving people''s health and wellbeing", "value": "health_impact"},
  {"text": "Creating beautiful, inspiring work", "value": "aesthetic_impact"},
  {"text": "Driving business growth and revenue", "value": "business_impact"},
  {"text": "Advancing knowledge and innovation", "value": "innovation_impact"}
]}'::jsonb, 'impact', 3);