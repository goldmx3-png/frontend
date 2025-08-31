import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { 
  X, Star, MessageSquare, Edit2, Download, Trash2, 
  Plus, GraduationCap, Award 
} from "lucide-react";

export default function ResumeDetail() {
  const { resumeId } = useParams();

  const analysisScores = {
    urgentFix: 1,
    criticalFix: 0,
    optionalFix: 5
  };

  const education = {
    institution: "IIT Madras",
    period: "Jul 2019 ↔ May 2023",
    degree: "Bachelor of Technology, Materials Sciences and Engineering",
    gpa: "",
    location: ""
  };

  const coursework = [
    "AI for Everyone", "Data Structures", "Algorithms Analysis", 
    "System Design", "DevOps and CI/CD", "Machine Learning", "Database Systems"
  ];

  const languages = [
    "C++", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-green-600 fill-current" />
                <span className="font-medium">{resumeId}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="text-green-600 border-green-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </Button>
              <Button variant="outline">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Resume Info
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" className="text-red-600">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side - Resume Form */}
          <div className="col-span-8 space-y-6">
            {/* Education Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5" />
                  <CardTitle>Education</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Institution</label>
                    <Input value={education.institution} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Period</label>
                    <Input value={education.period} />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Degree</label>
                  <Input value={education.degree} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">GPA...</label>
                    <Input placeholder="Enter GPA" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location...</label>
                    <Input placeholder="Enter location" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Add Achievement...</label>
                  <Textarea placeholder="Add achievement details" />
                </div>
              </CardContent>
            </Card>

            {/* Relevant Coursework */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <CardTitle>Relevant Coursework</CardTitle>
                </div>
                <Trash2 className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {course}
                      <X className="w-3 h-3 ml-2 cursor-pointer" />
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-8">
                    Add Coursework...
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Languages</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {language}
                      <X className="w-3 h-3 ml-2 cursor-pointer" />
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-8">
                    Add skill...
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Analysis */}
          <div className="col-span-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">A</span>
                  </div>
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    Re-Analyze
                  </Button>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-green-600 text-white">EXCELLENT</Badge>
                  <Button variant="link" className="text-sm p-0 h-auto">
                    View Full Report ›
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Last updated 4 hour ago</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{analysisScores.urgentFix}</div>
                    <div className="text-xs text-muted-foreground">URGENT FIX</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{analysisScores.criticalFix}</div>
                    <div className="text-xs text-muted-foreground">CRITICAL FIX</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{analysisScores.optionalFix}</div>
                    <div className="text-xs text-muted-foreground">OPTIONAL FIX</div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="text-green-600 font-medium mb-2">3 credits available</div>
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Use Credits
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}