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

const Filters = ({ locale, filters, category = undefined }: FilterProps) => {
  const { data, isLoading } = useGetProductParameters(locale, category)
  if (isLoading) return <Loading />
  const filterNames = filters.map((filter: { name: string }) => filter.name)

  const filtersData: { name: string; options: string[] }[] = getFilterMapping(filterNames, data)
  return (
    <div className="flex flex-col">
      {!category && (
        <div className="py-padding">
          <Swiper
            spaceBetween={16}
            slidesPerView={'auto'}
            grabCursor
            className="overflow-hidden h-fit w-full"
          >
            {[
              'kateasdfasdfgoria',
              'kategorisadafsdfasdfa',
              'kategoria',
              'kateasdfasdfgoria',
              'kategoasfasdfria',
              'kategoria',
              'kateasdfasdfgoria',
              'kategoasfasdfria',
            ].map((banner, index) => (
              <SwiperSlide key={banner + index} className="w-auto!">
                <Button className="w-fit" asChild>
                  <Link href="#">{banner}</Link>
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="grid grid-cols-5 gap-4">
        {filtersData.map((filter, index: number) => (
          <FilterSelectField key={index} data={filter} />
        ))}
      </div>
    </div>
  )
}

export default Filters
