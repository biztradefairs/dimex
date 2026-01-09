// components/StaggerChildren.tsx
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  delay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
}

export default function StaggerChildren({ 
  children, 
  className = '' 
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}