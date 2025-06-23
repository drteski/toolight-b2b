import React from 'react'
import { Logo } from '@/components/Header/Logo'

const Loading = () => {
  return (
    <div className="z-40 fixed inset-0 h-[100dvh] bg-background flex items-center justify-center p-10">
      <Logo className="h-20" />
    </div>
  )
}

export default Loading
