import type { Filter, FilterConfiguration } from '$lib/types/types'
import { envPublic } from '../envPublic'

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
