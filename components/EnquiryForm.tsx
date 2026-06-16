// components/EnquiryForm.tsx
"use client"

import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import ThankYouPopup from '@/components/ThankYouPopup';
import { useLocationData } from '@/hooks/useLocationData';
import {
    InputField, SelectField, PhoneField,
    LocationFields, SubmitButton, Icons,
} from '@/components/FormFields';

const VISITOR_PROFILES = [
    { value: 'Automotive', label: 'Automotive (Auto OEMs, Auto Ancillary)' },
    { value: 'Consumer Appliances', label: 'Consumer Appliances' },
    { value: 'Electricals', label: 'Electricals' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Packaging', label: 'Packaging' },
    { value: 'Plastic Processing', label: 'Plastic Processing' },
    { value: 'Logistics', label: 'Logistics & Supply Chain' },
    { value: 'Warehousing', label: 'Warehousing & Storage' },
    { value: 'Transport', label: 'Transport Services' },
    { value: 'IT Solutions', label: 'IT Solutions' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail & E-commerce' },
    { value: 'Consulting', label: 'Consulting Services' },
];

export default function EnquiryForm() {
    const recaptchaRef = useRef<any>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTerms] = useState(false);
    const [showThanks, setShowThanks] = useState(false);

    const [form, setForm] = useState({
        name: '', designation: '', company: '', address: '',
        pincode: '', email: '', mobile: '', profile: '', promocode: '',
        country: '', state: '', city: '',
    });

    const { countries, states, cities, countriesLoading, statesLoading, citiesLoading } =
        useLocationData(form.country, form.state);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!termsAccepted) return toast.error('Please accept the terms and conditions');
        if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
            return toast.error('Please complete the CAPTCHA');
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    firstName: form.name.split(' ')[0] || '',
                    lastName: form.name.split(' ').slice(1).join(' ') || '',
                    formType: 'visitor-registration',
                    captchaToken,
                    submittedAt: new Date().toISOString(),
                }),
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Registration submitted successfully!');
                setShowThanks(true);
                setForm({
                    name: '', designation: '', company: '', address: '', pincode: '',
                    email: '', mobile: '', profile: '', promocode: '',
                    country: '', state: '', city: '',
                });
                setTerms(false);
                setCaptchaToken(null);
                recaptchaRef.current?.reset();
            } else {
                toast.error(result.message || 'Failed to submit. Please try again.');
            }
        } catch {
            toast.error('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">

                <InputField
                    label="Contact Person" required icon={Icons.user}
                    type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Full name"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Job Title" required icon={Icons.briefcase}
                        type="text" name="designation" value={form.designation}
                        onChange={handleChange} placeholder="Your job title"
                    />
                    <InputField
                        label="Company Name" required icon={Icons.building}
                        type="text" name="company" value={form.company}
                        onChange={handleChange} placeholder="Your company name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Work Email" required icon={Icons.email}
                        type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="name@company.com"
                    />
                    <PhoneField
                        label="Phone Number" required
                        name="mobile" value={form.mobile}
                        onChange={handleChange} placeholder="98765 43210"
                    />
                </div>

                {/* Location */}
                <LocationFields
                    prefix="en"
                    country={form.country} state={form.state} city={form.city}
                    onCountryChange={(v: any) => setForm(p => ({ ...p, country: v, state: '', city: '' }))}
                    onStateChange={(v: any) => setForm(p => ({ ...p, state: v, city: '' }))}
                    onCityChange={(v: any) => setForm(p => ({ ...p, city: v }))}
                    countries={countries} states={states} cities={cities}
                    countriesLoading={countriesLoading} statesLoading={statesLoading} citiesLoading={citiesLoading}
                    layout="1+2"
                />

                {/* Profile */}
                <SelectField
                    label="Profile" required icon={Icons.grid}
                    name="profile" value={form.profile}
                    onChange={handleChange}
                >
                    <option value="">Select your industry profile</option>
                    {VISITOR_PROFILES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </SelectField>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                    <input
                        type="checkbox"
                        id="enq-terms"
                        checked={termsAccepted}
                        onChange={e => setTerms(e.target.checked)}
                        required
                        className="mt-0.5 h-4 w-4 accent-[#1e3a6e] cursor-pointer shrink-0"
                    />
                    <label htmlFor="enq-terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                        I confirm that I have read, understood and agree to the{' '}
                        <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>.{' '}
                        <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="rounded border bg-gray-50 p-4">
                    <div className="flex justify-center pt-4">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={(token) => setCaptchaToken(token)}
                            onExpired={() => setCaptchaToken(null)}
                        />
                    </div>
                </div>

                <SubmitButton loading={loading} label="Submit" />
            </form>

            <ThankYouPopup
                isVisible={showThanks}
                onClose={() => setShowThanks(false)}
                name={form.name.split(' ')[0] || 'Visitor'}
            />
        </>
    );
}
