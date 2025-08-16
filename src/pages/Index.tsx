import { useState } from "react";
import Hero from "@/components/Hero";
import AIModeSection from "@/components/AIModesSection";
import AIWorkspace from "@/components/AIWorkspace";

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
  };

  const handleBack = () => {
    setSelectedMode(null);
  };

  if (selectedMode) {
    return <AIWorkspace selectedMode={selectedMode} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <AIModeSection onModeSelect={handleModeSelect} />
    </div>
  );
};

export default Index;