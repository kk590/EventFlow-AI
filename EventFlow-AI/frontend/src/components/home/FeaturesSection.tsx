import { Bot, Calendar, Users, BarChart3, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Event Assistant",
    description: "Smart recommendations and automated planning powered by advanced AI algorithms.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent calendar management that adapts to your preferences and availability.",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Seamless registration, check-ins, and engagement tracking all in one place.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights and detailed reports to measure your event's success.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Instant Automation",
    description: "Automate repetitive tasks and focus on what matters most - your event.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security and compliance to keep your data safe and secure.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to create unforgettable events, powered by cutting-edge AI technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
