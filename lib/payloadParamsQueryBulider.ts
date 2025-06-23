// Podstawowe typy dla warunków zapytania

// Typy dla różnych rodzajów warunków
interface ParameterCondition {
  parameters__name: { equals: string }
  parameters__value: { in: string[] }
}

interface SearchCondition {
  title?: { contains: string | string[] }
  sku?: { contains: string | string[] }
  ean?: { contains: string | string[] }
}

interface SimpleCondition {
  parameters__name: { equals: string }
}

type QueryCondition = ParameterCondition | SearchCondition | SimpleCondition

interface QueryParams {
  OR?: QueryCondition[]
  SEARCH?: SearchCondition[]
  AND?: (QueryParams | QueryCondition)[]
}

interface PayloadQueryResult {
  AND?: QueryParams[]
  OR?: QueryCondition[]
}

interface FilterInput {
  [key: string]: string[]
}

export const payloadParamsGraphQLBuilder = (filters: FilterInput | null): PayloadQueryResult => {
  if (filters === null) return {}

  const OR: QueryCondition[] = []
  let SEARCH: string = ''

  Object.entries(filters).forEach(([paramName, values]: [string, string[]]) => {
    if (paramName === 'limit' || paramName === 'page') return

    if (paramName === 'search') {
      SEARCH = values[0]
      return
    }

    const paramCondition: ParameterCondition = {
      parameters__name: { equals: paramName },
      parameters__value: { in: values },
    }
    OR.push(paramCondition)
  })

  if (OR.length === 0 && SEARCH.length === 0) return {}
  if (SEARCH.length !== 0)
    return {
      AND: [
        {
          OR: [
            { title: { contains: SEARCH } },
            { sku: { contains: SEARCH } },
            { ean: { contains: SEARCH } },
          ],
        },
        { OR },
      ],
    }
  return {
    AND: [{ OR }],
  }
}
