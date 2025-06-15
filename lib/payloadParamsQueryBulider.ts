const payloadParamsGraphQLBuilder = (filters: { [key: string]: string[] } | null) => {
  if (filters === null) return {}

  const OR: any[] = []
  const AND: any[] = []

  Object.entries(filters).forEach(([paramName, values]) => {
    OR.push({
      // parameters__name: { equals: paramName },
      parameters__value: { in: values },
    })
  })

  return { OR, AND }
}

export default payloadParamsGraphQLBuilder
