import { ReactNode } from "react"

interface SectionContainerProps {
  children: ReactNode
  className?: string
  bgColor?: string
  fullWidth?: boolean
}

export default function SectionContainer({
  children,
  className = "",
  bgColor = "",
  fullWidth = false,
}: SectionContainerProps) {
  // Common max-width for consistent alignment
  const contentMaxWidth = "max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]"

  if (fullWidth) {
    return (
      <div className={`w-full ${bgColor}`}>
        <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full px-4 sm:px-6 lg:px-8 mx-auto ${contentMaxWidth} ${className}`}>
      {children}
    </div>
  )
}