import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Menu, Code2, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À propos" },
    { href: "/projects", label: "Projets" },
    { href: "/services", label: "Services" },
    { href: "/testimonials", label: "Témoignages" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bmd-nav">
      <div className="bmd-nav-container">
        {/* Logo */}
        <div className="mr-6 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              BMD Technologies
            </span>
            <span className="font-bold text-lg text-foreground sm:hidden">
              BMD
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="bmd-nav-menu">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "bmd-nav-link",
                isActive(item.href)
                  ? "bmd-nav-link-active"
                  : "bmd-nav-link-inactive",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Link>
            </Button>
            <Button asChild>
              <a href="/cv-mamadou-diouma-bah.pdf" download>
                <FileText className="mr-2 h-4 w-4" />
                CV
              </a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <VisuallyHidden.Root>
                <SheetTitle>Menu de navigation</SheetTitle>
              </VisuallyHidden.Root>
              <div className="flex flex-col space-y-4 py-4">
                <div className="flex items-center space-x-2 px-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-xl">BMD Technologies</span>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/60",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="text-sm font-medium">Thème</span>
                    <ThemeToggle />
                  </div>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Me contacter
                    </Link>
                  </Button>
                  <Button className="justify-start" asChild>
                    <a
                      href="/cv-mamadou-diouma-bah.pdf"
                      download
                      onClick={() => setIsOpen(false)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Télécharger CV
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
