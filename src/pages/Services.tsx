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
  Code,
  Server,
  Users,
  Shield,
  Clock,
  Check,
  Mail,
  ArrowRight,
  Star,
  Zap,
  Target,
} from "lucide-react";
import { portfolioData } from "@src/shared/portfolio-data";

export default function Services() {
  const { services } = portfolioData;

  const serviceIcons = {
    Code: Code,
    Server: Server,
    Users: Users,
    Shield: Shield,
  };

  const processSteps = [
    {
      number: "01",
      title: "Analyse & Conseil",
      description:
        "Étude approfondie de vos besoins et recommandations techniques.",
      duration: "1-2 jours",
    },
    {
      number: "02",
      title: "Conception & Architecture",
      description:
        "Design de l'architecture technique et planification du développement.",
      duration: "2-5 jours",
    },
    {
      number: "03",
      title: "Développement",
      description:
        "Implémentation de la solution avec méthodologie agile et tests.",
      duration: "Variable",
    },
    {
      number: "04",
      title: "Déploiement & Formation",
      description:
        "Mise en production, documentation et formation de vos équipes.",
      duration: "1-3 jours",
    },
  ];

  const advantages = [
    {
      icon: Zap,
      title: "Réactivité",
      description: "Réponse sous 24h et démarrage rapide des projets",
    },
    {
      icon: Target,
      title: "Expertise ciblée",
      description: "Spécialisation .NET, Angular et technologies modernes",
    },
    {
      icon: Clock,
      title: "Respect des délais",
      description: "Livraison dans les temps avec transparence totale",
    },
    {
      icon: Shield,
      title: "Qualité garantie",
      description: "Code testé, documenté et maintenable",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Star className="w-3 h-3 mr-1" />
              Services Freelance
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Services de Développement
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert en développement full-stack, je vous accompagne dans la
              création de solutions sur mesure, robustes et évolutives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Demander un devis
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/projects">Voir mes réalisations</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Mes services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des solutions complètes adaptées à vos besoins, du conseil à la
              maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent =
                serviceIcons[service.icon as keyof typeof serviceIcons] || Code;

              return (
                <Card
                  key={service.id}
                  className="h-full hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-lg font-semibold text-primary">
                        {service.startingPrice}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/contact">
                          Discuter
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processus de travail */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Mon processus de travail
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une méthodologie éprouvée pour garantir le succès de vos
                projets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border z-0">
                      <div className="w-1/2 h-full bg-primary"></div>
                    </div>
                  )}
                  <Card className="relative z-10 h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        {step.number}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-4">
                        {step.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Pourquoi me choisir ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Les avantages de travailler avec un développeur expérimenté et
                passionné.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <Card key={index} className="text-center p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {advantage.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Technologies maîtrisées
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ".NET Core",
                "C#",
                "Angular",
                "TypeScript",
                "React",
                "Node.js",
                "PostgreSQL",
                "Azure",
                "Docker",
                "Git",
                "Laravel",
                "Spring Boot",
              ].map((tech, index) => (
                <Card key={index} className="p-4 text-center">
                  <p className="font-medium text-sm">{tech}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Questions fréquentes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Quel est votre délai de réponse ?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Je réponds généralement sous 24h pour toute demande de
                  renseignement ou devis. Pour les projets urgents, je peux
                  m'adapter selon vos contraintes.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Travaillez-vous à distance ?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Oui, je travaille principalement à distance avec des clients
                  partout en France. Je peux également me déplacer pour des
                  réunions importantes si nécessaire.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Comment se déroule le suivi de projet ?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Je privilégie une communication transparente avec des points
                  réguliers, l'accès à un outil de suivi et des démonstrations
                  fréquentes pour valider l'avancement.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Proposez-vous de la maintenance ?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Absolument ! Je propose des contrats de maintenance adaptés à
                  vos besoins, allant du support ponctuel à la maintenance
                  préventive complète.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Discutons de vos besoins et voyons comment je peux vous aider à
            atteindre vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <a href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Demander un devis gratuit
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-primary hover:bg-white/10"
              asChild
            >
              <a href="/testimonials">Lire les témoignages</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
