// components/ExhibitorForm.tsx
"use client"

import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import ThankYouPopup from '@/components/ThankYouPopup';
import { useLocationData } from '@/hooks/useLocationData';
import { useUTMData } from '@/hooks/useUTMTracker';
import {
    InputField, SelectField, PhoneField,
    LocationFields, SubmitButton, Icons,
} from '@/components/FormFields';
import { submitContactForm, PROJECT_ID_VAR } from '@/lib/graphql-client';

const STAND_SIZES = [
    '9 sqm (3x3)', '12 sqm (3x4)', '15 sqm (3x5)', '18 sqm (3x6)',
    '20 sqm (4x5)', '24 sqm (4x6)', '30 sqm (5x6)', '36 sqm (6x6)', 'Custom Size',
];

const PRODUCT_SECTORS = [
    'Additive Manufacturing - 3D Printing',
    'CNC Milling / Machining Centre, EDM',
    'Cutting Tools',
    'Heat Treatment',
    'Hot Runner System',
    'Injection Moulding Machine',
    'Inspection and Quality Systems, CMM',
    'Machine Tools & Accessories for Dies and Moulds',
    'Mechanical Presses for Sheet Metal Components',
    'Raw Material Suppliers (Tool Steel)',
    'Texturizing, Polishing & Plating',
    'CAD/CAM/CAE, Simulation',
    'Mould Base',
    'Tool Room - Die Casting Dies & Rubber Moulds',
    'Tool Room - Jig, Fixture and Gauges',
    'Tool Room - Sheet Metal Dies / Sheet metal Components',
];

const INDUSTRIES = ['Automotive', 'Plastics', 'Aerospace', 'Electronics', 'Manufacturing', 'Logistics', 'Other'];
const INTEREST_LEVELS = [
    'Ready to book my stand',
    'Looking for more information',
    'Looking for sponsorship opportunities',
];

export default function ExhibitorForm() {
    const recaptchaRef = useRef<any>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showThanks, setShowThanks] = useState(false);
    const { utmData, campaign } = useUTMData();

    const [form, setForm] = useState({
        interestLevel: '',
        contactPerson: '',
        companyName: '',
        jobTitle: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        standSize: '',
        industry: '',
        productSector: [] as string[],
        message: '',
    });

    const { countries, states, cities, countriesLoading, statesLoading, citiesLoading } =
        useLocationData(form.country, form.state);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm(prev => ({
                ...prev,
                productSector: checked
                    ? [...prev.productSector, name]
                    : prev.productSector.filter(s => s !== name),
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaToken) return toast.error('Please complete the CAPTCHA');
        if (!form.productSector.length) return toast.error('Please select at least one product sector');
        setLoading(true);
        try {
            const result = await submitContactForm(
                PROJECT_ID_VAR.projectId,
                {
                        // Form fields
                        firstName: form.contactPerson?.split(' ')[0] || '',
                        lastName: form.contactPerson?.split(' ').slice(1).join(' ') || '',
                        contactPerson: form.contactPerson,
                        companyName: form.companyName,
                        jobTitle: form.jobTitle,
                        email: form.email,
                        phone: form.phone,
                        country: form.country,
                        state: form.state,
                        city: form.city,
                        standSize: form.standSize,
                        industry: form.industry,
                        productSector: form.productSector,
                        message: form.message,
                        interestLevel: form.interestLevel,
                        formType: 'exhibitor-enquiry',
                        captchaToken,
                        submittedAt: new Date().toISOString(),
                        // UTM Tracking Data
                        utmSource: utmData?.utm_source || '',
                        utmMedium: utmData?.utm_medium || '',
                        utmCampaign: utmData?.utm_campaign || '',
                        utmTerm: utmData?.utm_term || '',
                        utmContent: utmData?.utm_content || '',
                        utmId: utmData?.utm_id || '',
                        referrer: utmData?.referrer || '',
                        landingPage: utmData?.landingPage || '',
                        utmTimestamp: utmData?.timestamp || '',
                        // CMS Campaign Data
                        cmsCampaignId: campaign?.id || '',
                        cmsCampaignName: campaign?.name || '',
                        cmsCampaignSource: campaign?.utm_source || '',
                        cmsCampaignMedium: campaign?.utm_medium || '',
                }
            );

            if (result.errors) {
                toast.error(result.errors[0]?.message || 'Failed to submit');
                return;
            }

            const data = result.data?.submitContact;
            if (data?.success) {
                toast.success('Enquiry submitted! Our team will contact you soon.');
                setShowThanks(true);
                setForm({
                    interestLevel: '', contactPerson: '', companyName: '', jobTitle: '',
                    email: '', phone: '', country: '', state: '', city: '',
                    standSize: '', industry: '', productSector: [], message: '',
                });
                setCaptchaToken(null);
                recaptchaRef.current?.reset();
            } else {
                toast.error(data?.message || 'Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 tracking-wide">
                        Interest Level <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                        {INTEREST_LEVELS.map(v => (
                            <label key={v} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="interestLevel"
                                    value={v}
                                    checked={form.interestLevel === v}
                                    onChange={handleChange}
                                    required
                                    className="h-4 w-4 accent-[#1e3a6e] cursor-pointer"
                                />
                                <span className="text-sm text-gray-700">{v}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Company Name" required icon={Icons.building}
                        type="text" name="companyName" value={form.companyName}
                        onChange={handleChange} placeholder="Your company name"
                    />
                    <InputField
                        label="Contact Person" required icon={Icons.user}
                        type="text" name="contactPerson" value={form.contactPerson}
                        onChange={handleChange} placeholder="Full name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Job Title" required icon={Icons.briefcase}
                        type="text" name="jobTitle" value={form.jobTitle}
                        onChange={handleChange} placeholder="Your job title"
                    />
                    <InputField
                        label="Work Email" required icon={Icons.email}
                        type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="name@company.com"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PhoneField
                        label="Phone Number" required
                        name="phone" value={form.phone}
                        onChange={handleChange} placeholder="98765 43210"
                    />
                    <SelectField
                        label="Industry" required icon={Icons.grid}
                        name="industry" value={form.industry}
                        onChange={handleChange}
                    >
                        <option value="">Select an industry</option>
                        {INDUSTRIES.map(o => <option key={o} value={o}>{o}</option>)}
                    </SelectField>
                </div>

                <LocationFields
                    prefix="ex"
                    country={form.country} state={form.state} city={form.city}
                    onCountryChange={(v: any) => setForm(p => ({ ...p, country: v, state: '', city: '' }))}
                    onStateChange={(v: any) => setForm(p => ({ ...p, state: v, city: '' }))}
                    onCityChange={(v: any) => setForm(p => ({ ...p, city: v }))}
                    countries={countries} states={states} cities={cities}
                    countriesLoading={countriesLoading} statesLoading={statesLoading} citiesLoading={citiesLoading}
                    layout="1+2"
                />

                <SelectField
                    label="Booth Size Interested In" required icon={Icons.grid}
                    name="standSize" value={form.standSize}
                    onChange={handleChange}
                >
                    <option value="">Select booth size</option>
                    {STAND_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </SelectField>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 tracking-wide">
                        Products / Services <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400 pointer-events-none z-10">
                            {Icons.box}
                        </span>
                        <div className="border border-gray-300 rounded-lg pl-9 pr-3 py-3 max-h-36 overflow-y-auto bg-white">
                            {PRODUCT_SECTORS.map(s => (
                                <label key={s} className="flex items-center gap-2.5 py-1.5 cursor-pointer hover:bg-gray-50 px-1 rounded">
                                    <input
                                        type="checkbox"
                                        name={s}
                                        checked={form.productSector.includes(s)}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-[#1e3a6e] shrink-0 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">{s}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 tracking-wide">Message (If any)</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us more about your requirements..."
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-800 placeholder:text-gray-400 resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <input type="checkbox" id="ex-terms" required
                            className="mt-0.5 h-4 w-4 accent-[#1e3a6e] cursor-pointer shrink-0" />
                        <label htmlFor="ex-terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                            I confirm that I have read, understood and agree to the{' '}
                            <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>.{' '}
                            <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div className="flex items-start gap-3">
                        <input type="checkbox" id="ex-privacy"
                            className="mt-0.5 h-4 w-4 accent-[#1e3a6e] cursor-pointer shrink-0" />
                        <label htmlFor="ex-privacy" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                            By submitting this form, I agree that the event organizers may contact me with updates and relevant
                            information about this event.{' '}
                            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                        </label>
                    </div>
                </div>

                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                    <div className="rounded border bg-gray-50 p-4">
                        <div className="flex justify-center pt-4">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                onChange={(token) => setCaptchaToken(token)}
                                onExpired={() => setCaptchaToken(null)}
                            />
                        </div>
                    </div>
                )}

                <SubmitButton loading={loading} label="Submit" />
            </form>

            <ThankYouPopup
                isVisible={showThanks}
                onClose={() => setShowThanks(false)}
                name={form.contactPerson?.split(' ')[0] || 'Visitor'}
            />
        </>
    );
}