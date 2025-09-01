import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, X, Info, Edit, Trash2, Download, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from "sonner";

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
  };
  summary: string;
  skills: string[];
  experience: {
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string[];
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
}

interface ResumeGeneratorProps {
  jobId: string;
  onClose: () => void;
}

export default function ResumeGenerator({ jobId, onClose }: ResumeGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeScore, setResumeScore] = useState(2.5);
  const [newScore] = useState(8.2);
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
  const [fontSize, setFontSize] = useState("12");
  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Real-time resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "Koduri Mohan",
      email: "koduri.mohan@email.com",
      phone: "+1 (555) 123-4567",
      location: "Palo Alto, CA",
      title: "Full Stack Software Engineer"
    },
    summary: "Experienced Full Stack Software Engineer with 3+ years of expertise in Java development, Spring Boot, and modern web technologies. Proven track record in building scalable applications and implementing agile methodologies.",
    skills: [
      "Java", "Spring Boot", "React", "Node.js", "PostgreSQL", "MongoDB", 
      "RESTful APIs", "Microservices", "Docker", "Kubernetes", "AWS", 
      "Git", "Jenkins", "JUnit", "Test-Driven Development"
    ],
    experience: [
      {
        id: "1",
        title: "Software Engineer II",
        company: "Tech Solutions Inc.",
        duration: "Jan 2022 - Present",
        description: [
          "Developed and maintained 5+ microservices using Java Spring Boot, serving 100K+ daily active users",
          "Implemented RESTful APIs with 99.9% uptime and optimized database queries reducing response time by 40%",
          "Collaborated with cross-functional teams using Agile methodologies and participated in code reviews",
          "Designed and implemented automated testing strategies using JUnit and Mockito, achieving 95% code coverage"
        ]
      },
      {
        id: "2",
        title: "Junior Software Developer",
        company: "StartupCorp",
        duration: "Jun 2021 - Dec 2021",
        description: [
          "Built responsive web applications using React and Node.js",
          "Integrated third-party APIs and payment gateways",
          "Participated in daily standups and sprint planning sessions"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        year: "2021"
      }
    ]
  });

  const jobData = {
    title: "Full Stack Software Engineer III",
    company: "JPMorganChase",
    requiredSkills: [
      "Software Development Life Cycle", "Agile Methodologies", "Core Java", 
      "Spring Boot", "RESTful APIs", "Relational Databases", "Java Design Patterns",
      "Test-Driven Development", "JUnit", "Git", "Cucumber", "Kafka",
      "Cloud Technologies", "Modern Front-end Technologies"
    ],
    experienceRequired: "3+ years exp",
    industries: ["Asset Management", "Banking", "Financial Services"]
  };

  const handleStepChange = (step: number) => {
    if (step === 3 && currentStep === 2) {
      setIsGenerating(true);
      // Simulate AI enhancement
      setTimeout(() => {
        // Update resume with job-specific improvements
        const enhancedResume = { ...resumeData };
        
        // Enhance summary with job-specific keywords
        if (selectedSections.summary) {
          enhancedResume.summary = `Experienced Full Stack Software Engineer with 3+ years of expertise in Java development, Spring Boot, and modern web technologies. Proven track record in building scalable applications using SDLC methodologies and Agile practices. Specialized in financial services with experience in asset management solutions.`;
        }

        // Add selected skills
        enhancedResume.skills = [...new Set([...enhancedResume.skills, ...selectedSkills])];

        // Enhance work experience descriptions
        if (selectedSections.workExperience) {
          enhancedResume.experience[0].description = [
            "Developed and maintained 5+ microservices using Java Spring Boot following SDLC best practices, serving 100K+ daily active users in financial services",
            "Implemented RESTful APIs with 99.9% uptime and optimized relational database queries reducing response time by 40%",
            "Collaborated with cross-functional teams using Agile methodologies and participated in code reviews using Git",
            "Designed and implemented automated testing strategies using JUnit and Test-Driven Development, achieving 95% code coverage",
            "Applied Java Design Patterns and worked with modern front-end technologies to deliver scalable solutions"
          ];
        }

        setResumeData(enhancedResume);
        setIsGenerating(false);
        setResumeScore(newScore);
        setCurrentStep(step);
        toast.success("Resume enhanced successfully!");
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
    if (score >= 7) return "text-emerald-500";
    if (score >= 4) return "text-yellow-500";
    return "text-red-500";
  };

  const updateResumeData = (field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "New Position",
      company: "Company Name",
      duration: "Start - End",
      description: ["Description of your role and achievements"]
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const deleteExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download resume. Please try again.");
      console.error("PDF generation error:", error);
    }
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

  const renderResumePreview = () => (
    <div 
      ref={resumeRef}
      className={`bg-white p-8 rounded-lg shadow-lg text-black max-w-4xl mx-auto`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name}</h1>
        <h2 className="text-xl text-gray-600 mb-3">{resumeData.personalInfo.title}</h2>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <span>{resumeData.personalInfo.email}</span>
          <span>•</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>•</span>
          <span>{resumeData.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-300">Professional Summary</h3>
        <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-300">Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300">Professional Experience</h3>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-gray-800">{exp.title}</h4>
              <span className="text-sm text-gray-600">{exp.duration}</span>
            </div>
            <p className="text-gray-600 mb-2 font-medium">{exp.company}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {exp.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-300">Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">{edu.degree}</span>
              <span className="text-gray-600">{edu.year}</span>
            </div>
            <p className="text-gray-600">{edu.school}</p>
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
                  <h2 className="text-xl font-semibold mb-2">Enhancing your resume with AI...</h2>
                  <p className="text-muted-foreground mb-4">
                    Optimizing content for job requirements and ATS systems.
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
                            <span className="text-sm font-medium">Job Keywords (7/14)</span>
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
                          <p className="text-sm text-muted-foreground">{resumeData.personalInfo.name.toUpperCase()}</p>
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
                        <div>{resumeData.personalInfo.title}</div>
                        <div className="text-muted-foreground">3+ years exp</div>
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
                            {selectedSkills.includes(skill) ? " ✓" : " +"}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button 
                        onClick={() => handleStepChange(3)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      >
                        Generate Enhanced Resume
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Original Resume</CardTitle>
                          <p className="text-sm text-muted-foreground">KODURI MOHAN</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className={`text-4xl font-bold ${getScoreColor(2.5)}`}>
                          2.5
                        </div>
                        <div className="text-sm text-muted-foreground">Poor</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Enhanced Resume</CardTitle>
                          <p className="text-sm text-muted-foreground">AI-OPTIMIZED</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className={`text-4xl font-bold ${getScoreColor(newScore)}`}>
                          {newScore}
                        </div>
                        <div className="text-sm text-emerald-600 font-medium">Excellent</div>
                      </div>
                      <div className="text-sm text-emerald-600">
                        +{((newScore - 2.5) * 100 / 2.5).toFixed(0)}% improvement
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="preview" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="grid w-fit grid-cols-3">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="editor">Editor</TabsTrigger>
                      <TabsTrigger value="style">Style</TabsTrigger>
                    </TabsList>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Preview Mode" : "Edit Mode"}
                      </Button>
                      <Button onClick={downloadPDF} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  <TabsContent value="preview" className="space-y-4">
                    {renderResumePreview()}
                  </TabsContent>

                  <TabsContent value="editor" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={resumeData.personalInfo.name}
                              onChange={(e) => updatePersonalInfo('name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="title">Professional Title</Label>
                            <Input
                              id="title"
                              value={resumeData.personalInfo.title}
                              onChange={(e) => updatePersonalInfo('title', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={resumeData.personalInfo.email}
                              onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={resumeData.personalInfo.phone}
                              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={resumeData.summary}
                          onChange={(e) => updateResumeData('summary', e.target.value)}
                          className="min-h-[100px]"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Work Experience</CardTitle>
                          <Button onClick={addExperience} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Experience
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium">Experience #{resumeData.experience.indexOf(exp) + 1}</h4>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteExperience(exp.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <Label>Job Title</Label>
                                <Input
                                  value={exp.title}
                                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                />
                              </div>
                              <div className="col-span-2">
                                <Label>Duration</Label>
                                <Input
                                  value={exp.duration}
                                  onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Description (one per line)</Label>
                              <Textarea
                                value={exp.description.join('\n')}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                                className="min-h-[120px]"
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="style" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resume Styling</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="template">Template</Label>
                          <Select value={resumeTemplate} onValueChange={setResumeTemplate}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="modern">Modern</SelectItem>
                              <SelectItem value="creative">Creative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
                          <Select value={fontSize} onValueChange={setFontSize}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10px</SelectItem>
                              <SelectItem value="11">11px</SelectItem>
                              <SelectItem value="12">12px</SelectItem>
                              <SelectItem value="13">13px</SelectItem>
                              <SelectItem value="14">14px</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Alignment
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      Save Draft
                    </Button>
                    <Button onClick={downloadPDF} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Final Resume
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