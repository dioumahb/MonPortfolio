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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import {
  ArrowLeft,
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  Calendar,
  Filter,
  CheckCircle,
  Clock,
} from "lucide-react";

interface ExportConfig {
  format: "csv" | "excel" | "pdf";
  dateRange: "7d" | "30d" | "90d" | "1y" | "all";
  campaigns: string[];
  includeCharts: boolean;
  includeResponses: boolean;
  includeAnalytics: boolean;
  includeDemographics: boolean;
}

export default function Export() {
  const [config, setConfig] = useState<ExportConfig>({
    format: "excel",
    dateRange: "30d",
    campaigns: [],
    includeCharts: true,
    includeResponses: true,
    includeAnalytics: true,
    includeDemographics: true,
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // Mock campaigns data
  const campaigns = [
    { id: "1", name: "Satisfaction générale des services", responses: 245 },
    {
      id: "2",
      name: "Amélioration de l'accompagnement social",
      responses: 378,
    },
    { id: "3", name: "Évaluation des nouveaux processus", responses: 156 },
    { id: "4", name: "Satisfaction infrastructure numérique", responses: 89 },
  ];

  const formatOptions = [
    {
      value: "csv",
      label: "CSV",
      description: "Données brutes pour analyse",
      icon: FileText,
      color: "text-green-600",
    },
    {
      value: "excel",
      label: "Excel",
      description: "Fichier avec graphiques et formatage",
      icon: FileSpreadsheet,
      color: "text-blue-600",
    },
    {
      value: "pdf",
      label: "PDF",
      description: "Rapport complet pour présentation",
      icon: FileImage,
      color: "text-red-600",
    },
  ];

  const dateRangeOptions = [
    { value: "7d", label: "7 derniers jours" },
    { value: "30d", label: "30 derniers jours" },
    { value: "90d", label: "3 derniers mois" },
    { value: "1y", label: "Cette année" },
    { value: "all", label: "Toutes les données" },
  ];

  const handleCampaignToggle = (campaignId: string) => {
    setConfig((prev) => ({
      ...prev,
      campaigns: prev.campaigns.includes(campaignId)
        ? prev.campaigns.filter((id) => id !== campaignId)
        : [...prev.campaigns, campaignId],
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportComplete(false);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsExporting(false);
    setExportComplete(true);

    // Reset after showing success
    setTimeout(() => setExportComplete(false), 5000);
  };

  const getEstimatedSize = () => {
    const baseSizeKB = 50;
    const responsesMultiplier =
      config.campaigns.length > 0
        ? campaigns
            .filter((c) => config.campaigns.includes(c.id))
            .reduce((sum, c) => sum + c.responses, 0) * 0.1
        : 1000;

    const formatMultiplier =
      config.format === "pdf" ? 5 : config.format === "excel" ? 2 : 1;

    const totalSizeKB = Math.round(
      baseSizeKB * responsesMultiplier * formatMultiplier,
    );

    if (totalSizeKB > 1024) {
      return `${(totalSizeKB / 1024).toFixed(1)} MB`;
    }
    return `${totalSizeKB} KB`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Exportation des données
                </h1>
                <p className="text-muted-foreground">
                  Téléchargez vos données dans le format de votre choix
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Format Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Format d'exportation</CardTitle>
                  <CardDescription>
                    Choisissez le format qui correspond à vos besoins
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formatOptions.map((format) => {
                    const Icon = format.icon;
                    return (
                      <div
                        key={format.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          config.format === format.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() =>
                          setConfig({ ...config, format: format.value as any })
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-6 w-6 ${format.color}`} />
                          <div>
                            <p className="font-medium">{format.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {format.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Date Range */}
              <Card>
                <CardHeader>
                  <CardTitle>Période</CardTitle>
                  <CardDescription>
                    Sélectionnez la période des données à exporter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={config.dateRange}
                    onValueChange={(value) =>
                      setConfig({
                        ...config,
                        dateRange: value as ExportConfig["dateRange"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dateRangeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Campaign Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Campagnes à inclure</CardTitle>
                  <CardDescription>
                    Laissez vide pour exporter toutes les campagnes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        checked={config.campaigns.includes(campaign.id)}
                        onCheckedChange={() =>
                          handleCampaignToggle(campaign.id)
                        }
                      />
                      <div className="flex-1">
                        <Label className="font-medium">{campaign.name}</Label>
                        <p className="text-sm text-muted-foreground">
                          {campaign.responses} réponses
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Content Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Contenu à inclure</CardTitle>
                  <CardDescription>
                    Personnalisez le contenu de votre export
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={config.includeResponses}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeResponses: !!checked })
                      }
                    />
                    <div>
                      <Label className="font-medium">Réponses détaillées</Label>
                      <p className="text-sm text-muted-foreground">
                        Toutes les réponses individuelles
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={config.includeAnalytics}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, includeAnalytics: !!checked })
                      }
                    />
                    <div>
                      <Label className="font-medium">
                        Statistiques agrégées
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Moyennes, pourcentages, tendances
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={config.includeDemographics}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          includeDemographics: !!checked,
                        })
                      }
                    />
                    <div>
                      <Label className="font-medium">
                        Données démographiques
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Âge, sexe, localisation des répondants
                      </p>
                    </div>
                  </div>

                  {(config.format === "excel" || config.format === "pdf") && (
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={config.includeCharts}
                        onCheckedChange={(checked) =>
                          setConfig({ ...config, includeCharts: !!checked })
                        }
                      />
                      <div>
                        <Label className="font-medium">
                          Graphiques et visualisations
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Graphiques en secteurs, barres, lignes
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary and Export */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Résumé de l'export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <Badge variant="outline">
                        {
                          formatOptions.find((f) => f.value === config.format)
                            ?.label
                        }
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Période:</span>
                      <span>
                        {
                          dateRangeOptions.find(
                            (d) => d.value === config.dateRange,
                          )?.label
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campagnes:</span>
                      <span>
                        {config.campaigns.length === 0
                          ? "Toutes"
                          : config.campaigns.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Taille estimée:
                      </span>
                      <span>{getEstimatedSize()}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    {exportComplete ? (
                      <div className="text-center space-y-3">
                        <CheckCircle className="h-12 w-12 text-success mx-auto" />
                        <div>
                          <p className="font-medium text-success">
                            Export terminé !
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Le téléchargement va commencer
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger à nouveau
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="w-full"
                      >
                        {isExporting ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Export en cours...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Exporter les données
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {isExporting && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Progression de l'export
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary rounded-full h-2 transition-all duration-1000 animate-pulse w-3/4" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
