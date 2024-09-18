<script lang="ts">
	import { liveTransactions } from '$lib/client/api/api'
	import Filters from '$lib/components/Filters.svelte'
	import LiveTransactions from '$lib/components/LiveTransactions.svelte'
	import SavedTransactions from '$lib/components/SavedTransactions.svelte'

	import { onDestroy } from 'svelte'

	const liveTx = liveTransactions()

	$effect(() => {
		liveTx.listen()
	})

	onDestroy(() => {
		liveTx.stop()
	})
</script>

<div class="flex h-screen gap-4 p-4">
	<div class="flex w-[550px] flex-col gap-4">
		<Filters />
		<LiveTransactions />
	</div>
	<div class="w-full">
		<SavedTransactions />
	</div>
</div>
