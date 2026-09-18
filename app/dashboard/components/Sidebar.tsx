'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  HomeIcon,
  UserIcon,
  MapIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CogIcon,
  UserGroupIcon,
  XMarkIcon,
  CreditCardIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/exhibitor', icon: UserIcon },
  { name: 'Invoices', href: '/dashboard/invoice', icon: DocumentTextIcon },
  { name: 'Layout', href: '/dashboard/layout', icon: MapIcon },
  { name: 'Stall Booked', href: '/dashboard/stall', icon: ShoppingCartIcon },
  { name: 'Application form', href: '/dashboard/application-form', icon: ClipboardDocumentListIcon },
  {
    name: 'Payment',
    icon: CreditCardIcon,
    children: [
      { name: 'Stall Payment', href: '/dashboard/payment/stall' },
      { name: 'Payment Remainders', href: '/dashboard/payment/remainders' },
    ],
  },
  { name: 'Exhibitor Manual', href: '/dashboard/manual', icon: BookOpenIcon },
  { name: 'Team Members', href: '/dashboard/team', icon: UserGroupIcon },
  { name: 'Extra Requirements', href: '/dashboard/requirements', icon: CogIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(
    pathname.startsWith('/dashboard/payment') ? ['Payment'] : []
  );

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold text-gray-800">Exhibitor Portal</h1>
          <button onClick={onClose} className="lg:hidden">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <nav className="mt-5 space-y-1 px-2">
          {navigation.map((item) => {
            if ('children' in item && item.children) {
              const childActive = item.children.some(
                (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
              );
              const expanded = openMenus.includes(item.name) || childActive;

              return (
                <div key={item.name}>
                  <button
                    type="button"
                    onClick={() => toggleMenu(item.name)}
                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium ${
                      childActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        childActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expanded && (
                    <div className="mt-1 space-y-1 pl-9">
                      {item.children.map((child) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => isOpen && onClose()}
                            className={`block rounded-md px-2 py-2 text-sm ${
                              isActive
                                ? 'bg-blue-50 font-medium text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href!}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => isOpen && onClose()}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

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
