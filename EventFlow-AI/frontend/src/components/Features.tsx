import { motion } from 'framer-motion';
import { Calendar, Users, BarChart3, Bot, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Bot,
    title: "AI Event Assistant",
    description: "Smart recommendations and automated planning powered by advanced AI algorithms.",
    color: "text-primary"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent calendar management that adapts to your preferences and availability.",
    color: "text-secondary"
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Seamless registration, check-ins, and engagement tracking all in one place.",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights and detailed reports to measure your event's success.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Instant Automation",
    description: "Automate repetitive tasks and focus on what matters most - your event.",
    color: "text-secondary"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security and compliance to keep your data safe and secure.",
    color: "text-accent"
  }
];

export default function Features() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create unforgettable events, powered by cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glass p-8 hover:border-primary/50 transition-all duration-300 group h-full">
                <div className={`${feature.color} mb-6 inline-flex p-3 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
