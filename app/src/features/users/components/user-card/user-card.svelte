<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Status } from '$lib/components/ui/status';
	import { copyToClipboard, unwrapData } from '@features/common';
	import {
		createEasyXrayUsersDelete,
		createEasyXrayUsersGetLink,
		createEasyXrayUsersResume,
		createEasyXrayUsersSuspend,
		getEasyXrayStatsGetUsersStatsQueryKey,
		getEasyXrayUsersFindAllQueryKey,
		type TrafficStatsDto,
		type XrayUserDto
	} from '@generated/api';
	import { useQueryClient } from '@tanstack/svelte-query';
	import PauseIcon from 'lucide-svelte/icons/pause';
	import PlayIcon from 'lucide-svelte/icons/play';
	import DownloadCloudIcon from 'lucide-svelte/icons/cloud-download';
	import UploadCloudIcon from 'lucide-svelte/icons/cloud-upload';
	import TrashIcon from 'lucide-svelte/icons/trash-2';
	import CopyIcon from 'lucide-svelte/icons/copy';
	import { toast } from 'svelte-sonner';

	export let tag = 'div';
	export let user: XrayUserDto;
	export let stats: TrafficStatsDto | undefined;

	const queryClient = useQueryClient();

	const onMutationSuccess = () => {
		queryClient.invalidateQueries({ queryKey: getEasyXrayUsersFindAllQueryKey() });
		queryClient.invalidateQueries({ queryKey: getEasyXrayStatsGetUsersStatsQueryKey() });
	};

	const params = {
		names: [user.name]
	};

	const deleteMutation = createEasyXrayUsersDelete({
		mutation: { onSuccess: onMutationSuccess },
		axios: { params }
	});

	const suspendMutation = createEasyXrayUsersSuspend({
		mutation: { onSuccess: onMutationSuccess },
		axios: { params }
	});

	const resumeMutation = createEasyXrayUsersResume({
		mutation: { onSuccess: onMutationSuccess },
		axios: { params }
	});

	const linkQuery = createEasyXrayUsersGetLink(user.name, { query: { enabled: false } });

	$: handleDelete = () => {
		$deleteMutation.mutate();
	};

	$: handleCopy = async () => {
		const query = await $linkQuery.refetch();
		const data = unwrapData(query);

		if (!data) {
			console.error('No data returned from the server');
			return;
		}

		await copyToClipboard(data);
		toast.success('Link copied to clipboard');
	};

	$: handleSuspend = () => {
		$suspendMutation.mutate();
	};

	$: handleResume = () => {
		$resumeMutation.mutate();
	};

	$: statusColor = user.suspended ? 'bg-orange-500' : 'bg-green-500';
</script>

<svelte:element
	this={tag}
	class="flex items-center justify-between gap-2 rounded-xl border px-4 py-4"
>
	<p class="flex items-center gap-2">
		<Status class="mt-0.5 size-3 {statusColor}" />
		{user.name}
	</p>

	<div class="flex">
		<div class="mr-8 flex items-center gap-2">
			<p class="flex items-center gap-1">
				<DownloadCloudIcon class="text-green-300" />
				{stats?.downloaded ?? '—'}
			</p>
			|
			<p class="flex items-center gap-1">
				<UploadCloudIcon class="text-purple-300" />
				{stats?.uploaded ?? '—'}
			</p>
		</div>

		<div class="flex gap-2">
			<Button on:click={handleDelete} variant="outline" size="icon">
				<TrashIcon class="size-4 text-red-400" />
			</Button>

			<Button on:click={handleCopy} variant="outline" size="icon">
				<CopyIcon class="size-4" />
			</Button>

			<Button disabled={user.suspended} on:click={handleSuspend} variant="outline" size="icon">
				<PauseIcon class="size-4" />
			</Button>

			<Button disabled={!user.suspended} on:click={handleResume} variant="outline" size="icon">
				<PlayIcon class="size-4" />
			</Button>
		</div>
	</div>
</svelte:element>
