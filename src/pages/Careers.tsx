import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/services/api";
import { Search, TrendingUp, DollarSign } from "lucide-react";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  category: string;
  average_salary_min: number;
  average_salary_max: number;
  growth_outlook: string;
  required_skills: string[];
}

const Careers = () => {
  const [careers, setCareers] = useState<CareerPath[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<CareerPath[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  useEffect(() => {
    filterCareers();
  }, [careers, searchTerm, selectedCategory]);

  const fetchCareers = async () => {
    try {
      const { data } = await api.getCareers();
      setCareers(data || []);
    } catch (error) {
      console.error("Error fetching careers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCareers = () => {
    let filtered = careers;

    if (searchTerm) {
      filtered = filtered.filter(
        career =>
          career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          career.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          career.required_skills.some(skill =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(career => career.category === selectedCategory);
    }

    setFilteredCareers(filtered);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "arts", label: "Arts & Creative" },
    { value: "business", label: "Business" },
    { value: "engineering", label: "Engineering" },
    { value: "science", label: "Science" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Explore Career Paths
          </h1>
          <p className="text-muted-foreground">
            Discover opportunities that match your interests and skills
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search careers, skills, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCareers.length} of {careers.length} careers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map(career => (
                <Card key={career.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {career.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {career.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-accent" />
                        <span>
                          ${career.average_salary_min?.toLocaleString()} -
                          ${career.average_salary_max?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">
                          {career.growth_outlook}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {career.required_skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {career.required_skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{career.required_skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button asChild className="w-full" variant="outline">
                        <Link to={`/careers/${career.id}`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCareers.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    No careers found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Careers;