import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/Layout";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Users,
  Calendar,
  BarChart3,
  Target,
} from "lucide-react";

interface Campaign {
  id: number;
  title: string;
  description: string;
  status: "draft" | "active" | "completed" | "paused";
  responses: number;
  target: number;
  startDate: string;
  endDate: string;
  category: string;
}

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock campaigns data
  const campaigns: Campaign[] = [
    {
      id: 1,
      title: "Satisfaction générale des services",
      description: "Évaluation globale de la qualité de nos prestations",
      status: "active",
      responses: 245,
      target: 500,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      category: "Satisfaction",
    },
    {
      id: 2,
      title: "Amélioration de l'accompagnement social",
      description: "Retours sur le suivi personnalisé des bénéficiaires",
      status: "completed",
      responses: 378,
      target: 300,
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      category: "Accompagnement",
    },
    {
      id: 3,
      title: "Évaluation des nouveaux processus",
      description: "Feedback sur les procédures récemment mises en place",
      status: "draft",
      responses: 0,
      target: 200,
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      category: "Processus",
    },
    {
      id: 4,
      title: "Satisfaction infrastructure numérique",
      description: "Qualité des outils et plateformes digitales",
      status: "paused",
      responses: 89,
      target: 400,
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      category: "Numérique",
    },
  ];

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success">Actif</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700">Terminé</Badge>;
      case "draft":
        return (
          <Badge className="bg-muted text-muted-foreground">Brouillon</Badge>
        );
      case "paused":
        return <Badge className="bg-warning/10 text-warning">En pause</Badge>;
      default:
        return null;
    }
  };

  const getProgressPercentage = (responses: number, target: number) => {
    return Math.min((responses / target) * 100, 100);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Gestion des campagnes
                </h1>
                <p className="text-muted-foreground">
                  Créez, gérez et analysez vos campagnes de sondages
                </p>
              </div>
            </div>
            <Button asChild>
              <Link to="/admin/surveys/new">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle campagne
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une campagne..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="paused">En pause</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">
                          {campaign.title}
                        </CardTitle>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <CardDescription>{campaign.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Progression
                        </span>
                        <span className="font-medium">
                          {campaign.responses} / {campaign.target} réponses
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all duration-300"
                          style={{
                            width: `${getProgressPercentage(
                              campaign.responses,
                              campaign.target,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.responses} réponses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>Objectif: {campaign.target}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Début: {campaign.startDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Fin: {campaign.endDate}</span>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <Badge variant="outline">{campaign.category}</Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/campaigns/${campaign.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/campaigns/${campaign.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Link>
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analyses
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Aucune campagne trouvée
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Essayez de modifier vos filtres de recherche"
                    : "Créez votre première campagne pour commencer"}
                </p>
                <Button asChild>
                  <Link to="/admin/surveys/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une campagne
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
