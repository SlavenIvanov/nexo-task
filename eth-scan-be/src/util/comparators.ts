import { NumberStringComparator } from '../db/schema/filter'

export function valueMatches(numStringA: string, comparator: NumberStringComparator, numStringB: string) {
  const a = BigInt(numStringA)
  const b = BigInt(numStringB)

  switch (comparator) {
    case 'gt':
      return a > b
    case 'lt':
      return a < b
    case 'eq':
      return a === b
    case 'gte':
      return a >= b
    case 'lte':
      return a <= b
    default:
      return false
  }
}
