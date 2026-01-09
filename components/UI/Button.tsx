// components/UI/Button.tsx
import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  className = '', 
  fullWidth = false,
  type = 'button',
  disabled = false
}: ButtonProps) {
  
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-full
    px-6 py-3
    font-semibold
    text-white
    transition-all duration-300
    bg-[#0092D7]
    hover:bg-[#0074D9]
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `
  
  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  )
}