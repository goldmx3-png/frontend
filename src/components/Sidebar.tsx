import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, FileText, User, Settings, Gift, Bell, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  
  const navigationItems = [
    { icon: Briefcase, label: "Jobs", path: "/", count: null },
    { icon: FileText, label: "Resume", path: "/resume", count: null },
    { icon: User, label: "Profile", path: "/profile", count: null },
    { icon: Settings, label: "Agent", path: "/agent", count: "NEW" }
  ];

  return (
    <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 space-y-4">
      {/* Logo */}
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 bg-primary-foreground rounded-sm"></div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.label} className="relative">
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`w-12 h-12 p-0 ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                asChild
              >
                <Link to={item.path}>
                  <item.icon className="w-5 h-5" />
                </Link>
              </Button>
              {item.count && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 text-xs px-1 min-w-[16px] h-4"
                >
                  {item.count}
                </Badge>
              )}
              <span className="sr-only">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Icons */}
      <div className="flex-1"></div>
      <div className="flex flex-col space-y-2">
        <Button variant="ghost" size="sm" className="w-12 h-12 p-0 text-muted-foreground">
          <Gift className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="w-12 h-12 p-0 text-muted-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="w-12 h-12 p-0 text-muted-foreground">
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="w-12 h-12 p-0 text-muted-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}