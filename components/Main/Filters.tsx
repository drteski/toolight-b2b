'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import FilterSelectField from '@/components/Main/FilterSelectField'
import { getFilterMapping } from '@/lib/filterMapping'

const Filters = ({ products, isCategory, filters }) => {
  const filterNames = filters.map((filter: { name: string }) => filter.name)

  const productParameters = products.map((product: { parameters: [] }) => product.parameters)
  const filtersData = getFilterMapping(filterNames, productParameters)

  return (
    <div className="flex flex-col">
      {isCategory && (
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
        {filtersData.map((filter: { name: string; values: string[] }) => (
          <FilterSelectField data={filter} />
        ))}
      </div>
    </div>
  )
}

export default Filters
