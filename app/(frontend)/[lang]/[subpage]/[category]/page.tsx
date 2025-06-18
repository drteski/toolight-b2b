import React from 'react'
import Breadcrumbs from '@/components/Header/Breadcrumbs'
import { CategoryPageProps } from '@/lib/types'
import ProductsPage from '@/components/Pages/ProductsPage'
import { resolveSlugType } from '@/lib/resolveSlugType'
import { notFound } from 'next/navigation'

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { lang, subpage, category } = await params
  const type = await resolveSlugType(category, lang)
  if (!type) return notFound()

  if (type === 'category') {
    return (
      <>
        <Breadcrumbs crumbs={[subpage, category]} locale={lang} />
        <ProductsPage locale={lang} category={category} />
      </>
    )
  }

  if (type === 'product') {
    // wyrenderuj stronę produktu
    return <>category</>
  }
}

export default CategoryPage
