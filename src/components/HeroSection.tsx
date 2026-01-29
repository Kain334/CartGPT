import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">AI-Powered Shopping Assistant</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            CartGPT: We shop your{" "}
            <span className="gradient-text">worries away</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            The first AI agent that identifies your hidden needs and finds your perfect match. 
            Stop searching. Start discovering.
          </p>

          {/* Video Player */}
          <div className="relative max-w-3xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-foreground/5 aspect-video">
              {/* Video Placeholder - Replace with actual YouTube embed */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-accent/30 transition-colors">
                    <Play className="w-8 h-8 text-accent fill-accent" />
                  </div>
                  <p className="text-primary-foreground/70 text-sm">Product Demo Video</p>
                </div>
              </div>
              {/* Uncomment and add your YouTube video ID when ready:
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&modestbranding=1&rel=0&showinfo=0"
                title="CartGPT Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              */}
            </div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-cta/20 to-accent/20 rounded-3xl blur-2xl -z-10 opacity-50" />
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="cta" size="xl" className="group">
              Try CartGPT for Free Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Start in 30 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
