// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  MapIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CogIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { icons } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/exhibitor', icon: UserIcon},
  // { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Layout', href: '/dashboard/layout', icon: MapIcon },
  { name: 'Stall Booked', href: '/dashboard/stall', icon: ShoppingCartIcon },
  { name: 'Invoice', href: '/dashboard/invoice', icon: DocumentTextIcon },
  { name: 'Exhibitor Manual', href: '/dashboard/manual', icon: BookOpenIcon },
  { name: 'Extra Requirements', href: '/dashboard/requirements', icon: CogIcon },
  { name: 'Exhibitor', href: '/dashboard/exhibitor', icon: UserIcon}
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold text-gray-800">Exhibitor Portal</h1>
          <button
            onClick={onClose}
            className="lg:hidden"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <nav className="mt-5 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => isOpen && onClose()}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info section */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="font-semibold text-blue-600">EX</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Exhibitor Name</p>
              <p className="text-xs text-gray-500">View profile</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}