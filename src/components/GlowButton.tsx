import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
}: ButtonProps) => {
  const baseClasses =
    'font-medium rounded-lg transition-all duration-300 border border-opacity-30 focus:outline-none focus:ring-2 focus:ring-opacity-50'

  const variantClasses = {
    primary:
      'bg-purple-500 bg-opacity-80 hover:bg-opacity-100 text-white border-purple-400 hover:shadow-lg hover:shadow-purple-500/25 focus:ring-purple-400',
    secondary:
      'bg-white bg-opacity-20 hover:bg-opacity-30 text-purple-300 hover:text-purple-700 hover:border-purple-700 border-purple-300 focus:ring-purple-300',
    danger:
      'bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white border-red-400 hover:shadow-lg hover:shadow-red-500/25 focus:ring-red-400',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed hover:bg-opacity-80 hover:shadow-none'
    : 'cursor-pointer'

  const widthClasses = fullWidth ? 'w-full' : ''

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
