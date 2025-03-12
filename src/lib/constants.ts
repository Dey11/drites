import { BookOpen, LucideIcon, Users, Zap } from "lucide-react";

interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: 1,
    icon: Users,
    title: "Diverse Content",
    description: "Explore a wide range of topics from technology to culture.",
  },
  {
    id: 2,
    icon: BookOpen,
    title: "Engaging Community",
    description: "Connect with like-minded readers and writers.",
  },
  {
    id: 3,
    icon: Zap,
    title: "Personalized Experience",
    description: "Get recommendations tailored to your interests.",
  },
];
