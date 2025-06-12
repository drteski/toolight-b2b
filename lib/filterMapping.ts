export const getFilterMapping = (filterNames: string[], data: Record<string, string[]> = {}) => {
  const filterMap = new Map<string, Set<string>>()

  filterNames.forEach((filterName: string) => {
    filterMap.set(filterName, new Set(data[filterName] || []))
  })

  return filterNames
    .map((filterName: string): { name: string; options: string[] } => ({
      name: filterName,
      options: Array.from(filterMap.get(filterName) ?? []),
    }))
    .filter((filter) => filter.options.length > 0)
}
