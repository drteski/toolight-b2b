'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Image from 'next/image'
import useCurrentLocale from '@/hooks/useCurrentLocale'
import useWindowSize from '@/hooks/useWindowSize'
import Loading from '@/app/(frontend)/[lang]/loading'
import { Swiper as SwiperClass } from 'swiper/types'

interface BannerItemProps {
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

const BannerData = ({ banners }: { banners: BannerItemProps[] }) => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
  const { width }: { width: number } = useWindowSize()
  const { data, isLoading } = useGetPayloadData('layout', true, 'pl')
  if (isLoading) return <Loading />
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor
        autoplay={
          data.banners.bannerAutoplay && {
            delay: data.banners.bannerAutoplayDelay * 1000,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }
        }
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[FreeMode, Navigation, Thumbs, A11y, Autoplay]}
        className="banners overflow-hidden h-[70dvh]"
        a11y={{
          prevSlideMessage: 'Poprzedni baner',
          nextSlideMessage: 'Następny baner',
          slideLabelMessage: 'Slajd {{index}} z {{slidesLength}}',
        }}
      >
        {banners.map((banner: BannerItemProps) => (
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
        spaceBetween={16}
        slidesPerView={width <= 991 ? 'auto' : 4}
        centeredSlides={width <= 991}
        watchSlidesProgress
        className="mx-auto my-0 max-w-inner-wrapper"
      >
        {banners.map((banner: BannerItemProps) => {
          return (
            <SwiperSlide key={`thumb-${banner.id}`} className="group w-auto max-w-1/2 xs:max-w-1/4">
              <span className="cursor-pointer uppercase font-medium py-4 flex items-center justify-center border-t-4 border-transparent group-[.swiper-slide-thumb-active]:text-primary group-[.swiper-slide-thumb-active]:border-primary transition-colors">
                {banner.title}
              </span>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

const Banner = () => {
  const { code } = useCurrentLocale()
  const { data, isLoading } = useGetPayloadData('banners', false, code)

  if (isLoading) return <Loading />
  return (
    <div className="w-full">
      <BannerData banners={data.docs} />
    </div>
  )
}

export default Banner
