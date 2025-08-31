import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  CreditCard, 
  BellRing, 
  FileText, 
  LogOut, 
  Trash2,
  X 
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState("login-security");

  const sidebarItems = [
    { id: "login-security", label: "Login & Security", icon: Shield },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
    { id: "job-alerts", label: "Job Alerts Preference", icon: BellRing },
  ];

  const bottomItems = [
    { id: "privacy", label: "Privacy Policy", icon: FileText },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[600px] p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 bg-muted/30 border-r border-border p-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1">
              {bottomItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-xl font-semibold">
                {activeSection === "login-security" && "Login & Security"}
                {activeSection === "subscriptions" && "Subscriptions"}
                {activeSection === "job-alerts" && "Job Alerts Preference"}
                {activeSection === "privacy" && "Privacy Policy"}
                {activeSection === "logout" && "Log Out"}
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Login & Security Content */}
            {activeSection === "login-security" && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value="kodurimohan5@gmail.com" 
                    className="mt-1"
                    readOnly 
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      Reset password
                    </Button>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value="••••••••" 
                    className="mt-1"
                    readOnly 
                  />
                </div>

                <Separator />

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Trash2 className="w-5 h-5 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-destructive">Delete my account</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Permanently delete your Jobright account and all associated data
                      </p>
                      <Button variant="destructive" size="sm" className="mt-3">
                        Delete my account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Subscriptions Content */}
            {activeSection === "subscriptions" && (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No active subscriptions</h3>
                <p className="text-muted-foreground">
                  Manage your subscription plans and billing information here.
                </p>
              </div>
            )}

            {/* Job Alerts Content */}
            {activeSection === "job-alerts" && (
              <div className="text-center py-12">
                <BellRing className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Job Alert Preferences</h3>
                <p className="text-muted-foreground">
                  Configure how and when you receive job notifications.
                </p>
              </div>
            )}

            {/* Privacy Policy Content */}
            {activeSection === "privacy" && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Privacy Policy</h3>
                <p className="text-muted-foreground">
                  View our privacy policy and data handling practices.
                </p>
              </div>
            )}

            {/* Logout Content */}
            {activeSection === "logout" && (
              <div className="text-center py-12">
                <LogOut className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Log Out</h3>
                <p className="text-muted-foreground mb-4">
                  Are you sure you want to log out?
                </p>
                <Button variant="outline">
                  Log Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}