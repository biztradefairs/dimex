// app/components/DownloadSection.tsx (Simplified)
'use client';

interface DownloadSectionProps {
  title: string;
  content: React.ReactNode;
  buttonText: string;
  buttonLink: string;
}

export default function DownloadSection({
  title,
  content,
  buttonText,
  buttonLink,
}: DownloadSectionProps) {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            {content}
          </div>
          <a
            href={buttonLink}
            target={buttonLink.startsWith('http') ? '_blank' : '_self'}
            rel={buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
          >
            {buttonText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-800">Promotional Materials</p>
                <p className="text-gray-600 mt-2">Download ready-to-use templates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}