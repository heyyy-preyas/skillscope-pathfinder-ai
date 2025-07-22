import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";

interface QuizQuestion {
  id: string;
  quiz_type: string;
  question: string;
  options: any;
  category: string;
}

const Quiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .order("quiz_type", { ascending: true });

      if (error) throw error;

      setQuestions(data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const generateCareerMatches = async () => {
    // Simple matching algorithm based on answers
    const { data: careerPaths } = await supabase
      .from("career_paths")
      .select("*");

    if (!careerPaths || !user) return;

    // Calculate matches based on answers (simplified algorithm)
    const matches = careerPaths.map(career => {
      let score = Math.random() * 0.4 + 0.6; // Random score between 0.6-1.0 for demo
      
      // Adjust score based on answers
      if (answers[Object.keys(answers)[0]] === "solving_problems" && career.category === "technology") {
        score = Math.min(1.0, score + 0.2);
      }
      if (answers[Object.keys(answers)[0]] === "creating_art" && career.category === "arts") {
        score = Math.min(1.0, score + 0.2);
      }

      return {
        user_id: user.id,
        career_path_id: career.id,
        match_score: Math.round(score * 100) / 100,
        reasoning: `Based on your quiz responses, this career aligns well with your interests and skills.`
      };
    });

    // Insert matches (handle conflicts)
    for (const match of matches) {
      await supabase
        .from("user_career_matches")
        .upsert(match, { onConflict: "user_id,career_path_id" });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setSubmitting(true);

    try {
      // Save quiz results
      const quizResult = {
        user_id: user.id,
        quiz_type: "interests" as const,
        answers: answers,
        scores: {},
        recommendations: []
      };

      const { error } = await supabase
        .from("quiz_results")
        .insert(quizResult);

      if (error) throw error;

      // Generate career matches
      await generateCareerMatches();

      // Update profile as onboarding completed
      await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("user_id", user.id);

      toast({
        title: "Assessment Complete!",
        description: "Your career recommendations are ready.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Error",
        description: "Failed to submit assessment",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <p>No quiz questions available at the moment.</p>
              <Button onClick={() => navigate("/")} className="mt-4">
                Go Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold gradient-text">Career Assessment</h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentQuestion.question}</CardTitle>
            <CardDescription>
              Choose the option that best describes you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestion.options.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!hasAnswer || submitting}
                  variant="hero"
                >
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Complete Assessment
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!hasAnswer}
                  variant="hero"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;