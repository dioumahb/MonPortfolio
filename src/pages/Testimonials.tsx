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
  Star,
  Quote,
  Building,
  User,
  Mail,
  ArrowRight,
  Users,
  Award,
  Briefcase,
} from "lucide-react";
import { portfolioData } from "@src/shared/portfolio-data";

export default function Testimonials() {
  const { testimonials } = portfolioData;

  const stats = [
    { value: "50+", label: "Projets réalisés", icon: Briefcase },
    { value: "98%", label: "Clients satisfaits", icon: Users },
    { value: "5.0", label: "Note moyenne", icon: Star },
    { value: "100%", label: "Projets livrés", icon: Award },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Star className="w-3 h-3 mr-1" />
              Témoignages clients
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Ce que disent mes clients
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Découvrez les retours de clients satisfaits qui ont fait confiance
              à mon expertise pour leurs projets de développement.
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Témoignages clients
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Les retours authentiques de clients qui ont collaboré avec moi
                sur leurs projets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="h-full hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(testimonial.rating)}
                        </div>
                        <CardTitle className="text-lg">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription>
                          {testimonial.position} • {testimonial.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                      <p className="text-muted-foreground italic leading-relaxed pl-6">
                        "{testimonial.message}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Processus de collaboration */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Pourquoi mes clients me recommandent
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Communication transparente
                </h3>
                <p className="text-muted-foreground text-sm">
                  Points réguliers, feedback continu et transparence totale sur
                  l'avancement des projets.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Qualité et expertise
                </h3>
                <p className="text-muted-foreground text-sm">
                  Code propre, maintenable et utilisation des dernières
                  technologies et bonnes pratiques.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Respect des délais
                </h3>
                <p className="text-muted-foreground text-sm">
                  Livraison dans les temps convenus avec une planification
                  rigoureuse et réaliste.
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
            Rejoignez mes clients satisfaits
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Vous souhaitez bénéficier de la même qualité de service ? Discutons
            de votre projet.
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
                Démarrer un projet
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-primary hover:bg-white/10"
              asChild
            >
              <a href="/services">
                Voir mes services
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
