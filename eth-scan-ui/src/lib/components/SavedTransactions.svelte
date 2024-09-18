<script lang="ts">
	import { fetchTransactionsByFilter } from '$lib/client/api/api'
	import { getPastelColor } from '$lib/client/util/colors'
	import * as Card from '$lib/components/shad/ui/card'
	import { NumberStringComparators, NumberStringProperties, type Filter } from '$lib/types/filters'
	import { type TransactionInsert } from '$lib/types/transactions'
	type propTypes = {
		filter: Filter | null
	}

	const { filter }: propTypes = $props()

	let transactions = $state<TransactionInsert[]>([])

	$effect(() => {
		if (filter?.id) {
			fetchTransactionsByFilter(filter.id).then((t) => {
				transactions = t
			})
		}
	})
</script>

<Card.Root class="h-full w-full overflow-auto">
	{#if filter}
		<Card.Header>
			<Card.Title class="flex flex-row items-center  gap-4 text-3xl">
				<div class="h-4 w-4 rounded-full" style="background-color: {getPastelColor(filter.id)}"></div>
				<div class="flex flex-1 flex-row gap-2">
					<div>
						{NumberStringProperties.find((p) => p.value === filter.configuration.property)?.label}
					</div>
					<div>
						{NumberStringComparators.find((c) => c.value === filter.configuration.comparator)?.label}
					</div>
					<div>{filter.configuration.value}</div>
				</div>
			</Card.Title>
			<Card.Description>A list the last 100 transactions saved for this filter</Card.Description>
		</Card.Header>
		<Card.Content class="overflow-auto">
			{#if transactions.length > 0}
				<div class="flex flex-col gap-2">
					{#each transactions as transaction (transaction.id)}
						<div class="flex flex-col gap-2 overflow-auto rounded-md border p-4">
							<div><i class="text-sm text-gray-500">Transaction Hash:</i> {transaction.hash}</div>
							<div><i class="text-sm text-gray-500">Value:</i> {transaction.value} <i class="text-sm">Gwei</i></div>
							<div><i class="text-sm text-gray-500">Saved At:</i> {transaction.createdAt}</div>
							<div><i class="text-sm text-gray-500">From:</i> {transaction.from}</div>
							<div><i class="text-sm text-gray-500">To:</i> {transaction.to}</div>
							<div>
								<i class="text-sm text-gray-500">Gas:</i>
								{transaction.gas} <i class="text-sm">Gwei</i>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex h-full w-full items-center justify-center">
					<h3>No transactions saved</h3>
				</div>
			{/if}
		</Card.Content>
	{:else}
		<div class="flex h-full w-full items-center justify-center">
			<h3>Please select a filter</h3>
		</div>
	{/if}
</Card.Root>
