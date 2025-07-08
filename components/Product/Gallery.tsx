'use client'
import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type GalleryProps = {
  data: {
    title: string
    gallery: [
      {
        image: {
          id: string
          url: string
          width: number
          height: number
          sizes: {
            thumbnail: {
              url: string
              width: number
              height: number
            }
          }
        }
      },
    ]
  }
}

const Gallery = ({ data }: GalleryProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback(() => {
    if (!api || !thumbApi) return

    const selected = api.selectedScrollSnap()
    setCurrent(selected)
    thumbApi.scrollTo(selected)
  }, [api, thumbApi])

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api || !thumbApi) return

      setCurrent(index)
      api.scrollTo(index)
      thumbApi.scrollTo(index)
    },
    [api, thumbApi],
  )

  React.useEffect(() => {
    if (!api) return

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  if (!data.gallery || data.gallery.length <= 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-neutral-200 rounded-xl overflow-hidden">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {data.gallery.map((productImg, index) => (
              <CarouselItem key={productImg.image.id || index}>
                <Image
                  src={productImg.image.url}
                  width={productImg.image.width}
                  height={productImg.image.height}
                  alt={`${data.title} ${index + 1}`}
                  className="object-contain object-center aspect-square h-full"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {data.gallery.length > 1 && (
        <div className="w-full overflow-hidden">
          <Carousel
            setApi={setThumbApi}
            className="w-full"
            opts={{
              align: 'start',
              containScroll: 'keepSnaps',
              dragFree: true,
            }}
          >
            <CarouselContent className="ml-0">
              {data.gallery.map((productImg, index) => (
                <CarouselItem
                  key={`thumb-${productImg.image.id || index}`}
                  className="pl-4 basis-auto"
                >
                  <button
                    onClick={() => onThumbClick(index)}
                    className={cn(
                      'border cursor-pointer w-18 aspect-square border-neutral-200 rounded-md overflow-hidden transition-all duration-200',
                      current === index
                        ? 'border-accent ring-2 ring-accent/20'
                        : 'hover:border-neutral-300',
                    )}
                    aria-label={`Przejdź do zdjęcia ${index + 1}`}
                  >
                    <Image
                      src={productImg.image.sizes.thumbnail.url}
                      width={productImg.image.sizes.thumbnail.width}
                      height={productImg.image.sizes.thumbnail.height}
                      alt={`${data.title} miniatura ${index + 1}`}
                      className={cn(
                        'object-contain aspect-square object-center transition-opacity duration-200',
                        current === index ? 'opacity-100' : 'opacity-80 hover:opacity-90',
                      )}
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default Gallery
