'use client'
import React from 'react'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import { ProductsPage } from '@/components/Pages/ProductsPage'
import { notFound } from 'next/navigation'

export const SubPageSelector = ({ lang, subpage }: { lang: string; subpage: string }) => {
  const { data, isLoading } = useGetPayloadData('layout', true, lang)
  if (isLoading) return <Loading />
  const productsSlug = data.other.defaultCategoryPage.mainMenuLinkUrl

  if (subpage === productsSlug) return <ProductsPage locale={lang} />

  return notFound()
}
