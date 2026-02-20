import axios from "axios";
import { exhibitorsAPI, Exhibitor } from "@/lib/api/exhibitors";

/* =========================================================
   AXIOS INSTANCE (REUSE SAME PATTERN)
========================================================= */

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://diemex-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("exhibitor_token") ||
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* =========================================================
   TYPES
========================================================= */

export interface ExhibitionCompany {
  id: string;
  name: string;
  shortName?: string;
  country: string;
  countryCode: string;
  pavilion: string;
  hall: string;
  standNumber: string;
  sector: string[];
  description?: string;
  website?: string;
  phone?: string;
  email?: string;
  logo?: string;
  products?: any[];
  brands?: any[];
  brochures?: any[];
}

/* =========================================================
   MAPPER
========================================================= */

const mapExhibitorToCompany = (
  exhibitor: Exhibitor
): ExhibitionCompany => {
  let country = "International";
  let countryCode = "INT";

  if (exhibitor.address) {
    const parts = exhibitor.address.split(",").map((p) => p.trim());
    if (parts.length > 0) {
      country = parts[parts.length - 1];
      countryCode = country.substring(0, 2).toUpperCase();
    }
  }

  const sectors =
    typeof exhibitor.sector === "string"
      ? exhibitor.sector.split(",").map((s) => s.trim())
      : [];

  return {
    id: exhibitor.id,
    name: exhibitor.company || exhibitor.name,
    shortName: exhibitor.name?.substring(0, 30),
    country,
    countryCode,
    pavilion: exhibitor.stallDetails?.pavilion || "Main Pavilion",
    hall: exhibitor.stallDetails?.hall || "Main Hall",
    standNumber: exhibitor.booth || exhibitor.boothNumber || "TBD",
    sector: sectors,
    description:
      exhibitor.stallDetails?.notes ||
      `Welcome to ${exhibitor.company}'s exhibition booth`,
    website: exhibitor.website,
    phone: exhibitor.phone,
    email: exhibitor.email,
    products: [],
    brands: [],
    brochures: [],
  };
};

/* =========================================================
   DIRECTORY API
========================================================= */

// Fetch all exhibitors (Directory Listing)
export const fetchExhibitionCompanies = async (
  page = 1,
  limit = 50,
  search?: string
) => {
  const response = await exhibitorsAPI.getAll({
    page,
    limit,
    search,
    status: "active",
  });

  return {
    companies: response.data.map(mapExhibitorToCompany),
    total: response.pagination.total,
    totalPages: response.pagination.totalPages,
  };
};

// Fetch single exhibitor
export const fetchExhibitionCompanyById = async (
  id: string
): Promise<ExhibitionCompany> => {
  if (!id) throw new Error("Exhibitor ID is required");

  const response = await exhibitorsAPI.getById(id);
  return mapExhibitorToCompany(response.data);
};

/* =========================================================
   PRODUCTS / BRANDS / BROCHURES
   (SAFE VERSION — NO UNDEFINED CALLS)
========================================================= */

export const fetchExhibitorProducts = async (
  exhibitorId: string
) => {
  if (!exhibitorId) return [];

  try {
    const response = await api.get(
      `/exhibitors/${exhibitorId}/products`
    );

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchExhibitorBrochures = async (
  exhibitorId: string
) => {
  if (!exhibitorId) return [];

  try {
    const response = await api.get(
      `/exhibitors/${exhibitorId}/brochures`
    );

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching brochures:", error);
    return [];
  }
};

export const fetchExhibitorBrands = async (
  exhibitorId: string
) => {
  if (!exhibitorId) return [];

  try {
    const response = await api.get(
      `/exhibitors/${exhibitorId}/brands`
    );

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};