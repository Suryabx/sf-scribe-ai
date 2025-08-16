import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Briefcase, Search, ArrowRight } from "lucide-react";

interface AIModeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  badge: string;
  onClick: () => void;
}

const AIMode = ({ icon, title, description, features, badge, onClick }: AIModeProps) => (
  <Card className="p-8 hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer group" onClick={onClick}>
    <div className="flex items-start justify-between mb-6">
      <div className="bg-gradient-primary p-3 rounded-xl text-white shadow-medium">
        {icon}
      </div>
      <Badge variant="secondary" className="bg-brand-accent/10 text-brand-accent border-brand-accent/20">
        {badge}
      </Badge>
    </div>
    
    <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-primary transition-colors">
      {title}
    </h3>
    
    <p className="text-muted-foreground mb-6 leading-relaxed">
      {description}
    </p>
    
    <div className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center text-sm text-muted-foreground">
          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-3" />
          {feature}
        </div>
      ))}
    </div>
    
    <Button 
      className="w-full group-hover:bg-brand-primary group-hover:text-white transition-all duration-300"
      variant="outline"
    >
      Select Mode
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </Card>
);

interface AIModesProps {
  onModeSelect: (mode: string) => void;
}

const AIModeSection = ({ onModeSelect }: AIModesProps) => {
  const modes = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Summarization",
      description: "Transform lengthy documents into clear, structured summaries with key insights and actionable points.",
      features: [
        "Multi-level summaries (beginner to expert)",
        "Key risk and opportunity identification",
        "Structured output formats",
        "Context-aware analysis"
      ],
      badge: "Popular",
      mode: "document"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Project Management",
      description: "Intelligent task organization with automated role assignments and workflow optimization suggestions.",
      features: [
        "Automatic task identification",
        "Deadline and priority analysis",
        "Role assignment suggestions",
        "Process improvement recommendations"
      ],
      badge: "Efficient",
      mode: "project"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Research Simplification",
      description: "Convert complex research data into digestible insights with visual representations and clear conclusions.",
      features: [
        "Data pattern recognition",
        "Visual insight generation",
        "Conclusion synthesis",
        "Recommendation engine"
      ],
      badge: "Advanced",
      mode: "research"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Choose Your AI Mode
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Select the perfect AI assistant mode for your specific needs. Each mode is optimized 
            for different types of tasks and complexity levels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modes.map((mode, index) => (
            <AIMode
              key={index}
              icon={mode.icon}
              title={mode.title}
              description={mode.description}
              features={mode.features}
              badge={mode.badge}
              onClick={() => onModeSelect(mode.mode)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Not sure which mode to choose? We'll help you decide based on your input.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onModeSelect("auto")}
          >
            Auto-Detect Mode
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIModeSection;