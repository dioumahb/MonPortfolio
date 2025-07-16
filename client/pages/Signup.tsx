import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/Layout";
import {
  MessageSquare,
  ArrowLeft,
  Shield,
  UserPlus,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthYear: string;
  gender: string;
  agreeTerms: boolean;
  agreeNewsletter: boolean;
}

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthYear: "",
    gender: "",
    agreeTerms: false,
    agreeNewsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupData, string>>
  >({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof SignupData, string>> = {};

    if (!formData.firstName) newErrors.firstName = "Prénom requis";
    if (!formData.lastName) newErrors.lastName = "Nom requis";
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.phone) newErrors.phone = "Téléphone requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (!formData.birthYear) newErrors.birthYear = "Année de naissance requise";
    if (!formData.gender) newErrors.gender = "Genre requis";
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    // Redirect to confirmation page with email
    navigate(`/confirm-account?email=${encodeURIComponent(formData.email)}`);
  };

  const handleInputChange = (
    field: keyof SignupData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 100; year--) {
      years.push(year.toString());
    }
    return years;
  };

  return (
    <Layout className="bg-gradient-to-br from-ansuten-50 via-white to-ansuten-100">
      <div className="min-h-[calc(100vh-theme(spacing.32))] flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">
              Créer un compte ANSUTEN
            </CardTitle>
            <CardDescription className="text-base">
              Rejoignez notre communauté de bénéficiaires et participez à
              l'amélioration de nos services
            </CardDescription>

            <Badge className="mx-auto mt-4 bg-primary/10 text-primary border-primary/20">
              <UserPlus className="h-3 w-3 mr-1" />
              Inscription gratuite
            </Badge>
          </CardHeader>

          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Informations personnelles
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Prénom *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={errors.firstName ? "border-destructive" : ""}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Nom *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Martin"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={errors.lastName ? "border-destructive" : ""}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Adresse email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.martin@exemple.fr"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Téléphone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthYear" className="text-sm font-medium">
                      Année de naissance *
                    </Label>
                    <Select
                      value={formData.birthYear}
                      onValueChange={(value) =>
                        handleInputChange("birthYear", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.birthYear ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateYearOptions().map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.birthYear && (
                      <p className="text-xs text-destructive">
                        {errors.birthYear}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium">
                      Genre *
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.gender ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homme">Homme</SelectItem>
                        <SelectItem value="femme">Femme</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                        <SelectItem value="non-specifie">
                          Préfère ne pas dire
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-xs text-destructive">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Sécurité
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mot de passe *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={
                        errors.password ? "border-destructive pr-10" : "pr-10"
                      }
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
                  {errors.password && (
                    <p className="text-xs text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirmer le mot de passe *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={
                        errors.confirmPassword
                          ? "border-destructive pr-10"
                          : "pr-10"
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Consentements
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeTerms", !!checked)
                      }
                      className={errors.agreeTerms ? "border-destructive" : ""}
                    />
                    <div className="text-sm">
                      <p>
                        J'accepte les{" "}
                        <Link
                          to="/terms"
                          className="text-primary hover:underline"
                        >
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link
                          to="/privacy"
                          className="text-primary hover:underline"
                        >
                          politique de confidentialité
                        </Link>{" "}
                        *
                      </p>
                      {errors.agreeTerms && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.agreeTerms}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={formData.agreeNewsletter}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeNewsletter", !!checked)
                      }
                    />
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        J'accepte de recevoir des informations sur les nouveaux
                        sondages et les actualités ANSUTEN par email (optionnel)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Création du compte...
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <UserPlus className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Se connecter
                </Link>
              </div>
            </form>
          </CardContent>

          <div className="px-6 pb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Données sécurisées et conformes RGPD</span>
            </div>
          </div>
        </Card>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-3 w-3" />
              <span>Retour à l'accueil</span>
            </Link>
          </Badge>
        </div>
      </div>
    </Layout>
  );
}
