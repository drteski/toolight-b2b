import React from 'react'
import { Breadcrumbs } from '@/components/Header/Breadcrumbs'
import { ProductPageProps } from '@/lib/types'
import { resolveSlugType } from '@/lib/resolveSlugType'
import { notFound } from 'next/navigation'
import { Product } from '@/components/Pages/Product'
import { Metadata } from 'next'
import axios from 'axios'

type Props = {
  params: Promise<{ product: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await params
  const data = await axios.get(`${process.env.BASE_URL}/api/metadata?type=product&value=${product}`)
  return {
    title: `Toolight - ${data.data.title}`,
    description: data.data.description,
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { lang, subpage, category, product } = await params
  const type = await resolveSlugType(product, lang)
  if (!type) return notFound()
  return (
    <>
      <Breadcrumbs crumbs={[subpage, category, product]} locale={lang} />
      <Product locale={lang} product={product} />
    </>
  )
}

export default ProductPage
