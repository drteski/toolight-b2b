'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const useQueryParamsObject = () => {
  const searchParams = useSearchParams()

  return useMemo(() => {
    const keys = Array.from(new Set(searchParams.keys()))

    // Jeśli brak parametrów — zwróć null
    if (keys.length === 0) {
      return null
    }

    const obj: Record<string, string[]> = {}

    for (const key of keys) {
      obj[key] = searchParams.getAll(key)
    }

    return obj
  }, [searchParams])
}
