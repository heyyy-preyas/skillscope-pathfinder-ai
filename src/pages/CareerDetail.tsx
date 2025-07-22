import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Target
} from "lucide-react";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  category: string;
  average_salary_min: number;
  average_salary_max: number;
  growth_outlook: string;
  required_skills: string[];
  education_requirements: string[];
  roadmap?: any;
}

const CareerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState<CareerPath | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCareerDetail();
    }
  }, [id]);

  const fetchCareerDetail = async () => {
    try {
      const { data, error } = await supabase
        .from("career_paths")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setCareer(data);
    } catch (error) {
      console.error("Error fetching career detail:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-muted rounded"></div>
              <div className="h-48 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">Career not found.</p>
              <Button onClick={() => navigate("/careers")}>
                Back to Careers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/careers")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Careers
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold gradient-text">{career.title}</h1>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {career.category}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">{career.description}</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Salary Range</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${career.average_salary_min?.toLocaleString()} - 
                  ${career.average_salary_max?.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Annual salary range
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Outlook</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">Excellent</div>
                <p className="text-xs text-muted-foreground">
                  {career.growth_outlook}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time to Entry</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1-2 Years</div>
                <p className="text-xs text-muted-foreground">
                  With focused learning
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Skills & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>
                  Key competencies for success in this role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {career.required_skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education Requirements</CardTitle>
                <CardDescription>
                  Typical educational background needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {career.education_requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Career Roadmap */}
          {career.roadmap && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  How to Get There
                </CardTitle>
                <CardDescription>
                  Step-by-step path to launch your career
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {career.roadmap.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Duration: {step.duration}
                        </p>
                        {step.description && (
                          <p className="text-sm">{step.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="hero" className="flex-1">
              <Target className="mr-2 h-4 w-4" />
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <ExternalLink className="mr-2 h-4 w-4" />
              Find Courses
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <MapPin className="mr-2 h-4 w-4" />
              Job Market Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;