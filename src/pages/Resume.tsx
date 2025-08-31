import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Info, Plus, Star, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { ResumeSkeleton } from "@/components/skeletons/ResumeSkeleton";

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ResumeSkeleton />;
  }
  const resumes = [
    {
      id: "koduri-mohan-resume",
      name: "koduri-mohan-resume",
      targetJob: "Analysis Complete",
      lastModified: "14 minutes ago",
      created: "5 hours ago",
      isPrimary: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg">🚀</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">RESUME</h1>
            </div>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            🚀 Get Hired Faster with Turbo
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Resume Slots Notice */}
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-800">You have 1 resume saved out of 5 available slots.</span>
            <Info className="w-4 h-4 text-green-600" />
          </div>
          <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Resume
          </Button>
        </div>

        {/* Resume Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resume</TableHead>
                  <TableHead>Target Job Title</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resumes.map((resume) => (
                  <TableRow key={resume.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">A</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link 
                            to={`/resume/${resume.id}`}
                            className="font-medium hover:underline"
                          >
                            {resume.name}
                          </Link>
                          {resume.isPrimary && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-green-600 fill-current" />
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                PRIMARY
                              </Badge>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {resume.targetJob}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {resume.lastModified}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {resume.created}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Empty State for Additional Resumes */}
        {resumes.length < 5 && (
          <div className="mt-8 text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Create more targeted resumes</h3>
            <p className="text-muted-foreground mb-4">
              You have {5 - resumes.length} more resume slots available. Create tailored resumes for different job types.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Resume
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}