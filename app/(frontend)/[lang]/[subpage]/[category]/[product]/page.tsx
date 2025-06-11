import React from 'react'
import Breadcrumbs from '@/components/Header/Breadcrumbs'
import { ProductPageProps } from '@/lib/types'

const ProductPage = async ({ params }: ProductPageProps) => {
  const { lang, subpage, category, product } = await params
  return (
    <>
      <Breadcrumbs crumbs={[subpage, category, product]} locale={lang} />
    </>
  )
}

export default ProductPage
