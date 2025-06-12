export function payloadParamsGraphQLBuilder(filters: { [key: string]: string[] } | null) {
  if (filters === null) return {}

  const and: any[] = []

  const filterEntries = Object.entries(filters)
  filterEntries.forEach(([paramName, values]) => {
    and.push({
      parameters: {
        elemMatch: {
          name: { equals: paramName },
          value: { in: values },
        },
      },
    })
  })

  return { and }
}
