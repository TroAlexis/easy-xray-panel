<script lang="ts">
	import { cn } from '$lib';

	let className: string | undefined;

	export { className as class };
</script>

<div class={cn('mx-auto w-full max-w-screen-xl', className)}>
	<slot />
</div>
