import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MarketplaceModule } from "@/components/modules/MarketplaceModule";
import { EcommerceModule } from "@/components/modules/EcommerceModule";
import { TrackingModule } from "@/components/modules/TrackingModule";
import { SupportModule } from "@/components/modules/SupportModule";

const Index = () => {
  const [activeModule, setActiveModule] = useState<string>("home");

  const renderModule = () => {
    switch (activeModule) {
      case "marketplace":
        return <MarketplaceModule />;
      case "ecommerce":
        return <EcommerceModule />;
      case "tracking":
        return <TrackingModule />;
      case "support":
        return <SupportModule />;
      case "analytics":
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">Module IA & Analytics</h2>
              <p className="text-muted-foreground">Prédictions ETA et recommandations de prix dynamiques</p>
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">Panel Administration</h2>
              <p className="text-muted-foreground">Gestion des utilisateurs, KYC et tableaux de bord</p>
            </div>
          </div>
        );
      default:
        return <HeroSection onModuleSelect={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onModuleSelect={setActiveModule} activeModule={activeModule} />
      {renderModule()}
    </div>
  );
};

export default Index;
