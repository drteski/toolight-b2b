'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetCategoryIdBySlug = (slug: string | undefined, locale: string) => {
  const getCategoryId = async () => {
    if (!slug) return null

    const graphqlQuery = {
      query: `
        query GetCategoryIdBySlug {
          Categories(where: { slug: { equals: "${slug}" } }, locale: ${locale}) {
            docs {
              id
              slug
            }
          }
        }
      `,
    }

    return await axios
      .post('/api/graphql', graphqlQuery, {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const graphqlResponse = res.data

        if (graphqlResponse.errors) {
          throw new Error(graphqlResponse.errors[0].message)
        }

        const categoryDoc = graphqlResponse.data?.Categories?.docs?.[0]

        return categoryDoc?.id ? String(categoryDoc.id) : null
      })
      .catch((error) => {
        console.error('GraphQL error (CategoryIdBySlug):', error.response?.data || error)
        return null
      })
  }

  const {
    data: categoryId,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['categoryIdBySlug', slug, locale],
    queryFn: getCategoryId,
    enabled: !!slug, // tylko jeżeli slug podany (nie pusty / undefined)
    staleTime: 1000 * 60 * 5, // cache 5 min
    refetchOnWindowFocus: false,
  })

  return { categoryId, isLoading, isError, error }
}

const useGetProductParameters = (locale: string, categorySlug?: string) => {
  // Normalizacja categorySlug → undefined jeżeli pusty
  const normalizedCategorySlug =
    categorySlug && categorySlug.trim() !== '' ? categorySlug : undefined

  const { categoryId, isLoading: isLoadingCategory } = useGetCategoryIdBySlug(
    normalizedCategorySlug,
    locale,
  )

  // Produkcyjne: canRunQuery jako computed value, NIE state
  const canRunQuery = normalizedCategorySlug === undefined || categoryId !== undefined

  const getProductParameters = async () => {
    const whereParts: string[] = []

    if (normalizedCategorySlug && categoryId) {
      whereParts.push(`{ category: { equals: "${categoryId}" } }`)
    } else if (normalizedCategorySlug && categoryId === null) {
      console.warn(
        `Category slug "${normalizedCategorySlug}" not found — fetching without category filter.`,
      )
    }

    const whereClause = whereParts.length > 0 ? `where: { AND: [${whereParts.join(', ')}] }` : ''

    const formattedLocale = locale

    const graphqlQuery = {
      query: `
        query GetProductParameters {
          Products(locale: ${formattedLocale}, limit: 1000, ${whereClause}) {
            docs {
              parameters {
                name
                value
              }
            }
          }
        }
      `,
    }

    return await axios
      .post('/api/graphql', graphqlQuery, {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const graphqlResponse = res.data
        console.log(graphqlResponse)

        if (graphqlResponse.errors) {
          throw new Error(graphqlResponse.errors[0].message)
        }

        const products = graphqlResponse.data?.Products?.docs || []

        const paramMap: Record<string, Set<string>> = {}

        products.forEach((product: any) => {
          product.parameters?.forEach((param: any) => {
            if (!param.name || !param.value) return
            if (!paramMap[param.name]) {
              paramMap[param.name] = new Set()
            }
            paramMap[param.name].add(param.value)
          })
        })

        const paramObject: Record<string, string[]> = {}
        Object.entries(paramMap).forEach(([key, valueSet]) => {
          paramObject[key] = Array.from(valueSet).sort()
        })

        return paramObject
      })
      .catch((error) => {
        console.error('GraphQL error (ProductParameters):', error.response?.data || error)
        return {}
      })
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['productParameters', locale, normalizedCategorySlug, categoryId],
    queryFn: getProductParameters,
    enabled: canRunQuery,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  return { data, error, isError, isLoading: isLoading || isLoadingCategory }
}

export default useGetProductParameters
