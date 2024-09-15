<script lang="ts" context="module">
	import { z } from 'zod';

	export const loginSchema = z.object({
		userName: z.string().min(1),
		password: z.string().min(1)
	});
	export type LoginSchema = typeof loginSchema;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		FormField,
		FormLabel,
		FormControl,
		FormButton,
		FormFieldErrors
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { createAuthGetProfile, createAuthLogin, getAuthGetProfileQueryKey } from '@generated/api';
	import { useQueryClient } from '@tanstack/svelte-query';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';

	const queryClient = useQueryClient();
	const profile = createAuthGetProfile();

	const login = createAuthLogin({
		mutation: {
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: getAuthGetProfileQueryKey() });
			}
		}
	});

	const form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zodClient(loginSchema),
		onUpdated: ({ form }) => {
			if (!form.valid) {
				return;
			}

			$login.mutate({ data: form.data });
		}
	});

	const { form: formData, enhance } = form;
</script>

{#if $profile.isPending}
	<LoaderCircle class="my-auto inline-block size-20 animate-spin self-center" />
{:else if $profile.data}
	{goto('/')}
{:else}
	<form class="flex min-h-0 flex-grow basis-0 flex-col items-center justify-center" use:enhance>
		<div class="flex min-w-96 flex-col gap-2 rounded-xl px-8 py-10">
			<FormField {form} name="userName">
				<FormControl>
					<FormLabel>Username</FormLabel>
					<Input bind:value={$formData.userName} name="userName" />
				</FormControl>
				<FormFieldErrors />
			</FormField>

			<FormField {form} name="password">
				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input type="password" name="password" bind:value={$formData.password} />
				</FormControl>
				<FormFieldErrors />
			</FormField>

			<FormButton loading={$login.isPending} type="submit" class="mt-4">Login</FormButton>
		</div>
	</form>
{/if}
