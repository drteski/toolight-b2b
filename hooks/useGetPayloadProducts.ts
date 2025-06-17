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
  let where = payloadParamsGraphQLBuilder(query)

  where.AND = where.AND || []
  if (category !== '') {
    where.AND.push({
      category: {
        slug: { equals: category },
      },
    })
  }
  where = { active: { equals: true }, ...where }
  if (singleProduct) where = { active: { equals: true }, slug: { equals: singleProduct }, ...where }
  const getPayloadProducts = async () => {
    // Uwaga: locale bez cudzysłowów — enum!
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
              }
              gallery {
                image{
                  url
                  width
                  height
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

    return await axios
      .post('/api/graphql', graphqlQuery, {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const graphqlResponse = res.data

        // Obsługa błędów GraphQL
        if (graphqlResponse.errors) {
          throw new Error(graphqlResponse.errors[0].message)
        }

        return graphqlResponse.data?.Products
      })
      .catch((error) => {
        console.error('GraphQL error:', error)
        return {
          message: error.message,
        }
      })
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['productsGraphQL', locale, page, category, query],
    queryFn: getPayloadProducts,
  })

  return { data, error, isError, isLoading }
}

export default useGetPayloadProductsGraphQL
