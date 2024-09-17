import { SupportedFilters, Transaction, TransactionValueOperators } from '../types/transaction'

export class EthFilter {
  #filters: SupportedFilters[]

  constructor(filters: SupportedFilters[]) {
    this.#filters = filters
  }

  setFilters(filters: SupportedFilters[]) {
    this.#filters = filters
  }

  getMatchingFilters(tx: Transaction) {
    const filterMatches: SupportedFilters[] = []

    for (const filter of this.#filters) {
      const transactionValue = tx[filter.property]

      if (valueMatches(transactionValue, filter.operator, filter.value)) {
        filterMatches.push(filter)
      }
    }

    return filterMatches
  }
}

function valueMatches(valueA: bigint, operator: TransactionValueOperators, valueB: bigint) {
  switch (operator) {
    case 'gt':
      return valueA > valueB
    case 'lt':
      return valueA < valueB
    case 'eq':
      return valueA === valueB
    case 'gte':
      return valueA >= valueB
    case 'lte':
      return valueA <= valueB
    default:
      return false
  }
}
