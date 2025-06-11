'use client'
import React from 'react'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbProps, BreadcrumbsProps, MainMenuItem } from '@/lib/types'

const BreadcrumbsCategoryData = ({ locale, crumb }: BreadcrumbProps) => {
  const { data, isLoading } = useGetPayloadData('categories', false, locale)
  if (isLoading) return <Loading />
  console.log(data.docs,crumb)
  return <>{data.docs.filter((doc) => doc.slug === crumb)[0].title}</>
}
const BreadcrumbsProductData = ({ locale, crumb }: BreadcrumbProps) => {
  return <>asdf</>
}

const BreadcrumbsData = ({ locale, crumbs }: BreadcrumbsProps) => {
  const { data, isLoading } = useGetPayloadData('main-menu', false, locale)
  if (isLoading) return <Loading />
  if(crumbs.length === 1)  return (
    <>
      {[crumbs[0]].map((crumb: string, index: number) => {
        const title: string = data.docs.filter(
          (doc: MainMenuItem) => doc.mainMenuLinkUrl === crumb,
        )[0].mainMenuLinkTitle
        return (
          <>
            <span key={crumb}>{title}</span>
            {index !== crumbs.length - 1 && <ChevronRight className="size-4" />}
          </>
        )
      })}
    </>
  )
    return (
      <>
        {[crumbs[0]].map((crumb: string, index: number) => {
          const title: string = data.docs.filter(
            (doc: MainMenuItem) => doc.mainMenuLinkUrl === crumb,
          )[0].mainMenuLinkTitle
          return (
            <>
              <Link className="hover:text-neutral-400 transition-colors"  href={`/${locale}/${crumb}`} key={crumb}>{title}</Link>
              {index !== crumbs.length - 1 && <ChevronRight className="size-4" />}
            </>
          )
        })}
        {crumbs.length >= 2 && (<><BreadcrumbsCategoryData locale={locale} crumb={crumbs[1]} /><ChevronRight className="size-4" />{<>{crumbs.length >= 3 && <BreadcrumbsProductData locale={locale} crumb={crumbs[2]} />}</>}</>)}

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
