import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <ShoppingCart className="w-7 h-7 text-accent transition-transform duration-300 group-hover:scale-110" />
            <Sparkles className="w-3 h-3 text-cta absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            Cart<span className="text-accent">GPT</span>
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          <Button variant="nav" size="sm" asChild>
            <a href="#features">Features</a>
          </Button>
          <Button variant="nav" size="sm" asChild>
            <a href="#how-it-works">How it Works</a>
          </Button>
          <Button variant="nav" size="sm" asChild>
            <a href="#reviews">Reviews</a>
          </Button>
        </div>

        {/* CTA Button */}
        <Button variant="cta" size="default" className="hidden sm:flex">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
