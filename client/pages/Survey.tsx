import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react";

export default function Survey() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  // Mock survey data - in real app this would come from API
  const survey = {
    id: id,
    title: "Satisfaction générale des services",
    description: "Aidez-nous à améliorer la qualité de nos prestations",
    estimatedTime: "5 min",
    totalQuestions: 3,
    questions: [
      {
        id: 1,
        type: "rating",
        question: "Comment évaluez-vous la qualité générale de nos services ?",
        options: [
          { value: 1, label: "Très insatisfait" },
          { value: 2, label: "Insatisfait" },
          { value: 3, label: "Neutre" },
          { value: 4, label: "Satisfait" },
          { value: 5, label: "Très satisfait" },
        ],
      },
      {
        id: 2,
        type: "multiple_choice",
        question: "Quel aspect souhaiteriez-vous voir amélioré en priorité ?",
        options: [
          { value: "accessibility", label: "Accessibilité des services" },
          { value: "response_time", label: "Temps de réponse" },
          { value: "communication", label: "Communication" },
          { value: "support", label: "Support technique" },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Avez-vous des suggestions ou commentaires additionnels ?",
        placeholder:
          "Partagez vos idées pour nous aider à mieux vous servir...",
      },
    ],
  };

  const currentQ = survey.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / survey.totalQuestions) * 100;

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < survey.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Survey completed
      navigate("/surveys");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = answers[currentQ.id] !== undefined;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/surveys">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux sondages
                </Link>
              </Button>
              <Badge className="bg-primary/10 text-primary">
                <Clock className="h-3 w-3 mr-1" />
                {survey.estimatedTime}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {survey.title}
            </h1>
            <p className="text-muted-foreground">{survey.description}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} sur {survey.totalQuestions}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {currentQ.type === "rating" && (
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {currentQ.options?.map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers[currentQ.id] === option.value
                          ? "default"
                          : "outline"
                      }
                      className="h-auto p-4 text-center"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <div>
                        <div className="text-lg font-bold mb-1">
                          {option.value}
                        </div>
                        <div className="text-xs">{option.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}

              {currentQ.type === "multiple_choice" && (
                <div className="space-y-3">
                  {currentQ.options?.map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers[currentQ.id] === option.value
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-start h-auto p-4"
                      onClick={() => handleAnswer(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}

              {currentQ.type === "text" && (
                <textarea
                  className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder={currentQ.placeholder}
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            <Button onClick={handleNext} disabled={!canProceed}>
              {currentQuestion === survey.totalQuestions - 1 ? (
                <>
                  Terminer
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
