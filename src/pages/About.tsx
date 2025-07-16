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
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Download,
  Mail,
  ArrowRight,
} from "lucide-react";
import { portfolioData } from "@src/shared/portfolio-data";

export default function About() {
  const { personal, skills, experiences, education } = portfolioData;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              À propos de moi
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Découvrez mon parcours, mes compétences et ma passion pour le
              développement logiciel.
            </p>
          </div>
        </div>
      </section>

      {/* Présentation personnelle */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Photo et info principale */}
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-1 mb-6">
                      <img
                        src={personal.avatar}
                        alt={personal.name}
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {personal.name}
                    </h2>
                    <p className="text-lg text-primary font-semibold mb-4">
                      {personal.title}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                      <MapPin className="w-4 h-4" />
                      <span>{personal.location}</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" asChild>
                        <a href={personal.resume} download>
                          <Download className="w-4 h-4 mr-2" />
                          CV
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${personal.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Description détaillée */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Mon histoire
                  </h3>
                  <div className="text-muted-foreground space-y-4 leading-relaxed">
                    <p>
                      Passionné par la technologie depuis mon plus jeune âge,
                      j'ai découvert le monde de la programmation durant mes
                      études en informatique. Ce qui a commencé comme une
                      curiosité s'est rapidement transformé en véritable
                      vocation.
                    </p>
                    <p>
                      Aujourd'hui, avec plus de 5 ans d'expérience dans le
                      développement full-stack, je me spécialise dans
                      l'écosystème Microsoft (.NET, C#, Blazor) et les
                      technologies JavaScript modernes (Angular, React). Cette
                      double expertise me permet de créer des solutions
                      complètes, de la conception de l'API backend jusqu'à
                      l'interface utilisateur.
                    </p>
                    <p>
                      Ce qui me motive le plus dans mon travail, c'est la
                      capacité de transformer des idées complexes en
                      applications simples et intuitives. J'aime
                      particulièrement les défis techniques qui demandent de la
                      créativité et l'apprentissage de nouvelles technologies.
                    </p>
                    <p>
                      En tant que freelance, j'accompagne mes clients dans la
                      réalisation de leurs projets en apportant non seulement
                      mes compétences techniques, mais aussi ma vision
                      stratégique pour créer des solutions durables et
                      évolutives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences détaillées */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Compétences techniques
              </h2>
              <p className="text-lg text-muted-foreground">
                Technologies et outils que je maîtrise au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Langages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {skills.technical.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="mr-2 mb-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Frameworks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {skills.frameworks.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="mr-2 mb-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bases de données</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {skills.databases.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="mr-2 mb-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Outils & Cloud</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {skills.tools.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="mr-2 mb-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expériences professionnelles - Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Expériences professionnelles
              </h2>
              <p className="text-lg text-muted-foreground">
                Mon parcours professionnel au fil des années
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-px"></div>

              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-2 md:-translate-x-2 z-10"></div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-xl">
                              {experience.position}
                            </CardTitle>
                            <CardDescription className="text-lg font-medium text-primary">
                              {experience.company}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {experience.startDate} -{" "}
                            {experience.endDate || "Présent"}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {experience.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {experience.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {experience.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">
                            Réalisations clés :
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {experience.achievements.map(
                              (achievement, achIndex) => (
                                <li
                                  key={achIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formation */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Formation
              </h2>
              <p className="text-lg text-muted-foreground">
                Mon parcours académique et mes certifications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu) => (
                <Card key={edu.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{edu.degree}</CardTitle>
                        <CardDescription className="text-base">
                          {edu.field}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {edu.startDate} - {edu.endDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-sm text-muted-foreground mt-4">
                        {edu.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Langues */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Langues
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.languages.map((language, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium">{language}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Intéressé par mon profil ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            N'hésitez pas à me contacter pour discuter de vos projets ou
            opportunités de collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <a href={`mailto:${personal.email}`}>
                <Mail className="mr-2 h-5 w-5" />
                Me contacter
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
               className="w-full sm:w-auto border-white/20 text-primary hover:bg-white/10"
              asChild
            >
              <a href={personal.resume} download>
                <Download className="mr-2 h-5 w-5" />
                Télécharger mon CV
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
