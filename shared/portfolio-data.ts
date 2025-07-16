export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: "web" | "api" | "mobile" | "desktop";
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  message: string;
  rating: number;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export interface PortfolioData {
  personal: {
    name: string;
    company: string;
    title: string;
    subtitle: string;
    description: string;
    avatar: string;
    resume: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    website?: string;
  };
  skills: {
    technical: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    languages: string[];
  };
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  blog: BlogPost[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Mamadou Diouma BAH",
    company: "BMD Technologies",
    title: "CEO & Développeur Full Stack",
    subtitle: ".NET • Angular • Spring Boot",
    description:
      "Fondateur de BMD Technologies, je suis passionné par le développement d'applications web modernes et performantes. Je combine expertise technique et vision business pour créer des solutions innovantes. Spécialisé dans l'écosystème Microsoft et les technologies JavaScript modernes.",
    avatar: "/avatar-light.jpeg",
    resume: "/cv-diouma.pdf",
    location: "Guineé",
    email: "mamadoudiouma93bah@gmail.com",
    phone: "+224 628 94 60 19",
    linkedin: "https://linkedin.com/in/mamadou-diouma-bah",
    github: "https://github.com/dioumahb",
    website: "https://bmdtechnologies.com",
  },
  skills: {
    technical: [
      ".NET Core",
      "C#",
      "ASP.NET",
      "Blazor",
      "TypeScript",
      "JavaScript",
      "Java",
      "PHP",
    ],
    frameworks: [
      "Angular",
      "Spring Boot",
      "Laravel",
      "React",
      "Node.js",
      "Express.js",
    ],
    databases: ["PostgreSQL", "MongoDB", "SQL Server", "MySQL", "Redis"],
    tools: [
      "Azure",
      "Docker",
      "Git",
      "Jenkins",
      "Postman",
      "Visual Studio",
      "VS Code",
    ],
    languages: [
      "Français (Natif)",
      "Anglais (Courant)",
      "Foular",
    ],
  },
  experiences: [
    {
      id: "1",
      company: "Groupe Wolikhai",
      position: "Développeur Full Stack Senior",
      startDate: "2025-03",
      location: "Conakry, Guinée",
      description:
        "Lead développeur sur plusieurs projets d'applications web complexes utilisant .NET Core et Angular. Responsable de l'architecture technique et du mentoring de l'équipe.",
      technologies: [".NET Core", "Angular", "PostgreSQL", "Azure", "Docker"],
      achievements: [
        "Migration de 3 applications legacy vers .NET 6 +",
        "Amélioration des performances de 40% sur l'API principale",
        "Mise en place d'une architecture microservices",
        "Formation de 5 développeurs juniors",
      ],
    },
    {
      id: "2",
      company: "Groupe Wolikhai",
      position: "Développeur Full Stack",
      startDate: "2023-05",
      endDate: "2024-03",
      location: "Conakry, Guinéee",
      description:
        "Développement d'applications web et d'APIs REST pour des clients dans le secteur de la finance et de l'e-commerce.",
      technologies: ["ASP.NET MVC", "Angular", "SQL Server", "Azure DevOps"],
      achievements: [
        "Développement d'une plateforme e-commerce complète",
        "Intégration de systèmes de paiement sécurisés",
        "Optimisation SEO augmentant le trafic de 60%",
      ],
    },
    {
      id: "3",
      company: "Groupe Wolikhai",
      position: "Développeur Web",
      startDate: "2022-03",
      endDate: "2023-01",
      location: "Conakry, Guinée",
      description:
        "Création de sites web et d'applications pour PME et startups. Spécialisation dans Laravel et les CMS modernes.",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      achievements: [
        "Livraison de 5+ projets web en temps et en heure",
        "Développement d'un CMS sur mesure réutilisé sur 10+ projets",
        "Mise en place de bonnes pratiques de développement",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Udemy",
      degree: "DUT",
      field: "Informatique",
      startDate: "2023-09",
      endDate: "2024-06",
      location: "Toulouse, France",
      description:
        "Data Science et Machine Learning avec Python — Udemy",
    },
    {
      id: "2",
      institution: "Licence en Sciences Informatiques — IUHEG",
      degree: "Licence Professionnelle",
      field: "Génie Logiciel et Systèmes d'Information",
      startDate: "2015-09",
      endDate: "2019-12",
      location: "Conakry, Guiné",
      description:
        "Spécialisation en architecture logicielle, méthodologies agiles et développement web moderne.",
    }
  ],
  projects: [
    {
      id: "1",
      title: "EcoTrack - Plateforme de suivi environnemental",
      description:
        "Application web complète pour le suivi et l'analyse de données environnementales en temps réel. Interface admin avancée avec tableaux de bord interactifs.",
      image: "/placeholder.svg",
      technologies: [".NET 6", "Angular 14", "PostgreSQL", "Azure", "Chart.js"],
      githubUrl: "https://github.com/dioumahb/ecotrack",
      demoUrl: "https://ecotrack-demo.azurewebsites.net",
      category: "web",
      featured: true,
    },
    {
      id: "2",
      title: "TaskFlow API - Gestionnaire de tâches",
      description:
        "API REST robuste pour la gestion de projets et tâches avec authentification JWT, websockets pour les notifications en temps réel.",
      image: "/placeholder.svg",
      technologies: ["Spring Boot", "Java", "MongoDB", "Redis", "Docker"],
      githubUrl: "https://github.com/dioumahb/taskflow-api",
      category: "api",
      featured: true,
    },
    {
      id: "3",
      title: "ShopSmart - E-commerce moderne",
      description:
        "Plateforme e-commerce complète avec panier intelligent, recommandations IA et intégration de multiples moyens de paiement.",
      image: "/placeholder.svg",
      technologies: ["Laravel", "Vue.js", "MySQL", "Stripe", "Algolia"],
      githubUrl: "https://github.com/dioumahb/shopsmart",
      demoUrl: "https://shopsmart-demo.herokuapp.com",
      category: "web",
      featured: true,
    },
    {
      id: "4",
      title: "MediCare Mobile",
      description:
        "Application mobile de suivi médical avec synchronisation cloud et rappels de médicaments.",
      image: "/placeholder.svg",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
      githubUrl: "https://github.com/dioumahb/medicare-mobile",
      category: "mobile",
      featured: false,
    },
  ],
  services: [
    {
      id: "1",
      title: "Développement Web Full Stack",
      description:
        "Création d'applications web modernes et performantes de A à Z",
      icon: "Code",
      features: [
        "Architecture moderne et scalable",
        "Interface utilisateur responsive",
        "API REST/GraphQL sécurisées",
        "Base de données optimisée",
        "Tests automatisés",
        "Déploiement et maintenance",
      ],
      startingPrice: "À partir de 3 000 000 GNF",
    },
    {
      id: "2",
      title: "Développement d'APIs",
      description: "Conception et développement d'APIs robustes et documentées",
      icon: "Server",
      features: [
        "Architecture microservices",
        "Documentation complète",
        "Authentification sécurisée",
        "Monitoring et logs",
        "Tests d'intégration",
        "Performance optimisée",
      ],
      startingPrice: "À partir de 2 000 000 GNF",
    },
    {
      id: "3",
      title: "Consulting & Architecture",
      description: "Conseil en architecture technique et choix technologiques",
      icon: "Users",
      features: [
        "Audit de code existant",
        "Recommandations d'architecture",
        "Plan de migration technologique",
        "Formation des équipes",
        "Méthodologies agiles",
        "Optimisation des performances",
      ],
      startingPrice: "À partir de 500 000 GNF/jour",
    },
    {
      id: "4",
      title: "Maintenance & Support",
      description:
        "Maintenance continue et support technique de vos applications",
      icon: "Shield",
      features: [
        "Monitoring 24/7",
        "Mises à jour sécuritaires",
        "Correction de bugs",
        "Optimisation continue",
        "Sauvegardes automatiques",
        "Support prioritaire",
      ],
      startingPrice: "À partir de 450 000 GNF/mois",
    },
  ],
  testimonials: [
    {
      id: "1",
      name: "Sarah Martinez",
      position: "CTO",
      company: "TechStartup Inc.",
      message:
        "Mamadou a transformé notre vision en une application exceptionnelle. Son expertise technique et sa capacité à comprendre nos besoins métier sont remarquables. Je le recommande vivement pour tout projet complexe.",
      rating: 5,
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Abdoulaye Bah",
      position: "Responsable IT",
      company: "Conakry Digital",
      message:
        "Grâce à Mamadou, notre plateforme e-commerce a gagné en rapidité et en fiabilité. Son sens du détail et sa maîtrise du responsive design sont impressionnants.",
      rating: 5,
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Fatoumata Diallo",
      position: "CEO",
      company: "Guinée Innov",
      message:
        "Un partenaire de confiance ! Mamadou a su créer une identité visuelle forte pour notre startup. Son approche est à la fois créative et stratégique.",
      rating: 5,
      avatar: "/placeholder.svg",
    },
  ],
  blog: [
    {
      id: "1",
      title: "Migrer vers .NET 6 : Guide complet et bonnes pratiques",
      excerpt:
        "Découvrez comment migrer efficacement vos applications .NET vers la dernière version avec les meilleures pratiques et les pièges à éviter.",
      content: "Contenu détaillé de l'article...",
      publishDate: "2024-01-15",
      readTime: 8,
      tags: [".NET", "Migration", "Bonnes Pratiques"],
      featured: true,
    },
    {
      id: "2",
      title: "Angular 17 + : Les nouveautés qui changent tout",
      excerpt:
        "Exploration des nouvelles fonctionnalités d'Angular 17 et leur impact sur le développement d'applications modernes.",
      content: "Contenu détaillé de l'article...",
      publishDate: "2024-01-02",
      readTime: 6,
      tags: ["Angular", "JavaScript", "Frontend"],
      featured: true,
    },
    {
      id: "3",
      title: "Microservices avec Spring Boot : Architecture pratique",
      excerpt:
        "Comment concevoir et implémenter une architecture microservices robuste avec Spring Boot et les patterns essentiels.",
      content: "Contenu détaillé de l'article...",
      publishDate: "2023-12-20",
      readTime: 12,
      tags: ["Spring Boot", "Microservices", "Java"],
      featured: false,
    },
  ],
};
