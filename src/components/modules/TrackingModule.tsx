import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  Package, 
  Truck,
  CheckCircle,
  AlertCircle,
  Navigation,
  Camera,
  Phone,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";
import trackingImage from "@/assets/tracking-icon.jpg";

const deliveries = [
  {
    id: "D001",
    trackingNumber: "TRK-2024-08-001",
    status: "En transit",
    progress: 75,
    origin: "Paris",
    destination: "Lyon",
    estimatedDelivery: "15:30",
    currentLocation: "Mâcon",
    driver: "Jean Dupont",
    driverPhone: "+33 6 12 34 56 78",
    vehicle: "Renault Master - AB-123-CD",
    packageCount: 3,
    weight: "2.5 tonnes",
    priority: "Standard",
    customer: "LogiCorp SA",
    events: [
      {
        time: "09:15",
        location: "Paris - Entrepôt",
        status: "Colis collecté",
        icon: Package,
        completed: true
      },
      {
        time: "11:30", 
        location: "Autoroute A6",
        status: "En transit vers Lyon",
        icon: Truck,
        completed: true
      },
      {
        time: "13:45",
        location: "Mâcon",
        status: "Pause réglementaire",
        icon: Clock,
        completed: true
      },
      {
        time: "15:30",
        location: "Lyon - Client",
        status: "Livraison prévue",
        icon: MapPin,
        completed: false
      }
    ]
  },
  {
    id: "D002",
    trackingNumber: "TRK-2024-08-002", 
    status: "Livré",
    progress: 100,
    origin: "Marseille",
    destination: "Nice",
    estimatedDelivery: "Livré à 14:25",
    currentLocation: "Nice",
    driver: "Marie Martin",
    driverPhone: "+33 6 87 65 43 21",
    vehicle: "Iveco Daily - XY-789-ZW",
    packageCount: 1,
    weight: "0.8 tonne",
    priority: "Express",
    customer: "AutoParts Pro",
    events: [
      {
        time: "08:00",
        location: "Marseille",
        status: "Colis collecté",
        icon: Package,
        completed: true
      },
      {
        time: "12:15",
        location: "Autoroute A8",
        status: "En transit",
        icon: Truck,
        completed: true
      },
      {
        time: "14:25",
        location: "Nice - Client",
        status: "Livraison effectuée",
        icon: CheckCircle,
        completed: true
      }
    ]
  },
  {
    id: "D003",
    trackingNumber: "TRK-2024-08-003",
    status: "Retard",
    progress: 45,
    origin: "Lille",
    destination: "Strasbourg",
    estimatedDelivery: "17:00 (retardé)",
    currentLocation: "Reims",
    driver: "Pierre Durand",
    driverPhone: "+33 6 45 67 89 12",
    vehicle: "Mercedes Sprinter - QW-456-ER",
    packageCount: 5,
    weight: "3.2 tonnes",
    priority: "Urgent",
    customer: "MediLog Express",
    events: [
      {
        time: "07:30",
        location: "Lille",
        status: "Colis collecté",
        icon: Package,
        completed: true
      },
      {
        time: "10:15",
        location: "Reims",
        status: "Problème technique",
        icon: AlertCircle,
        completed: true
      },
      {
        time: "17:00",
        location: "Strasbourg",
        status: "Livraison reprogrammée",
        icon: MapPin,
        completed: false
      }
    ]
  }
];

export function TrackingModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré": return "bg-success text-success-foreground";
      case "En transit": return "bg-primary text-primary-foreground";
      case "Retard": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "bg-destructive text-destructive-foreground";
      case "Express": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div 
            className="w-16 h-16 rounded-xl bg-cover bg-center shadow-soft"
            style={{ backgroundImage: `url(${trackingImage})` }}
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Suivi Temps Réel</h1>
            <p className="text-muted-foreground">Géolocalisation et suivi des livraisons en direct</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="default">
            <Navigation className="w-4 h-4 mr-2" />
            Carte Live
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par numéro de suivi, client ou destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Button variant="outline" size="sm">Tous</Button>
            <Button variant="outline" size="sm">En transit</Button>
            <Button variant="outline" size="sm">Retards</Button>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">12</div>
          <p className="text-sm text-muted-foreground">Livraisons aujourd'hui</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">8</div>
          <p className="text-sm text-muted-foreground">En transit</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">2</div>
          <p className="text-sm text-muted-foreground">Retards</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">98.5%</div>
          <p className="text-sm text-muted-foreground">Taux de réussite</p>
        </Card>
      </div>

      {/* Deliveries List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="p-6 hover-lift">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {delivery.trackingNumber}
                  </Badge>
                  <Badge className={getStatusColor(delivery.status)}>
                    {delivery.status}
                  </Badge>
                  <Badge className={getPriorityColor(delivery.priority)}>
                    {delivery.priority}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground">{delivery.customer}</h3>
                <p className="text-sm text-muted-foreground">
                  {delivery.origin} → {delivery.destination}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSelectedDelivery(
                  selectedDelivery === delivery.id ? null : delivery.id
                )}
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progression</span>
                <span className="text-sm text-muted-foreground">{delivery.progress}%</span>
              </div>
              <Progress value={delivery.progress} className="h-2" />
            </div>

            {/* Current Status */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Position:</span>
                <span className="font-medium">{delivery.currentLocation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">ETA:</span>
                <span className="font-medium">{delivery.estimatedDelivery}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4 text-secondary" />
                <span className="text-muted-foreground">Colis:</span>
                <span className="font-medium">{delivery.packageCount} ({delivery.weight})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Véhicule:</span>
                <span className="font-medium text-xs">{delivery.vehicle}</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Driver Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {delivery.driver.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{delivery.driver}</p>
                  <p className="text-xs text-muted-foreground">Chauffeur</p>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <Button size="icon" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Detailed Events (Expandable) */}
            {selectedDelivery === delivery.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-3 text-foreground">Historique de livraison</h4>
                <div className="space-y-3">
                  {delivery.events.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          event.completed ? 'bg-success' : 'bg-muted'
                        }`}>
                          <Icon className={`w-3 h-3 ${
                            event.completed ? 'text-white' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm ${
                              event.completed ? 'text-foreground font-medium' : 'text-muted-foreground'
                            }`}>
                              {event.status}
                            </p>
                            <span className="text-xs text-muted-foreground">{event.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Carte Interactive</h3>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer véhicules
          </Button>
        </div>
        
        <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Carte Interactive</h4>
            <p className="text-muted-foreground">
              Intégration Mapbox pour visualiser les véhicules en temps réel
            </p>
            <Button variant="default" className="mt-4">
              Activer la carte
            </Button>
          </div>
        </div>
      </Card>

      {/* No Results */}
      {filteredDeliveries.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucune livraison trouvée</h3>
          <p className="text-muted-foreground mb-4">
            Vérifiez votre recherche ou consultez toutes les livraisons.
          </p>
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            Effacer la recherche
          </Button>
        </Card>
      )}
    </div>
  );
}