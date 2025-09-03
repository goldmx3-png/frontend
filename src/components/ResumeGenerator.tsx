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
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, X, Info, Edit, Trash2, Download, Plus, ChevronDown, Clock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from "sonner";
import { PercentageCard } from "@/components/ui/percentage-card";

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
  const [activeTab, setActiveTab] = useState("report");
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
  const [fontSize, setFontSize] = useState("12");
  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [enhancementsOpen, setEnhancementsOpen] = useState(true);

  // Real-time resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "KODURI MOHAN",
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
        title: "Java Developer",
        company: "Mindgate Solutions",
        duration: "Jul 2024 - Present",
        description: [
          "Developed comprehensive Java payment services using Spring Boot and integrating CI/CD practices, ensuring system reliability",
          "Increased by 98% in alignment with secure, high-quality production code requirements",
          "Implemented rapid Continuous delivery, improving efficiency and performance, reducing latency by 35% while supporting agile development and continuous improvement initiatives",
          "Implementing robust OAuth 2.0 security protocols for over 1M transactions, maintaining operational stability while integrating proactive monitoring to meet stringent security practices",
          "Resolved critical production issues through effective troubleshooting and risk assessment, ensuring 100% timely resolution and smooth financial operations"
        ]
      },
      {
        id: "2",
        title: "Research Associate",
        company: "CODLIS",
        duration: "Aug 2023 - Apr 2024",
        description: [
          "Analyzed and refined communication protocols for media servers, reducing system latency by 3x and contributing to the design of secure software architectures",
          "Administered Linux media servers and advanced CI/CD enhancements using Docker and Jenkins, which bolstered system stability and aligned with agile operational practices",
          "Collaborated with cross-functional teams to ensure 100% server uptime, applying agile methodologies to support continuous application resiliency improvements",
          "Enhanced data transfer speeds by 9x, leveraging advanced OSI model techniques, thereby contributing to the development of efficient, high-performing system infrastructures"
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
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-4">
        {[
          { step: 1, label: "See Your Difference" },
          { step: 2, label: "Align Your Resume" },
          { step: 3, label: "Review Your New Resume" }
        ].map((item, index) => (
          <div key={item.step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              currentStep >= item.step 
                ? "bg-success text-success-foreground" 
                : "bg-muted text-muted-foreground"
            }`}>
              {currentStep > item.step ? <CheckCircle className="w-4 h-4" /> : item.step}
            </div>
            <div className={`ml-2 text-sm font-medium ${
              currentStep >= item.step ? "text-foreground" : "text-muted-foreground"
            }`}>
              {item.label}
            </div>
            {index < 2 && (
              <div className={`w-12 h-0.5 ml-4 ${
                currentStep > item.step ? "bg-success" : "bg-muted"
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
      className="bg-white p-6 text-black text-sm"
      style={{ fontSize: `${fontSize}px`, fontFamily: 'Arial, sans-serif' }}
    >
      {/* Header */}
      <div className="text-center mb-4 border-b-2 border-gray-300 pb-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{resumeData.personalInfo.name}</h1>
        <div className="text-sm text-gray-600 mb-2">
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.location} | linkedin.com/in/koduri-mohan | github.com/koduri-mohan
        </div>
      </div>

      {/* Education */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-800 mb-1 border-b border-gray-300">Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-1">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">IIT Madras</span>
              <span className="text-gray-600">Jul 2019 - May 2023</span>
            </div>
            <div className="text-gray-600">Bachelor of Technology, Materials Science and Engineering</div>
            <div className="text-gray-600">• Coursework: AI for Everyone, Data Structures, Algorithms Analysis, System Design, DevOps and CI/CD, Machine Learning, Database Systems</div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-800 mb-1 border-b border-gray-300">Experience</h3>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-gray-800">{exp.company}</span>
                <span className="text-gray-600 ml-4">Chennai, India</span>
              </div>
              <span className="text-gray-600">{exp.duration}</span>
            </div>
            <div className="text-gray-600 font-medium italic mb-1">{exp.title}</div>
            <ul className="list-disc list-inside text-gray-700 space-y-0.5">
              {exp.description.map((desc, index) => (
                <li key={index} className="text-xs leading-tight">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-800 mb-1 border-b border-gray-300">Projects</h3>
        <div className="mb-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Real Time Exchange</span>
            <span className="text-gray-600">Mar 2025</span>
          </div>
          <div className="text-gray-600">• Developed comprehensive Node.js TypeScript REST API improving order processing by 15% through optimization.</div>
          <div className="text-gray-600">• Built sophisticated Redis pub/sub matching engine processing 1000+ orders per second with 99% accuracy.</div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Zapier Clone</span>
            <span className="text-gray-600">Jan 2025</span>
          </div>
          <div className="text-gray-600">• Designed intuitive React TailwindCSS interface boosting user engagement by 20% with creative layouts.</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Generate Your Custom Resume</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">1 credit consumed</span>
            <Badge variant="secondary" className="bg-success/10 text-success">
              3 credits available today
            </Badge>
          </div>
        </div>
        {renderStepIndicator()}
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Resume Preview */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg border h-full overflow-auto">
            {renderResumePreview()}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border p-4 space-y-4">
          {/* Score Improvement */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Great! Your score jumped from</div>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <PercentageCard percentage={25} size="sm" variant="error" />
                  <span className="text-lg">to</span>
                  <PercentageCard percentage={30} size="lg" variant="warning" />
                </div>
                <div className="text-sm font-medium">closer to landing that interview!</div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="report">Report</TabsTrigger>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
            </TabsList>

            <TabsContent value="report" className="space-y-4">
              <div className="text-sm text-muted-foreground">See What's Changed</div>
              
              <Collapsible open={enhancementsOpen} onOpenChange={setEnhancementsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-success/5 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="font-medium">Recent Work Experience Enhanced</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${enhancementsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="text-sm text-muted-foreground">
                    Added industry-specific keywords and quantified achievements to better match job requirements.
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="space-y-2">
                <div className="text-sm font-medium">More Adjustments You Can Make</div>
                <Button variant="outline" className="w-full justify-between text-sm">
                  <span>Align your job title</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  How do you like this resume?
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    👍 Looks Great!
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    👎 Not What I Expected
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="editor" className="space-y-4">
              <div className="text-sm text-muted-foreground">Edit Resume Content</div>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Open Full Editor
              </Button>
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div className="text-sm text-muted-foreground">Customize Appearance</div>
              <div>
                <Label className="text-sm">Template</Label>
                <Select value={resumeTemplate} onValueChange={setResumeTemplate}>
                  <SelectTrigger className="w-full">
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
                <Label className="text-sm">Font Size: {fontSize}px</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-full">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-background text-foreground border-border hover:bg-muted"
              onClick={downloadPDF}
            >
              Download by PDF
            </Button>
            <Button 
              variant="outline" 
              className="bg-background text-foreground border-border hover:bg-muted"
            >
              Download by Word(.docx)
            </Button>
            <Button className="bg-success hover:bg-success/90 text-success-foreground">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}