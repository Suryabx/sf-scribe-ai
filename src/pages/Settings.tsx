import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Save, Trash2, Key, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [user] = useAuthState(auth);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing API key from localStorage
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setHasApiKey(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('gemini-api-key', apiKey.trim());
    setHasApiKey(true);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved successfully.",
    });
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('gemini-api-key');
    setApiKey('');
    setHasApiKey(false);
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed from local storage.",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground">Please sign in to access settings.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Settings</h1>
          <p className="text-muted-foreground">
            Manage your SF Manager preferences and API configuration
          </p>
        </div>

        {/* API Key Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Gemini API Key
              {hasApiKey && (
                <Badge variant="secondary" className="ml-auto">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Configured
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your API key is stored locally in your browser and never sent to our servers. 
                You can get a free API key from{' '}
                <a 
                  href="https://aistudio.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Google AI Studio
                </a>.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <label htmlFor="apiKey" className="block text-sm font-medium">
                API Key
              </label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSaveApiKey} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save API Key
              </Button>
              {hasApiKey && (
                <Button 
                  variant="destructive" 
                  onClick={handleRemoveApiKey}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Key
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={user.email || ''} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Account Created</label>
              <Input 
                value={user.metadata.creationTime || 'Unknown'} 
                disabled 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Sign In</label>
              <Input 
                value={user.metadata.lastSignInTime || 'Unknown'} 
                disabled 
              />
            </div>
          </CardContent>
        </Card>

        {/* Instructions Link */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Need help getting your API key?
          </p>
          <Button variant="outline" asChild>
            <a href="/instructions">
              View Setup Instructions
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;