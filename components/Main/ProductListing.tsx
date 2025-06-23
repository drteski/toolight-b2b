'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

type ProductListingProps = {
  products: [
    {
      id: string
      title: string
      slug: string
      sku: string
      ean: string
      new: boolean
      sale: boolean
      category: {
        slug: string
      }
      mainImage: {
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
  layout: {
    productTagNew: string
    productTagSale: string
    noProducts: string
  }
}

export const ProductListing = ({ products, layout }: ProductListingProps) => {
  const pathname: string = usePathname()
  return (
    <div className="max-w-inner-wrapper mx-auto my-0 px-padding relative">
      {products.length <= 0 ? (
        <div className="py-padding-vertical grid grid-cols-1 items-center justify-center h-[70dvh]">
          <p className="text-xl uppercase text-neutral-300 text-center">{layout.noProducts}</p>
        </div>
      ) : (
        <div className="py-padding-vertical grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-padding">
          {products.map((product) => {
            return (
              <Link
                key={product.id}
                className="group/tile"
                aria-label={product.title}
                href={`${pathname.replace(product.category ? `/${product.category.slug}` : '', '')}${product.category ? `/${product.category.slug}` : ''}/${product.slug}`}
              >
                <div className="border border-neutral-200 group-hover/tile:border-accent transition-colors rounded-xl overflow-hidden">
                  <Image
                    src={product.mainImage.sizes.thumbnail.url}
                    width={product.mainImage.sizes.thumbnail.width}
                    height={product.mainImage.sizes.thumbnail.height}
                    alt={product.title}
                    className="object-contain object-center aspect-square w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 pt-2 h-8">
                    {product.new && (
                      <div className="text-xs uppercase font-medium px-2 py-1 rounded-sm bg-accent text-white">
                        {layout.productTagNew}
                      </div>
                    )}
                    {product.sale && (
                      <div className="text-xs uppercase font-medium px-2 py-1 rounded-sm bg-green-600 text-white">
                        {layout.productTagSale}
                      </div>
                    )}
                  </div>
                  <h2 className="text-wrap text-ellipsis text-lg font-medium">{product.title}</h2>
                  <span className="text-sm text-neutral-500">
                    <strong>SKU: </strong>
                    {product.sku}
                  </span>
                  <span className="text-sm text-neutral-500">
                    <strong>EAN: </strong>
                    {product.ean}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
