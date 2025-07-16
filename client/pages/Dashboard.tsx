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
  Bell,
  User,
} from "lucide-react";

export default function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Bienvenue dans votre espace personnel Bmd Technologies
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Sondages disponibles
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-2xl font-bold">12</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Sondages terminés
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold">156</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Points gagnés
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-warning" />
                  <span className="text-2xl font-bold">2</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">En attente</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>
                  Accédez rapidement à vos fonctionnalités principales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" asChild>
                  <Link to="/surveys">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Voir mes sondages
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sondages récents</CardTitle>
                <CardDescription>Vos dernières participations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Satisfaction générale</p>
                    <p className="text-sm text-muted-foreground">
                      Terminé le 15 Jan
                    </p>
                  </div>
                  <Badge className="bg-success/10 text-success">Terminé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Évaluation des services</p>
                    <p className="text-sm text-muted-foreground">Disponible</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">Nouveau</Badge>
                </div>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/surveys">Voir tous les sondages</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
