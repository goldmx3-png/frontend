import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import ResumeGenerator from "@/components/ResumeGenerator";
import { 
  MapPin, 
  Clock, 
  Building2, 
  Users, 
  ArrowLeft, 
  Share, 
  Flag, 
  ExternalLink,
  Heart,
  Search,
  Linkedin,
  Globe
} from "lucide-react";

// Mock data - in real app this would come from API
const jobData = {
  "1": {
    id: "1",
    title: "Software Engineer I (San Francisco)",
    company: "Jerry",
    location: "Palo Alto, CA",
    type: "Full-time",
    level: "New Grad, Entry Level",
    remote: true,
    applicants: 127,
    postedTime: "13 hours ago",
    matchPercentage: 89,
    matchLevel: "STRONG MATCH",
    matchBreakdown: {
      expLevel: 100,
      skill: 100,
      industryExp: 40
    },
    description: "Jerry is building the first AI-powered AllCar™ app to simplify car ownership. They are seeking a Software Engineer I to contribute to their engineering teams and help scale their user base from 5M to 50M.",
    tags: ["Artificial Intelligence (AI)", "Auto Insurance", "Insurance", "InsurTech"],
    isH1bSponsor: true,
    responsibilities: [
      "You'll join one of our engineering pods (core app, retention, automation) depending on your interests and skills.",
      "Every team ships regularly, works closely with product, and contributes to a mission that matters."
    ],
    requirements: [
      "Bachelor's degree in Computer Science, Engineering, or a related field (or graduating soon)",
      "Eagerness to learn, build, and grow"
    ],
    preferred: [
      "Internship, co-op, or side project experience is a plus—but not required"
    ],
    skills: [
      { name: "React", match: true },
      { name: "NodeJS", match: true },
      { name: "Python", match: true },
      { name: "TypeScript", match: true },
      { name: "AWS", match: true },
      { name: "Docker", match: true },
      { name: "CI/CD", match: false },
      { name: "Redis", match: true }
    ],
    company_details: {
      name: "Jerry",
      founded: "2017",
      location: "Palo Alto, California, USA",
      employees: "201-500 employees",
      website: "https://jerry.ai",
      glassdoor: 3.6,
      description: "Jerry is America's first AllCar™ app. Drivers compare car insurance policies, maintenance and repair costs, and earn safe driving rewards.",
      funding: {
        stage: "Growth Stage",
        total: "$242M",
        investors: ["Park West Asset Management", "TriplePoint Capital", "Goodwater Capital"]
      },
      leadership: [
        {
          name: "Art Agrawal",
          title: "CEO & Co-Founder",
          linkedin: true
        },
        {
          name: "Musawir Shah", 
          title: "Co-Founder and CTO",
          linkedin: true
        }
      ],
      news: [
        {
          title: "Jerry Launches Revamped Website to Help Drivers Make ...",
          source: "Morningstar.com",
          date: "2025-05-16"
        },
        {
          title: "Liquid 2 Ventures Portfolio",
          source: "Liquid 2 Ventures",
          date: "2025-02-24"
        }
      ]
    },
    connections: {
      network: [
        {
          name: "Xinyu Liu",
          connections: 4,
          letters: ["X", "A", "T", "L", "J"]
        }
      ],
      previousCompany: [],
      school: []
    }
  }
};

export default function JobDetail() {
  const { jobId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);
  const job = jobData[jobId as keyof typeof jobData];

  if (!job) {
    return <div>Job not found</div>;
  }

  const getMatchColor = (level: string) => {
    switch (level) {
      case "STRONG MATCH":
        return "text-success border-success";
      case "GOOD MATCH":
        return "text-primary border-primary";
      case "FAIR MATCH":
        return "text-warning border-warning";
      default:
        return "text-muted-foreground border-border";
    }
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-muted-foreground">{job.applicants} applicants</span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-success text-success-foreground border-success">
              APPLY WITH AUTOFILL
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Original Job Post
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="company" className="mt-0">
            {/* Company tab content will be here */}
          </TabsContent>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex">
        <div className="flex-1 p-6">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="overview" className="space-y-6">
              {/* Job Header */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <span className="text-muted-foreground">• {job.postedTime}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    {job.remote && (
                      <Badge variant="secondary">Remote</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.level}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${getMatchColor(job.matchLevel)}`}>
                    <span className="text-xl font-bold">{job.matchPercentage}%</span>
                  </div>
                  <p className="text-sm font-medium mt-2">{job.matchLevel}</p>
                  
                  <div className="flex gap-4 mt-4 text-center">
                    <div>
                      <div className="w-12 h-12 rounded-full bg-success/10 border-2 border-success flex items-center justify-center">
                        <span className="text-sm font-bold text-success">{job.matchBreakdown.expLevel}%</span>
                      </div>
                      <p className="text-xs mt-1">Exp. Level</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-full bg-success/10 border-2 border-success flex items-center justify-center">
                        <span className="text-sm font-bold text-success">{job.matchBreakdown.skill}%</span>
                      </div>
                      <p className="text-xs mt-1">Skill</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-full bg-warning/10 border-2 border-warning flex items-center justify-center">
                        <span className="text-sm font-bold text-warning">{job.matchBreakdown.industryExp}%</span>
                      </div>
                      <p className="text-xs mt-1">Industry Exp.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maximize interview chances */}
              <Card className="bg-success/5 border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-success" />
                      </div>
                      <span className="font-medium">Maximize your interview chances</span>
                    </div>
                    <Button 
                      className="bg-success hover:bg-success/90"
                      onClick={() => setShowResumeGenerator(true)}
                    >
                      <span className="mr-2">⭐</span>
                      Generate Custom Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <div>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                {job.isH1bSponsor && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success font-medium">H1B Sponsor Likely</span>
                  </div>
                )}
              </div>

              {/* Insider Connection */}
              <Card className="border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-success" />
                        </div>
                        <h3 className="font-semibold">Insider Connection @{job.company}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Discover valuable connections within the company who might provide insights and potential referrals.
                      </p>
                      <p className="text-sm font-medium">
                        Get 3x more responses when you reach out via email instead of LinkedIn.
                      </p>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      5 email credits available today
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Network Connections */}
              <div>
                <h3 className="font-semibold mb-4">Beyond Your Network</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center gap-1 mb-2">
                        {job.connections.network[0].letters.map((letter, i) => (
                          <div key={i} className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold">
                            {letter}
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                          View
                        </Button>
                      </div>
                      <p className="text-sm font-medium">{job.connections.network[0].name} & {job.connections.network[0].connections} connections</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm font-medium mb-2">From Your Previous Company</p>
                      <Button variant="outline" size="sm" className="text-xs">
                        Find More Connections →
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm font-medium mb-2">From Your School</p>
                      <Button variant="outline" size="sm" className="text-xs">
                        Find More Connections →
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Find Any Email */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Find Any Email</h3>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="Paste any LinkedIn profile URL (e.g., https://www.linkedin.com/in/xxxxx/) to find work emails instantly"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <Button className="bg-success hover:bg-success/90">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">Responsibilities</h3>
                </div>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualifications */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-success/10 rounded flex items-center justify-center">
                    <Badge className="w-4 h-4 bg-success p-0" />
                  </div>
                  <h3 className="font-semibold">Qualification</h3>
                  <span className="text-xs text-muted-foreground">Represents the skills you have</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Find out how your skills align with this job's requirements. If anything seems off, you can easily 
                  <span className="font-medium"> click on the tags to select or unselect skills</span> to reflect your actual expertise.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge 
                          key={skill.name}
                          variant={skill.match ? "default" : "secondary"}
                          className={skill.match ? "bg-success text-success-foreground" : ""}
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Required</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Preferred</h4>
                    <ul className="space-y-1">
                      {job.preferred.map((pref, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{pref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="company" className="space-y-6">
              {/* Company Details */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{job.company_details.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Founded in {job.company_details.founded}</span>
                      <span>{job.company_details.location}</span>
                      <span>{job.company_details.employees}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Glassdoor ★★★★☆ {job.company_details.glassdoor}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {job.company_details.description}
                </p>
              </div>

              {/* H1B Sponsorship */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">H1B Sponsorship</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {job.company_details.name} has a track record of offering H1B sponsorships. Please note that this does not guarantee sponsorship for this specific role. Below presents additional info for your reference. 
                    <span className="italic">(Data Powered by US Department of Labor)</span>
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Distribution of Different Job Fields Receiving Sponsorship</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-success rounded-full"></div>
                          <span className="text-sm">Engineering and Development</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-sm">Marketing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-sm">Legal and Compliance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-sm">Product Management</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-sm">Management and Executive</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-sm">Accounting and Finance</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-success">67%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          <span className="text-success">● </span>Represents job field similar to this job
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Trends of Total Sponsorships</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">2025 (4)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{width: '100%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">2024 (5)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{width: '100%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">2023 (3)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{width: '60%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">2021 (4)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{width: '80%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">2020 (2)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{width: '40%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Funding */}
              <div>
                <h3 className="font-semibold mb-4">Funding</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Current Stage</span>
                        <p className="text-sm text-muted-foreground">{job.company_details.funding.stage}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Total Funding</span>
                        <p className="text-sm text-muted-foreground">{job.company_details.funding.total}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Key Investors</span>
                    <div className="space-y-1">
                      {job.company_details.funding.investors.map((investor, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{investor}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Team */}
              <div>
                <h3 className="font-semibold mb-4">Leadership Team</h3>
                <div className="grid grid-cols-2 gap-4">
                  {job.company_details.leadership.map((leader, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">{leader.name}</p>
                        <p className="text-sm text-muted-foreground">{leader.title}</p>
                      </div>
                      {leader.linkedin && (
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent News */}
              <div>
                <h3 className="font-semibold mb-4">Recent News</h3>
                <div className="space-y-3">
                  {job.company_details.news.map((news, i) => (
                    <div key={i}>
                      <h4 className="font-medium text-sm">{news.title}</h4>
                      <p className="text-xs text-muted-foreground">{news.source} • {news.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant - Right sidebar */}
        <div className="w-80 border-l border-border">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-foreground rounded-sm"></div>
              </div>
              <div>
                <h3 className="font-semibold">Orion</h3>
                <p className="text-sm text-muted-foreground">Your AI Copilot</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Quick Guide
              </Button>
            </div>
            
            <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-4">
              <p className="text-sm">how to use jobright auto fill</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm">
                I'm here to assist with job searches and career-related questions. For specific instructions on using JobRight's auto-fill feature, please refer to their official documentation or support resources. Is there anything else I can help you with regarding your job search?
              </p>
              
              <div className="space-y-2">
                <p className="text-sm">
                  I see that you're asking about this <span className="font-medium">Software Engineer I (San Francisco)</span> role at <span className="font-medium">{job.company}</span>. What would you like to know?
                </p>
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">
                    Tell me why this job is a good fit for me.
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">
                    Give me some resume tips if I want to apply.
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">
                    Generate custom resume tailored to this job.
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">
                    Show me Connections for potential referral.
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">
                    Write a cover letter for this job.
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <input 
                  type="text" 
                  placeholder="Ask me anything..."
                  className="w-full p-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Generator Modal */}
      {showResumeGenerator && (
        <ResumeGenerator 
          jobId={jobId || "1"} 
          onClose={() => setShowResumeGenerator(false)} 
        />
      )}
    </div>
  );
}