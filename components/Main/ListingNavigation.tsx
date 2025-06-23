'use client'

import React, { useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ListingNavigationProps = {
  nav: {
    page: string
    totalPages: string
    prevPage: string | null
    nextPage: string | null
  }
  layout: {
    listing: {
      pages: string
      from: string
      nextPage: string
      prevPage: string
    }
  }
}

export const ListingNavigation = ({ nav, layout }: ListingNavigationProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )
  const handlePageChange = (page: string | null) => {
    if (page)
      router.push(
        pathname + '?' + createQueryString('page', page > nav.totalPages ? nav.totalPages : page),
      )
  }
  return (
    <div className="max-w-inner-wrapper mx-auto my-0 px-padding flex justify-center gap-2 items-center">
      <Button
        className="cursor-pointer"
        size="icon"
        aria-label={layout.listing.prevPage}
        disabled={nav.prevPage === null}
        onClick={() => handlePageChange(nav.prevPage)}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Input
        placeholder={`${nav.page} ${layout.listing.from} ${nav.totalPages} ${layout.listing.pages}`}
        type="number"
        className="max-w-20"
        onChange={(e) => handlePageChange(e.target.value)}
      />
      <Button
        className="cursor-pointer"
        size="icon"
        aria-label={layout.listing.nextPage}
        disabled={nav.nextPage === null}
        onClick={() => handlePageChange(nav.nextPage)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
