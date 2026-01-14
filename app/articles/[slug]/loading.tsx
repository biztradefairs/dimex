// app/articles/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero section skeleton */}
      <div className="h-96 md:h-[500px] bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back button skeleton */}
            <div className="h-6 w-32 bg-gray-200 rounded mb-8"></div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}