'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useSetQueryParam = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useCallback(
    (name: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      // Usuń stare wartości
      params.delete(name)

      // Dodaj nowe wartości
      values.forEach((value) => {
        params.append(name, value)
      })

      // Przejście do nowego URL (z parametrami)
      router.push(pathname + '?' + params.toString())
    },
    [router, pathname, searchParams],
  )
}
