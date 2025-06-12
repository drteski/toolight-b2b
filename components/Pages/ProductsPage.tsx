'use client'
import React from 'react'
import useGetPayloadProducts from '@/hooks/useGetPayloadProducts'
import { Locale, ProductDataProps } from '@/lib/types'
import Loading from '@/app/(frontend)/[lang]/loading'
import PageHeading from '@/components/Main/PageHeading'
import Filters from '@/components/Main/Filters'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import ProductListing from '@/components/Main/ProductListing'
import ListingNavigation from '@/components/Main/ListingNavigation'
import { useSearchParams } from 'next/navigation'
import useQueryParamsObject from '@/hooks/useQueryParamsObject'

const ProductsData = ({ locale, layout }: ProductDataProps) => {
  const searchParams = useSearchParams()
  const limit = searchParams.get('limit')
  const page = searchParams.get('page')
  const query = useQueryParamsObject()

  const { data, isLoading } = useGetPayloadProducts(locale, limit, page, '', query)
  console.log(data)
  if (isLoading) return <Loading />
  return (
    <>
      <PageHeading
        title={layout.productHeading}
        countText={layout.productCount}
        count={data.totalDocs}
      />
      <Filters products={data.docs} isCategory={true} filters={layout.parameters} />
      <ProductListing />
      <ListingNavigation />
    </>
  )
}

const ProductsPage = ({ locale }: Locale) => {
  const { data, isLoading } = useGetPayloadData('layout', true, locale)
  if (isLoading) return <Loading />
  return (
    <div className="max-w-inner-wrapper mx-auto my-0 px-padding">
      <ProductsData locale={locale} layout={data.products} />
    </div>
  )
}

export default ProductsPage
