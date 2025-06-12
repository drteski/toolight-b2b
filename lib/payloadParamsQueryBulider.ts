const payloadParamsGraphQLBuilder = (filters: { [key: string]: string[] } | null) => {
  if (filters === null) return {}

  const AND: any[] = []

  Object.entries(filters).forEach(([paramName, values]) => {
    AND.push({
      // parameters__name: { equals: paramName },
      parameters__value: { in: values },
    })
  })

  return { AND }
}

export default payloadParamsGraphQLBuilder
