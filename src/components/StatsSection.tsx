import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Briefcase, Award } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Students Guided",
      description: "Young professionals found their ideal career path",
      color: "primary"
    },
    {
      icon: Briefcase,
      value: "2,500+",
      label: "Career Paths",
      description: "From traditional to emerging roles",
      color: "accent"
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      description: "Students satisfied with their career choices",
      color: "success"
    },
    {
      icon: TrendingUp,
      value: "40%",
      label: "Salary Increase",
      description: "Average improvement after following our guidance",
      color: "info"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "accent":
        return "bg-accent/10 text-accent";
      case "success":
        return "bg-success/10 text-success";
      case "info":
        return "bg-info/10 text-info";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-accent-light/20 text-accent border-accent/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Impact & Results
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Trusted by Students
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Nationwide</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform has helped thousands of students discover their perfect career match
            and achieve their professional goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center space-y-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-16 bg-gradient-card rounded-3xl p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Real Results, Real Impact
              </h3>
              <p className="text-muted-foreground">
                Our comprehensive approach combines AI-powered assessments with real-world market data
                to provide actionable insights that lead to meaningful career outcomes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
              <div className="bg-accent/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};