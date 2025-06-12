import React from 'react'
import { PageHeadingProps } from '@/lib/types'

const PageHeading = ({ title, countText, count }: PageHeadingProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-4xl font-bold">{title}</h1>
      <span className="text-neutral-600 text-sm">
        {countText}: {count}
      </span>
    </div>
  )
}

export default PageHeading
