// app/dashboard/manual/page.tsx
'use client';

import { useState } from 'react';
import {
  DocumentIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  
} from '@heroicons/react/24/outline';

import { ManualSection } from '@/types';

const manualSections: ManualSection[] = [
  {
    id: '1',
    title: 'Event Overview',
    content: 'Welcome to the Annual Tech Expo 2024. This event brings together industry leaders, innovators, and technology enthusiasts from around the world.',
    category: 'general'
  },
  {
    id: '2',
    title: 'Setup Schedule',
    content: 'Exhibitor setup: January 28, 2024 (8:00 AM - 6:00 PM)\nEvent days: January 29-31, 2024 (9:00 AM - 5:00 PM)\nBreakdown: February 1, 2024 (8:00 AM - 6:00 PM)',
    category: 'setup'
  },
  {
    id: '3',
    title: 'Rules & Regulations',
    content: '1. All displays must be within allocated stall boundaries\n2. Fire regulations must be strictly followed\n3. No amplified sound without prior approval\n4. All materials must be fire-retardant\n5. No blocking of aisles or emergency exits',
    category: 'rules'
  },
  {
    id: '4',
    title: 'Contact Information',
    content: 'Event Coordinator: Sarah Johnson\nPhone: +1 (555) 123-4567\nEmail: sarah@techexpo2024.com\nEmergency Contact: Security Desk - Extension 911',
    category: 'contact'
  },
  {
    id: '5',
    title: 'Electrical Requirements',
    content: 'Standard stalls include 2 power outlets (110V). Additional power requirements must be requested at least 2 weeks before the event.',
    category: 'setup'
  },
  {
    id: '6',
    title: 'Shipping & Logistics',
    content: 'All shipments must arrive between January 25-27, 2024. Use the provided shipping labels and include your stall number on all packages.',
    category: 'general'
  }
];

export default function ManualPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSection, setExpandedSection] = useState<string | null>('1');

  const categories = ['all', 'general', 'setup', 'rules', 'contact'];

  const filteredSections = manualSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manual</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Download Full Manual (PDF)
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search in manual..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {filteredSections.map((section) => (
              <div key={section.id} className="p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                >
                  <div className="flex items-center">
                    <DocumentIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  </div>
                  <span className={`transform transition-transform ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </div>
                
                {expandedSection === section.id && (
                  <div className="mt-4 pl-8">
                    <div className="prose prose-sm max-w-none">
                      {section.content.split('\n').map((line, index) => (
                        <p key={index} className="text-gray-600 mb-2">{line}</p>
                      ))}
                    </div>
                    <div className="mt-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        section.category === 'general' ? 'bg-gray-100 text-gray-800' :
                        section.category === 'setup' ? 'bg-blue-100 text-blue-800' :
                        section.category === 'rules' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {section.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Setup Checklist
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Vendor Agreement
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Important Dates</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-blue-700">Setup Begins</span>
                <span className="font-medium">Jan 28</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-700">Event Days</span>
                <span className="font-medium">Jan 29-31</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-700">Breakdown</span>
                <span className="font-medium">Feb 1</span>
              </li>
              <li className="flex justify-between">
                <span className="text-blue-700">Requirements Due</span>
                <span className="font-medium">Jan 15</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}