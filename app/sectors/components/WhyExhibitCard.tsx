'use client';

import { motion } from 'framer-motion';

interface WhyExhibitItem {
  title: string;
  icon: string;
  description: string;
}

interface WhyExhibitCardProps {
  item: WhyExhibitItem;
  index: number;
}

export default function WhyExhibitCard({ item, index }: WhyExhibitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}
      className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <motion.div 
        className="text-5xl mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      >
        {item.icon}
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
    </motion.div>
  );
}