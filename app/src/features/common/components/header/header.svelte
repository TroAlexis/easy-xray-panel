<script lang="ts">
	import { createEasyXrayGetIsRunning } from '@generated/api';
	import Sun from 'lucide-svelte/icons/sun';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Status } from '$lib/components/ui/status';

	const status = createEasyXrayGetIsRunning();

	$: statusColor = $status.isError ? 'bg-red-500' : 'bg-green-500';
</script>

<header
	class="sticky top-4 my-4 flex items-center justify-between space-x-36 self-center rounded-3xl border bg-background px-4 py-2"
>
	{#if $status.isPending}
		<LoaderCircle class="inline-block animate-spin" />
	{:else}
		<Status class="ml-2 {statusColor} size-4" />
	{/if}

	<span class="relative text-3xl font-bold text-foreground"> easy-xray-panel </span>

	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</header>
