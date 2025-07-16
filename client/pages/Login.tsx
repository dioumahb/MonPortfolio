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
import { Input } from "@/components/ui/input";
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
  MessageSquare,
  Mail,
  Smartphone,
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";

type AuthStep = "email" | "method" | "otp" | "success";

export default function Login() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [otpMethod, setOtpMethod] = useState<"sms" | "email">("email");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call to verify email exists
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep("method");
  };

  const handleMethodSelect = async (method: "sms" | "email") => {
    setOtpMethod(method);
    setIsLoading(true);
    // Simulate API call to send OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentStep("otp");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    // Simulate API call to verify OTP
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep("success");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "email":
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Adresse email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
              <p className="text-sm text-muted-foreground">
                Entrez l'adresse email associée à votre compte bénéficiaire
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={!email || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Vérification...
                </>
              ) : (
                <>
                  Continuer
                  <Mail className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Mot de passe oublié ?{" "}
                <Link
                  to="/reset-password"
                  className="text-primary hover:underline"
                >
                  Réinitialiser
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </form>
        );

      case "method":
        return (
          <div className="space-y-6">
            <div className="text-center pb-4">
              <p className="text-sm text-muted-foreground">
                Comment souhaitez-vous recevoir votre code de vérification ?
              </p>
            </div>

            <div className="grid gap-4">
              <Button
                variant="outline"
                className="h-16 justify-start text-left p-4"
                onClick={() => handleMethodSelect("email")}
                disabled={isLoading}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Par email</p>
                    <p className="text-sm text-muted-foreground">
                      Code envoyé à {email}
                    </p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-16 justify-start text-left p-4"
                onClick={() => handleMethodSelect("sms")}
                disabled={isLoading}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Par SMS</p>
                    <p className="text-sm text-muted-foreground">
                      Code envoyé au numéro enregistré
                    </p>
                  </div>
                </div>
              </Button>
            </div>

            {isLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Envoi du code en cours...
                </p>
              </div>
            )}

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setCurrentStep("email")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
        );

      case "otp":
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="text-center pb-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-4">
                {otpMethod === "email" ? (
                  <Mail className="h-6 w-6 text-success" />
                ) : (
                  <Smartphone className="h-6 w-6 text-success" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Code envoyé par {otpMethod === "email" ? "email" : "SMS"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Code de vérification
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                className="h-12 text-center text-lg tracking-widest"
                required
              />
              <p className="text-sm text-muted-foreground">
                Saisissez le code à 6 chiffres reçu
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={otpCode.length !== 6 || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Vérification...
                </>
              ) : (
                <>
                  Se connecter
                  <Shield className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep("method")}
                className="text-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Changer de méthode
              </Button>
              <Button variant="ghost" className="text-sm">
                Renvoyer le code
                <Clock className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );

      case "success":
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Connexion réussie !
              </h3>
              <p className="text-muted-foreground">
                Vous allez être redirigé vers votre tableau de bord...
              </p>
            </div>

            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />

            <Button className="w-full h-12 text-base" asChild>
              <Link to="/dashboard">Accéder à mon tableau de bord</Link>
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "Connexion bénéficiaire";
      case "method":
        return "Méthode de vérification";
      case "otp":
        return "Code de vérification";
      case "success":
        return "Bienvenue !";
      default:
        return "Connexion";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Connectez-vous à votre espace sécurisé pour accéder à vos sondages";
      case "method":
        return "Choisissez comment recevoir votre code de sécurité";
      case "otp":
        return "Saisissez le code reçu pour finaliser votre connexion";
      case "success":
        return "Votre identité a été vérifiée avec succès";
      default:
        return "";
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-ansuten-50 via-white to-ansuten-100">
      <div className="min-h-[calc(100vh-theme(spacing.32))] flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">
              {getStepTitle()}
            </CardTitle>
            <CardDescription className="text-base">
              {getStepDescription()}
            </CardDescription>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {["email", "method", "otp", "success"].map((step, index) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    ["email", "method", "otp", "success"].indexOf(
                      currentStep,
                    ) >= index
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardHeader>

          <CardContent className="pb-8">{renderStepContent()}</CardContent>

          {currentStep === "email" && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Connexion sécurisée et conforme RGPD</span>
              </div>
            </div>
          )}
        </Card>

        {currentStep === "email" && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-3 w-3" />
                <span>Retour à l'accueil</span>
              </Link>
            </Badge>
          </div>
        )}
      </div>
    </Layout>
  );
}
