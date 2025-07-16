import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { ChatWidget } from "./ChatWidget";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className={`flex-1 ${className}`}>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;
