import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome aboard!",
        description: "We'll be in touch soon to get you started.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative glass-card p-8 md:p-16 text-center overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-50" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Start Your Journey
            </div>

            {/* Headline */}
            <h2 className="mt-6 text-3xl md:text-5xl font-bold text-foreground">
              Ready to Transform<br />Your <span className="text-primary">Events</span>?
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Join thousands of event organizers who trust EventFlow AI to create memorable experiences.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-card/50 border-border"
                required
              />
              <Button type="submit" variant="hero" size="lg">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Start your free trial today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
