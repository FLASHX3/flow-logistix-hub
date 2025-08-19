import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin, 
  Package, 
  Clock, 
  Euro,
  Truck,
  Filter,
  Plus,
  Star,
  CheckCircle
} from "lucide-react";
import marketplaceImage from "@/assets/marketplace-icon.jpg";

const missions = [
  {
    id: "M001",
    origin: "Paris, France",
    destination: "Lyon, France", 
    weight: "2.5 tonnes",
    type: "Produits industriels",
    deadline: "2024-08-22",
    budget: "450€",
    status: "En attente",
    priority: "Normale",
    shipper: "LogiCorp SA",
    rating: 4.8,
    offers: 3
  },
  {
    id: "M002",
    origin: "Marseille, France",
    destination: "Toulouse, France",
    weight: "1.8 tonnes", 
    type: "Pièces automobiles",
    deadline: "2024-08-21",
    budget: "320€",
    status: "Attribuée",
    priority: "Urgente",
    shipper: "AutoParts Pro",
    rating: 4.9,
    offers: 7
  },
  {
    id: "M003",
    origin: "Lille, France",
    destination: "Strasbourg, France",
    weight: "3.2 tonnes",
    type: "Équipements médicaux",
    deadline: "2024-08-23",
    budget: "580€",
    status: "En cours",
    priority: "Critique",
    shipper: "MediLog Express",
    rating: 5.0,
    offers: 12
  }
];

const transporters = [
  {
    id: "T001",
    name: "Express Logistics",
    rating: 4.9,
    completedMissions: 1247,
    specialties: ["Produits industriels", "Livraison express"],
    price: "0.85€/km",
    availability: "Disponible",
    eta: "2h"
  },
  {
    id: "T002", 
    name: "Secure Transport",
    rating: 4.7,
    completedMissions: 892,
    specialties: ["Équipements médicaux", "Transport sécurisé"],
    price: "1.20€/km",
    availability: "Occupé",
    eta: "4h"
  },
  {
    id: "T003",
    name: "Green Delivery",
    rating: 4.8,
    completedMissions: 756,
    specialties: ["Éco-transport", "Pièces automobiles"],
    price: "0.95€/km", 
    availability: "Disponible",
    eta: "1h"
  }
];

export function MarketplaceModule() {
  const [activeTab, setActiveTab] = useState<"shipper" | "transporter">("shipper");
  const [filterType, setFilterType] = useState("all");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critique": return "bg-destructive text-destructive-foreground";
      case "Urgente": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours": return "bg-success text-success-foreground";
      case "Attribuée": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div 
            className="w-16 h-16 rounded-xl bg-cover bg-center shadow-soft"
            style={{ backgroundImage: `url(${marketplaceImage})` }}
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Marketplace Logistique</h1>
            <p className="text-muted-foreground">Connectez affréteurs et transporteurs efficacement</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === "shipper" ? "default" : "outline"}
            onClick={() => setActiveTab("shipper")}
          >
            <Package className="w-4 h-4 mr-2" />
            Affréteur
          </Button>
          <Button 
            variant={activeTab === "transporter" ? "default" : "outline"}
            onClick={() => setActiveTab("transporter")}
          >
            <Truck className="w-4 h-4 mr-2" />
            Transporteur
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtres:</span>
          </div>
          
          <div className="flex flex-wrap gap-2 flex-1">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type de marchandise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="industrial">Produits industriels</SelectItem>
                <SelectItem value="automotive">Pièces automobiles</SelectItem>
                <SelectItem value="medical">Équipements médicaux</SelectItem>
              </SelectContent>
            </Select>

            <Input 
              placeholder="Ville de départ..." 
              className="w-48"
            />
            
            <Input 
              placeholder="Destination..." 
              className="w-48"
            />
          </div>

          <Button variant="success">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Mission
          </Button>
        </div>
      </Card>

      {/* Content based on active tab */}
      {activeTab === "shipper" ? (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Missions Disponibles</h2>
          <div className="grid gap-4">
            {missions.map((mission) => (
              <Card key={mission.id} className="p-6 hover-lift">
                <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-mono">
                        {mission.id}
                      </Badge>
                      <Badge className={getPriorityColor(mission.priority)}>
                        {mission.priority}
                      </Badge>
                      <Badge className={getStatusColor(mission.status)}>
                        {mission.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">{mission.origin} → {mission.destination}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-accent" />
                        <span className="text-sm">{mission.weight} - {mission.type}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-warning" />
                        <span className="text-sm">Échéance: {mission.deadline}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Euro className="w-4 h-4 text-success" />
                        <span className="text-sm font-semibold">{mission.budget}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Affréteur: {mission.shipper}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{mission.rating}</span>
                      </div>
                      <span>{mission.offers} offres reçues</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button variant="default" size="sm">
                      Faire une offre
                    </Button>
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Transporteurs Disponibles</h2>
          <div className="grid gap-4">
            {transporters.map((transporter) => (
              <Card key={transporter.id} className="p-6 hover-lift">
                <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-foreground">{transporter.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{transporter.rating}</span>
                      </div>
                      <Badge 
                        variant={transporter.availability === "Disponible" ? "default" : "secondary"}
                        className={transporter.availability === "Disponible" ? "bg-success text-success-foreground" : ""}
                      >
                        {transporter.availability}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">{transporter.completedMissions} missions complétées</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Euro className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">{transporter.price}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-sm">ETA: {transporter.eta}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Spécialités:</p>
                      <div className="flex flex-wrap gap-1">
                        {transporter.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant={transporter.availability === "Disponible" ? "default" : "outline"} 
                      size="sm"
                      disabled={transporter.availability !== "Disponible"}
                    >
                      Attribuer Mission
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir Profil
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}