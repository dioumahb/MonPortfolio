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
import Layout from "@/components/Layout";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Surveys() {
  // Mock data for demonstration
  const surveys = [
    {
      id: 1,
      title: "Satisfaction générale des services",
      description: "Aidez-nous à améliorer la qualité de nos prestations",
      status: "available",
      deadline: "2024-01-15",
      duration: "5 min",
      reward: "10 points",
    },
    {
      id: 2,
      title: "Évaluation de l'accompagnement social",
      description: "Votre retour sur le suivi personnalisé",
      status: "completed",
      deadline: "2024-01-10",
      duration: "8 min",
      reward: "15 points",
    },
    {
      id: 3,
      title: "Amélioration des procédures",
      description: "Vos suggestions pour simplifier les démarches",
      status: "pending",
      deadline: "2024-01-20",
      duration: "3 min",
      reward: "8 points",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            Disponible
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-muted text-muted-foreground">Terminé</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            En attente
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <MessageSquare className="h-5 w-5 text-success" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-muted-foreground" />;
      case "pending":
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Mes sondages
            </h1>
            <p className="text-xl text-muted-foreground">
              Participez aux sondages disponibles et suivez vos contributions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <p className="text-sm text-muted-foreground">
                  Sondages complétés
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">156</div>
                <p className="text-sm text-muted-foreground">Points gagnés</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success mb-2">
                  1<Star className="inline h-6 w-6 ml-1" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Niveau contributeur
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Surveys List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Sondages disponibles
            </h2>

            {surveys.map((survey) => (
              <Card
                key={survey.id}
                className="hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(survey.status)}
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {survey.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {survey.description}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(survey.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{survey.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{survey.reward}</span>
                      </div>
                      <div>Échéance: {survey.deadline}</div>
                    </div>

                    {survey.status === "available" && (
                      <Button asChild>
                        <Link to={`/survey/${survey.id}`}>
                          Commencer
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}

                    {survey.status === "completed" && (
                      <Button variant="outline" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Terminé
                      </Button>
                    )}

                    {survey.status === "pending" && (
                      <Button variant="secondary" disabled>
                        <Clock className="mr-2 h-4 w-4" />
                        En attente
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State or Load More */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Vous avez consulté tous les sondages disponibles
            </p>
            <Button variant="outline" asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
