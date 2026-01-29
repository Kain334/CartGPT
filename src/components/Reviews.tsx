import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "James L.",
    role: "Digital Nomad",
    focus: "Need Discovery",
    content:
      "I knew I needed a new travel backpack but didn't know why my current one felt off. CartGPT asked about my specific commute habits and realized I actually needed better weight distribution, not more pockets. It found a match I never would have searched for myself.",
    avatar: "JL",
  },
  {
    name: "Elena R.",
    role: "Interior Designer",
    focus: "Feature Weighting (0-10)",
    content:
      "The 0-10 rating system is a game changer. I rated 'Aesthetics' a 10 and 'Price' a 4, and it stopped showing me boring, cheap options. It's like having a personal shopper who actually listens to my priorities instead of just showing me sponsored ads.",
    avatar: "ER",
  },
  {
    name: "Sarah K.",
    role: "Tech Professional",
    focus: "Efficiency & Results",
    content:
      "I spent weeks drowning in open tabs looking for a laptop. CartGPT found my winner in 5 minutes by asking questions I hadn't even thought of. The 3-sentence justification for each product made the final decision so easy. Highly recommended!",
    avatar: "SK",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="step-number mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who stopped searching and started finding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className="feature-card relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />

              {/* Focus Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-6">
                {review.focus}
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cta text-cta" />
                ))}
              </div>

              {/* Review Content */}
              <p className="text-foreground/80 leading-relaxed mb-6 min-h-[140px]">
                "{review.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-cta flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
