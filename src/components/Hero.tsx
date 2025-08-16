import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, FileText, TrendingUp, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-30">
        <Card className="p-4 rotate-12 shadow-medium">
          <FileText className="h-6 w-6 text-brand-primary" />
        </Card>
      </div>
      <div className="absolute top-32 right-20 opacity-30">
        <Card className="p-4 -rotate-6 shadow-medium">
          <TrendingUp className="h-6 w-6 text-brand-accent" />
        </Card>
      </div>
      <div className="absolute bottom-32 left-20 opacity-30">
        <Card className="p-4 rotate-6 shadow-medium">
          <Brain className="h-6 w-6 text-brand-secondary" />
        </Card>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-large">
            <Zap className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          SF Manager
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
          Your AI-powered assistant for document analysis, project management, 
          and research simplification. Intelligent solutions for complex tasks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-brand-secondary hover:bg-white/90 font-semibold px-8 py-6 text-lg shadow-large"
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg backdrop-blur-sm"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 shadow-medium">
            <FileText className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Document Analysis</h3>
            <p className="text-white/80 text-sm">Summarize and analyze documents with AI precision</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 shadow-medium">
            <TrendingUp className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Project Management</h3>
            <p className="text-white/80 text-sm">Organize tasks and streamline workflows intelligently</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 shadow-medium">
            <Brain className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Research Simplification</h3>
            <p className="text-white/80 text-sm">Transform complex data into actionable insights</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;