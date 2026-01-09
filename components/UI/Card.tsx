// components/UI/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ 
  children, 
  className = '' 
}: CardProps) {
  return (
    <div className={`
      bg-white
      rounded-2xl
      shadow-lg
      p-8
      transition-all duration-300
      hover:shadow-xl
      ${className}
    `}>
      {children}
    </div>
  )
}