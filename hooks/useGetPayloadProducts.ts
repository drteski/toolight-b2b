'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { payloadParamsGraphQLBuilder } from '@/lib/payloadParamsQueryBulider'

const useGetPayloadProducts = (
  locale: string,
  limit: string | null = '24',
  page: string | null = '1',
  category: string = '',
  query: { [key: string]: string[] } | null = null,
) => {
  const where = payloadParamsGraphQLBuilder(query)

  if (category !== '') {
    where.and = where.and || []
    where.and.push({
      category: {
        slug: { equals: category },
      },
    })
  }

  const getPayloadProducts = async () => {
    const graphqlQuery = {
      query: `
    query GetProducts {
      Products(locale: "${locale}", limit: ${limit}, page: ${page}, where: ${JSON.stringify(where).replace(/"([^"]+)":/g, '$1:')}) {
        docs {
          id
          title
          parameters {
            name
            value
          }
        }
        totalDocs
        limit
        page
        totalPages
      }
    }
        `,
      variables: {
        locale,
        limit,
        page,
      },
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
    queryKey: ['products', locale, limit, page, category, query],
    queryFn: getPayloadProducts,
  })

  return { data, error, isError, isLoading }
}

export default useGetPayloadProducts
