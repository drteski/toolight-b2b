'use client'
import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useGetPayloadData } from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import { useSearch } from '@/hooks/useSearch'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type SearchProps = {
  locale: string
  layout: {
    searchPlaceholderDropdown: string
    noProducts: string
    showAll: string
    mainMenuLinkUrl: string
  }
  isOpen?: boolean
}

type ProductProps = {
  id: string
  title: string
  slug: string
  sku: string
  ean: string
  new: boolean
  sale: boolean
  mainImage: {
    sizes: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
    }
  }
  category: {
    slug: string
  }
}

type SearchDataProps = SearchProps

const SearchData = forwardRef<HTMLInputElement, SearchDataProps>(
  ({ locale, layout, isOpen }, ref) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const { data, isLoading } = useSearch(locale, searchQuery) as {
      data: { docs: ProductProps[]; totalDocs: number }
      isLoading: boolean
    }

    useEffect(() => {
      if (isOpen && ref && 'current' in ref && ref.current) {
        const timeoutId = setTimeout(() => {
          ref.current?.focus()
          ref.current?.select()
        }, 100)

        return () => clearTimeout(timeoutId)
      }
    }, [isOpen, ref])

    return (
      <DrawerContent className="h-screen lg:max-w-[calc(var(--spacing-inner-wrapper)_-_2_*_var(--spacing-padding))] mx-auto my-0">
        <DrawerHeader className="p-padding">
          <DrawerTitle>
            <span className="flex items-center gap-4">
              <Input
                ref={ref}
                value={searchQuery}
                className="py-8 placeholder:text-neutral-600 bg-white! text-neutral-900 border-neurtal-600  focus-visible:border-neural-900"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={layout.searchPlaceholderDropdown}
                autoFocus
              />
              <DrawerClose onClick={() => setSearchQuery('')}>
                <XIcon className="size-8" />
              </DrawerClose>
            </span>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="px-padding pb-padding h-full w-full">
          {!isLoading && (
            <>
              {searchQuery.length < 3 ? (
                <></>
              ) : data.docs.length === 0 ? (
                <span className="flex items-center justify-center text-center text-xl h-full">
                  {layout.noProducts}
                </span>
              ) : (
                <span className="grid grid-rows-[1fr_auto] gap-4">
                  <span className="overflow-y-auto h-[calc(80dvh_-_66px_-_28px_-_var(--spacing-padding)*4)]">
                    <span className="flex flex-col gap-2">
                      {data.docs.map((product: ProductProps) => (
                        <DrawerClose key={product.slug} onClick={() => setSearchQuery('')} asChild>
                          <Link
                            href={`/${locale}/${layout.mainMenuLinkUrl}/${product.slug}`}
                            className="flex items-center border overflow-hidden border-neutral-200 rounded-md hover:border-accent transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <Image
                                src={product.mainImage.sizes.thumbnail.url}
                                width={product.mainImage.sizes.thumbnail.width}
                                height={product.mainImage.sizes.thumbnail.height}
                                alt={product.title}
                                className="object-cover object-center size-20"
                              />
                              <span className="flex flex-col gap-0.5">
                                <span className="text-foreground font-medium text-lg">
                                  {product.title}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  <strong>SKU: </strong>
                                  {product.sku}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  <strong>EAN: </strong>
                                  {product.ean}
                                </span>
                              </span>
                            </span>
                          </Link>
                        </DrawerClose>
                      ))}
                    </span>
                  </span>
                  <DrawerClose asChild>
                    <Button className="w-full" variant="secondary" name={layout.showAll} asChild>
                      <Link href={`/${layout.mainMenuLinkUrl}?search=${searchQuery}`}>
                        {layout.showAll}
                      </Link>
                    </Button>
                  </DrawerClose>
                </span>
              )}
            </>
          )}
        </DrawerDescription>
      </DrawerContent>
    )
  },
)

SearchData.displayName = 'SearchData'

export const Search = ({ locale }: { locale: string }) => {
  const { data, isLoading } = useGetPayloadData('layout', true, locale)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if (isLoading) return <Loading />

  return (
    <div>
      <Drawer direction="top" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger
          name={data.header.searchPlaceholder}
          aria-label={data.header.searchPlaceholder}
          className="flex items-center justify-center p-2 xs:p-0"
          onClick={() => setIsDrawerOpen(true)}
        >
          <SearchIcon className="flex xs:hidden text-foreground size-8" />
          <div className="hidden xs:flex rounded-md cursor-pointer text-neutral-900 hover:text-accent transition-colors  bg-background hover:bg-accent/10 px-5 py-3 items-center gap-2">
            <SearchIcon className="size-6" />
            <span className="">{data.header.searchPlaceholder}</span>
          </div>
        </DrawerTrigger>
        <SearchData
          locale={locale}
          layout={{ ...data.header, ...data.other.defaultCategoryPage }}
          ref={inputRef}
          isOpen={isDrawerOpen}
        />
      </Drawer>
    </div>
  )
}
