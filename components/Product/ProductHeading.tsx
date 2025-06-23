import React from 'react'
import { PageHeading } from '@/components/Main/PageHeading'

type ProductHeadingProps = {
  device: string
  layout: {
    productTagNew: string
    productTagSale: string
  }
  locale: string
  data: {
    title: string
    sku: string
    ean: string
    new: boolean
    sale: boolean
  }
}
export const ProductHeading = ({ device, layout, locale, data }: ProductHeadingProps) => {
  if (device === 'mobile')
    return (
      <div className="flex flex-col gap-2 w-full">
        <PageHeading title={data.title} locale={locale} product={data.title} />
        <div className="flex justify-between items-center w-full px-padding">
          <div className="flex flex-col gap-1 text-xs text-neutral-500">
            <span>
              <strong>SKU: </strong>
              {data.sku}
            </span>
            <span>
              <strong>EAN: </strong>
              {data.ean}
            </span>
          </div>
          <div className="flex gap-2">
            {data.new && (
              <span className="px-3 py-1.5 rounded-sm text-sm bg-accent text-white">
                {layout.productTagNew}
              </span>
            )}
            {data.sale && (
              <span className="px-3 py-1.5 rounded-sm text-sm bg-green-600 text-white">
                {layout.productTagSale}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  if (device === 'desktop')
    return (
      <>
        <PageHeading title={data.title} locale={locale} product={data.title} />
        <div className="flex gap-2 px-padding text-xs text-neutral-500">
          <span>
            <strong>SKU: </strong>
            {data.sku}
          </span>
          <span>
            <strong>EAN: </strong>
            {data.ean}
          </span>
        </div>
      </>
    )
}
