<script>
	import '../app.css'
	import { ModeWatcher } from 'mode-watcher'
	import { Toaster } from '$lib/components/shad/ui/sonner'
</script>

<Toaster richColors />
<ModeWatcher />
<slot></slot>
