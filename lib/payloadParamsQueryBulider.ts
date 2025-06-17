const payloadParamsGraphQLBuilder = (filters: { [key: string]: string[] } | null) => {
  if (filters === null) return {}

  const OR: any[] = []
  const AND: any[] = []

  Object.entries(filters).forEach(([paramName, values]) => {
    if (paramName === 'limit' || paramName === 'page') return
    OR.push({
      parameters__name: { equals: paramName },
      parameters__value: { in: values },
    })
  })

  AND.push({ OR })

  return { AND }
}

export default payloadParamsGraphQLBuilder
