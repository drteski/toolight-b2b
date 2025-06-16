export const transformParameters = (
  input: Record<string, { name: string; value?: string }[]>,
): {
  name: Record<string, string>
  value: Record<string, string>
}[] => {
  const resultMap = new Map<
    string,
    { name: Record<string, string>; value: Record<string, string> }
  >()

  for (const lang in input) {
    const entries = input[lang]

    if (!Array.isArray(entries)) continue

    entries.forEach(({ name, value }, index) => {
      if (!name) return // pomijamy jeśli nie ma name

      const key = `${index}`

      if (!resultMap.has(key)) {
        resultMap.set(key, { name: {}, value: {} })
      }

      const param = resultMap.get(key)!

      param.name[lang] = name
      param.value[lang] = typeof value === 'string' ? value : ''
    })
  }

  return Array.from(resultMap.values())
}
