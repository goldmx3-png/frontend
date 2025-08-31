import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, X, Info, Edit, Trash2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ResumeGeneratorProps {
  jobId: string;
  onClose: () => void;
}

export default function ResumeGenerator({ jobId, onClose }: ResumeGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeScore, setResumeScore] = useState(2.5);
  const [newScore] = useState(3.0);
  const [selectedSections, setSelectedSections] = useState({
    summary: false,
    skills: true,
    workExperience: true,
    quickEdit: true,
    fullEdit: false
  });
  const [selectedSkills, setSelectedSkills] = useState([
    "Software Development Life Cycle",
    "Agile Methodologies",
    "RESTful APIs",
    "Java Design Patterns",
    "Test-Driven Development",
    "JUnit",
    "Git"
  ]);
  const [resumeTemplate, setResumeTemplate] = useState("standard");
  const [fontSize, setFontSize] = useState("25");

  const jobData = {
    title: "Full Stack Software Engineer III",
    company: "JPMorganChase",
    requiredSkills: [
      "Software Development Life Cycle", "Agile Methodologies", "Core Java", 
      "Spring Boot", "RESTful APIs", "Relational Databases", "Java Design Patterns",
      "Test-Driven Development", "JUnit", "Git", "Cucumber", "Kafka",
      "Cloud Technologies", "Modern Front-end Technologies"
    ],
    experienceRequired: "2+ years exp",
    industries: ["Asset Management", "Banking", "Financial Services"]
  };

  const handleStepChange = (step: number) => {
    if (step === 3 && currentStep === 2) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setResumeScore(newScore);
        setCurrentStep(step);
      }, 3000);
    } else {
      setCurrentStep(step);
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-green-500";
    if (score >= 4) return "text-yellow-500";
    return "text-red-500";
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              currentStep >= step 
                ? "bg-emerald-500 text-white" 
                : "bg-muted text-muted-foreground"
            }`}>
              {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            <div className={`ml-2 text-sm font-medium ${
              currentStep >= step ? "text-foreground" : "text-muted-foreground"
            }`}>
              {step === 1 && "See Your Difference"}
              {step === 2 && "Align Your Resume"}
              {step === 3 && "Review Your New Resume"}
            </div>
            {index < 2 && (
              <div className={`w-16 h-0.5 ml-4 ${
                currentStep > step ? "bg-emerald-500" : "bg-muted"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-semibold">Generate Your Custom Resume</h1>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                4 credits available today
              </Badge>
            </div>
          </div>

          {renderStepIndicator()}

          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Progress value={75} className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Finalizing your new resume...</h2>
                  <p className="text-muted-foreground mb-4">
                    It usually takes about 10-20 seconds to complete.
                  </p>
                  <Progress value={75} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-muted/30 border-r min-h-screen p-4">
          <Button variant="ghost" size="sm" className="mb-4" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
          
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              32 applicants
            </div>
            
            <Card className="p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-xs font-medium">
                  JPMC
                </div>
                <div>
                  <div className="font-medium text-sm">{jobData.company}</div>
                  <div className="text-xs text-muted-foreground">{jobData.title}</div>
                  <div className="text-xs text-muted-foreground">Palo Alto, CA</div>
                  <div className="text-xs text-muted-foreground">Onsite</div>
                  <div className="text-xs text-muted-foreground">{jobData.experienceRequired}</div>
                </div>
              </div>
            </Card>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Maximize your match
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold">Generate Your Custom Resume</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">1 credit consumed</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  3 credits available today
                </Badge>
              </div>
            </div>

            {renderStepIndicator()}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Your Resume is a Low Match for This Job</h2>
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Resumes under 6.0 are likely to be filtered out — we'll help you fix it fast.</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center text-sm font-medium">
                            JPMC
                          </div>
                          <div>
                            <div className="font-semibold">{jobData.company}</div>
                            <div className="text-sm text-muted-foreground">{jobData.title}</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Job Title</span>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="text-sm bg-red-50 text-red-700 p-2 rounded">
                          {jobData.title}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Years of Experience</span>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        </div>
                        <div className="text-sm bg-yellow-50 text-yellow-700 p-2 rounded">
                          {jobData.experienceRequired}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Industry Experience</span>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {jobData.industries.map((industry) => (
                            <Badge key={industry} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Job Keywords (3/14)</span>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {jobData.requiredSkills.slice(0, 8).map((skill) => (
                            <Badge 
                              key={skill} 
                              variant={selectedSkills.includes(skill) ? "default" : "outline"} 
                              className={`text-xs ${
                                selectedSkills.includes(skill) 
                                  ? "bg-emerald-100 text-emerald-700" 
                                  : ""
                              }`}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Your resume</CardTitle>
                          <p className="text-sm text-muted-foreground">KODURI MOHAN-MODIFIED</p>
                        </div>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Current Resume</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className={`text-4xl font-bold ${getScoreColor(resumeScore)}`}>
                          {resumeScore}
                        </div>
                        <div className="text-sm text-muted-foreground">Poor</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>Java Developer / Research Associate</div>
                        <div className="text-muted-foreground">1+ years exp</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={() => handleStepChange(2)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
                  >
                    Improve My Resume for This Job
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Choose sections to enhance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: "summary", label: "Summary", icon: Info },
                      { key: "skills", label: "Skills", icon: Info },
                      { key: "workExperience", label: "Work Experience", icon: Info, checked: true }
                    ].map((section) => (
                      <div key={section.key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            checked={selectedSections[section.key as keyof typeof selectedSections]}
                            onCheckedChange={(checked) => 
                              setSelectedSections(prev => ({ 
                                ...prev, 
                                [section.key]: checked 
                              }))
                            }
                          />
                          <span className="font-medium">{section.label}</span>
                          <section.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}

                    <div className="mt-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium">Quick Edit (First 2 key experiences)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-muted rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Full Edit (All experiences with longer processing time)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2. Select relevant skills to add</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {jobData.requiredSkills.map((skill) => (
                          <Badge 
                            key={skill}
                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                            className={`cursor-pointer text-xs ${
                              selectedSkills.includes(skill) 
                                ? "bg-emerald-100 text-emerald-700" 
                                : "hover:bg-muted"
                            }`}
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                            {selectedSkills.includes(skill) ? " +" : " +"}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" className="text-sm text-muted-foreground">
                        Add Skills
                        <Info className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="col-span-2 flex justify-between">
                  <Button variant="outline" onClick={() => handleStepChange(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={() => handleStepChange(3)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    Generate My New Resume
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-600">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Analysis
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium">Great! Your score jumped</div>
                      <div className="text-xs text-muted-foreground">
                        from <span className="font-medium">2.5</span> to <span className="font-medium text-emerald-600">3</span>, closer to landing that interview!
                      </div>
                    </div>
                    <div className="relative w-16 h-16">
                      <div className={`text-2xl font-bold ${getScoreColor(newScore)} flex items-center justify-center w-full h-full`}>
                        {newScore}
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="report" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="report">Report</TabsTrigger>
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                  </TabsList>

                  <TabsContent value="report" className="mt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-4">KODURI MOHAN</h3>
                            <div className="space-y-3 text-sm">
                              <div>6303410719 | kodurimohan5@gmail.com | linkedin.com/in/kodurimohan | github.com/kodurimohan</div>
                              
                              <div>
                                <div className="font-semibold">Education</div>
                                <div>IIT Madras</div>
                                <div className="text-muted-foreground">Bachelor of Technology, Materials Science and Engineering | Jul 2019 - May 2023</div>
                                <div className="text-muted-foreground">• Coursework: AI for Everyone, Data Structures, Algorithms Analysis, System Design, DevOps and CI/CD, Machine Learning, Database Systems</div>
                              </div>

                              <div>
                                <div className="font-semibold">Experience</div>
                                <div>Mindgate Solutions | Java Developer | Jul 2024 - Present | Chennai, India</div>
                                <div className="text-sm space-y-1 mt-2">
                                  <div>• Developed comprehensive Java payment services using Spring Boot and integrating CI/CD practices, ensuring system reliability increased by 98% in alignment with secure, high-quality production code requirements.</div>
                                  <div>• Optimized system performance through comprehensive testing protocols and infrastructure automation, delivering enhanced performance, reducing latency by 35% while supporting agile development and continuous improvement initiatives.</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                              <span>See What's Changed</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Collapsible>
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-emerald-50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                  <span className="font-medium">Recent Work Experience Enhanced</span>
                                </div>
                                <ArrowRight className="w-4 h-4" />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-2 p-3 text-sm text-muted-foreground">
                                Enhanced recent work experience with relevant keywords and improved descriptions.
                              </CollapsibleContent>
                            </Collapsible>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>More Adjustments You Can Make</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Align your job title" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="align">Align job title</SelectItem>
                                </SelectContent>
                              </Select>

                              <div className="text-center">
                                <Button variant="ghost" className="text-sm">
                                  How do you like this resume?
                                </Button>
                                <div className="flex justify-center space-x-4 mt-2">
                                  <Button variant="outline" size="sm">
                                    👍 Looks Great!
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    👎 Not What I Expected
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="editor" className="mt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-6">
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                                <div className="text-sm">
                                  <span className="font-medium">Note:</span> Changes made here apply only to <span className="font-medium">this resume</span>. For major updates, like adjusting sections or editing experiences, update your Base Resume to affect future resumes.
                                </div>
                              </div>
                            </div>

                            <Button variant="outline" size="sm" className="mb-6">
                              Edit Base Resume
                            </Button>

                            <div className="space-y-4">
                              {[
                                { title: "Personal Info", isOpen: false },
                                { title: "Education", isOpen: false },
                                { title: "Experience", isOpen: false },
                                { title: "Projects", isOpen: false },
                                { title: "Relevant Coursework", isOpen: false },
                                { title: "Achievements and Extracurricular", isOpen: false }
                              ].map((section) => (
                                <Collapsible key={section.title}>
                                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 border rounded-lg hover:bg-muted/50">
                                    <span className="font-medium">{section.title}</span>
                                    <div className="flex items-center space-x-2">
                                      <Edit className="w-4 h-4" />
                                      <Trash2 className="w-4 h-4" />
                                      <ArrowRight className="w-4 h-4" />
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="mt-2">
                                    <div className="p-3 text-sm text-muted-foreground">
                                      Section content would be editable here
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}

                              <Button variant="ghost" className="w-full">
                                <span>+ Add</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-4">KODURI MOHAN</h3>
                            <div className="space-y-3 text-sm">
                              <div>6303410719 | kodurimohan5@gmail.com | linkedin.com/in/kodurimohan | github.com/kodurimohan</div>
                              
                              <div>
                                <div className="font-semibold">Education</div>
                                <div>IIT Madras</div>
                                <div className="text-muted-foreground">Bachelor of Technology, Materials Science and Engineering | Jul 2019 - May 2023</div>
                              </div>

                              <div>
                                <div className="font-semibold">Experience</div>
                                <div>Mindgate Solutions | Java Developer | Jul 2024 - Present | Chennai, India</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="style" className="mt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Resume Template</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              <div 
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                  resumeTemplate === "standard" 
                                    ? "border-emerald-500 bg-emerald-50" 
                                    : "border-muted hover:border-muted-foreground"
                                }`}
                                onClick={() => setResumeTemplate("standard")}
                              >
                                <div className="w-full h-32 bg-white border rounded mb-2 p-2">
                                  <div className="space-y-1">
                                    <div className="h-2 bg-gray-800 rounded w-1/3"></div>
                                    <div className="h-1 bg-gray-400 rounded w-1/2"></div>
                                    <div className="h-1 bg-gray-400 rounded w-2/3"></div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">Standard</div>
                                  {resumeTemplate === "standard" && (
                                    <Badge className="mt-1 bg-emerald-500">
                                      ★ Recommended
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div 
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                  resumeTemplate === "compact" 
                                    ? "border-emerald-500 bg-emerald-50" 
                                    : "border-muted hover:border-muted-foreground"
                                }`}
                                onClick={() => setResumeTemplate("compact")}
                              >
                                <div className="w-full h-32 bg-white border rounded mb-2 p-2">
                                  <div className="space-y-1">
                                    <div className="h-1 bg-gray-800 rounded w-1/4"></div>
                                    <div className="h-1 bg-gray-400 rounded w-1/3"></div>
                                    <div className="h-1 bg-gray-400 rounded w-1/2"></div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">Compact</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Font</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Font Family</label>
                              <Select value="times">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="times">Times New Roman</SelectItem>
                                  <SelectItem value="arial">Arial</SelectItem>
                                  <SelectItem value="calibri">Calibri</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block">Name</label>
                                <Select value={fontSize} onValueChange={setFontSize}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="22">22</SelectItem>
                                    <SelectItem value="24">24</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="26">26</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <label className="text-sm font-medium mb-2 block">Section Headers</label>
                                <Select value="11">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="11">11</SelectItem>
                                    <SelectItem value="12">12</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-4">KODURI MOHAN</h3>
                            <div className="space-y-3 text-sm">
                              <div>6303410719 | kodurimohan5@gmail.com | linkedin.com/in/kodurimohan | github.com/kodurimohan</div>
                              
                              <div>
                                <div className="font-semibold">Education</div>
                                <div>IIT Madras</div>
                                <div className="text-muted-foreground">Bachelor of Technology, Materials Science and Engineering | Jul 2019 - May 2023</div>
                              </div>

                              <div>
                                <div className="font-semibold">Experience</div>
                                <div>Mindgate Solutions | Java Developer | Jul 2024 - Present | Chennai, India</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between items-center pt-6 border-t">
                  <Button variant="outline" onClick={() => handleStepChange(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline">Download by PDF</Button>
                    <Button variant="outline">Download by Word(.docx)</Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}