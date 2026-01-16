// app/admin/partners/page.tsx
"use client";

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Star, Award, TrendingUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Partner {
  id: string;
  name: string;
  type: 'sponsor' | 'partner' | 'media';
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  logo: string;
  website: string;
  contact: string;
  status: 'active' | 'inactive';
  since: string;
  value: string;
}

export default function PartnersPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'Global Logistics Inc.',
      type: 'sponsor',
      tier: 'platinum',
      logo: '/logos/global-logistics.png',
      website: 'https://globallogistics.com',
      contact: 'sponsor@globallogistics.com',
      status: 'active',
      since: '2023',
      value: '$50,000'
    },
    {
      id: '2',
      name: 'Tech Shipping Solutions',
      type: 'sponsor',
      tier: 'gold',
      logo: '/logos/tech-shipping.png',
      website: 'https://techshipping.com',
      contact: 'partnership@techshipping.com',
      status: 'active',
      since: '2024',
      value: '$25,000'
    },
    {
      id: '3',
      name: 'Supply Chain Weekly',
      type: 'media',
      tier: 'silver',
      logo: '/logos/sc-weekly.png',
      website: 'https://supplychainweekly.com',
      contact: 'media@scweekly.com',
      status: 'active',
      since: '2023',
      value: '$10,000'
    },
    {
      id: '4',
      name: 'Warehouse Systems Ltd.',
      type: 'partner',
      tier: 'bronze',
      logo: '/logos/warehouse-systems.png',
      website: 'https://warehousesystems.com',
      contact: 'partner@warehousesystems.com',
      status: 'active',
      since: '2024',
      value: '$5,000'
    },
    {
      id: '5',
      name: 'Logistics Tech Review',
      type: 'media',
      tier: 'silver',
      logo: '/logos/logistics-tech.png',
      website: 'https://logisticstechreview.com',
      contact: 'contact@ltr.com',
      status: 'inactive',
      since: '2023',
      value: '$10,000'
    }
  ]);

  const types = ['all', 'sponsor', 'partner', 'media'];
  const tiers = ['all', 'platinum', 'gold', 'silver', 'bronze'];

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      setPartners(partners.filter(partner => partner.id !== id));
    }
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'platinum': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'sponsor': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'partner': return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'media': return <Award className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    const matchesTier = selectedTier === 'all' || partner.tier === selectedTier;
    return matchesSearch && matchesType && matchesTier;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners & Sponsors</h1>
          <p className="text-gray-600">Manage exhibition partners and sponsors</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search partners..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {tiers.map(tier => (
                <option key={tier} value={tier}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              {/* Partner Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-xl font-bold text-gray-600">
                      {partner.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{partner.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getTypeIcon(partner.type)}
                      <span className="text-sm text-gray-500 capitalize">{partner.type}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getTierColor(partner.tier)}`}>
                  {partner.tier}
                </span>
              </div>

              {/* Partner Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Since:</span>
                  <span className="font-medium">{partner.since}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Value:</span>
                  <span className="font-medium text-green-600">{partner.value}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    partner.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {partner.status}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-2">Contact:</span>
                  <a href={`mailto:${partner.contact}`} className="text-blue-600 hover:text-blue-800 truncate">
                    {partner.contact}
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Website
                </a>
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/partners/edit/${partner.id}`}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredPartners.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No partners found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? 'Try adjusting your search or filter.' : 'No partners added yet.'}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/partners/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Partner
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}