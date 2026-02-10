// components/StatsCard.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color, href }: StatsCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
        <div className="p-5">
          <div className="flex items-center">
            <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{value}</div>
                  <div className="ml-2 flex items-center text-sm font-semibold text-green-600">
                    {change}
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}