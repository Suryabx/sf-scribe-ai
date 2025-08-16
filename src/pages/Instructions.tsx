import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Key, Globe, Copy, CheckCircle } from 'lucide-react';

const Instructions = () => {
  const steps = [
    {
      number: 1,
      title: "Visit Google AI Studio",
      description: "Navigate to the Google AI Studio website to get started",
      action: "https://aistudio.google.com/",
      buttonText: "Open AI Studio"
    },
    {
      number: 2,
      title: "Sign in with Google",
      description: "Use your Google account to access AI Studio",
      icon: <Globe className="h-5 w-5" />
    },
    {
      number: 3,
      title: "Get API Key",
      description: "Click on 'Get API Key' button in the AI Studio interface",
      icon: <Key className="h-5 w-5" />
    },
    {
      number: 4,
      title: "Copy Your Key",
      description: "Copy the generated API key to your clipboard",
      icon: <Copy className="h-5 w-5" />
    },
    {
      number: 5,
      title: "Add to SF Manager",
      description: "Paste the API key in SF Manager Settings page",
      action: "/settings",
      buttonText: "Go to Settings"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Setup Instructions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to get your Gemini API key and start using SF Manager
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary mb-2">Important Information</h3>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• The Gemini API key is free to use with generous limits</li>
                  <li>• Your API key is stored locally in your browser for security</li>
                  <li>• We never store or access your API key on our servers</li>
                  <li>• You can update or remove your key anytime in Settings</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <Card key={step.number} className="overflow-hidden">
              <CardHeader className="bg-secondary/30">
                <CardTitle className="flex items-center gap-3">
                  <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                    {step.number}
                  </Badge>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {step.icon}
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {step.action && (
                    <Button asChild>
                      <a 
                        href={step.action} 
                        target={step.action.startsWith('http') ? '_blank' : '_self'}
                        rel={step.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-2"
                      >
                        {step.buttonText}
                        {step.action.startsWith('http') && <ExternalLink className="h-4 w-4" />}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Key Benefits */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Why You Need an API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Direct Access</h4>
                <p className="text-muted-foreground text-sm">
                  Connect directly to Google's Gemini AI without intermediaries for the best performance and reliability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Your Control</h4>
                <p className="text-muted-foreground text-sm">
                  Manage your own usage limits and have full control over your AI interactions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Privacy First</h4>
                <p className="text-muted-foreground text-sm">
                  Your conversations go directly to Google's secure servers without passing through our systems.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Free Tier</h4>
                <p className="text-muted-foreground text-sm">
                  Google provides a generous free tier for API usage, perfect for personal and small business use.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Screenshots Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Visual Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/30 rounded-lg p-8 text-center">
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Google AI Studio Homepage</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-8 text-center">
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Key className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">API Key Generation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Instructions;