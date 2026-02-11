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
  ChevronRight,
  Building,
  Shield,
  Bell,
  User,
  Briefcase,
  BarChart3,
  Globe,
  Key,
  Mail,
  Home,
  Layers,
  BookOpen,
  CreditCard,
  PieChart,
  Camera,
  Handshake,
  ChevronDown,
  Sparkles,
  Zap,
  Target,
  Clock,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

// Updated navigation with better icons and structure
const navigation = [
  { 
    name: "Dashboard", 
    href: "/admin/dashboard", 
    icon: LayoutDashboard,
    color: "text-main-2"
  },
  {
    name: "Exhibition",
    icon: Building,
    color: "text-purple-500",
    subItems: [
      { name: "Exhibitors", href: "/admin/exhibition/exhibitors", icon: Briefcase },
      { name: "Sectors", href: "/admin/exhibition/sectors", icon: Target },
      { name: "Floor Plans", href: "/admin/exhibition/floor-plans", icon: Globe },
      { name: "Manuals", href: "/admin/exhibition/manuals", icon: BookOpen },
    ],
  },
  {
    name: "Financial",
    icon: DollarSign,
    color: "text-amber-500",
    subItems: [
      { name: "Payments", href: "/admin/financial/payments", icon: CreditCard },
      { name: "Invoices", href: "/admin/financial/invoices", icon: FileText },
      { name: "Revenue Analytics", href: "/admin/financial/revenue", icon: PieChart },
    ],
  },
  { 
    name: "User Management", 
    href: "/admin/users", 
    icon: Users,
    color: "text-blue-500"
  },
  { 
    name: "Media Library", 
    href: "/admin/media", 
    icon: Camera,
    color: "text-pink-500"
  },
  { 
    name: "Partners", 
    href: "/admin/partners", 
    icon: Handshake,
    color: "text-emerald-500"
  },
  {
    name: "Settings",
    icon: Settings,
    color: "text-gray-500",
    subItems: [
      { name: "General", href: "/admin/settings/general", icon: Settings },
      { name: "Email Templates", href: "/admin/settings/email", icon: Mail },
      { name: "API Configuration", href: "/admin/settings/api", icon: Key },
    ],
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [mobileOpenMenus, setMobileOpenMenus] = useState<Set<string>>(new Set());
  const [notificationCount, setNotificationCount] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { user, logout, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (sidebarOpen && !target.closest('#mobile-sidebar') && !target.closest('[data-menu-button]')) {
        setSidebarOpen(false);
      }
      if (!target.closest('#user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, pathname, router]);

  const toggleMenu = (name: string, isMobile: boolean = false) => {
    if (isMobile) {
      const newSet = new Set(mobileOpenMenus);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      setMobileOpenMenus(newSet);
    } else {
      const newSet = new Set(openMenus);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      setOpenMenus(newSet);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-main-5 to-main-1 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-main-3/20"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-main-3 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-main-3 font-medium">Loading admin panel...</p>
          <p className="text-sm text-main-3/60 mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-main-5 via-main-1 to-main-5">
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-main-1 to-main-5 border-r border-main-4 transform transition-all duration-300 ease-out lg:hidden ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-main-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-main-2 to-main-3 flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white">ExpoAdmin</span>
              <p className="text-xs text-main-3/80">Management System</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-main-4/30 rounded-xl transition-all hover:rotate-90"
          >
            <X className="h-5 w-5 text-main-3" />
          </button>
        </div>

        {/* User Profile */}
        <div className="px-4 py-6 border-b border-main-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-main-4/20 backdrop-blur-sm">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-main-2 to-main-3 flex items-center justify-center shadow-md">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-main-3/80 truncate">{user?.email}</p>
              <div className="mt-1 flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-main-3 animate-pulse"></div>
                <span className="text-xs text-main-3">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto h-[calc(100vh-14rem)] py-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name, true)}
                    className="w-full flex items-center px-4 py-3.5 text-sm hover:bg-main-4/30 rounded-xl transition-all group hover:translate-x-1"
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                    <span className="text-main-3 group-hover:text-white flex-1 text-left">{item.name}</span>
                    <ChevronDown className={`h-4 w-4 text-main-3 transition-transform ${
                      mobileOpenMenus.has(item.name) ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {mobileOpenMenus.has(item.name) && (
                    <div className="ml-8 pl-4 border-l border-main-4 space-y-1 mt-1 animate-slide-up">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.href}
                          onClick={() => handleNavigation(sub.href)}
                          className={`flex items-center w-full text-left py-2.5 px-4 text-sm rounded-lg transition-all ${
                            pathname === sub.href 
                              ? 'bg-main-2/20 text-white border-l-2 border-main-2' 
                              : 'text-main-3/80 hover:text-white hover:bg-main-4/20'
                          }`}
                        >
                          {sub.icon && <sub.icon className="h-4 w-4 mr-3 opacity-70" />}
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleNavigation(item.href!)}
                  className={`w-full flex items-center px-4 py-3.5 text-sm rounded-xl transition-all group hover:translate-x-1 ${
                    pathname === item.href 
                      ? 'bg-main-2/20 text-white shadow-sm' 
                      : 'text-main-3 hover:text-white hover:bg-main-4/30'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                  <span>{item.name}</span>
                  {pathname === item.href && (
                    <ChevronRight className="h-4 w-4 ml-auto text-main-2" />
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-main-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm text-main-3 hover:text-white py-3 hover:bg-main-4/30 rounded-xl transition-all group hover:translate-x-1"
          >
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gradient-to-b from-main-1 to-main-5 border-r border-main-4 shadow-2xl">
        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-3 border-b border-main-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-main-2 to-main-3 flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">ExpoAdmin</h1>
            <p className="text-xs text-main-3/80">Premium Management System</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="px-4 py-6 border-b border-main-4">
          <div className="relative group">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-main-4/20 backdrop-blur-sm border border-main-4/30 hover:border-main-3/30 transition-all">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-main-2 to-main-3 flex items-center justify-center shadow-md">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-main-1"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{user?.name}</p>
                <p className="text-sm text-main-3/80 truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-main-2/20 text-main-3 text-xs rounded-full">Admin</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-main-3 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-6">
          {navigation.map((item) => (
            <div key={item.name} className="px-2">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name, false)}
                    className={`w-full flex items-center px-4 py-3.5 text-sm rounded-xl transition-all duration-200 group ${
                      openMenus.has(item.name) 
                        ? 'bg-main-4/30 text-white shadow-sm' 
                        : 'text-main-3 hover:text-white hover:bg-main-4/20'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDown className={`h-4 w-4 text-main-3 transition-transform duration-200 ${
                      openMenus.has(item.name) ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {openMenus.has(item.name) && (
                    <div className="ml-8 pl-4 border-l border-main-4 space-y-1 mt-1 animate-slide-up">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.href}
                          onClick={() => router.push(sub.href)}
                          className={`flex items-center w-full text-left py-2.5 px-4 text-sm rounded-lg transition-all ${
                            pathname === sub.href 
                              ? 'bg-main-2/20 text-white border-l-2 border-main-2 shadow-sm' 
                              : 'text-main-3/80 hover:text-white hover:bg-main-4/20'
                          }`}
                        >
                          {sub.icon && <sub.icon className="h-4 w-4 mr-3 opacity-70" />}
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => router.push(item.href!)}
                  className={`w-full flex items-center px-4 py-3.5 text-sm rounded-xl transition-all duration-200 group ${
                    pathname === item.href 
                      ? 'bg-main-2/20 text-white shadow-sm border-l-2 border-main-2' 
                      : 'text-main-3 hover:text-white hover:bg-main-4/20'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                  <span>{item.name}</span>
                  {pathname === item.href && (
                    <ChevronRight className="h-4 w-4 ml-auto text-main-2 animate-pulse" />
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-main-4">
          <div className="px-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-sm text-main-3 hover:text-white py-3.5 hover:bg-main-4/30 rounded-xl transition-all group hover:translate-x-1"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Sign Out Session</span>
            </button>
          </div>
          <div className="mt-4 px-3 pt-4 border-t border-main-4/50">
            <p className="text-xs text-main-3/60 text-center">v2.0 • © 2024 ExpoAdmin</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="h-16 bg-main-1/90 backdrop-blur-xl border-b border-main-4/50 flex items-center px-6 justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              data-menu-button
              className="lg:hidden p-2 hover:bg-main-4/30 rounded-xl transition-colors hover:rotate-180 duration-300"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 text-main-3" />
            </button>
            
            <div className="hidden md:flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-main-3 animate-pulse"></div>
              <span className="text-sm text-main-3/80">
                Welcome back, <span className="text-white font-medium">{user?.name?.split(' ')[0]}</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setNotificationCount(0)}
              className="relative p-2 hover:bg-main-4/30 rounded-xl transition-all group hover:rotate-12"
            >
              <Bell className="h-5 w-5 text-main-3 group-hover:text-white" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-main-2 to-main-3 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {notificationCount}
                </span>
              )}
            </button>
            
            <div className="h-8 w-px bg-main-4/50"></div>
            
            {/* User Menu */}
            <div className="relative" id="user-menu">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-main-4/30 transition-all group"
              >
                <div className="relative">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-main-2 to-main-3 flex items-center justify-center shadow-sm">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border border-main-1"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-main-3/80">Administrator</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-main-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-main-1 border border-main-4 rounded-xl shadow-2xl py-2 animate-slide-down z-50">
                  <div className="px-4 py-3 border-b border-main-4/50">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-main-3/80 truncate">{user?.email}</p>
                  </div>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-main-3 hover:text-white hover:bg-main-4/30 transition-colors">
                    <User className="h-4 w-4" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-main-3 hover:text-white hover:bg-main-4/30 transition-colors">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </button>
                  <div className="px-4 py-2 border-t border-main-4/50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 text-sm text-main-3 hover:text-white py-2.5 hover:bg-main-4/30 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 animate-fade-in">
          <div className="bg-gradient-to-br from-main-1/50 to-main-5/30 backdrop-blur-sm rounded-2xl border border-main-4/30 shadow-xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-main-4/50 bg-main-1/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-main-3/80">
              © 2024 ExpoAdmin Pro • Exhibition Management System v2.0
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-main-3/80 hover:text-main-3 transition-colors hover:underline">Help Center</a>
              <a href="#" className="text-main-3/80 hover:text-main-3 transition-colors hover:underline">Documentation</a>
              <a href="#" className="text-main-3/80 hover:text-main-3 transition-colors hover:underline">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}