import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  ShoppingCart, 
  MapPin, 
  MessageCircle, 
  BarChart3, 
  ArrowRight,
  Zap,
  Shield,
  Globe
} from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

interface HeroSectionProps {
  onModuleSelect: (module: string) => void;
}

const features = [
  {
    icon: Zap,
    title: "Temps Réel",
    description: "Suivi en direct des livraisons"
  },
  {
    icon: Shield,
    title: "Sécurisé",
    description: "Transactions et données protégées"
  },
  {
    icon: Globe,
    title: "Intégré",
    description: "Plateforme unifiée complète"
  }
];

const modules = [
  {
    id: "marketplace",
    title: "Marketplace Logistique",
    description: "Connectez affréteurs et transporteurs pour optimiser les livraisons",
    icon: Truck,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    id: "ecommerce", 
    title: "Boutique E-commerce",
    description: "Catalogue de pièces reconditionnées avec paiement sécurisé",
    icon: ShoppingCart,
    color: "bg-accent/10 text-accent-foreground border-accent/20"
  },
  {
    id: "tracking",
    title: "Suivi Temps Réel",
    description: "Géolocalisation GPS et preuve de livraison instantanée",
    icon: MapPin,
    color: "bg-success/10 text-success border-success/20"
  },
  {
    id: "support",
    title: "Support & Chatbot",
    description: "Assistance intelligente et escalade pour urgences",
    icon: MessageCircle,
    color: "bg-secondary/10 text-secondary-foreground border-secondary/20"
  },
  {
    id: "analytics",
    title: "IA & Analytics",
    description: "Prédictions ETA et recommandations de prix dynamiques",
    icon: BarChart3,
    color: "bg-warning/10 text-warning-foreground border-warning/20"
  }
];

export function HeroSection({ onModuleSelect }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            🚀 Plateforme Nouvelle Génération
          </Badge>
          
          <h1 className="hero-text mb-6">
            Flow Logistix Hub
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            La plateforme intégrée qui révolutionne la logistique et l'e-commerce. 
            Connectez transporteurs, affréteurs et clients dans un écosystème intelligent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => onModuleSelect("marketplace")}
              className="group"
            >
              Découvrir la Marketplace
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => onModuleSelect("ecommerce")}
            >
              Parcourir la Boutique
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Modules de la Plateforme
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.id}
                  className={`p-6 hover-lift cursor-pointer group ${module.color}`}
                  onClick={() => onModuleSelect(module.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {module.description}
                      </p>
                      <div className="flex items-center text-sm font-medium group-hover:text-primary transition-colors">
                        Découvrir
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}