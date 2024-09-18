<script lang="ts">
	import { Button } from '$lib/components/shad/ui/button'

	import { fetchFilters } from '$lib/client/api/api'
	import { envPublic } from '$lib/client/envPublic'
	import Filters from '$lib/components/filters/Filters.svelte'
	import type { Filter } from '$lib/types/types'

	console.log({ envPublic })

	let filters = $state<Filter[]>([])

	$effect(() => {
		fetchFilters().then((f) => {
			filters = f
		})
	})
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4">
	<Filters />
</div>
