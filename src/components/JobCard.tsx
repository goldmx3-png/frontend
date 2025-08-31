import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PercentageCard } from "@/components/ui/percentage-card";
import { MapPin, Clock, DollarSign, Users, Building2, Heart, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  experience: string;
  applicants: number;
  matchPercentage: number;
  matchLevel: "STRONG MATCH" | "GOOD MATCH" | "FAIR MATCH";
  description: string;
  tags: string[];
  postedTime: string;
  isHtbSponsored?: boolean;
  isRemote?: boolean;
}

interface JobCardProps {
  job: Job;
  onLike?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
  onGenerateResume?: (jobId: string) => void;
  isLiked?: boolean;
}

export function JobCard({ job, onLike, onApply, onGenerateResume, isLiked = false }: JobCardProps) {
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

  return (
    <Card className="group hover-lift border border-border bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link to={`/job/${job.id}`}>
                <h3 className="font-semibold text-lg text-foreground hover:text-primary cursor-pointer">{job.title}</h3>
              </Link>
              <span className="text-muted-foreground text-sm">• {job.postedTime}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              {job.company} / {job.tags.join(" • ")}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              {job.isRemote && (
                <Badge variant="secondary" className="text-xs">Remote</Badge>
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </div>
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

            {job.applicants && (
              <p className="text-xs text-muted-foreground mb-3">
                {job.applicants}+ applicants
              </p>
            )}

            {job.isHtbSponsored && (
              <div className="flex items-center gap-1 mb-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success font-medium">H1B Sponsor Likely</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 ml-6">
            <PercentageCard 
              percentage={job.matchPercentage}
              size="md"
              variant="default"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLike?.(job.id)}
              className={`h-8 w-8 p-0 ${isLiked ? 'text-red-500 border-red-500' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              ASK ORION
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onGenerateResume?.(job.id)}
              className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
            >
              Generate Custom Resume
            </Button>
            <Button 
              onClick={() => onApply?.(job.id)}
              className="bg-success hover:bg-success/90 text-success-foreground"
              size="sm"
            >
              APPLY WITH AUTOFILL
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}