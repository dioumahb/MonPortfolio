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
  Code2,
  Server,
  Database,
  Cloud,
  ArrowRight,
  Star,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { portfolioData } from "@src/shared/portfolio-data";

export default function Index() {
  const { personal, skills, projects, experiences } = portfolioData;

  const featuredProjects = projects.filter((project) => project.featured);
  const recentExperience = experiences[0];

  const skillCategories = [
    {
      icon: Code2,
      title: "Langages",
      skills: skills.technical,
      color: "bg-bmd-500/10 text-bmd-600 border-bmd-200",
    },
    {
      icon: Server,
      title: "Frameworks",
      skills: skills.frameworks,
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
    },
    {
      icon: Database,
      title: "Bases de données",
      skills: skills.databases,
      color: "bg-green-500/10 text-green-600 border-green-200",
    },
    {
      icon: Cloud,
      title: "Outils & Cloud",
      skills: skills.tools,
      color: "bg-orange-500/10 text-orange-600 border-orange-200",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bmd-hero grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Contenu principal */}
              <div className="fade-in">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  <Star className="w-3 h-3 mr-1" />
                  Disponible pour missions freelance
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                  {personal.name}
                </h1>

                <div className="text-xl sm:text-2xl text-primary font-semibold mb-2 bmd-text-gradient">
                  {personal.company}
                </div>

                <div className="text-lg text-secondary mb-4">
                  {personal.title}
                </div>

                <div className="text-base text-muted-foreground mb-6">
                  {personal.subtitle}
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {personal.description}
                </p>

                {/* Contact info */}
                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {personal.location}
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-4 bmd-btn-lg"
                    asChild
                  >
                    <Link to="/contact">
                      <Mail className="mr-2 h-5 w-5" />
                      Me contacter
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-lg px-8 py-4"
                    asChild
                  >
                    <a href={personal.resume} download>
                      <Download className="mr-2 h-5 w-5" />
                      Télécharger CV
                    </a>
                  </Button>
                </div>

                {/* Liens sociaux */}
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Photo de profil */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative hover-lift">
                  <div className="w-80 h-80 rounded-full bmd-gradient p-1">
                    <img
                      src={personal.avatar}
                      alt={personal.name}
                      className="w-full h-full rounded-full object-cover bg-background"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-background p-3 rounded-full shadow-lg border">
                    <Code2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences techniques */}
      <section className="bmd-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Compétences techniques
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Technologies et outils que je maîtrise pour créer des solutions
              robustes et performantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="h-full hover-lift border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 4).map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {category.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.skills.length - 4} autres
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projets mis en avant */}
      <section className="bmd-section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Projets récents
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez quelques-unes de mes réalisations les plus marquantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
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
                      <Button size="sm" asChild>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Démo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">
                Voir tous les projets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Expérience actuelle */}
      <section className="bmd-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Expérience actuelle
              </h2>
            </div>

            <Card className="p-8 shadow-xl border-0">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Code2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {recentExperience.position}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {recentExperience.company}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                      {recentExperience.startDate} -{" "}
                      {recentExperience.endDate || "Présent"}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {recentExperience.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recentExperience.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {recentExperience.achievements
                      .slice(0, 3)
                      .map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </Card>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/about">
                  Voir mon parcours complet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bmd-gradient text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Travaillons ensemble
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Vous avez un projet en tête ? Discutons de la façon dont BMD
            Technologies peut vous aider à le concrétiser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Démarrer un projet
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-4 border-white/20 text-primary hover:bg-white/10"
              asChild
            >
              <Link to="/services">Voir nos services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
