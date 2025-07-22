import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MapPin, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Shield,
  Zap,
  Target
} from "lucide-react";

export const FeatureGrid = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description: "Advanced algorithms analyze your skills, interests, and personality to suggest perfect career matches.",
      color: "primary",
      badge: "Smart"
    },
    {
      icon: MapPin,
      title: "Regional Job Market",
      description: "Real-time data on local job opportunities, salary trends, and hiring patterns in your area.",
      color: "accent",
      badge: "Live Data"
    },
    {
      icon: BookOpen,
      title: "Learning Roadmaps",
      description: "Step-by-step guides with courses, certifications, and skills needed for your target career.",
      color: "success",
      badge: "Guided"
    },
    {
      icon: Users,
      title: "Mentor Network",
      description: "Connect with industry professionals and alumni who can guide your career journey.",
      color: "info",
      badge: "Community"
    },
    {
      icon: TrendingUp,
      title: "Emerging Careers",
      description: "Discover new and growing career paths that match your skills and interests.",
      color: "accent",
      badge: "Trending"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and private. We never share your information without consent.",
      color: "muted",
      badge: "Secure"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary border-primary/20";
      case "accent":
        return "bg-accent/10 text-accent border-accent/20";
      case "success":
        return "bg-success/10 text-success border-success/20";
      case "info":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-primary-light/20 text-primary border-primary/20">
            <Target className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Everything You Need to
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Succeed</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools and insights to help you make informed career decisions 
            and achieve your professional goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-border/50 bg-gradient-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorClasses(feature.color)}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Feature Highlight */}
        <div className="mt-16 bg-gradient-primary rounded-3xl p-8 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            Get Started in Under 5 Minutes
          </h3>
          
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Take our comprehensive career assessment and receive personalized recommendations 
            tailored to your unique profile and career aspirations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary hover:bg-white/90 font-semibold py-3 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg">
              Start Assessment
            </button>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};