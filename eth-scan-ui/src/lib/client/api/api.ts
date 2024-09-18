import type { NewTransactionEvent } from '$lib/types/transactions'
import type { Filter, FilterConfiguration } from '$lib/types/types'
import { envPublic } from '../envPublic'
import { transactionStore } from '../stores/transactionEvents.svelte'

export async function fetchFilters() {
	const response = await fetch(`${envPublic.PUBLIC_API_URL}/api/v1/filters`)

	return response.json() as Promise<Filter[]>
}

export async function deleteFilter(id: string) {
	const response = await fetch(`${envPublic.PUBLIC_API_URL}/api/v1/filters/${id}`, {
		method: 'DELETE'
	})

	return response.json()
}

export async function createFilter(configuration: FilterConfiguration) {
	const response = await fetch(`${envPublic.PUBLIC_API_URL}/api/v1/filters`, {
		method: 'POST',
		body: JSON.stringify(configuration),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return response.json()
}

export async function updateFilter(id: string, enabled: boolean) {
	const response = await fetch(`${envPublic.PUBLIC_API_URL}/api/v1/filters/${id}`, {
		method: 'POST',
		body: JSON.stringify({ enabled }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return response.json()
}

export function liveTransactions() {
	let ws: WebSocket | undefined
	return {
		listen: () => {
			ws = new WebSocket(envPublic.PUBLIC_API_WS_URL + '/api/v1/ws')
			ws.addEventListener('message', (event) => {
				const transaction = JSON.parse(event.data) as NewTransactionEvent
				transactionStore.newTransaction(transaction)
			})
		},
		stop: () => {
			if (ws) {
				ws.close()
			}
		}
	}
}
