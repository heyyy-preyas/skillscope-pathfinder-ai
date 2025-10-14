import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  User, 
  ArrowRight, 
  Briefcase,
  Award,
  Calendar,
  CheckCircle2
} from "lucide-react";
import CourseRecommendations from "@/components/CourseRecommendations";
import RegionalJobInsights from "@/components/RegionalJobInsights";

interface Profile {
  full_name: string | null;
  onboarding_completed: boolean;
}

interface CareerMatch {
  id: string;
  match_score: number;
  reasoning: string | null;
  career_paths: {
    id: string;
    title: string;
    description: string;
    category: string;
    average_salary_min: number;
    average_salary_max: number;
    growth_outlook: string;
  };
}

interface QuizRecommendation {
  careerTitle: string;
  matchScore: number;
  reasoning: string;
  roadmap: string[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [recommendations, setRecommendations] = useState<QuizRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, onboarding_completed")
        .eq("user_id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch career matches with reasoning
      const { data: matchesData } = await supabase
        .from("user_career_matches")
        .select(`
          id,
          match_score,
          reasoning,
          career_paths (
            id,
            title,
            description,
            category,
            average_salary_min,
            average_salary_max,
            growth_outlook
          )
        `)
        .eq("user_id", user.id)
        .order("match_score", { ascending: false })
        .limit(3);

      if (matchesData) {
        setCareerMatches(matchesData as CareerMatch[]);
      }

      // Fetch latest quiz results with AI recommendations
      const { data: quizData } = await supabase
        .from("quiz_results")
        .select("recommendations")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(1)
        .single();

      if (quizData?.recommendations && Array.isArray(quizData.recommendations)) {
        const recs = quizData.recommendations as any[];
        if (recs.length > 0 && typeof recs[0] === 'object' && 'careerTitle' in recs[0]) {
          setRecommendations(recs as QuizRecommendation[]);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-xl text-muted-foreground">Loading your dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  const profileCompletion = profile?.onboarding_completed ? 100 : 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-5" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {profile?.full_name || "there"}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Continue your journey to finding the perfect career path
            </p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-card hover:shadow-primary transition-all duration-300 border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                <User className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{profileCompletion}%</div>
                <Progress value={profileCompletion} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {profile?.onboarding_completed ? "Profile complete!" : "Complete your profile to unlock more features"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-card hover:shadow-accent transition-all duration-300 border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Career Matches</CardTitle>
                <Target className="w-4 h-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{careerMatches.length}</div>
                <p className="text-xs text-muted-foreground">
                  {careerMatches.length > 0 ? "Top career paths for you" : "Take the assessment to get matches"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass-card hover:shadow-glow transition-all duration-300 border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                <BookOpen className="w-4 h-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">0</div>
                <p className="text-xs text-muted-foreground">Courses in progress</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Career Recommendations Section */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Award className="w-8 h-8 text-primary" />
                  Your AI-Powered Career Matches
                </h2>
                <p className="text-muted-foreground mt-1">
                  Personalized recommendations based on your assessment
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/quiz")} className="glass">
                Retake Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid lg:grid-cols-1 gap-6">
              {recommendations.map((rec, index) => {
                const match = careerMatches.find(m => 
                  m.career_paths.title.toLowerCase() === rec.careerTitle.toLowerCase()
                );
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="glass-card hover:shadow-primary transition-all duration-300 border-0">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className="bg-gradient-primary text-white border-0 text-lg px-4 py-1">
                                {rec.matchScore}% Match
                              </Badge>
                              {match && (
                                <Badge variant="outline" className="border-border/50">
                                  {match.career_paths.category}
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-2xl mb-2">{rec.careerTitle}</CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {rec.reasoning}
                            </CardDescription>
                          </div>
                          {match && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/careers/${match.career_paths.id}`)}
                              className="ml-4"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {match && (
                          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border/50">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Salary Range</span>
                              <span className="font-semibold text-foreground">
                                ${match.career_paths.average_salary_min?.toLocaleString()} - 
                                ${match.career_paths.average_salary_max?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Growth Outlook</span>
                              <span className="font-semibold text-success">
                                {match.career_paths.growth_outlook || "Positive"}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Your Roadmap to Success
                          </h4>
                          <div className="space-y-3">
                            {rec.roadmap.map((step, stepIndex) => (
                              <div 
                                key={stepIndex}
                                className="flex gap-3 items-start p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-semibold text-sm">
                                  {stepIndex + 1}
                                </div>
                                <p className="text-sm text-foreground pt-1 flex-1">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* No Assessment Taken */}
        {careerMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-card text-center py-12 border-0">
              <CardHeader>
                <Target className="w-16 h-16 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl mb-2">Discover Your Perfect Career Path</CardTitle>
                <CardDescription className="text-base max-w-md mx-auto">
                  Take our AI-powered assessment to get personalized career recommendations with detailed roadmaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/quiz")} 
                  size="lg"
                  className="shadow-glow hover:shadow-primary"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Regional Job Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <RegionalJobInsights />
        </motion.div>

        {/* Course Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <CourseRecommendations />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="glass-card hover:shadow-primary transition-all duration-300 cursor-pointer border-0"
            onClick={() => navigate("/quiz")}>
            <CardHeader>
              <CheckCircle2 className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Take Assessment</CardTitle>
              <CardDescription>
                Discover your ideal career paths with our AI-powered assessment
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card hover:shadow-accent transition-all duration-300 cursor-pointer border-0"
            onClick={() => navigate("/careers")}>
            <CardHeader>
              <Briefcase className="w-10 h-10 text-accent mb-2" />
              <CardTitle>Browse Careers</CardTitle>
              <CardDescription>
                Explore hundreds of career paths and find your perfect match
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card hover:shadow-glow transition-all duration-300 cursor-pointer border-0"
            onClick={() => navigate("/mentors")}>
            <CardHeader>
              <Calendar className="w-10 h-10 text-success mb-2" />
              <CardTitle>Find a Mentor</CardTitle>
              <CardDescription>
                Connect with industry experts for personalized guidance
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;