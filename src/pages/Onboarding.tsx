import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Upload, FileText, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobFunction {
  id: string;
  name: string;
  category: string;
}

const jobCategories = [
  {
    name: "Software/Internet/AI",
    jobs: ["Backend Engineer", "Full Stack Engineer", "Python Engineer", "Java Engineer", "C/C++ Engineer", ".Net Engineer", "Golang Engineer", "Salesforce Developer", "Blockchain Engineer"]
  },
  {
    name: "Backend Engineering", 
    jobs: ["Backend Engineer", "Full Stack Engineer", "Python Engineer", "Java Engineer"]
  },
  {
    name: "Data & Analytics",
    jobs: ["Data Analyst", "Data Scientist", "Data Engineer", "Business/BI Analyst", "Power BI Developer", "ETL Developer", "Data Warehouse Engineer"]
  },
  {
    name: "Machine Learning & AI",
    jobs: ["Machine Learning Engineer", "AI Engineer", "Machine Learning/AI Researcher", "Machine Learning, Deep Learning", "LLM Engineer"]
  },
  {
    name: "Consulting",
    jobs: ["Management Consultant", "Strategy Consultant", "Technical Consultant"]
  },
  {
    name: "Marketing",
    jobs: ["Digital Marketing Manager", "Marketing Analyst", "Content Marketing Manager"]
  },
  {
    name: "Finance",
    jobs: ["Financial Analyst", "Investment Banker", "Risk Analyst"]
  },
  {
    name: "Product",
    jobs: ["Product Manager", "Product Owner", "Product Designer"]
  },
  {
    name: "Healthcare",
    jobs: ["Software Engineer - Healthcare", "Data Analyst - Healthcare"]
  },
  {
    name: "Electrical Engineering",
    jobs: ["Hardware Engineer", "Embedded Systems Engineer"]
  },
  {
    name: "Human Resource/Administrative/Legal",
    jobs: ["HR Generalist", "Legal Counsel", "Operations Manager"]
  },
  {
    name: "Sales",
    jobs: ["Sales Representative", "Account Manager", "Sales Engineer"]
  },
  {
    name: "Production/Manufacturing",
    jobs: ["Manufacturing Engineer", "Quality Engineer"]
  },
  {
    name: "Customer Service",
    jobs: ["Customer Success Manager", "Technical Support"]
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedJobFunctions, setSelectedJobFunctions] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(["Full-time"]);
  const [isRemoteOpen, setIsRemoteOpen] = useState(true);
  const [needsSponsorship, setNeedsSponsorship] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState("Software/Internet/AI");
  const [jobFunction, setJobFunction] = useState("");
  const [isMatching, setIsMatching] = useState(false);

  const steps = [
    { number: 1, title: "Job Preferences" },
    { number: 2, title: "Job Functions" },
    { number: 3, title: "Resume Upload" },
    { number: 4, title: "Matching" }
  ];

  const handleJobFunctionSelect = (job: string) => {
    if (selectedJobFunctions.includes(job)) {
      setSelectedJobFunctions(selectedJobFunctions.filter(f => f !== job));
    } else {
      setSelectedJobFunctions([...selectedJobFunctions, job]);
    }
  };

  const handleJobTypeToggle = (type: string) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
    } else {
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      setIsMatching(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Job Function <span className="text-destructive">*</span>
          <span className="text-muted-foreground text-xs ml-1">(select from drop-down for best results)</span>
        </label>
        <Input
          placeholder="Please select/enter your expected job function"
          value={jobFunction}
          onChange={(e) => setJobFunction(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">
          Job Type <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Full-time", "Contract", "Part-time", "Internship"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedJobTypes.includes(type)}
                onCheckedChange={() => handleJobTypeToggle(type)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor={type} className="text-sm font-medium">{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Location</label>
        <div className="space-y-3">
          <div className="p-3 bg-muted rounded-md">
            <span className="text-sm">Within US</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={isRemoteOpen}
              onCheckedChange={(checked) => setIsRemoteOpen(checked === true)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor="remote" className="text-sm font-medium">Open to Remote</label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">
          Work Authorization
        </label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="h1b"
            checked={needsSponsorship}
            onCheckedChange={(checked) => setNeedsSponsorship(checked === true)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label htmlFor="h1b" className="text-sm font-medium">H1B sponsorship</label>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {selectedJobFunctions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Functions:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedJobFunctions.map((job) => (
              <Badge
                key={job}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                onClick={() => handleJobFunctionSelect(job)}
              >
                {job} ×
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {jobCategories.map((category) => (
            <div
              key={category.name}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                expandedCategory === category.name
                  ? "bg-primary/5 border border-primary/20"
                  : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => setExpandedCategory(category.name)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs">›</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {expandedCategory && (
            <>
              <h3 className="font-semibold text-primary">{expandedCategory}</h3>
              <div className="space-y-2">
                {jobCategories
                  .find(cat => cat.name === expandedCategory)
                  ?.jobs.map((job) => (
                    <div
                      key={job}
                      className={`p-2 rounded-md cursor-pointer transition-colors text-sm ${
                        selectedJobFunctions.includes(job)
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                      onClick={() => handleJobFunctionSelect(job)}
                    >
                      {job}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-accent/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Data privacy is the top priority at JobRight. Your resume will only be used for job matching and will 
            never be shared with third parties. For details, please see our{" "}
            <span className="text-primary underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>

        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <Upload className="w-4 h-4 text-muted-foreground ml-1 -mt-2" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground">
                Files should be in <strong>PDF</strong> or <strong>Word</strong> format and must not exceed <strong>10MB</strong> in size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 text-center">
      {!isMatching ? (
        <>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
              <FileText className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <Progress value={75} className="w-64 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Matching your profile with relevant job posts.</h3>
            </div>
          </div>

          <div className="bg-accent/30 rounded-xl p-8 max-w-md mx-auto">
            <div className="bg-primary/10 rounded-lg px-4 py-2 inline-block mb-4">
              <span className="text-sm font-medium">Feature Highlights</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Find LinkedIn Connections</h3>
            <h4 className="font-medium text-primary mb-4">For Referrals</h4>
            
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                      M
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Found 3 contacts for you</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-4 h-4 bg-muted rounded-full"></div>
                        <div className="w-4 h-4 bg-muted rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Ethan & Tobi</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">CONNECT</Button>
                </div>
              </div>

              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      N
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Nikki</p>
                      <p className="text-xs text-muted-foreground">Senior Recruiter</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">CONNECT</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle className="w-16 h-16 text-primary" />
          <h3 className="text-xl font-semibold">Matching Complete!</h3>
          <p className="text-muted-foreground">Redirecting to your personalized job feed...</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Orion</h1>
              <p className="text-sm text-muted-foreground">Your AI Copilot</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Logout
          </Button>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {currentStep === 1 && "Hi, I'm Orion, your AI Copilot for job search."}
            {currentStep === 2 && "Hi, I'm Orion, your AI Copilot for job search."}
            {currentStep === 3 && "One last step, let's level up your search by uploading your resume."}
            {currentStep === 4 && "One last step, let's level up your search by uploading your resume."}
          </h2>
          <p className="text-muted-foreground">
            {currentStep === 1 && "To get started, what type of role are you looking for?"}
            {currentStep === 2 && "To get started, what type of role are you looking for?"}
            {currentStep === 3 && ""}
            {currentStep === 4 && ""}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-end mt-8 max-w-3xl mx-auto">
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!jobFunction || selectedJobTypes.length === 0)) ||
              (currentStep === 2 && selectedJobFunctions.length === 0) ||
              isMatching
            }
            className="px-8"
          >
            {currentStep === 1 && "Next"}
            {currentStep === 2 && "Next"}
            {currentStep === 3 && "Start Matching"}
            {currentStep === 4 && "Complete"}
          </Button>
        </div>
      </div>
    </div>
  );
}