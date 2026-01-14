'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SectorCardProps {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  index: number;
}

export default function SectorCard({ id, title, slug, image, description, index }: SectorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        href={`/sectors/${slug}`}
        className="group relative h-80 w-full overflow-hidden rounded-xl text-center shadow-lg transition-all duration-300 ease-in-out"
      >
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
          style={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
        
        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 bg-blue-600/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-end justify-center">
          <motion.div 
            className="w-full bg-white py-5 px-4 transition-all duration-300 ease-in-out group-hover:bg-blue-600 group-hover:text-white"
            animate={{
              paddingBottom: isHovered ? '2.5rem' : '1.25rem',
            }}
          >
            <motion.h3 
              className="text-lg font-semibold mb-2"
              animate={{
                color: isHovered ? '#ffffff' : '#000000',
              }}
            >
              {title}
            </motion.h3>
            
            {/* Description appears on hover */}
            <motion.p 
              className="text-sm text-gray-600 group-hover:text-white/90 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isHovered ? 'auto' : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}