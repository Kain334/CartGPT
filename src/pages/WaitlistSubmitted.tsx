import { Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const WaitlistSubmitted = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden animate-fade-in">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Coming Soon</span>
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            The Future of Shopping is{" "}
            <span className="gradient-text">Almost Here</span>
          </h1>

          {/* Sub-text */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            We are currently perfecting the CartGPT experience for our private beta users. 
            Join the waitlist to get your invite and exclusive early-access perks.
          </p>

          {/* Success State */}
          <div className="max-w-md mx-auto mb-10 p-6 rounded-2xl bg-accent/10 border border-accent/20 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">You're in!</h3>
            <p className="text-muted-foreground">
              We've sent a confirmation to your email. Check your inbox soon.
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex -space-x-3">
              <Avatar className="w-10 h-10 border-2 border-background">
                <AvatarFallback className="bg-accent/20 text-accent text-sm font-medium">JL</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 border-2 border-background">
                <AvatarFallback className="bg-cta/20 text-cta text-sm font-medium">ER</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 border-2 border-background">
                <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">SK</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span> people already on the list
            </p>
          </div>

          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WaitlistSubmitted;
