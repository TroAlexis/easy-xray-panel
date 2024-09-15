<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		FormField,
		FormControl,
		FormLabel,
		FormFieldErrors,
		FormButton
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import {
		createEasyXrayUsersAdd,
		getEasyXrayStatsGetUsersStatsQueryKey,
		getEasyXrayUsersFindAllQueryKey
	} from '@generated/api';
	import { useQueryClient } from '@tanstack/svelte-query';
	import PlusIcon from 'lucide-svelte/icons/plus';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';

	const queryClient = useQueryClient();

	const params = {
		names: [] as string[]
	};

	const addMutation = createEasyXrayUsersAdd({
		axios: {
			params
		},
		mutation: {
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: getEasyXrayUsersFindAllQueryKey() });
				queryClient.invalidateQueries({ queryKey: getEasyXrayStatsGetUsersStatsQueryKey() });
			}
		}
	});

	let popoverOpen = false;

	const addSchema = z.object({
		name: z.string().min(1)
	});

	const form = superForm(defaults(zod(addSchema)), {
		SPA: true,
		validators: zodClient(addSchema),
		onUpdated: ({ form }) => {
			if (!form.valid) {
				return;
			}

			params.names = [form.data.name];

			$addMutation.mutate();

			popoverOpen = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<Popover bind:open={popoverOpen}>
	<PopoverTrigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<PlusIcon class="size-4" />
		</Button>
	</PopoverTrigger>
	<PopoverContent sideOffset={8}>
		<form use:enhance>
			<FormField {form} name="name">
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input name="name" bind:value={$formData.name} />
				</FormControl>
				<FormFieldErrors />
			</FormField>

			<FormButton type="submit" class="w-full">Add</FormButton>
		</form>
	</PopoverContent>
</Popover>
