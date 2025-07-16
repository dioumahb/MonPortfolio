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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Download,
  Plus,
  Eye,
  Settings,
  Filter,
  Calendar,
  Target,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Mock data for charts
  const satisfactionData = [
    { name: "Très satisfait", value: 45, color: "#22c55e" },
    { name: "Satisfait", value: 35, color: "#3b82f6" },
    { name: "Neutre", value: 12, color: "#f59e0b" },
    { name: "Insatisfait", value: 6, color: "#f97316" },
    { name: "Très insatisfait", value: 2, color: "#ef4444" },
  ];

  const responseData = [
    { month: "Jan", responses: 120 },
    { month: "Fév", responses: 180 },
    { month: "Mar", responses: 240 },
    { month: "Avr", responses: 200 },
    { month: "Mai", responses: 300 },
    { month: "Jun", responses: 280 },
  ];

  const demographicsData = [
    { category: "18-25 ans", count: 145 },
    { category: "26-35 ans", count: 289 },
    { category: "36-45 ans", count: 203 },
    { category: "46-60 ans", count: 178 },
    { category: "60+ ans", count: 95 },
  ];

  const recentSurveys = [
    {
      id: 1,
      title: "Satisfaction des services",
      responses: 345,
      status: "active",
      created: "2024-01-15",
    },
    {
      id: 2,
      title: "Évaluation accompagnement",
      responses: 78,
      status: "draft",
      created: "2024-01-12",
    },
    {
      id: 3,
      title: "Amélioration procédures",
      responses: 234,
      status: "completed",
      created: "2024-01-10",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success">Actif</Badge>;
      case "draft":
        return <Badge className="bg-warning/10 text-warning">Brouillon</Badge>;
      case "completed":
        return (
          <Badge className="bg-muted text-muted-foreground">Terminé</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard Administrateur
              </h1>
              <p className="text-muted-foreground">
                Vue d'ensemble des retours et statistiques ANSUTEN
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 derniers jours</SelectItem>
                  <SelectItem value="30">30 derniers jours</SelectItem>
                  <SelectItem value="90">3 derniers mois</SelectItem>
                  <SelectItem value="365">Cette année</SelectItem>
                </SelectContent>
              </Select>
              <Button asChild>
                <Link to="/admin/surveys/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau sondage
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total réponses
                    </p>
                    <p className="text-3xl font-bold text-foreground">2,847</p>
                    <p className="text-sm text-success flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% ce mois
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Bénéficiaires actifs
                    </p>
                    <p className="text-3xl font-bold text-foreground">1,234</p>
                    <p className="text-sm text-success flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8% ce mois
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Taux satisfaction
                    </p>
                    <p className="text-3xl font-bold text-foreground">87%</p>
                    <p className="text-sm text-success flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3% ce mois
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Sondages actifs
                    </p>
                    <p className="text-3xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      3 nouveaux cette semaine
                    </p>
                  </div>
                  <Settings className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Satisfaction Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition de la satisfaction</CardTitle>
                <CardDescription>
                  Distribution des niveaux de satisfaction globaux
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: isDark
                          ? "1px solid #374151"
                          : "1px solid #e5e7eb",
                        borderRadius: "8px",
                        color: isDark ? "#f3f4f6" : "#111827",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {satisfactionData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Responses Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Évolution des réponses</CardTitle>
                <CardDescription>
                  Nombre de réponses reçues par mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: isDark ? "#d1d5db" : "#374151" }}
                    />
                    <YAxis tick={{ fill: isDark ? "#d1d5db" : "#374151" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: isDark
                          ? "1px solid #374151"
                          : "1px solid #e5e7eb",
                        borderRadius: "8px",
                        color: isDark ? "#f3f4f6" : "#111827",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="responses"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Demographics and Recent Surveys */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition démographique</CardTitle>
                <CardDescription>
                  Distribution par tranches d'âge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demographicsData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="category"
                      tick={{ fill: isDark ? "#d1d5db" : "#374151" }}
                    />
                    <YAxis tick={{ fill: isDark ? "#d1d5db" : "#374151" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: isDark
                          ? "1px solid #374151"
                          : "1px solid #e5e7eb",
                        borderRadius: "8px",
                        color: isDark ? "#f3f4f6" : "#111827",
                      }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Surveys */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Sondages récents</CardTitle>
                    <CardDescription>
                      Dernières campagnes créées
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/surveys">
                      Voir tout
                      <Eye className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSurveys.map((survey) => (
                    <div
                      key={survey.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{survey.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {survey.responses} réponses • Créé le {survey.created}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(survey.status)}
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/surveys/${survey.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>
                Accès direct aux fonctionnalités principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16" asChild>
                  <Link to="/admin/surveys/new">
                    <div className="text-center">
                      <Plus className="h-6 w-6 mx-auto mb-2" />
                      <span>Créer un sondage</span>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-16" asChild>
                  <Link to="/admin/campaigns">
                    <div className="text-center">
                      <Settings className="h-6 w-6 mx-auto mb-2" />
                      <span>Gérer les campagnes</span>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-16" asChild>
                  <Link to="/admin/export">
                    <div className="text-center">
                      <Download className="h-6 w-6 mx-auto mb-2" />
                      <span>Exporter les données</span>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
