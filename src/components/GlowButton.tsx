import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  icon?: React.ReactNode
}

const Button = ({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  icon,
}: ButtonProps) => {
  // Base styles all buttons share
  const baseStyles =
    'inline-flex items-center justify-center font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md'

  // Width style
  const widthStyle = fullWidth ? 'w-full' : ''

  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-5 py-2.5 text-base rounded-md',
  }

  // Style variations with improved visibility
  const variantStyles = {
    primary:
      'border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 disabled:bg-purple-400',
    secondary:
      'border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:ring-purple-500 disabled:bg-gray-200 disabled:text-gray-500',
    danger:
      'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
    ghost:
      'border-transparent bg-transparent text-white hover:bg-white hover:bg-opacity-20 focus:ring-purple-500 disabled:text-gray-400',
  }

  // Icon spacing
  const iconSpacing = icon ? 'gap-2' : ''

  return (
    <motion.button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${iconSpacing} ${className}`}
      whileHover={
        disabled ? {} : { y: -2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }
      }
      whileTap={
        disabled ? {} : { y: 0, boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }
      }
      initial={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 15,
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}

export default Button
