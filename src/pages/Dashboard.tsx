import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, TrendingUp, Target, BookOpen, Users } from "lucide-react";

interface Profile {
  full_name: string;
  onboarding_completed: boolean;
  goals?: string[];
}

interface CareerMatch {
  career_path: {
    title: string;
    category: string;
    average_salary_min: number;
    average_salary_max: number;
  };
  match_score: number;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      setProfile(profileData);

      // Fetch career matches
      const { data: matchesData } = await supabase
        .from("user_career_matches")
        .select(`
          match_score,
          career_path:career_paths(title, category, average_salary_min, average_salary_max)
        `)
        .eq("user_id", user?.id)
        .order("match_score", { ascending: false })
        .limit(3);

      setCareerMatches(matchesData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back, {profile?.full_name || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Track your progress and discover new opportunities
          </p>
        </div>

        {!profile?.onboarding_completed && (
          <Card className="mb-8 border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Complete Your Profile
              </CardTitle>
              <CardDescription>
                Take our assessment to get personalized career recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/quiz")} variant="hero">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile?.onboarding_completed ? "100%" : "25%"}
              </div>
              <Progress 
                value={profile?.onboarding_completed ? 100 : 25} 
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Career Matches</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{careerMatches.length}</div>
              <p className="text-xs text-muted-foreground">
                Personalized recommendations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Courses completed
              </p>
            </CardContent>
          </Card>
        </div>

        {careerMatches.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Top Career Matches</CardTitle>
              <CardDescription>
                Based on your assessment results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{match.career_path.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${match.career_path.average_salary_min?.toLocaleString()} - 
                        ${match.career_path.average_salary_max?.toLocaleString()}
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {match.career_path.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">
                        {Math.round(match.match_score * 100)}%
                      </div>
                      <p className="text-xs text-muted-foreground">Match</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => navigate("/careers")}
              >
                Explore All Careers
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/quiz")}
              >
                <Target className="mr-2 h-4 w-4" />
                Retake Assessment
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/careers")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Careers
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled
              >
                <Users className="mr-2 h-4 w-4" />
                Find Mentors (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                No recent activity yet. Start exploring to see your progress here!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;