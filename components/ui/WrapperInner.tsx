import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface WrapperInnerProps {
  className?: string
  children: ReactNode
}

export const WrapperInner = ({ className, children }: WrapperInnerProps) => {
  return <div className={cn('max-w-desktop px-4 my-0 mx-auto', className)}>{children}</div>
}

export default WrapperInner
