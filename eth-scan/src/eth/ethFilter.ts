import { FilterSelect } from '../db/schema/filter'
import { TransactionInsert } from '../db/schema/transaction'
import { valueMatches } from '../util/comparators'

class EthFilter {
  #filters: FilterSelect[] = []

  constructor() {}

  setFilters(filters: FilterSelect[]) {
    console.log('💡 Setting new filters', filters)
    this.#filters = filters
  }

  getMatchingFilters(tx: TransactionInsert) {
    const filterMatches: FilterSelect[] = []

    for (const filter of this.#filters) {
      const transactionValue = tx[filter.configuration.property]

      const matches = valueMatches(transactionValue, filter.configuration.comparator, filter.configuration.value)

      if (matches) {
        filterMatches.push(filter)
      }
    }

    return filterMatches
  }
}

export const ethFilter = new EthFilter()
