'use client'
import React, { Fragment } from 'react'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import {
  BreadcrumbCategoryProps,
  BreadcrumbProductProps,
  BreadcrumbsProps,
  MainMenuItem,
} from '@/lib/types'

const BreadcrumbsCategoryData = ({
  locale,
  category,
  lastCrumbs,
  last,
}: BreadcrumbCategoryProps) => {
  return (
    <>
      {last ? (
        <span>{category.title}</span>
      ) : (
        <>
          <Link
            className="hover:text-neutral-400 transition-colors"
            href={`/${locale}/${lastCrumbs[0]}/${category.crumb}`}
          >
            {category.title}
          </Link>
          <ChevronRight className="size-4" />
        </>
      )}
    </>
  )
}
const BreadcrumbsProductData = ({ locale, lastCrumbs, product }: BreadcrumbProductProps) => {
  return <>asdf</>
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

        if (index === 1)
          return (
            <BreadcrumbsCategoryData
              key={`${index}${crumb}`}
              locale={locale}
              lastCrumbs={crumbs}
              category={{ title: 'dupa', crumb: 'dupa' }}
              last={index === crumbs.length - 1}
            />
          )
        if (index === 2)
          return (
            <BreadcrumbsProductData
              lastCrumbs={crumbs}
              locale={locale}
              key={`${index}${crumb}`}
              product={{ title: 'dupa', crumb: 'dupa' }}
            />
          )
        return <Fragment key="nieistnieje"></Fragment>
      })}
    </>
  )
}

const Breadcrumbs = ({ crumbs, locale }: BreadcrumbsProps) => {
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

export default Breadcrumbs
