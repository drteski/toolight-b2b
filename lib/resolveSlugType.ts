import axios from 'axios'

export const resolveSlugType = async (
  slug: string,
  locale: string,
): Promise<'category' | 'product' | null> => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
  try {
    // zapytanie do kategorii
    const categoryRes = await axios.post(
      `${BASE_URL}/api/graphql`,
      {
        query: `
          query GetCategories {
            Categories(locale: ${locale} limit: 1, where: { slug: { equals: "${slug}" } }) {
              docs {
                id
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

    const isCategory = categoryRes.data?.data?.Categories?.docs?.length > 0
    if (isCategory) return 'category'

    // zapytanie do produktów
    const productRes = await axios.post(
      `${BASE_URL}/api/graphql`,
      {
        query: `
          query GetProducts {
            Products(locale: ${locale} limit: 1, where: { slug: { equals: "${slug}" } }) {
              docs {
                id
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

    const isProduct = productRes.data?.data?.Products?.docs?.length > 0
    if (isProduct) return 'product'

    return null
  } catch (error) {
    console.error('resolveSlugType error:', error)
    return null
  }
}
