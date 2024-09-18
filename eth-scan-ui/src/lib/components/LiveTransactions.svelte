<script lang="ts">
	import { transactionStore } from '$lib/client/stores/transactionEvents.svelte'
	import { getPastelColor } from '$lib/client/util/colors'
	import { truncateString } from '$lib/client/util/string'
	import * as Card from '$lib/components/shad/ui/card'
	import * as Table from '$lib/components/shad/ui/table'
</script>

<Card.Root class="min-w-full flex-1 overflow-y-hidden">
	<Card.Header class="flex flex-row items-center">
		<div class="flex-1">
			<Card.Title>Live Transactions</Card.Title>
			<Card.Description>Yes they are live</Card.Description>
		</div>
		<span class="relative m-2 flex h-3 w-3">
			<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
			<span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
		</span>
	</Card.Header>
	<Card.Content class="max-h-full">
		<div class="flex flex-col items-center gap-2">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Matching Filters</Table.Head>
						<Table.Head>Transaction Hash</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each transactionStore.transactions as transaction (transaction.hash)}
						<Table.Row>
							<Table.Cell class="flex items-end justify-end gap-2 font-medium">
								{#each transaction.matchingFilters as filterId}
									<div class="h-4 w-4 rounded-full" style="background-color: {getPastelColor(filterId)}"></div>
								{/each}
							</Table.Cell>
							<Table.Cell>
								<div>{truncateString(transaction.hash, 16)}</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</Card.Content>
</Card.Root>
