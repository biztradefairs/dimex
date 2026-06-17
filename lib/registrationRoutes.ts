export type RegistrationTab = 'enquiry' | 'exhibitor' | 'sponsor' | 'brochure';

export const REGISTRATION_TABS: RegistrationTab[] = [
    'enquiry',
    'exhibitor',
    'sponsor',
    'brochure',
];

export const TAB_QUERY_PARAM = 't';

export const LEGACY_PATH_TO_TAB: Record<string, RegistrationTab> = {
    '/visitor-registration': 'enquiry',
    '/exhibiting-enquiry': 'exhibitor',
    '/become-partner': 'sponsor',
    '/event-brochure': 'brochure',
};

export const TAB_TO_LEGACY_PATH: Record<RegistrationTab, string> = {
    enquiry: '/visitor-registration',
    exhibitor: '/exhibiting-enquiry',
    sponsor: '/become-partner',
    brochure: '/event-brochure',
};

export const REGISTRATION_HERO: Record<
    RegistrationTab,
    { title: string; subtitle: string }
> = {
    enquiry: {
        title: 'Register to Visit',
        subtitle:
            "Register now to access India's premier die & mould manufacturing exhibition.",
    },
    exhibitor: {
        title: 'Enquiry to Exhibit',
        subtitle:
            'Please complete the form below and our team will contact you regarding DIEMEX 2026 exhibiting opportunities.',
    },
    sponsor: {
        title: 'Become a Partner',
        subtitle:
            'Partner with DIEMEX 2026 and put your brand in front of 10,000+ professionals.',
    },
    brochure: {
        title: 'Browse Through Your Event Brochure',
        subtitle: 'Almost there, your brochure is waiting for you to download',
    },
};

export function isValidRegistrationTab(value: string | null): value is RegistrationTab {
    return !!value && REGISTRATION_TABS.includes(value as RegistrationTab);
}

export function buildRegisterUrl(
    tab: RegistrationTab,
    existingParams?: URLSearchParams | string,
): string {
    const params = new URLSearchParams(
        typeof existingParams === 'string' ? existingParams : existingParams?.toString(),
    );
    params.set(TAB_QUERY_PARAM, tab);
    return `/register?${params.toString()}`;
}

export function redirectToRegister(
    tab: RegistrationTab,
    searchParams?: Record<string, string | string[] | undefined>,
): string {
    const params = new URLSearchParams();

    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            if (key === TAB_QUERY_PARAM) continue;
            if (typeof value === 'string') params.set(key, value);
            else if (Array.isArray(value) && value[0]) params.set(key, value[0]);
        }
    }

    return buildRegisterUrl(tab, params);
}
