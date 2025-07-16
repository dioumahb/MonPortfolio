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
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import {
  Shield,
  Lock,
  User,
  ArrowLeft,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;

    setIsLoading(true);
    // Simulate API call for admin authentication
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    // Redirect to admin dashboard
    navigate("/admin/dashboard");
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
              Administration ANSUTEN
            </CardTitle>
            <CardDescription className="text-base">
              Accès sécurisé au back-office administrateur
            </CardDescription>

            <Badge className="mx-auto mt-4 bg-red-50 text-red-600 border-red-200">
              <Shield className="h-3 w-3 mr-1" />
              Accès restreint
            </Badge>
          </CardHeader>

          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email administrateur
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@ansuten.fr"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="pl-10 pr-10 h-12"
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

              <Button
                type="submit"
                className="w-full h-12 text-base bg-primary hover:bg-primary/90"
                disabled={
                  !credentials.email || !credentials.password || isLoading
                }
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
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Mot de passe oublié ?{" "}
                <Link
                  to="/admin/reset-password"
                  className="text-primary hover:underline"
                >
                  Réinitialiser
                </Link>
              </p>
            </div>
          </CardContent>

          <div className="px-6 pb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Connexion sécurisée SSL</span>
            </div>
          </div>
        </Card>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-3 w-3" />
              <span>Retour au site</span>
            </Link>
          </Badge>
        </div>
      </div>
    </Layout>
  );
}
