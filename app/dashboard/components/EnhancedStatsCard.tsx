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
    <Link href={href}>
      <div className="card card-hover">
        <div className="p-5">
          <div className="flex justify-between mb-4">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>

            <div className="flex items-center gap-1 text-xs">
              {getTrendIcon()}
              <span>{change}</span>
            </div>
          </div>

          <h3 className="text-sm text-gray-600">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Link>
  );
}
