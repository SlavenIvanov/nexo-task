<script>
	import { Button } from '$lib/components/shad/ui/button';
</script>

<div class="flex flex-col items-center justify-center h-screen gap-4">
	<h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>

	<Button on:click={() => alert('Hello World')}>Click me</Button>
</div>
