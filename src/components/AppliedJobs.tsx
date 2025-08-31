import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Clock, DollarSign, Users, Building2, X } from "lucide-react";
import { Link } from "react-router-dom";

interface AppliedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  experience: string;
  matchPercentage: number;
  matchLevel: "STRONG MATCH" | "GOOD MATCH" | "FAIR MATCH";
  description: string;
  tags: string[];
  appliedDate: string;
  isRemote?: boolean;
  isHtbSponsored?: boolean;
  status: "applied" | "interviewing" | "offer" | "rejected" | "archived";
}

const appliedJobs: AppliedJob[] = [
  {
    id: "1",
    title: "Software Engineer II",
    company: "Circle",
    location: "SLC Metro Area",
    salary: "$120K/yr - $162K/yr",
    type: "Full-time",
    level: "Entry, Mid Level",
    experience: "2+ years exp",
    matchPercentage: 85,
    matchLevel: "GOOD MATCH",
    description: "Banking • Blockchain • Public Company",
    tags: ["Banking", "Blockchain", "Public Company"],
    appliedDate: "Aug 30, 2025",
    isRemote: true,
    isHtbSponsored: true,
    status: "applied"
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
    matchPercentage: 87,
    matchLevel: "STRONG MATCH",
    description: "Auctions • Construction • Public Company",
    tags: ["Auctions", "Construction", "Public Company"],
    appliedDate: "Aug 30, 2025",
    isRemote: true,
    isHtbSponsored: true,
    status: "applied"
  }
];

export function AppliedJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("applied");

  const getMatchColor = (level: string) => {
    switch (level) {
      case "STRONG MATCH":
        return "text-success bg-success/10 border-success/20";
      case "GOOD MATCH":
        return "text-primary bg-primary/10 border-primary/20";
      case "FAIR MATCH":
        return "text-warning bg-warning/10 border-warning/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const getStatusCounts = () => {
    return {
      applied: appliedJobs.filter(job => job.status === "applied").length,
      interviewing: appliedJobs.filter(job => job.status === "interviewing").length,
      offer: appliedJobs.filter(job => job.status === "offer").length,
      rejected: appliedJobs.filter(job => job.status === "rejected").length,
      archived: appliedJobs.filter(job => job.status === "archived").length,
    };
  };

  const statusCounts = getStatusCounts();
  const filteredJobs = appliedJobs.filter(job => 
    job.status === activeStatus &&
    (!searchQuery || 
     job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     job.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const AppliedJobCard = ({ job }: { job: AppliedJob }) => (
    <Card className="group hover:shadow-md transition-all duration-200 border border-border mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {job.appliedDate === "Aug 30, 2025" ? "1 day ago" : "2 days ago"}
              </span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Link to={`/job/${job.id}`}>
              <h3 className="font-semibold text-lg text-foreground hover:text-primary cursor-pointer mb-1">
                {job.title}
              </h3>
            </Link>
            
            <p className="text-muted-foreground text-sm mb-4">
              {job.company} / {job.tags.join(" • ")}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </div>
              {job.isRemote && (
                <Badge variant="secondary" className="text-xs w-fit">Remote</Badge>
              )}
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {job.level}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {job.experience}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Applied on {job.appliedDate}
              </span>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  ASK ORION
                </Button>
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  Applied
                </Button>
              </div>
            </div>
          </div>

          <div className="ml-6">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
              <span className="text-2xl font-bold">{job.matchPercentage}%</span>
              <span className="text-xs font-medium mt-1">{job.matchLevel}</span>
              {job.isHtbSponsored && (
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                  <span className="text-xs">H1B Sponsored</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {/* Status Tabs */}
      <div className="border-b border-border bg-card px-4">
        <div className="flex items-center space-x-6">
          <Button
            variant={activeStatus === "applied" ? "default" : "ghost"}
            size="sm"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => setActiveStatus("applied")}
          >
            Applied({statusCounts.applied})
          </Button>
          <Button
            variant={activeStatus === "interviewing" ? "default" : "ghost"}
            size="sm"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => setActiveStatus("interviewing")}
          >
            Interviewing({statusCounts.interviewing})
          </Button>
          <Button
            variant={activeStatus === "offer" ? "default" : "ghost"}
            size="sm"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => setActiveStatus("offer")}
          >
            Offer Received({statusCounts.offer})
          </Button>
          <Button
            variant={activeStatus === "rejected" ? "default" : "ghost"}
            size="sm"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => setActiveStatus("rejected")}
          >
            Rejected({statusCounts.rejected})
          </Button>
          <Button
            variant={activeStatus === "archived" ? "default" : "ghost"}
            size="sm"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => setActiveStatus("archived")}
          >
            Archived({statusCounts.archived})
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-border bg-card">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Job List */}
      <div className="p-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <AppliedJobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-lg font-semibold mb-2">
              {activeStatus === "applied" && "No applied jobs"}
              {activeStatus === "interviewing" && "No interviews scheduled"}
              {activeStatus === "offer" && "No offers received"}
              {activeStatus === "rejected" && "No rejected applications"}
              {activeStatus === "archived" && "No archived applications"}
            </h3>
            <p className="text-muted-foreground">
              {activeStatus === "applied" 
                ? "Start applying to jobs to see them here"
                : `No ${activeStatus} applications to show`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}