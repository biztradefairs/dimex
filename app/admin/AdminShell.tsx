"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Settings,
  DollarSign,
  Menu,
  X,
  LogOut,
  Building,
  Briefcase,
  Globe,
  BookOpen,
  CreditCard,
  PieChart,
  ChevronDown,
  Cable,
  Droplet,
  Monitor,
  Power,
  ShieldCheck,
  Sofa,
  Package,
  Bell,
  Armchair,
  UserRound,
  Brush,
  Landmark,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

type NavLeaf = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavGroup = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems: Array<NavLeaf | NavGroup>;
};

type NavItem = NavLeaf | NavGroup;

type NavSection = {
  label: string;
  items: NavItem[];
};

const navigation: NavSection[] = [
  {
    label: "Main",
    items: [{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Management",
    items: [
      {
        name: "Exhibition",
        icon: Building,
        subItems: [
          { name: "Exhibitors", href: "/admin/exhibition/exhibitors", icon: Briefcase },
          { name: "Exhibitors Team", href: "/admin/exhibition/teams", icon: Users },
          { name: "Extra Requirements", href: "/admin/exhibition/requirements", icon: Package },
          { name: "Floor Plans", href: "/admin/exhibition/booths", icon: Globe },
          { name: "Manuals", href: "/admin/exhibition/manuals", icon: BookOpen },
        ],
      },
      {
        name: "Financial",
        icon: DollarSign,
        subItems: [
          { name: "Payments", href: "/admin/financial/payments", icon: CreditCard },
          { name: "Invoices", href: "/admin/financial/invoices", icon: FileText },
          { name: "Revenue Analytics", href: "/admin/financial/revenue", icon: PieChart },
        ],
      },
    ],
  },
  {
    label: "Services",
    items: [
      {
        name: "Extra Requirements",
        icon: Sofa,
        subItems: [
          { name: "Received", href: "/admin/received", icon: Package },
          {
            name: "Settings",
            icon: Settings,
            subItems: [
              { name: "Furniture", href: "/admin/furniture", icon: Armchair },
              { name: "AV & IT Rentals", href: "/admin/rental-items", icon: Monitor },
              { name: "Electrical Load", href: "/admin/electrical-rates", icon: Power },
              { name: "Hostess Rates", href: "/admin/hostess-rates", icon: UserRound },
              { name: "Compressed Air", href: "/admin/compressed-air", icon: Cable },
              { name: "Water Connection", href: "/admin/water", icon: Droplet },
              { name: "Security Guard", href: "/admin/security-guard", icon: ShieldCheck },
              { name: "Housekeeping", href: "/admin/housekeeping", icon: Brush },
              { name: "Security Deposit", href: "/admin/security-deposit", icon: Landmark },
            ],
          },
        ],
      },
    ],
  },
];

function isGroup(item: NavItem): item is NavGroup {
  return "subItems" in item && Array.isArray(item.subItems);
}

function itemContainsPath(item: NavItem, pathname: string): boolean {
  if (!isGroup(item)) return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return item.subItems.some((child) => itemContainsPath(child, pathname));
}

function collectOpenMenus(sections: NavSection[], pathname: string, open = new Set<string>()) {
  sections.forEach((section) => {
    section.items.forEach((item) => walkOpen(item, pathname, open));
  });
  return open;
}

function walkOpen(item: NavItem, pathname: string, open: Set<string>) {
  if (isGroup(item) && itemContainsPath(item, pathname)) {
    open.add(item.name);
    item.subItems.forEach((child) => walkOpen(child, pathname, open));
  }
}

function NavButton({
  active,
  onClick,
  icon: Icon,
  label,
  trailing,
}: {
  active?: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] leading-none transition-colors ${
        active
          ? "bg-white/10 font-medium text-white"
          : "font-normal text-white/65 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-white/45"}`} />
      <span className="flex-1 truncate text-left">{label}</span>
      {trailing}
    </button>
  );
}

function renderNavItem(
  item: NavItem,
  pathname: string,
  handleNavigation: (href: string) => void,
  openMenus: Set<string>,
  toggleMenu: (name: string) => void
) {
  if (isGroup(item)) {
    const isOpen = openMenus.has(item.name);
    const childActive = itemContainsPath(item, pathname);

    return (
      <div key={item.name}>
        <NavButton
          active={childActive && !isOpen}
          onClick={() => toggleMenu(item.name)}
          icon={item.icon}
          label={item.name}
          trailing={
            <ChevronDown
              className={`h-3.5 w-3.5 text-white/35 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          }
        />
        {isOpen ? (
          <div className="relative ml-[18px] mt-0.5 space-y-0.5 border-l border-white/10 py-0.5 pl-2.5">
            {item.subItems.map((child) =>
              renderNavItem(child, pathname, handleNavigation, openMenus, toggleMenu)
            )}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <NavButton
      key={item.href}
      active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
      onClick={() => handleNavigation(item.href)}
      icon={item.icon}
      label={item.name}
    />
  );
}

function SidebarNav({
  pathname,
  handleNavigation,
  openMenus,
  toggleMenu,
}: {
  pathname: string;
  handleNavigation: (href: string) => void;
  openMenus: Set<string>;
  toggleMenu: (name: string) => void;
}) {
  return (
    <nav className="sidebar-scroll flex-1 space-y-5 overflow-y-auto px-3 py-4">
      {navigation.map((section) => (
        <div key={section.label}>
          <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
            {section.label}
          </p>
          <div className="space-y-0.5">
            {section.items.map((item) =>
              renderNavItem(item, pathname, handleNavigation, openMenus, toggleMenu)
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}

function SidebarBrand({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-4">
      <div className="relative h-9 w-[92px] shrink-0">
        <Image
          src="/images/logo-diemex2.png"
          alt="DIEMEX"
          fill
          className="object-contain object-left"
          sizes="92px"
          priority
        />
      </div>
      <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/55">
        Admin
      </span>
      {onClose ? (
        <button
          onClick={onClose}
          className="ml-auto rounded-md p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

function SidebarFooter({
  name,
  email,
  onLogout,
}: {
  name?: string;
  email?: string;
  onLogout: () => void;
}) {
  const initial = (name || "A").trim().charAt(0).toUpperCase();
  return (
    <div className="shrink-0 border-t border-white/10 p-3">
      <div className="mb-2 flex items-center gap-2.5 px-1.5 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-white">{name || "Administrator"}</p>
          <p className="truncate text-[11px] text-white/40">{email || "admin"}</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-white/60 hover:bg-white/[0.06] hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}

function SidebarFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside className={`flex w-[260px] flex-col bg-[#06162F] text-white ${className ?? ""}`}>
      {children}
    </aside>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [notificationCount, setNotificationCount] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, logout, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || "";

  const pathOpenMenus = useMemo(() => collectOpenMenus(navigation, pathname), [pathname]);

  useEffect(() => {
    setOpenMenus((prev) => {
      const next = new Set(prev);
      pathOpenMenus.forEach((name) => next.add(name));
      return next;
    });
  }, [pathOpenMenus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (sidebarOpen && !target.closest("#mobile-sidebar") && !target.closest("[data-menu-button]")) {
        setSidebarOpen(false);
      }
      if (!target.closest("#user-menu")) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen]);

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [loading, isAuthenticated, pathname, router]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
  };

  const sidebarInner = () => (
    <>
      <SidebarNav
        pathname={pathname}
        handleNavigation={handleNavigation}
        openMenus={openMenus}
        toggleMenu={toggleMenu}
      />
      <SidebarFooter name={user?.name} email={user?.email} onLogout={handleLogout} />
    </>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F6FA]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#06162F] border-t-transparent" />
          <p className="mt-3 text-sm font-medium text-slate-600">Loading admin panel…</p>
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
    <div className="min-h-screen bg-[#F4F6FA]">
      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 6px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 999px; }
        .sidebar-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.18) transparent; }
      `}</style>

      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-50 bg-[#06162F]/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <SidebarFrame
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div id="mobile-sidebar" className="flex h-full flex-col">
          <SidebarBrand onClose={() => setSidebarOpen(false)} />
          {sidebarInner()}
        </div>
      </SidebarFrame>

      <SidebarFrame className="hidden lg:fixed lg:inset-y-0 lg:flex">
        <SidebarBrand />
        {sidebarInner()}
      </SidebarFrame>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              data-menu-button
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-800">
                Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
              </p>
              <p className="text-xs text-slate-500">Exhibition administration</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setNotificationCount(0)}
              className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
              ) : null}
            </button>

            <div className="relative" id="user-menu">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#06162F] text-xs font-semibold text-white">
                  {(user?.name || "A").trim().charAt(0).toUpperCase()}
                </div>
                <div className="hidden text-left lg:block">
                  <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                  <p className="text-[11px] text-slate-500">Administrator</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen ? (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                    <p className="truncate text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
