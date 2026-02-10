// app/dashboard/components/RecentActivity.tsx
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  MapPinIcon 
} from "@heroicons/react/24/outline";

interface RecentActivityProps {
  exhibitorName: string;
  boothNumber?: string;
  invoiceCount: number;
  pendingRequirements: number;
}

export default function RecentActivity({ 
  exhibitorName, 
  boothNumber, 
  invoiceCount,
  pendingRequirements 
}: RecentActivityProps) {
  const activities = [
    {
      id: 1,
      title: "Profile Complete",
      description: `${exhibitorName}'s company profile has been verified`,
      time: "2 hours ago",
      icon: CheckCircleIcon,
      color: "text-green-500 bg-green-50"
    },
    {
      id: 2,
      title: boothNumber ? `Booth ${boothNumber} Assigned` : "Booth Assignment Pending",
      description: boothNumber ? `Your stall location is ready` : "Waiting for booth assignment",
      time: "1 day ago",
      icon: MapPinIcon,
      color: boothNumber ? "text-blue-500 bg-blue-50" : "text-yellow-500 bg-yellow-50"
    },
    {
      id: 3,
      title: invoiceCount > 0 ? `${invoiceCount} Invoices Generated` : "No Invoices Yet",
      description: invoiceCount > 0 ? "Check your invoices for payment" : "Invoices will be available soon",
      time: "2 days ago",
      icon: CurrencyDollarIcon,
      color: invoiceCount > 0 ? "text-purple-500 bg-purple-50" : "text-gray-500 bg-gray-50"
    },
    {
      id: 4,
      title: pendingRequirements > 0 ? `${pendingRequirements} Pending Requirements` : "All Requirements Met",
      description: pendingRequirements > 0 ? "Review and submit additional requirements" : "All setup requirements are complete",
      time: "3 days ago",
      icon: pendingRequirements > 0 ? ExclamationTriangleIcon : CheckCircleIcon,
      color: pendingRequirements > 0 ? "text-orange-500 bg-orange-50" : "text-green-500 bg-green-50"
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50">
          <div className={`p-2 rounded-lg ${activity.color}`}>
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">{activity.title}</h4>
            <p className="text-xs text-gray-500">{activity.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <ClockIcon className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}