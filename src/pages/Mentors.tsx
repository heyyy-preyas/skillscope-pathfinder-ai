import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Star, MessageCircle, Calendar, Briefcase, Loader2 } from "lucide-react";

interface Mentor {
  id: string;
  user_id: string;
  expertise_areas: string[];
  experience_years: number;
  company: string;
  bio: string;
  hourly_rate: number;
  rating: number;
  total_sessions: number;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const { data: mentorsData, error } = await supabase
        .from("mentors")
        .select("*")
        .order("rating", { ascending: false });

      if (error) throw error;

      if (mentorsData) {
        const mentorsWithProfiles = await Promise.all(
          mentorsData.map(async (mentor) => {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("full_name, avatar_url")
              .eq("user_id", mentor.user_id)
              .single();

            return {
              ...mentor,
              profiles: {
                full_name: profileData?.full_name || "Anonymous",
                avatar_url: profileData?.avatar_url || ""
              }
            };
          })
        );

        setMentors(mentorsWithProfiles as Mentor[]);
      }
    } catch (error: any) {
      console.error("Error fetching mentors:", error);
      toast({
        title: "Error loading mentors",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookCall = (mentorId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book a call with a mentor",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    toast({
      title: "Booking system coming soon!",
      description: "This feature will be available shortly",
    });
  };

  const handleStartChat = (mentorId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to chat with a mentor",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    navigate(`/chat/${mentorId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Connect with Expert Mentors</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance from industry professionals
          </p>
        </motion.div>

        {mentors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="glass-card hover:shadow-primary transition-all duration-300 border-0 h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.profiles.avatar_url || undefined} />
                        <AvatarFallback className="bg-gradient-primary text-white text-lg">
                          {mentor.profiles.full_name?.charAt(0) || "M"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">
                          {mentor.profiles.full_name || "Anonymous Mentor"}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mb-2">
                          <Briefcase className="w-3 h-3" />
                          {mentor.company || "Tech Professional"}
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-semibold">{mentor.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({mentor.total_sessions} sessions)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold">Expertise</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise_areas.slice(0, 3).map((area, idx) => (
                          <Badge key={idx} variant="outline" className="border-border/50">
                            {area}
                          </Badge>
                        ))}
                        {mentor.expertise_areas.length > 3 && (
                          <Badge variant="outline" className="border-border/50">
                            +{mentor.expertise_areas.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {mentor.bio || "Experienced professional ready to help you grow in your career."}
                    </p>

                    <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-semibold">${mentor.hourly_rate}/hour</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartChat(mentor.id)}
                        className="flex-1"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => handleBookCall(mentor.id)}
                        className="flex-1"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-card text-center py-12 border-0">
              <CardHeader>
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl mb-2">No Mentors Available</CardTitle>
                <CardDescription className="text-base max-w-md mx-auto">
                  Check back soon for expert mentors in your field
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Mentors;
