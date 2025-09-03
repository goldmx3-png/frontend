import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { JobCard } from "@/components/JobCard";
import { JobFilters } from "@/components/JobFilters";
import { AIAssistant } from "@/components/AIAssistant";
import { AppliedJobs } from "@/components/AppliedJobs";
import { JobListSkeleton } from "@/components/skeletons/JobListSkeleton";
import ResumeGenerator from "@/components/ResumeGenerator";
import { useToast } from "@/hooks/use-toast";

const mockJobs = [
  {
    id: "1",
    title: "Software Engineer II",
    company: "Circle",
    location: "SLC Metro Area",
    salary: "$120K/yr - $162K/yr",
    type: "Full-time",
    level: "Entry, Mid Level",
    experience: "2+ years exp",
    applicants: 200,
    matchPercentage: 85,
    matchLevel: "GOOD MATCH" as const,
    description: "Banking • Blockchain • Public Company",
    tags: ["Banking", "Blockchain", "Public Company"],
    postedTime: "1 day ago",
    isHtbSponsored: true,
    isRemote: true
  },
  {
    id: "2", 
    title: "Associate Software Engineer",
    company: "Ritchie Bros.",
    location: "Dallas, TX",
    salary: "$120K/yr - $290K/yr",
    type: "Full-time",
    level: "Entry Level",
    experience: "2+ years exp",
    applicants: 36,
    matchPercentage: 87,
    matchLevel: "STRONG MATCH" as const,
    description: "Auctions • Construction • Public Company",
    tags: ["Auctions", "Construction", "Public Company"],
    postedTime: "2 days ago",
    isHtbSponsored: true,
    isRemote: true
  },
  {
    id: "3",
    title: "Software Engineer II (Journeys)",
    company: "Iterable",
    location: "United States",
    salary: "$114K/yr - $188K/yr",
    type: "Full-time",
    level: "Entry, Mid Level",
    experience: "2+ years exp",
    applicants: 200,
    matchPercentage: 76,
    matchLevel: "GOOD MATCH" as const,
    description: "Artificial Intelligence (AI) • Marketing • Late Stage",
    tags: ["Artificial Intelligence (AI)", "Marketing", "Late Stage"],
    postedTime: "1 hour ago",
    isHtbSponsored: true,
    isRemote: true
  },
  {
    id: "4",
    title: "Software Engineer - Orchestration",
    company: "PlanetScale",
    location: "San Francisco Bay Area or Remote",
    salary: "$120K/yr - $290K/yr",
    type: "Full-time",
    level: "Mid, Senior Level",
    experience: "5+ years exp",
    applicants: 36,
    matchPercentage: 69,
    matchLevel: "FAIR MATCH" as const,
    description: "Database • Information Technology • Growth Stage",
    tags: ["Database", "Information Technology", "Growth Stage"],
    postedTime: "3 hours ago",
    isHtbSponsored: true,
    isRemote: true
  },
  {
    id: "5",
    title: "Software Engineer",
    company: "Second Nature",
    location: "Remote",
    salary: "$100K/yr - $150K/yr",
    type: "Full-time",
    level: "Mid Level",
    experience: "3+ years exp",
    applicants: 50,
    matchPercentage: 96,
    matchLevel: "STRONG MATCH" as const,
    description: "B2B • B2C • Growth Stage",
    tags: ["B2B", "B2C", "Growth Stage"],
    postedTime: "21 hours ago",
    isHtbSponsored: false,
    isRemote: true
  }
];

const Index = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedJobs, setLikedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { toast } = useToast();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  const handleLike = (jobId: string) => {
    setLikedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApply = (jobId: string) => {
    toast({
      title: "Application Started", 
      description: "Redirecting to application form with auto-fill enabled...",
    });
  };

  const handleGenerateResume = (jobId: string) => {
    setSelectedJobId(jobId);
    setShowResumeGenerator(true);
  };

  const handleCloseResumeGenerator = () => {
    setShowResumeGenerator(false);
    setSelectedJobId(null);
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.some(filter => 
        job.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
        job.level.toLowerCase().includes(filter.toLowerCase()) ||
        job.type.toLowerCase().includes(filter.toLowerCase()) ||
        (filter === "Remote" && job.isRemote) ||
        (filter === "H1B Only" && job.isHtbSponsored)
      );
    
    return matchesSearch && matchesFilters;
  });


  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">JOBS</h1>
                <Button variant="outline" size="sm" className="bg-success text-success-foreground border-success">
                  <span className="mr-2">⚡</span>
                  Get Hired Faster with Turbo
                </Button>
              </div>
            </div>

            <Tabs defaultValue="recommended" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="liked" className="relative">
                  Liked 
                  <Badge variant="secondary" className="ml-2 bg-muted text-muted-foreground">
                    0
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="applied" className="relative">
                  Applied
                  <Badge variant="secondary" className="ml-2 bg-muted text-muted-foreground">
                    2
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="external" className="relative">
                  External
                  <Badge variant="secondary" className="ml-2 bg-muted text-muted-foreground">
                    1
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="mt-0 h-full">
                {isLoading ? (
                  <JobListSkeleton showFilters={true} cardCount={5} />
                ) : (
                  <div className="h-full flex flex-col">
                    <JobFilters
                      activeFilters={activeFilters}
                      onFilterChange={setActiveFilters}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {filteredJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onLike={handleLike}
                          onApply={handleApply}
                          onGenerateResume={handleGenerateResume}
                          isLiked={likedJobs.includes(job.id)}
                        />
                      ))}
                      
                      {filteredJobs.length === 0 && (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">📄</div>
                          <h3 className="text-lg font-semibold mb-2">No jobs match your filters</h3>
                          <p className="text-muted-foreground">Try adjusting your search criteria</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="liked">
                {isLoading ? (
                  <JobListSkeleton showFilters={false} cardCount={3} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💚</div>
                    <h3 className="text-lg font-semibold mb-2">No liked jobs yet?</h3>
                    <p className="text-muted-foreground">Explore recommended ones to find some you'd like!</p>
                    <Button className="mt-4">View Recommended Jobs</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="applied" className="h-full">
                {isLoading ? (
                  <JobListSkeleton showFilters={false} cardCount={2} />
                ) : (
                  <div className="h-full overflow-y-auto">
                    <AppliedJobs />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="external" className="h-full">
                {isLoading ? (
                  <JobListSkeleton showFilters={false} cardCount={1} />
                ) : (
                  <div className="h-full overflow-y-auto p-4 space-y-4">
                    {mockJobs.slice(0, 1).map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onLike={handleLike}
                        onApply={handleApply}
                        onGenerateResume={handleGenerateResume}
                        isLiked={likedJobs.includes(job.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

      <AIAssistant />

      {/* Resume Generator Side Panel */}
      <Sheet open={showResumeGenerator} onOpenChange={setShowResumeGenerator}>
        <SheetContent side="right" className="w-[90vw] max-w-none p-0 sm:max-w-none">
          {selectedJobId && (
            <ResumeGenerator 
              jobId={selectedJobId} 
              onClose={handleCloseResumeGenerator} 
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;