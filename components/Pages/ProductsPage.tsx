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
  if (isLoading) return <Loading />
  console.log(data)
  return (
    <>
      {isLoading ? (
        <span>ładowanie</span>
      ) : (
        <>
          <PageHeading
            title={layout.productHeading}
            countText={layout.productCount}
            count={data.totalDocs}
          />
          <Filters locale={locale} filters={layout.parameters} />
          <ProductListing products={data.docs} layout={layout} />
          <ListingNavigation />
        </>
      )}
    </>
  )
}

const ProductsPage = ({ locale }: Locale) => {
  const { data, isLoading } = useGetPayloadData('layout', true, locale)
  if (isLoading) return <Loading />
  return <ProductsData locale={locale} layout={data.products} />
}

export default ProductsPage
