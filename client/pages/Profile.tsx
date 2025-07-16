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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Bell,
  Settings,
  Activity,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Edit,
  CheckCircle,
  AlertCircle,
  BarChart3,
  MessageSquare,
  Star,
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthYear: string;
  gender: string;
  bio: string;
  joinDate: string;
  avatar?: string;
}

interface NotificationPreferences {
  emailSurveys: boolean;
  emailNewsletter: boolean;
  smsReminders: boolean;
  pushNotifications: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: string;
  loginNotifications: boolean;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Mock user data
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Jean",
    lastName: "Martin",
    email: "jean.martin@exemple.fr",
    phone: "06 12 34 56 78",
    birthYear: "1985",
    gender: "homme",
    bio: "Bénéficiaire ANSUTEN depuis 2023. Participe activement aux sondages pour améliorer les services.",
    joinDate: "2023-03-15",
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailSurveys: true,
    emailNewsletter: false,
    smsReminders: true,
    pushNotifications: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Mock activity data
  const activityData = [
    {
      id: 1,
      type: "survey_completed",
      title: "Satisfaction des services",
      date: "2024-01-15",
      points: 15,
    },
    {
      id: 2,
      type: "survey_completed",
      title: "Évaluation accompagnement",
      date: "2024-01-10",
      points: 10,
    },
    {
      id: 3,
      type: "profile_updated",
      title: "Profil mis à jour",
      date: "2024-01-05",
      points: 0,
    },
    {
      id: 4,
      type: "survey_completed",
      title: "Amélioration procédures",
      date: "2024-01-01",
      points: 12,
    },
  ];

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handlePasswordChange = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "survey_completed":
        return <MessageSquare className="h-4 w-4 text-success" />;
      case "profile_updated":
        return <User className="h-4 w-4 text-primary" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
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
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Mon profil
                </h1>
                <p className="text-muted-foreground">
                  Gérez vos informations personnelles et préférences
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-success/10 text-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                Compte vérifié
              </Badge>
            </div>
          </div>

          {/* Profile Overview Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Membre depuis{" "}
                        {new Date(profile.joinDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>156 points</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Annuler" : "Modifier"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Informations</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations de profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="birthYear">Année de naissance</Label>
                      <Select
                        value={profile.birthYear}
                        onValueChange={(value) =>
                          setProfile({ ...profile, birthYear: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {generateYearOptions().map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Genre</Label>
                      <Select
                        value={profile.gender}
                        onValueChange={(value) =>
                          setProfile({ ...profile, gender: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={3}
                      placeholder="Parlez-nous un peu de vous..."
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Annuler
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sauvegarde...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Sauvegarder
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>
                    Choisissez comment vous souhaitez être informé
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Nouveaux sondages par email
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez un email lorsqu'un nouveau sondage vous est
                          assigné
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailSurveys}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            emailSurveys: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Newsletter ANSUTEN</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez notre newsletter mensuelle avec les actualités
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNewsletter}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            emailNewsletter: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Rappels SMS</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez des rappels par SMS pour les sondages urgents
                        </p>
                      </div>
                      <Switch
                        checked={notifications.smsReminders}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            smsReminders: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Notifications push du navigateur
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez des notifications dans votre navigateur
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            pushNotifications: checked,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les préférences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de sécurité</CardTitle>
                  <CardDescription>
                    Gérez la sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Authentification à deux facteurs
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Ajoutez une couche de sécurité supplémentaire à votre
                          compte
                        </p>
                      </div>
                      <Switch
                        checked={security.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSecurity({ ...security, twoFactorAuth: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Expiration de session</Label>
                      <Select
                        value={security.sessionTimeout}
                        onValueChange={(value) =>
                          setSecurity({ ...security, sessionTimeout: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 heure</SelectItem>
                          <SelectItem value="240">4 heures</SelectItem>
                          <SelectItem value="never">
                            Ne jamais expirer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Notifications de connexion
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez un email lors de chaque nouvelle connexion
                        </p>
                      </div>
                      <Switch
                        checked={security.loginNotifications}
                        onCheckedChange={(checked) =>
                          setSecurity({
                            ...security,
                            loginNotifications: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Changer le mot de passe</CardTitle>
                  <CardDescription>
                    Mettez à jour votre mot de passe pour sécuriser votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirmer le nouveau mot de passe
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handlePasswordChange}
                      disabled={
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        passwordData.newPassword !==
                          passwordData.confirmPassword
                      }
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Changer le mot de passe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">12</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sondages complétés
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-accent" />
                      <span className="text-2xl font-bold">156</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Points gagnés
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-success" />
                      <span className="text-2xl font-bold">87%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Taux de participation
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>
                    Vos dernières actions sur la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityData.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {getActivityIcon(activity.type)}
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString(
                                "fr-FR",
                              )}
                            </p>
                          </div>
                        </div>
                        {activity.points > 0 && (
                          <Badge className="bg-accent/10 text-accent">
                            +{activity.points} points
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gestion des données</CardTitle>
                  <CardDescription>
                    Conformément au RGPD, vous pouvez gérer vos données
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Exporter mes données</p>
                      <p className="text-sm text-muted-foreground">
                        Téléchargez toutes vos données personnelles
                      </p>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-destructive">
                        Supprimer mon compte
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Suppression permanente de votre compte et données
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
