import random

class CareerPredictor:
    def __init__(self):
        # Load pre-trained model here (e.g., pickle, spaCy)
        # self.model = pickle.load(open('model.pkl', 'rb'))
        pass

    def predict(self, answers):
        """
        Analyzes quiz answers and returns career path + confidence + behavioral profile.
        Input: dictionary of answers { "q_id": "value" } (value: 1-5 scale)
        or list of answer objects with category.
        
        For this prototype, we assume the Node backend passes formatted answers:
        {
          "answers": [
            {"category": "Realistic", "score": 5},
            {"category": "Investigative", "score": 3},
            ...
          ]
        }
        """
        
        # 1. Parse Input
        # If input is raw dictionary, we might need a mapping step. 
        # But let's assume the Controller aggregates scores before sending or sends categories.
        # Let's handle list of {category, score} for flexibility.
        
        scores = {
            "Realistic": 0,
            "Investigative": 0,
            "Artistic": 0,
            "Social": 0,
            "Enterprising": 0,
            "Conventional": 0
        }
        
        # Helper to normalize input
        input_answers = answers.get('answers', [])
        if isinstance(input_answers, dict):
             # Handle if passed as direct key-value map
             pass 

        for ans in input_answers:
            cat = ans.get('category')
            val = int(ans.get('value', 0))
            if cat in scores:
                scores[cat] += val

        # 2. Determine Top Traits
        # Sort scores descending
        sorted_traits = sorted(scores.items(), key=lambda item: item[1], reverse=True)
        top_trait = sorted_traits[0][0]
        secondary_trait = sorted_traits[1][0]
        
        # 3. Map Traits to Careers (RIASEC Model)
        # This is a simplified mapping database
        career_map = {
            "Realistic": ["Software Engineer", "Network Administrator", "DevOps Engineer", "Robotics Engineer"],
            "Investigative": ["Data Scientist", "Cybersecurity Analyst", "AI Researcher", "Systems Analyst"],
            "Artistic": ["UX/UI Designer", "Frontend Developer", "Game Designer", "Digital Marketer"],
            "Social": ["Product Manager", "Tech Lead", "Scrum Master", "Developer Advocate"],
            "Enterprising": ["Startup Founder", "IT Project Manager", "Sales Engineer", "Business Analyst"],
            "Conventional": ["QA Engineer", "Database Administrator", "Technical Writer", "Compliance Officer"]
        }
        
        # Select career based on primary + secondary overlap or just primary
        primary_pool = career_map.get(top_trait, [])
        secondary_pool = career_map.get(secondary_trait, [])
        
        # Weighted recommendation
        recommendations = primary_pool[:2] + secondary_pool[:1]
        predicted_career = recommendations[0] if recommendations else "General Tech Role"
        
        confidence = 0.85 # Base confidence
        
        # 4. Generate Behavioral Profile
        profiles = {
            "Realistic": "You are a 'Doer'. You enjoy practical, hands-on activities and building things.",
            "Investigative": "You are a 'Thinker'. You enjoy solving complex problems and researching how things work.",
            "Artistic": "You are a 'Creator'. You value self-expression, innovation, and aesthetic design.",
            "Social": "You are a 'Helper'. You enjoy working with people, mentoring, and collaborating.",
            "Enterprising": "You are a 'Persuader'. You are energetic, ambitious, and enjoy leading projects.",
            "Conventional": "You are an 'Organizer'. You value structure, precision, and efficiency in systems."
        }
        
        profile_text = f"{profiles.get(top_trait, '')} You also show traits of a {secondary_trait}."

        return {
            "career": predicted_career,
            "confidence": confidence,
            "domain": top_trait,
            "behavioral_profile": profile_text,
            "top_traits": [top_trait, secondary_trait],
            "recommendations": recommendations 
        }
