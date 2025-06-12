export const getFilterMapping = (
  filterNames: string[],
  productParameters: [[{ name: string; value: string }]],
) => {
  const filterMap = new Map()

  filterNames.forEach((filterName: string) => {
    filterMap.set(filterName, new Set())
  })

  productParameters.forEach((paramList: [{ name: string; value: string }]) => {
    paramList.forEach((param: { name: string; value: string }) => {
      if (filterMap.has(param.name)) {
        filterMap.get(param.name).add(param.value)
      }
    })
  })

  return filterNames.map((filterName: string): { name: string; options: string[] } => ({
    name: filterName,
    options: Array.from(filterMap.get(filterName)),
  }))
}
