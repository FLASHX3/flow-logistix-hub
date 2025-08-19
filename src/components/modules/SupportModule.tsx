import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  Bot,
  Paperclip,
  Search,
  Filter,
  Plus
} from "lucide-react";

const tickets = [
  {
    id: "T001",
    subject: "Retard de livraison - Mission M002",
    status: "Ouvert",
    priority: "Haute",
    category: "Livraison",
    customer: "LogiCorp SA",
    assignedTo: "Sophie Martin",
    createdAt: "2024-08-19 09:15",
    lastUpdate: "2024-08-19 14:30",
    messages: 5
  },
  {
    id: "T002", 
    subject: "Problème de paiement commande #P001",
    status: "En cours",
    priority: "Moyenne",
    category: "E-commerce",
    customer: "AutoParts Pro",
    assignedTo: "Jean Dupont",
    createdAt: "2024-08-19 11:22",
    lastUpdate: "2024-08-19 15:45",
    messages: 3
  },
  {
    id: "T003",
    subject: "SOS - Panne véhicule en urgence",
    status: "Résolu",
    priority: "Critique",
    category: "SOS",
    customer: "Express Logistics",
    assignedTo: "Marie Dubois",
    createdAt: "2024-08-18 16:30",
    lastUpdate: "2024-08-18 18:00",
    messages: 8
  }
];

const chatMessages = [
  {
    id: 1,
    type: "bot",
    message: "Bonjour ! Je suis l'assistant Flow Logistix. Comment puis-je vous aider aujourd'hui ?",
    timestamp: "14:30"
  },
  {
    id: 2,
    type: "user",
    message: "J'ai un problème avec ma livraison, elle est en retard",
    timestamp: "14:31"
  },
  {
    id: 3,
    type: "bot", 
    message: "Je comprends votre préoccupation. Pouvez-vous me donner votre numéro de suivi ?",
    timestamp: "14:31"
  },
  {
    id: 4,
    type: "user",
    message: "TRK-2024-08-003",
    timestamp: "14:32"
  },
  {
    id: 5,
    type: "bot",
    message: "J'ai trouvé votre livraison. Je vois qu'il y a eu un problème technique à Reims. Votre colis est maintenant reprogrammé pour 17h00. Souhaitez-vous être mis en contact avec un agent ?",
    timestamp: "14:33"
  }
];

const quickResponses = [
  "Où est ma livraison ?",
  "Problème de paiement",
  "Modifier une commande", 
  "Annuler une mission",
  "Contact urgence"
];

export function SupportModule() {
  const [activeTab, setActiveTab] = useState<"chat" | "tickets">("chat");
  const [chatInput, setChatInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Résolu": return "bg-success text-success-foreground";
      case "En cours": return "bg-warning text-warning-foreground";
      case "Ouvert": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critique": return "bg-destructive text-destructive-foreground";
      case "Haute": return "bg-orange-500 text-white";
      case "Moyenne": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // Add message logic here
      setChatInput("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 gradient-secondary rounded-xl flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Support & Assistance</h1>
            <p className="text-muted-foreground">Chatbot intelligent et support client 24/7</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === "chat" ? "default" : "outline"}
            onClick={() => setActiveTab("chat")}
          >
            <Bot className="w-4 h-4 mr-2" />
            Chatbot
          </Button>
          <Button 
            variant={activeTab === "tickets" ? "default" : "outline"}
            onClick={() => setActiveTab("tickets")}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Tickets Support
          </Button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "chat" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="gradient-primary text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">Assistant Flow Logistix</h3>
                    <p className="text-sm text-success flex items-center">
                      <span className="w-2 h-2 bg-success rounded-full mr-1"></span>
                      En ligne
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <Button size="icon" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <AlertTriangle className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="outline">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Tapez votre message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!chatInput.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Responses */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Réponses rapides</h3>
              <div className="space-y-2">
                {quickResponses.map((response, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left"
                    onClick={() => setChatInput(response)}
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-4 border-destructive/20 bg-destructive/5">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-semibold text-destructive">Urgence SOS</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Pour les urgences de transport (panne, accident, etc.)
              </p>
              <Button variant="destructive" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Appel d'urgence
              </Button>
            </Card>

            {/* Support Stats */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Statistiques Support</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Temps de réponse moyen</span>
                  <span className="text-sm font-medium">2 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Satisfaction client</span>
                  <span className="text-sm font-medium">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tickets résolus aujourd'hui</span>
                  <span className="text-sm font-medium">47</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          {/* Tickets Header */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="open">Ouverts</SelectItem>
                  <SelectItem value="progress">En cours</SelectItem>
                  <SelectItem value="resolved">Résolus</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Ticket
              </Button>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="p-6 hover-lift">
                <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-mono">
                        {ticket.id}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant="secondary">
                        {ticket.category}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground">
                      {ticket.subject}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Client:</span>
                        <span className="font-medium">{ticket.customer}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">Assigné à:</span>
                        <span className="font-medium">{ticket.assignedTo}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span className="text-muted-foreground">Créé:</span>
                        <span className="font-medium">{ticket.createdAt}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">Dernière mise à jour:</span>
                        <span className="font-medium">{ticket.lastUpdate}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{ticket.messages} message{ticket.messages > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button variant="default" size="sm">
                      Voir Détails
                    </Button>
                    <Button variant="outline" size="sm">
                      Répondre
                    </Button>
                    {ticket.priority === "Critique" && (
                      <Button variant="destructive" size="sm">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Escalader
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTickets.length === 0 && (
            <Card className="p-12 text-center">
              <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Aucun ticket trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Aucun ticket ne correspond à votre recherche.
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Effacer la recherche
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}