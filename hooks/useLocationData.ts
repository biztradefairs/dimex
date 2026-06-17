// hooks/useLocationData.ts
"use client"

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LocationItem } from '@/components/FormFields';

export function useLocationData(country: string, state: string) {
    const [countries, setCountries] = useState<LocationItem[]>([]);
    const [states, setStates] = useState<LocationItem[]>([]);
    const [cities, setCities] = useState<LocationItem[]>([]);
    const [countriesLoading, setCountriesLoading] = useState(false);
    const [statesLoading, setStatesLoading] = useState(false);
    const [citiesLoading, setCitiesLoading] = useState(false);

    // Fetch countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setCountriesLoading(true);
                const res = await fetch('https://countriesnow.space/api/v0.1/countries/positions');
                const result = await res.json();
                if (result.data?.length) {
                    const sorted = result.data
                        .map((item: any) => ({
                            id: item.name || '',
                            name: item.name || ''
                        }))
                        .filter((c: LocationItem) => c.name)
                        .sort((a: LocationItem, b: LocationItem) => a.name.localeCompare(b.name));
                    setCountries(sorted);
                } else {
                    setCountries(FALLBACK_COUNTRIES);
                }
            } catch {
                setCountries(FALLBACK_COUNTRIES);
                toast.error('Could not load countries. Using fallback list.');
            } finally {
                setCountriesLoading(false);
            }
        };
        fetchCountries();
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        const fetchStates = async () => {
            if (!country) {
                setStates([]);
                return;
            }
            try {
                setStatesLoading(true);
                const res = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country }),
                });
                const result = await res.json();
                if (result.data?.states?.length) {
                    const sorted = result.data.states
                        .map((s: any) => ({
                            id: s.name || '',
                            name: s.name || ''
                        }))
                        .sort((a: LocationItem, b: LocationItem) => a.name.localeCompare(b.name));
                    setStates(sorted);
                } else {
                    setStates([]);
                }
            } catch {
                toast.error('Failed to load states');
                setStates([]);
            } finally {
                setStatesLoading(false);
            }
        };
        fetchStates();
    }, [country]);

    // Fetch cities when state changes
    useEffect(() => {
        const fetchCities = async () => {
            if (!country || !state) {
                setCities([]);
                return;
            }
            try {
                setCitiesLoading(true);
                const res = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country, state }),
                });
                const result = await res.json();
                if (result.data?.length) {
                    const sorted = result.data
                        .map((c: string) => ({
                            id: c || '',
                            name: c || ''
                        }))
                        .sort((a: LocationItem, b: LocationItem) => a.name.localeCompare(b.name));
                    setCities(sorted);
                } else {
                    setCities([]);
                }
            } catch {
                toast.error('Failed to load cities');
                setCities([]);
            } finally {
                setCitiesLoading(false);
            }
        };
        fetchCities();
    }, [country, state]);

    return { countries, states, cities, countriesLoading, statesLoading, citiesLoading };
}

const FALLBACK_COUNTRIES: LocationItem[] = [
    { id: 'India', name: 'India' },
    { id: 'United States', name: 'United States' },
    { id: 'United Kingdom', name: 'United Kingdom' },
    { id: 'Germany', name: 'Germany' },
    { id: 'France', name: 'France' },
    { id: 'China', name: 'China' },
    { id: 'Japan', name: 'Japan' },
    { id: 'Australia', name: 'Australia' },
    { id: 'Canada', name: 'Canada' },
];