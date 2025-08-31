import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X, ChevronRight, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EditFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

export function EditFiltersModal({ 
  isOpen, 
  onClose, 
  activeFilters, 
  onFilterChange 
}: EditFiltersModalProps) {
  const [localFilters, setLocalFilters] = useState<string[]>(activeFilters);
  const [selectedJobFunctions, setSelectedJobFunctions] = useState([
    "Java Engineer", 
    "Backend Engineer", 
    "Full Stack Engineer"
  ]);

  const [openSections, setOpenSections] = useState({
    basicCriteria: true,
    compensation: false,
    interests: false,
    company: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleJobFunctionToggle = (jobFunction: string) => {
    setSelectedJobFunctions(prev => 
      prev.includes(jobFunction)
        ? prev.filter(f => f !== jobFunction)
        : [...prev, jobFunction]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const jobFunctionOptions = [
    "Java Engineer",
    "Backend Engineer", 
    "Full Stack Engineer",
    "Frontend Engineer",
    "DevOps Engineer",
    "Data Engineer",
    "Mobile Engineer",
    "QA Engineer"
  ];

  const jobTypes = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "internship", label: "Internship" }
  ];

  const workModels = [
    { id: "onsite", label: "Onsite" },
    { id: "remote", label: "Remote" },
    { id: "hybrid", label: "Hybrid" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] p-0">
        <div className="flex">
          {/* Header */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <ChevronRight className="w-5 h-5" />
                <DialogTitle className="text-xl font-semibold">
                  Filters <span className="bg-muted text-muted-foreground text-sm px-2 py-1 rounded-full ml-2">9</span>
                </DialogTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleApplyFilters}
                >
                  UPDATE
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto">
              {/* Basic Job Criteria */}
              <Collapsible 
                open={openSections.basicCriteria} 
                onOpenChange={() => toggleSection('basicCriteria')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-3">
                    <div>
                      <h3 className="font-medium text-left">Basic Job Criteria</h3>
                      <p className="text-sm text-muted-foreground text-left">
                        Job Function / Job Type / Work Model...
                      </p>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-4">
                  <div className="space-y-6">
                    {/* Job Function */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        * Job Function <span className="text-muted-foreground">(select from drop-down for best results)</span>
                      </label>
                      <div className="space-y-2">
                        {selectedJobFunctions.map((jobFunction) => (
                          <Badge 
                            key={jobFunction}
                            variant="default"
                            className="bg-green-100 text-green-800 border-green-300 mr-2"
                          >
                            {jobFunction}
                            <X 
                              className="w-3 h-3 ml-1 cursor-pointer" 
                              onClick={() => handleJobFunctionToggle(jobFunction)}
                            />
                          </Badge>
                        ))}
                        <div className="mt-2">
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Please select/enter your expected job function" />
                            </SelectTrigger>
                            <SelectContent>
                              {jobFunctionOptions.map((option) => (
                                <SelectItem 
                                  key={option} 
                                  value={option}
                                  onClick={() => handleJobFunctionToggle(option)}
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Excluded Title */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Excluded Title</label>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Job Type */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">* Job Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {jobTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={type.id} 
                              defaultChecked={type.id === "full-time"}
                            />
                            <label htmlFor={type.id} className="text-sm">
                              {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Work Model */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">* Work Model</label>
                      <div className="grid grid-cols-2 gap-3">
                        {workModels.map((model) => (
                          <div key={model.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={model.id} 
                              defaultChecked={model.id === "remote"}
                            />
                            <label htmlFor={model.id} className="text-sm">
                              {model.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Location</label>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="within-us">
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="within-us">Within US</SelectItem>
                            <SelectItem value="global">Global</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="25mi">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25mi">25mi</SelectItem>
                            <SelectItem value="50mi">50mi</SelectItem>
                            <SelectItem value="100mi">100mi</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Compensation & Sponsorship */}
              <Collapsible 
                open={openSections.compensation} 
                onOpenChange={() => toggleSection('compensation')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-3">
                    <div>
                      <h3 className="font-medium text-left">Compensation & Sponsorship</h3>
                      <p className="text-sm text-muted-foreground text-left">
                        Annual Salary / H1B Sponsorship
                      </p>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-4">
                  <p className="text-sm text-muted-foreground">
                    Compensation and sponsorship filters coming soon...
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Areas of Interests */}
              <Collapsible 
                open={openSections.interests} 
                onOpenChange={() => toggleSection('interests')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-3">
                    <div>
                      <h3 className="font-medium text-left">Areas of Interests</h3>
                      <p className="text-sm text-muted-foreground text-left">
                        Industry / Skill / Role(IC/Manager)...
                      </p>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-4">
                  <p className="text-sm text-muted-foreground">
                    Areas of interest filters coming soon...
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Company Insights */}
              <Collapsible 
                open={openSections.company} 
                onOpenChange={() => toggleSection('company')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-3">
                    <div>
                      <h3 className="font-medium text-left">Company Insights</h3>
                      <p className="text-sm text-muted-foreground text-left">
                        Company Search / Exclude Staffing Agency...
                      </p>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Applying for specific companies?
                    </h4>
                    <p className="text-sm text-blue-800">
                      Use filters in the{" "}
                      <span className="font-medium underline cursor-pointer">Company Insights</span>{" "}
                      section to find your target companies.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}