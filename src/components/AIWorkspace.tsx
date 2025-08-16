import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Briefcase, Search, Sparkles, ArrowLeft, Copy, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AIWorkspaceProps {
  selectedMode: string;
  onBack: () => void;
}

const AIWorkspace = ({ selectedMode, onBack }: AIWorkspaceProps) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [complexityLevel, setComplexityLevel] = useState("intermediate");

  const getModeConfig = (mode: string) => {
    const configs = {
      document: {
        title: "Document Summarization",
        icon: <FileText className="h-5 w-5" />,
        placeholder: "Paste your document content here or describe what you need summarized...",
        badge: "Document Analysis"
      },
      project: {
        title: "Project Management",
        icon: <Briefcase className="h-5 w-5" />,
        placeholder: "Describe your project, tasks, deadlines, and team members...",
        badge: "Task Organization"
      },
      research: {
        title: "Research Simplification",
        icon: <Search className="h-5 w-5" />,
        placeholder: "Share your research data, findings, or complex information to analyze...",
        badge: "Data Analysis"
      },
      auto: {
        title: "Auto-Detect Mode",
        icon: <Sparkles className="h-5 w-5" />,
        placeholder: "Describe your task or paste your content. I'll automatically detect the best approach...",
        badge: "Smart Detection"
      }
    };
    return configs[mode as keyof typeof configs] || configs.auto;
  };

  const handleProcess = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide some content to process.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockOutput = generateMockOutput(selectedMode, input, complexityLevel);
      setOutput(mockOutput);
      setIsProcessing(false);
      toast({
        title: "Analysis Complete",
        description: "Your content has been processed successfully.",
      });
    }, 2000);
  };

  const generateMockOutput = (mode: string, input: string, level: string) => {
    const outputs = {
      document: {
        beginner: "## Simple Summary\n\n**Main Points:**\n- Key finding 1\n- Key finding 2\n- Key finding 3\n\n**What This Means:**\nThis document discusses important topics that affect...",
        intermediate: "## Executive Summary\n\n**Key Insights:**\n- Strategic implication 1\n- Market opportunity 2\n- Risk assessment 3\n\n**Analysis:**\nThe document presents a comprehensive view of...",
        expert: "## Technical Analysis\n\n**Critical Findings:**\n- Advanced insight 1\n- Methodological consideration 2\n- Strategic framework 3\n\n**Deep Analysis:**\nThe document employs sophisticated methodologies..."
      },
      project: {
        beginner: "## Project Overview\n\n**Tasks Identified:**\n1. Task A (Due: Next week)\n2. Task B (Due: Month end)\n\n**Team Roles:**\n- Person 1: Leader\n- Person 2: Support",
        intermediate: "## Project Management Analysis\n\n**Task Breakdown:**\n- High Priority: Task A, B\n- Medium Priority: Task C, D\n\n**Timeline:**\nPhase 1: Weeks 1-2\nPhase 2: Weeks 3-4",
        expert: "## Strategic Project Framework\n\n**Critical Path Analysis:**\n- Dependencies mapped\n- Resource optimization identified\n- Risk mitigation strategies outlined"
      },
      research: {
        beginner: "## Research Summary\n\n**What We Found:**\n- Finding 1\n- Finding 2\n\n**What It Means:**\nThe research shows that...",
        intermediate: "## Research Analysis\n\n**Key Patterns:**\n- Trend A: Significance level\n- Trend B: Impact assessment\n\n**Implications:**\nData suggests...",
        expert: "## Technical Research Analysis\n\n**Statistical Significance:**\n- Methodology validation\n- Confidence intervals\n- Predictive modeling results"
      }
    };
    
    return outputs[mode as keyof typeof outputs]?.[level as keyof typeof outputs['document']] || 
           "## Analysis Complete\n\nBased on your input, here are the key insights and recommendations...";
  };

  const config = getModeConfig(selectedMode);

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modes
          </Button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gradient-primary p-2 rounded-lg text-white">
              {config.icon}
            </div>
            <h1 className="text-3xl font-bold">{config.title}</h1>
            <Badge variant="secondary" className="bg-brand-accent/10 text-brand-accent">
              {config.badge}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Input Content</h2>
                <Select value={complexityLevel} onValueChange={setComplexityLevel}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Textarea
                placeholder={config.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {input.length} characters
                </p>
                <Button 
                  onClick={handleProcess} 
                  disabled={isProcessing || !input.trim()}
                  className="bg-gradient-primary text-white hover:opacity-90"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Process Content
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">AI Analysis Result</h2>
              {output && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(output);
                      toast({ title: "Copied to clipboard" });
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {output ? (
              <Tabs defaultValue="formatted" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="formatted">Formatted</TabsTrigger>
                  <TabsTrigger value="raw">Raw Text</TabsTrigger>
                </TabsList>
                <TabsContent value="formatted" className="mt-4">
                  <div className="prose max-w-none bg-muted/30 p-4 rounded-lg min-h-[300px]">
                    <pre className="whitespace-pre-wrap text-sm">{output}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="raw" className="mt-4">
                  <Textarea 
                    value={output} 
                    readOnly 
                    className="min-h-[300px] resize-none bg-muted/30"
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center min-h-[300px] text-muted-foreground bg-muted/30 rounded-lg">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>AI analysis will appear here</p>
                  <p className="text-sm">Process your content to get started</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIWorkspace;