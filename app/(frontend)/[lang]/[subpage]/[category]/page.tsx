import React from 'react'
import { Breadcrumbs } from '@/components/Header/Breadcrumbs'
import { CategoryPageProps } from '@/lib/types'
import { ProductsPage } from '@/components/Pages/ProductsPage'
import { resolveSlugType } from '@/lib/resolveSlugType'
import { notFound } from 'next/navigation'
import { Product } from '@/components/Pages/Product'
import { Metadata } from 'next'
import axios from 'axios'

type Props = {
  params: Promise<{ lang: string; category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category } = await params
  const type = await resolveSlugType(category, lang)
  const data = await axios.get(
    `${process.env.BASE_URL}/api/metadata?type=${type}&value=${category}`,
  )
  return {
    title: `Toolight - ${data.data.title}`,
    description: data.data.description,
  }
}

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
    return (
      <>
        <Breadcrumbs crumbs={[subpage, category]} locale={lang} />
        <Product locale={lang} product={category} />
      </>
    )
  }
}

export default CategoryPage
