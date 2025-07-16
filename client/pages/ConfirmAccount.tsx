import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  AlertCircle,
  UserCheck,
} from "lucide-react";

type ConfirmStep = "method" | "otp" | "success" | "expired";

export default function ConfirmAccount() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [currentStep, setCurrentStep] = useState<ConfirmStep>("method");
  const [otpMethod, setOtpMethod] = useState<"sms" | "email">("email");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (currentStep === "otp" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentStep === "otp") {
      setCurrentStep("expired");
    }
  }, [timeLeft, currentStep]);

  // Resend cooldown
  useEffect(() => {
    if (currentStep === "otp") {
      setCanResend(false);
      const timer = setTimeout(() => setCanResend(true), 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [currentStep, otpMethod]);

  const handleMethodSelect = async (method: "sms" | "email") => {
    setOtpMethod(method);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentStep("otp");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep("success");
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setTimeLeft(300);
    setCanResend(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "method":
        return (
          <div className="space-y-6">
            <div className="text-center pb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Votre compte a été créé ! Choisissez comment recevoir votre code
                de confirmation.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">Informations du compte :</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Email :</strong> {email}
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
                  Envoi du code de confirmation...
                </p>
              </div>
            )}
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
                Code de confirmation envoyé par{" "}
                {otpMethod === "email" ? "email" : "SMS"}
              </p>
              <div className="mt-2 flex items-center justify-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-warning">
                  Expire dans {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Code de confirmation
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
                Saisissez le code à 6 chiffres reçu pour confirmer votre compte
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
                  Confirmation...
                </>
              ) : (
                <>
                  Confirmer mon compte
                  <UserCheck className="ml-2 h-4 w-4" />
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
              <Button
                variant="ghost"
                className="text-sm"
                onClick={handleResendCode}
                disabled={!canResend || isLoading}
              >
                {canResend ? "Renvoyer le code" : "Renvoyer (30s)"}
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
                Compte confirmé avec succès !
              </h3>
              <p className="text-muted-foreground">
                Félicitations ! Votre compte Bmd Technologies a été confirmé. Vous pouvez
                maintenant accéder à tous vos sondages et services.
              </p>
            </div>

            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <h4 className="font-medium text-success mb-2">
                🎉 Bienvenue chez Bmd Technologies !
              </h4>
              <p className="text-sm text-muted-foreground">
                Votre participation nous aide à améliorer continuellement nos
                services. Merci de faire partie de notre communauté !
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full h-12 text-base" asChild>
                <Link to="/login">Se connecter maintenant</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/surveys">Voir mes sondages</Link>
              </Button>
            </div>
          </div>
        );

      case "expired":
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Code expiré</h3>
              <p className="text-muted-foreground">
                Le code de confirmation a expiré. Veuillez en demander un
                nouveau pour continuer.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full h-12 text-base"
                onClick={() => {
                  setCurrentStep("method");
                  setOtpCode("");
                  setTimeLeft(300);
                }}
              >
                Demander un nouveau code
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">Contacter le support</Link>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "method":
        return "Confirmation de compte";
      case "otp":
        return "Code de confirmation";
      case "success":
        return "Compte confirmé !";
      case "expired":
        return "Code expiré";
      default:
        return "Confirmation";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "method":
        return "Choisissez comment recevoir votre code de confirmation";
      case "otp":
        return "Saisissez le code pour activer votre compte";
      case "success":
        return "Votre compte Bmd Technologies est maintenant actif";
      case "expired":
        return "Le délai de confirmation est dépassé";
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

            <Badge className="mx-auto mt-4 bg-primary/10 text-primary border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Compte sécurisé Bmd Technologies
            </Badge>
          </CardHeader>

          <CardContent className="pb-8">{renderStepContent()}</CardContent>

          {(currentStep === "method" || currentStep === "otp") && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Processus sécurisé et conforme RGPD</span>
              </div>
            </div>
          )}
        </Card>

        {currentStep === "method" && (
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
