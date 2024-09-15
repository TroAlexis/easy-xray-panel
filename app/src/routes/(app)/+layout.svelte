<script>
	import { goto } from '$app/navigation';
	import { Body, Header } from '@features/common';
	import { createAuthGetProfile } from '@generated/api';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	const profile = createAuthGetProfile();
</script>

<Header />
<Body>
	{#if $profile.isPending}
		<LoaderCircle class="my-auto inline-block size-20 animate-spin self-center" />
	{:else if $profile.data}
		<slot></slot>
	{:else}
		{goto('/login')}
	{/if}
</Body>
