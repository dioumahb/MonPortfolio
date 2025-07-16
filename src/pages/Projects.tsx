import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import {
  Github,
  ExternalLink,
  Filter,
  Globe,
  Server,
  Smartphone,
  Monitor,
} from "lucide-react";
import { portfolioData, Project } from "@src/shared/portfolio-data";

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tous les projets", icon: Filter },
    { id: "web", label: "Applications Web", icon: Globe },
    { id: "api", label: "APIs & Backend", icon: Server },
    { id: "mobile", label: "Applications Mobile", icon: Smartphone },
    { id: "desktop", label: "Applications Desktop", icon: Monitor },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.id === category);
    return categoryData ? categoryData.icon : Globe;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      web: "bg-blue-500/10 text-blue-600 border-blue-200",
      api: "bg-green-500/10 text-green-600 border-green-200",
      mobile: "bg-purple-500/10 text-purple-600 border-purple-200",
      desktop: "bg-orange-500/10 text-orange-600 border-orange-200",
    };
    return colors[category as keyof typeof colors] || colors.web;
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const CategoryIcon = getCategoryIcon(project.category);

    return (
      <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4">
            <div
              className={`w-8 h-8 rounded-lg ${getCategoryColor(
                project.category,
              )} flex items-center justify-center`}
            >
              <CategoryIcon className="w-4 h-4" />
            </div>
          </div>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500 text-yellow-900 border-yellow-400">
                ⭐ Featured
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            {project.githubUrl && (
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button size="sm" className="flex-1" asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Démo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Mes Projets
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Découvrez une sélection de mes réalisations, des applications web
              modernes aux APIs robustes, en passant par des solutions mobiles
              innovantes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{projects.length} projets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>{featuredProjects.length} projets mis en avant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation des catégories */}
      <section className="py-12 bg-background sticky top-16 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full max-w-4xl"
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium hidden sm:inline">
                        {category.label}
                      </span>
                      <span className="text-xs font-medium sm:hidden">
                        {category.label.split(" ")[0]}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Projets mis en avant */}
      {selectedCategory === "all" && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Projets mis en avant
              </h2>
              <p className="text-lg text-muted-foreground">
                Mes réalisations les plus significatives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grille de projets */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {selectedCategory === "all"
                ? "Tous les projets"
                : categories.find((cat) => cat.id === selectedCategory)?.label}
            </h2>
            <p className="text-lg text-muted-foreground">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} trouvé
              {filteredProjects.length > 1 ? "s" : ""}
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-muted-foreground mb-6">
                Aucun projet ne correspond à cette catégorie pour le moment.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("all")}
              >
                Voir tous les projets
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Statistiques des technologies */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Technologies utilisées
              </h2>
              <p className="text-lg text-muted-foreground">
                Aperçu des technologies employées dans mes projets
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(() => {
                const techCount: Record<string, number> = {};
                projects.forEach((project) => {
                  project.technologies.forEach((tech) => {
                    techCount[tech] = (techCount[tech] || 0) + 1;
                  });
                });

                return Object.entries(techCount)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([tech, count]) => (
                    <Card key={tech} className="text-center p-4">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {count}
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {tech}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          projet{count > 1 ? "s" : ""}
                        </div>
                      </CardContent>
                    </Card>
                  ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Vous avez un projet similaire ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ces projets vous inspirent ? Discutons de la façon dont je peux vous
            aider à concrétiser vos idées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <a href="/contact">Démarrer un projet</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-primary hover:bg-white/10"
              asChild
            >
              <a href="/services">Voir mes services</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
