'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import FilterSelectField from '@/components/Main/FilterSelectField'
import { getFilterMapping } from '@/lib/filterMapping'
import Loading from '@/app/(frontend)/[lang]/loading'
import useGetProductParameters from '@/hooks/useGetProductParameters'
import { FilterProps } from '@/lib/types'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import { usePathname } from 'next/navigation'

const Categories = ({ locale }) => {
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
      {(data.docs === 0 ? [] : data.docs).map((category) => (
        <SwiperSlide key={category.id} className="w-auto!">
          <Button
            className="w-fit bg-white text-foreground border border-neutral-200 hover:bg-neutral-100"
            asChild
          >
            <Link href={`${pathname}/${category.slug}`}>{category.title}</Link>
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const Filters = ({ locale, filters, category = undefined }: FilterProps) => {
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
        <div className="flex items-center gap-4">
          {filtersData.map((filter, index: number) => (
            <FilterSelectField key={index} data={filter} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters
