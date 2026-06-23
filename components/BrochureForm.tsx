// components/BrochureForm.tsx
"use client"

import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import ThankYouPopup from '@/components/ThankYouPopup';
import { useLocationData } from '@/hooks/useLocationData';
import { useUTMData } from '@/hooks/useUTMTracker';
import {
  InputField, PhoneField, LocationFields,
  SubmitButton, Icons,
} from '@/components/FormFields';
import { submitContactForm, PROJECT_ID_VAR } from '@/lib/graphql-client';


interface BrochureFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  country: string;
  state: string;
  city: string;
}

export default function BrochureForm() {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showThanks, setShowThanks] = useState<boolean>(false);
  const { utmData, campaign } = useUTMData();

  const [form, setForm] = useState<BrochureFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    country: '',
    state: '',
    city: '',
  });

  const {
    countries,
    states,
    cities,
    countriesLoading,
    statesLoading,
    citiesLoading,
  } = useLocationData(form.country, form.state);

  const API_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
      return toast.error('Please complete the CAPTCHA');
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        formType: 'event-brochure',
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
      };

      // 1. Save in GraphQL CMS
      const graphqlResult = await submitContactForm(
        PROJECT_ID_VAR.projectId,
        payload
      );

      // 2. Send email through contact API
      const emailResponse = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const emailResult = await emailResponse.json();

      if (graphqlResult.errors) {
        toast.error(graphqlResult.errors[0]?.message || "Failed to save lead");
        return;
      }

      if (!emailResult.success) {
        toast.error("Lead saved but email could not be sent");
        return;
      }

      toast.success("Brochure download link sent to your email!");

      setShowThanks(true);

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        jobTitle: '',
        country: '',
        state: '',
        city: '',
      });

      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
            label="Work Email" required icon={Icons.email}
            type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="name@company.com"
          />
          <PhoneField
            label="Phone Number" required
            name="phone" value={form.phone}
            onChange={handleChange} placeholder="98765 43210"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Company Name" required icon={Icons.building}
            type="text" name="companyName" value={form.companyName}
            onChange={handleChange} placeholder="Your company name"
          />
          <InputField
            label="Job Title" required icon={Icons.briefcase}
            type="text" name="jobTitle" value={form.jobTitle}
            onChange={handleChange} placeholder="Your job title"
          />
        </div>

        <LocationFields
          prefix="br"
          country={form.country} state={form.state} city={form.city}
          onCountryChange={(v: any) => setForm(p => ({ ...p, country: v, state: '', city: '' }))}
          onStateChange={(v: any) => setForm(p => ({ ...p, state: v, city: '' }))}
          onCityChange={(v: any) => setForm(p => ({ ...p, city: v }))}
          countries={countries} states={states} cities={cities}
          countriesLoading={countriesLoading} statesLoading={statesLoading} citiesLoading={citiesLoading}
          layout="1+2"
        />

        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            id="br-terms"
            required
            className="mt-0.5 h-4 w-4 accent-[#1e3a6e] cursor-pointer shrink-0"
          />
          <label htmlFor="br-terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
            I agree to the{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
            {' '}and{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.{' '}
            <span className="text-red-500">*</span>
          </label>
        </div>

        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <div className="rounded border bg-gray-50 p-4">
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>
          </div>
        )}

        <SubmitButton loading={loading} label="Download Brochure" />
      </form>

      <ThankYouPopup
        isVisible={showThanks}
        onClose={() => setShowThanks(false)}
        name={form.firstName}
      />
    </>
  );
}