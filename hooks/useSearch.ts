'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useSearch = (locale: string, queryString: string) => {
  const getProducts = async () => {
    const where = {
      active: { equals: true },
      OR: [
        { title: { contains: queryString } },
        { sku: { contains: queryString } },
        { ean: { contains: queryString } },
      ],
    }

    const graphqlQuery = {
      query: `
        query GetProducts {
          Products(locale: ${locale}, limit: 20, where: ${JSON.stringify(where).replace(/"([^"]+)":/g, '$1:')}) {
            docs {
              new
              sale
              sku
              ean
              title
              slug
              category {
                title
                slug
              }
              mainImage {
                sizes {
                  thumbnail {
                      url
                      width
                      height
                  }
                }
              }
            }
            totalDocs
          }
        }
      `,
    }

    try {
      const res = await axios.post('/api/graphql', graphqlQuery, {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        },
      })

      if (res.data.errors) {
        throw new Error(res.data.errors[0].message)
      }
      const prepedProducts = (res.data.data?.Products.docs || []).map(
        (product: { slug: string; category: null | { slug: string } }) => {
          const { slug, category } = product
          let productSlug = slug
          if (category) productSlug = `${category.slug}/${slug}`
          return {
            ...product,
            slug: productSlug,
          }
        },
      )
      return { docs: prepedProducts, totalDocs: res.data.data?.Products.totalDocs }
    } catch (error: any) {
      console.error('GraphQL error:', error)
      return { message: error.message }
    }
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['search', locale, queryString],
    queryFn: getProducts,
  })

  return { data, error, isError, isLoading }
}
