<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { type Events, type Props, buttonVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export let loading: $$Props['loading'] = false;
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	{#if !loading}
		<slot />
	{:else}
		<LoaderCircle class="inline-block animate-spin" />
	{/if}
</ButtonPrimitive.Root>
