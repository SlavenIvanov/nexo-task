export type Filter = {
	id: string
	enabled: boolean
	configuration: NumberStringFilters
	createdAt: Date
}

type NumberStringFilters = {
	property: (typeof NumberStringProperties)[number]['value']
	comparator: (typeof NumberStringComparators)[number]['value']
	value: string
}

export const NumberStringComparators = [
	{ value: 'gt', label: '>' },
	{ value: 'lt', label: '<' },
	{ value: 'eq', label: '=' },
	{ value: 'gte', label: '>=' },
	{ value: 'lte', label: '<=' }
] as const
export const NumberStringProperties = [
	{ value: 'value', label: 'Eth Value' },
	{ value: 'gas', label: 'Gas Fee' }
] as const
