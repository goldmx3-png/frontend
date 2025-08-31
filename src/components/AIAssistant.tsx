import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send } from "lucide-react";
import { useState } from "react";

export function AIAssistant() {
  const [message, setMessage] = useState("");

  const suggestions = [
    "how to use jobright auto fill",
    "Tell me why this job is a good fit for me",
    "Give me some resume tips if I want to apply",
    "Generate custom resume tailored to this job",
    "Show me Connections for potential referral",
    "Write a cover letter for this job"
  ];

  return (
    <Card className="w-80 border-l border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Orion</h3>
              <p className="text-xs text-muted-foreground">Your AI Copilot</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Quick Guide
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-accent/50 rounded-lg p-3">
          <p className="text-sm">
            I see that you're asking about this <strong>Software Engineer</strong> role at{" "}
            <strong>Second Nature</strong>. What would you like to know?
          </p>
        </div>

        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 text-xs py-1 px-2 block w-fit"
            >
              {suggestion}
            </Badge>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          I'm here to assist with job searches and career-related questions. For specific instructions on using JobRight's auto-fill feature, please refer to their official documentation or support resources. Is there anything else I can help you with regarding your job search?
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button size="sm" className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}