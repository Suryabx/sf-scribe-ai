import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Github, Mail, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SF Manager</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An intelligent AI chat application powered by Google's Gemini API, designed to revolutionize how you interact with information.
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            <p className="mb-4">
              SF Manager is a cutting-edge AI chat application that leverages the power of Google's Gemini API to provide intelligent, context-aware conversations. Whether you're looking to analyze documents, get quick answers, or engage in meaningful dialogue, SF Manager is your go-to digital assistant.
            </p>
            <p>
              Built with modern web technologies including React, Firebase Authentication, and advanced PDF processing capabilities, SF Manager offers a seamless and secure user experience across all devices.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            <p>
              To democratize access to advanced AI capabilities and make intelligent document analysis accessible to everyone. We believe that powerful AI tools should be intuitive, secure, and available to users regardless of their technical background.
            </p>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground mb-8">
            The passionate developers behind SF Manager
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  SB
                </AvatarFallback>
              </Avatar>
              <CardTitle>Surya B</CardTitle>
              <p className="text-muted-foreground">Co-Founder & Developer</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Full-stack developer passionate about AI and user experience design.
              </p>
              <div className="flex justify-center space-x-4">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  AR
                </AvatarFallback>
              </Avatar>
              <CardTitle>Abishek Raj PR</CardTitle>
              <p className="text-muted-foreground">Co-Founder & Developer</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Backend specialist focused on AI integration and system architecture.
              </p>
              <div className="flex justify-center space-x-4">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;