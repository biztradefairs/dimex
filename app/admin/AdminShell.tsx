"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  DollarSign,
  Image as ImageIcon,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Building,
  Shield,
  Bell,
  User,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
//   {
//     name: "Content Management",
//     icon: FileText,
//     subItems: [
//       { name: "Pages", href: "/admin/content/pages" },
//       { name: "Articles", href: "/admin/content/articles" },
//       { name: "Privacy Policy", href: "/admin/content/privacy" },
//       { name: "Terms & Conditions", href: "/admin/content/terms" },
//     ],
//   },
  {
    name: "Exhibition Management",
    icon: Building,
    subItems: [
    //   { name: "Sectors", href: "/admin/exhibition/sectors" },
      { name: "Exhibitors", href: "/admin/exhibition/exhibitors" },
      { name: "Layout Plans", href: "/admin/exhibition/layout" },
      { name: "Floor Plans", href: "/admin/exhibition/floor-plans" },
      { name: "Exhibitor Manuals", href: "/admin/exhibition/manuals" },
    ],
  },
//   { name: "Partners & Sponsors", href: "/admin/partners", icon: Users },
//   { name: "Media Gallery", href: "/admin/media", icon: ImageIcon },
  {
    name: "Financial",
    icon: DollarSign,
    subItems: [
      { name: "Payments", href: "/admin/financial/payments" },
      { name: "Invoices", href: "/admin/financial/invoices" },
      { name: "Revenue", href: "/admin/financial/revenue" },
    ],
  },
  { name: "User Management", href: "/admin/users", icon: Users },
//   {
//     name: "Settings",
//     icon: Settings,
//     subItems: [
//       { name: "Website Settings", href: "/admin/settings/website" },
//       { name: "Email Templates", href: "/admin/settings/email" },
//       { name: "API Keys", href: "/admin/settings/api" },
//     ],
//   },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [notifications] = useState(3);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in");
    const userData = localStorage.getItem("admin_user");

    if (!loggedIn || !userData) {
      router.push("/admin/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user && pathname !== "/admin/login") return null;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const toggleMenu = (name: string) => {
    const newSet = new Set(openMenus);
    newSet.has(name) ? newSet.delete(name) : newSet.add(name);
    setOpenMenus(newSet);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r">
        <div className="px-4 py-5 flex items-center">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="ml-2 font-bold text-lg">Admin Panel</span>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full flex items-center px-2 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </button>

                  {openMenus.has(item.name) && (
                    <div className="pl-10">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.href}
                          onClick={() => router.push(sub.href)}
                          className="block w-full text-left py-1 text-sm hover:text-blue-600"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => router.push(item.href!)}
                  className="w-full flex items-center px-2 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              )}
            </div>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 flex items-center text-sm text-gray-600 hover:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="lg:pl-64">
        <header className="h-16 bg-white shadow flex items-center px-4 justify-between">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <div className="flex items-center gap-4">
            <Bell />
            <div className="flex items-center gap-2">
              <User />
              <span className="text-sm">{user?.name}</span>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
