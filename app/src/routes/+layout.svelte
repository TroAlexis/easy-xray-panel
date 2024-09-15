<script lang="ts">
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import axios from 'axios';
	import { ModeWatcher } from 'mode-watcher';

	axios.interceptors.request.use((config) => {
		return { ...config, withCredentials: true };
	});

	// Create a client
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false
			},
			mutations: {
				retry: false
			}
		}
	});
</script>

<Toaster />
<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
