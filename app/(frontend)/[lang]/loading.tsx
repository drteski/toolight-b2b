import React from 'react'
import Logo from '@/components/Header/Logo'

const Loading = () => {
  return (
    <div className="z-40 fixed inset-0 bg-background flex items-center justify-center p-10">
      <Logo />
    </div>
  )
}

export default Loading
