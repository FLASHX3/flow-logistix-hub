import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Truck, 
  ShoppingCart, 
  MapPin, 
  MessageCircle, 
  BarChart3, 
  Menu, 
  X,
  Package,
  Users,
  Shield
} from "lucide-react";

interface NavigationProps {
  onModuleSelect: (module: string) => void;
  activeModule: string;
}

const modules = [
  {
    id: "marketplace",
    title: "Marketplace Logistique",
    description: "Connecter affréteurs et transporteurs",
    icon: Truck,
    color: "primary"
  },
  {
    id: "ecommerce",
    title: "Boutique E-commerce",
    description: "Pièces reconditionnées",
    icon: ShoppingCart,
    color: "accent"
  },
  {
    id: "tracking",
    title: "Suivi Temps Réel",
    description: "Géolocalisation et livraisons",
    icon: MapPin,
    color: "success"
  },
  {
    id: "support",
    title: "Support & Chatbot",
    description: "Assistance client 24/7",
    icon: MessageCircle,
    color: "secondary"
  },
  {
    id: "analytics",
    title: "IA & Analytics",
    description: "Prédictions et optimisation",
    icon: BarChart3,
    color: "primary"
  },
  {
    id: "admin",
    title: "Administration",
    description: "Gestion et KPI",
    icon: Shield,
    color: "accent"
  }
];

export function Navigation({ onModuleSelect, activeModule }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Flow Logistix</h1>
              <p className="text-xs text-muted-foreground">Hub Intégré</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              
              return (
                <Button
                  key={module.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onModuleSelect(module.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{module.title}</span>
                </Button>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Users className="w-4 h-4 mr-2" />
              Se connecter
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                
                return (
                  <Card
                    key={module.id}
                    className={`p-3 cursor-pointer transition-smooth hover-lift ${
                      isActive ? 'bg-primary/10 border-primary' : ''
                    }`}
                    onClick={() => {
                      onModuleSelect(module.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div>
                        <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                          {module.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}