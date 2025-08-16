import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { createGeminiChat, sendMessage } from '@/lib/gemini';
import { extractTextFromPDF } from '@/lib/pdfUtils';
import { Send, Upload, Bot, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const Chat = () => {
  const [user] = useAuthState(auth);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversation(newConversation.id);
  };

  const getCurrentConversation = () => {
    return conversations.find(conv => conv.id === activeConversation);
  };

  const addMessage = (content: string, isUser: boolean) => {
    if (!activeConversation) {
      createNewConversation();
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversation) {
        const updatedMessages = [...conv.messages, newMessage];
        // Update conversation title with first user message
        const title = conv.title === 'New Chat' && isUser ? 
          content.slice(0, 30) + (content.length > 30 ? '...' : '') : 
          conv.title;
        
        return {
          ...conv,
          title,
          messages: updatedMessages,
        };
      }
      return conv;
    }));
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !apiKey) {
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please add your Gemini API key in Settings first.",
          variant: "destructive",
        });
      }
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Ensure we have an active conversation
    if (!activeConversation) {
      createNewConversation();
    }

    addMessage(userMessage, true);

    try {
      const model = createGeminiChat(apiKey);
      const response = await sendMessage(model, userMessage);
      addMessage(response, false);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('Sorry, I encountered an error. Please check your API key and try again.', false);
      toast({
        title: "Error",
        description: "Failed to send message. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !apiKey) {
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please add your Gemini API key in Settings first.",
          variant: "destructive",
        });
      }
      return;
    }

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const extractedText = await extractTextFromPDF(file);
      const prompt = `Please analyze the following PDF content and provide a summary:\n\n${extractedText}`;
      
      if (!activeConversation) {
        createNewConversation();
      }

      addMessage(`Uploaded PDF: ${file.name}`, true);

      const model = createGeminiChat(apiKey);
      const response = await sendMessage(model, prompt);
      addMessage(response, false);

      toast({
        title: "PDF Processed",
        description: "Your PDF has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast({
        title: "PDF Processing Failed",
        description: "Failed to extract text from PDF.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const currentConversation = getCurrentConversation();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground">Please sign in to access the chat feature.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-secondary/30 flex flex-col">
        <div className="p-4 border-b">
          <Button onClick={createNewConversation} className="w-full">
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={cn(
                "p-3 rounded-lg cursor-pointer hover:bg-background/50 transition-colors mb-2",
                activeConversation === conv.id ? "bg-background shadow-sm" : ""
              )}
            >
              <p className="font-medium text-sm truncate">{conv.title}</p>
              <p className="text-xs text-muted-foreground">
                {conv.messages.length} messages
              </p>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {!apiKey && (
          <div className="bg-destructive/10 border-destructive/20 border-b p-3 text-center">
            <p className="text-sm text-destructive">
              API key not configured. Please add your Gemini API key in{' '}
              <a href="/settings" className="underline font-medium">Settings</a>.
            </p>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {currentConversation?.messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
                <p className="text-muted-foreground">
                  Ask me anything or upload a PDF to analyze
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {currentConversation?.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-3xl",
                    message.isUser ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.isUser ? "bg-primary text-primary-foreground" : "bg-secondary"
                  )}>
                    {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "rounded-lg p-3 max-w-[80%]",
                    message.isUser ? 
                      "bg-primary text-primary-foreground" : 
                      "bg-secondary text-secondary-foreground"
                  )}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <p className="text-muted-foreground">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf"
              className="hidden"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || !apiKey}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <div className="flex-1 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={apiKey ? "Type your message..." : "Please configure API key in Settings"}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading || !apiKey}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim() || !apiKey}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;