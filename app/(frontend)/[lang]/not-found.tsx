import React from 'react'
import { Unlink } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center h-[65dvh] justify-center gap-12 max-w-inner-wrapper mx-auto my-0 p-padding">
      <Unlink size={40} className="text-neutral-600" />
      <span className="text-8xl font-bold">404</span>
    </div>
  )
}

export default NotFound
