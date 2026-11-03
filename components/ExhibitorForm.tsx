// components/ExhibitorForm.tsx
"use client"

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLocationData } from '@/hooks/useLocationData';
import { useUTMData } from '@/hooks/useUTMTracker';
import {
    InputField, SelectField, PhoneField,
    LocationFields, SubmitButton, Icons,
} from '@/components/FormFields';
import { saveThanksSession, submitRegistrationInBackground } from '@/lib/submitRegistration';

const STAND_SIZES = [
    '9 sqm (3x3)', '12 sqm (3x4)', '15 sqm (3x5)', '18 sqm (3x6)',
    '20 sqm (4x5)', '24 sqm (4x6)', '30 sqm (5x6)', '36 sqm (6x6)', 'Custom Size',
];

const INDUSTRIES = ['Automotive', 'Plastics', 'Aerospace', 'Electronics', 'Manufacturing', 'Logistics', 'Other'];

type ExhibitorFormProps = {
    variant?: 'full' | 'popup';
    initialStandSize?: string;
};

export default function ExhibitorForm({ variant = 'full', initialStandSize = '' }: ExhibitorFormProps) {
    const isPopup = variant === 'popup';
    const router = useRouter();
    const recaptchaRef = useRef<any>(null);
    const submissionStarted = useRef(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { utmData, campaign } = useUTMData();

    useEffect(() => {
        if (isPopup) router.prefetch('/register/thank-you?t=exhibitor');
    }, [isPopup, router]);

    const [form, setForm] = useState({
        contactPerson: '',
        companyName: '',
        jobTitle: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        standSize: STAND_SIZES.includes(initialStandSize) ? initialStandSize : '',
        industry: '',
    });

    const { countries, states, cities, countriesLoading, statesLoading, citiesLoading } =
        useLocationData(form.country, form.state);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submissionStarted.current) return;
        if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
            return toast.error('Please complete the CAPTCHA');
        }
        submissionStarted.current = true;
        setLoading(true);
        try {
            const payload = {
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
                formType: 'exhibitor-enquiry',
                captchaToken,
                submittedAt: new Date().toISOString(),
                utmSource: utmData?.utm_source || '',
                utmMedium: utmData?.utm_medium || '',
                utmCampaign: utmData?.utm_campaign || '',
                utmTerm: utmData?.utm_term || '',
                utmContent: utmData?.utm_content || '',
                utmId: utmData?.utm_id || '',
                referrer: utmData?.referrer || '',
                landingPage: utmData?.landingPage || '',
                utmTimestamp: utmData?.timestamp || '',

                cmsCampaignId: campaign?.id || '',
                cmsCampaignName: campaign?.name || '',
                cmsCampaignSource: campaign?.utm_source || '',
                cmsCampaignMedium: campaign?.utm_medium || '',
            };

            // Keep the database save and confirmation email independent of navigation.
            submitRegistrationInBackground(payload);
            const firstName = form.contactPerson?.split(' ')[0] || 'Visitor';
            saveThanksSession({ name: firstName, tab: 'exhibitor', email: form.email });
            router.push(`/register/thank-you?t=exhibitor&name=${encodeURIComponent(firstName)}`);
        } catch (error) {
            submissionStarted.current = false;
            console.error(error);
            toast.error("Network error. Please check your connection.");
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <input type="checkbox" id="ex-terms" required
                            className="mt-0.5 h-4 w-4 accent-[#004A96] cursor-pointer shrink-0" />
                        <label htmlFor="ex-terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                            I confirm that I have read, understood and agree to the{' '}
                            <a href={isPopup ? "/termstouse" : "/terms"} className="text-[#004A96] hover:underline">Terms & Conditions</a>.{' '}
                            <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div className="flex items-start gap-3">
                        <input type="checkbox" id="ex-privacy"
                            className="mt-0.5 h-4 w-4 accent-[#004A96] cursor-pointer shrink-0" />
                        <label htmlFor="ex-privacy" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                            By submitting this form, I agree that the event organizers may contact me with updates and relevant
                            information about this event.{' '}
                            <a href="/privacy-policy" className="text-[#004A96] hover:underline">Privacy Policy</a>.
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
        </>
    );
}