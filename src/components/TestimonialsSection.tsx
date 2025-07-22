import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Data Scientist at TCS",
      location: "Mumbai",
      image: "photo-1494790108755-2616b612b786",
      rating: 5,
      text: "SkillScope helped me transition from engineering to data science. The personalized roadmap and mentor connections were game-changers for my career."
    },
    {
      name: "Arjun Mehta",
      role: "UX Designer at Flipkart",
      location: "Bangalore",
      image: "photo-1507003211169-0a1dd7228f2d",
      rating: 5,
      text: "The AI assessment was incredibly accurate. It suggested UX design when I didn't even know it existed. Now I love what I do every day!"
    },
    {
      name: "Sneha Patel",
      role: "Product Manager at Zomato",
      location: "Delhi",
      image: "photo-1438761681033-6461ffad8d80",
      rating: 5,
      text: "From confused college graduate to confident product manager - SkillScope made this journey possible with clear guidance and industry insights."
    }
  ];

  const companies = [
    "Google", "Microsoft", "Amazon", "TCS", "Infosys", "Flipkart", "Paytm", "Zomato"
  ];

  return (
    <section className="py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            What Our Students
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Say</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from students who found their dream careers with SkillScope's guidance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-foreground leading-relaxed pl-6">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <img
                    src={`https://images.unsplash.com/${testimonial.image}?w=40&h=40&fit=crop&crop=faces`}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Logos */}
        <div className="text-center space-y-8">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Our alumni work at top companies
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div 
                key={company}
                className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};