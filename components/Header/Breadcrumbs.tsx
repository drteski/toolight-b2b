'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbsProps, MainMenuItem } from '@/lib/types'
import { notFound } from 'next/navigation'
import { useGetPayloadProducts } from '@/hooks/useGetPayloadProducts'

const BreadcrumbsSlugResolver = ({
  locale,
  slug,
  lastCrumbs,
  last,
}: {
  locale: string
  slug: string
  lastCrumbs: string[]
  last: boolean
}) => {
  const [type, setType] = useState<'category' | 'product' | null>(null)
  const [title, setTitle] = useState<string | null>(null)
  const { data: categoryData, isLoading: categoryLoading } = useGetPayloadData(
    'categories',
    false,
    locale,
  )
  const { data: productData, isLoading: productLoading } = useGetPayloadProducts(
    locale,
    '1',
    '',
    {},
    slug,
  )

  useEffect(() => {
    if (categoryLoading || productLoading) return

    const foundCategory = categoryData?.docs?.find((doc: { slug: string }) => doc.slug === slug)
    const foundProduct = productData?.docs?.find((doc: { slug: string }) => doc.slug === slug)

    if (foundCategory) {
      setType('category')
      setTitle(foundCategory.title)
    } else if (foundProduct) {
      setType('product')
      setTitle(foundProduct.title)
    } else {
      notFound()
    }
  }, [categoryData, productData, slug, categoryLoading, productLoading])

  if (!type || !title) return <Loading />

  const href =
    type === 'category'
      ? `/${locale}/${lastCrumbs[0]}/${slug}`
      : `/${locale}/${lastCrumbs[0]}/${lastCrumbs[1]}/${slug}`

  return last ? (
    <span>{title}</span>
  ) : (
    <>
      <Link className="hover:text-neutral-400 transition-colors" href={href}>
        {title}
      </Link>
      <ChevronRight className="size-4" />
    </>
  )
}

const BreadcrumbsData = ({ locale, crumbs }: BreadcrumbsProps) => {
  const { data, isLoading } = useGetPayloadData('main-menu', false, locale)
  if (isLoading) return <Loading />
  const firstCrumb = crumbs[0]
  const firstDoc = data.docs.find((doc: MainMenuItem) => doc.mainMenuLinkUrl === firstCrumb)
  const firstTitle = firstDoc?.mainMenuLinkTitle ?? firstCrumb

  return (
    <>
      {crumbs.map((crumb: string, index: number) => {
        if (index === 0)
          return (
            <Fragment key={`${index}${crumb}`}>
              {crumbs.length === 1 ? (
                <>
                  <span key={`${index}${crumb}`}>{firstTitle}</span>
                  {index !== crumbs.length - 1 && <ChevronRight className="size-4" />}
                </>
              ) : (
                <>
                  <Link
                    className="hover:text-neutral-400 transition-colors"
                    href={`/${locale}/${crumb}`}
                    key={`${index}${crumb}`}
                  >
                    {firstTitle}
                  </Link>
                  {index !== crumbs.length - 1 && <ChevronRight className="size-4" />}
                </>
              )}
            </Fragment>
          )

        if (index === 1 || index === 2)
          return (
            <BreadcrumbsSlugResolver
              key={`${index}${crumb}`}
              locale={locale}
              lastCrumbs={crumbs}
              slug={crumb}
              last={index === crumbs.length - 1}
            />
          )

        return <Fragment key="nieistnieje"></Fragment>
      })}
    </>
  )
}

export const Breadcrumbs = ({ crumbs, locale }: BreadcrumbsProps) => {
  const { data, isLoading } = useGetPayloadData('layout', true, locale)
  if (isLoading) return <Loading />
  return (
    <div>
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding text-neutral-600 text-sm py-4 flex items-center gap-2 ">
        <Link className="hover:text-neutral-400 transition-colors" href={`/${locale}`}>
          {data.sections.homePage}
        </Link>
        <ChevronRight className="size-4" />
        <BreadcrumbsData locale={locale} crumbs={crumbs} />
      </div>
    </div>
  )
}
