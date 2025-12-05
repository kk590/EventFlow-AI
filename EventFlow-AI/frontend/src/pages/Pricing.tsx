import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small events and getting started",
    price: "Free",
    period: "",
    features: [
      "Up to 50 attendees per event",
      "Basic event pages",
      "Email invitations",
      "Simple analytics",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing teams and regular events",
    price: "$49",
    period: "/month",
    features: [
      "Up to 500 attendees per event",
      "Custom branding",
      "Advanced analytics",
      "AI event assistant",
      "Automated workflows",
      "Priority support",
      "Integration with popular tools",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: "Custom",
    period: "",
    features: [
      "Unlimited attendees",
      "White-label solution",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "On-premise deployment option",
      "Advanced security features",
      "24/7 premium support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! The Professional plan comes with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens when I reach my attendee limit?",
    answer: "You'll receive a notification when approaching your limit. You can upgrade at any time to accommodate more attendees.",
  },
];

const Pricing = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Choose the plan that fits your needs. Start free and scale as you grow.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={cn(
                  "glass-card p-8 flex flex-col opacity-0 animate-fade-in",
                  plan.popular && "border-primary ring-2 ring-primary/20 relative"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="mt-8 space-y-4 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.name === "Enterprise" ? "/contact" : "/get-started"} className="mt-8">
                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="mt-32 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="glass-card p-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
