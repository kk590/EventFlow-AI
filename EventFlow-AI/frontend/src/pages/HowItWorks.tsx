import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Settings, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Create Your Event",
    description: "Start by describing your event to our AI assistant. Tell it about your goals, audience, and preferences. The AI will generate a complete event plan tailored to your needs.",
    features: ["AI-powered planning", "Smart templates", "Instant setup"],
  },
  {
    number: "02",
    icon: Settings,
    title: "Customize & Configure",
    description: "Fine-tune every detail of your event. Customize registration forms, set up ticket types, design your event page, and configure automated workflows.",
    features: ["Drag-and-drop builder", "Custom branding", "Workflow automation"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Promote",
    description: "Publish your event and reach your audience. Use our built-in marketing tools, integrate with social media, and track your promotional campaigns in real-time.",
    features: ["One-click publishing", "Social integration", "Email campaigns"],
  },
  {
    number: "04",
    icon: Trophy,
    title: "Execute & Analyze",
    description: "Run your event smoothly with real-time management tools. Monitor attendance, engage with participants, and gather comprehensive analytics for future improvement.",
    features: ["Live dashboard", "Attendee insights", "Post-event reports"],
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              How It Works
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              From Idea to <span className="gradient-text">Unforgettable Event</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Our streamlined process makes event planning effortless. 
              Follow these simple steps to create your next successful event.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-20 space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 py-12 opacity-0 animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="text-5xl font-bold gradient-text">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    {step.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className="glass-card aspect-video flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-primary/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Get Started?
            </h3>
            <p className="mt-4 text-muted-foreground">
              Join thousands of event organizers who have transformed their workflow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-started">
                <Button variant="hero" size="lg">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
