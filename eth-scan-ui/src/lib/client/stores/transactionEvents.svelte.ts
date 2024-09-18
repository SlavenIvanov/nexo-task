import type { NewTransactionEvent } from '$lib/types/transactions'

export function liveTransactionStore() {
	let transactions = $state<NewTransactionEvent[]>([])

	return {
		newTransaction: (transaction: NewTransactionEvent) => {
			transactions = [transaction, ...transactions.slice(0, 50)]
		},
		get transactions() {
			return transactions
		}
	}
}

export const transactionStore = liveTransactionStore()
