import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Mail, Github, ChevronDown, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqs = [
    {
      id: 'api-key',
      question: 'How do I get a Gemini API key?',
      answer: 'Visit https://aistudio.google.com/, sign in with your Google account, and click "Get API Key" to generate your free API key.'
    },
    {
      id: 'free-usage',
      question: 'Is SF Manager free to use?',
      answer: 'Yes! SF Manager is completely free. You only need a free Gemini API key which comes with generous usage limits from Google.'
    },
    {
      id: 'pdf-support',
      question: 'What file types are supported?',
      answer: 'Currently, we support PDF files for document analysis. We extract text from PDFs and analyze them using AI.'
    },
    {
      id: 'data-privacy',
      question: 'How is my data handled?',
      answer: 'Your API key is stored locally in your browser. Your conversations go directly to Google\'s servers without passing through our systems, ensuring maximum privacy.'
    },
    {
      id: 'mobile-support',
      question: 'Does SF Manager work on mobile?',
      answer: 'Yes! SF Manager is fully responsive and works great on mobile devices, tablets, and desktops.'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or need help? We're here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us more..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@sfmanager.dev</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-muted-foreground">github.com/sf-manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqs.map((faq) => (
                  <Collapsible 
                    key={faq.id} 
                    open={openFaq === faq.id} 
                    onOpenChange={(open) => setOpenFaq(open ? faq.id : null)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left rounded-lg hover:bg-secondary/50 transition-colors">
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-3 pb-3">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;