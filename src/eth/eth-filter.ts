import { Filter, NumberStringComparator } from '../db/schema/filter'
import { Transaction } from '../db/schema/transaction'

export class EthFilter {
  #filters: Filter[]

  constructor(filters: Filter[]) {
    this.#filters = filters
  }

  setFilters(filters: Filter[]) {
    this.#filters = filters
  }

  getMatchingFilters(tx: Transaction) {
    const filterMatches: Filter[] = []

    for (const filter of this.#filters) {
      const transactionValue = tx[filter.configuration.property]

      console.log(`tx:${transactionValue} cp:${filter.configuration.comparator} val:${filter.configuration.value}`)

      const matches = valueMatches(transactionValue, filter.configuration.comparator, filter.configuration.value)

      console.log(`matches: ${matches}`)

      if (matches) {
        filterMatches.push(filter)
      }
    }

    return filterMatches
  }
}

function valueMatches(valueA: string, comparator: NumberStringComparator, valueB: string) {
  const a = BigInt(valueA)
  const b = BigInt(valueB)

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
