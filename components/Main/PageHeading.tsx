'use client'

import React from 'react'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'

type PageHeadingProps = {
  title: string
  countText?: string
  count?: number
  category?: string | undefined
  locale: string
  product?: string | undefined
}

export const PageHeading = ({
  title,
  countText,
  count,
  category,
  locale,
  product,
}: PageHeadingProps) => {
  const { data, isLoading } = useGetPayloadData('categories', false, locale)
  if (isLoading) return <Loading />
  const categoryTitle = data.docs.find((item: { slug: string }) => item.slug === category)?.title
  let heading = title
  if (product) heading = product
  if (category) heading = categoryTitle
  return (
    <div className=" bg-white">
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding flex flex-col gap-1">
        <h1 className="text-2xl xs:text-4xl font-bold text-wrap">{heading}</h1>
        {!product && (
          <span className="text-neutral-600 text-sm">
            {countText}: {count}
          </span>
        )}
      </div>
    </div>
  )
}
