// components/FormFields.tsx
"use client"

import React from 'react';

// ── Input with optional left icon ──────────────────────────────────────────
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
}

export function InputField({ label, required, icon, className = '', ...props }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative flex items-center">
                {icon && (
                    <span className="absolute left-3 text-gray-400 pointer-events-none flex items-center">
                        {icon}
                    </span>
                )}
                <input
                    {...props}
                    className={`
                        w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                        transition bg-white text-gray-800 placeholder:text-gray-400
                        ${icon ? 'pl-9' : ''}
                        ${className}
                    `}
                />
            </div>
        </div>
    );
}

// ── Select with optional left icon ────────────────────────────────────────
interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export function SelectField({ label, required, icon, children, className = '', ...props }: SelectFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative flex items-center">
                {icon && (
                    <span className="absolute left-3 text-gray-400 pointer-events-none flex items-center z-10">
                        {icon}
                    </span>
                )}
                <select
                    {...props}
                    className={`
                        w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                        transition bg-white text-gray-800 cursor-pointer
                        appearance-none
                        disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400
                        ${icon ? 'pl-9' : ''}
                        ${className}
                    `}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 10px center',
                        paddingRight: '28px',
                    }}
                >
                    {children}
                </select>
            </div>
        </div>
    );
}

// ── Phone field (fixed +91 India prefix) ──────────────────────────────────
interface PhoneFieldProps {
    label?: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    maxLength?: number;
    hint?: string;
}

export function PhoneField({
    label = 'Phone Number',
    required,
    name,
    value,
    onChange,
    placeholder = '98765 43210',
    maxLength,
    hint,
}: PhoneFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
                <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border-r border-gray-300 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-5 h-3.5 object-cover rounded-sm" />
                    <span className="text-sm font-semibold text-gray-700">+91</span>
                </div>
                <input
                    type="tel"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="flex-1 px-3 py-2.5 text-sm text-gray-900 bg-white outline-none placeholder:text-gray-400"
                />
            </div>
            {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
    );
}

// ── Checkbox consent block ────────────────────────────────────────────────
interface ConsentCheckboxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    children: React.ReactNode;
}

export function ConsentCheckbox({ id, name, checked, onChange, required, children }: ConsentCheckboxProps) {
    return (
        <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                required={required}
                className="mt-0.5 h-4 w-4 accent-[#1e3a6e] cursor-pointer shrink-0"
            />
            <label htmlFor={id} className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                {children}
            </label>
        </div>
    );
}

// ── Submit button ─────────────────────────────────────────────────────────
interface SubmitButtonProps {
    loading: boolean;
    label: string;
    loadingLabel?: string;
    showArrow?: boolean;
}

export function SubmitButton({ loading, label, loadingLabel = 'Processing...', showArrow = true }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a6e] hover:bg-[#163060] text-white font-semibold text-sm px-6 py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {loadingLabel}
                </>
            ) : (
                <>
                    {label}
                    {showArrow && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    )}
                </>
            )}
        </button>
    );
}

// ── Location dropdowns (Country / State / City) ───────────────────────────
interface LocationFieldsProps {
    prefix: string;
    country: string;
    state: string;
    city: string;
    onCountryChange: (val: string) => void;
    onStateChange: (val: string) => void;
    onCityChange: (val: string) => void;
    countries: { name: string }[];
    states: { name: string }[];
    cities: { name: string }[];
    countriesLoading: boolean;
    statesLoading: boolean;
    citiesLoading: boolean;
    layout?: '3-col' | '1+2';
}

export function LocationFields({
    prefix,
    country, state, city,
    onCountryChange, onStateChange, onCityChange,
    countries, states, cities,
    countriesLoading, statesLoading, citiesLoading,
    layout = '1+2',
}: LocationFieldsProps) {
    const GlobeIcon = (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );

    const countrySelect = (
        <SelectField
            label="Country"
            required
            icon={GlobeIcon}
            id={`${prefix}-country`}
            name="country"
            value={country}
            onChange={e => onCountryChange(e.target.value)}
        >
            <option value="">{countriesLoading ? 'Loading...' : 'Select Country'}</option>
            {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </SelectField>
    );

    const stateSelect = (
        <SelectField
            label="State"
            required
            id={`${prefix}-state`}
            name="state"
            value={state}
            onChange={e => onStateChange(e.target.value)}
            disabled={!country || statesLoading}
        >
            <option value="">{statesLoading ? 'Loading...' : !country ? 'Select country first' : 'Select State'}</option>
            {states.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
        </SelectField>
    );

    const citySelect = (
        <SelectField
            label="City"
            required
            id={`${prefix}-city`}
            name="city"
            value={city}
            onChange={e => onCityChange(e.target.value)}
            disabled={!state || citiesLoading}
        >
            <option value="">{citiesLoading ? 'Loading...' : !state ? 'Select state first' : 'Select City'}</option>
            {cities.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
        </SelectField>
    );

    if (layout === '3-col') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {countrySelect}
                {stateSelect}
                {citySelect}
            </div>
        );
    }

    return (
        <>
            <div>{countrySelect}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stateSelect}
                {citySelect}
            </div>
        </>
    );
}

// ── Inline SVG icons used across forms ────────────────────────────────────
export const Icons = {
    user: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    email: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    briefcase: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
    ),
    building: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    web: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    grid: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    box: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
    ),
};
