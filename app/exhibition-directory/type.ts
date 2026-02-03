export interface Company {
  id: string;
  name: string;
  shortName?: string;
  pavilion: string;
  hall: string;
  standNumber: string;
  country: string;
  countryCode: string;
  sector: string[];
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface KeySector {
  name: string;
  color: string;
  companies?: Company[];
}