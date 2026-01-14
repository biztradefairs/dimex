'use client';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: string;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        x: 10,
        backgroundColor: 'rgba(59, 130, 246, 0.05)'
      }}
      className="flex items-start gap-4 p-4 bg-white rounded-lg hover:bg-blue-50 transition-all duration-300 border border-gray-200"
    >
      <motion.div 
        className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
      />
      <span className="text-gray-700 text-lg">{service}</span>
    </motion.div>
  );
}