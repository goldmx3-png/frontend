import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, CheckCircle2, Info, FileText } from "lucide-react";

export default function Profile() {
  const workExperience = [
    {
      period: "2024-07 ↔ Present",
      company: "Mindgate Solutions",
      role: "Java Developer",
      achievements: [
        "Developed comprehensive Java payment services ensuring compliance and improving overall system reliability by 98%.",
        "Optimized backends for cross-currency payments reducing latency by 35% and improving performance significantly.",
        "Implemented robust OAuth 2.0 security protocols for 1M+ transactions with proactive monitoring systems established.",
        "Fixed 100% of production issues on time ensuring smooth client bank operations successfully completed."
      ]
    },
    {
      period: "2023-08 ↔ 2024-04",
      company: "CODUS",
      role: "Research Associate",
      achievements: [
        "Evaluated communication protocols for media servers reducing overall system latency by 3x significant performance.",
        "Managed and maintained Linux media servers enhancing performance by 5% while ensuring complete system stability.",
        "Collaborated effectively with cross-functional teams achieving 100% server uptime and complete operational efficiency.",
        "Improved data transfer speed by 7% using advanced OSI model techniques enhancing overall user experience."
      ]
    }
  ];

  const skills = [
    "AI for Everyone", "Data Structures", "Algorithms Analysis", "System Design", 
    "DevOps and CI/CD", "Machine Learning", "Database Systems"
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
              <h1 className="text-2xl font-bold">PROFILE</h1>
            </div>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            🚀 Get Hired Faster with Turbo
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Privacy Notice */}
        <div className="flex items-center space-x-2 mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-green-800">Your profile data is kept private and secure.</span>
          <Info className="w-4 h-4 text-green-600" />
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="work-experience" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="equal-employment">Equal Employment</TabsTrigger>
          </TabsList>

          <TabsContent value="work-experience" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <div className="flex items-center space-x-2">
                <Edit2 className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">Edit</span>
              </div>
            </div>

            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <Card key={index} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">{job.period}</span>
                          <Edit2 className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{job.company}</h3>
                        <p className="text-muted-foreground mb-4">{job.role}</p>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-muted-foreground mt-1">•</span>
                              <span className="text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="flex items-center space-x-2">
                <Edit2 className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">Edit</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {skill}
                  <span className="ml-2 text-muted-foreground cursor-pointer">×</span>
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Personal information section coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Education section coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equal-employment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Equal Employment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Equal employment section coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Success Message */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">Great job! Your profile is complete and your extension is installed. Start applying effortlessly!</p>
              <div className="mt-2">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Explore Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span>Manage My Resume</span>
            </div>
            <span className="text-muted-foreground">›</span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm">in</span>
              </div>
              <span>Update LinkedIn URL</span>
            </div>
            <span className="text-muted-foreground">›</span>
          </div>
        </div>
      </div>
    </div>
  );
}