// components/SponsorForm.tsx
"use client"

import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import ThankYouPopup from '@/components/ThankYouPopup';
import { useLocationData } from '@/hooks/useLocationData';
import { useUTMData } from '@/hooks/useUTMTracker';
import {
    InputField, PhoneField, LocationFields,
    ConsentCheckbox, SubmitButton, Icons,
} from '@/components/FormFields';
import { submitContactForm, PROJECT_ID_VAR } from '@/lib/graphql-client';

export default function SponsorForm() {
    const recaptchaRef = useRef<any>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showThanks, setShowThanks] = useState(false);
    const { utmData, campaign } = useUTMData();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        phone: '',
        companyName: '',
        gstin: '',
        address: '',
        country: '',
        state: '',
        city: '',
        website: '',
        marketingConsent: false,
        privacyConsent: false,
    });

    const { countries, states, cities, countriesLoading, statesLoading, citiesLoading } =
        useLocationData(form.country, form.state);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validatePhone(form.phone)) return toast.error('Please enter a valid 10-digit mobile number');
        if (!form.privacyConsent) return toast.error('Please accept the Privacy Policy to continue');
        if (!captchaToken) return toast.error('Please complete the reCAPTCHA');
        setLoading(true);
        try {
            const result = await submitContactForm(
                PROJECT_ID_VAR.projectId,
                {
                        // Form fields
                        firstName: form.firstName,
                        lastName: form.lastName,
                        jobTitle: form.jobTitle,
                        email: form.email,
                        phone: form.phone,
                        companyName: form.companyName,
                        gstin: form.gstin,
                        address: form.address,
                        country: form.country,
                        state: form.state,
                        city: form.city,
                        website: form.website,
                        marketingConsent: form.marketingConsent,
                        privacyConsent: form.privacyConsent,
                        formType: 'partner-registration',
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
                toast.success('Partner registration submitted successfully!');
                setShowThanks(true);
                setForm({
                    firstName: '', lastName: '', jobTitle: '', email: '',
                    phone: '', companyName: '', gstin: '', address: '',
                    country: '', state: '', city: '', website: '',
                    marketingConsent: false, privacyConsent: false,
                });
                setCaptchaToken(null);
                recaptchaRef.current?.reset();
            } else {
                toast.error(data?.message || 'Failed to submit registration.');
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="First Name" required icon={Icons.user}
                        type="text" name="firstName" value={form.firstName}
                        onChange={handleChange} placeholder="First name"
                    />
                    <InputField
                        label="Last Name" required icon={Icons.user}
                        type="text" name="lastName" value={form.lastName}
                        onChange={handleChange} placeholder="Last name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Job Title" required icon={Icons.briefcase}
                        type="text" name="jobTitle" value={form.jobTitle}
                        onChange={handleChange} placeholder="Your role"
                    />
                    <InputField
                        label="Work Email" required icon={Icons.email}
                        type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="name@company.com"
                    />
                </div>

                <PhoneField
                    label="Mobile Phone" required
                    name="phone" value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    hint="Enter 10-digit mobile number"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Company Name" required icon={Icons.building}
                        type="text" name="companyName" value={form.companyName}
                        onChange={handleChange} placeholder="Company name"
                    />
                    <InputField
                        label="GSTIN" icon={Icons.briefcase}
                        type="text" name="gstin" value={form.gstin}
                        onChange={handleChange} placeholder="22AAAAA0000A1Z5 (Optional)"
                    />
                </div>

                <InputField
                    label="Address" required
                    type="text" name="address" value={form.address}
                    onChange={handleChange} placeholder="Company address"
                />

                <LocationFields
                    prefix="sp"
                    country={form.country} state={form.state} city={form.city}
                    onCountryChange={v => setForm(p => ({ ...p, country: v, state: '', city: '' }))}
                    onStateChange={v => setForm(p => ({ ...p, state: v, city: '' }))}
                    onCityChange={v => setForm(p => ({ ...p, city: v }))}
                    countries={countries} states={states} cities={cities}
                    countriesLoading={countriesLoading} statesLoading={statesLoading} citiesLoading={citiesLoading}
                    layout="3-col"
                />

                <InputField
                    label="Company Website" icon={Icons.web}
                    type="url" name="website" value={form.website}
                    onChange={handleChange} placeholder="https://example.com"
                />

                <div className="space-y-2 pt-1">
                    <ConsentCheckbox
                        id="sp-mkt" name="marketingConsent"
                        checked={form.marketingConsent} onChange={handleChange}
                    >
                        I want to stay informed about exhibitions organized by{' '}
                        <strong>Maxx Business Media Pvt. Ltd.</strong>, and be the first to receive
                        information about exhibition stand sales, business program events, advertising
                        and sponsorship opportunities.
                    </ConsentCheckbox>
                    <ConsentCheckbox
                        id="sp-prv" name="privacyConsent"
                        checked={form.privacyConsent} onChange={handleChange} required
                    >
                        I hereby give consent to <strong>Maxx Business Media Pvt. Ltd.</strong> for
                        automated and mixed processing of my personal data in accordance with the{' '}
                        <a href="/privacy-policy" className="text-blue-600 hover:underline font-medium">
                            Personal Data Policy
                        </a>.{' '}
                        <span className="text-red-500">*</span>
                    </ConsentCheckbox>
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

                <SubmitButton loading={loading} label="Register as Partner" showArrow={false} />
            </form>

            <ThankYouPopup
                isVisible={showThanks}
                onClose={() => setShowThanks(false)}
                name={form.firstName}
            />
        </>
    );
}