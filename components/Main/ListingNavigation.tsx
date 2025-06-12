'use client'

import React, { useCallback, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const ListingNavigation = () => {
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
  // useEffect(() => {
  //   router.push(pathname + '?' + createQueryString('limit', '10'))
  // }, [pathname, createQueryString, router])
  return <div>nav</div>
}

export default ListingNavigation
