// components/EnhancedStatsCard.tsx
import Link from "next/link";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

export interface EnhancedStatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend: "up" | "down" | "stable" | "warning";
  href: string;
}

export default function EnhancedStatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  trend,
  href,
}: EnhancedStatsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />;
      case "warning":
        return <div className="h-3 w-3 rounded-full bg-amber-500" />;
      default:
        return <MinusIcon className="h-4 w-4 text-gray-400" />;
    }
  };

return (
  <Link href={href} className="block">
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      
      {/* Gradient Glow Background */}
      <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${color}`} />

      <div className="relative p-6">
        
        {/* Top Section */}
        <div className="flex items-center justify-between mb-6">
          
          {/* Icon */}
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-md`}>
            <Icon className="h-6 w-6 text-white" />
          </div>

          {/* Trend */}
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              trend === "up"
                ? "bg-green-50 text-green-600"
                : trend === "down"
                ? "bg-red-50 text-red-600"
                : trend === "warning"
                ? "bg-amber-50 text-amber-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        </div>

        {/* Stats Content */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">
            {value}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

}
