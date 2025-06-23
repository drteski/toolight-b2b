'use client'
import React from 'react'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { AboutUsItem, Locale } from '@/lib/types'

const AboutUsData = ({ locale }: Locale) => {
  const { data, isLoading } = useGetPayloadData('about-us', true, locale)
  if (isLoading) return <Loading />
  return (
    <div className="max-w-inner-wrapper mx-auto my-0">
      <div className="hidden xs:grid grid-cols-2 grid-rows-2 gap-padding pt-padding">
        {data.aboutUs.map((item: AboutUsItem) => (
          <div
            key={item.title}
            className="p-padding bg-neutral-100 rounded-xl flex flex-col gap-[calc(var(--spacing-padding)/2)]"
          >
            <div className="flex items-center gap-[calc(var(--spacing-padding)/2)]">
              {item.icon !== null && (
                <Image
                  src={item.icon.url}
                  width={item.icon.width}
                  height={item.icon.height}
                  alt={item.title}
                  className="object-cover object-center size-12"
                />
              )}
              <h3 className="text-2xl font-medium text-foreground">{item.title}</h3>
            </div>
            <div className="text-neutral-600 text-base leading-7">{item.description}</div>
          </div>
        ))}
      </div>
      <div className="block xs:hidden px-padding pt-padding">
        <Accordion
          className="flex flex-col gap-padding"
          defaultValue={data.aboutUs[0]?.title}
          type="single"
          collapsible
        >
          {data.aboutUs.map((item: AboutUsItem) => (
            <AccordionItem
              className="p-padding bg-neutral-100 rounded-xl flex flex-col gap-[calc(var(--spacing-padding)/2)]"
              key={item.title}
              value={item.title}
            >
              <AccordionTrigger className="p-0 flex items-center hover:no-underline">
                <div className="flex items-center gap-[calc(var(--spacing-padding)/2)]">
                  {item.icon !== null && (
                    <Image
                      src={item.icon.url}
                      width={item.icon.width}
                      height={item.icon.height}
                      alt={item.title}
                      className="object-cover object-center size-8"
                    />
                  )}
                  <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="text-neutral-600 text-base leading-7">{item.description}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export const AboutUs = () => {
  const { code } = useCurrentLocale()
  const { data, isLoading } = useGetPayloadData('layout', true, code)
  if (isLoading) return <Loading />
  return (
    <div id="about-us" className="py-padding-vertical scroll-m-offset-[1000px]">
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding">
        <h2 className="uppercase text-3xl xs:text-4xl font-bold">{data.sections.aboutUs}</h2>
      </div>
      <AboutUsData locale={code} />
    </div>
  )
}
