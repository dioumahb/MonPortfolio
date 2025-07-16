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
  ArrowLeft,
  Plus,
  GripVertical,
  Trash2,
  Copy,
  Save,
  Eye,
  MessageSquare,
  CheckSquare,
  Star,
  Type,
  BarChart3,
  Calendar,
} from "lucide-react";

interface Question {
  id: string;
  type: "text" | "multiple_choice" | "rating" | "textarea" | "date" | "number";
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
}

export default function SurveyBuilder() {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    estimatedTime: 5,
  });

  const [questions, setQuestions] = useState<Question[]>([]);

  const questionTypes = [
    {
      type: "text",
      label: "Texte court",
      icon: Type,
      description: "Réponse en une ligne",
    },
    {
      type: "textarea",
      label: "Texte long",
      icon: MessageSquare,
      description: "Réponse en plusieurs lignes",
    },
    {
      type: "multiple_choice",
      label: "Choix multiple",
      icon: CheckSquare,
      description: "Plusieurs options au choix",
    },
    {
      type: "rating",
      label: "Évaluation",
      icon: Star,
      description: "Échelle de notation",
    },
    {
      type: "number",
      label: "Numérique",
      icon: BarChart3,
      description: "Valeur numérique",
    },
    {
      type: "date",
      label: "Date",
      icon: Calendar,
      description: "S��lection de date",
    },
  ];

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      type,
      title: "",
      required: false,
      options:
        type === "multiple_choice" ? ["Option 1", "Option 2"] : undefined,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const duplicateQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      const duplicate = {
        ...question,
        id: `q_${Date.now()}`,
        title: question.title + " (copie)",
      };
      const index = questions.findIndex((q) => q.id === id);
      setQuestions([
        ...questions.slice(0, index + 1),
        duplicate,
        ...questions.slice(index + 1),
      ]);
    }
  };

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options) {
      const newOptions = [
        ...question.options,
        `Option ${question.options.length + 1}`,
      ];
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string,
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const renderQuestionEditor = (question: Question, index: number) => {
    const Icon =
      questionTypes.find((t) => t.type === question.type)?.icon || Type;

    return (
      <Card key={question.id} className="mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
              <Icon className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Question {index + 1}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicateQuestion(question.id)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(question.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Question</Label>
            <Input
              placeholder="Saisissez votre question..."
              value={question.title}
              onChange={(e) =>
                updateQuestion(question.id, { title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Description (optionnelle)</Label>
            <Input
              placeholder="Information complémentaire..."
              value={question.description || ""}
              onChange={(e) =>
                updateQuestion(question.id, { description: e.target.value })
              }
            />
          </div>

          {question.type === "multiple_choice" && (
            <div className="space-y-2">
              <Label>Options</Label>
              {question.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <Input
                    value={option}
                    onChange={(e) =>
                      updateOption(question.id, optionIndex, e.target.value)
                    }
                  />
                  {question.options && question.options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(question.id, optionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addOption(question.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une option
              </Button>
            </div>
          )}

          {question.type === "rating" && (
            <div className="space-y-2">
              <Label>Échelle de notation</Label>
              <Select defaultValue="5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">1 à 3</SelectItem>
                  <SelectItem value="5">1 à 5</SelectItem>
                  <SelectItem value="10">1 à 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={question.required}
              onChange={(e) =>
                updateQuestion(question.id, { required: e.target.checked })
              }
              className="rounded"
            />
            <Label>Question obligatoire</Label>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Créateur de sondage
                </h1>
                <p className="text-muted-foreground">
                  Construisez votre sondage en glissant-déposant les questions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Aperçu
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Question Types Palette */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Types de questions</CardTitle>
                  <CardDescription>
                    Glissez les éléments dans votre sondage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {questionTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={type.type}
                        variant="outline"
                        className="w-full justify-start h-auto p-3"
                        onClick={() =>
                          addQuestion(type.type as Question["type"])
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">{type.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Survey Builder */}
            <div className="lg:col-span-3">
              {/* Survey Settings */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Paramètres du sondage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Titre du sondage</Label>
                    <Input
                      placeholder="Ex: Satisfaction des services ANSUTEN"
                      value={survey.title}
                      onChange={(e) =>
                        setSurvey({ ...survey, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Expliquez l'objectif de ce sondage..."
                      value={survey.description}
                      onChange={(e) =>
                        setSurvey({ ...survey, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Durée estimée (minutes)</Label>
                    <Select
                      value={survey.estimatedTime.toString()}
                      onValueChange={(value) =>
                        setSurvey({ ...survey, estimatedTime: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 minutes</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Questions */}
              <div className="space-y-4">
                {questions.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Aucune question ajoutée
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Commencez par ajouter des questions depuis la palette de
                        gauche
                      </p>
                      <Button onClick={() => addQuestion("text")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter ma première question
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  questions.map((question, index) =>
                    renderQuestionEditor(question, index),
                  )
                )}
              </div>

              {questions.length > 0 && (
                <Card className="mt-8">
                  <CardContent className="pt-6">
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => addQuestion("text")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
