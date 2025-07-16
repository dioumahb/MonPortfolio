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
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { Shield, Mail, ArrowLeft, CheckCircle, Settings } from "lucide-react";

type ResetStep = "email" | "success";

export default function AdminResetPassword() {
  const [currentStep, setCurrentStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call to send reset email
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep("success");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "email":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Adresse email administrateur
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ansuten.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Entrez l'adresse email associée à votre compte administrateur
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-primary hover:bg-primary/90"
              disabled={!email || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer le lien de réinitialisation
                  <Mail className="ml-2 h-4 w-4" />
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
                Email de réinitialisation envoyé !
              </h3>
              <p className="text-muted-foreground">
                Un email contenant les instructions de réinitialisation de mot
                de passe a été envoyé à{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <h4 className="font-medium mb-2">Étapes suivantes :</h4>
              <ol className="text-left space-y-1 text-muted-foreground">
                <li>1. Vérifiez votre boîte de réception</li>
                <li>2. Cliquez sur le lien dans l'email</li>
                <li>3. Créez un nouveau mot de passe</li>
                <li>4. Connectez-vous avec vos nouveaux identifiants</li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button className="w-full h-12 text-base" asChild>
                <Link to="/admin/login">Retour à la connexion</Link>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setCurrentStep("email")}
              >
                Renvoyer l'email
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
      case "email":
        return "Réinitialisation du mot de passe";
      case "success":
        return "Email envoyé";
      default:
        return "Réinitialisation";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Saisissez votre email pour recevoir un lien de réinitialisation";
      case "success":
        return "Suivez les instructions reçues par email";
      default:
        return "";
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="min-h-[calc(100vh-theme(spacing.32))] flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Settings className="h-6 w-6" />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">
              {getStepTitle()}
            </CardTitle>
            <CardDescription className="text-base">
              {getStepDescription()}
            </CardDescription>

            <Badge className="mx-auto mt-4 bg-blue-50 text-blue-600 border-blue-200">
              <Shield className="h-3 w-3 mr-1" />
              Administration ANSUTEN
            </Badge>
          </CardHeader>

          <CardContent className="pb-8">{renderStepContent()}</CardContent>

          {currentStep === "email" && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Procédure sécurisée et conforme RGPD</span>
              </div>
            </div>
          )}
        </Card>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
            <Link to="/admin/login" className="flex items-center space-x-2">
              <ArrowLeft className="h-3 w-3" />
              <span>Retour à la connexion</span>
            </Link>
          </Badge>
        </div>
      </div>
    </Layout>
  );
}
