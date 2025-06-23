'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import { FilterSelectField } from '@/components/Main/FilterSelectField'
import { getFilterMapping } from '@/lib/filterMapping'
import Loading from '@/app/(frontend)/[lang]/loading'
import { useGetProductParameters } from '@/hooks/useGetProductParameters'
import { Locale } from '@/lib/types'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import { usePathname } from 'next/navigation'

type FilterProps = {
  locale: string
  filters: [{ name: string }]
  category?: string | undefined
}
const Categories = ({ locale }: Locale) => {
  const { data, isLoading } = useGetPayloadData('categories', false, locale)
  const pathname = usePathname()
  if (isLoading) return <Loading />
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={'auto'}
      grabCursor
      className="overflow-hidden h-fit w-full"
    >
      {(data.docs === 0 ? [] : data.docs).map(
        (category: { id: string; slug: string; title: string }) => (
          <SwiperSlide key={category.id} className="w-auto!">
            <Button
              className="w-fit bg-white text-foreground border border-neutral-200 hover:bg-neutral-100"
              asChild
            >
              <Link href={`${pathname}/${category.slug}`}>{category.title}</Link>
            </Button>
          </SwiperSlide>
        ),
      )}
    </Swiper>
  )
}

export const Filters = ({ locale, filters, category }: FilterProps) => {
  const { data, isLoading } = useGetProductParameters(locale, category)
  if (isLoading) return <Loading />
  const filterNames = filters.map((filter: { name: string }) => filter.name)

  const filtersData: { name: string; options: string[] }[] = getFilterMapping(filterNames, data)
  return (
    <div className="max-w-inner-wrapper mx-auto my-0 px-padding relative">
      <div className="flex flex-col">
        {!category && (
          <div className="py-padding">
            <Categories locale={locale} />
          </div>
        )}
        <div className={`hidden xs:flex items-center gap-4 ${category ? 'pt-padding' : 'pt-0'}`}>
          {filtersData.map((filter, index: number) => (
            <FilterSelectField key={index} data={filter} />
          ))}
        </div>
        <div className={`flex xs:hidden items-center ${category ? 'pt-padding' : 'pt-0'}`}>
          <Swiper
            spaceBetween={16}
            slidesPerView={'auto'}
            grabCursor
            className="overflow-hidden h-fit w-full"
          >
            {filtersData.map((filter, index: number) => (
              <SwiperSlide key={index} className="w-auto!">
                <FilterSelectField key={index} data={filter} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
