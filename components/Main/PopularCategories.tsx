'use client'
import React from 'react'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { Category, Locale } from '@/lib/types'

const PopularCategoriesData = ({ locale }: Locale) => {
  const { data, isLoading } = useGetPayloadData('categories', false, locale)
  if (isLoading) return <Loading />
  return (
    <div className="max-w-inner-wrapper mx-auto my-0 p-padding xs:p-0">
      <Carousel>
        <CarouselContent className="gap-4 pt-padding">
          {data.docs
            .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
            .map((item: Category) => (
              <CarouselItem
                key={item.title}
                className="basis-[calc(100%_-_(var(--spacing-padding)/3))] sm:basis-[calc(60%_-_(var(--spacing-padding)/3))] xs:basis-[calc(45%_-_(var(--spacing-padding)/2))] lg:basis-[calc(33.3%_-_(var(--spacing-padding)/3))] xl:basis-[calc(25%_-_(var(--spacing-padding)/2.7))]"
              >
                <Link
                  className="flex flex-col gap-8 border border-neutral-100 rounded-xl p-8! hover:border-accent transition-colors"
                  href={`/${locale}/${item.relatedMainMenuLink.mainMenuLinkUrl}/${item.slug}`}
                >
                  <Image
                    src={item.sizes.thumbnail.url}
                    width={item.sizes.thumbnail.width}
                    height={item.sizes.thumbnail.height}
                    alt={item.title}
                    className="object-cover object-center aspect-square w-full"
                  />
                  <span className="text-xl font-medium uppercase">{item.title}</span>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious size="lg" variant="secondary" className="px-0! pl-0.5 bg-neutral-100" />
        <CarouselNext size="lg" variant="secondary" className="px-0! pl-0.5 bg-neutral-100" />
      </Carousel>
    </div>
  )
}
export const PopularCategories = ({}) => {
  const { code } = useCurrentLocale()
  const { data, isLoading } = useGetPayloadData('layout', true, code)
  if (isLoading) return <Loading />
  return (
    <div className="py-padding-vertical overflow-hidden">
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding">
        <h2 className="uppercase text-3xl xs:text-4xl font-bold">
          {data.sections.popularCategories}
        </h2>
      </div>
      <PopularCategoriesData locale={code} />
    </div>
  )
}
