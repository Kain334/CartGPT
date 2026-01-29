import { ShoppingCart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                <Sparkles className="w-2.5 h-2.5 text-cta absolute -top-1 -right-1" />
              </div>
              <span className="text-lg font-bold text-foreground tracking-tight">
                Cart<span className="text-accent">GPT</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              We shop your worries away.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#reviews" className="text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 CartGPT. All rights reserved. Stop searching. Start discovering.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
