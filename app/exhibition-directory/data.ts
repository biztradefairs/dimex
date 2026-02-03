import { Company, FilterOption, KeySector } from './type';

export const companies: Company[] = [
  {
    id: '1',
    name: 'Skladtech Forwarding',
    shortName: 'Skladtech',
    pavilion: '3',
    hall: '15',
    standNumber: 'B8017',
    country: 'Turkey',
    countryCode: 'TR',
    sector: ['Warehouse Equipment', 'Complex Logistics']
  },
  {
    id: '2',
    name: 'ADY EXPRESS LLC',
    shortName: 'ADY',
    pavilion: '3',
    hall: '13',
    standNumber: 'C7143',
    country: 'Turkey',
    countryCode: 'TR',
    sector: ['Air Freight', 'Road Freight']
  },
  {
    id: '3',
    name: '3lTransRussia',
    pavilion: '3',
    hall: '13',
    standNumber: 'A2065',
    country: 'Russia',
    countryCode: 'RU',
    sector: ['Rail Freight']
  },
  {
    id: '4',
    name: 'OptiCore',
    pavilion: '3',
    hall: '13',
    standNumber: 'Unassigned-1',
    country: 'Turkey',
    countryCode: 'TR',
    sector: ['Technology']
  },
  {
    id: '5',
    name: '10CUBITS TECH',
    pavilion: '3',
    hall: '15',
    standNumber: 'C7107',
    country: 'India',
    countryCode: 'IN',
    sector: ['Technology']
  },
  {
    id: '6',
    name: '1C',
    pavilion: '3',
    hall: '14',
    standNumber: 'B1021',
    country: 'Russia',
    countryCode: 'RU',
    sector: ['Technology']
  },
  {
    id: '7',
    name: '568 LOGISTICS CO., LTD.',
    pavilion: '3',
    hall: '14',
    standNumber: 'B1157',
    country: 'China',
    countryCode: 'CN',
    sector: ['Complex Logistics']
  },
  {
    id: '8',
    name: 'ABM LOGISTICS',
    pavilion: '3',
    hall: '14',
    standNumber: 'B1151',
    country: 'Russia',
    countryCode: 'RU',
    sector: ['Warehouse Equipment']
  },
  {
    id: '9',
    name: 'ALFERT, LLP',
    pavilion: '3',
    hall: '14',
    standNumber: 'B8103',
    country: 'Kazakhstan',
    countryCode: 'KZ',
    sector: ['Road Freight']
  },
  {
    id: '10',
    name: 'ALPER FRIGO LOGISTICS SERVICES INC',
    shortName: 'alper',
    pavilion: '3',
    hall: '15',
    standNumber: 'C5027',
    country: 'Turkey',
    countryCode: 'TR',
    sector: ['Road Freight']
  },
  {
    id: '11',
    name: 'ALYANSTRANSTORG',
    pavilion: '3',
    hall: '14',
    standNumber: 'Unassigned-1',
    country: 'Russia',
    countryCode: 'RU',
    sector: ['Rail Freight']
  },
  {
    id: '12',
    name: 'ALYLOGISTICS',
    pavilion: '3',
    hall: '14',
    standNumber: 'C9053',
    country: 'Turkey',
    countryCode: 'TR',
    sector: ['Maritime and Inland Waterway Transport']
  }
];

export const keySectors: KeySector[] = [
  { name: 'Warehouse Equipment', color: 'bg-blue-500' },
  { name: 'Complex Logistics', color: 'bg-purple-500' },
  { name: 'Air Freight', color: 'bg-cyan-500' },
  { name: 'Road Freight', color: 'bg-green-500' },
  { name: 'Rail Freight', color: 'bg-orange-500' },
  { name: 'Maritime and Inland Waterway Transport', color: 'bg-indigo-500' },
  { name: 'Technology', color: 'bg-pink-500' }
];

export const countries: FilterOption[] = [
  { label: 'All', value: 'all', count: 495 },
  { label: 'Turkey', value: 'TR', count: 45 },
  { label: 'Russia', value: 'RU', count: 32 },
  { label: 'China', value: 'CN', count: 28 },
  { label: 'India', value: 'IN', count: 22 },
  { label: 'Kazakhstan', value: 'KZ', count: 18 }
];

export const productSectors: FilterOption[] = [
  { label: 'All', value: 'all', count: 495 },
  { label: 'Logistics', value: 'logistics', count: 156 },
  { label: 'Transportation', value: 'transportation', count: 132 },
  { label: 'Warehousing', value: 'warehousing', count: 98 },
  { label: 'Technology', value: 'technology', count: 76 }
];

export const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];