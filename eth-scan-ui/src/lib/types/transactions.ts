type TransactionInsert = {
	hash: string
	from: string
	to: string
	value: string
	gas: string
	createdAt: Date
	filterId: string
}

export type NewTransactionEvent = Pick<TransactionInsert, 'hash' | 'from' | 'to' | 'value' | 'gas'> & {
	matchingFilters: string[]
}
