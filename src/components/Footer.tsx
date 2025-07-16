import { Link } from "react-router-dom";
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Shield,
  FileText,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MessageSquare className="h-4 w-4" />
              </div>
              <span className="font-bold text-xl">Bmd Technologies</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
             Découvrez mon parcours, mes compétences et ma passion pour le
              développement logiciel.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Connexion
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/surveys"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mes sondages
                </Link>
              </li> */}
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Centre d'aide</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Confidentialité</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  to="/gdpr"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  RGPD
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>mamadoudiouma93bah@gmail.com</span>
              </li>
              <li className="text-muted-foreground flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+242 628 94 60 19</span>
              </li>
              <li className="text-muted-foreground flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Conakry, Guinée
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Bmd Technologies. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Fait avec ❤️ pour nos clients</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
