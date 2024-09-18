import { beforeEach, describe, expect, test } from 'vitest'
import { EthFilter } from '../../src/eth/ethFilter'
import { FilterSelect } from '../../src/db/schema/filter'
import { TransactionInsert } from '../../src/db/schema/transaction'
import { filterGasEq60000, filterValueGte50, txMatch, txNoMatch } from './testData'

describe('EthFilter', () => {
  let ethFilter: EthFilter

  beforeEach(() => {
    ethFilter = new EthFilter()
  })

  test('transaction tested against no filters returns empty array', () => {
    const matchingFilters = ethFilter.getMatchingFilters(txMatch)

    expect(matchingFilters.length).toEqual(0)
  })

  test('transaction tested against one matching filter returns one filter', () => {
    const filters: FilterSelect[] = [filterValueGte50]

    const matchingFiltersOne = ethFilter.getMatchingFilters(txMatch)

    expect(matchingFiltersOne.length).toEqual(0)

    ethFilter.setFilters(filters)

    const matchingFiltersTwo = ethFilter.getMatchingFilters(txMatch)

    expect(matchingFiltersTwo.length).toEqual(1)
  })

  test('transaction tested against one non-matching filter returns empty array', () => {
    const filters: FilterSelect[] = [filterGasEq60000]

    ethFilter.setFilters(filters)

    const matchingFilters = ethFilter.getMatchingFilters(txNoMatch)

    expect(matchingFilters.length).toEqual(0)
  })

  test('transaction tested against multiple filters returns only matching filters', () => {
    const filters: FilterSelect[] = [filterValueGte50, filterGasEq60000]

    ethFilter.setFilters(filters)

    const matchingFilters = ethFilter.getMatchingFilters(txMatch)

    expect(matchingFilters.length).toEqual(2)
  })
})
