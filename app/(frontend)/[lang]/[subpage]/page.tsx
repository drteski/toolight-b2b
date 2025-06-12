import React from 'react'
import Breadcrumbs from '@/components/Header/Breadcrumbs'
import { SubPageProps } from '@/lib/types'
import ProductsPage from '@/components/Pages/ProductsPage'

const SubPage = async ({ params }: SubPageProps) => {
  const { lang, subpage } = await params
  return (
    <>
      <Breadcrumbs crumbs={[subpage]} locale={lang} />
      <ProductsPage locale={lang} />
    </>
  )
}

export default SubPage
