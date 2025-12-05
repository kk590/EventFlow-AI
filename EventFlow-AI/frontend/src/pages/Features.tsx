import { Layout } from "@/components/layout/Layout";
import { 
  Bot, Calendar, Users, BarChart3, Zap, Shield, 
  Globe, Bell, Palette, MessageSquare, Cloud, Lock 
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Event Assistant",
    description: "Our intelligent AI assistant helps you plan every aspect of your event. From venue selection to scheduling, get smart recommendations based on your preferences and past event data.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent calendar management that syncs with all major calendar apps. Automatic conflict detection and smart time slot suggestions based on attendee availability.",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Comprehensive tools for registration, ticketing, and check-ins. Track attendee engagement and gather valuable insights to improve future events.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time analytics and detailed reports. Track registrations, attendance, engagement metrics, and ROI all in one beautiful dashboard.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Instant Automation",
    description: "Automate emails, reminders, follow-ups, and more. Create custom workflows that save hours of manual work while ensuring nothing falls through the cracks.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption. Your data is protected with the same security standards used by leading financial institutions.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Support for multiple languages, currencies, and time zones. Host events for audiences anywhere in the world with localized experiences.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent notification system that keeps attendees engaged without overwhelming them. Personalized reminders based on user behavior.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "White-label solutions with full customization. Match your event pages, emails, and tickets to your brand identity perfectly.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
  },
  {
    icon: MessageSquare,
    title: "Live Chat & Support",
    description: "Built-in chat and Q&A features for virtual and hybrid events. Enable real-time interaction between speakers and attendees.",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10 dark:bg-teal-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable cloud infrastructure that handles events of any size. From intimate gatherings to conferences with thousands of attendees.",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10 dark:bg-sky-500/20",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Granular permissions and role-based access. Control who can view, edit, or manage different aspects of your events.",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10 dark:bg-violet-500/20",
  },
];

const Features = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Features
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Everything You Need to Create{" "}
              <span className="gradient-text">Amazing Events</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover the full suite of features designed to streamline your event management 
              and deliver exceptional experiences for your attendees.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-8 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
