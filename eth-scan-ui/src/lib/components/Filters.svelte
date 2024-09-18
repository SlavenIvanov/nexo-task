<script lang="ts">
	import { createFilter, deleteFilter, fetchFilters, updateFilter } from '$lib/client/api/api'
	import { getPastelColor } from '$lib/client/util/colors'
	import * as Card from '$lib/components/shad/ui/card'
	import { Input } from '$lib/components/shad/ui/input'
	import * as Select from '$lib/components/shad/ui/select'
	import type { Filter } from '$lib/types/filters'
	import { NumberStringComparators, NumberStringProperties } from '$lib/types/filters'
	import autoAnimate from '@formkit/auto-animate'
	import { Pencil, Plus, Save, Trash2 } from 'lucide-svelte'
	import { toast } from 'svelte-sonner'
	import { Button } from './shad/ui/button'
	import Switch from './shad/ui/switch/switch.svelte'

	type propTypes = {
		onFilterSelected: (filter: Filter) => void
	}

	const { onFilterSelected }: propTypes = $props()

	let filters = $state<Filter[]>([])

	$effect(() => {
		updateFilters()
	})

	let isDeleting = $state(false)

	let isCreating = $state(false)

	let newFilterProperty = $state({ label: '', value: '' })
	let newFilterComparator = $state({ label: '', value: '' })
	let newFilterValue = $state('')

	function updateFilters() {
		fetchFilters()
			.then((f) => {
				filters = f
			})
			.catch((e) => {
				toast.error(e.message ?? 'Oops 😬')
			})
	}

	async function createNewFilter() {
		const result = await createFilter({
			property: newFilterProperty.value as 'value' | 'gas',
			comparator: newFilterComparator.value as 'gt' | 'lt' | 'eq' | 'gte' | 'lte',
			value: '' + newFilterValue
		})

		if (result.statusCode >= 400) {
			toast.error(result.message ?? 'Oops 😬')
		} else {
			updateFilters()
		}
	}
</script>

<Card.Root class="min-w-full">
	<Card.Header>
		<div class="flex">
			<div class="flex-1">
				<Card.Title>Filters</Card.Title>
				<Card.Description>determine which transactions are saved.</Card.Description>
			</div>
			<Button variant="ghost" size="icon" onclick={() => (isCreating = !isCreating)}><Plus /></Button>
			<Button variant="ghost" size="icon" onclick={() => (isDeleting = !isDeleting)}><Pencil /></Button>
		</div>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		{#if isCreating}
			<div class="pb-2 pt-0">
				<div>Save all transactions that have a</div>
				<p></p>
				<div class="flex gap-2">
					<Select.Root
						selected={newFilterProperty}
						onSelectedChange={(s) => {
							newFilterProperty = { label: s?.label ?? '', value: s?.value ?? '' }
						}}
					>
						<Select.Trigger class="">
							<Select.Value placeholder="" />
						</Select.Trigger>
						<Select.Content>
							{#each NumberStringProperties as property}
								<Select.Item value={property.value}>{property.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Select.Root
						selected={newFilterComparator}
						onSelectedChange={(s) => {
							newFilterComparator = { label: s?.label ?? '', value: s?.value ?? '' }
						}}
					>
						<Select.Trigger class="w-[140px]">
							<Select.Value placeholder="" />
						</Select.Trigger>
						<Select.Content>
							{#each NumberStringComparators as comparator}
								<Select.Item value={comparator.value}>{comparator.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Input
						type="number"
						on:keydown={(e) => {
							// sneaky sneaky 🥸
							if (e.key === '.') {
								e.preventDefault()
							}
						}}
						bind:value={newFilterValue}
						class="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					/>
					<Button variant="ghost" size="icon" on:click={() => createNewFilter()}>
						<Save />
					</Button>
				</div>
			</div>
		{/if}
		<div use:autoAnimate>
			{#each filters as filter (filter.id)}
				<div
					class="hover:bg-muted/50 data-[state=selected]:bg-muted flex min-h-10 flex-row items-center justify-between px-5"
				>
					<button
						onclick={() => {
							onFilterSelected(filter)
						}}
						class="flex w-full flex-row items-center gap-4"
					>
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
					</button>
					<Switch checked={filter.enabled} onCheckedChange={(checked) => updateFilter(filter.id, checked)} />
					{#if isDeleting}
						<div class="pl-2">
							<Button
								variant="ghost"
								size="icon"
								on:click={(e) => {
									e.preventDefault()
									deleteFilter(filter.id)
									// Optimistic update
									filters = filters.filter((f) => f.id !== filter.id)
								}}
							>
								<Trash2 class="h-4 w-4" />
							</Button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
