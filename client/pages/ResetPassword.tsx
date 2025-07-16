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
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

type ResetStep = "email" | "method" | "otp" | "newPassword" | "success";

export default function ResetPassword() {
  const [currentStep, setCurrentStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [otpMethod, setOtpMethod] = useState<"sms" | "email">("email");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep("method");
  };

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep("newPassword");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword || newPassword !== confirmPassword)
      return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
                Code de vérification envoyé par{" "}
                {otpMethod === "email" ? "email" : "SMS"}
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
                  Vérifier le code
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

      case "newPassword":
        return (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="text-center pb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Créez un nouveau mot de passe sécurisé
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  Nouveau mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirmer le mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <p className="text-sm text-destructive">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <h4 className="font-medium mb-2">Exigences du mot de passe :</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Au moins 8 caractères</li>
                <li>• Au moins une lettre majuscule</li>
                <li>• Au moins une lettre minuscule</li>
                <li>• Au moins un chiffre</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword ||
                isLoading
              }
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Mise à jour...
                </>
              ) : (
                <>
                  Réinitialiser le mot de passe
                  <Lock className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
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
                Mot de passe réinitialisé !
              </h3>
              <p className="text-muted-foreground">
                Votre mot de passe a été mis à jour avec succès. Vous pouvez
                maintenant vous connecter avec vos nouveaux identifiants.
              </p>
            </div>

            <Button className="w-full h-12 text-base" asChild>
              <Link to="/login">Se connecter maintenant</Link>
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
        return "Réinitialisation du mot de passe";
      case "method":
        return "Méthode de vérification";
      case "otp":
        return "Code de vérification";
      case "newPassword":
        return "Nouveau mot de passe";
      case "success":
        return "Mot de passe mis à jour";
      default:
        return "Réinitialisation";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Saisissez votre email pour recevoir un code de vérification";
      case "method":
        return "Choisissez comment recevoir votre code de sécurité";
      case "otp":
        return "Saisissez le code reçu pour vérifier votre identité";
      case "newPassword":
        return "Choisissez un nouveau mot de passe sécurisé";
      case "success":
        return "Votre mot de passe a été réinitialisé avec succès";
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
              {["email", "method", "otp", "newPassword", "success"].map(
                (step, index) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      [
                        "email",
                        "method",
                        "otp",
                        "newPassword",
                        "success",
                      ].indexOf(currentStep) >= index
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                ),
              )}
            </div>
          </CardHeader>

          <CardContent className="pb-8">{renderStepContent()}</CardContent>

          {currentStep === "email" && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Processus sécurisé et conforme RGPD</span>
              </div>
            </div>
          )}
        </Card>

        {currentStep === "email" && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
              <Link to="/login" className="flex items-center space-x-2">
                <ArrowLeft className="h-3 w-3" />
                <span>Retour à la connexion</span>
              </Link>
            </Badge>
          </div>
        )}
      </div>
    </Layout>
  );
}
