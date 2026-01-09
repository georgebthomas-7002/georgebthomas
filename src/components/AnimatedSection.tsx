'use client'

import { useScrollAnimation } from '@/lib/useScrollAnimation'
import { ReactNode, ElementType, HTMLAttributes } from 'react'

interface AnimatedSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  animation?: 'fade-in' | 'slide-left' | 'slide-right' | 'scale'
  delay?: number
  as?: ElementType
}

export function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0,
  as: Component = 'div',
  ...props
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const animationClass = `animate-${animation}`

  return (
    <Component
      ref={ref}
      className={`${animationClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  )
}

interface StaggerContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function StaggerContainer({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: StaggerContainerProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <Component
      ref={ref}
      className={`stagger-children ${isVisible ? 'is-visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
