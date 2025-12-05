import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";

const stats = [
  { value: "10K+", label: "Events Created" },
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "AI Support" },
];

export const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Video Background */}
      <HeroVideoBackground />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI-Powered Event Management
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight">
          EventFlow{" "}
          <span className="gradient-text">Reimagined</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Harness the power of AI to create, manage, and optimize your events. 
          From planning to execution, we've got you covered.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/get-started">
            <Button variant="hero" size="lg">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="hero-outline" size="lg">
            <Play className="h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="opacity-0 animate-fade-in backdrop-blur-sm bg-card/30 rounded-lg p-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
