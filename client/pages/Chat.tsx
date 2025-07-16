import { useState, useRef, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import {
  ArrowLeft,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Bot,
  User,
  Clock,
  CheckCircle,
  Star,
  FileText,
  Download,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "agent";
  timestamp: Date;
  attachments?: string[];
}

interface ChatSession {
  id: string;
  title: string;
  status: "active" | "closed" | "waiting";
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Bonjour ! Bienvenue sur le support Bmd Technologies. Je suis votre assistant virtuel et je peux vous aider avec vos questions sur les sondages, la connexion, et bien plus encore. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "current",
      title: "Session actuelle",
      status: "active",
      lastMessage: "Bonjour ! Comment puis-je vous aider ?",
      timestamp: new Date(),
      unreadCount: 0,
    },
    {
      id: "previous-1",
      title: "Aide connexion sondage",
      status: "closed",
      lastMessage: "Merci pour votre aide !",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 0,
    },
    {
      id: "previous-2",
      title: "Question technique",
      status: "closed",
      lastMessage: "Problème résolu, merci !",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      unreadCount: 0,
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSession, setSelectedSession] = useState("current");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      const lowerMessage = userMessage.toLowerCase();

      if (
        lowerMessage.includes("sondage") ||
        lowerMessage.includes("questionnaire")
      ) {
        botResponse = `Pour accéder à vos sondages :

1. Connectez-vous via le bouton "Se connecter" 
2. Saisissez votre email 
3. Entrez le code OTP reçu
4. Accédez à votre tableau de bord

Vous pourrez alors voir tous vos sondages disponibles et y répondre directement.`;
      } else if (
        lowerMessage.includes("connexion") ||
        lowerMessage.includes("connecter")
      ) {
        botResponse = `Guide de connexion Bmd Technologies :

• Cliquez sur "Se connecter" en haut de la page
• Saisissez votre adresse email 
• Choisissez de recevoir le code par SMS ou email
• Entrez le code de vérification à 6 chiffres
• Vous serez automatiquement connecté

En cas de problème, contactez-nous au 01 23 45 67 89.`;
      } else if (
        lowerMessage.includes("aide") ||
        lowerMessage.includes("support")
      ) {
        botResponse = `Je peux vous aider avec :

🔐 **Connexion et authentification**
📊 **Accès aux sondages et questionnaires** 
💻 **Support technique**
📞 **Mise en relation avec un agent**
📧 **Questions générales**

Choisissez un sujet ou décrivez votre problème !`;
      } else if (
        lowerMessage.includes("agent") ||
        lowerMessage.includes("humain")
      ) {
        botResponse =
          "Je transfère votre demande à un agent. Temps d'attente estimé : 2-3 minutes. Un membre de notre équipe va prendre en charge votre conversation.";

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              text: "Bonjour ! Je suis Marie de l'équipe support Bmd Technologies. J'ai pris connaissance de votre demande. Comment puis-je vous aider de manière plus spécifique ?",
              sender: "agent",
              timestamp: new Date(),
            },
          ]);
        }, 3000);
      } else {
        botResponse = `Je comprends votre demande. Voici ce que je peux vous proposer :

• **Centre d'aide** : Consultez notre FAQ complète
• **Support technique** : Pour les problèmes techniques
• **Agent humain** : Pour une assistance personnalisée

Souhaitez-vous que je vous mette en relation avec un agent ?`;
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    simulateBotResponse(inputMessage);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Aujourd'hui";
    if (isYesterday) return "Hier";
    return date.toLocaleDateString("fr-FR");
  };

  const getStatusBadge = (status: ChatSession["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success text-success-foreground">Actif</Badge>
        );
      case "waiting":
        return (
          <Badge className="bg-warning text-warning-foreground">
            En attente
          </Badge>
        );
      case "closed":
        return <Badge variant="secondary">Fermé</Badge>;
      default:
        return null;
    }
  };

  const quickActions = [
    {
      label: "Aide connexion",
      message: "J'ai besoin d'aide pour me connecter à mon compte",
    },
    {
      label: "Accès sondages",
      message: "Comment puis-je accéder à mes sondages ?",
    },
    {
      label: "Problème technique",
      message: "J'ai un problème technique avec la plateforme",
    },
    {
      label: "Parler à un agent",
      message: "Je souhaiterais parler à un agent humain",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Support Bmd Technologies
                </h1>
                <p className="text-muted-foreground">
                  Assistance et support en temps réel
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Support en ligne</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Temps de réponse: ~2 min</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Chat Sessions */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mes conversations</CardTitle>
                  <CardDescription>
                    Historique de vos sessions de support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {chatSessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSession === session.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedSession(session.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {session.title}
                        </span>
                        {getStatusBadge(session.status)}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {session.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(session.timestamp)}
                        </span>
                        {session.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {session.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact direct</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-muted-foreground">+224 628 94 60 19</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">
                        mamadoudiouma93bah@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-muted-foreground">Lun-Ven 9h-18h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle>Chat en direct</CardTitle>
                        <CardDescription>
                          Assistance Bmd Technologies - Réponse immédiate
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Exporter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Évaluer
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages Area */}
                <CardContent className="flex-1 overflow-y-auto space-y-4 px-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : message.sender === "agent"
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {message.sender !== "user" && (
                          <div className="flex items-center space-x-2 mb-2">
                            {message.sender === "bot" ? (
                              <Bot className="h-4 w-4" />
                            ) : (
                              <User className="h-4 w-4" />
                            )}
                            <span className="text-sm font-medium">
                              {message.sender === "bot"
                                ? "Assistant Bmd Technologies"
                                : "Marie - Support"}
                            </span>
                          </div>
                        )}
                        <p className="whitespace-pre-wrap text-sm">
                          {message.text}
                        </p>
                        <p className="text-xs opacity-70 mt-2">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Assistant Bmd Technologies
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input Area */}
                <div className="p-6 border-t">
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputMessage(action.message);
                        }}
                        className="text-xs"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-3">
                    <Textarea
                      placeholder="Tapez votre message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1 min-h-[60px] resize-none"
                      rows={2}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="self-end"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Appuyez sur Entrée pour envoyer, Shift + Entrée pour une
                    nouvelle ligne
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
