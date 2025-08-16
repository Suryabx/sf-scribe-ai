import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, MessageSquare, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              SF Manager
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your AI-powered assistant for intelligent conversations, document analysis, and seamless productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-background shadow-soft">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Chat</h3>
              <p className="text-muted-foreground">
                Engage with advanced AI using Google's Gemini API for intelligent conversations and assistance.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background shadow-soft">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">PDF Analysis</h3>
              <p className="text-muted-foreground">
                Upload PDF documents and extract insights with AI-powered text analysis and summarization.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background shadow-soft">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Fast</h3>
              <p className="text-muted-foreground">
                Built with modern security practices and optimized for speed with your privacy in mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;