import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ArrowLeft, Loader2, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

interface RoadmapStep {
    week: number;
    title: string;
    details: string;
    resource: string;
    status?: 'pending' | 'completed';
}

const Roadmap = () => {
    const { goal } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
    const [careerTitle, setCareerTitle] = useState(goal || "Career");

    useEffect(() => {
        if (goal) {
            fetchRoadmap(goal);
        }
    }, [goal]);

    const fetchRoadmap = async (careerGoal: string) => {
        try {
            // Fetch dynamic roadmap from backend (which uses Mock/AI)
            const { data } = await api.generateRoadmap(careerGoal);
            if (data && data.steps) {
                setRoadmap(data.steps.map((s: any) => ({ ...s, status: 'pending' })));
                setCareerTitle(data.career_goal || careerGoal);
            }
        } catch (error) {
            console.error("Failed to load roadmap", error);
            toast({
                title: "Error",
                description: "Could not generate roadmap. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleStep = (index: number) => {
        setRoadmap(prev => prev.map((step, i) =>
            i === index ? { ...step, status: step.status === 'completed' ? 'pending' : 'completed' } : step
        ));
    };

    const progress = Math.round((roadmap.filter(s => s.status === 'completed').length / roadmap.length) * 100) || 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Generating your personalized AI roadmap...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">
                            {careerTitle} Roadmap
                        </h1>
                        <p className="text-muted-foreground">
                            Your 6-month step-by-step guide to success
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-10 bg-secondary/30 h-4 rounded-full overflow-hidden w-full max-w-3xl">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                    />
                </div>
                <p className="text-right text-sm text-muted-foreground -mt-8 mb-8 max-w-3xl">
                    {progress}% Completed
                </p>

                <div className="space-y-6 max-w-4xl">
                    {roadmap.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                className={`glass-card border-0 transition-all duration-300 ${step.status === 'completed' ? 'opacity-70' : 'hover:shadow-lg'
                                    }`}
                            >
                                <CardContent className="p-6 flex gap-4">
                                    <div className="pt-1 cursor-pointer" onClick={() => toggleStep(index)}>
                                        {step.status === 'completed' ? (
                                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                                        ) : (
                                            <Circle className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                                                    Week {step.week}
                                                </span>
                                                <h3 className={`text-xl font-bold ${step.status === 'completed' ? 'line-through text-muted-foreground' : ''
                                                    }`}>
                                                    {step.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground mb-4">
                                            {step.details}
                                        </p>

                                        {step.resource && (
                                            <div className="bg-secondary/20 p-3 rounded-lg text-sm border border-border/50 inline-block">
                                                <span className="font-semibold mr-2">Recommended Resource:</span>
                                                <a href="#" className="text-primary hover:underline">
                                                    {step.resource}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">Completed all steps?</p>
                    <Button size="lg" variant="hero" onClick={() => navigate('/jobs')}>
                        Find {careerTitle} Jobs
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default Roadmap;
