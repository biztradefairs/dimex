// app/exhibition-directory/api.ts

// Define the Metadata interface
interface Metadata {
  address_country?: string;
  address?: {
    country?: string;
    countryCode?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  address_country_code?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_postal_code?: string;
  hall?: string;
  exhibition?: {
    hall?: string;
    pavilion?: string;
    standNumber?: string;
  };
  shortName?: string;
  short_name?: string;
  pavilion?: string;
  logoUrl?: string;
  about?: string;
  description?: string;
  website?: string;
  phone?: string;
  email?: string;
  contact_name?: string;
  contact_job_title?: string;
  contactPerson?: {
    name?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    alternatePhone?: string;
  };
}

export interface ExhibitionCompany {
  [x: string]: any;
  id: string;
  name: string;        // This is the exhibitor/person name
  company: string;     // This is the actual company name
  shortName?: string;
  pavilion: string;
  hall?: string;
  standNumber: string;
  country: string;
  countryCode?: string;
  fullAddress?: string;
  sector: string[];
  boothNumber?: string;
  logo?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  contactPerson?: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    alternatePhone?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  title?: string;
  description: string;
  category?: string;
  price?: string;
  imageUrl?: string;
  specifications?: Record<string, string>;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
}

export interface Brochure {
  id: string;
  name: string;
  title?: string;
  description?: string;
  fileUrl: string;
  url?: string;
  fileSize?: string;
  downloads?: number;
  uploadedAt?: Date;
}

// API Base URL
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://diemex-backend.onrender.com'
).replace(/\/+$/, '').replace(/\/api$/i, '');

type ResourceName = 'products' | 'brands' | 'brochures';
type ResourceRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ResourceRecord {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function toText(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function firstText(...values: unknown[]): string {
  for (const value of values) {
    const text = toText(value).trim();
    if (text) return text;
  }
  return '';
}

async function fetchExhibitorCollection(exhibitorId: string, resource: ResourceName): Promise<ResourceRecord[]> {
  const response = await fetch(API_BASE_URL + '/api/exhibitors/' + encodeURIComponent(exhibitorId) + '/' + resource, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = isRecord(result) ? firstText(result.error, result.message) : '';
    throw new Error(message || 'Failed to fetch ' + resource + ' (' + response.status + ').');
  }
  if (!isRecord(result) || result.success !== true) {
    const message = isRecord(result) ? firstText(result.error, result.message) : '';
    throw new Error(message || 'Invalid ' + resource + ' response.');
  }
  const data = isRecord(result.data) ? result.data : undefined;
  const candidates: unknown[] = [result.data, data?.[resource], data?.items, data?.data, result[resource], result.items];
  const collection = candidates.find((candidate): candidate is unknown[] => Array.isArray(candidate));
  if (collection) return collection.filter(isRecord);
  if (result.data == null) return [];
  throw new Error('The ' + resource + ' response did not contain a list.');
}

function getAssetUrl(...values: unknown[]): string {
  for (const value of values) {
    const candidate = typeof value === 'string'
      ? value.trim()
      : isRecord(value)
        ? firstText(value.url, value.secure_url, value.path, value.fileUrl)
        : '';
    if (!candidate) continue;
    if (/^(https?:|data:|blob:)/i.test(candidate)) return candidate;
    return API_BASE_URL + (candidate.startsWith('/') ? '' : '/') + candidate;
  }
  return '';
}

function normalizeSpecifications(value: unknown): Record<string, string> {
  if (typeof value === 'string') {
    try { value = JSON.parse(value) as unknown; } catch { return {}; }
  }
  if (!isRecord(value)) return {};
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, item == null ? '' : String(item)]));
}

// Helper function to safely access metadata properties
function getMetadataValue(metadata: any, path: string[]): any {
  let current = metadata;
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export interface ExhibitionCompanyRecord {
  id: string;
  name?: string;
  company?: string;
  metadata?: Metadata | string | null;
  sector?: string | string[] | null;
  logoUrl?: string;
  country?: string;
  countryCode?: string;
  hall?: string;
  shortName?: string;
  pavilion?: string;
  description?: string;
  about?: string;
  website?: string;
  email?: string;
  phone?: string;
  boothNumber?: string;
  booth?: string;
}

export function mapExhibitionCompany(exhibitor: ExhibitionCompanyRecord): ExhibitionCompany {
  // Parse metadata safely
  let metadata: Metadata = {};
  if (exhibitor.metadata) {
    try {
      metadata = typeof exhibitor.metadata === 'string'
        ? JSON.parse(exhibitor.metadata)
        : exhibitor.metadata;
    } catch (e) {
      metadata = {};
    }
  }

  // Parse sector
  let sectorArray: string[] = [];
  if (exhibitor.sector) {
    if (typeof exhibitor.sector === 'string') {
      sectorArray = exhibitor.sector.split(',').map((s: string) => s.trim()).filter(Boolean);
    } else if (Array.isArray(exhibitor.sector)) {
      sectorArray = exhibitor.sector;
    }
  }

  // Get logo URL
  const logoUrl = metadata?.logoUrl || exhibitor.logoUrl || '';

  // Get country
  let country = 'Not specified';
  if (metadata.address_country) {
    country = metadata.address_country;
  } else if (metadata.address?.country) {
    country = metadata.address.country;
  } else if (exhibitor.country) {
    country = exhibitor.country;
  }

  // Get full address
  let fullAddress = '';
  const street = metadata.address_street || metadata.address?.street || '';
  const city = metadata.address_city || metadata.address?.city || '';
  const state = metadata.address_state || metadata.address?.state || '';
  const postalCode = metadata.address_postal_code || metadata.address?.postalCode || '';
  const addressCountry = country;

  const addressParts = [street, city, state, postalCode, addressCountry].filter(part => part && part !== 'Not specified');
  fullAddress = addressParts.join(', ');

  // Get country code
  let countryCode = '';
  if (metadata.address_country_code) {
    countryCode = metadata.address_country_code;
  } else if (metadata.address?.countryCode) {
    countryCode = metadata.address.countryCode;
  } else if (exhibitor.countryCode) {
    countryCode = exhibitor.countryCode;
  }

  // Get hall
  let hall = '';
  if (metadata.hall) {
    hall = metadata.hall;
  } else if (metadata.exhibition?.hall) {
    hall = metadata.exhibition.hall;
  } else if (exhibitor.hall) {
    hall = exhibitor.hall;
  }

  // Get short name
  let shortName = '';
  if (metadata.shortName) {
    shortName = metadata.shortName;
  } else if (metadata.short_name) {
    shortName = metadata.short_name;
  } else if (exhibitor.shortName) {
    shortName = exhibitor.shortName;
  }

  // Get pavilion
  let pavilion = 'Not assigned';
  if (metadata.pavilion) {
    pavilion = metadata.pavilion;
  } else if (metadata.exhibition?.pavilion) {
    pavilion = metadata.exhibition.pavilion;
  } else if (exhibitor.pavilion) {
    pavilion = exhibitor.pavilion;
  }

  // Get description
  let description = '';
  if (metadata.about) {
    description = metadata.about;
  } else if (metadata.description) {
    description = metadata.description;
  } else if (exhibitor.about) {
    description = exhibitor.about;
  } else if (exhibitor.description) {
    description = exhibitor.description;
  }

  // Get website
  let website = '';
  if (metadata.website) {
    website = metadata.website;
  } else if (exhibitor.website) {
    website = exhibitor.website;
  }

  // Get contact person
  let contactPerson = {
    name: metadata.contact_name || metadata.contactPerson?.name || exhibitor.name || '',
    jobTitle: metadata.contact_job_title || metadata.contactPerson?.jobTitle || '',
    email: metadata.email || metadata.contactPerson?.email || exhibitor.email || '',
    phone: metadata.phone || metadata.contactPerson?.phone || exhibitor.phone || '',
    alternatePhone: metadata.contactPerson?.alternatePhone || ''
  };

  return {
    id: exhibitor.id,
    name: exhibitor.name || 'Unknown',  // Person's name
    company: exhibitor.company || exhibitor.name || 'Unknown Company',  // Actual company name
    shortName: shortName,
    pavilion: pavilion,
    hall: hall,
    standNumber: exhibitor.boothNumber || exhibitor.booth || 'Not assigned',
    country: country,
    countryCode: countryCode,
    fullAddress: fullAddress,
    sector: sectorArray.length > 0 ? sectorArray : ['General'],
    boothNumber: exhibitor.boothNumber,
    logo: logoUrl,
    description: description,
    website: website,
    email: exhibitor.email,
    phone: exhibitor.phone,
    contactPerson: contactPerson
  };
}

// Function to fetch complete exhibitor data by ID
export async function fetchCompleteExhibitorData(exhibitorId: string): Promise<ExhibitionCompany | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/exhibitors/${exhibitorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (!result.success) {
      return null;
    }

    const exhibitor = result.data;

    return mapExhibitionCompany(exhibitor);
  } catch (error) {
    console.error('Error fetching complete exhibitor data:', error);
    return null;
  }
}

export async function fetchExhibitionCompanies(
  page: number = 1,
  limit: number = 24,
  search: string = '',
  letter: string = ''
): Promise<{ companies: ExhibitionCompany[]; total: number; totalPages: number }> {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) {
      params.append('search', search);
    }
    params.append('status', 'active');
    if (letter) params.append('letter', letter);

    const response = await fetch(`${API_BASE_URL}/api/exhibitors?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch exhibitors');
    }

    const basicCompanies = result.data || [];
    console.log(`🔄 Fetching complete details for ${basicCompanies.length} companies...`);

    // Fetch complete details for each company in parallel
    const companiesWithDetails = await Promise.all(
      basicCompanies.map(async (basic: any) => {
        try {
          const completeData = await fetchCompleteExhibitorData(basic.id);
          if (completeData) {
            return completeData;
          }
          // Fallback to basic data if complete fetch fails
          return {
            id: basic.id,
            name: basic.name || 'Unknown',
            company: basic.company || basic.name || 'Unknown Company',
            pavilion: 'Not assigned',
            hall: '',
            standNumber: basic.boothNumber || basic.booth || 'Not assigned',
            country: 'Not specified',
            countryCode: '',
            fullAddress: '',
            sector: ['General'],
            logo: '',
            description: '',
            website: '',
            email: basic.email,
            phone: basic.phone
          };
        } catch (error) {
          console.error(`❌ Failed to fetch details for ${basic.name}`);
          return {
            id: basic.id,
            name: basic.name || 'Unknown',
            company: basic.company || basic.name || 'Unknown Company',
            pavilion: 'Not assigned',
            hall: '',
            standNumber: basic.boothNumber || basic.booth || 'Not assigned',
            country: 'Not specified',
            countryCode: '',
            fullAddress: '',
            sector: ['General'],
            logo: '',
            description: '',
            website: '',
            email: basic.email,
            phone: basic.phone
          };
        }
      })
    );

    return {
      companies: companiesWithDetails,
      total: result.pagination?.total || companiesWithDetails.length,
      totalPages: result.pagination?.totalPages || 1
    };
  } catch (error) {
    console.error('Error fetching exhibitors:', error);

    throw error;
  }
}

// Fetch single company by ID
export async function fetchExhibitionCompanyById(id: string): Promise<ExhibitionCompany> {
  const completeData = await fetchCompleteExhibitorData(id);
  if (!completeData) {
    throw new Error('Failed to fetch exhibitor');
  }
  return completeData;
}

export async function fetchExhibitorProducts(exhibitorId: string): Promise<Product[]> {
  const products = await fetchExhibitorCollection(exhibitorId, 'products');
  return products.map((product, index) => {
    const name = firstText(product.name, product.title) || 'Product';
    return {
      id: firstText(product.id, product._id) || 'product-' + index,
      name,
      title: firstText(product.title, product.name) || name,
      description: firstText(product.description, product.details, product.summary),
      category: firstText(product.category, product.type),
      price: firstText(product.price),
      imageUrl: getAssetUrl(product.imageUrl, product.image_url, product.image, product.photo),
      specifications: normalizeSpecifications(product.specifications || product.specs),
    };
  });
}

export async function fetchExhibitorBrochures(exhibitorId: string): Promise<Brochure[]> {
  const brochures = await fetchExhibitorCollection(exhibitorId, 'brochures');
  return brochures.map((brochure, index) => {
    const fileUrl = getAssetUrl(brochure.fileUrl, brochure.file_url, brochure.url, brochure.file, brochure.path);
    const uploadedAt = firstText(brochure.uploadedAt, brochure.uploaded_at, brochure.createdAt);
    return {
      id: firstText(brochure.id, brochure._id) || 'brochure-' + index,
      name: firstText(brochure.name, brochure.title) || 'Brochure',
      title: firstText(brochure.title, brochure.name) || 'Brochure',
      description: firstText(brochure.description, brochure.details),
      fileUrl,
      url: fileUrl,
      fileSize: firstText(brochure.fileSize, brochure.file_size, brochure.size),
      downloads: Number(firstText(brochure.downloads)) || 0,
      uploadedAt: uploadedAt ? new Date(uploadedAt) : undefined,
    };
  });
}

export async function fetchExhibitorBrands(exhibitorId: string): Promise<Brand[]> {
  const brands = await fetchExhibitorCollection(exhibitorId, 'brands');
  return brands.map((brand, index) => ({
    id: firstText(brand.id, brand._id) || 'brand-' + index,
    name: firstText(brand.name, brand.title) || 'Brand',
    description: firstText(brand.description, brand.details),
    logoUrl: getAssetUrl(brand.logoUrl, brand.logo_url, brand.logo, brand.image),
  }));
}

// Mock data for development
function getMockCompanies(page: number, limit: number): { companies: ExhibitionCompany[]; total: number; totalPages: number } {
  const mockCompanies: ExhibitionCompany[] = [
    {
      id: '1',
      name: 'John Doe',
      company: 'Aow Logistics',
      shortName: 'AOW',
      pavilion: 'Pavilion 5',
      hall: 'Hall D',
      standNumber: 'A-101',
      country: 'India',
      countryCode: 'IN',
      fullAddress: 'BTM 2nd Stage, Bengaluru, Karnataka, 560076, India',
      sector: ['Logistics', 'Supply Chain'],
      boothNumber: 'A-101',
      description: 'Leading logistics and supply chain solutions provider with over 20 years of experience in global freight forwarding, warehousing, and distribution services.',
      website: 'https://aowlogistics.com',
      email: 'info@aowlogistics.com',
      phone: '+91 8617461530',
      logo: 'https://placehold.co/200x200/0066cc/white?text=AOW'
    }
  ];

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedCompanies = mockCompanies.slice(start, end);
  const totalPages = Math.ceil(mockCompanies.length / limit);

  return {
    companies: paginatedCompanies,
    total: mockCompanies.length,
    totalPages: totalPages
  };
}
