export type Transaction = {
  readonly hash: string
  readonly from: string
  readonly to?: string | null
  readonly value: bigint
  readonly gas: bigint
}

type TransactionFilter = {
  id: string
  enabled: boolean
}

//todo more filter types
export type TransactionValueFilter = TransactionFilter & {
  property: 'value'
  operator: TransactionValueOperators
  value: bigint
}

export type TransactionValueOperators = 'gt' | 'lt' | 'eq' | 'gte' | 'lte'

// todo rename...
export type SupportedFilters = TransactionValueFilter
