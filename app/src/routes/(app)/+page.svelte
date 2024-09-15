<script lang="ts">
	import { Container } from '$lib/components/ui/container';
	import { unwrapData } from '@features/common';
	import { UserAdd, UserCard } from '@features/users';
	import {
		createEasyXrayStatsGetTotal,
		createEasyXrayStatsGetUsersStats,
		createEasyXrayUsersFindAll,
		type TrafficStatsDto
	} from '@generated/api';
	import keyBy from 'lodash/keyBy';
	import DownloadCloudIcon from 'lucide-svelte/icons/cloud-download';
	import UploadCloudIcon from 'lucide-svelte/icons/cloud-upload';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	const statsQuery = createEasyXrayStatsGetTotal();
	const userStatsQuery = createEasyXrayStatsGetUsersStats();
	const usersQuery = createEasyXrayUsersFindAll();

	$: stats = unwrapData($statsQuery);
	$: users = unwrapData($usersQuery);
	$: userStats = unwrapData($userStatsQuery);

	$: statsByUsers = keyBy(userStats || [], 'user');

	$: getUserStats = (name: string): TrafficStatsDto | undefined => {
		return statsByUsers[name]?.stats;
	};
</script>

<Container class="flex flex-grow basis-0 flex-col">
	<section class="mx-auto mb-8 flex items-center gap-2">
		<div class="flex items-center gap-1">
			<DownloadCloudIcon class="text-green-300" />
			<p>
				Downloaded: <span class="text-green-300">
					{#if $statsQuery.isPending}
						<LoaderCircle class="inline-block animate-spin" />
					{:else}
						{stats?.downloaded}
					{/if}
				</span>
			</p>
		</div>
		|
		<div class="flex items-center gap-1">
			<UploadCloudIcon class="text-purple-300" />
			<p>
				Uploaded: <span class="text-purple-300">
					{#if $statsQuery.isPending}
						<LoaderCircle class="inline-block animate-spin" />
					{:else}
						{stats?.downloaded}
					{/if}
				</span>
			</p>
		</div>
	</section>

	<section class="flex flex-col">
		<div class="flex justify-between">
			<h1 class="mb-4 text-3xl">Users</h1>
			<UserAdd />
		</div>
		{#if users}
			<ul class="flex flex-col gap-2">
				{#each users as user (user.name)}
					<UserCard tag="li" {user} stats={getUserStats(user.name)} />
				{/each}
			</ul>
		{/if}
	</section>
</Container>
