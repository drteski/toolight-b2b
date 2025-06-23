// 'use client'
//
// import React, { useRef, useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { FreeMode, Navigation, Thumbs, A11y, Autoplay } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import { useGetPayloadData } from '@/hooks/useGetPayloadData'
// import Image from 'next/image'
// import { useCurrentLocale } from '@/hooks/useCurrentLocale'
// import { useWindowSize } from '@/hooks/useWindowSize'
// import Loading from '@/app/(frontend)/[lang]/loading'
// import { Swiper as SwiperClass } from 'swiper/types'
// import { BannerItem, BannerProps } from '@/lib/types'
//
// const BannerData = ({ banners }: BannerProps) => {
//   const swiperRef = useRef<SwiperClass | null>(null)
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
//   const { width } = useWindowSize()
//   const { data, isLoading } = useGetPayloadData('layout', true, 'pl')
//   if (isLoading) return <Loading />
//   return (
//     <>
//       <Swiper
//         spaceBetween={0}
//         slidesPerView={1}
//         grabCursor
//         autoplay={
//           data.banners.bannerAutoplay && {
//             delay: data.banners.bannerAutoplayDelay * 1000,
//             pauseOnMouseEnter: true,
//             waitForTransition: true,
//           }
//         }
//         thumbs={{ swiper: thumbsSwiper }}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         modules={[FreeMode, Navigation, Thumbs, A11y, Autoplay]}
//         className="banners overflow-hidden h-[70dvh]"
//         a11y={{
//           prevSlideMessage: 'Poprzedni baner',
//           nextSlideMessage: 'Następny baner',
//           slideLabelMessage: 'Slajd {{index}} z {{slidesLength}}',
//         }}
//       >
//         {banners.map((banner: BannerItem) => (
//           <SwiperSlide key={banner.id}>
//             <Image
//               src={banner.sizes.main.url}
//               width={banner.sizes.main.width}
//               height={banner.sizes.main.height}
//               alt={banner.title}
//               className="object-cover h-full w-full object-center"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={16}
//         slidesPerView={width <= 991 ? 'auto' : 4}
//         centeredSlides={width <= 991}
//         watchSlidesProgress
//         className="mx-auto my-0 max-w-inner-wrapper"
//       >
//         {banners.map((banner: BannerItem) => {
//           return (
//             <SwiperSlide key={`thumb-${banner.id}`} className="group w-auto max-w-1/2 xs:max-w-1/4">
//               <span className="cursor-pointer uppercase font-medium py-4 flex items-center justify-center border-t-4 border-transparent group-[.swiper-slide-thumb-active]:text-primary group-[.swiper-slide-thumb-active]:border-primary transition-colors">
//                 {banner.title}
//               </span>
//             </SwiperSlide>
//           )
//         })}
//       </Swiper>
//     </>
//   )
// }
//
// export const Banner = () => {
//   const { code } = useCurrentLocale()
//   const { data, isLoading } = useGetPayloadData('banners', false, code)
//
//   if (isLoading) return <Loading />
//   return (
//     <div className="w-full">
//       <BannerData banners={data.docs} />
//     </div>
//   )
// }

'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import Image from 'next/image'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { useWindowSize } from '@/hooks/useWindowSize'
import Loading from '@/app/(frontend)/[lang]/loading'
import { BannerItem, BannerProps } from '@/lib/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'

const BannerData = ({ banners }: BannerProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const { width } = useWindowSize()
  const { data, isLoading } = useGetPayloadData('layout', true, 'pl')

  const onSelect = useCallback(() => {
    if (!api || !thumbsApi) return
    setCurrent(api.selectedScrollSnap())
    thumbsApi.scrollTo(api.selectedScrollSnap())
  }, [api, thumbsApi])

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api) return
      api.scrollTo(index)
    },
    [api],
  )

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
  }, [api, onSelect])

  if (isLoading) return <Loading />

  const autoplayPlugin = data.banners.bannerAutoplay
    ? Autoplay({
        delay: data.banners.bannerAutoplayDelay * 1000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      })
    : undefined

  return (
    <>
      <Carousel
        setApi={setApi}
        className="banners overflow-hidden h-[70dvh] w-full"
        plugins={autoplayPlugin ? [autoplayPlugin] : undefined}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {banners.map((banner: BannerItem) => (
            <CarouselItem key={banner.id}>
              <Image
                src={banner.sizes.main.url}
                width={banner.sizes.main.width}
                height={banner.sizes.main.height}
                alt={banner.title}
                className="object-cover h-full w-full object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel
        setApi={setThumbsApi}
        className="mx-auto my-0 max-w-inner-wrapper"
        opts={{
          align: width <= 991 ? 'center' : 'start',
          containScroll: 'keepSnaps',
          slidesToScroll: width <= 991 ? 1 : 4,
        }}
      >
        <CarouselContent className="ml-0 w-full">
          {banners.map((banner: BannerItem, index: number) => (
            <CarouselItem
              key={`thumb-${banner.id}`}
              className={cn(
                'group pl-4 basis-auto max-w-1/2 xs:w-1/4 ',
                width <= 991 && 'basis-1/2',
              )}
            >
              <button
                onClick={() => onThumbClick(index)}
                className={cn(
                  'cursor-pointer uppercase font-medium flex items-center justify-center border-t-4 border-transparent transition-colors w-full',
                  current === index && 'text-primary border-primary',
                )}
                aria-label={`Przejdź do banera: ${banner.title}`}
              >
                {banner.title}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}

export const Banner = () => {
  const { code } = useCurrentLocale()
  const { data, isLoading } = useGetPayloadData('banners', false, code)

  if (isLoading) return <Loading />
  return (
    <div className="w-full">
      <BannerData banners={data.docs} />
    </div>
  )
}
