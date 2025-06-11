import React from 'react'
import Breadcrumbs from '@/components/Header/Breadcrumbs'
import { CategoryPageProps } from '@/lib/types'

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { lang, subpage, category } = await params
  return (
    <>
      <Breadcrumbs crumbs={[subpage, category]} locale={lang} />
    </>
  )
}

export default CategoryPage
