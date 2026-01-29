import { CircleDot, Sliders, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CircleDot,
    title: "Need Confirmation",
    description:
      "We don't ask what you want; we find out what's bothering you. Our AI digs deep into your pain points until the goal is crystal clear.",
    accent: "accent",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Feature Weighting",
    description:
      "Rate what matters on a 0–10 scale. Whether it's durability, price, or aesthetics, we build your personal \"Preference Matrix.\"",
    accent: "cta",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Hyper-Personalized Search",
    description:
      "We scan live Amazon data to deliver your TOP 3 matches, complete with a \"Why this fits you\" 3-sentence breakdown for each.",
    accent: "accent",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="step-number mb-4 block">The Process</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            How CartGPT Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps from confusion to clarity. No endless scrolling, 
            no decision fatigue—just perfect matches.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isAccent = step.accent === "accent";
              
              return (
                <div
                  key={step.number}
                  className="feature-card relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Number */}
                  <div className={`absolute -top-4 left-8 px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                    isAccent ? "bg-accent/10 text-accent" : "bg-cta/10 text-cta"
                  }`}>
                    STEP {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    isAccent 
                      ? "bg-accent/10 group-hover:bg-accent/20" 
                      : "bg-cta/10 group-hover:bg-cta/20"
                  }`}>
                    <Icon className={`w-7 h-7 ${isAccent ? "text-accent" : "text-cta"}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connection Line (for larger screens) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
