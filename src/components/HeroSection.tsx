import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-background to-accent-light/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-10 animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-accent rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary-light/20 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Career Guidance
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover Your
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Perfect Career</span>
                Path
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Get personalized career recommendations based on your skills, interests, and local job market trends. 
                Start your journey to a fulfilling career today.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Start Career Quiz
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">Students Guided</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <img
                src={heroImage}
                alt="Career guidance visualization"
                className="w-full h-auto rounded-3xl shadow-large"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-card border border-border rounded-2xl shadow-medium p-4 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-card-foreground">AI Match: 98%</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl shadow-medium p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-sm font-medium text-card-foreground">Data Scientist</div>
                <div className="text-xs text-muted-foreground">₹12-18L Average Salary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};