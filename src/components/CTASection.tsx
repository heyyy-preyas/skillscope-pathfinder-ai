import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Shield } from "lucide-react";

export const CTASection = () => {
  const benefits = [
    {
      icon: Clock,
      text: "Get results in 5 minutes"
    },
    {
      icon: Shield,
      text: "100% free to start"
    },
    {
      icon: Sparkles,
      text: "Personalized recommendations"
    }
  ];

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Discover Your
              <span className="block">Dream Career?</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect career path. 
              Take our AI-powered assessment and get personalized recommendations today.
            </p>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 py-8">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.text}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <benefit.icon className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="premium" 
              size="xl" 
              className="group bg-white text-primary hover:bg-white/90 hover:shadow-2xl"
            >
              Start Your Career Quiz
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Explore Careers
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 space-y-2">
            <div className="text-white/80 text-sm">
              Trusted by 50,000+ students • 4.9/5 rating • Free to start
            </div>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white/60 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};