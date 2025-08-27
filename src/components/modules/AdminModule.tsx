
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  TrendingUp, 
  Package, 
  MapPin, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  UserCheck,
  UserX,
  Eye
} from "lucide-react";

export const AdminModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("dashboard");

  // Mock data pour les KPI
  const kpiData = [
    {
      title: "Missions Actives",
      value: "147",
      change: "+12%",
      icon: Package,
      trend: "up"
    },
    {
      title: "Transporteurs Actifs",
      value: "89",
      change: "+5%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Chiffre d'Affaires",
      value: "€45,230",
      change: "+18%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Temps Moyen Livraison",
      value: "2h 15m",
      change: "-8%",
      icon: Clock,
      trend: "down"
    }
  ];

  // Mock data pour les missions en cours
  const activeMissions = [
    {
      id: "M001",
      origin: "Paris",
      destination: "Lyon",
      transporter: "Jean Dupont",
      status: "en_cours",
      eta: "14:30",
      priority: "haute"
    },
    {
      id: "M002",
      origin: "Marseille",
      destination: "Nice",
      transporter: "Marie Martin",
      status: "livré",
      eta: "Livré",
      priority: "normale"
    },
    {
      id: "M003",
      origin: "Toulouse",
      destination: "Bordeaux",
      transporter: "Pierre Durand",
      status: "retard",
      eta: "En retard",
      priority: "critique"
    }
  ];

  // Mock data pour les transporteurs
  const transporters = [
    {
      id: "T001",
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      status: "actif",
      kyc: "validé",
      missions: 23,
      rating: 4.8
    },
    {
      id: "T002",
      name: "Marie Martin",
      email: "marie.martin@email.com",
      status: "actif",
      kyc: "en_attente",
      missions: 15,
      rating: 4.6
    },
    {
      id: "T003",
      name: "Pierre Durand",
      email: "pierre.durand@email.com",
      status: "inactif",
      kyc: "rejeté",
      missions: 8,
      rating: 3.2
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_cours":
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case "livré":
        return <Badge className="bg-green-100 text-green-800">Livré</Badge>;
      case "retard":
        return <Badge className="bg-red-100 text-red-800">En retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critique":
        return <Badge className="bg-red-500 text-white">Critique</Badge>;
      case "haute":
        return <Badge className="bg-orange-500 text-white">Haute</Badge>;
      case "normale":
        return <Badge variant="outline">Normale</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getKycBadge = (kyc: string) => {
    switch (kyc) {
      case "validé":
        return <Badge className="bg-green-100 text-green-800">Validé</Badge>;
      case "en_attente":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "rejeté":
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>;
      default:
        return <Badge variant="outline">{kyc}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Panel Administration</h1>
          <p className="text-muted-foreground">Gestion centralisée de la plateforme Flow Logistix Hub</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="transporters">Transporteurs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <div className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                          <TrendingUp className="h-4 w-4" />
                          {kpi.change}
                        </div>
                      </div>
                      <kpi.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Missions Récentes</CardTitle>
                  <CardDescription>Dernières activités sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeMissions.slice(0, 3).map((mission) => (
                    <div key={mission.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Package className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{mission.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {mission.origin} → {mission.destination}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(mission.status)}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertes & Notifications</CardTitle>
                  <CardDescription>Événements nécessitant votre attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-800">3 missions en retard</p>
                      <p className="text-sm text-red-600">Intervention requise</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <UserCheck className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">5 KYC en attente</p>
                      <p className="text-sm text-yellow-600">Validation nécessaire</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Système opérationnel</p>
                      <p className="text-sm text-green-600">Tous les services fonctionnent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Missions</CardTitle>
                <CardDescription>Vue d'ensemble des missions en cours et historique</CardDescription>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Rechercher une mission..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeMissions.map((mission) => (
                    <div key={mission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{mission.id}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {mission.origin} → {mission.destination}
                          </div>
                          <p className="text-sm text-muted-foreground">Transporteur: {mission.transporter}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getPriorityBadge(mission.priority)}
                        {getStatusBadge(mission.status)}
                        <span className="text-sm font-medium">{mission.eta}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transporters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Transporteurs</CardTitle>
                <CardDescription>Validation KYC et gestion des comptes transporteurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transporters.map((transporter) => (
                    <div key={transporter.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${transporter.name}`} />
                          <AvatarFallback>{transporter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{transporter.name}</p>
                          <p className="text-sm text-muted-foreground">{transporter.email}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm">Missions: {transporter.missions}</span>
                            <span className="text-sm">Note: ⭐ {transporter.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={transporter.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {transporter.status}
                        </Badge>
                        {getKycBadge(transporter.kyc)}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <UserX className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performances Mensuelles</CardTitle>
                  <CardDescription>Évolution des KPI sur les 30 derniers jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Graphique des performances</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition Géographique</CardTitle>
                  <CardDescription>Distribution des livraisons par région</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Carte de répartition</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
