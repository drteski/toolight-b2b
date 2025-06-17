import React from 'react'
import Breadcrumbs from '@/components/Header/Breadcrumbs'
import { CategoryPageProps } from '@/lib/types'
import ProductsPage from '@/components/Pages/ProductsPage'

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { lang, subpage, category } = await params
  return (
    <>
      <Breadcrumbs crumbs={[subpage, category]} locale={lang} />
      <ProductsPage locale={lang} category={category} />
    </>
  )
}

export default CategoryPage
