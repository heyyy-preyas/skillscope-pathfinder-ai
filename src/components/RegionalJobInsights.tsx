import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Briefcase, DollarSign } from "lucide-react";

const RegionalJobInsights = () => {
  const regions = [
    {
      location: "San Francisco Bay Area",
      topRole: "Software Engineer",
      avgSalary: "$165,000",
      openings: "12,500+",
      growth: "+18%",
      demand: "Very High"
    },
    {
      location: "New York City",
      topRole: "Product Manager",
      avgSalary: "$145,000",
      openings: "8,200+",
      growth: "+15%",
      demand: "High"
    },
    {
      location: "Austin, Texas",
      topRole: "UX Designer",
      avgSalary: "$110,000",
      openings: "5,800+",
      growth: "+22%",
      demand: "Very High"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Explore Careers Near You
          </h3>
          <p className="text-muted-foreground mt-1">
            Regional job market insights and opportunities
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card hover:shadow-accent transition-all duration-300 hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <Badge 
                    variant="secondary" 
                    className={
                      region.demand === "Very High" 
                        ? "bg-success/10 text-success border-0" 
                        : "bg-info/10 text-info border-0"
                    }
                  >
                    {region.demand} Demand
                  </Badge>
                </div>
                <CardTitle className="text-lg">{region.location}</CardTitle>
                <CardDescription className="text-base font-semibold text-foreground mt-1">
                  {region.topRole}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Avg. Salary
                  </span>
                  <span className="font-semibold text-foreground">{region.avgSalary}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Open Positions
                  </span>
                  <span className="font-semibold text-foreground">{region.openings}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Growth
                  </span>
                  <span className="font-semibold text-success">{region.growth}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RegionalJobInsights;
