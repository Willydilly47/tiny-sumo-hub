import React from 'react'
import styled from '@emotion/styled'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  children: React.ReactNode
}

const getButtonStyles = (variant: string, size: string) => {
  const variants = {
    primary: {
      backgroundColor: '#8b0000',
      color: '#ffffff',
      border: '1px solid #8b0000',
      '&:hover': {
        backgroundColor: '#a0000a',
        borderColor: '#a0000a',
      },
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#8b0000',
      border: '1px solid #8b0000',
      '&:hover': {
        backgroundColor: '#8b0000',
        color: '#ffffff',
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#b0b0b0',
      border: '1px solid #404040',
      '&:hover': {
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        borderColor: '#606060',
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#b0b0b0',
      border: 'none',
      '&:hover': {
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
      },
    },
  }

  const sizes = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.125rem',
    },
  }

  return {
    ...variants[variant as keyof typeof variants],
    ...sizes[size as keyof typeof sizes],
  }
}

const StyledButton = styled.button<ButtonProps>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  \${(props) => getButtonStyles(props.variant || 'primary', props.size || 'medium')}
\`

export const HulyButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      {children}
    </StyledButton>
  )
}

export default HulyButton
