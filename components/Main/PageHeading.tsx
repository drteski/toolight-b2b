'use client'

import React from 'react'
import { PageHeadingProps } from '@/lib/types'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'

const PageHeading = ({ title, countText, count, category, locale }: PageHeadingProps) => {
  const { data, isLoading } = useGetPayloadData('categories', false, locale)
  if (isLoading) return <Loading />
  const categoryTitle = data.docs.find((item) => item.slug === category)?.title
  return (
    <div className=" bg-white">
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding flex flex-col gap-1">
        <h1 className="text-4xl font-bold">{category !== '' ? categoryTitle : title}</h1>
        <span className="text-neutral-600 text-sm">
          {countText}: {count}
        </span>
      </div>
    </div>
  )
}

export default PageHeading
