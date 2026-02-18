// app/dashboard/components/QuickActions.tsx
import { 
  PencilSquareIcon,
  DocumentTextIcon,
  CreditCardIcon,
  MapIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Update Profile",
      description: "Edit company information",
      icon: PencilSquareIcon,
      color: "bg-blue-50 text-blue-600",
      onClick: () => router.push('/dashboard/exhibitor')
    },
    {
      title: "View Invoices",
      description: "Check and pay invoices",
      icon: CreditCardIcon,
      color: "bg-green-50 text-green-600",
      onClick: () => router.push('/dashboard/invoice')
    },
    {
      title: "Stall Layout",
      description: "View your stall location",
      icon: MapIcon,
      color: "bg-purple-50 text-purple-600",
      onClick: () => router.push('/dashboard/layout')
    },
    {
      title: "Requirements",
      description: "Submit additional requests",
      icon: DocumentTextIcon,
      color: "bg-orange-50 text-orange-600",
      onClick: () => router.push('/dashboard/requirements')
    },
    {
      title: "Manual",
      description: "Event guidelines",
      icon: QuestionMarkCircleIcon,
      color: "bg-gray-50 text-gray-600",
      onClick: () => router.push('/dashboard/manual')
    },
    {
      title: "Support",
      description: "Get help",
      icon: UserCircleIcon,
      color: "bg-red-50 text-red-600",
      onClick: () => router.push('/dashboard/support')
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action) => (
        <button
          key={action.title}
          onClick={action.onClick}
          className="flex items-start gap-3 p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
        >
          <div className={`p-2 rounded-lg ${action.color}`}>
            <action.icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-sm">{action.title}</h4>
            <p className="text-xs text-gray-500">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}