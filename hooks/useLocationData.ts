// hooks/useLocationData.ts
"use client"

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Country { name: string; }
interface State { name: string; }
interface City { name: string; }

export function useLocationData(country: string, state: string) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
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
                        .map((item: any) => ({ name: item.name || '' }))
                        .filter((c: Country) => c.name)
                        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
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
                        .map((s: any) => ({ name: s.name }))
                        .sort((a: State, b: State) => a.name.localeCompare(b.name));
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
                        .map((c: string) => ({ name: c }))
                        .sort((a: City, b: City) => a.name.localeCompare(b.name));
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

const FALLBACK_COUNTRIES: Country[] = [
    { name: 'India' }, { name: 'United States' }, { name: 'United Kingdom' },
    { name: 'Germany' }, { name: 'France' }, { name: 'China' },
    { name: 'Japan' }, { name: 'Australia' }, { name: 'Canada' },
];
