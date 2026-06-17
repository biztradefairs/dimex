// components/FormFields.tsx

import React from 'react';

export const Icons = {
    user: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    email: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    building: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    briefcase: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    grid: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    phone: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    ),
    web: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
    ),
    box: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
};

interface InputFieldProps {
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export function InputField({
    label,
    required = false,
    icon,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    className = '',
}: InputFieldProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className={`w-full ${icon ? 'pl-9' : 'px-3'} py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-800 placeholder:text-gray-400`}
                />
            </div>
        </div>
    );
}

interface SelectFieldProps {
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    className?: string;
}

export function SelectField({
    label,
    required = false,
    icon,
    name,
    value,
    onChange,
    children,
    className = '',
}: SelectFieldProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {icon}
                    </span>
                )}
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full ${icon ? 'pl-9' : 'px-3'} py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-800 appearance-none`}
                >
                    {children}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>
        </div>
    );
}

interface PhoneFieldProps {
    label: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    maxLength?: number;
    hint?: string;
    className?: string;
}

export function PhoneField({
    label,
    required = false,
    name,
    value,
    onChange,
    placeholder,
    maxLength,
    hint,
    className = '',
}: PhoneFieldProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    {Icons.phone}
                </span>
                <input
                    type="tel"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-800 placeholder:text-gray-400`}
                />
            </div>
            {hint && <p className="text-xs text-gray-500">{hint}</p>}
        </div>
    );
}

// Define the types for location data
export interface LocationItem {
    id: string;
    name: string;
}

interface LocationFieldsProps {
    prefix: string;
    country: string;
    state: string;
    city: string;
    onCountryChange: (value: string) => void;
    onStateChange: (value: string) => void;
    onCityChange: (value: string) => void;
    countries: LocationItem[];
    states: LocationItem[];
    cities: LocationItem[];
    countriesLoading: boolean;
    statesLoading: boolean;
    citiesLoading: boolean;
    layout?: '1+2' | '3-col';
}

export function LocationFields({
    prefix,
    country,
    state,
    city,
    onCountryChange,
    onStateChange,
    onCityChange,
    countries,
    states,
    cities,
    countriesLoading,
    statesLoading,
    citiesLoading,
    layout = '1+2',
}: LocationFieldsProps) {
    const countrySelect = (
        <SelectField
            label="Country"
            required
            icon={Icons.grid}
            name={`${prefix}-country`}
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
        >
            <option value="">Select Country</option>
            {countriesLoading ? (
                <option disabled>Loading countries...</option>
            ) : (
                countries.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))
            )}
        </SelectField>
    );

    const stateSelect = (
        <SelectField
            label="State"
            required
            icon={Icons.grid}
            name={`${prefix}-state`}
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
        >
            <option value="">Select State</option>
            {statesLoading ? (
                <option disabled>Loading states...</option>
            ) : (
                states.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))
            )}
        </SelectField>
    );

    const citySelect = (
        <SelectField
            label="City"
            required
            icon={Icons.grid}
            name={`${prefix}-city`}
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
        >
            <option value="">Select City</option>
            {citiesLoading ? (
                <option disabled>Loading cities...</option>
            ) : (
                cities.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))
            )}
        </SelectField>
    );

    if (layout === '1+2') {
        return (
            <>
                {countrySelect}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stateSelect}
                    {citySelect}
                </div>
            </>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {countrySelect}
            {stateSelect}
            {citySelect}
        </div>
    );
}

interface ConsentCheckboxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    children: React.ReactNode;
}

export function ConsentCheckbox({
    id,
    name,
    checked,
    onChange,
    required = false,
    children,
}: ConsentCheckboxProps) {
    return (
        <div className="flex items-start gap-3">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                required={required}
                className="mt-0.5 h-4 w-4 accent-[#1e3a6e] cursor-pointer shrink-0"
            />
            <label htmlFor={id} className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                {children}
            </label>
        </div>
    );
}

interface SubmitButtonProps {
    loading: boolean;
    label: string;
    showArrow?: boolean;
}

export function SubmitButton({ loading, label, showArrow = true }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-semibold text-white transition-all text-sm ${loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-[#1e3a6e] hover:bg-[#152d57] active:scale-[0.98]'
                }`}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                </>
            ) : (
                <>
                    {label}
                    {showArrow && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    )}
                </>
            )}
        </button>
    );
}