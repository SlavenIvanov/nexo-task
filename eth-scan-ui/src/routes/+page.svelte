<script lang="ts">
	import { liveTransactions } from '$lib/client/api/api'
	import Filters from '$lib/components/Filters.svelte'
	import LiveTransactions from '$lib/components/LiveTransactions.svelte'
	import SavedTransactions from '$lib/components/SavedTransactions.svelte'
	import type { Filter } from '$lib/types/filters'

	import { onDestroy } from 'svelte'

	const liveTx = liveTransactions()

	let selectedFilter = $state<Filter | null>(null)

	$effect(() => {
		liveTx.listen()
	})

	onDestroy(() => {
		liveTx.stop()
	})
</script>

<div class="flex h-screen flex-col gap-4 p-4 lg:flex-row">
	<div class="flex w-full flex-col gap-4 lg:w-[550px]">
		<Filters
			onFilterSelected={(filter) => {
				selectedFilter = filter
			}}
		/>
		<LiveTransactions />
	</div>
	<div class="w-full">
		<SavedTransactions filter={selectedFilter} />
	</div>
</div>
