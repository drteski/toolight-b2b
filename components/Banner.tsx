'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Image from 'next/image'
import useCurrentLocale from '@/hooks/useCurrentLocale'
import useWindowSize from '@/hooks/useWindowSize'
import Loading from '@/app/(frontend)/[lang]/loading'

interface BannerProps {
  id: string
  title: string
  sizes: {
    main: {
      url: string
      width: number
      height: number
    }
  }
}

const Banner = () => {
  const { code } = useCurrentLocale()
  const swiperRef = useRef<any>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const { data, isLoading } = useGetPayloadData('banners', false, code)
  const { width }: { width: number } = useWindowSize()
  if (isLoading) return <Loading />
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[FreeMode, Navigation, Thumbs, A11y]}
        className="banners overflow-hidden h-[70dvh]"
        a11y={{
          prevSlideMessage: 'Poprzedni baner',
          nextSlideMessage: 'Następny baner',
          slideLabelMessage: 'Slajd {{index}} z {{slidesLength}}',
        }}
      >
        {data.docs.map((banner: BannerProps) => (
          <SwiperSlide key={banner.id}>
            <Image
              src={banner.sizes.main.url}
              width={banner.sizes.main.width}
              height={banner.sizes.main.height}
              alt={banner.title}
              className="object-cover h-full w-full object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={'auto'}
        centeredSlides
        watchSlidesProgress
        className="mx-auto my-0 max-w-inner-wrapper"
      >
        {data.docs.map((banner: BannerProps) => {
          return (
            <SwiperSlide key={`thumb-${banner.id}`} className="group w-[200px]! xs:w-1/4!">
              <span className="cursor-pointer font-medium py-4 flex items-center justify-center border-t-4 border-transparent group-[.swiper-slide-thumb-active]:text-primary group-[.swiper-slide-thumb-active]:border-primary transition-colors">
                {banner.title}
              </span>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Banner
