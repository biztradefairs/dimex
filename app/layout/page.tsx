// app/floor-plan/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Loader2, AlertCircle, Calendar, Building2 } from 'lucide-react';
import SectionContainer from '@/components/UI/SectionContainer';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com/api';

/* ===================== ANIMATION VARIANTS ===================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Update interface to match actual API response
interface FloorPlanData {
  id: string;
  name?: string;
  imageUrl?: string;
  baseImageUrl?: string;
  image?: string;
  description?: string;
  lastUpdated?: string;
  updatedAt?: string;
  // Add other fields that might come from API
  booths?: any[];
  success?: boolean;
  data?: any;
  statistics?: {
    totalBooths: number;
    availableBooths: number;
    reservedBooths: number;
    occupiedBooths: number;
  };
}

export default function PublicFloorPlanPage() {
  const [floorPlan, setFloorPlan] = useState<FloorPlanData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalBooths: 0,
    availableBooths: 0,
    reservedBooths: 0,
    occupiedBooths: 0
  });

  useEffect(() => {
    fetchFloorPlan();
  }, []);

  const fetchFloorPlan = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try multiple possible endpoints
      const endpoints = [
        `${API_BASE_URL}/floor-plan/floor-plan`,  // Most likely correct based on your routes
        `${API_BASE_URL}/floor-plan`,
        `${API_BASE_URL}/booths/floor-plan`,
      ];

      let response = null;
      let data = null;

      // Try each endpoint until one works
      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint);
          const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (res.ok) {
            response = res;
            data = await res.json();
            console.log('Success with endpoint:', endpoint, data);
            break;
          }
        } catch (e) {
          console.log('Failed endpoint:', endpoint);
        }
      }

      if (!response || !data) {
        throw new Error('Could not fetch floor plan from any endpoint');
      }

      // Handle different response structures
      let planData = data;
      
      // If response has success wrapper
      if (data.success && data.data) {
        planData = data.data;
      }

      // Extract statistics if available
      if (planData.statistics) {
        setStats({
          totalBooths: planData.statistics.totalBooths || 0,
          availableBooths: planData.statistics.availableBooths || 0,
          reservedBooths: planData.statistics.reservedBooths || 0,
          occupiedBooths: planData.statistics.occupiedBooths || 0
        });
      } else if (planData.booths) {
        // Calculate stats from booths array
        const booths = planData.booths || [];
        setStats({
          totalBooths: booths.length,
          availableBooths: booths.filter((b: any) => b.status === 'available').length,
          reservedBooths: booths.filter((b: any) => b.status === 'reserved').length,
          occupiedBooths: booths.filter((b: any) => b.status === 'occupied').length
        });
      }

      // Extract image URL from various possible field names
      let extractedImageUrl = null;
      
      if (planData.imageUrl) {
        extractedImageUrl = planData.imageUrl;
      } else if (planData.baseImageUrl) {
        extractedImageUrl = planData.baseImageUrl;
      } else if (planData.image) {
        extractedImageUrl = planData.image;
      } else if (typeof planData === 'string') {
        extractedImageUrl = planData;
      }

      // If image URL is relative, make it absolute
      if (extractedImageUrl && !extractedImageUrl.startsWith('http')) {
        extractedImageUrl = `${API_BASE_URL.replace('/api', '')}${extractedImageUrl}`;
      }

      setImageUrl(extractedImageUrl);

      // Set floor plan data
      setFloorPlan({
        id: planData.id || '1',
        imageUrl: extractedImageUrl,
        description: planData.description || planData.name || 'Exhibition Floor Plan',
        lastUpdated: planData.updatedAt || planData.lastUpdated || new Date().toISOString(),
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching floor plan:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#004D9F] animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">Loading Floor Plan...</h2>
          <p className="text-gray-500 mt-2">Please wait while we load the exhibition layout</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-red-100"
        >
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error Loading Floor Plan</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchFloorPlan}
              className="bg-[#004D9F] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24 mb-12"
      >
        <SectionContainer>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 mt-20 text-4xl lg:text-4xl xl:text-5xl font-[600] text-black"
          >
            Exhibition Layout & Floor Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl text-lg lg:text-xl text-gray-600"
          >
            Explore the complete exhibition hall layout. Find your booth location, 
            navigate the venue, and discover the optimal setup for your exhibition space.
          </motion.p>
        </SectionContainer>
      </motion.section>

      <SectionContainer>
        {/* STATS CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 77, 159, 0.1)" }}
            className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#004D9F]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Booths</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBooths}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="w-6 h-6 text-[#004D9F]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.1)" }}
            className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Available</p>
                <p className="text-3xl font-bold text-green-600">{stats.availableBooths}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(234, 179, 8, 0.1)" }}
            className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Reserved</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.reservedBooths}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.1)" }}
            className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Occupied</p>
                <p className="text-3xl font-bold text-red-600">{stats.occupiedBooths}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* MAIN CONTENT - FLOOR PLAN */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
        >
          {/* Header with last updated */}
          <div className="bg-[#0E1C35] text-white p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-300" />
                <h2 className="text-2xl font-semibold">Exhibition Hall Layout</h2>
              </div>
              {floorPlan?.lastUpdated && (
                <div className="flex items-center gap-2 bg-blue-900/30 px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-300" />
                  <p className="text-sm text-blue-200">
                    Last Updated: {new Date(floorPlan.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Floor Plan Image */}
          <div className="p-6">
            {imageUrl ? (
              <motion.div
                variants={scaleIn}
                className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
              >
                <img
                  src={imageUrl}
                  alt="Exhibition Floor Plan"
                  className="w-full h-auto object-contain"
                  onError={() => {
                    console.error('Failed to load image:', imageUrl);
                    setImageUrl(null);
                  }}
                />
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Booth Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Occupied</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-16 text-center">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No floor plan image available</p>
                <p className="text-sm text-gray-500 mt-2">
                  The exhibition floor plan hasn't been uploaded yet. Please check back later.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Description Section */}
        {floorPlan?.description && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12"
          >
            <h3 className="text-2xl font-semibold text-[#0E1C35] mb-4">About This Layout</h3>
            <p className="text-gray-700 leading-relaxed">{floorPlan.description}</p>
          </motion.div>
        )}

        {/* Information Footer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white border border-blue-100 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-[#004D9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Need Assistance?</h4>
              <p className="text-gray-600">
                If you need help locating your booth or have questions about the layout, 
                please contact our exhibition support team at <a href="mailto:support@diemex.com" className="text-[#004D9F] hover:underline">support@diemex.com</a>
              </p>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
      <BackToTop />
    </>
  );
}