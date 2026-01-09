// components/ui/SectionContainer.tsx - FINAL
import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
  bgColor?: string
  fullWidth?: boolean
}

export default function SectionContainer({ 
  children, 
  className = '',
  bgColor = '',
  fullWidth = false 
}: SectionContainerProps) {
  
  const Content = () => (
    <div className={`
      mx-auto
      w-full
      max-w-[1180px]
      2xl:max-w-[1400px]
      3xl:max-w-[1800px]
      ${className}
    `}>
      {children}
    </div>
  )
  
  if (fullWidth) {
    return (
      <div className={`w-full ${bgColor}`}>
        <div className="w-full px-4 sm:px-6 xl:px-10">
          <Content />
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full px-4 sm:px-6 xl:px-10">
      <Content />
    </div>
  )
}