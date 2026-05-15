export type QueryPrimitive = string | number | boolean | null | undefined
export type QueryValue = QueryPrimitive | QueryPrimitive[]
export type QueryParams = Record<string, QueryValue>

export function compactQueryParams(params: QueryParams) {
  return Object.fromEntries(
    Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          const values = value.filter((item) => item !== null && item !== undefined && item !== '')
          return values.length ? [key, values] : null
        }

        if (value === null || value === undefined || value === '') {
          return null
        }

        return [key, value]
      })
      .filter(Boolean) as Array<[string, Exclude<QueryValue, null | undefined>]>,
  )
}

export function toSearchParams(params: QueryParams) {
  const searchParams = new URLSearchParams()
  const compacted = compactQueryParams(params)

  Object.entries(compacted).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value]
    values.forEach((item) => searchParams.append(key, String(item)))
  })

  return searchParams
}

export function stringifyQueryParams(params: QueryParams) {
  const query = toSearchParams(params).toString()
  return query ? `?${query}` : ''
}

export function withQueryParams(path: string, params: QueryParams) {
  const [basePath, existingQuery = ''] = path.split('?')
  const searchParams = new URLSearchParams(existingQuery)

  Object.entries(compactQueryParams(params)).forEach(([key, value]) => {
    searchParams.delete(key)
    const values = Array.isArray(value) ? value : [value]
    values.forEach((item) => searchParams.append(key, String(item)))
  })

  const query = searchParams.toString()
  return query ? `${basePath}?${query}` : basePath
}

export function getStringQueryParam(value: unknown, fallback = '') {
  if (Array.isArray(value)) return String(value[0] ?? fallback)
  return typeof value === 'string' ? value : fallback
}

export function getNumberQueryParam(value: unknown, fallback = 1) {
  const rawValue = getStringQueryParam(value)
  const numberValue = Number(rawValue)
  return Number.isFinite(numberValue) ? numberValue : fallback
}
