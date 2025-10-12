import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Clock, Award } from "lucide-react";

const CourseRecommendations = () => {
  const courses = [
    {
      platform: "Coursera",
      title: "Data Science Professional Certificate",
      provider: "IBM",
      duration: "10 months",
      level: "Beginner",
      link: "https://www.coursera.org",
      description: "Master data science fundamentals with hands-on projects"
    },
    {
      platform: "Udemy",
      title: "Complete Web Development Bootcamp",
      provider: "Dr. Angela Yu",
      duration: "65 hours",
      level: "All Levels",
      link: "https://www.udemy.com",
      description: "Build 15+ real-world projects while learning full-stack development"
    },
    {
      platform: "Coursera",
      title: "Google UX Design Certificate",
      provider: "Google",
      duration: "6 months",
      level: "Beginner",
      link: "https://www.coursera.org",
      description: "Learn user experience design from Google experts"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Suggested Courses
          </h3>
          <p className="text-muted-foreground mt-1">
            Curated learning paths to advance your career
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card h-full flex flex-col hover:shadow-primary transition-all duration-300 hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    {course.platform}
                  </Badge>
                  <Badge variant="outline" className="border-border/50">
                    {course.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {course.provider}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {course.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={() => window.open(course.link, '_blank')}
                >
                  View Course
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseRecommendations;
