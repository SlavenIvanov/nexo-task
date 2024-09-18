<script lang="ts">
	import { Toaster } from '$lib/components/shad/ui/sonner'
	import { ModeWatcher } from 'mode-watcher'
	import '../app.css'
</script>

<Toaster richColors />
<ModeWatcher />
<slot></slot>
