import { MessageCircle, Search, Target } from "lucide-react";

const ServiceIntro = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            More than a search bar.
            <span className="block gradient-text">Your personal consultant.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CartGPT doesn't just find products—it understands you. We translate your frustrations into features and your
            pain points into perfect matches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="feature-card text-center group">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Conversational Discovery</h3>
            <p className="text-muted-foreground">
              We don't ask "what do you want?" We ask "what's bothering you?" and dig until we understand.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card text-center group">
            <div className="w-16 h-16 rounded-2xl bg-cta/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-cta/20 transition-colors">
              <Target className="w-8 h-8 text-cta" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Precision Matching</h3>
            <p className="text-muted-foreground">
              Your preferences become our algorithm. Every recommendation is weighted by what matters most to you.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card text-center group">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
              <Search className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Live Data Scanning</h3>
            <p className="text-muted-foreground">
              Real-time search across Amazon to surface the best options—not sponsored ads, but genuine fits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntro;
