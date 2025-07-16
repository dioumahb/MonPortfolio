import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { portfolioData } from "@src/shared/portfolio-data";

export default function Contact() {
  const { personal } = portfolioData;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'envoi (à remplacer par votre logique d'envoi)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Message envoyé !",
        description:
          "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
      });

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        projectType: "",
        budget: "",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: personal.email,
      link: `mailto:${personal.email}`,
      description: "Réponse sous 24h",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: personal.phone,
      link: `tel:${personal.phone}`,
      description: "Disponible 9h-18h",
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: personal.location,
      link: "",
      description: "Disponible à distance",
    },
  ];

  const faqs = [
    {
      question: "Quel est votre délai de réponse ?",
      answer:
        "Je réponds généralement sous 24h pour toute demande de renseignement.",
    },
    {
      question: "Travaillez-vous à distance ?",
      answer:
        "Oui, je travaille principalement à distance avec des clients partout en France.",
    },
    {
      question: "Proposez-vous des devis gratuits ?",
      answer:
        "Oui, je propose une première consultation gratuite pour étudier votre projet.",
    },
    {
      question: "Quels sont vos tarifs ?",
      answer:
        "Mes tarifs varient selon la complexité du projet. Contactez-moi pour un devis personnalisé.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Mail className="w-3 h-3 mr-1" />
              Contact
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Discutons de votre projet
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Vous avez un projet en tête ? N'hésitez pas à me contacter pour en
              discuter. Je serais ravi de vous accompagner dans sa réalisation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact principal */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulaire de contact */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Envoyez-moi un message
                    </CardTitle>
                    <CardDescription>
                      Remplissez le formulaire ci-dessous et je vous répondrai
                      rapidement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Votre nom"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Entreprise</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Nom de votre entreprise"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectType">Type de projet</Label>
                          <Input
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            placeholder="Ex: Site web, API, Application"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="L'objet de votre message"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">
                          Budget estimé (optionnel)
                        </Label>
                        <Input
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="Ex: 5000-10000€"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Décrivez votre projet en détail..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Informations de contact */}
              <div className="space-y-8">
                {/* Méthodes de contact */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Autres moyens de me contacter
                  </h3>
                  <div className="space-y-4">
                    {contactMethods.map((method, index) => {
                      const Icon = method.icon;
                      return (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground mb-1">
                                  {method.title}
                                </h4>
                                {method.link ? (
                                  <a
                                    href={method.link}
                                    className="text-primary hover:underline"
                                  >
                                    {method.value}
                                  </a>
                                ) : (
                                  <p className="text-foreground">
                                    {method.value}
                                  </p>
                                )}
                                <p className="text-sm text-muted-foreground mt-1">
                                  {method.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Liens sociaux */}
                <Card>
                  <CardHeader>
                    <CardTitle>Suivez-moi</CardTitle>
                    <CardDescription>
                      Retrouvez-moi sur les réseaux sociaux
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={personal.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={personal.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* CV */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mon CV</CardTitle>
                    <CardDescription>
                      Téléchargez mon CV pour plus de détails
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={personal.resume} download>
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger mon CV
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Les réponses aux questions les plus courantes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disponibilité */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">
                Disponible pour nouveaux projets
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Je suis actuellement disponible pour de nouveaux projets et
              collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={`mailto:${personal.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Contactez-moi directement
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/services">Voir mes services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
