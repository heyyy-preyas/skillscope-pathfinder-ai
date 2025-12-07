import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { Search, MapPin, Briefcase, DollarSign, Clock, ExternalLink, Loader2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicationUrl: string;
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Remote");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a job title",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Use Node.js backend API
      const { data } = await api.getTrendingJobs(searchQuery, location);

      if (data) {
        // Backend returns raw format, need to map if necessary or enforce type
        // Current backend mock returns array of { title, company, location, salary, ... }
        // The UI expects detailed Job interface (requirements, PostedDate etc.)
        // We'll map the backend response to the UI state
        const mappedJobs: Job[] = data.map((j: any) => ({
          id: j.id || Math.random().toString(),
          title: j.title,
          company: j.company,
          location: j.location,
          type: 'Full-time', // Mock default
          salary: j.salary || 'Competitive',
          description: j.description || 'No description available',
          requirements: ['Experience with React', 'Node.js knowledge'], // Mock
          postedDate: new Date().toISOString(),
          applicationUrl: '#'
        }));

        setJobs(mappedJobs);

        if (mappedJobs.length === 0) {
          toast({
            title: "No jobs found",
            description: "Try adjusting your search criteria",
          });
        }
      }
    } catch (error: any) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error fetching jobs",
        description: error.message || "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

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
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Find Your Next Opportunity</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover live job openings tailored to your career interests
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass-card border-0">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Job title or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full shadow-glow hover:shadow-primary"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Searching..." : "Search Jobs"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {jobs.length} Jobs Found
              </h2>
            </div>

            <div className="grid gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="glass-card hover:shadow-primary transition-all duration-300 border-0">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                          <CardDescription className="text-base flex items-center gap-2 mb-3">
                            <Briefcase className="w-4 h-4" />
                            {job.company}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="border-border/50">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </Badge>
                            <Badge variant="outline" className="border-border/50">
                              {job.type}
                            </Badge>
                            <Badge variant="outline" className="border-border/50">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {job.salary}
                            </Badge>
                            <Badge variant="outline" className="border-border/50">
                              <Clock className="w-3 h-3 mr-1" />
                              {getTimeAgo(job.postedDate)}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={() => window.open(job.applicationUrl, '_blank')}
                        >
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-muted-foreground">{job.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!loading && jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-card text-center py-12 border-0">
              <CardHeader>
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl mb-2">Start Your Job Search</CardTitle>
                <CardDescription className="text-base max-w-md mx-auto">
                  Enter a job title or keyword to discover opportunities
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

export default Jobs;
