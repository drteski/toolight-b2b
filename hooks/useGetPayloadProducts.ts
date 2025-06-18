'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import payloadParamsGraphQLBuilder from '@/lib/payloadParamsQueryBulider'

const useGetPayloadProductsGraphQL = (
  locale: string,
  page: string | null = '1',
  category: string = '',
  query: { [key: string]: string[] } | null = null,
  singleProduct: string = '',
) => {
  const getCategoryId = async (): Promise<number | null> => {
    if (!category) return null
    try {
      const res = await axios.post(
        '/api/graphql',
        {
          query: `
            query GetCategories {
              Categories(locale: ${locale}, limit: 1, where: { slug: { equals: "${category}" } }) {
                docs {
                  id
                  slug
                }
              }
            }
          `,
        },
        {
          headers: {
            'Accept-Language': locale,
            'Content-Type': 'application/json',
          },
        },
      )
      return res.data?.data?.Categories?.docs?.[0]?.id ?? null
    } catch (err) {
      console.error('getCategory error:', err)
      return null
    }
  }

  const getPayloadProducts = async () => {
    const where = payloadParamsGraphQLBuilder(query) || {}
    where.AND = where.AND || []
    where.active = { equals: true }

    if (singleProduct) {
      where.slug = { equals: singleProduct }
    }

    const categoryId = await getCategoryId()
    if (categoryId) {
      where.AND.push({ category: { equals: categoryId } })
    }

    const graphqlQuery = {
      query: `
        query GetProducts {
          Products(locale: ${locale}, limit: 24, page: ${page}, where: ${JSON.stringify(where).replace(/"([^"]+)":/g, '$1:')}) {
            docs {
              active
              new
              sale
              sku
              ean
              id
              title
              slug
              category {
                slug
              }
              mainImage {
                url
                width
                height
                sizes {
                  thumbnail {
                      url
                      width
                      height
                  }
                  main {
                      url
                      width
                      height
                  }
                }
              }
              gallery {
                image {
                  url
                  width
                  height
                  sizes {
                  thumbnail {
                      url
                      width
                      height
                  }
                  main {
                      url
                      width
                      height
                  }
                }
                }
              }
            }
            totalDocs
            nextPage
            prevPage
            limit
            page
            totalPages
          }
        }
      `,
    }

    try {
      const res = await axios.post('/api/graphql', graphqlQuery, {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
      })

      if (res.data.errors) {
        throw new Error(res.data.errors[0].message)
      }

      return res.data.data?.Products
    } catch (error: any) {
      console.error('GraphQL error:', error)
      return { message: error.message }
    }
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['productsGraphQL', locale, page, category, query, singleProduct],
    queryFn: getPayloadProducts,
  })

  return { data, error, isError, isLoading }
}

export default useGetPayloadProductsGraphQL
