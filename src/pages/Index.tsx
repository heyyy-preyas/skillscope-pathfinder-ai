import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Assessments",
      description: "Take personalized career assessments that analyze your skills, interests, and goals"
    },
    {
      icon: TrendingUp,
      title: "Career Matches",
      description: "Discover your top career paths with detailed insights and growth projections"
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Connect with industry professionals for guidance and career advancement"
    },
    {
      icon: BookOpen,
      title: "Learning Paths",
      description: "Get curated course recommendations from top platforms like Coursera and Udemy"
    }
  ];

  const stats = [
    { value: "10K+", label: "Career Paths Analyzed" },
    { value: "500+", label: "Expert Mentors" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "50+", label: "Industries Covered" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-6 py-2 bg-gradient-primary text-white border-0" variant="secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Pathfinder
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Your Perfect
              <span className="block gradient-text">Career Path</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let AI guide you through personalized assessments, career matches, and expert mentorship to find your dream career
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button size="xl" className="group shadow-glow hover:shadow-primary">
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/careers">
                <Button size="xl" variant="outline" className="glass-card">
                  Explore Careers
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="gradient-text"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources to guide your career journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card hover:shadow-primary transition-all duration-300 hover:-translate-y-1 h-full border-0">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-glow">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-10" />
            <div className="relative z-10">
              <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Find Your Dream Career?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've discovered their perfect career path with SkillScope
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="xl" className="shadow-glow hover:shadow-primary">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button size="xl" variant="outline" className="glass">
                    Browse Careers
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
