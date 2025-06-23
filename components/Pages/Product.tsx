'use client'
import React from 'react'
import { useGetPayloadProducts } from '@/hooks/useGetPayloadProducts'
import Loading from '@/app/(frontend)/[lang]/loading'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import { ProductCta } from '@/components/Product/ProductCta'
import { ProductHeading } from '@/components/Product/ProductHeading'
import Gallery from '@/components/Product/Gallery'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type ProductDataProps = {
  locale: string
  product: string
  layout: {
    productBtnPrice: string
    productBtnCard: string
    productDetails: string
    productDescription: string
    productDownload: string
    productTagNew: string
    productTagSale: string
  }
}

const ProductData = ({ locale, product, layout }: ProductDataProps) => {
  const { data, isLoading } = useGetPayloadProducts(locale, '1', '', {}, product)
  if (isLoading) return <Loading />
  return (
    <>
      <div className="hidden xs:block">
        <div className="flex justify-between items-center max-w-inner-wrapper mx-auto my-0">
          <div className="flex flex-col gap-2">
            <ProductHeading device="desktop" layout={layout} locale={locale} data={data.docs[0]} />
          </div>
          <ProductCta device="desktop" layout={layout} data={data.docs[0]} />
        </div>
        <div className="max-w-inner-wrapper mx-auto my-0 p-padding">
          <div className="grid grid-cols-[480px_1fr] gap-padding">
            <Gallery data={data.docs[0]} />
            <div className="flex flex-col gap-padding-half">
              <div className="flex gap-2">
                {data.docs[0].new && (
                  <span className="px-3 py-1.5 rounded-sm text-sm bg-accent text-white">
                    {layout.productTagNew}
                  </span>
                )}
                {data.docs[0].sale && (
                  <span className="px-3 py-1.5 rounded-sm text-sm bg-green-600 text-white">
                    {layout.productTagSale}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-padding">
                <div className="flex flex-col gap-padding-half">
                  <h2 className="text-2xl font-bold">{layout.productDescription}</h2>
                  <p className="text-[15px] leading-7">{data.docs[0].description}</p>
                </div>
                <div className="flex flex-col gap-padding-half">
                  <h2 className="text-2xl font-bold">{layout.productDetails}</h2>
                  <Table className="w-full">
                    <TableBody>
                      {data.docs[0].parameters.map((parameter: { name: string; value: string }) => {
                        const { name, value } = parameter
                        if (value === '') return
                        return (
                          <TableRow key={name} className="text-sm">
                            <TableCell className="pl-0 py-1">{parameter.name}</TableCell>
                            <TableCell className="font-bold pl-4 py-1">{parameter.value}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block xs:hidden">
        <div className="flex justify-between items-center max-w-inner-wrapper mx-auto my-0">
          <ProductHeading device="mobile" layout={layout} locale={locale} data={data.docs[0]} />
        </div>
        <div className="max-w-inner-wrapper mx-auto my-0 p-padding flex flex-col gap-padding">
          <Gallery data={data.docs[0]} />
          <Accordion
            className="flex flex-col gap-padding"
            defaultValue="description"
            type="single"
            collapsible
          >
            <AccordionItem
              className="p-padding bg-neutral-100 rounded-xl flex flex-col gap-[calc(var(--spacing-padding)/2)]"
              value="description"
            >
              <AccordionTrigger className="p-0 flex items-center hover:no-underline">
                <div className="flex items-center gap-[calc(var(--spacing-padding)/2)]">
                  <h3 className="text-lg font-medium text-foreground">
                    {layout.productDescription}
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="text-neutral-600 text-base leading-7">
                  {data.docs[0].description}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="p-padding bg-neutral-100 rounded-xl flex flex-col gap-[calc(var(--spacing-padding)/2)]"
              value="parameters"
            >
              <AccordionTrigger className="p-0 flex items-center hover:no-underline">
                <div className="flex items-center gap-[calc(var(--spacing-padding)/2)]">
                  <h3 className="text-lg font-medium text-foreground">{layout.productDetails}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <Table className="w-full">
                  <TableBody>
                    {data.docs[0].parameters.map((parameter: { name: string; value: string }) => {
                      const { name, value } = parameter
                      if (value === '') return
                      return (
                        <TableRow key={name} className="text-sm">
                          <TableCell className="pl-0">{parameter.name}</TableCell>
                          <TableCell className="font-bold pl-4">{parameter.value}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <ProductCta device="mobile" layout={layout} data={data.docs[0]} />
      </div>
    </>
  )
}

export const Product = ({ locale, product }: { locale: string; product: string }) => {
  const { data, isLoading } = useGetPayloadData('layout', true, locale)
  if (isLoading) return <Loading />
  return (
    <div>
      <ProductData locale={locale} product={product} layout={data.products} />
    </div>
  )
}
