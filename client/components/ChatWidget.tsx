import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  User,
  Bot,
  Phone,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "agent";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatWidgetProps {
  className?: string;
}

export function ChatWidget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Bonjour ! Je suis l'assistant virtuel Bmd Technologies. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate chatroot responses
  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(
      () => {
        let botResponse = "";

        // Simple keyword-based responses
        const lowerMessage = userMessage.toLowerCase();

        if (
          lowerMessage.includes("sondage") ||
          lowerMessage.includes("questionnaire")
        ) {
          botResponse =
            "Pour accéder à vos sondages, connectez-vous via le bouton 'Se connecter' en haut de la page. Vous pourrez voir tous vos sondages disponibles sur votre tableau de bord.";
        } else if (
          lowerMessage.includes("connexion") ||
          lowerMessage.includes("connecter")
        ) {
          botResponse =
            "Pour vous connecter, cliquez sur 'Se connecter' et saisissez votre email. Vous recevrez un code de vérification par SMS ou email.";
        } else if (
          lowerMessage.includes("aide") ||
          lowerMessage.includes("support")
        ) {
          botResponse =
            "Je peux vous aider avec :\n• Connexion à votre compte\n• Accès aux sondages\n• Questions techniques\n• Contact avec un agent\n\nQue souhaitez-vous faire ?";
        } else if (
          lowerMessage.includes("agent") ||
          lowerMessage.includes("humain")
        ) {
          botResponse =
            "Je vais vous mettre en relation avec un agent. Veuillez patienter...";
          // Simulate agent connection
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                text: "Bonjour, je suis Marie de l'équipe support Bmd Technologies. Comment puis-je vous aider ?",
                sender: "agent",
                timestamp: new Date(),
              },
            ]);
          }, 2000);
        } else if (
          lowerMessage.includes("merci") ||
          lowerMessage.includes("thank")
        ) {
          botResponse =
            "De rien ! N'hésitez pas si vous avez d'autres questions. Je suis là pour vous aider 😊";
        } else {
          botResponse =
            "Je comprends votre demande. Pour une assistance personnalisée, puis-je vous proposer de consulter notre centre d'aide ou de parler avec un agent ?";
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
      },
      1500 + Math.random() * 1000,
    ); // Random delay for more natural feel
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

    // Simulate bot response
    simulateBotResponse(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageIcon = (sender: Message["sender"]) => {
    switch (sender) {
      case "bot":
        return <Bot className="h-4 w-4" />;
      case "agent":
        return <User className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getSenderName = (sender: Message["sender"]) => {
    switch (sender) {
      case "bot":
        return "Assistant Bmd Technologies";
      case "agent":
        return "Agent Support";
      case "user":
        return "Vous";
      default:
        return "";
    }
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Ouvrir le chat</span>
        </Button>

        {/* Notification badge */}
        <Badge className="absolute -top-2 -left-2 bg-red-500 text-white border-2 border-background">
          1
        </Badge>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Card
        className={cn(
          "w-80 md:w-96 shadow-2xl transition-all duration-300",
          isMinimized ? "h-14" : "h-[500px]",
        )}
      >
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4" />
              </div>
              {isConnected && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
              )}
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">
                Support Bmd Technologies
              </CardTitle>
              <p className="text-xs text-primary-foreground/80">
                {isConnected ? "En ligne" : "Hors ligne"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 h-80 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.sender === "agent"
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {message.sender !== "user" && (
                      <div className="flex items-center space-x-2 mb-1">
                        {getMessageIcon(message.sender)}
                        <span className="text-xs font-medium">
                          {getSenderName(message.sender)}
                        </span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">
                        Assistant Bmd Technologies
                      </span>
                    </div>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage("J'ai besoin d'aide pour me connecter");
                    handleSendMessage();
                  }}
                  className="text-xs"
                >
                  Aide connexion
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage("Comment accéder à mes sondages ?");
                    handleSendMessage();
                  }}
                  className="text-xs"
                >
                  Mes sondages
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage("Je voudrais parler à un agent");
                    handleSendMessage();
                  }}
                  className="text-xs"
                >
                  <User className="h-3 w-3 mr-1" />
                  Agent
                </Button>
              </div>

              {/* Contact options */}
              <div className="flex justify-center space-x-4 mt-3 pt-3 border-t text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>+224 628 64 60 19</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>support@bmdTechnologies.com</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
