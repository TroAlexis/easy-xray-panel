import type { QueryObserverResult } from '@tanstack/svelte-query';
import type { AxiosResponse } from 'axios';

export const unwrapData = <TData extends AxiosResponse<unknown>, TError>(
	query: QueryObserverResult<TData, TError>
): TData['data'] | undefined => {
	return query.data?.data;
};
