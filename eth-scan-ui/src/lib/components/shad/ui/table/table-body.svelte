<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/components/shad/utils.js'
	import autoAnimate from '@formkit/auto-animate'

	type $$Props = HTMLAttributes<HTMLTableSectionElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<tbody class={cn('[&_tr:last-child]:border-0', className)} {...$$restProps} use:autoAnimate>
	<slot />
</tbody>
