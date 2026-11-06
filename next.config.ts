import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Next.js preserves incoming query parameters, including campaign tracking.
    return [
      { source: '/articles/why-is-india-die-mould-industry-accelerating-in-2026', destination: '/articles/the-role-of-freight-forwarders-in-managing-complex-supply-chains', permanent: true },
      { source: '/articles/how-is-die-mould-industry-preparing-in-2026', destination: '/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2027', permanent: true },
      { source: '/articles/what-s-next-for-large-complex-tooling-mould-manufacturing', destination: '/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2027', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/visitors/visitor-registration', destination: '/passes', permanent: false },
      { source: '/exhibitors/exhibitor-registration', destination: '/register?t=exhibitor', permanent: true },
      { source: '/about-diemex-expo/diemex-expo', destination: '/about-diemex', permanent: true },
      { source: '/about-diemex-expo/why-participate', destination: '/why-exhibit', permanent: true },
      { source: '/policies/privacy-policy', destination: '/privacy-policy', permanent: true },
      { source: '/pastshow', destination: '/post-show-report', permanent: true },
      { source: '/visitors/opportunities', destination: '/why-visit', permanent: true },
      { source: '/visitor-registration', destination: '/passes', permanent: false },
      { source: '/exhibiting-enquiry', destination: '/register?t=exhibitor', permanent: true },
      { source: '/become-exhibitor', destination: '/register?t=exhibitor', permanent: true },
      { source: '/become-partner', destination: '/register?t=sponsor', permanent: true },
      { source: '/event-brochure', destination: '/register?t=brochure', permanent: true },
      { source: '/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026', destination: '/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2027', permanent: true },
      { source: '/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2026', destination: '/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2027', permanent: true },
      { source: '/articles/sklad-tech-2026-participants-and-sections', destination: '/articles/sklad-tech-2027-participants-and-sections', permanent: true },
    ];
  },
  async headers() {
    return [
      '/admin/:path*', '/dashboard/:path*', '/api/:path*', '/passes/:path*',
      '/scanner/:path*', '/login', '/forgot-password/:path*', '/register/thank-you',
    ].map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }));
  },
};

export default nextConfig;
