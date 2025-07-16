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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import {
  Search,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  BookOpen,
  Star,
  Filter,
} from "lucide-react";
import { portfolioData } from "@shared/portfolio-data";

export default function Blog() {
  const { blog } = portfolioData;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  // Extraire tous les tags uniques
  const allTags = Array.from(new Set(blog.flatMap((post) => post.tags))).sort();

  // Filtrer les articles
  const filteredPosts = blog.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPosts = blog.filter((post) => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const BlogCard = ({
    post,
    featured = false,
  }: {
    post: any;
    featured?: boolean;
  }) => (
    <Card
      className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${featured ? "border-primary/20" : ""}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            {featured && (
              <Badge className="mb-2 bg-yellow-500 text-yellow-900 border-yellow-400">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            <CardTitle
              className={`line-clamp-2 ${featured ? "text-lg" : "text-base"}`}
            >
              {post.title}
            </CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishDate)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime} min de lecture
          </div>
        </div>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <BookOpen className="w-4 h-4 mr-2" />
          Lire l'article
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="w-3 h-3 mr-1" />
              Blog Technique
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Articles & Tutoriels
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Découvrez mes articles sur le développement web, les nouvelles
              technologies et les bonnes pratiques du secteur.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{blog.length} articles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>{featuredPosts.length} articles mis en avant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recherche et filtres */}
      <section className="py-12 bg-background sticky top-16 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tags de filtrage */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag("all")}
                className="text-xs"
              >
                <Filter className="w-3 h-3 mr-1" />
                Tous
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="text-xs"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles mis en avant */}
      {selectedTag === "all" && searchTerm === "" && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Articles mis en avant
              </h2>
              <p className="text-lg text-muted-foreground">
                Mes articles les plus populaires et récents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tous les articles */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {searchTerm || selectedTag !== "all"
                ? `Résultats ${selectedTag !== "all" ? `pour "${selectedTag}"` : ""}`
                : "Tous les articles"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {filteredPosts.length} article
              {filteredPosts.length > 1 ? "s" : ""} trouvé
              {filteredPosts.length > 1 ? "s" : ""}
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Effacer la recherche
                </Button>
                <Button variant="outline" onClick={() => setSelectedTag("all")}>
                  Tous les tags
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tags populaires */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Sujets populaires
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {allTags.map((tag) => {
                const postCount = blog.filter((post) =>
                  post.tags.includes(tag),
                ).length;
                return (
                  <Button
                    key={tag}
                    variant="outline"
                    onClick={() => setSelectedTag(tag)}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                  >
                    <span className="font-medium">{tag}</span>
                    <span className="text-xs text-muted-foreground">
                      {postCount} article{postCount > 1 ? "s" : ""}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Restez informé des nouveautés
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Suivez mes derniers articles et découvertes techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link to="/contact">Me contacter</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
               className="w-full sm:w-auto border-white/20 text-primary hover:bg-white/10"
              asChild
            >
              <Link to="/projects">
                Voir mes projets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
