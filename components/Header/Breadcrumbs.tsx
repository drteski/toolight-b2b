'use client'
import React from 'react'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import { ChevronRight } from 'lucide-react'

const Breadcrumbs = ({ crumbs, locale }) => {
  const { data, isLoading } = useGetPayloadData('layout', true, locale)
  if (isLoading) return <Loading />
  return (
    <div>
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding">
        <h2 className="text-neutral-500 text-sm py-4 flex items-center gap-2">
          {crumbs.map((crumb, index) => (
            <span key={crumb.title}>
              {crumb.title}
              {index !== crumbs.length - 1 && <ChevronRight className="size-4" />}
            </span>
          ))}
        </h2>
      </div>
    </div>
  )
}

export default Breadcrumbs
